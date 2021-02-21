import React from 'react'

import { array } from 'prop-types'
import { VoiceButton } from '../voice-button'
import './FavouritesVoicesList.css'

const FavouritesVoicesList = ({ favouriteVoices }) => {
  return (
    <section className="favourite-voices-list">
      <h2 className="favourite-voices-list__title">
        <span className="favourite-voices-list__text">FAVOURITE VOICES</span>
        <span className="favourite-voices-list__title--middle-line"></span>
      </h2>
      <div className="favourite-voices-list__container">
        {favouriteVoices.map((voice) => (
          <VoiceButton
            key={voice.id}
            voice={voice}
            handleHeartClick={() => null}
            passive
          />
        ))}
      </div>
    </section>
  )
}

FavouritesVoicesList.propTypes = {
  favouriteVoices: array,
}

export { FavouritesVoicesList }
