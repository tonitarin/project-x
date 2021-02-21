import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import { SearchBox } from '../SearchBox'

describe('SearchBox Unitary Test', () => {
  const onSearch = jest.fn()

  it('should render SearchBox', () => {
    render(<SearchBox value="" onSearch={onSearch} />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should call callback function with text', () => {
    render(<SearchBox value="" onSearch={onSearch} />)
    const searchBox = screen.getByRole('textbox')

    fireEvent.change(searchBox, { target: { value: 'search' } })

    expect(onSearch).toHaveBeenCalledWith('search')
  })

  it('should appear placeholder text and close button on focus', () => {
    render(<SearchBox value="" onSearch={onSearch} />)
    const searchBox = screen.getByRole('textbox')

    fireEvent.focus(searchBox)

    expect(screen.getByPlaceholderText('Type something')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should clean text content on click close button', () => {
    render(<SearchBox value="" onSearch={onSearch} />)
    const searchBox = screen.getByRole('textbox')
    fireEvent.focus(searchBox)
    fireEvent.change(searchBox, { target: { value: 'search' } })

    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)

    expect(screen.queryByText('search')).not.toBeInTheDocument()
  })
})
