const express = require("express");

const router = express.Router();

const {
 GetUser
} = require("../controller/userCtrl");
const { protect } = require("../middleware/auth");

router.get("/",  protect, GetUser);


module.exports = router;
