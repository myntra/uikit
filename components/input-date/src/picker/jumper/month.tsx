import React from 'react'

const MONTHS = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',')

export interface InputDatePickerJumperMonthProps extends BaseProps {
  value: number
  onChange(month: number): void
}

export default function InputDatePickerJumperMonth({
  value: month,
  onChange: onMonthSelect,
  ...props
}: InputDatePickerJumperMonthProps) {
  return (
    <div {...props}>
      <select
        value={month}
        tabIndex={-1}
        onChange={(event) => onMonthSelect(Number(event.target.value))}
      >
        {MONTHS.map((item, index) => (
          <option value={index} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}
