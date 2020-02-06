import React from 'react'
import PropTypes from 'prop-types'

import { Grid } from '@myntra/uikit'
import ColorCard from './color-card'

export default function ColorPreview({ name, value: colors, children }) {
  const [dark, base, light, lighter, lightest, darker, darkest] = colors
  console.log(dark, base, light, lighter, lightest)

  return (
    <Grid>
      <Grid.Column>
        <ColorCard name={`${name} Dark`} color={dark} />
      </Grid.Column>
      <Grid.Column>
        <ColorCard name={`${name}`} color={base} />
      </Grid.Column>
      <Grid.Column>
        <ColorCard name={`${name} Light`} color={light} />
      </Grid.Column>
      {darker && (
        <Grid.Column>
          <ColorCard name={`${name} Darker`} color={darker} />
        </Grid.Column>
      )}
      {lighter && (
        <Grid.Column>
          <ColorCard name={`${name} Lighter`} color={lighter} />
        </Grid.Column>
      )}
      {darkest && (
        <Grid.Column>
          <ColorCard name={`${name} Darkest`} color={darkest} />
        </Grid.Column>
      )}
      {lightest && (
        <Grid.Column>
          <ColorCard name={`${name} Lightest`} color={lightest} />
        </Grid.Column>
      )}
    </Grid>
  )
}

ColorPreview.propTypes = {
  name: PropTypes.string.isRequired,
  base: PropTypes.string.isRequired,
  light: PropTypes.string.isRequired,
  dark: PropTypes.string.isRequired,
  lighter: PropTypes.string.isRequired,
  darker: PropTypes.string,
  lightest: PropTypes.string,
  darkest: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.any
}
