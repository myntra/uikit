/* eslint-disable node/no-unpublished-require */
// create package.json, README, etc. for packages that don't have them yet

const args = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const path = require('path')

const { version } = require('../package.json')
const { targets, getPackageDir, getPackageRepository, getShortName, isComponent, isTheme, pascalCase } = require('./utils')

targets.forEach(name => {
  const shortName = getShortName(name)
  const rootDir = getPackageDir(name)

  const pkgFile = path.join(rootDir, `package.json`)
  const pkg = {
    name,
    version,
    main: isComponent(name) ? `src/${shortName}.tsx` : `src/index.ts`,
    module: `dist/${shortName}.js`,
    browser: isComponent(name) ? `src/${shortName}.tsx` : `src/index.ts`,
    author: 'Rahul Kadyan <hi@znck.me>',
    license: 'UNLICENSED',
    repository: getPackageRepository(name),
    publishConfig: {
      registry: 'http://registry.myntra.com:8000'
    },
    files: ['src/', 'dist/', 'bin/', '*.codemod.js']
  }

  if (isComponent(name)) {
    pkg.peerDependencies = {
      react: '>=15.4'
    }
  }

  if (fs.existsSync(pkgFile)) {
    Object.assign(pkg, require(pkgFile))
  }

  fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2))

  if (isComponent(name)) {
    const readmeFile = path.join(rootDir, `readme.mdx`)

    if (!fs.existsSync(readmeFile)) {
      const component = pascalCase(shortName)
      fs.writeFileSync(readmeFile, `
import ${component} from './src/${shortName}'

# ${component}

<Documenter component={${component}}>

\`\`\`jsx preview
// TODO: Add example.
\`\`\`

</Documenter>
`.trimLeft())
    }
  } else {
    const readmeFile = path.join(rootDir, `README.md`)
    if (!fs.existsSync(readmeFile)) {
      fs.writeFileSync(readmeFile, `# ${name}`)
    }
  }

  const mainFile = path.join(rootDir, pkg.main)
  const srcDir = path.dirname(mainFile)
  if (!fs.existsSync(mainFile)) {
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir)
    }
    fs.writeFileSync(mainFile, ``)
  }
})
