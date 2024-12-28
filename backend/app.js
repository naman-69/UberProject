const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.routes.js");
const captainRoutes = require("./routes/captain.routes.js");

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser());

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);


module.exports = app;