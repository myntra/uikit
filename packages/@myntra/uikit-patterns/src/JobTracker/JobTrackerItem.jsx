import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon, Text, Progress, Button } from '@myntra/uikit-elements'
import { Grid } from '@myntra/uikit-compounds'
import dayJS from 'dayjs'

import classnames from './JobTrackerItem.module.css'

/**
 @since 0.6
 @status EXPERIMENTAL
 @example
<JobTracker.Item {...{ id: 123,
    createdBy: "Ash Ketchum",
    remarks: "Gotta catch 'em all",
    createdOn: 1542623683000,
    successFileName: "success.xslx",
    errorFileName: "error.xslx",
    status: "IN_PROGRESS",
    totalStepCount: 100,
    completedStepCount: 30
  }}/>
 */
export default class JobTrackerItem extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    /** Job ID */
    id: PropTypes.number,
    /** Remarks */
    remarks: PropTypes.string,
    /** Login Id of job creator */
    createdBy: PropTypes.string,
    /** Job creation time */
    createdOn: PropTypes.number,
    /** Success file Name */
    successFileName: PropTypes.string,
    /** Error file Name */
    errorFileName: PropTypes.string,
    /** Completed Step Count */
    completedStepCount: PropTypes.number.isRequired,
    /** Total Step Count */
    totalStepCount: PropTypes.number.isRequired,
    /** Remarks renderer */
    renderRemarks: PropTypes.func,
    /** Status */
    status: PropTypes.string,
    /** API Root for downloading job tracker files */
    apiRoot: PropTypes.string
  }

  static defaultProps = {
    renderRemarks: ({ remarks }) => <div>{remarks}</div>
  }

  render() {
    return (
      <Grid gapless vcentered className={this.props.className}>
        <Grid.Column size={2}>
          <div className={classnames('status')}>
            <Progress value={this.props.completedStepCount / this.props.totalStepCount}>
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
              <div>
                <Text color="success">
                  <Button
                    type="link"
                    className={classnames('file')}
                    href={`${this.props.apiRoot}/api/jobtracker/download?jobId=${this.props.id}&fileType=success-file`}
                    download
                    secondaryIcon="arrow-to-bottom"
                    label="Success"
                  />
                </Text>
              </div>
            )}
            {this.props.errorFileName && (
              <div>
                <Text color="error">
                  <Button
                    type="link"
                    className={classnames('file')}
                    href={`${this.props.apiRoot}/api/jobtracker/download?jobId=${this.props.id}&fileType=error-file`}
                    download
                    secondaryIcon="arrow-to-bottom"
                    label="Error"
                  />
                </Text>
              </div>
            )}
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}
