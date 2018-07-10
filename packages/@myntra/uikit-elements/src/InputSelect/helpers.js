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

export const sortOptions = (options, searchValue, labelKey) => {
  // sort options. selected should appear at top.
  const setOfValues = new Set(toArray(searchValue))
  options.sort((a, b) => {
    if (setOfValues.has(a[labelKey]) && setOfValues.has(b[labelKey])) return 0
    if (setOfValues.has(b[labelKey])) return 1
    return 0
  })

  return options.slice(0, Math.max(20, toArray(searchValue).length))
}

export const createSearchIndex = options => {
  return new Sifter(options)
}

export const executeFilterSearch = (sifter, list, keyword, options) => {
  const { searchableKeys, sortBy, sortOrder, filterOptions } = options
  const results = sifter.search(keyword, {
    fields: searchableKeys,
    sort: [{ field: sortBy, direction: sortOrder }],
    limit: 20
  })

  const target = results.items.map(({ id: index }) => list[index])

  if (filterOptions) {
    return target.filter(filterOptions)
  }

  return target
}
