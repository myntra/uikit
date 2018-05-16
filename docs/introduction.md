# Introduction

The UIKit is a design system which aims to establish a common vocabulary between everyone in an organization.
It captures design structures, conventions, and decisions as it's terminology. Let’s go through each layer in detail and what the terms mean:

* **Principles** are the foundation of the whole system. They form the basis of a good product and help the team with decision making. They are there to guide the team when working with the myriad parts of the system and help us do better and more informed decisions.

* **Design Tokens** are the atoms of the system. In UIKit, they are used instead of hard coded values to ensure a better consistency across any platform.

* **Elements** utilize decisions made on the token level. A simple example of an element would be a button, a link, or an input. Anything that cannot be broken down further. The name ‘element’ is used because everything in Vue and React world is nowadays ‘a component.’ Using that term for anything else would be confusing.

* **Compounds** are components that fall on the more complex side of the spectrum. So for example things like a date picker, a data table, or a visualization. Compounds utilize both elements and tokens. If you wonder whether something should be called an element or a compound, ask yourself this question: “Can this be broken down into smaller pieces?” If the answer is yes, it should most likely be a compound.

* **Patterns** exist to document the layout and structure of a section. Patterns consist of the three things mentioned above: tokens, elements, and compounds.

## Component Status

Components in the system are labelled with status labels that reflect their state of completion.
This is achieved using `@status` tag:

```jsx
/**
 * @status READY
 */
export default function MyComponent(props) {
  // ...
}
```

You can see all available statuses listed below:

| Icon | Status       | Description                                                                                    |
| :--: | :----------- | :--------------------------------------------------------------------------------------------- |
|  💔  | DEPRECATED   | The component would be removed in next major release.                                          |
|  ❤️  | EXPERIMENTAL | The component is experimental and should not be used in production applications.               |
|  💛  | REVIEWING    | The component is under review and can have bug. It is advised to wrap it in an error boundary. |
|  💚  | READY        | The component is well tested and stable.                                                       |

## Naming Things

We use the names to communicate about Tokens, Elements, Compound and Patterns. Hence, they must be short, meaningful and pronounceable. Each name must be:

* **Verb Rather Than Noun:** To understand the purpose, focus on what it does rather than what it is. This helps us broaden potential use cases as well as define its purpose more accurately.

* **Meaningful**: Not over specific, not overly abstract.

* **Short**: Maximum of 2 or 3 words.

* **Pronounceable**: We want to be able talk about them.

### Prefixing Names

There are a few rules around prefixing things to keep the system consistent:

* **Tokens:** Token names always start with a category name and a hyphen. For example `color-` or `space-`. For subcategories, include them in the naming as well and separate with hyphen, Example: `color-primary-` or `color-secondary-`.

* **Element, Compound & Pattern:** If there is an internal component, then it should use parent components name as prefix. Example: `TableRow` is internal component of `Table`.

### Naming Sizes

The UIKit uses the following convention:

* **Default:** The default unit is always called `base`.

* **Smaller than default:** For a size that is smaller than base it should be named either `small`, `x-small`, `xx-small` and so on.

* **Larger than default:** For a size that is larger than base we use `large`, `x-large`, `xx-large` and so on.

### Naming Colors

The UIKit uses the following convention:

* **Default:** The default base color is always called `color-{name}`.

* **Darker than default:** Use either `color-{name}-dark`, `color-{name}-darker` or `color-{name}-darkest`.

* **Lighter than default:** Use `color-{name}-light`, `color-{name}-lighter`, `color-{name}-lightest` and so on.

### Naming Props

Naming props follows same rules as naming things and following are some additional conventions:

* **Unreserved:** The prop name should should not be a HTML attribute. If a meaningful prop name is same as an attribute name then expose additional prop with prefix `html`. Example:

  ```jsx
  <Button type="primary" htmlType="submit" />
  ```

* **Render Props:** Render props accept a functional component definition. Every render prop should prefixed with `render`.

  ```jsx
  <MyComponent renderSomething={props => <span>{props.someProp}</span>} />
  ```

## Design Tokens

Tokens are created in simple YAML files. The `@myntra/tokenizer` package provides an executable to process the tokens YAML file and generate tokens in every required format.

### Creating Tokens

Create a YAML file and add values as per the naming conventions. Example:

``` yaml
color:
  red:
    light: rgb(200, 0, 0)
    base: rgb(255, 0, 0)
  primary: $color.red.base
  secondary: $color.red.light
```

Any property in YAML file can referenced with `$` syntax. For example, `$color.red.base`.

### Using Tokens

Tokens are exported as CSS and JavaScript variables, and can be used naturally.

#### In React Components

``` jsx
import { color } from '@myntra/tokens'

export default () => <span style={{ color: color.primary }} />
```

#### In CSS Files

``` css
@import '@myntra/tokens/tokens.css'

.foo {
  color: var(--color-primary);
}
```

## Elements

Following are some conventions for creating elemental components:

* Each component should be created in a separate directory named same as component name.
* Avoid creating files named `index.jsx`, `style.css` etc. Name every file contextually i.e. filename should be same as component's name it is associated with.
* One render function. Try to avoid markup encapsulation as functions.
* Do not split render method into multiple functions. Create components over functions.
* Avoid branches in render method.
