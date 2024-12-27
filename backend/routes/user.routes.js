const express = require("express");
const { ExpressValidator } = require("express-validator");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/user.controller.js");

router.post('/register',userController.registerUser);
router.post('/login',userController.LoginUser);

module.exports = router;