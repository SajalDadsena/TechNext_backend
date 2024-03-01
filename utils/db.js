const mongoose = require("mongoose");
// const URI= "mongodb://localhost:27017/mern_admin";

const URI = process.env.MONGODB_URI; 

// const URI= "mongodb+srv://SajalDadsena:!5%23PzaXuCJsPqpg@cluster0.sbbeseo.mongodb.net/mern_admin?retryWrites=true&w=majority";

// mongoose.connect(URI);

const connectDB= async()=>{
    try{
        await mongoose.connect(URI);
        console.log("Connection Successfull");
    }
    catch(error){
        console.log(error);
        console.log("Connection failed");
        process.exit(0);
    }
}

module.exports= connectDB;