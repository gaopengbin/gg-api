"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const db = new sqlite3_1.default.Database("./gg.db", (err) => {
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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
