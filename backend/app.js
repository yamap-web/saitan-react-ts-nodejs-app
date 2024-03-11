const express = require("express");
const app = express();
const port = 3000;
const coursePath = "/course";
const helmet = require("helmet");
const cors = require("cors");
// const mysql = require("mysql2");
const { Pool } = require("pg");
require("dotenv").config();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASS,
//   database: "db_saitan",
// });
const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: "saitan_db",
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10,
});

// connection.connect((error) => {
//   if (error) throw error;
//   console.log("Successfully connected to MySQL!");
// });
pool.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to PostgreSQL!");
});

app.get(coursePath, (req, res) => {
  const selectQuery = "SELECT * FROM course";
  // connection.query(selectQuery, (error, result) => {
  pool.query(selectQuery, (error, result) => {
    if (error) throw error;
    // res.json(result);
    res.json(result.rows);
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

  const statusInt = status ? 1 : 0;

  const insertQuery = `
  INSERT INTO course (year, semester, day, time, class_title, category, sub_category, status, credits_number) VALUES
    ('${year}', '${semester}', '${day}', '${time}', '${classTitle}', '${category}', '${subCategory}', '${statusInt}', '${creditsNumber}')
  `;
  // connection.query(insertQuery, (error) => {
  pool.query(insertQuery, (error) => {
    if (error) throw error;
    res.end();
  });
});

app.put(`${coursePath}/:id`, (req, res) => {
  const requestId = Number(req.params.id);
  const status = req.body.status ? 1 : 0;
  const updateQuery = `
    UPDATE course
    SET    status=${status}
    WHERE  id=${requestId}
  `;
  // connection.query(updateQuery, (error) => {
  pool.query(updateQuery, (error) => {
    if (error) throw error;
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
