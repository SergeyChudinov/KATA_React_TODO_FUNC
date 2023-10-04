import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './todo-list-item.css'

function TodoListItem({ description, created, onToggleProp, onDeleted, completed, onItemChange }) {
  const [label, setLabel] = useState(description)
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  let timerInterval

  useEffect(() => {
    timerInterval = setInterval(() => {
      if (isRunning) {
        setTimer((timer) => timer + 1)
      }
    }, 1000)
    return () => clearInterval(timerInterval)
  })

  const stopTimer = () => {
    setIsRunning(false)
  }

  const playTimer = () => {
    setIsRunning(true)
  }

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    onItemChange(label)
  }

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`
  }

  const padZero = (number) => {
    return number.toString().padStart(2, '0')
  }

  const formattedTime = formatTime(timer)
  const time = formatDistanceToNow(created, { addSuffix: true })

  return (
    <>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={() => onToggleProp('completed')} />
        <label>
          <span className="title" onClick={() => onToggleProp('completed')}>
            {description}
          </span>
          <span className="description">
            <button className="icon icon-play" onClick={() => playTimer()}></button>
            <button className="icon icon-pause" onClick={() => stopTimer()}></button>
            {formattedTime}
          </span>
          <span className="description">{time}</span>
        </label>
        <button className="icon icon-edit" onClick={() => onToggleProp('editing')}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" className="edit" onChange={onLabelChange} value={label} />
      </form>
    </>
  )
}

TodoListItem.defaultProps = {
  description: 'Active task',
  created: Date.now(),
  completed: false,
  onToggleProp: () => {},
  onDeleted: () => {},
  onItemChange: () => {},
}

TodoListItem.propTypes = {
  description: PropTypes.string.isRequired,
  created: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  onToggleProp: PropTypes.func,
  onDeleted: PropTypes.func,
  onItemChange: PropTypes.func,
}

export default TodoListItem
