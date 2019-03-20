import { UTCDate, onlyDate, parse, format, isDateEqual } from './InputDateUtils'

describe('UTCDate', () => {
  test('valid', () => {
    expect(UTCDate(2018, 4, 5).toISOString()).toEqual('2018-05-05T00:00:00.000Z')
  })

  test('invalid', () => {
    expect(UTCDate(2018, 4, 40).getTime()).toEqual(Number.NaN)
    expect(UTCDate(2018, 12, 1).getTime()).toEqual(Number.NaN)
    expect(UTCDate(2018, 12, undefined).getTime()).toEqual(Number.NaN)
    expect(UTCDate(undefined, 11, 1).getTime()).toEqual(Number.NaN)
    expect(UTCDate(2018, undefined, 1).getTime()).toEqual(Number.NaN)

    expect(() => UTCDate(2018, 4, 40).toISOString()).toThrow()
    expect(() => UTCDate(2018, 12, 1).toISOString()).toThrow()
  })
})

describe('onlyDate', () => {
  test('date', () => {
    const date = onlyDate(new Date('2018-05-05T19:10:10.000Z'))

    expect(onlyDate(date).toISOString()).toEqual('2018-05-05T00:00:00.000Z')
  })
})

describe('parse', () => {
  test('Date', () => {
    const date = new Date()
    expect(parse(date)).toEqual(date)
  })

  test('Object', () => expect(parse({})).toEqual(null))
  test('no format', () => expect(() => parse('xxxxxxxxx')).toThrow())
  test('invalid', () => expect(() => parse('xxxxxxxxx', 'yyyy-MM-dd')).toThrow())
  test('parse ISO', () => expect(parse('2018-05-05T19:10:10.000Z').toISOString()).toEqual('2018-05-05T19:10:10.000Z'))
  test('yyyy-MM-dd', () => expect(parse('2018-05-05', 'yyyy-MM-dd').toISOString()).toEqual('2018-05-05T00:00:00.000Z'))
})

describe('format', () => {
  const DATE = UTCDate(2018, 4, 5)
  const pattern = 'yyyy-MM-dd'
  const value = '2018-05-05'
  test('null', () => expect(format(null)).toEqual(null))
  test('no format', () => expect(() => format('xx')).toThrow())
  test('Date', () => expect(format(DATE, pattern)).toEqual(value))
  test('string', () => expect(format(value, pattern)).toEqual(value))
  test('Range', () => expect(format({ from: DATE, to: DATE }, pattern)).toEqual({ from: value, to: value }))
  test('Range (invalid)', () => expect(format({ foo: DATE }, pattern)).toEqual({}))
})

describe('isDateEqual', () => {
  const A = UTCDate(2018, 4, 5)
  const B = UTCDate(2018, 4, 6)
  const C = new Date('2018-05-05T10:10:10.000Z')

  test('null !== b', () => expect(isDateEqual(null, B)).toBeFalsy())
  test('a !== null', () => expect(isDateEqual(A, null)).toBeFalsy())
  test('a !== b', () => expect(isDateEqual(A, B)).toBeFalsy())
  test('a === a', () => expect(isDateEqual(A, A)).toBeTruthy())
  test('a === c', () => expect(isDateEqual(A, C)).toBeTruthy())
})
