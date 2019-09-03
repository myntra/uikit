import React from 'react'
import classnames from './year.module.scss'

function range(min: number, max: number, inc: number = 1) {
  const arr = []

  for (let i = min; i <= max; i += inc) arr.push(i)

  return arr
}

export interface Props extends BaseProps {
  value?: number
  onChange(value: number): void
  highlight({
    year: number,
  }): 'info' | 'danger' | 'warning' | 'success' | 'disabled' | null
}

/**
 * An embeddable year selection component.
 *
 * @since 0.7.0
 * @status REVIEWING
 * @category input
 * @see http://uikit.myntra.com/components/input-month#inputmonthpickeryear
 */
export default function InputMonthPickerYear(props: Props) {
  const value = new Date().getFullYear()
  const minYear = value - 3
  const maxYear = value + 3

  return (
    <div className={classnames(props.className, 'year-container')}>
      {range(minYear, maxYear).map((year) => (
        <div
          key={year}
          className={classnames('year', props.highlight(year), {
            selected: year === props.value,
            disabled: props.highlight({ year }) === 'disabled',
          })}
          onClick={() => props.onChange(year)}
        >
          {year}
        </div>
      ))}
    </div>
  )
}
