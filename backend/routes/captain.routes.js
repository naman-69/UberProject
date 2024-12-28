const express = require("express");
// const { ExpressValidator } = require("express-validator");
const router = express.Router();
// const {body} = require("express-validator");
const userController = require("../controllers/user.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const blacklistTokenModel = require("../models/blacklistToken.models.js");
const captainController = require("../controllers/captain.controller.js");

router.post('/register',captainController.registerCaptain);
// router.post('/login',captainController.LoginUser);
// router.get('/profile', authMiddleware.authUser ,captainController.userProfile);
// router.get('/logout', authMiddleware.authUser ,captainController.logoutUser);

module.exports = router;