import { randomUUID } from 'crypto';
import { Express } from 'express';
import sqlite from 'sqlite3';

export function registerPlan(db: sqlite.Database, app: Express) {
    interface Plan {
        title: string;
        cover: string;
        description: string;
        content: string;
    }
    app.post("/plan", (req, res) => {
        const plan: Plan = req.body;
        console.log(plan);
        const uuid = randomUUID();
        console.log(uuid);
        const sql = `INSERT INTO plan (id, title, cover, description, content) VALUES ('${uuid}','${plan.title}', '${plan.cover}', '${plan.description}', '${plan.content}')`;
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

    app.get("/plan/:id", (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM plan WHERE id = ${id}`;
        db.get(sql, (err, row) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("查询失败");
            } else {
                res.status(200).send(row);
            }
        });
    });

    app.put("/plan/:id", (req, res) => {
        const id = req.params.id;
        const plan: Plan = req.body;
        const sql = `UPDATE plan SET title = '${plan.title}', cover = '${plan.cover}', description = '${plan.description}', content = '${plan.content}' WHERE id = ${id}`;
        db.run(sql, (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("更新失败");
            } else {
                res.status(200).send("更新成功");
            }
        });
    });

    app.delete("/plan/:id", (req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM plan WHERE id = ${id}`;
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