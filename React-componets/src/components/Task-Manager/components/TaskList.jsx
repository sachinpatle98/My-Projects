import React from 'react'
import { useSelector } from 'react-redux'
import TaskItem from './TaskItem'

const TaskList = () => {

    const tasks = useSelector((state) => state.tasks.tasks)
    console.log(tasks)

  return (
    <ul className='list-group'>
        {tasks.length === 0 ? (
            <p className='text-center'>No tasks available</p>
        ) : (
         tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
    </ul>
  )
}

export default TaskList
