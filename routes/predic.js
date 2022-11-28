var express = require('express');
var router = express.Router();
const {predic} = require("../controller/predic")

router.post("/predic",predic)

module.exports = router