const express=require("express")
const  connectDB  = require("./config/db")
const app=express()
const cors=require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const userRoutes=require("./routes/user")
const taskRoutes=require("./routes/task")
app.use(
  cors({
    origin: "https://task-manager-client-zfl3.onrender.com",  // frontend URL
    credentials: true,                // cookies send cheyyan
  })
)
app.use(express.json())
app.use(cookieParser())
connectDB()
app.get("/",(req,res)=>{
     res.send("Hello from backend")
})

app.use("/api/v1",userRoutes)
app.use("/api/v1",taskRoutes)

app.listen(process.env.PORT,()=>{
    console.log("server started at port",process.env.PORT);
    
})
