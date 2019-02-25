import React from 'react'
import { mount } from 'enzyme'
import Table from './Table'

it('should render correctly', () => {
  const wrapper = mount(
    <Table data={[{ id: 1, firstName: 'John', lastName: 'Doe', content: 'foo' }]}>
      <Table.Column key="id" label="ID" />
      <Table.Column key="name" label="Name" accessor={({ firstName, lastName }) => `${firstName} ${lastName}`} />
      <Table.Column key="content" label="Content">
        {({ data }) => <span>{data.content}</span>}
      </Table.Column>
    </Table>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render sorted rows', () => {
  const wrapper = mount(
    <Table
      data={[
        { id: 1, firstName: 'John', lastName: 'Doe', content: 'foo' },
        { id: 2, firstName: 'Jane', lastName: 'Doe', content: 'foo' }
      ]}
      sort={['content']}
    >
      <Table.Column key="id" label="ID" />
      <Table.Column key="name" label="Name" accessor={({ firstName, lastName }) => `${firstName} ${lastName}`} />
      <Table.Column key="content" label="Content">
        {({ data }) => <span>{data.content}</span>}
      </Table.Column>
    </Table>
  )

  const rows = wrapper.find('tbody').find('tr')

  expect(wrapper).toMatchSnapshot()

  expect(rows).toHaveLength(2)

  /* eslint-disable prettier/prettier */
  expect(rows.at(0).find('td').first().text()).toEqual('1')
  expect(rows.at(1).find('td').first().text()).toEqual('2')
  /* eslint-enable prettier/prettier */
})

it('should render reverse sorted rows', () => {
  const wrapper = mount(
    <Table
      data={[
        { id: 1, firstName: 'John', lastName: 'Doe', content: 'foo' },
        { id: 2, firstName: 'Jane', lastName: 'Doe', content: 'bar' },
        { id: 3, firstName: 'Jane', lastName: 'Do', content: 'baz' }
      ]}
      sort={[{ column: 'firstName', order: 'ASC' }, { column: 'content', order: 'DESC' }]}
    >
      <Table.Column key="id" label="ID" />
      <Table.Column key="name" label="Name" accessor={({ firstName, lastName }) => `${firstName} ${lastName}`} />
      <Table.Column key="content" label="Content">
        {({ data }) => <span>{data.content}</span>}
      </Table.Column>
    </Table>
  )

  const rows = wrapper.find('tbody').find('tr')

  expect(wrapper).toMatchSnapshot()

  expect(rows).toHaveLength(3)

  /* eslint-disable prettier/prettier */
  expect(rows.at(0).find('td').first().text()).toEqual('3')
  expect(rows.at(1).find('td').first().text()).toEqual('2')
  expect(rows.at(2).find('td').first().text()).toEqual('1')
  /* eslint-enable prettier/prettier */
})

it('should throw error on unknown children', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  mount(
    <Table data={[]}>
      <Table.Column key="id" label="ID" />
      <div key="1" />
    </Table>
  )

  expect(spy).toHaveBeenCalled()
})
