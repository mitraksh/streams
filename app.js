const express = require("express");
const app = express();
const fs = require("fs");
const fastcsv = require("fast-csv");
const { format } = require("@fast-csv/format");
const { Client } = require("pg");
const Cursor = require('pg-cursor');
const port = 3000;
const date = new Date();
const ws = fs.createWriteStream("results.csv");

const client = new Client({
  user: "admin",
  host: "localhost",
  database: "mydb",
  password: "mypassword",
  port: 5432,
});
//connect database
client.connect((err) => {
  if (err) {
    console.error("connection error", err);
  } else {
    console.log("connected to db...");
  }
});

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", async (req, res) => {
  client.query(
    "SELECT * FROM tables.employee LIMIT 50000",
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
  );
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
