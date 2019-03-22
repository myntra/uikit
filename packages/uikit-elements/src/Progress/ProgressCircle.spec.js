import React from 'react'
import { mount } from 'enzyme'
import ProgressCircle from './ProgressCircle'

describe('Progress', () => {
  describe('Progress[type="circle"]', () => {
    it('renders', () => {
      const wrapper = mount(<ProgressCircle value={0} />)

      expect(wrapper.find('[role="progressbar"]')).toHaveLength(1)
    })

    it('renders `children` prop', () => {
      const wrapper = mount(
        <ProgressCircle value={0}>
          <span data-test-id="stub">test</span>
        </ProgressCircle>
      )

      expect(wrapper.find('[data-test-id="stub"]')).toHaveLength(1)
    })

    describe('filled arc', () => {
      it('renders 90deg (acute) arc', () => {
        const wrapper = mount(<ProgressCircle value={0.25} />)
        expect(wrapper.find('[data-test-id="filled"]').prop('d')).toEqual(expect.stringContaining('A12,12 0 0,1 24,12'))
      })

      it('renders 180deg (straight) arc', () => {
        const wrapper = mount(<ProgressCircle value={0.5} />)
        expect(wrapper.find('[data-test-id="filled"]').prop('d')).toEqual(
          expect.stringContaining('A12,12 0 0,1 12.000000000000002,24')
        )
      })

      it('renders 270deg (obtuse) arc', () => {
        const wrapper = mount(<ProgressCircle value={0.75} />)
        expect(wrapper.find('[data-test-id="filled"]').prop('d')).toEqual(
          expect.stringContaining('A12,12 0 1,1 0,12.000000000000002')
        )
      })

      it('renders 360deg (full) arc', () => {
        const wrapper = mount(<ProgressCircle value={1} />)
        const d = wrapper.find('[data-test-id="filled"]').prop('d')
        expect(d).toEqual(expect.stringContaining('A12,12 0 0,1 12,24'))
        expect(d).toEqual(expect.stringContaining('A12,12 0 0,1 12,0'))
      })
    })
  })
})
