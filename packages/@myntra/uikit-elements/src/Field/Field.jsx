import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import styles from './Field.module.css'

/**
 * A wrapper component to add title, label and description to form fields.
 *
 * @since 0.6.0
 * @status EXPERIMENTAL
 * @example
 * <Field title="Name" description="Your full name" error="Some error occurred.">
 *  <InputText value={this.state.name} onChange={name => this.setState({ name })} />
 * </Field>
 */
function Field({ title, error, description, htmlFor, children }) {
  return (
    <div className={classnames('container').use(styles)}>
      <label id={htmlFor ? htmlFor + '__label' : null} className={classnames('title').use(styles)} htmlFor={htmlFor}>
        {title}
      </label>
      {children}
      <div className={classnames('meta').use(styles)}>
        {error ? (
          <div id={htmlFor ? htmlFor + '__error' : null} role="alert">
            {Array.isArray(error) ? error.join(' ') : error}
          </div>
        ) : (
          description && <div id={htmlFor ? htmlFor + '__description' : null}>{description}</div>
        )}
      </div>
    </div>
  )
}

Field.propTypes = {
  /** Title */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Description */
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Error message */
  error: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /** @private  */
  htmlFor: PropTypes.string,
  children: PropTypes.node
}

export default Field

export function withField(Component) {
  let counter = 0

  // eslint-disable-next-line react/display-name
  return class extends PureComponent {
    constructor(props) {
      super(props)

      this.id = ++counter
    }

    render() {
      const { title, label, error, description, ...props } = this.props
      let id = props.id || `__uikit_field_${this.id}_`

      return (
        <Field title={title || label} error={error} description={description} htmlFor={id}>
          <Component
            {...props}
            id={id}
            aria-describedby={`${id}__description ${id}__error`}
            aria-labeledby={`${id}__label`}
          />
        </Field>
      )
    }
  }
}
