import dayjs from 'dayjs'

const presetList = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  LAST_7_DAYS: 'last7days',
  LAST_15_DAYS: 'last15days',
  LAST_30_DAYS: 'last30days',
  LAST_45_DAYS: 'last45days',
  LAST_90_DAYS: 'last90days',
  LAST_30_DAYS_INCLUSIVE: 'last30dayswithtoday',
  LAST_WEEK: 'lastweek',
  LAST_MONTH: 'lastmonth',
  LAST_3_MONTHS: 'last3months',
  LAST_6_MONTHS: 'last6months',
  MTD: 'mtd',
  WTD: 'wtd',
  QTD: 'qtd'
}

const presetDates = [
  {
    key: 'today',
    label: 'today',
    range: {
      from: dayjs()
        .startOf('day')
        .toDate(),
      to: dayjs()
        .endOf('day')
        .toDate()
    }
  },
  {
    key: 'yesterday',
    label: 'yesterday',
    range: {
      from: dayjs()
        .startOf('day')
        .subtract(1, 'day')
        .toDate(),
      to: dayjs()
        .endOf('day')
        .subtract(1, 'day')
        .toDate()
    }
  },
  {
    key: 'last7days',
    label: 'last 7 days',
    range: {
      from: dayjs()
        .startOf('day')
        .subtract(7, 'day')
        .toDate(),
      to: dayjs()
        .subtract(1, 'day')
        .endOf('day')
        .toDate()
    }
  },
  {
    key: 'lastweek',
    label: 'last week',
    range: {
      from: dayjs()
        .subtract(1, 'week')
        .startOf('week')
        .toDate(),
      to: dayjs()
        .subtract(1, 'week')
        .endOf('week')
        .toDate()
    }
  },
  {
    key: 'last15days',
    label: 'last 15 days',
    range: {
      from: dayjs()
        .startOf('day')
        .subtract(15, 'day')
        .toDate(),
      to: dayjs()
        .subtract(1, 'day')
        .endOf('day')
        .toDate()
    }
  },
  {
    key: 'last30days',
    label: 'last 30 days',
    range: {
      from: dayjs()
        .startOf('day')
        .subtract(30, 'day')
        .toDate(),
      to: dayjs()
        .subtract(1, 'day')
        .endOf('day')
        .toDate()
    }
  },
  {
    key: 'last45days',
    label: 'last 45 days',
    range: {
      from: dayjs()
        .startOf('day')
        .subtract(45, 'day')
        .toDate(),
      to: dayjs()
        .subtract(1, 'day')
        .endOf('day')
        .toDate()
    }
  },
  {
    key: 'lastmonth',
    label: 'last month',
    range: {
      from: dayjs()
        .subtract(1, 'month')
        .startOf('month')
        .toDate(),
      to: dayjs()
        .subtract(1, 'month')
        .endOf('month')
        .toDate()
    }
  },
  {
    key: 'last30dayswithtoday',
    label: 'Last 30 days including today',
    range: {
      from: dayjs()
        .startOf('day')
        .subtract(30, 'day')
        .toDate(),
      to: dayjs().toDate()
    }
  },
  {
    key: 'mtd',
    label: 'Current Month (MTD)',
    range: {
      from: dayjs()
        .startOf('month')
        .toDate(),
      to: dayjs()
        .endOf('day')
        .toDate()
    }
  },
  {
    key: 'wtd',
    label: 'Current Week (WTD)',
    range: {
      from: dayjs()
        .startOf('week')
        .toDate(),
      to: dayjs()
        .endOf('day')
        .toDate()
    }
  },
  {
    key: 'qtd',
    label: 'Current Quarter (QTD)',
    range: {
      from: dayjs()
        .startOf('quarter')
        .toDate(),
      to: dayjs()
        .endOf('day')
        .toDate()
    }
  },
  {
    key: 'last90days',
    label: 'last 90 days',
    range: {
      from: dayjs()
        .startOf('day')
        .subtract(90, 'day')
        .toDate(),
      to: dayjs()
        .subtract(1, 'day')
        .endOf('day')
        .toDate()
    }
  },
  {
    key: 'last3months',
    label: 'last 3 months',
    range: {
      from: dayjs()
        .subtract(3, 'month')
        .toDate(),
      to: dayjs().toDate()
    }
  },
  {
    key: 'last6months',
    label: 'last 6 months',
    range: {
      from: dayjs()
        .subtract(6, 'month')
        .toDate(),
      to: dayjs().toDate()
    }
  }
]

export { presetDates, presetList }
