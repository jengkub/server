var express = require('express');
var router = express.Router();
const {search} = require("../controller/search");

router.post("/search",search)

module.exports = router