import Sifter from 'sifter'

export const toString = any => {
  if (typeof any === 'string') return any
  if (any === undefined || any === null) return ''
  return JSON.stringify(any)
}

export const toArray = any => {
  if (Array.isArray(any)) return any
  if (any === undefined || any === null) return []
  return [any]
}

export const moveSelectedOptionsToTop = (options, selectedOptionValues, valueKey) => {
  // sort options. selected should appear at top.
  const value = new Set(toArray(selectedOptionValues))

  options = options.slice()

  options.sort((a, b) => {
    if (value.has(a[valueKey]) && value.has(b[valueKey])) return 0
    if (value.has(b[valueKey])) return 1
    return -1
  })

  return options
}

export const createSearchIndex = options => {
  return new Sifter(options)
}

export const executeFilterSearch = (sifter, options, keyword, config) => {
  const { searchableKeys, sortBy, sortOrder, filterOptions, limit } = config
  const results = sifter.search(keyword, {
    fields: searchableKeys,
    sort: [{ field: sortBy, direction: sortOrder }],
    limit: limit || options.length
  })

  const target = results.items.map(({ id: index }) => options[index])

  if (filterOptions) {
    return target.filter(filterOptions)
  }

  return target
}
