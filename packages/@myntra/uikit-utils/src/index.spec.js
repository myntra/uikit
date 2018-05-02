import { classnames, unique } from '.'

describe('classnames', () => {
  it('should format class names', () => {
    expect(classnames('foo', 'bar', { baz: true, zen: false }, ['and', undefined, null, 1]).toString()).toBe(
      'foo bar baz and'
    )
  })

  it('should apply css modules', () => {
    expect(
      classnames('foo', 'bar', { baz: true, zen: false }, ['and', undefined, null, 1]).use({
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
