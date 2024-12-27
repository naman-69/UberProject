const blacklistTokenModels = require("../models/blacklistToken.models.js");
const userModel = require("../models/user.models.js");

module.exports.registerUser = async (req,res,next)=>{

    console.log("req body is",req.body);

    const {fullname,password,email} = req.body;

    if(!fullname.firstname || !password || !email){
        return res.status(400).json(
            {
                message:"plz provide me with the firstName ,password and the email"
            }
        )
    }

    const hashedPassword = await userModel.hashPassword(password);

    const userCreated = await userModel.create(
        {
            fullname:{
                firstname:fullname.firstname,
                lastname:fullname.lastname
            },
            email,
            password:hashedPassword
        }
    );

    if(!userCreated){
        return res.status(500).json(
            {
                message:"Error while creating a user"
            }
        )
    }

    const token = userModel.gen;

    return res.status(201).json({
        token,
        userCreated,
        message:"User created successfuly"
    });
}


module.exports.LoginUser = async (req,res,next)=>{

    console.log("req body is",req.body);

    const {password,email} = req.body;

    if(!password || !email){
        return res.status(400).json(
            {
                message:"plz provide me with the password and the email"
            }
        )
    }

    const userfound = await userModel.findOne(
        {
            email:email
        }
    ).select("+password");

    if(!userfound){
        return res.status(404).json(
            {
                message:"User not found"
            }
        )
    }

    const isMatch = await userfound.comparePassword(password);

    if(!isMatch){
        return res.status(200).json(
            {
                message:"Password dosent match"
            }
        )
    }

    const token = userfound.generateAuthtoken();

    res.cookie('token',token);

    return res.status(200).json({
        token,
        userfound,
        message:"User LoggedIn successfuly"
    });
}


module.exports.userProfile = async (req,res,next)=>{
    return res.status(200).json(req.user);
}


module.exports.logoutUser = async (req,res,next)=>{
    
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