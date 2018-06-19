const digit = (value, digits = 2) => `${value}`.padStart(digits, '0')

export const UTCDate = (year, month, date) => new Date(`${digit(year, 4)}-${digit(month + 1)}-${digit(date)}T00:00:00Z`)
