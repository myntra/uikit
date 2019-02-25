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

## Usage

* Install `@mytra/uikit` package.

  ```bash
  npm add @myntra/uikit
  ```

* Add named imports to use specific components.

  ```jsx
  import { Button } from '@myntra/uikit'

  export default function MyApp() {
    return (
      <div>
        <Button type="primary">UIKit Button</Button>
      </div>
    )
  }
  ```

**NOTE:** The root component should be wrapped with  `ThemeProvider` component else all UIKit components would have broken styles.

```jsx
import { render } from 'react-dom'

render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)
```

## Migrating from unity-uikit

* Add UIKit to your project (see above guide)
* Install UIKit CLI

  ```bash
  npm install -g @myntra/uikit-cli
  ```

* Use `migrate` utility

  ```bash
  uikit migrate -h
  ```
