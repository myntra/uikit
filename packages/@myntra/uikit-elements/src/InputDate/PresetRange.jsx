import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import styles from './InputDate.css'
import { presetDates } from './constants'

const PresetItem = ({ date, onSelect, selected }) => {
  const handleClick = () => {
    onSelect(date)
  }
  return (
    <div
      className={classnames('preset_item', {
        preset_item_selected: selected
      }).use(styles)}
      onClick={handleClick}
    >
      {date.label}
    </div>
  )
}

PresetItem.propTypes = {
  date: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool
}

class PresetRange extends PureComponent {
  state = {
    selectedKey: this.props.selectedKey
  }

  handleSelect = ({ key, range }) => {
    this.setState({ selectedKey: key })
    this.props.onSelect(range, key)
  }
  render() {
    const {
      presets,
      selectedDates: { from, to }
    } = this.props
    const presetsToShow = presetDates.filter(({ key }) => presets.includes(key))
    // const { selectedKey } = this.state
    return (
      <div className={styles.preset}>
        {presetsToShow.map(date => (
          <PresetItem
            key={date.key}
            onSelect={this.handleSelect}
            date={date}
            selected={date.range.from === from && date.range.to === to}
          />
        ))}
      </div>
    )
  }
}

PresetRange.propTypes = {
  presets: PropTypes.array,
  onSelect: PropTypes.func,
  selectedKey: PropTypes.string,
  selectedDates: PropTypes.object
}

PresetRange.defaultProps = {
  selectedDates: { from: null, to: null }
}

export default PresetRange
