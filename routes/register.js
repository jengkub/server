var express = require('express');
var router = express.Router();
const {register} = require("../controller/register")

router.post('/register',register);

module.exports = router