import React, { PureComponent } from 'react'

import { Enhancer } from '../table-interface'

export interface Props<T = any> extends BaseProps {
  compare?(a: any, b: any): number
}

function compareFallback(a: any, b: any): number {
  if (a === b) return 0
  if (a < b) return -1
  return 1
}

export default class TableSort extends PureComponent<Props> {
  static enhance: Enhancer<Props> = {
    name: 'sort',

    renderHead({ columnId, value, onChange }, props) {
      return (
        // TODO: Add display logic
        <input
          data-props={props}
          hidden
          value={value}
          onChange={onChange}
          data-column-name={columnId}
        />
      )
    },

    prepareData({ getter, query }, data, { compare }) {
      if (!query || !/^(asc|desc)$/i.test(query)) return data

      const copy = data.slice()

      compare = compare || compareFallback

      copy.sort((a, b) => compare(getter(a), getter(b)))

      return copy
    },
  }

  render() {
    // This component is used to configure table. It won't render anything.

    return <span hidden />
  }
}
