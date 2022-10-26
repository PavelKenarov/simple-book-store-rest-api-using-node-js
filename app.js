const express = require('express');
const port = 3030;
const books = require('./books');

const app = express();

app.use(express.json());
app.use('/api/', books);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/api/`);
});