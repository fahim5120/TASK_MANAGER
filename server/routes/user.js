const express=require("express")
const router=express.Router()
const {register,login,logout,userDetails}=require("../controllers/user")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.get("/userDetails",authMiddleware,userDetails)

module.exports=router