import React from 'react'

const TaskCard = ({ data, setEditTaskDiv, setEditTaskId }) => {
  const showEditDiv = (e, id) => {
    e.preventDefault()
    window.sessionStorage.setItem("editTaskId", id)
    setEditTaskDiv("block")
    setEditTaskId(id)
  }

  return (
    <button
      className='bg-white w-full p-3 rounded-lg shadow text-left'
      onClick={(event) => showEditDiv(event, data._id)}
    >
      <div className='flex items-center justify-between'>
        <h1>{data.title}</h1>
        <div
          className={`text-sm px-2 rounded-full ${
            data.priority === "low"
              ? "text-green-100 bg-green-500"
              : data.priority === "medium"
              ? "text-yellow-700 bg-yellow-200"
              : "text-red-100 bg-red-500"
          }`}
        >
          <p>{data.priority}</p>
        </div>
      </div>

      <hr className='my-2' />

      <p className='text-sm text-zinc-500'>{data.description}</p>
    </button>
  )
}

export default TaskCard
