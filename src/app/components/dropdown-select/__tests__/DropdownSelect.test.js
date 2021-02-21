import React, { Fragment } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import { DropdownSelect } from '../DropdownSelect'

describe('Category Select Unitary Test', () => {
  const defaultOptions = ['One', 'Two']
  const handleSelect = jest.fn()

  it('should render Category Select dropdown with default value', () => {
    render(
      <DropdownSelect
        handleSelect={handleSelect}
        options={defaultOptions}
        value="All"
      />,
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('All')).toBeInTheDocument()
  })

  it('should open options container on click', () => {
    render(
      <DropdownSelect
        handleSelect={handleSelect}
        options={defaultOptions}
        value="All"
      />,
    )
    const dropdownButton = screen.getByRole('button')
    fireEvent.click(dropdownButton)

    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
  })

  it('should call callback function with selected option and close the option container', () => {
    render(
      <DropdownSelect
        handleSelect={handleSelect}
        options={defaultOptions}
        value="All"
      />,
    )
    const dropdownButton = screen.getByRole('button')
    fireEvent.click(dropdownButton)
    const selectedOption = screen.getByText('One')
    fireEvent.click(selectedOption)

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(handleSelect).toHaveBeenCalledWith('One')
  })

  it('should close dropdown clicking outside of it', () => {
    render(
      <Fragment>
        <DropdownSelect
          handleSelect={handleSelect}
          options={defaultOptions}
          value="All"
        />
        <p>Outside</p>
      </Fragment>,
    )
    const dropdownButton = screen.getByRole('button')
    fireEvent.click(dropdownButton)
    const outsideElement = screen.getByText('Outside')
    fireEvent.click(outsideElement)

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
