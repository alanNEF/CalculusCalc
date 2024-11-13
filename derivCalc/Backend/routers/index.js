const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();
const nerdamer = require('nerdamer');
require('nerdamer/Calculus');

router.post('/createdev', uploads.none(), (req, res) => {
  let func = nerdamer.diff(req.body.function);
  console.log('body', req.body.function);
  console.log(`${req.body.function}`);
  console.log(`result${func.toString()}`);
  res.json({success: true, ans: `${func.toString()}`});
});

module.exports = router;
