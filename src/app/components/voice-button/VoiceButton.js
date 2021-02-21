import React from 'react'
import { object, func, bool } from 'prop-types'

import './VoiceButton.css'

const VoiceButton = ({ voice, handleHeartClick, passive }) => {
  const classNameIcon = () =>
    `voice-button__icon ${
      !passive && voice.selected
        ? 'voice-button__icon--selected'
        : 'voice-button__icon--no-selected'
    }`

  const classNameTitle = () =>
    `voice-button__title ${
      !passive && voice.selected
        ? 'voice-button__title--selected'
        : 'voice-button__title--no-selected'
    }`

  const onClick = () => {
    if (passive) {
      return
    }

    handleHeartClick(voice.id)
  }
  return (
    <button
      onClick={onClick}
      className="voice-button"
      aria-label={`voice button ${voice.name}`}
      id={voice.name}
    >
      {!passive && voice.selected && (
        <div
          className="voice-button__selection-heart--on"
          aria-label="selected"
        ></div>
      )}
      {!passive && !voice.selected && (
        <div
          className="voice-button__selection-heart--off"
          aria-label="no selected"
        ></div>
      )}
      <div className={classNameIcon()}>
        <img
          alt={voice.name}
          src={`${process.env.PUBLIC_URL}/assets/${voice.icon}`}
        />
      </div>
      <span className={classNameTitle()}>{voice.name}</span>
    </button>
  )
}

VoiceButton.propTypes = {
  voice: object.isRequired,
  handleHeartClick: func.isRequired,
  passive: bool,
}

export { VoiceButton }
