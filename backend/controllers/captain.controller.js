const captainModel = require("../models/captain.model.js");
const blacklistTokenModels = require("../models/blacklistToken.models.js");


module.exports.registerCaptain = async (req,res,next)=>{

    console.log("req body is",req.body);

    const {fullname,password,email,status,vehicle} = req.body;
    // color,plate,capacity,vehicleType
    if(!fullname.firstname || !password || !email || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType){
        return res.status(400).json(
            {
                message:"plz provide me with the firstName ,password, email,color,plate,capacity,vehicleType"
            }
        )
    }

    const isCaptainPresent = await captainModel.findOne({email});

    if(isCaptainPresent){
        return res.status(400).json(
            {
                message:"Captain already exists"
            }
        )
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captainCreated = await captainModel.create(
        {
            fullname:{
                firstname:fullname.firstname,
                lastname:fullname.lastname
            },
            email,
            password:hashedPassword,
            status,
            vehicle:{
                vehicleType:vehicle.vehicleType,
                color:vehicle.color,
                capacity:vehicle.capacity,
                plate:vehicle.plate
            }
        }
    );

    if(!captainCreated){
        return res.status(500).json(
            {
                message:"Error while creating a captain"
            }
        )
    }

    const token = captainModel.generateAuthtoken;

    return res.status(201).json({
        token,
        captainCreated,
        message:"Captain created successfuly"
    });
}

module.exports.LoginCaptain = async (req,res,next)=>{

    console.log("req body is",req.body);

    const {password,email} = req.body;

    if(!password || !email){
        return res.status(400).json(
            {
                message:"plz provide me with the password and the email"
            }
        )
    }

    const captainfound = await captainModel.findOne(
        {
            email:email
        }
    ).select("+password");

    if(!captainfound){
        return res.status(404).json(
            {
                message:"captain not found"
            }
        )
    }

    const isMatch = await captainfound.comparePassword(password);

    if(!isMatch){
        return res.status(400).json(
            {
                message:"Password dosent match"
            }
        )
    }

    const token = captainfound.generateAuthtoken();

    res.cookie('token',token);

    return res.status(200).json({
        token,
        captainfound,
        message:"Captain LoggedIn successfuly"
    });
}

module.exports.captainProfile = async (req,res,next)=>{
    return res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req,res,next)=>{
    
    res.clearCookie('token');

    const token = req.cookies?.token || (req.headers.authorization?.split(' ')[1] || null);

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing.' });
    }


    await blacklistTokenModels.create({
        token
    });  
    
    return res.status(200).json({
        message:"Logged Out successfully"
    });
}