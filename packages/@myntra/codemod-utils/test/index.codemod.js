import { createHelper } from '../'

export function addNamedImport(file, api) {
  const { h } = createHelper(file, api)

  h.addNamedImport('foo', 'Foo')

  return h.toSource()
}

export function addDefaultImport(file, api) {
  const { h } = createHelper(file, api)

  h.addDefaultImport('foo', 'Foo')

  return h.toSource()
}

export function renameProp(file, api) {
  const { h } = createHelper(file, api)

  h.renameProp('Foo', 'foo', 'bar')

  return h.toSource()
}

export function convertProp(file, api) {
  const { h } = createHelper(file, api)

  h.coerceProp('Foo', 'foo', value => Boolean(value))

  return h.toSource()
}
