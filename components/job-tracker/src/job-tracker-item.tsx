import React, { PureComponent, ReactNode } from 'react'
import Button from '@myntra/uikit-component-button'
import Icon, { IconName } from '@myntra/uikit-component-icon'
import Layout from '@myntra/uikit-component-layout'
import Loader from '@myntra/uikit-component-loader'
import T from '@myntra/uikit-component-text'
import dayJS from 'dayjs'

import classnames from './job-tracker-item.module.scss'

export interface Props extends BaseProps {
  /** Job ID */
  id: number
  /** Remarks */
  remark: string
  /** Login Id of job creator */
  createdBy: string
  /** Job creation time */
  createdOn: number
  /** Attachment of other kinds */
  fileName: string
  /** Attachment on job success */
  successFileName: string
  /** Attachment on job error */
  errorFileName: string
  /** Completed Step Count */
  completedStepCount: number
  /** Total Step Count */
  totalStepCount: number
  /** Remarks renderer */
  renderRemarks(props: Props): ReactNode
  /** Status */
  status: 'IN_PROGRESS' | 'FAILED' | 'COMPLETED' | 'HALTED'
  /** API Root for downloading job tracker files */
  apiRoot: string
}

const iconByStatus: Record<string, IconName> = {
  IN_PROGRESS: 'clock',
  FAILED: 'exclamation-triangle',
  COMPLETED: 'check-circle',
  HALTED: 'exclamation-circle',
}
const colorByStatus: Record<string, string> = {
  IN_PROGRESS: 'primary',
  FAILED: 'error',
  COMPLETED: 'success',
  HALTED: 'warning',
}

/**
 * @since 0.6
 * @status REVIEWING
 */
export default class JobTrackerItem extends PureComponent<Props> {
  static defaultProps = {
    renderRemarks: ({ remark }) => <div>{remark}</div>,
    status: 'IN_PROGRESS',
  }

  render() {
    const {
      status,
      id,
      renderRemarks,
      createdBy,
      createdOn,
      fileName,
      successFileName,
      apiRoot,
      errorFileName,
      className,
      ...props
    } = this.props

    const statusName = (status || '').replace('_', ' ').toLowerCase()
    const iconName = iconByStatus[status]
    const getDownloadURL = (type) =>
      `${apiRoot}/api/jobtracker/download?jobId=${id}&fileType=${type}`
    const isLoading = status === 'IN_PROGRESS'
    const needLoader = !(fileName || successFileName || errorFileName)
    return (
      <Layout
        className={classnames(className, 'item')}
        type="row"
        gutter="small"
      >
        <Layout type="stack" space={[1]}>
          <T.h3>{id}</T.h3>
          <T.p>{createdBy}</T.p>
        </Layout>
        <Layout type="stack" space={[1]}>
          <div>
            <T.p emphasis="medium" abstract>
              {renderRemarks(this.props)}
            </T.p>
          </div>
          <T.p emphasis="medium">{dayJS(createdOn).format('hh:mm A')}</T.p>
        </Layout>
        <Layout type="row" gutter="large">
          <Layout type="stack" space={[, 1]}>
            <T.body>
              <Icon
                name={iconName}
                className={classnames('icon', colorByStatus[status])}
              />{' '}
              Status: {statusName}
            </T.body>
            <T.body className={classnames('actions')}>
              {fileName ? (
                <Button
                  type="text"
                  className={classnames('primary')}
                  href={getDownloadURL('file')}
                  download
                  inheritTextColor
                >
                  Download File
                </Button>
              ) : null}
              {successFileName ? (
                <Button
                  type="text"
                  className={classnames('success')}
                  href={getDownloadURL('success-file')}
                  download
                  inheritTextColor
                >
                  Download Success File
                </Button>
              ) : null}
              {errorFileName ? (
                <Button
                  type="text"
                  className={classnames('error')}
                  href={getDownloadURL('error-file')}
                  download
                  inheritTextColor
                >
                  Download Error File
                </Button>
              ) : null}
            </T.body>
          </Layout>
          {needLoader ? (
            <Loader
              className={classnames('loader')}
              type="inline"
              appearance="bar"
              isLoading={isLoading}
            />
          ) : null}
        </Layout>
      </Layout>
    )
  }
}
