import { useState } from 'react'
import PropTypes from 'prop-types'
import './header.css'

function Header({ onItemAdded }) {
  const [label, setLabel] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    onItemAdded(label)
    setLabel('')
  }

  return (
    <header className="header">
      <form onSubmit={onSubmit}>
        <h1>todos</h1>
        <input
          onChange={onLabelChange}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={label}
        ></input>
      </form>
    </header>
  )
}

Header.defaultProps = {
  onItemAdded: () => {},
}

Header.propTypes = {
  onItemAdded: PropTypes.func,
}

export default Header
