global.requestAnimationFrame = (fn) => fn()
global.CAN_USE_CONTEXT = true // TODO: Use react version and test with multiple versions
global.CAN_USE_HOOKS = true // TODO: Use react version and test with multiple versions
global.__DEV__ = true

// Required for Enzyme with jest-environment-jsdom in Jest 29
const { TextEncoder, TextDecoder } = require('util')
Object.defineProperty(global, 'TextEncoder', { value: TextEncoder })
Object.defineProperty(global, 'TextDecoder', { value: TextDecoder })
