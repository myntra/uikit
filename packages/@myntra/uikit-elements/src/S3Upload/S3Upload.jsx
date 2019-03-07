import React from 'react'
import classnames from './S3Upload.module.css'
import PropTypes from 'prop-types'
import { Button, Flex, InputText as Input, Progress } from '../index'

/**
 The S3Upload component.
 @since 0.7.0-alpha.0
 @status Experimental
 @example
 <div>
    <S3Upload onSuccess={(name,url)=>{}} onError={(e)=>{this.setState({e: e.toString()})}} apiRoot={'http://spectrumserver.com'}/>
    <span style={{color: 'red'}}>{this.state.e}</span>
 </div>
 */
class S3Upload extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      uploading: false,
      progressCompleted: 0,
      filename: null,
      file: null
    }
  }

  handleOnChange = e => {
    const files = e.target.files

    if (files.length > 0) {
      // NOTE: Using first file here.
      const file = files[0]

      this.setState({ file, filename: file.name, error: null }, () => {
        this.props.autostart && this.upload()
      })
    } else {
      this.clear()
    }
  }

  handleOnUpload = () => {
    if (!this.state.file) {
      this.props.onError('No file found')
    } else {
      this.upload()
    }
  }

  clear() {
    this.setState({ file: null, filename: null, error: null, progressCompleted: 0 })
  }

  handleError(e) {
    let error = e || 'Upload failed. Please try again'
    this.setState({ error, uploading: false, file: null, filename: null, progressCompleted: 0 })
    this.props.onError(error)
  }

  upload() {
    if (this.state.file === null) {
      this.props.onError('No file found') // No file to upload.
    }

    this.setState({ uploading: true })
    const body = new FormData() // eslint-disable-line
    const headers = {}
    const url = `${this.props.apiRoot}/api/upload/request`
    fetch(url, {  // eslint-disable-line
      credentials: 'include',
      headers
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        response.text().then(msg => {
          throw new Error(msg)
        })
      })
      .then(response => {
        const { url: target, params } = response
        Object.keys(params).forEach(key => body.append(key, params[key]))
        body.append('file', this.state.file)
        var s3Request = new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest()    // eslint-disable-line
          xhr.withCredentials = true
          xhr.upload.onprogress = progress => {
            if (progress.lengthComputable) {
              this.setState({
                progressCompleted: (progress.loaded * 100) / progress.total
              })
            }
          }
          xhr.onloadend = progress => {
            this.setState({
              progressCompleted: 100
            })
            if (progress.target.status === 204) {
              resolve(progress)
            } else {
              reject(progress)
            }
          }

          xhr.open('POST', target, true)
          xhr.send(body)
        })

        s3Request
          .then(event => {
            // Location header has encoded key, decoding is not as direct - Generating the url instead

            // const url = event.target.getResponseHeader('Location') ?
            //   event.target.getResponseHeader('Location') :
            //   target + params.key.replace('${filename}', this.state.filename)
            const url = target + params.key.replace('${filename}', this.state.filename) // eslint-disable-line
            const name = this.state.filename

            this.setState({ uploading: false })
            this.props.onSuccess({ name, url })
            if (this.props.autoclear) {
              this.clear()
            }
          })
          .catch(error => {
            this.handleError(error.target.statusText)
          })
      })
      .catch(e => {
        this.handleError(e)
      })
  }

  render() {
    const { placeholder, autostart, inputWidth } = this.props
    let progressBar = (
      <div className={classnames('progress-bar')}>
        <Progress type="bar" value={this.state.progressCompleted} />
      </div>
    )
    let actionButtons = (
      <Flex inline>
        <Button
          disabled={this.state.uploading}
          type="secondary"
          className={classnames('button-browse')}
          onClick={() => {
            this.fileInput.click()
          }}
        >
          Browse
          <input
            hidden
            onChange={this.handleOnChange}
            type="file"
            style={{ display: 'none' }}
            ref={fileInput => (this.fileInput = fileInput)}
          />
        </Button>
        {autostart ? null : (
          <Button disabled={this.state.uploading} onClick={this.handleOnUpload}>
            Upload
          </Button>
        )}
      </Flex>
    )
    return (
      <Flex container>
        <Input
          readOnly
          className={classnames('input-upload')}
          style={{ minWidth: inputWidth }}
          placeholder={placeholder}
          value={this.state.filename || ''}
        />
        {this.state.uploading ? progressBar : actionButtons}
      </Flex>
    )
  }
}

S3Upload.propTypes = {
  /** Auto start upload */
  autostart: PropTypes.bool,
  /** Auto clear uploaded file */
  autoclear: PropTypes.bool,
  /** Handler for succesful file uplaod */
  onSuccess: PropTypes.func.isRequired,
  /** Handler for failure in file upload */
  onError: PropTypes.func.isRequired,
  /** Placeholder */
  placeholder: PropTypes.string,
  /** Api root */
  apiRoot: PropTypes.string.isRequired,
  /** Input width */
  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

S3Upload.defaultProps = {
  autostart: true,
  autoclear: false,
  placeholder: 'Choose a file...',
  inputWidth: '250px'
}

export default S3Upload
