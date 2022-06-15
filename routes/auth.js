const express = require("express")

const router = express.Router()

const {
  SignUpUser,
  SignInUser,
 
} = require("../controller/authCtrl");

router.post("/", SignUpUser);
router.post("/login", SignInUser);


module.exports = router