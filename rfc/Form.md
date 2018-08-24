# Form

## Usage

``` jsx
<Form>
  <Form.Text
    label="Name"
    value={data.name} onChange={name => data.set({ name })}
    error={errors.name}
    description="Partner name"
  />

  <Form.Select
    label="Brand"
    options={this.state.options}
    value={data.brand} onChange={brand => data.set({ brand })}
    error={errors.brand}
    description="The brand name"
  />

  <Form.Action label="Search" onClick={this.handleSave} primary />
  <Form.Action label="Reset" onClick={this.handleReset} />
  <Form.Action label="Some Other Action" onClick={this.handleSomeOtherAction} />
</Form>
```

``` jsx
const schema = {
  // Valid JSON Schema
  // See: http://json-schema.org/draft-06/json-schema-validation.html
  properties: {
    name: {
      title: 'Name',
      type: 'string',
      required: true
    },
    brand: {
      title: 'Brand',
      type: 'string',
      format: '~brand'
    }
  },
  required: [
    'brand'
  ]
}

const OptionsProvider = ({ path, value, data, schemaNode }) => {
  if (schemaNode.format === '~brand') return reduxOrState.findBrandsForPartner(data.partnerId)
}

<SchemaForm
  schema={schema}
  data={this.state.data}
  errors={this.state.errors}
  provider={OptionsProvider}
  onChange={(data, errors) => this.setState({ data, errors })}
>
  <Form.Action label="Search" onClock={this.handleSave} primary />
  <Form.Action label="Reset" onClick={this.handleReset} />
  <Form.Action label="Some Other Action" onClick={this.handleSomeOtherAction} />
</SchemaForm>

// It will render.
// handleChange
handleChange (newData) {
  this.props.onChange({ ...this.props.data, ...newData }, except(newData, Object.keys(newData)))
}
// render

<Form>
  <Grid>
    <Grid.Column size="one-fifth">
      <Form.Group>
        <Label>{schema.properties.name.title}</Label>
        <InputText value={data.name} onChange={name => this.handleChange({ name })} />
        {schema.properties.name.description && <Form.HelpText>{schema.properties.name.description}</Form.HelpText>}
        {errors.name && <Form.HelpText type="danger">{errors.name}</Form.HelpText>}
      </Form.Group>
    </Grid.Column>
    <Grid.Column size="one-fifth">
      <Form.Group>
        <Label>{schema.properties.brand.title}</Label>
        <InputSelect
          value={data.brand} onChange={brand => this.handleChange({ brand })}
          options={this.props.provider({ path: 'brand', value: data.brand, data, schemaNode: schema.properties.brand })}
        />
        {schema.properties.brand.description && <Form.HelpText>{schema.properties.brand.description}</Form.HelpText>}
        {errors.brand && <Form.HelpText type="danger">{errors.brand}</Form.HelpText>}
      </Form.Group>
    </Grid.Column>

    <Grid.Column>
      <Button>Search</Button>
      <Dropdown trigger={<Button>More</Button>}>
        <Button>Reset</Button>
        <Button>Some Other Action</Button>
      </Dropdown>
    </Grid.Column>
  </Grid>
</Form>
```
