import React, { useState } from 'react'
import { array, func } from 'prop-types'

import { Voices } from '../../../domain/voices'
import { SearchBox } from '../search-box'
import { DropdownSelect } from '../dropdown-select'
import { IconButton } from '../icon-button'

import filterIcon from './assets/filter.svg'
import orderIcon from './assets/order.svg'
import voices from '../../../data/voices.json'
import './Header.css'

const SORT_OPTIONS = ['Ascendent', 'Descendent']

const Header = ({ setProVoices, proVoices, handleRandomSelection }) => {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedOrder, setSelectedOrder] = useState(SORT_OPTIONS[0])

  const handleSearch = (searched) => {
    getFilteredVoices(searched, selectedCategory)
    setSearch(searched)
  }

  const handleSelectCategory = (newSelectedCategory) => {
    getFilteredVoices(search, newSelectedCategory)
    setSelectedCategory(newSelectedCategory)
  }

  const getFilteredVoices = (search, selectedCategory) => {
    if (selectedCategory !== 'All' && search) {
      const filteredProVoicesByCategoryAndSearch = voices.filter((voice) => {
        return (
          voice.tags.includes(selectedCategory) && voice.name.includes(search)
        )
      })
      setProVoices(filteredProVoicesByCategoryAndSearch)
      return
    }

    if (selectedCategory !== 'All' && !search) {
      const filteredProVoicesByCategory = voices.filter((voice) => {
        return voice.tags.includes(selectedCategory)
      })
      setProVoices(filteredProVoicesByCategory)
      return
    }

    if (selectedCategory === 'All' && search) {
      const filteredProVoicesBySearch = voices.filter((voice) => {
        return voice.name.includes(search)
      })
      setProVoices(filteredProVoicesBySearch)
      return
    }

    setProVoices(voices)
  }

  const uniqueCategories = ['All', ...Voices.uniqueCategories(voices)]

  const sortProVoices = (selectedOption) => {
    const unsortedProVoices = [...proVoices]
    if (selectedOption === SORT_OPTIONS[0]) {
      const ascSort = Voices.sortAlphabetically(unsortedProVoices)
      setProVoices(ascSort)
      setSelectedOrder(selectedOption)
      return
    }

    const descSort = Voices.sortReverseAlphabetically(unsortedProVoices)
    setProVoices(descSort)
    setSelectedOrder(selectedOption)
  }

  return (
    <header className="header">
      <SearchBox value={search} onSearch={handleSearch} />
      <div className="header__right-block">
        <DropdownSelect
          icon={filterIcon}
          options={uniqueCategories}
          value={selectedCategory}
          handleSelect={handleSelectCategory}
          name="categories"
        />
        <DropdownSelect
          icon={orderIcon}
          options={SORT_OPTIONS}
          value={selectedOrder}
          handleSelect={sortProVoices}
          name="sort"
        />
        <IconButton type="random" onClick={handleRandomSelection} />
      </div>
    </header>
  )
}

Header.propTypes = {
  proVoices: array.isRequired,
  setProVoices: func.isRequired,
  handleRandomSelection: func.isRequired,
}

export { Header }
