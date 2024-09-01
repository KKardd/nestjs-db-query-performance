const fs = require('fs');
const mysql = require('mysql2');
const csv = require('csv-parser');
const config = require('./database-config.constant');

const URL = config();
// MySQL 연결 정보 설정
const connection = mysql.createConnection(URL);

// CSV 파일 경로
const csvFilePath = process.cwd() + '/data/FINAL_COMPANY_INFO_filter.csv';

const bigJobKind = [];
const midJobKind = [];
const smallJobKind = [];
let bigJobIdx = 0;
let midJobIdx = 0;

// CSV 파일을 MySQL 테이블에 삽입하는 함수
function insertCsvDataToMysql() {
  // CSV 파일을 읽기 위한 스트림 생성
  const stream = fs.createReadStream(csvFilePath).pipe(csv());

  // 스트림에서 데이터를 읽을 때마다 실행되는 콜백 함수
  stream.on('data', async (data) => {
    // MySQL 테이블에 데이터를 삽입하는 쿼리 작성

    // 직업 대분류 넣기
    if (!bigJobKind.includes(data.big_company_kind)) {
      bigJobKind.push(data.big_company_kind);
      bigJobIdx++;

      const insertBigJobQuery = 'INSERT INTO big_job_kind (name) VALUES (?)';
      await connection.query(
        insertBigJobQuery,
        [data.big_company_kind],
        (error, results, fields) => {
          if (error) {
            console.error('An error occurred while inserting data:', error);
          }
        },
      );
    }

    // 직업 중분류 넣기
    if (!midJobKind.includes(data.mid_company_kind)) {
      midJobKind.push(data.mid_company_kind);
      midJobIdx++;

      const insertMidJobQuery =
        'INSERT INTO mid_job_kind (big_job_kind_id, name) VALUES (?, ?)';
      await connection.query(
        insertMidJobQuery,
        [bigJobIdx, data.mid_company_kind],
        (error, results, fields) => {
          if (error) {
            console.error('An error occurred while inserting data:', error);
          }
        },
      );
    }

    if (!smallJobKind.includes(data.company_kind)) {
      smallJobKind.push(data.company_kind);
      const insertSmallJobQuery =
        'INSERT INTO small_job_kind (mid_job_kind_id, name) VALUES (?, ?)';
      await connection.query(
        insertSmallJobQuery,
        [midJobIdx, data.company_kind],
        (error, results, fields) => {
          if (error) {
            console.error('An error occurred while inserting data:', error);
          }
        },
      );
    }

    const bigJobKindId = bigJobKind.indexOf(data.big_company_kind) + 1;
    const midJobKindId = midJobKind.indexOf(data.mid_company_kind) + 1;
    const smallJobKindId = smallJobKind.indexOf(data.company_kind) + 1;
    if (bigJobKindId === 0 || midJobKindId === 0 || smallJobKindId === 0) {
      throw new Error('이상함');
    }

    const query =
      'INSERT INTO company (name, address, longitude, latitude, scale, big_job_kind_id, mid_job_kind_id, small_job_kind_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    // 쿼리 실행

    await connection.query(
      query,
      [
        data.company_name,
        data.company_address,
        data.longitude,
        data.latitude,
        data.company_scale,
        bigJobKindId,
        midJobKindId,
        smallJobKindId,
      ],
      (error, results, fields) => {
        if (error) {
          console.error('An error occurred while inserting data:', error);
        }
      },
    );
  });

  // 모든 데이터가 삽입된 후에 실행되는 콜백 함수
  stream.on('end', () => {
    console.log('All data has been inserted into MySQL.');
    // MySQL 연결 종료
    connection.end();
  });
}

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL.');
  // CSV 데이터 삽입 시작
  insertCsvDataToMysql();
});
