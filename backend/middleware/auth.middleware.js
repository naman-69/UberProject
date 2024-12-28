const userModel = require("../models/user.models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModels = require("../models/blacklistToken.models.js");
const captainModel = require("../models/captain.model.js");

module.exports.authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authrization.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unautrized access"});
    }

    const blacklisted = await blacklistTokenModels.findOne(
        {
            token:token
        }
    );

    if(blacklisted){
        return res.status(401).json({message:"Unautrized access"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user=user;

        return next();

    }catch(err){
        return res.status(401).json({message:"Unautrized access"});
    }
}

module.exports.authCaptain = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authrization.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unautrized access"});
    }

    const blacklisted = await blacklistTokenModels.findOne(
        {
            token:token
        }
    );

    if(blacklisted){
        return res.status(401).json({message:"Unautrized access"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        req.captain=captain;

        return next();

    }catch(err){
        return res.status(401).json({message:"Unautrized access"});
    }
}