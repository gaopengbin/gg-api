import { randomUUID } from "crypto";
import { Express } from "express";
import sqlite from "sqlite3";
import multiparty from "multiparty";
import multer from "multer";
import path from "path";
// import fs from "fs";

export function registerBook(db: sqlite.Database, app: Express) {
  interface Book {
    title: string;
    id: string;
    content: File;
    url: string;
  }

  app.post("/book", (req, res) => {
    const uuid = randomUUID();
    const storage = multer.diskStorage({
      // 用来配置文件上传的位置
      destination: (req, file, cb) => {
        // 调用 cb 即可实现上传位置的配置
        cb(null, "uploads/");
      },
      // 用来配置上传文件的名称（包含后缀）
      filename: (req, file, cb) => {
        //filename 用于确定文件夹中的文件名的确定。 如果没有设置 filename，每个文件将设置为一个随机文件名，并且是没有扩展名的。
        // 获取文件的后缀
        let ext = path.extname(file.originalname);
        // 拼凑文件名
        cb(null, uuid + ext);
      },
    });
    let upload = multer({ storage: storage });
    upload.single("content")(req, res, (err) => {});
    let form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.error(err.message);
        res.status(500).send("添加失败");
      }
      console.log(fields);
      console.log(files);
      // if(!fields) return;
      if (fields.title && fields.title.length > 0) {
        const title = fields.title[0];
        if (files.content && files.content.length > 0) {
          const file = files.content[0];
          const url = `/book/file/${uuid}.epub`;
          const cover = fields.cover ? fields.cover[0] : "";
          const sql = `INSERT INTO book (id, title, content, url,cover) VALUES ('${uuid}','${title}', '${file}', '${url}','${cover}')`;
          db.run(sql, (err) => {
            if (err) {
              console.error(err.message);
              res.status(500).send("添加失败");
            } else {
              res.status(200).send("添加成功");
            }
          });
        }
      }
    });
  });

  app.get("/book/file/:id", (req, res) => {
    const id = req.params.id;
    const file = `uploads/${id}`;
    res.download(file);
  });

  app.get("/book", (req, res) => {
    const sql = "SELECT * FROM book";
    db.all(sql, (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("查询失败");
      } else {
        res.status(200).send(rows);
      }
    });
  });

  app.get("/book/:id", (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    const sql = `SELECT * FROM book WHERE id = '${id}'`;
    db.get(sql, (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("查询失败");
      } else {
        res.status(200).send(row);
      }
    });
  });

  app.put("/book/:id", (req, res) => {
    const id = req.params.id;
    const book: Book = req.body;
    const sql = `UPDATE book SET title = '${book.title}', content = '${book.content}', url = '${book.url}' WHERE id = ${id}`;
    db.run(sql, (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("更新失败");
      } else {
        res.status(200).send("更新成功");
      }
    });
  });

  app.delete("/book/:id", (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM book WHERE id = ${id}`;
    db.run(sql, (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("删除失败");
      } else {
        res.status(200).send("删除成功");
      }
    });
  });
}
