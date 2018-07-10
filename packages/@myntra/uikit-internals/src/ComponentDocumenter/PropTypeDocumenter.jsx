import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from '@myntra/uikit-elements'
import styles from './PropTypeDocumenter.css'

function JSDocTypeDefDocumenter({ reference, rootReference, type, name }) {
  switch (type.name) {
    case 'function': {
      const params = reference.filter(it => it.title === 'param')
      const returns = reference.find(it => it.title === 'returns') || { type: null }
      return (
        <span>
          function({params.map((param, index) => (
            <span key={param.name}>
              {param.name}: <JSDocTypeDocumenter {...param.type} rootReference={rootReference} />
              {index + 1 < params.length && <span>, </span>}
            </span>
          ))}):{' '}
          <JSDocTypeDocumenter type="NameExpression" name="void" {...returns.type} rootReference={rootReference} />
        </span>
      )
    }
    default:
      return <JSDocTypeDocumenter {...type} rootReference={rootReference} />
  }
}

function JSDocTypeDocumenter({ reference = [], rootReference = [], ...param }) {
  const references = [].concat(reference, rootReference)
  switch (param.type) {
    case 'NameExpression': {
      for (const item of references) {
        const typedef = item.find(item => item.title === 'typedef' && item.name === param.name)

        if (typedef) return <JSDocTypeDefDocumenter {...typedef} reference={item} rootReference={references} />
      }

      return <span>{param.name}</span>
    }
    case 'NullableType': {
      return (
        <span>
          {param.prefix && '?'}
          <JSDocTypeDocumenter {...param.expression} rootReference={references} />
          {!param.prefix && '?'}
        </span>
      )
    }
    case 'UnionType': {
      return param.elements.map((element, index) => (
        <span key={index}>
          <JSDocTypeDocumenter {...element} rootReference={references} />
          {index + 1 < param.elements.length && <span> | </span>}
        </span>
      ))
    }
    case 'RecordType': {
      return (
        <span>
          {'{ '}
          {param.fields.map((field, index) => (
            <span key={index}>
              <JSDocTypeDocumenter {...field} keyName={field.key} rootReference={references} />
              {index + 1 < param.fields.length && <span>, </span>}
            </span>
          ))}
          {' }'}
        </span>
      )
    }
    case 'FieldType': {
      return (
        <span>
          {param.keyName}: <JSDocTypeDocumenter {...param.value} rootReference={references} />
        </span>
      )
    }
    case 'TypeApplication': {
      return (
        <span>
          <JSDocTypeDocumenter {...param.expression} />
          {'<'}
          {param.applications.map((application, index) => (
            <span key={index}>
              <JSDocTypeDocumenter reference={references} {...application} />
              {index + 1 < param.applications.length && <span>, </span>}
            </span>
          ))}
          {'>'}
        </span>
      )
    }
    default:
      return JSON.stringify(param)
  }
}

class StateFulDropdown extends PureComponent {
  state = { isOpen: false }
  render() {
    return (
      <Dropdown
        {...this.props}
        isOpen={this.state.isOpen}
        onOpen={() => this.setState({ isOpen: true })}
        onClose={() => this.setState({ isOpen: false })}
      />
    )
  }
}

export default function PropTypeDocumenter({ name, value, raw, meta = [], reference = [], ...props } = {}) {
  switch (name) {
    case 'enum':
      return (
        <StateFulDropdown trigger={<span className={styles.trigger}>enum</span>}>
          <div className={styles.list}>
            {value.map((item, index) => (
              <div key={index}>
                <code>{props.computed ? item : item.value}</code>
              </div>
            ))}
          </div>
        </StateFulDropdown>
      )
    case 'union':
      return (
        <span>
          {value.map((item, index) => (
            <span key={index}>
              <PropTypeDocumenter {...item} reference={reference} />
              {index + 1 < value.length && <span> | </span>}
            </span>
          ))}
        </span>
      )
    case 'custom':
      return (
        <span>
          <JSDocTypeDocumenter name={raw} type="NameExpression" rootReference={reference} />
        </span>
      )
    case 'arrayOf':
      return (
        <span>
          Array{'<'}
          <PropTypeDocumenter {...value} reference={reference} />
          {'>'}
        </span>
      )
    case 'shape':
      const items = Object.entries(value)
      return (
        <span>
          {'{ '}
          {items.map(([key, item], index) => (
            <span key={index}>
              {key}: <PropTypeDocumenter {...item} reference={reference} />
              {index + 1 < items.length && <span>, </span>}
            </span>
          ))}
          {' }'}
        </span>
      )
    case 'object': {
      const type = meta.find(it => it.title === 'type') || { type: null }
      return (
        <span>
          <JSDocTypeDocumenter type="NameExpression" name="object" {...type.type} rootReference={reference} />
        </span>
      )
    }
    case 'func': {
      const type = meta.find(it => it.title === 'type')
      const params = meta.filter(it => it.title === 'param')
      const returns = meta.find(it => it.title === 'returns') || { type: null }
      return type ? (
        <span>
          <JSDocTypeDocumenter {...type} rootReference={reference} />
        </span>
      ) : (
        <span>
          function({params.map((param, index) => (
            <span key={param.name}>
              {param.name}: <JSDocTypeDocumenter {...param.type} rootReference={reference} />
              {index + 1 < params.length && <span>, </span>}
            </span>
          ))}): <JSDocTypeDocumenter type="NameExpression" name="void" {...returns.type} rootReference={reference} />
        </span>
      )
    }
    default:
      return <span>{name}</span>
  }
}

PropTypeDocumenter.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  meta: PropTypes.array,
  reference: PropTypes.array,
  raw: PropTypes.string
}

PropTypeDocumenter.defaultProps = {
  name: 'any'
}
