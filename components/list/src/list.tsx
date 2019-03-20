export interface ListProps<T> extends BaseProps {
  items: T[]

  children: ({ index: number, item: T }) => any

  value: T | T[]

  onChange: (value: T|T[]) => void

  idForItem: (item: T) => T | number | string

  multiple: boolean
}
