"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const privateKey = fs_1.default.readFileSync( '../gg-api/bin/www.laogao.xyz.key', 'utf8');
const certificate = fs_1.default.readFileSync('../gg-api/bin/www.laogao.xyz.pem', 'utf8');
const httpsServer = https_1.default.createServer({
    key: privateKey,
    cert: certificate
}, app);
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const db = new sqlite3_1.default.Database("gg.db", (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log("Connected to the gg database.");
    }
});
app.get("/", (req, res) => {
    res.send("Hello, TypeScript and Express阿帆反反复复66666!");
});
app.post("/plan", (req, res) => {
    const plan = req.body;
    console.log(plan);
    const sql = `INSERT INTO plan (title, cover, description, content) VALUES ('${plan.title}', '${plan.cover}', '${plan.description}', '${plan.content}')`;
    db.run(sql, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("添加失败");
        }
        else {
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
        }
        else {
            res.status(200).send(rows);
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
