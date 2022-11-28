var express = require('express');
var router = express.Router();
const {update} = require("../controller/edit")

router.put("/update",update);

module.exports = router