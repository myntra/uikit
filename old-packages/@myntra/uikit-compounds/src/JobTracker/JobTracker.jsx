import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import dayJS from 'dayjs'

import JobTrackerItem from './JobTrackerItem'
import classnames from './JobTracker.module.css'

/**
 The JobTracker component.
 @since 0.6
 @status EXPERIMENTAL
 @example
<JobTracker data={[{ id: 123,
    createdBy: "Ash Ketchum",
    remarks: "Gotta catch 'em all",
    createdOn: 1542623683000,
    successFileName: "success.xslx",
    errorFileName: "error.xslx",
    status: "IN_PROGRESS",
    totalStepCount: 100,
    completedStepCount: 30
  }]}/>
 */
export default class JobTracker extends PureComponent {
  static propTypes = {
    /** Job data */
    data: PropTypes.array.isRequired
  }

  render() {
    const jobsByDate = {}
    this.props.data.forEach(job => {
      const date = dayJS(job.createdOn).format('DD MMM, YYYY')
      if (!jobsByDate.hasOwnProperty(date)) {
        jobsByDate[date] = []
      }

      jobsByDate[date].push(job)
    })

    return (
      <div>
        {Object.keys(jobsByDate).map(date => (
          <div key={date} data-test-id="group">
            <div className={classnames('date')} data-test-id="date">
              {date}
            </div>
            <div className={classnames('jobs')}>
              {jobsByDate[date].map(job => (
                <JobTrackerItem className={classnames('job')} {...job} key={job.id} data-test-id="group-item" />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

JobTracker.Item = JobTrackerItem
