import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import App from '../../../../App'
import {
  alphabeticallySorted,
  inverseAlphabeticallySorted,
} from '../../../../mocks/voices.mock'

describe('Project x tests', () => {
  it('should render the PRO VOICES and FAVOURITE VOICES categories', () => {
    render(<App />)
    expect(screen.getByText('PRO VOICES')).toBeInTheDocument()
    expect(screen.getByText('FAVOURITE VOICES')).toBeInTheDocument()
  })

  it('should render all the voices images', () => {
    render(<App />)
    const voices = screen.getAllByLabelText(/voice button/)
    expect(voices.length).toBe(89)
  })

  it('should add voice to FAVOURITE VOICES category on clicking favourite button', async () => {
    render(<App />)
    const proVoice = screen.getByText('2x1')
    fireEvent.click(proVoice)

    await screen.findAllByText('FAVOURITE VOICES')

    expect(screen.getAllByText('2x1').length).toBe(2)
  })

  it('should remove voice from FAVOURITE VOICES category on clicking favourite button if it was already a favourite voice', async () => {
    render(<App />)
    const proVoice = screen.getByText('2x1')
    fireEvent.click(proVoice)
    await screen.findByText('FAVOURITE VOICES')

    fireEvent.click(proVoice)

    expect(screen.getAllByText('2x1').length).toBe(1)
  })

  it('should search by entered text', () => {
    render(<App />)
    const inputSearch = screen.getByPlaceholderText('Type something')

    fireEvent.change(inputSearch, { target: { value: '2x1' } })

    expect(screen.getByText('2x1')).toBeInTheDocument()
    expect(screen.getAllByLabelText(/voice button/).length).toBe(1)
  })

  it('should filter by category', () => {
    render(<App />)
    const categoryDropdown = screen.getByLabelText('categories')
    fireEvent.click(categoryDropdown)
    const horrorCategory = screen.getByText('horror')
    fireEvent.click(horrorCategory)

    expect(screen.getAllByLabelText(/voice button/).length).toBe(10)
  })

  it('should filter by category and search', () => {
    render(<App />)
    const categoryDropdown = screen.getByLabelText('categories')
    const inputSearch = screen.getByPlaceholderText('Type something')

    fireEvent.click(categoryDropdown)
    const horrorCategory = screen.getByText('devices')
    fireEvent.click(horrorCategory)
    fireEvent.change(inputSearch, { target: { value: '8' } })

    expect(screen.getAllByLabelText(/voice button/).length).toBe(1)
  })

  it('should sort alphabetically reverse', () => {
    render(<App />)
    const sortDropdown = screen.getByLabelText('sort')
    fireEvent.click(sortDropdown)
    const inverseAlphabeticallyOrder = screen.getByText('Descendent')

    fireEvent.click(inverseAlphabeticallyOrder)

    const voices = screen.getAllByLabelText(/voice button/)
    voices.forEach((voice, i) => {
      const voiceName = voice.id
      expect(voiceName).toBe(inverseAlphabeticallySorted[i])
    })
  })

  it('should sort alphabetically', () => {
    render(<App />)
    const sortDropdown = screen.getByLabelText('sort')
    fireEvent.click(sortDropdown)
    const alphabeticallyOrder = screen.getAllByText('Ascendent')[1]

    fireEvent.click(alphabeticallyOrder)

    const voices = screen.getAllByLabelText(/voice button/)
    voices.forEach((voice, i) => {
      const voiceName = voice.id
      expect(voiceName).toBe(alphabeticallySorted[i])
    })
  })

  it('should select random voice when clicking random button', () => {
    jest.spyOn(global.Math, 'floor').mockReturnValue(2)
    render(<App />)
    const randomButton = screen.getByLabelText('random')
    fireEvent.click(randomButton)

    expect(screen.getAllByText('Adult to children').length).toBe(2)
  })
})
