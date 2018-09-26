import fetch from 'unfetch'

const GLOBAL_ID = '--uikit-icon-loader--'

export function fetchIfRequired(urlOrContent) {
  if (typeof urlOrContent !== 'string') return
  if (/<svg/.test(urlOrContent)) return urlOrContent

  return fetch(urlOrContent)
    .then(response => {
      if (response.ok) {
        return response.text()
      }

      console.error('Failed to download icons: ', urlOrContent)
    })
    .catch(error => console.error(error))
}

export function injectSVG(id, code) {
  if (!code) return
  if (code instanceof Promise) return code.then(content => injectSVG(id, content))
  const root = getSpriteNode()

  id = GLOBAL_ID + id.replace(/[^a-z]/, '')

  const existing = Array.from(root.children).find(node => node.id === id)

  if (existing) {
    existing.innerHTML = code
    return
  }

  const node = document.createElement('div')

  node.id = id
  node.innerHTML = code

  root.appendChild(node)
}

function getSpriteNode() {
  const existing = document.getElementById(GLOBAL_ID)

  if (existing) return existing

  const node = document.createElement('div')

  node.id = GLOBAL_ID
  node.style.display = 'none'

  document.body.appendChild(node)

  return node
}
