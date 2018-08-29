import React from 'react'
import PropTypes from 'prop-types'
import { classnames, memoize } from '@myntra/uikit-utils/src'
import { getMousePosition, getTouchPosition, addEventsToDocument, removeEventsFromDocument } from './events'
import styles from './InputRange.module.css'

/**
 * Round number with fixed-point notation.
 *
 * Why? Number.toFixed() returns a string and +(string) is pre
 *
 * @param {number} number Number
 * @param {number} digits Digits to round
 * @returns {number} Rounded number
 */
function toFixedNumber(number, digits) {
  const pow = Math.pow(10, digits)
  return +(Math.round(number * pow) / pow)
}

/**
 * Get decimal count in number
 * @param {number} number Number
 * @returns {number} Decimal count
 */
function countDecimals(number) {
  if (Math.floor(number) === number) return 0
  return number.toString().split('.')[1].length || 0
}

/**
 The slider component.

 @since 0.0.0
 @status REVIEWING
 @example
 <InputRange
  min={0}
  max={100}
  step={1}
  value={this.state.value}
  onChange={(value) => {this.setState({value})}}
    />
 */
export default class InputRange extends React.PureComponent {
  static propTypes = {
    /**
     * Lower limit of the range.
     */
    min: PropTypes.number,
    /**
     * Upper limit of the range.
     */
    max: PropTypes.number,
    /**
     * Value
     */
    value: PropTypes.number,
    /**
     * Precision of the selected valued.
     */
    step: PropTypes.number,
    /**
     * Disabled
     */
    disabled: PropTypes.bool,
    /**
     * @private
     */
    className: PropTypes.string,
    /**
     * Event slider knob position changes
     *
     * @function
     * @param {number} value
     */
    onChange: PropTypes.func
  }

  static defaultProps = {
    min: 0,
    max: 100,
    value: 0,
    step: 1
  }

  state = { pressed: false }

  /**
   * Mouse event map getter
   * @returns {Object.<string, function(Object)>} Event map
   */
  get mouseEventMap() {
    return { mousemove: this.handleMouseMove, mouseup: this.handleMouseUp }
  }

  /**
   * Touch event map getter
   * @returns {Object.<string, function(Object)>} Event map
   */
  get touchEventMap() {
    return { touchmove: this.handleTouchMove, touchend: this.handleTouchEnd }
  }

  _precision = memoize((min, max, step) => Math.max(countDecimals(min), countDecimals(max), countDecimals(step)))

  get precision() {
    return this._precision(this.props.min, this.props.max, this.props.step)
  }

  componentWillUnmount() {
    removeEventsFromDocument(this.mouseEventMap)
    removeEventsFromDocument(this.touchEventMap)
  }

  /**
   * Process the event and return new value in the callback
   * @param {Object.<string, number>} position Coordinates of slider knob
   */
  handleChange = position => {
    if (this.props.onChange) {
      const value = this.calculateValue(position)

      if (value !== this.props.value) this.props.onChange(value)
    }
  }

  handleMouseDown = event => {
    addEventsToDocument(this.mouseEventMap)

    this.setState({ pressed: true })
    this.handleChange(getMousePosition(event))
  }

  handleTouchStart = event => {
    addEventsToDocument(this.touchEventMap)

    this.setState({ pressed: true })
    this.handleChange(getTouchPosition(event))
  }

  handleMouseMove = event => {
    window.requestAnimationFrame(() => {
      this.handleChange(getMousePosition(event))
    })
  }

  handleTouchMove = event => {
    window.requestAnimationFrame(() => {
      this.handleChange(getTouchPosition(event))
    })
  }

  handleMouseUp = () => {
    this.setState({ pressed: false })
    removeEventsFromDocument(this.mouseEventMap)
  }

  handleTouchEnd = () => {
    this.setState({ pressed: false })
    removeEventsFromDocument(this.touchEventMap)
  }

  /**
   * Calculate new value
   * @param {Object.<string, number>} position Coordinates of slider knob
   * @returns {number} Value
   */
  calculateValue(position) {
    const { left, right } = this.trackNode.getBoundingClientRect()
    const { max, min, step } = this.props
    const leftOffset = ((position.x - left) / (right - left)) * (max - min)
    const valueToNearestStep = Math.round(leftOffset / step) * step + min
    const fixedValueToPrecision = toFixedNumber(valueToNearestStep, this.precision)
    if (fixedValueToPrecision < min) return min
    if (fixedValueToPrecision > max) return max
    return fixedValueToPrecision
  }

  /**
   * Get the ratio of knob offset from slider min.
   * @returns {number} Value
   */
  knobOffset() {
    const { max, min, value } = this.props
    if (min > max || value < min) return 0
    if (value > max) return 1
    return (value - min) / (max - min)
  }

  render() {
    const { className, onChange, ...restProps } = this.props
    const { disabled } = restProps
    const { pressed } = this.state
    const knobStyles = { left: `${100 * this.knobOffset()}%` }
    const trackStyle = { transform: `scaleX(${this.knobOffset()})` }

    return (
      <div className={classnames('input').use(styles)}>
        <div className={classnames('container', { disabled }, className).use(styles)}>
          <div className={classnames('knob').use(styles)}>
            <div className={classnames('inner-knob').use(styles)} style={knobStyles}>
              <div
                className={classnames('knob-value', { 'knob-pressed': pressed }).use(styles)}
                onMouseDown={this.handleMouseDown}
                onTouchStart={this.handleTouchStart}
              />
            </div>
          </div>
          <div
            className={classnames('track').use(styles)}
            onMouseDown={this.handleMouseDown}
            onTouchStart={this.handleTouchStart}
          >
            <div
              className={classnames('inner-track').use(styles)}
              ref={node => {
                this.trackNode = node
              }}
            >
              <span className={classnames('track-value').use(styles)} style={trackStyle} />
            </div>
          </div>
          <input {...restProps} type="range" hidden readOnly />
        </div>
      </div>
    )
  }
}
