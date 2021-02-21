import voices from '../data/voices.json'

const alphabeticallySorted = voices
  .map((voice) => voice.name)
  .sort((a, b) => {
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
    return 0
  })

const inverseAlphabeticallySorted = [...alphabeticallySorted].reverse()

export { alphabeticallySorted, inverseAlphabeticallySorted }
