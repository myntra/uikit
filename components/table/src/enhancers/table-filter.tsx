import React, { PureComponent } from 'react'
import { Enhancer } from '../table-interface'

export interface Props<T = any> extends BaseProps {
  options: Array<T>
  renderOption?<Option extends T>(option: Option): JSX.Element
  multiple?: string
  labelKey?: string
  valueKey?: string
}

export default class TableFilter extends PureComponent<Props> {
  static enhance: Enhancer<Props> = {
    name: 'filter',

    renderHead({ columnId, value, onChange }, props) {
      return (
        <input
          data-props={props}
          hidden
          value={value}
          onChange={onChange}
          data-column-name={columnId}
        />
      )
    },

    prepareData({ getter, query }, data) {
      if (query === null || query === undefined) return data

      return data.filter((item) => getter(item) === query)
    },
  }

  render() {
    // This component is used to configure table. It won't render anything.

    return <span hidden />
  }
}
