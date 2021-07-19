const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const dotenv = require("dotenv");
dotenv.config();

//const routes = require('./routes');

const PORT = process.env.PORT || 3333;

const app = express();

const client = new Client({
  host: "batyr.db.elephantsql.com",
  user: "cnzmqvzx",
  database: "cnzmqvzx",
  password: "hvrDvsq1NfLxirLD3FZLhLmmhfhOQFhh",
  port: 5432,
});

client.connect();

client.query("SELECT * FROM titulo", (err, res) => {
  console.log(err, res.rows);
  client.end();
});

app.use(express.json());
app.use(cors());
//app.use(routes);
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
