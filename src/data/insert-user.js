const fs = require('fs');
const mysql = require('mysql');
const csv = require('csv-parser');
const config = require('./database-config.constant');

const URL = config();
// MySQL 연결 정보 설정
const connection = mysql.createConnection(URL);

// CSV 파일 경로
const csvFilePath = process.cwd() + '/src/data/student.csv';

// Helper function to execute a MySQL query and return a promise
function query(sql, args) {
  return new Promise((resolve, reject) => {
    connection.query(sql, args, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

// CSV 파일을 MySQL 테이블에 삽입하는 함수
async function insertCsvDataToMysql() {
  // CSV 파일을 읽기 위한 스트림 생성
  const stream = fs.createReadStream(csvFilePath).pipe(csv());

  // 스트림에서 데이터를 읽을 때마다 실행되는 콜백 함수
  for await (const data of stream) {
    try {
      const findCompanyIdQuery = 'SELECT id FROM company WHERE name = ?';
      const companyIdResults = await query(findCompanyIdQuery, [
        data.company_name,
      ]);
      const companyId = companyIdResults.length ? companyIdResults[0].id : null;

      const queryText =
        'INSERT INTO users (name, gender, company_id) VALUES (?, ?, ?)';
      await query(queryText, [data.name, data.sex, companyId]);
    } catch (error) {
      console.error('An error occurred while inserting data:', error);
    }
  }

  console.log('All data has been inserted into MySQL.');
  // MySQL 연결 종료
  connection.end();
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
