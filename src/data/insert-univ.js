const fs = require('fs');
const mysql = require('mysql');
const csv = require('csv-parser');
const config = require('./database-config.constant');

const URL = config();
// MySQL 연결 정보 설정
const connection = mysql.createConnection(URL);

// CSV 파일 경로
const csvFilePath = process.cwd() + '/src/data/FINAL_UNIV_INFO.csv';

// CSV 파일을 MySQL 테이블에 삽입하는 함수
function insertCsvDataToMysql() {
  // CSV 파일을 읽기 위한 스트림 생성
  const stream = fs.createReadStream(csvFilePath).pipe(csv());
  const schoolList = [];
  const majorList = [];

  // 스트림에서 데이터를 읽을 때마다 실행되는 콜백 함수
  stream.on('data', async (data) => {
    // MySQL 테이블에 데이터를 삽입하는 쿼리 작성

    if (!schoolList.includes(data.name)) {
      schoolList.push(data.name);

      const query = 'INSERT INTO school (name, location) VALUES (?, ?)';
      // 쿼리 실행

      await connection.query(
        query,
        [data.name, data.location],
        (error, results, fields) => {
          if (error) {
            console.error('An error occurred while inserting data:', error);
          }
        },
      );
    }

    if (!majorList.includes(data.major)) {
      majorList.push(data.major);
      const query = 'INSERT INTO major (name) VALUES (?)';
      // 쿼리 실행

      await connection.query(query, [data.major], (error, results, fields) => {
        if (error) {
          console.error('An error occurred while inserting data:', error);
        }
      });
    }
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
