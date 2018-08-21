import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import defaultMasks from './masks'
import { classnames, each, map, findIndex, findLastIndex, memoize, onlyExtraProps } from '@myntra/uikit-utils'

import styles from './InputMasked.module.css'
/**
 * Input component that provides a template for phone, credit card, etc. Mask patterns include
 * - d - A single digit from 0-9
 * - l - A lowercase letter
 * - L - An uppercase letter
 * - \* - A lowercase/uppercase letter
 * - A - An uppercase alphanumeric A-Z/0-9/_
 * - a - A lowercase alphanumeric a-z/0-9/_
 * - w - Any alphanumeric character A-Z/a-z/0-9/_
 * - Fixed Mask characters are placed inside double quotes, say, "Rs. "
 * @since 0.0.0
 * @status REVIEWING
 * @example
 * <InputMasked
 *   value={this.state.value}
 *   placeholder='PIN - XX XX'
 *   includeMaskChars={false}
 *   pattern={'"PIN - "dd" "dd'}
 *   onChange={(value) => this.setState({value})}
 * />
 */

export default class InputMasked extends PureComponent {
  static propTypes = {
    /** @private */
    className: PropTypes.string,
    /** Value */
    value: PropTypes.string,
    /** Placeholder for the mask */
    placeholder: PropTypes.string,
    /** Include Mask characters in the value */
    includeMaskChars: PropTypes.bool,
    /** Mask pattern specified in the description */
    pattern: PropTypes.string,
    /** Additional mask definitions
     * @typedef {function} validateFunc
     * @param {string} char - character to validate
     * @return {bool} - is input valid
     *
     * @typedef {function} transformFunc
     * @param {string} char - character to transform
     * @return {string} - Transformed character
     *
     * @type {Object.<string, { validate: validateFunc, transform: transformFunc}>}
     */
    masks: PropTypes.object,
    /**
     * Handler for change event
     * @function
     * @param {string} value
     */
    onChange: PropTypes.func
  }

  static defaultProps = {
    includeMaskChars: false,
    value: ''
  }

  _filterForwardedProps = onlyExtraProps(InputMasked.propTypes)
  get forwardedProps() {
    return this._filterForwardedProps(this.props)
  }

  /**
   * Creates Mask meta data for transforming and validating input
   * and placeholder from the pattern if no placeholder is specified
   *
   * @returns {{maskMetadata: Array<Object>, placeholder: string}}
   */
  computePlaceholderAndMaskMetadata = memoize(
    ({ pattern, masks: additionalMasks, placeholder: defaultPlaceholder }) => {
      const masks = { ...defaultMasks, ...additionalMasks }
      const maskMetadata = []
      let placeholder = ''
      if (pattern) {
        for (let maskIndex = 0; maskIndex < pattern.length; ) {
          if (pattern.charAt(maskIndex) === '"') {
            const fixedMask = pattern.slice(maskIndex + 1).split('"')[0]
            placeholder += fixedMask
            maskMetadata.push(
              ...map(fixedMask, maskChar => ({ fixedChar: maskChar, validate: char => char === maskChar }))
            )
            maskIndex += fixedMask.length + 2
          } else {
            maskMetadata.push(masks[pattern.charAt(maskIndex)])
            placeholder += pattern.charAt(maskIndex)
            maskIndex += 1
          }
        }
      }
      return { maskMetadata, placeholder: defaultPlaceholder || placeholder }
    }
  )

  get placeholder() {
    return this.computePlaceholderAndMaskMetadata(this.props).placeholder
  }

  get maskMetadata() {
    return this.computePlaceholderAndMaskMetadata(this.props).maskMetadata
  }

  propagateChange = value => {
    this.props.onChange && this.props.onChange(this.getTargetValue(value))
  }

  /**
   * Creates new placeholder based on current masked input
   * @param {String} maskedValue
   * @returns {String} placeholder
   */
  getPlaceholder = maskedValue => {
    const placeholder = this.placeholder
    const replaceRegex = new RegExp(`^.{${maskedValue.length}}`)
    return placeholder.replace(replaceRegex, maskedValue)
  }

  handleKeyDown = event => {
    switch (event.key || event.keyCode) {
      case 'Backspace':
      case 8:
        event.preventDefault()
        event.stopPropagation()
        const value = this.removeLastChar(event.target.value)
        this.propagateChange(value)
        break
    }
  }

