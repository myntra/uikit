import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@myntra/uikit'
import './text-legibility.css'

export default function TextLegibility({ title, hex, opacity, mode }) {
  const modeClass =
    mode === 'light' ? 'text-legibility text-legibility--cards__light' : 'text-legibility text-legibility--cards__dark'
  return (
    <div className={modeClass}>
      <Grid>
        <Grid.Column size="full">
          <p className="text-legibility--cards-top" style={{ opacity: opacity }}>
            {title}
          </p>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          <p className="text-legibility--cards-left" style={{ opacity: opacity }}>
            {hex}
          </p>
        </Grid.Column>
        <Grid.Column>
          <p className="text-legibility--cards-right" style={{ opacity: opacity }}>
            {opacity * 100 + '%'}
          </p>
        </Grid.Column>
      </Grid>
    </div>
  )
}

TextLegibility.propTypes = {
  title: PropTypes.string.isRequired,
  hex: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
  mode: PropTypes.string
}
