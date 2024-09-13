const fs = require('fs');
const mysql = require('mysql2/promise');
const csv = require('csv-parser');
const config = require('./database-config.constant');

const URL = config();
// MySQL 연결 정보 설정
let connection;

// CSV 파일 경로
const csvFilePath = process.cwd() + '/src/data/FINAL_COMPANY_INFO_filter.csv';

const bigJobKind = [];
const midJobKind = [];
const smallJobKind = [];
let bigJobIdx = 0;
let midJobIdx = 0;

// CSV 파일을 MySQL 테이블에 삽입하는 함수
async function insertCsvDataToMysql() {
  try {
    connection = await mysql.createConnection(URL);
    console.log('Connected to MySQL.');

    // CSV 파일을 읽기 위한 스트림 생성
    const stream = fs.createReadStream(csvFilePath).pipe(csv());

    const insertPromises = []; // 비동기 작업을 추적하기 위한 배열

    // 스트림에서 데이터를 읽을 때마다 실행되는 콜백 함수
    stream.on('data', (data) => {
      const insertData = async () => {
        try {
          // 직업 대분류 넣기
          if (!bigJobKind.includes(data.big_company_kind)) {
            bigJobKind.push(data.big_company_kind);
            bigJobIdx++;

            const insertBigJobQuery =
              'INSERT INTO big_job_kind (name) VALUES (?)';
            await connection.query(insertBigJobQuery, [data.big_company_kind]);
          }

          // 직업 중분류 넣기
          if (!midJobKind.includes(data.mid_company_kind)) {
            midJobKind.push(data.mid_company_kind);
            midJobIdx++;

            const insertMidJobQuery =
              'INSERT INTO mid_job_kind (big_job_kind_id, name) VALUES (?, ?)';
            await connection.query(insertMidJobQuery, [
              bigJobIdx,
              data.mid_company_kind,
            ]);
          }

          // 직업 소분류 넣기
          if (!smallJobKind.includes(data.company_kind)) {
            smallJobKind.push(data.company_kind);
            const insertSmallJobQuery =
              'INSERT INTO small_job_kind (mid_job_kind_id, name) VALUES (?, ?)';
            await connection.query(insertSmallJobQuery, [
              midJobIdx,
              data.company_kind,
            ]);
          }

          const bigJobKindId = bigJobKind.indexOf(data.big_company_kind) + 1;
          const midJobKindId = midJobKind.indexOf(data.mid_company_kind) + 1;
          const smallJobKindId = smallJobKind.indexOf(data.company_kind) + 1;

          if (
            bigJobKindId === 0 ||
            midJobKindId === 0 ||
            smallJobKindId === 0
          ) {
            throw new Error('Invalid job kind');
          }

          const query =
            'INSERT INTO company (name, address, longitude, latitude, scale, big_job_kind_id, mid_job_kind_id, small_job_kind_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
          await connection.query(query, [
            data.company_name,
            data.company_address,
            data.longitude,
            data.latitude,
            data.company_scale,
            bigJobKindId,
            midJobKindId,
            smallJobKindId,
          ]);
        } catch (error) {
          console.error('An error occurred while processing data:', error);
        }
      };

      insertPromises.push(insertData()); // 비동기 작업을 배열에 추가
    });

    stream.on('end', async () => {
      try {
        // 모든 비동기 작업이 완료될 때까지 기다림
        await Promise.all(insertPromises);
        console.log('All data has been inserted into MySQL.');
      } finally {
        await connection.end(); // MySQL 연결 종료
      }
    });
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
  }
}

// CSV 데이터 삽입 시작
insertCsvDataToMysql();
