# Contribution Guidelines

## Configuring Development Environment

* Create a branch either `feat/feature-name` or `fix/issue-name`
* Install dependencies: `yarn`
* Run tests in watch mode: `yarn test --watch`
* Run dev server: `yarn dev`
* Send a PR :)

## Guidelines

* Create pull request as early as possible.
  This gives reviewer to provide insights/suggestions when you are still working on the feature.
  You can add `WIP` prefix in the pull request title and remove it when it is ready to be merged.
* One item per PR.
  A pull request is either a new feature or a bug fix but it should do exactly one thing.
  Common scenarios: A PR can add one component, fix one component, add one utility (can be one or more functions), fix one utility, change one convention and so on.
  You can extend this to methodology commits too. One commit should do exactly one change and `git commit -p` is very helpful for this.
* Write meaningful commit messages.
  Commit messages explain the gist of the change in one line. If required, you may add additional description.
  The project uses [conventional commit](https://conventionalcommits.org/) messages to generate changelog.
