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

  const prefix = []
  const suffix = []

  options.forEach(option => {
    ;(value.has(option[valueKey]) ? prefix : suffix).push(option)
  })

  return prefix.concat(suffix)
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
