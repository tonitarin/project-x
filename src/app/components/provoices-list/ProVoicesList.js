import React from 'react'
import { array, func } from 'prop-types'

import { VoiceButton } from '../voice-button'

import './ProVoicesList.css'

const ProVoicesList = ({ proVoices, handleHeartClick }) => {
  return (
    <section className="provoices-list">
      <h2 className="provoices-list__title">
        <span className="provoices-list__text">PRO VOICES</span>
        <span className="provoices-list__title--middle-line"></span>
      </h2>
      <div className="provoices-list__container">
        {proVoices.map((voice) => (
          <VoiceButton
            key={voice.id}
            voice={voice}
            handleHeartClick={handleHeartClick}
          />
        ))}
      </div>
    </section>
  )
}

ProVoicesList.propTypes = {
  proVoices: array.isRequired,
  handleHeartClick: func.isRequired,
}

export { ProVoicesList }
