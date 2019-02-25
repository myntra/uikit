import React from 'react'
import PropTypes from 'prop-types'
import classnames from './YearPane.module.css'

function range(min, max, inc = 1) {
  const arr = []

  for (let i = min; i <= max; i += inc) arr.push(i)

  return arr
}

/**
 * Year picking pane for InputMonth
 *
 * @since 0.7.0
 * @status EXPERIMENTAL
 * @example
 * <YearPane value={this.state.value || 2018} onChange={value => this.setState({ value })} />
 */
function YearPane(props) {
  const value = new Date().getFullYear()
  const minYear = value - 3
  const maxYear = value + 3

  return (
    <div className={classnames(props.className, 'container')}>
      {range(minYear, maxYear).map(year => (
        <div
          key={year}
          className={classnames('year', props.highlight(year), { selected: year === props.value })}
          disabled={props.highlight(year) === 'disabled'}
          onClick={() => props.onChange(year)}
        >
          {year}
        </div>
      ))}
    </div>
  )
}

YearPane.propTypes = {
  /** @private */
  className: PropTypes.string,
  value: PropTypes.number,
  /** @type {{(month: number) => void}} */
  onChange: PropTypes.func.isRequired,
  /** @type {{(month: number) => 'info' | 'danger' | 'warning' | 'success' | 'disabled' }} */
  highlight: PropTypes.func
}

export default YearPane
