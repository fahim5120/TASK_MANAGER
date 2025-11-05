const mongoose=require("mongoose")
require("dotenv").config()
const mongoURI=process.env.MONGO_URI

const connectDB=async()=>{
    try {
        console.log("db connection successfull");
        
        const connect=await mongoose.connect(mongoURI)
        console.log(`MongoDB connected ${connect.connection.name}`);
        
    } catch (error) {
        console.log(`MongoDB connection error: ${error.message}`)
    }
}
module.exports=connectDB