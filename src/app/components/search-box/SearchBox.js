import React, { useState, useRef, useEffect } from 'react'
import { string, func } from 'prop-types'

import './SearchBox.css'

const SearchBox = ({ value, onSearch }) => {
  const [showCancel, setShowCancel] = useState(false)
  const inputRef = useRef(null)

  const handleShowCancel = () => {
    setShowCancel(!showCancel)
  }

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowCancel(false)
    }
  }

  const onChange = (event) => {
    const { value: searched } = event.target
    onSearch(searched)
  }

  const handleCancel = () => {
    onSearch('')
    setShowCancel(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="searchbox" ref={inputRef}>
      <input
        type="text"
        id="searchbox"
        placeholder="Type something"
        className="searchbox__input"
        value={value}
        onChange={onChange}
        onFocus={handleShowCancel}
      />
      {showCancel && (
        <button
          className="searchbox__button"
          id="cancel-button"
          onClick={handleCancel}
        ></button>
      )}
    </div>
  )
}

SearchBox.propTypes = {
  value: string.isRequired,
  onSearch: func.isRequired,
}

export { SearchBox }
