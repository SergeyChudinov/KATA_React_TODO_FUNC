import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Header from '../header/header'
import Main from '../main/main'
import './app.css'

function App() {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('All')

  const onFilterSelect = (filter) => {
    setFilter(filter)
  }

  const filtePost = (items, filter) => {
    switch (filter) {
      case 'Active':
        return items.filter((item) => !item.completed)
      case 'Completed':
        return items.filter((item) => item.completed)
      default:
        return items
    }
  }

  const onToggleProp = (id, prop) => {
    setTodoData((todoData) =>
      todoData.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }
        return item
      })
    )
  }

  const deleteItem = (id) => {
    setTodoData((todoData) =>
      todoData.filter((item) => {
        return item.id !== id
      })
    )
  }

  const deleteItems = () => {
    setTodoData([])
  }

  const addItem = (text) => {
    const newItem = {
      description: text,
      created: Date.now(),
      completed: false,
      editing: false,
      id: uuidv4(),
    }

    setTodoData((todoData) => [...todoData, newItem])
  }

  const changeItem = (id, text) => {
    setTodoData((todoData) =>
      todoData.map((item) => {
        if (item.id === id) {
          return { ...item, description: text, editing: !item.editing }
        }
        return item
      })
    )
  }

  const todoCount = todoData.filter((item) => {
    return item.completed === false
  }).length

  const visibleData = filtePost(todoData, filter)

  return (
    <section className="todoapp">
      <Header onItemAdded={addItem} />
      <Main
        todos={visibleData}
        onToggleProp={onToggleProp}
        onDeleted={deleteItem}
        onAllDeleted={deleteItems}
        onFilterSelect={onFilterSelect}
        filter={filter}
        todoCount={todoCount}
        onItemChange={changeItem}
      />
    </section>
  )
}

export default App
