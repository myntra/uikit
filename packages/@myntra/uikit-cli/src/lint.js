const { CLIEngine } = require('eslint')
const glob = require('globby')
const ProgressBar = require('progress')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const git = require('./utils/git')

module.exports = async function lint(paths, { commit }) {
  if (paths.length === 0) paths.push('.')
  const isDebug = process.env.UIKIT_CLI_MODE === 'debug'

  const engine = new CLIEngine({
    ...require('@myntra/eslint-config-standard'),
    fix: true,
    useEslintrc: false
  })

  const patterns = engine.resolveFileGlobPatterns(paths).map(it => it.replace(/\.js$/, '.(js|jsx|json)'))

  const files = (await glob(patterns, {
    expandDirectories: { extensions: ['js', 'jsx', 'json'] },
    gitignore: true,
    onlyFiles: true,
    unique: true,
    absolute: true,
    ignore: ['node_modules/**/*', 'build/**/*', 'dist/**/*']
  })).filter(it => !/(\/(node_modules|build|dist|assets)\/|package-lock\.json)/.test(it))

  let progress = new ProgressBar(
    `${chalk.green(`uikit lint >`)} ${chalk.blue(':current/:total')} (:percent) [${chalk.gray(':bar')}] :eta s`,
    { total: files.length, clear: true }
  )
  const reports = await Promise.all(
    files.map(
      file =>
        new Promise(resolve =>
          setTimeout(() => {
            if (isDebug) console.log('> ' + file)
            const result = engine.executeOnFiles([file])
            progress.tick()
            if (!isDebug) progress.render()

            resolve(result)
          }, 0)
        )
    )
  )

  // New Job.
  progress = new ProgressBar(
    `${chalk.green(`uikit lint `)}(writing) ${chalk.green('>')} ${chalk.blue(
      ':current/:total'
    )} (:percent) [${chalk.gray(':bar')}] :eta s`,
    { total: files.length, clear: true }
  )
  await Promise.all(
    reports.map(
      report =>
        new Promise(resolve => {
          setTimeout(() => {
            CLIEngine.outputFixes(report)
            progress.tick()
            progress.render()
            // TODO: Output errors.
            resolve()
          }, 0)
        })
    )
  )

  console.log('Processed ' + files.length + ' files.')

  if (commit) {
    const message = `chore: Automated code style fix using 'uikit lint'`
    for (const it of paths) {
      const dir = path.resolve(process.cwd(), it)

      if (isDebug) console.log('> ' + it + ' :: ' + dir)
      if (fs.existsSync(dir)) {
        const repository = git(dir)

        if ((await repository.log()).includes(message)) await repository.reset('HEAD^1')
        await repository.commit(message, files.filter(file => file.startsWith(dir)))
      }
    }
  }
}
