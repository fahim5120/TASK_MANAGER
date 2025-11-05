// YetToStart.jsx
import React from 'react'
import TaskCard from './TaskCard'

const InProgress = ({ task }) => {
  return (
    <div className='flex flex-col gap-2'>
      <TaskCard data={task} />
    </div>
  )
}

export default InProgress
