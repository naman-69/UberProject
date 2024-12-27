const app = require("./app");
const connectDb = require("./db/db.js");
const http = require("http");
const port = process.env.port || 3000;


const server = http.createServer(app);

connectDb()
.then(()=>{
    server.listen(port , ()=>{
        console.log(`server is running at the port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDb Connection Failed!!",err);
})