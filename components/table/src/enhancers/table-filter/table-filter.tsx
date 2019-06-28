import React, { PureComponent } from 'react'
import { Enhancer } from '../../table-interface'
import Filter from './table-filter-dropdown'

export interface Props<T = any> extends BaseProps {
  options?: Array<T>
  renderOption?<Option extends T>(option: Option): JSX.Element
}

export default class TableFilter extends PureComponent<Props> {
  static enhancer: Enhancer<Props, Record<string, any[]>> = {
    name: 'filter',

    renderHead({ columnId, value, onChange, getter }, props, data) {
      return (
        <Filter
          key="filter"
          columnId={columnId}
          getter={getter}
          data={data}
          value={value}
          onChange={onChange}
          {...props}
        />
      )
    },

    prepareData({ getter, query, columnId }, data) {
      if (!query) return data
      if (!query[columnId]) return data
      if (!query[columnId].length) return data

      const value = new Set(query[columnId])

      return data.filter((item) => value.has(getter(item)))
    },
  }

  render() {
    // This component is used to configure table. It won't render anything.
    return <span hidden />
  }
}
