import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { classnames, range } from '@myntra/uikit-utils'
import { Icon } from '..'
import styles from './Pagination.module.css'

/**
 The Pagination component.
 @since 0.3.0
 @status EXPERIMENTAL
 @example
 <Pagination page={this.state.page} size={this.state.size} total={287} onChange={({ page, size })=>{this.setState({ page, size })}}/>
 */
class Pagination extends PureComponent {
  updatePage = page => {
    const pages = this.totalPages
    const size = this.props.size

    if (page > 0 && page <= pages) {
      this.props.onChange({ size, page })
    }
  }

  get totalPages() {
    return Math.ceil(this.props.total / this.props.size)
  }

  handlePageChange = e => {
    this.updatePage(parseInt(e.target.value, 10))
  }

  handleSizeChange = e => {
    // TODO: Should we keep user on current page?
    this.props.onChange({ size: parseInt(e.target.value, 10), page: 1 })
  }

  render() {
    const { total, size, page, className, sizes, hideSize } = this.props
    const totalPages = Math.ceil(total / size)
    const pages = range(1, totalPages + 1).map(page => page)
    const start = (page - 1) * size + 1
    const end = total < start + size - 1 ? total : start + size - 1

    return (
      <div className={classnames('pagination', className).use(styles)}>
        {!hideSize && (
          <div className={classnames('size').use(styles)}>
            <span>Rows per page:</span>
            <div className={classnames('page-size').use(styles)}>
              <select value={size} onChange={this.handleSizeChange}>
                {sizes.map(item => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  )
                })}
              </select>
              <i className={classnames('select-chevron-down').use(styles)} />
            </div>
          </div>
        )}

        <div className={classnames('size-label').use(styles)}>
          <strong>
            {start} to {end}
          </strong>{' '}
          of {total}
        </div>

        <div
          role="button"
          className={classnames('arrow-container').use(styles)}
          onClick={() => this.updatePage(page - 1)}
        >
          <Icon name="chevron-left" className={classnames('pagination-arrow').use(styles)} />
        </div>
        <select className={classnames('select-page').use(styles)} value={page} onChange={this.handlePageChange}>
          {pages.map(pageList => {
            return (
              <option value={pageList} key={pageList}>
                {pageList}
              </option>
            )
          })}
        </select>
        <div
          role="button"
          className={classnames('arrow-container').use(styles)}
          onClick={() => this.updatePage(page + 1)}
        >
          <Icon name="chevron-right" className={classnames('pagination-arrow').use(styles)} />
        </div>
      </div>
    )
  }
}

Pagination.propTypes = {
  /** Current selected page */
  page: PropTypes.number.isRequired,
  /**
   * On change handler
   *
   * @function
   * @param {{ page: number, size: number }} data
   */
  onChange: PropTypes.func.isRequired,
  /** Sizes per page */
  size: PropTypes.number.isRequired,
  /** Total count of result items */
  total: PropTypes.number.isRequired,
  /** Allowed page sizes */
  sizes: PropTypes.array,
  /** Hide size selector */
  hideSize: PropTypes.bool,
  /** @private */
  className: PropTypes.string
}

Pagination.defaultProps = {
  page: 1,
  size: 15,
  sizes: [15, 30, 50, 100]
}

export default Pagination
