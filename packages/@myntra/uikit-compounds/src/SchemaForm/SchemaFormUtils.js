import { compile } from './JSONSchema'

export function assert(condition, message) {
  if (!condition) throw new Error(message)
}

export function generateUISchema(schema, componentResolver) {
  assert(schema.type === 'object', 'Invalid schema, expected "object" as root type')

  return generateField({ name: '$root', path: '#', field: schema, schema, componentResolver })
}

function generateField({ name, path, field, schema, componentResolver, props }) {
  field.type && assert(typeof field.type === 'string', 'Invalid field type, expected "type" key to be string')
  if (field.type === 'object') {
    assert('properties' in field, 'Invalid "object" type field, expected "properties" key')

    const keys = Object.keys(field.properties)
    const required = new Set(field.required)
    const children = keys.map(name =>
      generateField({
        name,
        field: field.properties[name],
        schema,
        componentResolver,
        path: `${path}/properties/${name}`,
        props: {
          required: required.has(name)
        }
      })
    )

    const props = { ...field.ui, name }

    Object.keys(KEYS_TO_BE_COPIED).forEach(key => {
      const target = KEYS_TO_BE_COPIED[key] || key
      if (field[key]) props[target] = field[key]
    })
    const dependencies = prepareDependencies({ name, path, field, schema })

    return {
      name,
      path,
      component: componentResolver('SchemaForm.Object'),
      children,
      props,
      dependencies
    }
  } else if (field.type === 'array') {
    assert('items' in field, 'Invalid "array" type field, expected "items" key')

    const children = [generateField({ name, field: field.items, schema, componentResolver, path: `${path}/items` })]

    const props = { ...field.ui, name }

    Object.keys(KEYS_TO_BE_COPIED).forEach(key => {
      const target = KEYS_TO_BE_COPIED[key] || key
      if (field[key]) props[target] = field[key]
    })

    return { name, path, component: componentResolver('SchemaForm.Array'), children, props }
  } else {
    const [component, localProps] = generatePrimitive(name, path, field, componentResolver)

    return { name, path, component, props: { ...props, ...localProps } }
  }
}

const KEYS_TO_BE_COPIED = { title: 'label', description: '', pattern: '', readOnly: '', multipleOf: 'step' }

function generatePrimitive(
  name,
  path,
  { type: type$, enum: enum$, format: format$, ui = {}, ...field },
  componentResolver
) {
  const { component, ...props } = ui

  props.name = name

  Object.keys(KEYS_TO_BE_COPIED).forEach(key => {
    const target = KEYS_TO_BE_COPIED[key] || key
    if (field[key]) props[target] = field[key]
  })

  if (component) {
    const ref = componentResolver(component)

    assert(ref, `Unknown component <${component}>`)

    return [ref, props]
  }

  if (enum$) {
    if (enum$.length < 5) {
      return [componentResolver('Form.RadioGroup'), props]
    } else {
      return [componentResolver('Form.Select'), props]
    }
  }

  switch (type$) {
    case 'number':
      return [componentResolver('Form.Number'), props]
    case 'integer':
      return [componentResolver('Form.Number'), { step: 1, ...props }]
    case 'boolean':
      return [componentResolver('Form.Switch'), props]
    case 'string':
      if (!format$) return [componentResolver('Form.Text'), props]
      if (format$.startsWith('~')) return [componentResolver('Form.Select'), props]
      return [componentResolver('Form.Text'), { ...props, type: format$ }]
  }

  return []
}

function prepareDependencies({ field }) {
  if (!field.dependencies) return

  return compile({ dependencies: field.dependencies })
}
