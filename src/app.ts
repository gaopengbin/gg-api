// src/app.ts

import express from "express";
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database("./gg.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the gg database.");
  }
});

app.get("/", (req, res) => {
  res.send("Hello, TypeScript and Express阿帆反反复复66666!");
});

interface Plan {
  title: string;
  cover: string;
  description: string;
  content: string;
}
app.post("/plan", (req, res) => {
  const plan: Plan = req.body;
  console.log(plan);
  const sql = `INSERT INTO plan (title, cover, description, content) VALUES ('${plan.title}', '${plan.cover}', '${plan.description}', '${plan.content}')`;
  db.run(sql, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("添加失败");
    } else {
      res.status(200).send("添加成功");
    }
  });
});

app.get("/plan", (req, res) => {
  const sql = "SELECT * FROM plan";
  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("查询失败");
    } else {
      res.status(200).send(rows);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
