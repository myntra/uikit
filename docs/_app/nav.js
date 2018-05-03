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
    children: ({ elements }) =>
      Object.keys(elements).map(name => ({ to: { pathname: '/component-elements/', hash: name }, label: name }))
  },
  {
    to: '/component-compounds/',
    label: 'Compounds',
    children: ({ compounds }) =>
      Object.keys(compounds).map(name => ({ to: { pathname: '/component-compounds/', hash: name }, label: name }))
  },
  {
    to: '/component-patterns/',
    label: 'Patterns',
    children: ({ patterns }) =>
      Object.keys(patterns).map(name => ({ to: { pathname: '/component-patterns/', hash: name }, label: name }))
  },
  {
    to: '/component-internals/',
    label: 'Internals',
    children: ({ internals }) =>
      Object.keys(internals).map(name => ({ to: { pathname: '/component-internals/', hash: name }, label: name }))
  }
]
