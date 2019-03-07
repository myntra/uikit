import { toString, toArray, createSearchIndex, executeFilterSearch } from './helpers'

test('toString', () => {
  expect(toString('foo')).toBe('foo')
  expect(toString(null)).toBe('')
  expect(toString(undefined)).toBe('')
  expect(toString(true)).toBe('true')
  expect(toString(false)).toBe('false')
  expect(toString(1)).toBe('1')
  expect(toString(0)).toBe('0')
  expect(toString({ foo: 'bar' })).toBe('{"foo":"bar"}')
})

test('toArray', () => {
  expect(toArray('foo')).toEqual(['foo'])
  expect(toArray(null)).toEqual([])
  expect(toArray(undefined)).toEqual([])
  expect(toArray(true)).toEqual([true])
  expect(toArray(false)).toEqual([false])
  expect(toArray(1)).toEqual([1])
  expect(toArray(0)).toEqual([0])
  expect(toArray({ foo: 'bar' })).toEqual([{ foo: 'bar' }])
})

describe('executeFilterSearch', () => {
  const options = ['foo', 'bar', 'baz', 'yay', 'nay'].map(value => ({ value }))
  const sifter = createSearchIndex(options)
  const config = {
    searchableKeys: ['value'],
    sortBy: 'value',
    sortOrder: 'asc'
  }

  it('should filter items', () => {
    expect(executeFilterSearch(sifter, options, '', config)).toHaveLength(5)
    expect(executeFilterSearch(sifter, options, 'ba', config)).toHaveLength(2)
  })

  it('should filter items with custom filter', () => {
    const custom = {
      ...config,
      filterOptions: item => /[fry]/.test(item.value)
    }
    expect(executeFilterSearch(sifter, options, '', custom)).toHaveLength(4)
    expect(executeFilterSearch(sifter, options, 'ba', custom)).toHaveLength(1)
  })
})
