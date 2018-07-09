const GLOBAL_ID = '--uikit-icon-loader--'
export default function injectSVG(id, code) {
  const root = getSpriteNode()

  id = GLOBAL_ID + id

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