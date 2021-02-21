import React, { useState } from 'react'

import { Header } from '../../components/header'
import { FavouritesVoicesList } from '../../components/favourites-voices-list'
import { ProVoicesList } from '../../components/provoices-list'

import './VoiceSelector.css'
import voices from '../../../data/voices.json'

const VoicesSelector = () => {
  const [proVoices, setProVoices] = useState(voices)
  const [favouriteVoices, setFavouriteVoices] = useState([])

  const isOnFavourites = (voiceId) =>
    favouriteVoices.some((voice) => voice.id === voiceId)

  const removeFromFavourites = (voiceId) => {
    const voiceIndex = favouriteVoices.findIndex(
      (voice) => voice.id === voiceId,
    )
    const newFavouriteVoices = [...favouriteVoices]
    newFavouriteVoices.splice(voiceIndex, 1)
    setFavouriteVoices(newFavouriteVoices)
  }

  const handleHeartClick = (voiceId) => {
    const selectedVoice = proVoices.filter((voice) => voice.id === voiceId)

    if (isOnFavourites(voiceId)) {
      unMarkAsSelected(...selectedVoice)
      removeFromFavourites(voiceId)
      return
    }

    const newFavouriteVoices = [...favouriteVoices, ...selectedVoice]
    markAsSelected(...selectedVoice)
    setFavouriteVoices(newFavouriteVoices)
  }

  const selectRandomIndex = Math.floor(Math.random() * voices.length)

  const handleRandomSelection = () => {
    const selectedVoice = voices[selectRandomIndex]

    if (isOnFavourites(selectedVoice.id)) {
      unMarkAsSelected(selectedVoice)
      removeFromFavourites(selectedVoice.id)
      return
    }

    const newFavouriteVoices = [...favouriteVoices, selectedVoice]
    markAsSelected(selectedVoice)
    setFavouriteVoices(newFavouriteVoices)
  }

  const markAsSelected = (selectedVoice) => {
    const newProVoices = proVoices.map((voice) => {
      if (voice.id === selectedVoice.id) {
        voice.selected = true
      }

      return voice
    })

    setProVoices(newProVoices)
  }

  const unMarkAsSelected = (deselectedVoice) => {
    const newProVoices = proVoices.map((voice) => {
      if (voice.id === deselectedVoice.id) {
        voice.selected = false
      }

      return voice
    })
    setProVoices(newProVoices)
  }

  return (
    <div className="voice-selector">
      <Header
        setProVoices={setProVoices}
        proVoices={proVoices}
        handleRandomSelection={handleRandomSelection}
      />
      <FavouritesVoicesList favouriteVoices={favouriteVoices} />
      <ProVoicesList
        proVoices={proVoices}
        handleHeartClick={handleHeartClick}
      />
    </div>
  )
}

export { VoicesSelector }
