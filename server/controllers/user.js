const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        console.log(username, email, password);
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required!!" })
        }
        if (username.length < 5) {
            return res.status(400).json({ error: "Username must have 5 characters" })
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must have 6 characters" })
        }
        const checkUser = await User.findOne({ $or: [{ email }, { username }] })
        if (checkUser) {
            return res.status(400).json({ error: "Username or already exist!!" })
        } else {
            const hashPass = await bcrypt.hash(password, 10)
            const newUser = new User({ username, email, password: hashPass })
            await newUser.save()
            return res.status(200).json({ success: "Registration successfull" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body
//         if (!email || !password) {
//             return res.status(400).json({ error: "All fields are required!!" })
//         }
//         const checkUser = await User.findOne({ email })
//         if (checkUser) {
//             bcrypt.compare(password, checkUser.password, (err, data) => {
//                 if (data) {
//                     const token = jwt.sign({ id: checkUser._id, email: checkUser.email }, process.env.JWT_SECRET, { expiresIn: "30d" })
//                     res.cookie("taskifyUserToken", token, {
//                         httpOnly: true,
//                         maxAge: 30 * 24 * 60 * 60 * 1000,
//                         secure: process.env.NODE_ENV === "production",
//                         sameSite: "None"
//                     })
//                     return res.status(200).json({ success: "Login success!!" })
//                 } else {
//                     return res.status(400).json({ error: "Invalid Credentials!!" })
//                 }
//             })
//         }

//     } catch (error) {
//         return res.status(500).json({ error: "Internal server error!!" })
//     }
// }

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required!!" });
    }

    // 2️⃣ Find user
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({ error: "User not found!!" });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials!!" });
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { id: checkUser._id, email: checkUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // 5️⃣ Set cookie
    res.cookie("taskifyUserToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    // 6️⃣ Success response
    return res.status(200).json({ success: "Login success!!" });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Internal server error!!" });
  }
}


const logout = async (req, res) => {
    try {
        res.clearCookie("taskifyUserToken", {
            httpOnly: true
        })
        res.json({ message: "Logged out" })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

// const userDetails = async (req, res) => {
//     try {
//         const { user } = req;
//         const getdetails = await User.findById(user._id).populate("tasks").select("-password")
//         if (getdetails) {
//             const allTasks = getdetails.tasks
//             let yetToStart = []
//             let inProgress = []
//             let completed = []
//             allTasks.map((item) => {
//                 if (item.status === "yetToStart") {
//                     yetToStart.push(item);

//                 } else if (item.status === "inProgress") {
//                     inProgress.push(item)
//                 } else {
//                     completed.push(item)
//                 }
//             })
//             console.log(getdetails);
            
//             return res.status(200).json({ success: "success",
//                  task: [{ yetToStart }, { inProgress }, { completed }] })
//         }
//     } catch (error) {
//         return res.status(500).json({ error: "Internal server error" })
//     }
// }





const userDetails = async (req, res) => {
    try {
        const { user } = req;
        const getdetails = await User.findById(user._id).populate("tasks").select("-password")
        if (!getdetails) return res.status(404).json({ error: "User not found" })

        // get all tasks as flat array
        const allTasks = getdetails.tasks

        // return flat array directly
        return res.status(200).json({ success: true, tasks: allTasks })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" })
    }
}


// const userDetails = async (req, res) => {
//   try {
//     // 1️⃣ Check if user is set by authMiddleware
//     const user = req.user;
//     if (!user) {
//       return res.status(401).json({ error: "Unauthorized: user not found in request" });
//     }

//     // 2️⃣ Fetch user details with tasks
//     const getdetails = await User.findById(user._id)
//       .populate("tasks")
//       .select("-password");

//     if (!getdetails) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // 3️⃣ Sort tasks by status
//     const allTasks = getdetails.tasks || [];
//     const yetToStart = allTasks.filter(t => t.status === "yetToStart");
//     const inProgress = allTasks.filter(t => t.status === "inProgress");
//     const completed = allTasks.filter(t => t.status === "completed");

//     // 4️⃣ Log for debugging
//     console.log("Fetched user details:", getdetails.email, "Tasks:", allTasks.length);

//     // 5️⃣ Response
//     return res.status(200).json({
//       success: true,
//       tasks: { yetToStart, inProgress, completed },
//       user: { id: getdetails._id, email: getdetails.email, username: getdetails.username }
//     });

//   } catch (error) {
//     console.error("userDetails Error:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }

module.exports = { register, login, logout,userDetails }