// src/app.ts

import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript and Express阿帆反反复复!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
