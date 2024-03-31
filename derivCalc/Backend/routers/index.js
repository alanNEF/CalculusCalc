const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const uploads = multer();
const nerdamer = require('nerdamer');
require('nerdamer/Calculus');

router.post('/create', uploads.none(), (req, res) => {
  let func = nerdamer.diff(req.body.function);
  console.log('body', req.body.function);
  console.log(`${req.body.function}`);
  res.json({success: true, ans: `${func.toString()}`});
});

module.exports = router;