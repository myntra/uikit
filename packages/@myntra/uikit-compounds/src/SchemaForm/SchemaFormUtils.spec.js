import { generateUISchema } from './SchemaFormUtils'

import simple from './fixtures/simple.schema.json'

function namedFn(name) {
  return () => {}
}

describe('generateUISchema', () => {
  it('should generate UI schema', () => {
    const ui = generateUISchema(simple, namedFn)

    expect(ui).toMatchSnapshot()
  })
})
