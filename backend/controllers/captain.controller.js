const captainModel = require("../models/captain.model.js");


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