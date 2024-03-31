const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const uploads = multer();
const nerdamer = require('nerdamer');
require('nerdamer/Calculus');
