const yaml = require('js-yaml')
const { resolve, Value } = require('./utils')

class Shadow extends Value {
  constructor(x, y, blur, spread, color) {
    super()
    this.offset = { x, y }
    this.blur = blur
    this.spread = spread
    this.color = color
  }

  static create(str) {
    const res = Shadow.REGEXP.exec(str.trim())

    return new Shadow(res[1], res[2], res[3], res[4], res[6])
  }

  onResolve(resolve) {
    const meta = { transformTo: 'px' }
    return new Shadow(
      resolve(this.offset.x, meta),
      resolve(this.offset.y, meta),
      resolve(this.blur, meta),
      resolve(this.spread, meta),
      resolve(this.color, meta)
    )
  }

  toJSON() {
    return `${this.offset.x} ${this.offset.y} ${this.blur} ${this.spread || ''} ${this.color}`
  }

  toString() {
    return this.toJSON()
  }
}

Shadow.REGEXP = /^([^\s]+)[\s]+([^\s]+)[\s]+([^\s]+)[\s]+(([^\s]+)[\s]+)?(.*)$/i

const ShadowType = new yaml.Type('tag:yaml.org,2002:js/shadow', {
  kind: 'scalar',
  construct: str => Shadow.create(str)
})

const TOKENS_SCHEMA = yaml.Schema.create([yaml.DEFAULT_FULL_SCHEMA], [ShadowType])

module.exports = {
  Value,
  parse: content => resolve(yaml.load(content, { schema: TOKENS_SCHEMA }))
}
