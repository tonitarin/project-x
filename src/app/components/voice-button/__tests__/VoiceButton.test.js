import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import { VoiceButton } from '../VoiceButton'

const voice = {
  id: '2x1',
  name: '2x1',
  icon: 'VoicesVoiceIcon01.png',
  tags: ['misc'],
}

const handleHeartClick = jest.fn()

describe('Voice Button Unitary Test', () => {
  it('should render a voice button', () => {
    render(<VoiceButton voice={voice} handleHeartClick={handleHeartClick} />)

    const voiceIcon = screen.getByAltText('2x1')
    const voiceTitle = screen.getByText('2x1')

    expect(voiceIcon).toBeInTheDocument()
    expect(voiceTitle).toBeInTheDocument()
  })

  it('should call onclick function with voice id when clicked', () => {
    render(<VoiceButton voice={voice} handleHeartClick={handleHeartClick} />)

    const voiceButton = screen.getByRole('button')
    fireEvent.click(voiceButton)

    expect(handleHeartClick).toHaveBeenCalledWith('2x1')
  })

  it('should appear a grey heart icon when hover button if it\'s not selected', () => {
    render(<VoiceButton voice={voice} handleHeartClick={handleHeartClick} />)

    const voiceButton = screen.getByRole('button')
    fireEvent.mouseOver(voiceButton)

    expect(screen.getByLabelText('no selected')).toBeInTheDocument()
  })

  it('should appear a blue heart icon when hover button if it\'s selected', () => {
    const selectedVoice = {
      ...voice,
      selected: true,
    }
    render(
      <VoiceButton voice={selectedVoice} handleHeartClick={handleHeartClick} />,
    )

    const voiceButton = screen.getByRole('button')
    fireEvent.mouseOver(voiceButton)

    expect(screen.getByLabelText('selected')).toBeInTheDocument()
  })

  it('should not appear a heart icon on hover if it is passive', () => {
    render(
      <VoiceButton voice={voice} handleHeartClick={handleHeartClick} passive />,
    )

    const voiceButton = screen.getByRole('button')
    fireEvent.mouseOver(voiceButton)

    expect(screen.queryByLabelText('no selected')).not.toBeInTheDocument()
  })

  it('should not call onclick function with voice id when clicked if it is passive', () => {
    render(
      <VoiceButton voice={voice} handleHeartClick={handleHeartClick} passive />,
    )

    const voiceButton = screen.getByRole('button')
    fireEvent.click(voiceButton)

    expect(handleHeartClick).not.toHaveBeenCalled()
  })
})
