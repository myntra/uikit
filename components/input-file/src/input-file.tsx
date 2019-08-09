import React, { PureComponent } from 'react'
import classnames from './input-file.module.scss'
import Input from '@myntra/uikit-component-input-text'
import Button from '@myntra/uikit-component-button'

export interface Props extends BaseProps {
  placeholder?: string
  actions?(browse: () => void): React.ReactNode
  onChange?(files: FileList): void
  value?: FileList
}

/**
 * A file input component that handles client side S3 uploads.
 *
 * @since 1.1.0
 * @status READY
 * @category input
 * @see http://uikit.myntra.com/components/input-file
 */
export default class InputFile extends PureComponent<Props> {
  static defaultProps = {
    placeholder: 'Choose a file...',
    actions: (upload) => (
      <Button type="secondary" onClick={upload}>
        Browse
      </Button>
    ),
  }

  refInputFile: React.RefObject<HTMLInputElement>

  constructor(props) {
    super(props)

    this.refInputFile = React.createRef()
  }

  handleOnChange = (e) => {
    const files = e.target.files
    this.props.onChange && this.props.onChange(files)
  }

  handleBrowseClick = () => {
    this.refInputFile.current && this.refInputFile.current.click()
  }

  get filenames() {
    const filenames = []
    if (this.props.value && this.props.value.length > 0) {
      for (const file of Array.from(this.props.value)) {
        filenames.push(file.name)
      }
    }
    return filenames.join(', ')
  }

  render() {
    const { placeholder, actions, value, ...props } = this.props

    return (
      <div className={classnames('input-file')}>
        <Input
          className={classnames('preview')}
          placeholder={placeholder}
          onClick={this.handleBrowseClick}
          value={this.filenames}
          title={this.filenames}
        />
        <input
          {...props}
          className={classnames('file')}
          onChange={this.handleOnChange}
          hidden
          type="file"
          ref={this.refInputFile}
        />
        {typeof actions === 'function'
          ? actions(this.handleBrowseClick)
          : actions}
      </div>
    )
  }
}
