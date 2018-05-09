import { classnames, unique, objectWithoutProperties, onlyExtraProps } from '.'

describe('classnames', () => {
  it('should format class names', () => {
    expect(classnames('foo', 'bar', { baz: true, zen: false }, ['and', undefined, null, 1]).toString()).toBe(
      'foo bar baz and'
    )
  })

  it('should apply css modules', () => {
    expect(
      classnames('foo', 'bar', { baz: true, zen: false }, ['and', undefined, null, 1], undefined).use({
        foo: 'foo0',
        bar: 'bar0',
        and: 'and0'
      })
    ).toBe('foo0 bar0 and0')
  })
})

describe('unique', () => {
  it('should remove duplicates', () => {
    expect(unique([1, 1, 2, 2, 2])).toEqual([1, 2])
    expect(unique([1, 1, 2, null, 2, 'foo'])).toEqual([1, 2, null, 'foo'])
  })
})

describe('objectWithoutProperties', () => {
  it('should remove keys', () => {
    expect(objectWithoutProperties({ foo: 1, bar: 2 }, ['foo'])).toEqual({ bar: 2 })
  })

  it('should ignore prototype keys', () => {
    class Foo {
      constructor() {
        this.foo = 1
      }
      bar() {}
    }
    expect(objectWithoutProperties(new Foo(), ['foo'])).toEqual({})
  })

  it('should remove matching keys', () => {
    expect(objectWithoutProperties({ foo: 1, bar: 2 }, { foo: 3 })).toEqual({ bar: 2 })
  })
})

describe('onlyExtraProps', () => {
  it('should remove extra props', () => {
    const only = onlyExtraProps({ foo: null })

    expect(only({ foo: 1, bar: 2 })).toEqual({ bar: 2 })
  })

  it('should memoize results', () => {
    const only = onlyExtraProps({ foo: null })
    const props = { foo: 1, bar: 2 }

    expect(only(props)).toEqual({ bar: 2 })

    props.bar = 3
    expect(only(props)).toEqual({ bar: 2 })
  })

  it('should refresh results when props change', () => {
    const only = onlyExtraProps({ foo: null })
    let props = { foo: 1, bar: 2 }

    expect(only(props)).toEqual({ bar: 2 })

    props = { ...props, bar: 3 }
    expect(only(props)).toEqual({ bar: 3 })
  })
})
