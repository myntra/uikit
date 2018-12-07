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
    let consoleArgs = []
    const spy = jest.spyOn(console, type).mockImplementation((...args) => {
      consoleArgs.push(args)
    })

    received()

    if (this.isNot) {
      expect(spy).not.toHaveBeenCalled()
    } else {
      expect(spy).toHaveBeenCalled()
    }

    const pass = consoleArgs.some(args => {
      if (Array.isArray(matcher)) {
        return this.equals(args, matcher)
      } else {
        return this.equals(args.join('\n'), matcher)
      }
    })

    spy.mockReset()
    spy.mockRestore()

    if (pass) {
      return {
        message: () =>
          `expected not to console ${type} ${this.utils.printExpected(matcher)}\n Received: ${this.utils.printExpected(
            consoleArgs
          )}`,
        pass: true
      }
    } else {
      return {
        message: () =>
          `expected to console ${type} ${this.utils.printExpected(matcher)}\n Received: ${this.utils.printExpected(
            consoleArgs
          )}`,
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

  toBeTransparentComponent(received, props = {}) {
    let pass, html

    try {
      const wrapper = shallow(<received {...props} data-transparent-check />)

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
            received
          )} not to be a transparent component\nReceived: \n${this.utils.printReceived(html)}`,
        pass: true
      }
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} to be a transparent component\nReceived: \n${this.utils.printReceived(html)}`,
        pass: false
      }
    }
  },

  toHaveText(received, expected) {
    const pass = received.length && typeof received.text() === 'string' && received.text().includes(expected)

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(expected)} to be ${this.utils.printReceived(received.html())}`,
        pass: true
      }
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(expected)} nod to be ${this.utils.printReceived(received.html())}`,
        pass: false
      }
    }
  }
}

global.expect.extend(matchers)
