// src/app.ts

import express from "express";
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";
import cors from "cors";
import { registerPlan } from "./plan";
import { registerPerson } from "./person";
import fs from 'fs'
import https from 'https'
import { registerBook } from "./book";

const app = express();
const privateKey = fs.readFileSync(__dirname + './bin/www.laogao.xyz.key', 'utf8')
const certificate = fs.readFileSync(__dirname + './bin/www.laogao.xyz.pem', 'utf8')
const httpsServer = https.createServer({
  key: privateKey,
  cert: certificate
}, app)

const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database("gg.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the gg database.");
  }
});

app.get("/", (req, res) => {
  res.send("Hello, TypeScript and Express阿帆反反复复66666!");
});

registerPlan(db, app);
registerPerson(db, app);
registerBook(db, app);

httpsServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
