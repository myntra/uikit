/* eslint-disable node/no-unpublished-require */
// create package.json, README, etc. for packages that don't have them yet

const fs = require('fs')
const path = require('path')

const { version } = require('../package.json')
const {
  targets,
  getPackageDir,
  getPackageRepository,
  getShortName,
  isComponent,
  pascalCase,
  initSrc,
} = require('./utils')

targets.forEach((name) => {
  const shortName = getShortName(name)
  const rootDir = getPackageDir(name)

  const pkgFile = path.join(rootDir, `package.json`)
  const pkg = {
    name,
    version,
    main: `dist/${shortName}.cjs.js`,
    module: `dist/${shortName}.esm.js`,
    types: 'dist/index.d.ts',
    author: 'Rahul Kadyan <hi@znck.me>',
    license: 'UNLICENSED',
    repository: getPackageRepository(name),
    publishConfig: {
      registry: 'http://registry.myntra.com:8000',
    },
    files: ['src/', 'dist/', 'bin/'],
    sideEffects: false,
  }

  const srcFiles = initSrc(shortName)

  if (isComponent(name)) {
    pkg.peerDependencies = {
      react: '>=15.4',
    }

    pkg.devDependencies = {
      '@types/react': 'latest',
    }
  }

  if (fs.existsSync(pkgFile)) {
    Object.assign(pkg, require(pkgFile))
  }

  fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2) + '\n')

  if (isComponent(name)) {
    const readmeFile = path.join(rootDir, `readme.mdx`)

    if (!fs.existsSync(readmeFile)) {
      const component = pascalCase(shortName)
      fs.writeFileSync(
        readmeFile,
        `
import ${component} from './src/${shortName}'

# ${component}

<Documenter component={${component}}>

\`\`\`jsx preview
// TODO: Add example.
\`\`\`

</Documenter>
`.trimLeft()
      )
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
      const newDir = path.join(rootDir, 'src')
      fs.mkdirSync(newDir)
      srcFiles.forEach((fileObj) =>
        fs.writeFileSync(
          path.join(newDir, fileObj.name),
          fileObj.initialContent
        )
      )
    }
  }
})
