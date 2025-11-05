import React, { useEffect, useState } from 'react'
import Header from '../components/Dashboard/Header'
import AddTask from '../components/Dashboard/AddTask'
import StackTitle from '../components/Dashboard/StackTitle'
import YetToStart from '../components/Dashboard/YetToStart'
import InProgress from '../components/Dashboard/InProgress'
import Completed from '../components/Dashboard/Completed'
import EditTask from '../components/Dashboard/EditTask'
import { getUserDetail } from '../services/task'

const Dashboard = () => {
  const [AddTaskDiv, setAddTaskDiv] = useState("hidden")
  const [Tasks, setTasks] = useState([]) // flat array of all tasks
  const [EditTaskDiv, setEditTaskDiv] = useState("hidden")
  const [EditTaskId, setEditTaskId] = useState(null)

  // Fetch all tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await getUserDetail()
      // Make sure backend returns a flat array
      setTasks(res.data.tasks || [])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTasks()

    const storedEditTaskId = window.sessionStorage.getItem("editTaskId")
    if (storedEditTaskId) {
      setEditTaskDiv("block")
      setEditTaskId(storedEditTaskId)
    }
  }, [AddTaskDiv])

  return (
    <div className='w-full min-h-screen relative bg-gray-50'>
      {/* Header */}
      <div className='bg-white shadow'>
        <Header setAddTaskDiv={setAddTaskDiv} />
      </div>

      {/* Task Columns */}
      <div className='flex flex-col md:flex-row gap-4 p-4'>
        {/* Yet To Start */}
        <div className='flex-1 bg-white rounded shadow p-4'>
          <StackTitle title="Yet To Start" />
          <div className='pt-2'>
            {Tasks.filter(t => t.status === "yetToStart").map(task => (
              <YetToStart key={task._id} task={task} />
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div className='flex-1 bg-white rounded shadow p-4'>
          <StackTitle title="In Progress" />
          <div className='pt-2'>
            {Tasks.filter(t => t.status === "inProgress").map(task => (
              <InProgress key={task._id} task={task} />
            ))}
          </div>
        </div>

        {/* Completed */}
        <div className='flex-1 bg-white rounded shadow p-4'>
          <StackTitle title="Completed" />
          <div className='pt-2'>
            {Tasks.filter(t => t.status === "completed").map(task => (
              <Completed key={task._id} task={task} />
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for Add Task */}
      {AddTaskDiv === "block" && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-40'></div>
      )}

      {/* Add Task Modal */}
      {AddTaskDiv === "block" && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <AddTask 
            setAddTaskDiv={setAddTaskDiv} 
            setTasks={setTasks} 
            tasks={Tasks} 
          />
        </div>
      )}

      {/* Overlay for Edit Task */}
      {EditTaskDiv === "block" && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-40'></div>
      )}

      {/* Edit Task Modal */}
      {EditTaskDiv === "block" && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <EditTask 
            EditTaskId={EditTaskId} 
            setEditTaskDiv={setEditTaskDiv} 
            setTasks={setTasks} 
            tasks={Tasks}
          />
        </div>
      )}
    </div>
  )
}

export default Dashboard
