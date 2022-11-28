var express = require('express');
var router = express.Router();
const {Delete} = require("../controller/delete")

router.post("/delete",Delete);

module.exports = router