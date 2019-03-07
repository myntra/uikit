import React from 'react'
import classnames from './RadioGroup.module.css'
import PropTypes from 'prop-types'

/**
 The RadioGroup component.
 @since 0.6.0
 @status REVIEWING
 @example
 <RadioGroup value={this.state.value} onChange={value => this.setState({ value })} options={[{ title: 'PASS', value: 'PASS' }, { title: 'RETRY', value: 'FAIL' }]}/>
 */
class RadioGroup extends React.PureComponent {
  render() {
    const { value, onChange, name, options, disabled, renderOption, className } = this.props
    return (
      <div className={[classnames('group'), className].join(' ')} data-test-id="group">
        {options.map(option => {
          return (
            <label htmlFor={option.value} className={classnames('option')} key={option.value}>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                id={option.value}
                disabled={disabled}
                onChange={event => onChange(event.target.value)}
                data-test-id={option.value}
              />
              {renderOption ? renderOption(option) : ' ' + option.title}
            </label>
          )
        })}
      </div>
    )
  }
}

RadioGroup.propTypes = {
  /** @private */
  className: PropTypes.string,
  /** Disable Input */
  disabled: PropTypes.bool,
  /** Value */
  value: PropTypes.string,
  /**
   * Handler for change event
   * @function
   * @param {string} value
   */
  onChange: PropTypes.func,
  /** Field name */
  name: PropTypes.string,
  /** Render Option */
  renderOption: PropTypes.func,
  /** Radio input options */
  options: PropTypes.array.isRequired
}

RadioGroup.defaultProps = {
  disabled: false
}

export default RadioGroup
