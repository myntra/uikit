import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from '@myntra/uikit-elements'
import styles from './PropTypeDocumenter.css'

export default function PropTypeDocumenter({ name, value, raw, meta = [] } = {}) {
  switch (name) {
    case 'enum':
      return (
        <Dropdown trigger={<span className={styles.trigger}>enum</span>}>
          <div className={styles.list}>
            {value.map((item, index) => (
              <div key={index}>
                <code>{item.value}</code>
              </div>
            ))}
          </div>
        </Dropdown>
      )
    case 'func':
      return (
        <span className={styles.func}>
          function({meta
            .filter(it => it.title === 'param')
            .map(param => param.name + ': ' + param.type.name)
            .join(', ')}): {(meta.find(it => it.title === 'returns') || { type: { name: 'void' } }).type.name}
        </span>
      )
    default:
      return <span>{name}</span>
  }
}

PropTypeDocumenter.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  meta: PropTypes.array,
  raw: PropTypes.string
}

PropTypeDocumenter.defaultProps = {
  name: 'any'
}
