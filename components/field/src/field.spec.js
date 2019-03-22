import React from 'react'
import { shallow } from 'enzyme'
import Field from './field'

describe('Field', () => {
  it('renders field with title and description', () => {
    const wrapper = shallow(
      <Field title="title" description="description">
        <input type="text" data-test-id="mock" />
      </Field>
    )

    expect(wrapper.text()).toEqual(expect.stringContaining('title'))
    expect(wrapper.text()).toEqual(expect.stringContaining('description'))
    expect(wrapper.find('[data-test-id="mock"]')).toHaveLength(1)
  })
})
