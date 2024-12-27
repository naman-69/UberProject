const express = require("express");
const { ExpressValidator } = require("express-validator");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/user.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const blacklistTokenModel = require("../models/blacklistToken.models.js");

router.post('/register',userController.registerUser);
router.post('/login',userController.LoginUser);
router.get('/profile', authMiddleware.authUser ,userController.userProfile);
router.get('/logout', authMiddleware.authUser ,userController.logoutUser);

module.exports = router;