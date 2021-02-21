import React, { useState, useRef, useEffect } from 'react'
import { array, func, string } from 'prop-types'

import './DropdownSelect.css'

const DropdownSelect = ({ options, value, handleSelect, icon, name }) => {
  const [opened, setOpened] = useState(false)
  const dropdownRef = useRef(null)

  const className = `dropdown-select__arrow ${
    opened ? 'dropdown-select__arrow--opened' : 'dropdown-select__arrow--closed'
  }`

  const handleOpen = () => {
    setOpened(!opened)
  }

  const handleSelectOption = (event) => {
    const { id: selectedOption } = event.target

    handleSelect(selectedOption)
    setOpened(false)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpened(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="dropdown-select" ref={dropdownRef}>
      <div className="dropdown-select__button-container">
        <img src={icon} alt="" className="dropdown-select__icon" />
        <button
          className="dropdown-select__button"
          onClick={handleOpen}
          aria-label={name}
        >
          <span>{value}</span>
          <div className={className}></div>
        </button>
      </div>
      {opened && (
        <ul className="dropdown-select__options-container">
          {options.map((option) => (
            <li
              key={option}
              id={option}
              className="dropdown-select__option-item"
              onClick={handleSelectOption}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

DropdownSelect.propTypes = {
  icon: string,
  options: array.isRequired,
  value: string.isRequired,
  handleSelect: func.isRequired,
  name: string,
}

export { DropdownSelect }
