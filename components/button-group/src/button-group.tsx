import React, { PureComponent, Children } from 'react'
import classnames from './button-group.module.scss'
import Button, { KIND } from '@myntra/uikit-component-button'
import List from '@myntra/uikit-component-list'
import Dropdown from '@myntra/uikit-component-dropdown'

export interface Props extends BaseProps {
  /** Property to be used in case only single type of button is required and all others under more drop down */
  structure?: 'primary-group' | 'secondary-group' | 'link-group'
}

interface State {
  isOpen: boolean
  sequenceMapping: Record<string, string>
}

/**
 * Button groups are used to bunch together buttons with similar actions in a horizontal row to help with arrangement and spacing.
 *
 * @since 1.0.0
 * @status EXPERIMENTAL
 * @category basic
 * @see http://uikit.myntra.com/components/button-group
 */

export default class ButtonGroup extends PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      sequenceMapping: {
        [KIND.primary]: KIND.secondary,
        [KIND.secondary]: KIND.link,
      },
    }
  }

  static defaultProps = {
    structure: null,
  }

  setOpen = (val) => {
    this.setState({
      isOpen: val,
    })
  }

  getNextValidButtonType = (type) => {
    const { sequenceMapping } = this.state
    return sequenceMapping[type]
  }

  render() {
    const { className, children, structure } = this.props
    const { isOpen } = this.state
    const nodes = Children.toArray(children)

    if (!nodes.length) return null

    let buttons = []
    let moreStartIndex: number
    let typesFound: string[] = []

    // Structure will be valid only if the type of very first button element matched the structure name
    if (structure && structure.match(new RegExp(nodes[0].props.type))) {
      buttons.push(nodes[0])
      moreStartIndex = 1
    } else {
      nodes.every((button: any, index: number) => {
        const { type } = button.props || Button.defaultProps
        if (
          !(
            typesFound.includes(type) ||
            typesFound.includes(this.getNextValidButtonType(type))
          )
        ) {
          buttons.push(button)
          typesFound.push(type)
          return true
        } else {
          moreStartIndex = index
          return false
        }
      })
    }

    let moreElements =
      moreStartIndex && nodes.slice(moreStartIndex, nodes.length)

    // Cases where more field will have only 1 button or 2 same button types are present
    if (moreElements && moreElements.length === 1) {
      if (nodes.length >= 3) {
        moreElements.push(buttons.pop())
      } else {
        const nextButtonType = this.getNextValidButtonType(
          buttons[0].props.type
        )
        if (nextButtonType) {
          buttons.push(
            React.cloneElement(moreElements[0], {
              type: nextButtonType,
            })
          )
        } else {
          throw new Error('Not a correct sequence')
        }

        moreElements = []
      }
    }

    return (
      <div className={classnames('button-group', className)}>
        {buttons.reverse()}
        {moreElements && !!moreElements.length && (
          <Dropdown
            auto={true}
            container={true}
            trigger={<Button icon="ellipsis-v" />}
            isOpen={isOpen}
            onOpen={() => this.setOpen(true)}
            onClose={() => this.setOpen(false)}
            className={classnames('more-button')}
          >
            <List
              className={classnames('button-list')}
              items={moreElements}
              idForItem={(item) => item.key}
            >
              {({ item, index }) =>
                React.cloneElement(item, { type: KIND.link, key: index })
              }
            </List>
          </Dropdown>
        )}
      </div>
    )
  }
}
