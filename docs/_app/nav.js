// Used in node.js env too.
module.exports = [
  { to: '/', label: 'Getting Started' },
  { to: '/contributing/', label: 'Contribution Guidelines' },
  { to: '/changelog/', label: 'Changelog' },
  { type: 'sep' },
  { to: '/tokens/', label: 'Tokens' },
  { type: 'sep' },
  {
    to: '/component-elements/',
    label: 'Elements',
    children: ({ elements }) => Object.keys(elements).map(name => ({ to: '/component-elements/', label: name }))
  },
  {
    to: '/component-compounds/',
    label: 'Compounds',
    children: ({ compounds }) => Object.keys(compounds).map(name => ({ to: '/component-compounds/', label: name }))
  },
  {
    to: '/component-patterns/',
    label: 'Patterns',
    children: ({ patterns }) => Object.keys(patterns).map(name => ({ to: '/component-patterns/', label: name }))
  },
  {
    to: '/component-internals/',
    label: 'Internals',
    children: ({ internals }) => Object.keys(internals).map(name => ({ to: '/component-internals/', label: name }))
  }
]
