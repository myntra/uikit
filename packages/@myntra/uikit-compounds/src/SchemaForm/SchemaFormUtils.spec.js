import { generateUISchema } from './SchemaFormUtils'

import simple from './fixtures/simple.schema.json'

describe('generateUISchema', () => {
  it('should generate UI schema', () => {
    const ui = generateUISchema(simple, {
      resolveComponent() {}
    })

    expect(ui).toMatchSnapshot()
  })
})
