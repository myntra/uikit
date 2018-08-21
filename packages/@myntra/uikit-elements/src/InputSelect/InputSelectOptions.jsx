import React, { PureComponent } from 'react'
import styles from './InputSelectOptions.module.css'
import PropTypes from 'prop-types'
import Option from './InputSelectOption'
import { classnames } from '@myntra/uikit-utils'

export default class InputSelectOptions extends PureComponent {
  static propTypes = {
    /** Focused option */
    focusedIndex: PropTypes.number,
    /** Value key in option object */
    valueKey: PropTypes.string,
    /** Display key in option object */
    labelKey: PropTypes.string,
    /** Event fired when an option is focused */
    onOptionFocus: PropTypes.func,
    /** Even fired when an option is selected */
    onOptionSelect: PropTypes.func,
    /** List of options */
    options: PropTypes.array,
    /** List of selected values */
    values: PropTypes.array,
    /** Is multiple selection enabled? */
    multiple: PropTypes.bool,
    /** Unique id prefix */
    instancePrefix: PropTypes.string,
    /** Is selection disabled? */
    disabled: PropTypes.bool,
    /** Custom render option */
    renderOption: PropTypes.func,
    /** No results fallback */
    noResultsPlaceholder: PropTypes.any.isRequired
  }

  componentDidMount() {
    this.scrollFocusedInView()
  }

  componentDidUpdate() {
    this.scrollFocusedInView()
  }

  scrollFocusedInView() {
    // TODO: Scroll focused option into view.
  }

  render() {
    const {
      options,
      labelKey,
      renderOption,
      valueKey,
      instancePrefix,
      focusedIndex,
      multiple,
      noResultsPlaceholder
    } = this.props
    const values = new Set(this.props.values)

    return (
      <div id={`${instancePrefix}-options`} className={classnames('options').use(styles)} role="listbox" tabIndex={-1}>
        {options.length
          ? options.map((option, index) => (
              <Option
                id={`${instancePrefix}-option-${index}`}
                index={index}
                key={option[valueKey]}
                option={option}
                labelKey={labelKey}
                isFocused={index === focusedIndex}
                isSelected={values.has(option[valueKey])}
                disabled={this.props.disabled}
                onFocus={this.props.onOptionFocus}
                onSelect={this.props.onOptionSelect}
                hasCheckBox={multiple}
                renderOption={renderOption}
              />
            ))
          : noResultsPlaceholder}
      </div>
    )
  }
}
