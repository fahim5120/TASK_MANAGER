const task = require("../models/task")

const addTask = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body
        const { user } = req
        if (!title || !description || !priority || !status) {
            return res.status(400).json({ error: "All fields are required" })
        }
        if (title.length < 6) {
            return res.status(400).json({ error: "Title must have 6 characters" })
        }
        if (description.length < 6) {
            return res.status(400).json({ error: "Description must have 6 characters" })
        }
       const newTask = new task({ title, description, priority, status })
    await newTask.save()
     user.tasks.push(newTask._id) // <-- here
      await user.save()
        return res.status(200).json({ success: "Task added" ,taskId: newTask._id })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}



//editing task
const editTask = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, priority, status } = req.body
        // const { user } = req.user
        if (!title || !description || !priority || !status) {
            return res.status(400).json({ error: "All fields are required" })
        }
        if (title.length < 6) {
            return res.status(400).json({ error: "Title must have 6 characters" })
        }
        if (description.length < 6) {
            return res.status(400).json({ error: "Description must have 6 characters" })
        }
       await task.findByIdAndUpdate(id,{title, description, priority, status})
        return res.status(200).json({ success: "Task updated" })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}


//getoneTask
const getTask = async (req, res) => {
    try {
        const { id } = req.params
      const taskDetails=await task.findById(id)
        return res.status(200).json({taskDetails })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

//deletetask
const deletetTask = async (req, res) => {
    try {
        const { id } = req.params
       await task.findByIdAndDelete(id)
        return res.status(200).json({success:"Task deleted" })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports={addTask, editTask,getTask,deletetTask}