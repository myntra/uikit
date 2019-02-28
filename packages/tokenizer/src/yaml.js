const yaml = require('js-yaml')
const schema = require('./schema.json')

const TOKENS_SCHEMA = yaml.Schema.create([yaml.DEFAULT_FULL_SCHEMA], [ShadowType])

module.exports = 
