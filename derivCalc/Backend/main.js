const http = require('http');
const express = require('express');
const app = express();
// const mainRouter = require('./routers/index');

const port = 5500;

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log('Port is Listening.');
});