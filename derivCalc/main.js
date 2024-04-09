const express = require('express');
const app = express();
const devRouter = require('./Backend/routers/index');
const intRouter = require('./Backend/routers/integralRouter')

const port = 5500;

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dev', devRouter);
app.use('/int', intRouter);

app.listen(port, () => {
  console.log('Port is Listening.');
});