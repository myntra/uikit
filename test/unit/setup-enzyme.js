// setup file
const enzyme = require('enzyme')
const { default: Adapter } = require('@cfaester/enzyme-adapter-react-18')

enzyme.configure({ adapter: new Adapter() })

global.shallow = enzyme.shallow
global.mount = enzyme.mount
