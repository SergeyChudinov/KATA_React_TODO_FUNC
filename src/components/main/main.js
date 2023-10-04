import TodoList from '../todo-list'
import Footer from '../footer'
import './main.css'

function Main({ todos, onToggleProp, onDeleted, onAllDeleted, onFilterSelect, filter, todoCount, onItemChange }) {
  return (
    <section className="main">
      <TodoList todos={todos} onToggleProp={onToggleProp} onDeleted={onDeleted} onItemChange={onItemChange} />
      <Footer onFilterSelect={onFilterSelect} filter={filter} onAllDeleted={onAllDeleted} todoCount={todoCount} />
    </section>
  )
}

export default Main
