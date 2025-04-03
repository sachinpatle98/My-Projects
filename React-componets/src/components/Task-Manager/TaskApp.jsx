import React from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const TaskApp = () => {
  return (
    <div className='container mt-4'>
        <h2 className='text-center mb-4'>Task Manager</h2>
        <TaskForm/>
        <TaskList/>
    </div>
  )
}

export default TaskApp
