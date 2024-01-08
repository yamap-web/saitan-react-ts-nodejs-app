const express = require('express');
const app = express();
const port = 3000;
const coursePath = '/course';
const helmet = require('helmet');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Hishintai01gate',
  database: 'db_saitan',
});

connection.connect((error) => {
  if (error) throw error;
  console.log('Successfully connected to MySQL!');
});

app.get(coursePath, (req, res) => {
  const selectQuery = 'SELECT * FROM class';
  connection.query(selectQuery, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

app.post(coursePath, (req, res) => {
  const {
    year,
    semester,
    day,
    time,
    classTitle,
    category,
    subCategory,
    status,
    creditsNumber,
  } = req.body;
  const insertQuery = `
  INSERT INTO class (id, year, semester, day, time, class_title, category, sub_category, status, credits_number) VALUES
    (null, '${year}', '${semester}', '${day}', '${time}', '${classTitle}', '${category}', '${subCategory}', '${status}', '${creditsNumber}')
  `;
  connection.query(insertQuery, (error) => {
    if (error) throw error;
    res.end();
  });
});

app.put(`${coursePath}/:id`, (req, res) => {
  const requestId = Number(req.params.id);
  const { status } = req.body;
  const updateQuery = `
    UPDATE course
    SET    status=${status}
    WHERE  id=${requestId}
  `;
  connection.query(updateQuery, (error) => {
    if (error) throw error;
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
