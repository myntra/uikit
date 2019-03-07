import React from 'react'
import { shallow } from 'enzyme'
import ProgressBar from './ProgressBar'

describe('<ProgressBar>', () => {
  it('title renders correctly', () => {
    const tree = shallow(<ProgressBar title="title" value={80} barType="success" />)
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly to 80%', () => {
    const tree = shallow(<ProgressBar value={80} />)
    expect(tree).toMatchSnapshot()
  })

  it('no props given', () => {
    const tree = shallow(<ProgressBar />)
    expect(tree).toMatchSnapshot()
  })

  it('with height 10px ', () => {
    const tree = shallow(<ProgressBar height={10} barType="danger" />)
    expect(tree).toMatchSnapshot()
  })

  it('All props given', () => {
    const tree = shallow(<ProgressBar value={70} title={'hello'} height={10} barType="info" />)
    expect(tree).toMatchSnapshot()
  })

  it('Check width and height and className', () => {
    const wrapper = shallow(<ProgressBar />)
    wrapper.setProps({ height: 10, value: 50, barType: 'info' })
    expect(wrapper.find('.bar').prop('style')).toMatchObject({ height: '10px', width: '50%' })
    expect(wrapper.find('.bar').hasClass('info')).toEqual(true)
  })
})
