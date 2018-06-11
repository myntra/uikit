// setup file
var enzyme = require('enzyme') // eslint-disable-line node/no-unpublished-require
var Adapter = require('enzyme-adapter-react-16') // eslint-disable-line node/no-unpublished-require

enzyme.configure({ adapter: new Adapter() })
