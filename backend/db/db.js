const mongoose = require("mongoose");

const connectDb = async ()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\n MongoDB Connected !! DBHost:${connectionInstance.connection.host}`)
    }catch(error){
        console.error("Error:",error);
        process.exit(1);
    }
};

module.exports = connectDb;