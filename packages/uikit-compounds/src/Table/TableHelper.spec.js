import React from 'react'
import { mount } from 'enzyme'
import { prepareBody, prepareHead } from './TableHelpers'
import Column from './TableColumn'

function prepareForTest(done, fn) {
  return ({ children, order, data }) => {
    const meta = prepareHead(children, order)

    expect(meta).toMatchSnapshot()

    if (data) {
      const body = prepareBody(meta, data, (row, index) => index)

      expect(body).toMatchSnapshot()

      fn && fn(body)
    } else {
      fn && fn(meta)
    }

    done()

    return null
  }
}

it('should collect header info', done => {
  const Component = prepareForTest(done, meta => {
    expect(meta.rows).toHaveLength(1)
    expect(meta.rows[0].columns).toHaveLength(3)
    expect(meta.rows[0].columns.map(column => column.children)).toEqual(['ID', 'Name', 'Content'])
  })

  mount(
    <Component>
      <Column key="id" label="ID" />
      <Column key="name" label="Name" accessor={({ firstName, lastName }) => `${firstName} ${lastName}`} />
      <Column key="content" label="Content">
        {({ data }) => <span>data.content</span>}
      </Column>
    </Component>
  )
})

it('should allow header grouping', done => {
  const Component = prepareForTest(done, meta => {
    expect(meta.rows).toHaveLength(2)
    expect(meta.rows[0].columns).toHaveLength(3)
    expect(meta.rows[0].columns.map(column => column.children)).toEqual(['ID', 'Name', 'Content'])
    expect(meta.rows[0].columns[0].colSpan).toBe(1)
    expect(meta.rows[0].columns[1].colSpan).toBe(2)
    expect(meta.rows[1].columns).toHaveLength(2)
    expect(meta.rows[1].columns.map(column => column.children)).toEqual(['First Name', 'Last Name'])
  })

  mount(
    <Component>
      <Column key="id" label="ID" />
      <Column key="name" label="Name">
        <Column key="firstName" label="First Name" />
        <Column key="lastName" label="Last Name" />
      </Column>
      <Column key="content" label="Content" />
    </Component>
  )
})

it('should throw error on missing key', done => {
  const Component = ({ children, order, data }) => {
    expect(() => prepareHead(children, order)).toThrow('Table.Column should')

    done()

    return null
  }

  mount(
    <Component>
      <Column key="id" label="ID" />
      <Column key="name" label="Name">
        <Column label="First Name" />
        <Column key="lastName" label="Last Name" />
      </Column>
      <Column key="content" label="Content" />
    </Component>
  )
})

it('should throw error on unknown key in order', done => {
  const Component = ({ children, order, data }) => {
    expect(() => prepareHead(children, order)).toThrow('Duplicate key')

    done()

    return null
  }

  mount(
    <Component order={['foo']}>
      <Column key="id" label="ID" />
      <Column key="name" label="Name">
        <Column key="name" label="Last Name" />
      </Column>
      <Column key="content" label="Content" />
    </Component>
  )
})

it('should allow column to have one child', done => {
  const Component = prepareForTest(done, meta => {
    expect(meta.rows).toHaveLength(2)
    expect(meta.rows[0].columns).toHaveLength(3)
    expect(meta.rows[0].columns.map(column => column.children)).toEqual(['ID', 'Name', 'Content'])
    expect(meta.rows[0].columns[0].colSpan).toBe(1)
    expect(meta.rows[0].columns[1].colSpan).toBe(1)
    expect(meta.rows[1].columns).toHaveLength(1)
    expect(meta.rows[1].columns.map(column => column.children)).toEqual(['First Name'])
  })

  mount(
    <Component>
      <Column key="id" label="ID" />
      <Column key="name" label="Name">
        <Column key="firstName" label="First Name" />
      </Column>
      <Column key="content" label="Content" />
    </Component>
  )
})

it('should reorder columns', done => {
  const Component = prepareForTest(done, meta => {
    expect(meta.rows).toHaveLength(1)
    expect(meta.rows[0].columns).toHaveLength(2)
    expect(meta.rows[0].columns.map(column => column.children)).toEqual(['Name', 'ID'])
  })

  mount(
    <Component order={['name', 'id']}>
      <Column key="id" label="ID" />
      <Column key="name" label="Name" accessor={({ firstName, lastName }) => `${firstName} ${lastName}`} />
      <Column key="content" label="Content">
        {({ data }) => <span>data.content</span>}
      </Column>
    </Component>
  )
})

it('should prepare table rows', done => {
  const Component = prepareForTest(done, body => {
    expect(body.rows).toHaveLength(1)
    expect(body.rows[0].columns).toHaveLength(3)
    expect(body.rows[0].columns.map(column => column.children)).toEqual([1, 'John Doe', <span>foo</span>]) // eslint-disable-line react/jsx-key
  })

  const fn = jest.fn().mockImplementation(props => props)

  mount(
    <Component data={[{ id: 1, firstName: 'John', lastName: 'Doe', content: 'foo' }]}>
      <Column key="id" label="ID" />
      <Column key="name" label="Name" accessor={({ firstName, lastName }) => `${firstName} ${lastName}`} />
      <Column key="content" label="Content" transformProps={fn}>
        {({ data }) => <span>{data.content}</span>}
      </Column>
    </Component>
  )

  expect(fn).toHaveBeenCalled()
})
