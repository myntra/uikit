const fs = require('fs')

const targets = (exports.targets = fs.readdirSync('packages/@myntra').filter(f => {
  return (
    fs.statSync(`packages/@myntra/${f}`).isDirectory() &&
    !/^(tokens|tokens-unity|uikit-cli|uikit-internals|uikit-patterns)$/.test(f)
  )
}))

exports.fuzzyMatchTarget = partialTarget => {
  const matched = []
  for (const target of targets) {
    if (target.match(partialTarget)) {
      matched.push(target)
    }
  }
  if (matched.length) {
    return matched
  } else {
    throw new Error(`Target ${partialTarget} not found!`)
  }
}
