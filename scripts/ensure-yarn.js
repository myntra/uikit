if (process.env.npm_execpath.indexOf('yarn') === -1) {
  console.log('You must use Yarn to install, not NPM.\n')
  process.exit(1)
}
