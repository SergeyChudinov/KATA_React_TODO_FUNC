import PropTypes from 'prop-types'
import './footer.css'

function Footer({ filter, onFilterSelect, onAllDeleted, todoCount }) {
  const buttonData = [
    { name: 'All', label: 'All' },
    { name: 'Active', label: 'Active' },
    { name: 'Completed', label: 'Completed' },
  ]

  const items = buttonData.map(({ name }) => {
    const active = filter === name
    const className = active ? 'selected' : ''

    return (
      <li key={name}>
        <button onClick={() => onFilterSelect(name)} className={className}>
          {name}
        </button>
      </li>
    )
  })

  return (
    <footer className="footer">
      <span className="todo-count">
        {todoCount} item{todoCount > 1 ? 's' : ''} left
      </span>
      <ul className="filters">{items}</ul>
      <button onClick={onAllDeleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  filter: 'All',
  todoCount: 1,
  onFilterSelect: () => {},
  onAllDeleted: () => {},
}

Footer.propTypes = {
  filter: PropTypes.string,
  todoCount: PropTypes.number,
  onFilterSelect: PropTypes.func,
  onAllDeleted: PropTypes.func,
}

export default Footer