  handleKeyPress = event => {
    const value = event.target.value
    const selectionStart = event.target.selectionStart
    const inputChar = this.transformValue(event.key, selectionStart)

    if (selectionStart === value.length && this.validateValue(inputChar, selectionStart)) {
      const newValue = value + inputChar
      const maskedValue = newValue + this.getNextMask(newValue)
      this.propagateChange(maskedValue)
    }
  }

  transformValue = (char, i) => {
    const mask = this.maskMetadata[i]
    return mask && mask.transform ? mask.transform(char) : char
  }

  validateValue = (char, i) => {
    const mask = this.maskMetadata[i]
    return mask && mask.validate && mask.validate(char)
  }

  /**
   * Get maskedValue from the value prop supplied to the component
   *
   * @param {String} value
   * @returns {String} maskedValue
   */
  getMaskedValue = value => {
    let maskedValue = ''
    const maskMetadata = this.maskMetadata
    if (this.props.includeMaskChars) {
      maskedValue += value
    } else {
      let maskIndex = 0
      for (let valueIndex = 0; valueIndex < value.length; ) {
        if (maskMetadata[maskIndex].fixedChar) {
          maskedValue += maskMetadata[maskIndex].fixedChar
        } else {
          maskedValue += value.charAt(valueIndex)
          valueIndex += 1
        }
        maskIndex += 1
      }
    }
    return this.getValidMaskedValue(maskedValue)
  }

  /**
   * Validates the masked input based on mask definitions
   *
   * @param {String} maskedValue
   * @returns {String} validMaskedValue
   */
  getValidMaskedValue = maskedValue => {
    let validMaskedValue = ''
    for (let valueIndex = 0; valueIndex < maskedValue.length; valueIndex++) {
      const nextChar = this.transformValue(maskedValue.charAt(valueIndex), valueIndex)
      if (!this.validateValue(nextChar, valueIndex)) break
      validMaskedValue += nextChar
    }
    return validMaskedValue + this.getNextMask(validMaskedValue)
  }

  /**
   * Value sent to onchange handler based on whether mask characters are included or not
   *
   * @param {String} value
   * @returns {String} targetValue
   */
  getTargetValue = value => {
    let unmaskedValue = ''
    const maskMetadata = this.maskMetadata
    if (this.props.includeMaskChars) {
      return value
    }
    each(value, (char, i) => {
      unmaskedValue += maskMetadata[i].fixedChar ? '' : char
    })
    return unmaskedValue
  }

  /**
   * Returns the next set of mask characters after current input
   *
   * @param {String} value
   * @return {String} nextMask
   */
  getNextMask = value => {
    const start = value.length
    const maskMetadata = this.maskMetadata
    if (!(maskMetadata[start] && maskMetadata[start].fixedChar)) {
      return ''
    }
    const subMask = maskMetadata.slice(start)
    const end = findIndex(subMask, mask => !mask.fixedChar)
    return subMask
      .slice(0, end < 0 ? subMask.length : end)
      .map(mask => mask.fixedChar)
      .join('')
  }

  /**
   * Removes last character (including mask)
   *
   * @param {String} value
   * @returns {String} valueWithoutLastCharacter
   */
  removeLastChar = value => {
    if (!value.length) return
    const maskMetadata = this.maskMetadata
    if (!maskMetadata[value.length - 1].fixedChar) {
      return value.slice(0, value.length - 1)
    }
    const subMask = maskMetadata.slice(0, value.length)
    const maskStartIndex = findLastIndex(subMask, mask => !mask.fixedChar)
    return value.slice(0, maskStartIndex < 0 ? 0 : maskStartIndex)
  }

  render() {
    const maskedValue = this.getMaskedValue(this.props.value)
    const placeholder = this.getPlaceholder(maskedValue)
    return (
      <div className={classnames(this.props.className, 'container').use(styles)}>
        <input
          {...this.forwardedProps}
          className={classnames('input', 'masked-input').use(styles)}
          value={maskedValue}
          onKeyPress={this.handleKeyPress}
          onKeyDown={this.handleKeyDown}
          onChange={() => {}}
          maxLength={this.maskMetadata.length}
        />
        <input className={classnames('mask', 'input').use(styles)} value={placeholder} readOnly tabIndex={-1} />
      </div>
    )
  }
}
