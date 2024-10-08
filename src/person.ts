import { randomUUID } from 'crypto';
import { Express } from 'express';
import sqlite from 'sqlite3';

export function registerPerson(db: sqlite.Database, app: Express) {
    interface Person {
        name: string;
        address: string;
        hobby: string;
        position: string;
    }
    app.post("/person", (req, res) => {
        const person: Person = req.body;
        console.log(person);
        const uuid = randomUUID();
        console.log(uuid);
        const sql = `INSERT INTO person (id, name, address, hobby, position) VALUES ('${uuid}','${person.name}', '${person.address}', '${person.hobby}', '${person.position}')`;
        db.run(sql, (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("添加失败");
            } else {
                res.status(200).send("添加成功");
            }
        });
    });

    app.get("/person", (req, res) => {
        const sql = "SELECT * FROM person";
        db.all(sql, (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("查询失败");
            } else {
                res.status(200).send(rows);
            }
        });
    });

    app.get("/person/:id", (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM person WHERE id = ${id}`;
        db.get(sql, (err, row) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("查询失败");
            } else {
                res.status(200).send(row);
            }
        });
    });

    app.put("/person/:id", (req, res) => {
        const id = req.params.id;
        const person: Person = req.body;
        const sql = `UPDATE person SET name = '${person.name}', address = '${person.address}', hobby = '${person.hobby}' WHERE id = ${id}`;
        db.run(sql, (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("更新失败");
            } else {
                res.status(200).send("更新成功");
            }
        });
    });

    app.delete("/person/:id", (req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM person WHERE id = ${id}`;
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