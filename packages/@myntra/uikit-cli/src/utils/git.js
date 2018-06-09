const exec = require('execa')

module.exports = function git(cwd = process.cwd()) {
  async function isDirty() {
    const { stdout } = await exec.shell('git diff-index --quiet HEAD -- && echo clean || echo dirty', { cwd })

    return stdout !== 'clean'
  }

  async function isClean() {
    return !(await isDirty())
  }

  async function reset(to) {
    await exec.shell(`git reset ${to}`, { cwd })
  }

  async function stage(...files) {
    await exec.shell(`git add ${files.join(' ')}`, { cwd })
  }

  async function commit(message, files = [], author = false) {
    if (files.length) await stage(...files)
    if (author) author = typeof author === 'string' ? '--author ' + JSON.stringify(author) : ''
    if (await isDirty())
      await exec.shell(
        `git commit ${
          author === false ? '--author "UIKit CLI <no-reply@uikit.myntra.com>"' : author
        } -m ${JSON.stringify(message)}`,
        { cwd }
      )
  }

  async function log(count = 1) {
    return (await exec.shell(`git log -${count} --color`, { cwd })).stdout
  }

  return { isDirty, isClean, stage, commit, log, reset }
}
