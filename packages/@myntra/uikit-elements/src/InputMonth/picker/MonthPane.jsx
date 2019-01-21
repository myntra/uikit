import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from './MonthPane.module.css'

const months = 'January,February,March,April,May,June,July,August,September,October,November,December'.split(',')
const shortMonths = months.map(month => month.substr(0, 3))

/**
 * Displays a pane to choose month.
 *
 * @since 0.7.0
 * @status EXPERIMENTAL
 * @example
 * <MonthPane  />
 */
class InputMonthPickerMonthPane extends PureComponent {
  static propTypes = {
    /** @private */
    className: PropTypes.string,
    value: PropTypes.number,
    /** @type {{(month: number) => void}} */
    onChange: PropTypes.func.isRequired,
    /** @type {{(month: number) => 'info' | 'danger' | 'warning' | 'success' | 'disabled' }} */
    highlight: PropTypes.func,
    _validate({ value }) {
      if (typeof value === 'number' && (value < 1 || value > 12)) {
        throw new Error(`'value' should be a numeric value between 1 and 12.`)
      }
    }
  }

  static defaultProps = {
    highlight() {
      return null
    }
  }

  render() {
    const value = this.props.value ? this.props.value - 1 : null

    return (
      <div className={classnames('container', this.props.className)}>
        {months.map((month, index) => (
          <div
            key={index}
            className={classnames('month', this.props.highlight(index + 1), {
              selected: index === value
            })}
            disabled={this.props.highlight(index + 1) === 'disabled'}
            onClick={() => this.props.onChange(index + 1)}
          >
            <div className={classnames('month-number')}>{`${index + 1}`.padStart(2, '0')}</div>
            <div>({shortMonths[index]})</div>
          </div>
        ))}
      </div>
    )
  }
}
export default InputMonthPickerMonthPane
