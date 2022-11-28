var express = require('express');
var router = express.Router();
const {favorites, Disfavorites,checksfavorites,getsfavorites} = require("../controller/favorite");

router.post("/favorite",favorites)
router.post("/disfavorite",Disfavorites)
router.post("/checkfavorite",checksfavorites)
router.post("/getsfavorites",getsfavorites)


module.exports = router
