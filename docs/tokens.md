# Tokens

## Typography

```jsx render
<Card>
  <TextPreview {...tokens.typography.heading.h1} name="Heading 1" />
  <TextPreview {...tokens.typography.heading.h2} name="Heading 2" />
  <TextPreview {...tokens.typography.heading.h3} name="Heading 3" />
  <TextPreview {...tokens.typography.heading.h4} name="Heading 4" />
  <TextPreview {...tokens.typography.text.title} name="Title" />
  <TextPreview {...tokens.typography.text.paragraph} name="Paragraph Text" />
  <TextPreview {...tokens.typography.text.table} name="Table Text" />
  <TextPreview {...tokens.typography.text.smallText} name="Small Text" />
  <TextPreview {...tokens.typography.text.caption} name="Caption Text" />
</Card>
```

## Colors

```jsx render
<Card>
  <ColorPreview color={tokens.color.black.regular} />
  <ColorPreview color={tokens.color.white.regular} />
  <ColorPreview color={tokens.color.blue.regular} />
  <ColorPreview color={tokens.color.gray.regular} />
  <ColorPreview color={tokens.color.green.regular} />
  <ColorPreview color={tokens.color.yellow.regular} />
  <ColorPreview color={tokens.color.red.regular} />

  <ColorPreview color={tokens.color.gray.lightest} />
  <ColorPreview color={tokens.color.gray.lighter} />
  <ColorPreview color={tokens.color.gray.light} />
  <ColorPreview color={tokens.color.gray.regular} />
  <ColorPreview color={tokens.color.gray.dark} />
</Card>
```

## Text Color

```jsx render
<Card>
  <TextPreview
    {...tokens.typography.text.paragraph}
    color={tokens.typography.color.dark.primary}
    name="Primary | Dark"
  />
  <TextPreview
    {...tokens.typography.text.paragraph}
    color={tokens.typography.color.dark.secondary}
    name="Secondary | Dark"
  />
  <TextPreview
    {...tokens.typography.text.paragraph}
    color={tokens.typography.color.dark.disabled}
    name="Disabled | Dark"
  />
</Card>
```

```jsx render
<Card type="error">
  <TextPreview
    {...tokens.typography.text.paragraph}
    color={tokens.typography.color.light.primary}
    name="Primary | Light"
  />
  <TextPreview
    {...tokens.typography.text.paragraph}
    color={tokens.typography.color.light.secondary}
    name="Secondary | Light"
  />
  <TextPreview
    {...tokens.typography.text.paragraph}
    color={tokens.typography.color.light.disabled}
    name="Disabled | Light"
  />
</Card>
```

## Shapes

```jsx render
<Card>
  <TextPreview
    {...tokens.typography.text.paragraph}
    name="Default"
  />
</Card>

<br />

<Card type="success">
  <TextPreview
    {...tokens.typography.text.paragraph}
    name="Success"
  />
</Card>

<br />

<Card type="error">
  <TextPreview
    {...tokens.typography.text.paragraph}
    name="Error"
  />
</Card>

<br />

<Card type="info">
  <TextPreview
    {...tokens.typography.text.paragraph}
    name="Info"
  />
</Card>

<br />

<Card type="warning">
  <TextPreview
    {...tokens.typography.text.paragraph}
    name="Warning"
  />
</Card>

<br />

<Card type="success" outline>
  <TextPreview
    {...tokens.typography.text.paragraph}
    name="Success Outline"
    />
</Card>

<br />

<Card type="error" outline>
  <TextPreview
    {...tokens.typography.text.paragraph}
    name="Error Outline"
  />
</Card>

<br />

<Card type="info" outline>
  <TextPreview
    {...tokens.typography.text.paragraph}
    name="Info Outline"
  />
</Card>

<br />

<Card type="warning" outline>
  <TextPreview
    {...tokens.typography.text.paragraph}
    name="Warning Outline"
  />
</Card>
```
