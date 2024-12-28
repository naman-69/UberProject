const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware.js");
const captainController = require("../controllers/captain.controller.js");

router.post('/register',captainController.registerCaptain);
router.post('/login',captainController.LoginCaptain);
router.get('/profile', authMiddleware.authCaptain ,captainController.captainProfile);
router.get('/logout', authMiddleware.authCaptain ,captainController.logoutCaptain);

module.exports = router;