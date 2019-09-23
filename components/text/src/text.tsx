import React from 'react'
import CompatText from './compat-text'

import classnames from './text.module.scss'

interface Props extends BaseProps {
  /**
   * Abstract component does not render any extra elements.
   * However, it allows only one child component.
   */
  abstract?: boolean

  /**
   * Make font-weight one weight bold or light.
   */
  weight?: 'bolder' | 'lighter'

  /**
   * Use theme colors for text.
   */
  color?: 'primary' | 'success' | 'warning' | 'error' | 'dark' | 'light'

  /**
   * Controls the legibility of the text.
   *
   * **When the `color` prop is provided, it defaults to `'primary'`.**
   *
   * @see https://uikit.myntra.com/guide/text-legibility
   */
  emphasis?: 'high' | 'medium' | 'disabled'

  /**
   * Override default tag for the element.
   */
  tag?: string
}

export default function Text(props: Props) {
  if ('type' in props) {
    if (__DEV__) {
      console.warn(
        'You are using deprecated Text API. See https://uikit.myntra.com/components/text.'
      )
    }

    return <CompatText {...(props as any)} />
  }

  return <Text.body {...props} />
}

Text.Title = Text.title = createComponent('title', 'div')
Text.h1 = createComponent('h1', 'h1')
Text.h2 = createComponent('h2', 'h2')
Text.h3 = createComponent('h3', 'h3')
Text.h4 = createComponent('h4', 'h4')
Text.body = createComponent('body', 'div')
Text.p = createComponent('p', 'p')
Text.caption = createComponent('caption')

function createComponent(name: string, tag: any = 'span') {
  return function({
    className,
    children,
    tag: Tag = tag,
    abstract = false,
    color = 'dark',
    emphasis = 'high',
    weight,
    ...props
  }: Props) {
    className = classnames(name, className, color, emphasis, weight)

    if (abstract) {
      children = React.Children.only(children)
      if (React.isValidElement(children)) {
        return React.cloneElement(children, {
          className: classnames(className, (children.props as any).className),
        } as any)
      }
    }

    return (
      <Tag {...props} className={className}>
        {children}
      </Tag>
    )
  }
}
