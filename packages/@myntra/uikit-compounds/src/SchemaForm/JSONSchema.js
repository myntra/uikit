export function compile(schema) {
  const keys = Object.keys(schema)

  return keys.map(key => FIELDS[key] && FIELDS[key](schema[key])).filter(Boolean)
}

function passes(instance, ...validators) {
  try {
    validators.forEach(validate => validate(instance))

    return true
  } catch (e) {
    return false
  }
}

function merge(target, ...schemas) {
  for (const schema of schemas) {
    for (const key in schema) {
      switch (key) {
        case 'required':
          target.required = [].concat(target.required).concat(schema.required)
          break
        default:
          target[key] = schema[key]
          break
      }
    }
  }

  return target
}

function validate(instance, ...validators) {
  const errors = []
  const results = {}
  validators.forEach(validator => {
    try {
      merge(results, validator(instance))
    } catch (e) {
      errors.push(e)
    }
  })

  return { errors, results }
}

function has(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key)
}

class SchemaValidationError extends Error {
  constructor(instance, errors, schema) {
    super(`'${JSON.stringify(instance)}' does not matches defined schema ${JSON.stringify(schema)}'`)
    this.instance = instance
    this.schema = schema
    this.errors = errors.filter(Boolean).map(error => (error instanceof Error ? error.message : error.toString()))
  }
}

class SchemaFieldError extends Error {}

function assert(condition, message) {
  if (!condition) throw new SchemaFieldError(message)
}

function isNumber(value) {
  return typeof value === 'number'
}

function isString(value) {
  return typeof value === 'string'
}

const FIELDS = {
  dependencies: dependencies => {
    const handlers = {}
    for (const key in dependencies) {
      const dependency = dependencies[key]

      handlers[key] = Array.isArray(dependency) ? () => ({ required: dependency }) : compile(dependency)
    }

    return instance => {
      if (instance && typeof instance === 'object') {
        const keys = Object.keys(instance)
        const results = keys.map(key => handlers[key] && handlers[key](instance))

        return merge({}, ...results)
      }
    }
  },
  title: title => instance => ({ title }),
  description: description => instance => ({ description }),
  default: value => instance => ({ default: value }),
  readOnly: readOnly => instance => ({ readOnly }),
  writeOnly: writeOnly => instance => ({ writeOnly }),
  multipleOf: k => instance =>
    isNumber(instance) && assert(instance % k === 0, `The {{field}} should be multiple of ${k}`),
  maximum: max => instance =>
    isNumber(instance) && assert(instance <= max, `The {{field}} should be less than or equal to ${max}`),
  exclusiveMaximum: max => instance =>
    isNumber(instance) && assert(instance < max, `The {{field}} should be less than ${max}`),
  minimum: min => instance =>
    isNumber(instance) && assert(instance >= min, `The {{field}} should be more than or equal to ${min}`),
  exclusiveMinimum: min => instance =>
    isNumber(instance) && assert(instance > min, `The {{field}} should be more than ${min}`),
  maxLength: length => instance =>
    isString(instance) && assert(instance.length <= length, `The {{field}} should have less than ${length} characters`),
  minLength: length => instance =>
    isString(instance) && assert(instance.length >= length, `The {{field}} should have more than ${length} characters`),
  pattern: pattern => {
    const re = new RegExp(pattern)
    const message = `The {{field}} should match pattern (${pattern}).`

    return instance => isString(instance) && assert(re.test(instance), message)
  },
  if(schema) {
    if (!has(schema, 'if')) return

    const condition = compile(schema.if)
    const if$ = instance => passes(instance, condition)
    const then$ = compile(schema.then)
    const else$ = compile(schema.else)

    return instance => (if$(instance) ? then$(instance) : else$(instance))
  },
  allOf(schema) {
    if (!has(schema, 'allOf')) return

    const conditions = schema.allOf.map(compile)

    return instance => {
      const { errors, results } = validate(instance, ...conditions)

      if (errors.length) throw new SchemaValidationError(instance, errors, schema)

      return results
    }
  },
  oneOf(schema) {
    if (!has(schema, 'oneOf')) return

    const conditions = schema.oneOf.map(compile)

    return instance => {
      const { errors, results } = validate(instance, ...conditions)

      if (errors.length + 1 !== conditions.length) throw new SchemaValidationError(instance, errors, schema)

      return results
    }
  },
  anyOf(schema) {
    if (!has(schema, 'any')) return

    const conditions = schema.anyOf.map(compile)

    return instance => {
      const { errors, results } = validate(instance, ...conditions)

      if (errors.length === conditions.length) throw new SchemaValidationError(instance, errors, schema)

      return results
    }
  },
  not(schema) {
    if (!has(schema, 'not')) return

    const condition = compile(schema.not)

    return instance => {
      if (passes(instance, condition)) throw new SchemaValidationError(instance, [], schema)

      return {}
    }
  }
}
