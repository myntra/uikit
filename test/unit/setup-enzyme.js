// setup file
const enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const { testCodeMod } = require('@myntra/codemod-utils')

enzyme.configure({ adapter: new Adapter() })

global.mountShallow = enzyme.shallow
global.mount = enzyme.mount
global.testCodeMod = testCodeMod
