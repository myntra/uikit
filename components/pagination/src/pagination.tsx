import React, { PureComponent } from 'react'
import Icon from '@myntra/uikit-component-icon'
import { range } from '@myntra/uikit-utils'

import classnames from './pagination.module.scss'

export interface Props extends BaseProps {
  /** Current selected page */
  page: number
  /** On change handler */
  onChange(payload: { page: number; size: number }): void
  /** Sizes per page */
  size: number
  /** Total count of result items */
  total: number
  /** Allowed page sizes */
  sizes?: number[]
  /** Hide size selector */
  hideSize?: boolean
  /** @private */
  className?: string
}

/**
 The Pagination component.
 @since 0.3.0
 @status REVIEWING
 @category basic
 @see http://uikit.myntra.com/components/pagination
 */
export default class Pagination extends PureComponent<Props> {
  static defaultProps = {
    page: 1,
    size: 15,
    sizes: [15, 30, 50, 100],
  }

  updatePage = (page) => {
    const pages = this.totalPages
    const size = this.props.size

    if (page > 0 && page <= pages) {
      this.props.onChange({ size, page })
    }
  }

  get totalPages() {
    return Math.ceil(this.props.total / this.props.size)
  }

  handlePageChange = (e) => {
    this.updatePage(parseInt(e.target.value, 10))
  }

  handleSizeChange = (e) => {
    // TODO: Should we keep user on current page?
    this.props.onChange({ size: parseInt(e.target.value, 10), page: 1 })
  }

  render() {
    const { total, size, page, className, sizes, hideSize } = this.props
    const totalPages = Math.ceil(total / size)
    const pages = range(1, totalPages).map((page) => page)
    const start = (page - 1) * size + 1
    const end = total < start + size - 1 ? total : start + size - 1

    return (
      <div className={classnames('pagination', className)}>
        {!hideSize && (
          <div className={classnames('size')}>
            <span>Rows per page:</span>
            <div className={classnames('page-size')}>
              <select value={size} onChange={this.handleSizeChange}>
                {sizes.map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  )
                })}
              </select>
              <i className={classnames('select-chevron-down')} />
            </div>
          </div>
        )}

        <div className={classnames('size-label')}>
          <strong>
            {start} to {end}
          </strong>{' '}
          of {total}
        </div>

        <div
          role="button"
          className={classnames('arrow-container')}
          onClick={() => this.updatePage(page - 1)}
        >
          <Icon
            name="chevron-left"
            className={classnames('pagination-arrow')}
          />
        </div>
        <select
          className={classnames('select-page')}
          value={page}
          onChange={this.handlePageChange}
        >
          {pages.map((pageList) => {
            return (
              <option value={pageList} key={pageList}>
                {pageList}
              </option>
            )
          })}
        </select>
        <div
          role="button"
          className={classnames('arrow-container')}
          onClick={() => this.updatePage(page + 1)}
        >
          <Icon
            name="chevron-right"
            className={classnames('pagination-arrow')}
          />
        </div>
      </div>
    )
  }
}
