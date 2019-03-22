export default {
  d: {
    validate: char => /^\d$/.test(char)
  },
  w: {
    validate: char => /^\w$/.test(char)
  },
  L: {
    validate: char => /^[A-Z]$/.test(char),
    transform: char => char.toUpperCase()
  },
  l: {
    validate: char => /^[a-z]$/.test(char),
    transform: char => char.toLowerCase()
  },
  A: {
    validate: char => /^[0-9A-Z_]$/.test(char),
    transform: char => char.toUpperCase()
  },
  a: {
    validate: char => /^[0-9a-z_]$/.test(char),
    transform: char => char.toLowerCase()
  },
  '*': {
    validate: char => /^[a-zA-Z]$/.test(char)
  }
}
