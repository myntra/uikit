import React, { useEffect, useState } from 'react'
import Documenter from '@components/documenter'

async function findComponent(getModule, Component, setComponent) {
  try {
    const Module = await getModule()

    return Module.default
  } catch (e) {
    return null
  }
}

async function findDocumentation(name, Component, setComponent) {
  const readme = await findComponent(() => import(`@uikit/${name}/readme`))

  if (readme) {
    if (readme !== Component) setComponent(() => readme)

    return
  }

  const component = await findComponent(() => import(`@uikit/${name}/src/${name}.tsx`))

  if (component) {
    if (component !== Component) setComponent(() => () => <Documenter component={component} hideName={false} />)

    return
  }

  setComponent(() => () => <div>Cannot find component named: {name}</div>)
}

export default function ComponentDocumentationPage({ name }) {
  const [Component, setComponent] = useState(null)

  useEffect(() => {
    findDocumentation(name, Component, setComponent)
  })

  return Component ? <Component components={{ wrapper: 'div' }} /> : null
}
