var express = require('express');
var router = express.Router();
const {login} = require("../controller/login")

router.post('/login',login);

module.exports = router