import React from 'react'
import { string, func } from 'prop-types'

import './IconButton.css'
import randomIcon from './assets/button-random.svg'

const BUTTON_TYPES = {
  RANDOM: 'random',
}

const IconButton = ({ type, onClick }) => {
  return (
    <button onClick={onClick} aria-label={type} className="icon-button">
      {type === BUTTON_TYPES.RANDOM && <img src={randomIcon} alt="" />}
    </button>
  )
}

IconButton.propTypes = {
  type: string.isRequired,
  onClick: func.isRequired,
}

export { IconButton }
