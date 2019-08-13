import React from 'react'
import PropTypes from 'prop-types'
import { Table } from '@myntra/uikit'
import './typography.css'

const getMetaData = function(headers, tokens) {
  const metaData = headers.map(style => ({ ...tokens[style], scale: style }))
  return metaData
}

const pixelToRem = function(pixel = '0') {
  const px = parseInt(pixel.replace('px', ''))
  return px / 16
}

const getFontCase = function(textTransform = '') {
  return textTransform === 'uppercase'
    ? { class: 'all-caps', case: 'All Caps' }
    : { class: 'capitalize', case: 'Sentance' }
}

const getFontWeight = function(fontWeight) {
  const weight = parseInt(fontWeight)
  if (weight <= 400) {
    return `Regular (${weight})`
  } else if (weight <= 500) {
    return `Medium (${weight})`
  } else if (weight <= 700) {
    return `Bold (${weight})`
  } else {
    return weight
  }
}

export default function Typography({ headers, tokens }) {
  const metaData = getMetaData(headers, tokens)
  return (
    <div className="typography">
      <Table data={metaData}>
        <Table.Column key="scale" label="Scale">
          {({ data }) => (
            <div
              className={getFontCase(data.textTransform).class}
              style={{ fontWeight: data.fontWeight, fontSize: data.fontSize }}
            >
              {data.scale}
            </div>
          )}
        </Table.Column>
        <Table.Column key="typeface" label="Typeface">
          {({ data }) => {
            const [font = ''] = data.fontFamily || []
            return <div>{font}</div>
          }}
        </Table.Column>
        <Table.Column key="weight" label="Weight">
          {({ data }) => <div>{getFontWeight(data.fontWeight)}</div>}
        </Table.Column>
        <Table.Column key="size" label="Size">
          {({ data }) => <div>{data.fontSize}</div>}
        </Table.Column>
        <Table.Column key="rem" label="Rem">
          {({ data }) => <div>{pixelToRem(data.fontSize) + ' rem'}</div>}
        </Table.Column>
        <Table.Column key="case" label="Case">
          {({ data }) => <div>{getFontCase(data.textTransform).case}</div>}
        </Table.Column>
      </Table>
    </div>
  )
}

Typography.propTypes = {
  headers: PropTypes.array.isRequired,
  tokens: PropTypes.object.isRequired
}
