import PropTypes from 'prop-types'

import TodoListItem from '../todo-list-item'
import './todo-list.css'

function TodoList({ todos, onToggleProp, onDeleted, onItemChange }) {
  const elements = todos.map(({ id, editing, ...props }) => {
    let classNames = ''

    if (editing) {
      classNames += ' editing'
    }
    if (props.completed) {
      classNames += ' completed'
    }

    return (
      <li key={id} className={classNames}>
        <TodoListItem
          {...props}
          onToggleProp={(prop) => onToggleProp(id, prop)}
          onDeleted={() => onDeleted(id)}
          onItemChange={(text) => onItemChange(id, text)}
        />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TodoList.defaultProps = {
  todos: [],
  onToggleProp: () => {},
  onDeleted: () => {},
  onItemChange: () => {},
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleProp: PropTypes.func,
  onDeleted: PropTypes.func,
  onItemChange: PropTypes.func,
}

export default TodoList
