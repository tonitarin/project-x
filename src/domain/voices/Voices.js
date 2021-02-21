const selectRandomIndex = (voices) => Math.floor(Math.random() * voices.length)

const sortAlphabetically = (voices) => {
  return voices.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })
}

const sortReverseAlphabetically = (voices) =>
  sortAlphabetically(voices).reverse()

const uniqueCategories = (voices) =>
  voices.reduce((categories, voice) => {
    if (!categories.includes(...voice.tags)) {
      return [...categories, ...voice.tags]
    }
    return categories
  }, [])

export const Voices = {
  selectRandomIndex,
  sortAlphabetically,
  sortReverseAlphabetically,
  uniqueCategories,
}
