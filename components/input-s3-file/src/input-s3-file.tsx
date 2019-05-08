import React, { PureComponent } from 'react'
import classnames from './input-s3-file.module.scss'
import Button from '@myntra/uikit-component-button'
import Input from '@myntra/uikit-component-input-text'

interface InputS3FileProps extends BaseProps {
  /**
   * Auto start upload on file selection/change.
   * @since v0.11.0
   */
  autoStartUpload?: boolean
  /**
   * Clear value on successful upload.
   * @since v0.11.0
   */
  clearOnSuccess?: boolean
  /**
   *
   */
  placeholder?: string
  /**
   *
   */
  apiRoot: string
  /**
   * The handler called when file is uploaded successfully.
   */
  onSuccess?(payload: { name: string; url: string }): void
  /**
   * The handler called if any error occurs.
   */
  onError?(error: Error): void
  /**
   * @deprecated - It is no more required.
   */
  inputWidth?: string | number
  /**
   * @deprecated - Use [autoStartUpload](#InputS3File-autoStartUpload) instead.
   */
  autostart?: boolean
  /**
   * @deprecated - Use [clearOnSuccess](#InputS3File-clearOnSuccess) instead.
   */
  autoclear?: boolean
}

interface InputS3FileState {
  isUploading: boolean
  uploadProgress: number
  filename: string | null
  file: string | null
  error?: string | null
}

/**
 * A file input component that handles client side S3 uploads.
 *
 * __NOTE:__ This component depends on spectrum server to process uploads.
 *
 * @since 0.11.0
 * @status READY
 * @category input
 * @see http://uikit.myntra.com/components/input-s3-file
 */
export default class InputS3File extends PureComponent<
  InputS3FileProps,
  InputS3FileState
> {
  static defaultProps = {
    autoStartUpload: true,
    clearOnSuccess: false,
    placeholder: 'Choose a file...',
  }

  refInputFile: React.RefObject<HTMLInputElement>

  state = {
    isUploading: false,
    uploadProgress: 0,
    filename: null,
    file: null,
  }

  constructor(props) {
    super(props)

    this.refInputFile = React.createRef()
  }

  handleInputChange = (event) => {
    const files = event.target.files

    if (files.length > 0) {
      // NOTE: Using first file here.
      const file = files[0]

      this.setState({ file, filename: file.name, error: null }, () => {
        if (this.props.autoStartUpload || this.props.autostart) {
          this.triggerUpload()
        }
      })
    } else {
      this.resetState()
    }
  }

  private handleBrowseClick = () => {
    if (this.refInputFile.current && !this.state.isUploading) {
      this.refInputFile.current.click()
    }
  }

  private handleUploadClick = () => {
    if (!this.state.file) {
      this.emitFileNotFoundError()
    } else {
      this.triggerUpload()
    }
  }

  private emitFileNotFoundError() {
    this.props.onError(new Error('No file found'))
  }

  private resetState(state?: Partial<InputS3FileState>) {
    this.setState({
      error: null,
      file: null,
      filename: null,
      uploadProgress: 0,
      isUploading: false,
      ...state,
    })
  }

  private handleError(error: Error) {
    this.resetState({ error: error.message })
    if (this.props.onError) this.props.onError(error)
  }

  async triggerUpload() {
    if (this.state.file === null) {
      return this.emitFileNotFoundError()
    }

    this.setState({ isUploading: true })
    const url = `${this.props.apiRoot}/api/upload/request`

    const response = await fetch(url, { credentials: 'include' })

    if (!response.ok) {
      this.handleError(new Error(response.statusText))
    } else {
      const body = new FormData()
      const { url, params } = await response.json()

      for (const name in params) {
        body.append(name, params[name])
      }

      const request = new XMLHttpRequest()

      request.withCredentials = true
      request.upload.onprogress = (event) => {
        if (event.lengthComputable)
          this.setState({
            uploadProgress: Math.floor((event.loaded / event.total) * 100),
            isUploading: true,
          })
      }
      request.upload.onloadend = () => {
        this.setState({ uploadProgress: 100, isUploading: false })
      }
      request.onloadend = () => {
        if (request.status === 204) {
          const fileUrl =
            request.getResponseHeader('Location') ||
            url + params.key.replace('${filename}', this.state.filename)

          if (this.props.onSuccess) {
            this.props.onSuccess({ name: this.state.filename, url: fileUrl })
          }

          if (this.props.clearOnSuccess || this.props.autoclear) {
            this.resetState()
          }
        }
      }

      request.onerror = () => {
        this.handleError(new Error(request.statusText))
      }

      request.open('POST', url, true)
      request.send(body)
    }
  }

  render() {
    const {
      apiRoot,
      autoStartUpload,
      autoclear,
      autostart,
      children,
      className,
      clearOnSuccess,
      inputWidth,
      onError,
      onSuccess,
      placeholder,
      ...props
    } = this.props

    return (
      <div className={classnames(className, 'container')}>
        <Input
          readOnly
          className={classnames('preview')}
          placeholder={placeholder}
          value={this.state.filename}
          onClick={this.handleBrowseClick}
        />
        <input
          className={classnames('file')}
          type="file"
          hidden
          onChange={this.handleInputChange}
          ref={this.refInputFile}
        />

        <Button
          className={classnames('button')}
          type="secondary"
          loading={autoStartUpload ? this.state.isUploading : false}
          disabled={autoStartUpload ? false : this.state.isUploading}
          onClick={this.handleBrowseClick}
        >
          Browse
        </Button>
        {!(autoStartUpload || autostart) && (
          <Button
            className={classnames('button')}
            type="secondary"
            loading={this.state.isUploading}
            onClick={this.handleUploadClick}
          >
            Upload
          </Button>
        )}
      </div>
    )
  }
}
