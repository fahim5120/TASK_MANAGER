import React, { useEffect, useState } from 'react'
import { Delete_Task, Edit_Task, getTask } from '../../services/task'

const EditTask = ({ setEditTaskDiv, EditTaskId }) => {
    const [Values, setValues] = useState({
        title: "",
        description: "",
        priority: "low",
        status: "yetToStart",
        _id: ""
    })

    const change = (e) => {
        const { name, value } = e.target
        setValues({ ...Values, [name]: value })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getTask(EditTaskId)
                if (res.data.taskDetails) {
                    setValues(res.data.taskDetails)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (EditTaskId) fetchData()
    }, [EditTaskId])

    const editTask = async (e) => {
        e.preventDefault()
        try {
            const res = await Edit_Task(Values._id, Values)
            if (res.data.success) {
                alert("Task updated successfully")
                window.sessionStorage.removeItem("editTaskId")
                setEditTaskDiv("hidden")
            }
        } catch (error) {
            alert(error?.response?.data?.error || "Something went wrong!")
        }
    }

    const deleteTask = async () => {
        try {
            const res = await Delete_Task(Values._id)
            if (res.data.success) {
                alert("Task deleted successfully")
                window.sessionStorage.removeItem("editTaskId")
                setEditTaskDiv("hidden")
            }
        } catch (error) {
            alert(error?.response?.data?.error || "Something went wrong!")
        }
    }

    return (
        <div className='bg-white rounded px-4 py-4 w-[40%]'>
            <h1 className='text-xl font-semibold mb-2'>Edit Task</h1>
            <hr className='mb-4' />
            <form className='flex flex-col gap-4' onSubmit={editTask}>
                <input
                    type="text"
                    placeholder='Title'
                    name='title'
                    value={Values.title}
                    onChange={change}
                    className='border p-2 rounded focus:outline-none'
                    required
                />

                <textarea
                    name="description"
                    placeholder='Description'
                    value={Values.description}
                    onChange={change}
                    className='border p-2 rounded focus:outline-none'
                    required
                />

                <div className='flex gap-4'>
                    <div className='flex-1'>
                        <h3>Select Priority</h3>
                        <select name="priority" value={Values.priority} onChange={change} className='border p-2 rounded w-full'>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className='flex-1'>
                        <h3>Select Status</h3>
                        <select name="status" value={Values.status} onChange={change} className='border p-2 rounded w-full'>
                            <option value="yetToStart">Yet To Start</option>
                            <option value="inProgress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                <div className='flex flex-col gap-2 mt-2'>
                    <button type="submit" className='w-full bg-blue-800 py-2 hover:bg-blue-700 text-white rounded'>
                        Edit Task
                    </button>
                    <button type="button" className='w-full bg-red-500 py-2 hover:bg-red-400 text-white rounded' onClick={deleteTask}>
                        Delete Task
                    </button>
                    <button type="button" className='w-full bg-gray-200 py-2 hover:bg-gray-300 rounded' onClick={() => setEditTaskDiv("hidden")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditTask
