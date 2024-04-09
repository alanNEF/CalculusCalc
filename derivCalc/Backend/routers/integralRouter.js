const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const uploads = multer();
const nerdamer = require('nerdamer');
require('nerdamer/Calculus');

router.post('/createint', uploads.none(), (req, res) => {
  let func = nerdamer.integrate(req.body.function);
  console.log('body', req.body.function);
  console.log(`${req.body.function}`);
  res.json({success: true, ans: `${func.toString()}`});
});

module.exports = router;