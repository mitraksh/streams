const express = require("express");
const app = express();
const fs = require("fs");
const fastcsv = require("fast-csv");
const { format } = require("@fast-csv/format");
const { Client } = require("pg");
const Cursor = require('pg-cursor');
const port = 3500;
const date = new Date();
const dotenv = require('dotenv');  
dotenv.config({ path: './.env' });
const HOST = '0.0.0.0'
const ws = fs.createWriteStream("results.csv");

// console.log(process.env.POSTGRES_USER)
const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT),
});


app.use(express.static("public"));

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/employee", async (req, res) => {
  //res.send('USERS')
  // const create_table = await client.query("CREATE TABLE IF NOT EXISTS employee(id,name,age)").catch(() => {
  //   throw new Error('Query failed')
  // })
 
  const result = await client.query("SELECT * FROM employees").then((payload) => {
    return payload.rows
  }).catch(() => {
    throw new Error('Query failed')
  })
 
  res.setHeader("Content-Type","application/json");
  res.status(200);
  res.send(JSON.stringify(result));
  var results_length = result.length;
  console.log(results_length);
  const csvStream = format({ headers: true }).transform(row => ({
    id: row.id,
    name: row.name,
    age: row.age,
    date: date
}));
  csvStream.pipe(ws)
  for(var i=0;i<results_length;i++){
    //console.log(results.rows[i]);JSON.stringify(result)
    csvStream.write(result[i])
  } 
  /*client.query(
    "SELECT * FROM employees",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results);
      var results_length = results.rows.length;
      //console.log(results_length);
      const csvStream = format({ headers: true }).transform(row => ({
        id: row.id,
        name: row.name,
        age: row.age,
        date: date
    }));
      csvStream.pipe(ws)
      for(var i=0;i<results_length;i++){
        //console.log(results.rows[i]);
        csvStream.write(results.rows[i])
      } 
      
      client.end();
    }
  );*/
});

//connect database
client.connect((err) => {
  if (err) {
    console.error("connection error", err);
  } else {
    console.log("connected to db...");
  }
});

app.listen(port);
console.log(`Running on http://localhost:${port}`);