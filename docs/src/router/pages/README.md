# Router Pages

Spectrum uses directory based routing. Every `.jsx` file is a page.

So for following files, corresponding URLs are generated.

- `pages/index.jsx` => `/`
- `pages/user.jsx` => `/user`
- `pages/user/index.jsx` => `/user/`
- `pages/user/_id.jsx` => `/user/:id?`
- `pages/user/_id/profile.jsx` => `/user/:id/profile`

## Example

``` jsx
import React from 'react'

/** @type {import('@spectrum').RouteComponent} */
export default function HomePage({ location }) {
  return (
    <section>
      <h1>Home Page</h1>
      <p>{location.path}</p>
    </section>
  )
}
```

## Router Helper API

Spectrum provides two dynamic modules:

### `@router` module

```jsx
import {
  RouterView // A component which renders current page.
} from '@router'
```

### `@spectrum` module

```jsx
import {
  AppLink, // Renders `<a>` in a scoped app.
  RootLink // Renders `<a>` in global scope.
} from '@spectrum'
```
