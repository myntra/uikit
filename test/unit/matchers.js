/* eslint-disable node/no-unpublished-require */
const React = require('react')
const { shallow } = require('enzyme')

/**
 * @typedef {import("enzyme").CommonWrapper} Wrapper
 */

const matchers = {
  /**
   * @param {Wrapper} wrapper
   * @param {string|Function} tag
   */
  toBeTag(wrapper, tag) {
    const pass = wrapper.is(tag)

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(wrapper.getElement().type)} not to be ${this.utils.printExpected(tag)}`,
        pass: true
      }
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(wrapper.getElement().type)} to be ${this.utils.printExpected(tag)}`,
        pass: false
      }
    }
  },
  /**
   * @this {typeof jest}
   * @param {{(): void}} received
   * @param {'error' | 'log' | 'warn'} type
   * @param {*} matcher
   */
  toConsole(received, type, matcher) {
    let pass
    const spy = jest.spyOn(console, type).mockImplementation((...args) => {
      if (Array.isArray(matcher)) {
        pass = this.equals(args, matcher)
      } else {
        pass = this.equals(args[0], matcher)
      }
    })

    received()

    if (this.isNot) {
      expect(spy).not.toHaveBeenCalled()
    } else {
      expect(spy).toHaveBeenCalled()
    }

    spy.mockReset()
    spy.mockRestore()

    if (pass) {
      return {
        message: () => `expected console.${type} not to be ${this.utils.printExpected(matcher)}`,
        pass: true
      }
    } else {
      return {
        message: () => `expected console.${type} to be ${this.utils.printExpected(matcher)}`,
        pass: false
      }
    }
  },

  toConsoleError(received, matcher) {
    return matchers.toConsole.call(this, received, 'error', matcher)
  },

  toConsoleWarn(received, matcher) {
    return matchers.toConsole.call(this, received, 'warn', matcher)
  },

  toBeTransparentComponent(Received, props = {}) {
    let pass, html

    try {
      const wrapper = shallow(<Received {...props} data-transparent-check />)

      html = wrapper.html()
      pass = wrapper.find('[data-transparent-check]').length > 0
    } catch (e) {
      pass = false
      console.error(e)
    }

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            Received
          )} not to be a transparent component\nReceived: \n${this.utils.printReceived(html)}`,
        pass: true
      }
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            Received
          )} to be a transparent component\nReceived: \n${this.utils.printReceived(html)}`,
        pass: false
      }
    }
  }
}

global.expect.extend(matchers)
