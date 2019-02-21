import compile from './JSONSchema'

const schemaToUI = new WeakMap()

export function generateUISchema(schema, options) {
  const name = '$root'
  const context = { ...options, generate, compile, resolveComponent, resolveOptions, resolveProps }

  function generate(schema, config) {
    return generateAnyField(schema, config, context)
  }

  function resolveComponent(...names) {
    for (const name of names) {
      if (name) {
        const component = options.resolveComponent(name)

        if (component) return component
      }
    }
  }

  function resolveOptions(format) {
    if (options.resolveOptions) return options.resolveOptions(format)
  }

  const ui = generate(schema, { name })

  return ui
}

const defaultProcessors = {
  title: label => ({ label }),
  description: description => ({ description }),
  default: defaultValue => ({ 'data-default-value': defaultValue })
}
function resolveProps(schema, processors = {}) {
  const layout = schema.layout

  const props = Object.assign(
    {},
    ...Object.keys(schema).map(key => {
      if (key in processors) return processors[key](schema[key], schema)
      if (key in defaultProcessors) return defaultProcessors[key](schema[key], schema)
    }),
    schema.props
  )

  return { props, layout }
}

// Any
const generators = {
  object: generateObjectField,
  array: generateArrayField,
  string: generateStringField,
  number: generateNumberField,
  integer: generateNumberField,
  boolean: generateBooleanField,
  enum: generateEnumField,
  const: generateConstField
}

function generateAnyField(schema, options, context) {
  if (schemaToUI.has(schema)) return schemaToUI.get(schema)

  const generator =
    'type' in schema
      ? generators[schema.type]
      : 'enum' in schema
        ? generators.enum
        : 'const' in schema
          ? generators.const
          : () => null
  const ui = generator(schema, options, context)

  schemaToUI.set(schema, ui)

  return ui
}

// Object
const objectProcessors = {
  required: names => (Array.isArray(names) ? { required: names } : {})
}

function generateObjectField(schema, { name }, { generate, resolveComponent, resolveProps, compile }) {
  const fields = Object.entries(schema.properties)

  const { props, layout } = resolveProps(schema, objectProcessors)
  const getDerivedPropsFromValue = compile(schema)
  const children = fields.map(([name, subSchema]) => generate(subSchema, { name }))

  const component = resolveComponent(schema.component)

  return {
    type: 'object',
    name,
    component,
    props,
    layout,
    children,
    getDerivedPropsFromValue
  }
}

// Array
const arrayProcessors = {
  maxItems: max => (Number.isSafeInteger(max) ? { max } : {}),
  mimItems: max => (Number.isSafeInteger(max) ? { max } : {})
}
function generateArrayField(schema, { name }, { generate, resolveComponent, resolveOptions, resolveProps, compile }) {
  const { props, layout } = resolveProps(schema, arrayProcessors)
  const getDerivedProps = compile(schema)
  const isSelect = schema.items.type === 'string' && !!schema.items.format && !!resolveOptions(schema.items.format)

  if (isSelect) props.multiple = true

  const getDerivedPropsFromValue = isSelect
    ? (...args) => ({ ...getDerivedProps(...args), options: resolveOptions(schema.items.format) })
    : getDerivedProps

  const items = generate(schema.items, { name })
  const component = isSelect
    ? resolveComponent(schema.items.component, 'Form.Select')
    : resolveComponent(schema.component)

  function factory(index) {
    return items
  }

  return {
    type: isSelect ? 'field' : 'array',
    name,
    component,
    props,
    layout,
    factory,
    getDerivedPropsFromValue
  }
}

const formatComponents = {
  date: 'Form.Date'
}
// String
function generateStringField(
  schema,
  { name },
  { generate, resolveComponent, resolveOptions, resolveProps, formats = {} }
) {
  const { props, layout } = resolveProps(schema)
  const getDerivedProps = compile(schema)
  const format = schema.format
  const isSelect = !!format && !!resolveOptions(format)
  const component = resolveComponent(
    schema.component,
    formats[format],
    formatComponents[format],
    isSelect ? 'Form.Select' : 'Form.Text'
  )
  const getDerivedPropsFromValue = isSelect
    ? (...args) => ({
        ...getDerivedProps(...args),
        options: resolveOptions(format)
      })
    : getDerivedProps

  return {
    type: 'field',
    name,
    component,
    props,
    layout,
    getDerivedPropsFromValue
  }
}

// Number
const numberProcessors = {
  type: type => (type === 'integer' ? { step: 1 } : {})
}

function generateNumberField(schema, { name }, { generate, resolveComponent }) {
  const { props, layout } = resolveProps(schema, numberProcessors)
  const getDerivedPropsFromValue = compile(schema)

  const component = resolveComponent(schema.component, 'Form.Number')

  return {
    type: 'field',
    name,
    component,
    props,
    layout,
    getDerivedPropsFromValue
  }
}

// Boolean
function generateBooleanField(schema, { name }, { generate, resolveComponent }) {
  const { props, layout } = resolveProps(schema)
  const getDerivedPropsFromValue = compile(schema)

  const component = resolveComponent(schema.component, 'Form.CheckBox')

  return {
    type: 'field',
    name,
    component,
    props,
    layout,
    getDerivedPropsFromValue
  }
}

// Enum
function generateEnumField(schema, { name }, { generate, resolveComponent }) {
  const { props, layout } = resolveProps(schema)
  const getDerivedPropsFromValue = compile(schema)

  const component = resolveComponent(schema.component, 'Form.Select')

  if (!props.options) {
    props.options = schema.enum.map(value => ({ label: value, value }))
  }

  return {
    type: 'field',
    name,
    component,
    props,
    layout,
    getDerivedPropsFromValue
  }
}

// const
const constComponents = {
  string: 'Form.Text',
  number: 'Form.Number',
  boolean: 'Form.CheckBox'
}

function generateConstField(schema, { name }, { generate, resolveComponent }) {
  const { props, layout } = resolveProps(schema)
  const getDerivedPropsFromValue = compile(schema)

  const component = resolveComponent(schema.component, constComponents[typeof schema.const])

  props.readOnly = true
  props.value = schema.const

  return {
    type: 'field',
    name,
    component,
    props,
    layout,
    getDerivedPropsFromValue
  }
}
