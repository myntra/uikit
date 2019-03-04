import React from 'react'
import { shallow, mount } from 'enzyme'
import { testCodeMod } from '@myntra/codemod-utils'

import Button from './button'

testCodeMod(__dirname, '../button.codemod.js')

describe('Button', () => {
  it('renders correct tag according to prop provided (href -> <a> | to -> <RouterLink> | -> <button>)', () => {
    expect(Button).toBeTransparentComponent()
    expect(shallow(<Button />)).toBeTag('button')
    expect(shallow(<Button href="/foo" />)).toBeTag('a')
    expect(shallow(<Button to="/foo" />)).toBeTag(Button.RouterLink)
  })

  it('renders icon on left when icon prop is present', () => {
    const wrapper = shallow(<Button icon="alert" />)

    expect(wrapper.find('[data-test-id="primary-icon"]')).toHaveLength(1)
  })

  it('renders icon on right when secondaryIcon prop is present', () => {
    const wrapper = shallow(<Button secondaryIcon="alert" />)

    expect(wrapper.find('[data-test-id="secondary-icon"]')).toHaveLength(1)
  })

  it('renders label prop as inner HTML', () => {
    expect(shallow(<Button label="foo" />).text()).toBe('foo')
  })

  it('renders children prop as inner HTML', () => {
    expect(shallow(<Button>foo</Button>).text()).toBe('foo')
  })

  it('warns if `to` and `href` props co-exist', () => {
    expect(() => shallow(<Button to="/foo" href="/foo" />)).toConsoleError(
      expect.stringContaining('`to` and `href` cannot be used together')
    )
  })

  it('prefers `children` prop over `label` prop', () => {
    expect(shallow(<Button label="bar">foo</Button>).text()).toBe('foo')
  })

  describe('behaviour', () => {
    it('calls `onClick` prop if target element is clicked', () => {
      const handleClick = jest.fn()
      const wrapper = mount(<Button onClick={handleClick} />)

      wrapper.find('[data-test-id="target"]').simulate('click')

      expect(handleClick).toHaveBeenCalled()
    })

    it('ignores click events on target element if `onClick` prop is not present', () => {
      expect(() => {
        const wrapper = mount(<Button onClick={null} />)
        wrapper.find('[data-test-id="target"]').simulate('click')
      }).not.toConsoleError(expect.anything())
    })

    it('ignores click events on target element if `disabled` prop is set to `true`', () => {
      const handleClick = jest.fn()
      const preventDefault = jest.fn()
      const wrapper = mount(<Button href="/" disabled onClick={handleClick} />)

      wrapper.simulate('click', { preventDefault })

      expect(handleClick).not.toHaveBeenCalled()
      expect(preventDefault).toHaveBeenCalled()
    })
  })
})
