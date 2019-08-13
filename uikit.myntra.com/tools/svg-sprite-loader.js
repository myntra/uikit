module.exports = function SpriteLoader(source) {
  return `
    const content = ${JSON.stringify(source)}
    const svg = document.createElement('div')

    svg.innerHTML = content
    svg.setAttribute('hidden', '')

    document.body.appendChild(svg)
    `
}
