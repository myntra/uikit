import React, { PureComponent, ReactNode } from 'react'
import Icon from '@myntra/uikit-component-icon'
import Button from '@myntra/uikit-component-button'
import Progress from '@myntra/uikit-component-progress'
import Grid from '@myntra/uikit-component-grid'
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
  /** Success file Name */
  successFileName: string
  /** Error file Name */
  errorFileName: string
  /** Completed Step Count */
  completedStepCount: number
  /** Total Step Count */
  totalStepCount: number
  /** Remarks renderer */
  renderRemarks(props: Props): ReactNode
  /** Status */
  status: string
  /** API Root for downloading job tracker files */
  apiRoot: string
}

/**
 * @since 0.6
 * @status REVIEWING
 */
export default class JobTrackerItem extends PureComponent<Props> {
  static defaultProps = {
    renderRemarks: ({ remark }) => <div>{remark}</div>,
  }

  render() {
    return (
      <Grid gapless vcentered className={this.props.className}>
        <Grid.Column size={2}>
          <div className={classnames('status')}>
            <Progress
              value={
                (this.props.completedStepCount / this.props.totalStepCount) *
                100
              }
              size="medium"
              type="circle"
            >
              <Icon name="image" />
            </Progress>
            <div className={classnames('text')}>
              <i>
                {(this.props.status || '').replace('_', ' ').toLowerCase()}
                {this.props.status === 'IN_PROGRESS' ? '...' : ''}
              </i>
            </div>
          </div>
        </Grid.Column>
        <Grid.Column size={4} className={classnames('text')}>
          <div className={classnames('description')}>
            <div className={classnames('id')}>{this.props.id}</div>
            {this.props.renderRemarks(this.props)}
          </div>
        </Grid.Column>
        <Grid.Column size={2} className={classnames('text')}>
          {`by ${this.props.createdBy}`}
        </Grid.Column>
        <Grid.Column size={1} className={classnames('text')}>
          {dayJS(this.props.createdOn).format('hh:mm A')}
        </Grid.Column>
        <Grid.Column size={2}>
          <div className={classnames('files')}>
            {this.props.successFileName && (
              <div className={classnames('file', 'success')}>
                <Button
                  type="link"
                  className={classnames('file')}
                  href={`${this.props.apiRoot ||
                    ''}/api/jobtracker/download?jobId=${
                    this.props.id
                  }&fileType=success-file`}
                  download
                  inheritTextColor
                  secondaryIcon="arrow-to-bottom"
                >
                  Success
                </Button>
              </div>
            )}
            {this.props.errorFileName && (
              <div className={classnames('file', 'error')}>
                <Button
                  type="link"
                  className={classnames('file')}
                  href={`${this.props.apiRoot ||
                    ''}/api/jobtracker/download?jobId=${
                    this.props.id
                  }&fileType=error-file`}
                  download
                  inheritTextColor
                  secondaryIcon="arrow-to-bottom"
                >
                  Error
                </Button>
              </div>
            )}
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}
