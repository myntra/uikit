import React from 'react'
import PropTypes from 'prop-types'
import CopyToClipboard from './copy-to-clipboard'

import './color-card.css'

/**
 * @param {[number, number, number]} hex
 */
function rgbToHex([r, g, b]) {
  const integer = ((Math.round(r) & 0xff) << 16) + ((Math.round(g) & 0xff) << 8) + (Math.round(b) & 0xff)

  const string = integer.toString(16).toUpperCase()

  return '#' + '000000'.substring(string.length) + string
}

/**
 * @param {string} hsl
 */
export function hslToHex(hsl) {
  const match = /hsl\((\d+),\s*(\d+),\s*(\d+)\)/.exec(hsl)

  if (!match) return 'transparent'

  const [, ...parts] = match
  const [H, S, L] = parts.map(str => parseInt(str))
  const h = H / 360
  const s = S / 100
  const l = L / 100

  let t2
  let t3
  let val

  if (s === 0) {
    val = l * 255
    return rgbToHex([val, val, val])
  }

  if (l < 0.5) {
    t2 = l * (1 + s)
  } else {
    t2 = l + s - l * s
  }

  const t1 = 2 * l - t2

  const rgb = [0, 0, 0]
  for (let i = 0; i < 3; i++) {
    t3 = h + (1 / 3) * -(i - 1)
    if (t3 < 0) {
      t3++
    }

    if (t3 > 1) {
      t3--
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3
    } else if (2 * t3 < 1) {
      val = t2
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6
    } else {
      val = t1
    }

    rgb[i] = val * 255
  }

  return rgbToHex(rgb)
}

export default function ColorCard({ name, color, children }) {
  const hex = hslToHex(color)

  return (
    <div className="color-card">
      <div className="color-card__bg" style={{ backgroundColor: hex }} />
      <h3 className="color-card__title">{name}</h3>
      <div className="color-card__body">
        <div className="color-card__color">
          <CopyToClipboard content={hex}>
            <code>{hex}</code>
          </CopyToClipboard>
        </div>
        <div className="color-card__color">
          <CopyToClipboard content={color}>
            <code>{color}</code>
          </CopyToClipboard>
        </div>
      </div>
      {children}
    </div>
  )
}

ColorCard.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.any
}
