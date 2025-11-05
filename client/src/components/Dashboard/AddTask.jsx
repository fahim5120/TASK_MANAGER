import React, { useState } from 'react'
import { AddtaskOne } from '../../services/task'

const AddTask = ({ setAddTaskDiv,setTasks, tasks }) => {
  const [Values, setValues] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "yetToStart"
  })

  const change = (e) => {
    const { name, value } = e.target
    setValues({ ...Values, [name]: value })
  }
// AddTask.jsx
const addTask = async (e) => {
  e.preventDefault()
  try {
    const res = await AddtaskOne(Values)
    if (res.data.success) {
      alert("Task added successfully")
      setAddTaskDiv("hidden")

      // Update dashboard state immediately
      setTasks(prev => {
        const updatedTasks = [...prev]
        const index = { yetToStart:0, inProgress:1, completed:2 }[Values.status]
        if (!updatedTasks[index]) updatedTasks[index] = { [Values.status]: [] }
        updatedTasks[index][Values.status].push({...Values, _id: res.data.taskId}) 
        return updatedTasks
      })

      setValues({
        title: "",
        description: "",
        priority: "low",
        status: "yetToStart"
      })
    }
  } catch (error) {
    alert(error?.response?.data?.error || "Something went wrong!")
  }
}



 


  return (
    <div className='bg-white rounded px-6 py-6 w-[40%] shadow-lg'>
      <h1 className='text-xl font-semibold mb-2'>Add Task</h1>
      <hr className='mb-4' />
      <form className='flex flex-col gap-4' onSubmit={addTask}>
        <input
          type="text"
          placeholder='Title'
          name='title'
          value={Values.title}
          onChange={change}
          className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
          required
        />
        <textarea
          name="description"
          placeholder='Description'
          value={Values.description}
          onChange={change}
          className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
          required
        ></textarea>

        <div className='flex gap-4'>
          <div className='flex-1'>
            <h3>Select Priority</h3>
            <select
              name="priority"
              value={Values.priority}
              onChange={change}
              className='border p-2 rounded w-full'
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className='flex-1'>
            <h3>Select Status</h3>
            <select
              name="status"
              value={Values.status}
              onChange={change}
              className='border p-2 rounded w-full'
            >
              <option value="yetToStart">Yet To Start</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className='flex flex-col gap-2 mt-2'>
          <button type="submit" className='w-full bg-blue-800 py-2 hover:bg-blue-700 transition-all text-white rounded'>Add Task</button>
          <button type="button" className='w-full bg-gray-200 py-2 hover:bg-gray-300 transition-all rounded' onClick={() => setAddTaskDiv("hidden")}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddTask
