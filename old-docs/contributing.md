# Contribution Guidelines

## Configuring Development Environment

* Create a branch either `feat/feature-name` or `fix/issue-name`
* Install dependencies: `yarn`
* Run tests in watch mode: `yarn test --watch`
* Run dev server: `yarn dev`
* Send a PR :)

## Guidelines

* **Pull request first.**

  Create pull request with description of the component API. For example: What props it would accept, what events it will fire (callbacks), does the component have any slots (render props) etc. This gives reviewer to provide insights/suggestions when you are still working on the feature.

  You can add `WIP` prefix in the pull request title and remove it when it is ready to be merged.

* **One item per PR.**

  A pull request is either a new feature or a bug fix but it should do exactly one thing.

  In theory, a PR can:

  * add one component
  * fix one component
  * add one utility (can be one or more functions)
  * fix one utility
  * change one convention and so on.

  You can extend this to methodology commits too. One commit should do exactly one change and `git commit -p` is very helpful for this.

* **Write meaningful commit messages.**

  Commit messages explain the gist of the change in one line. If required, you may add additional description.

  The project uses [conventional commit](https://conventionalcommits.org/) messages to generate changelog.

## Tests

### What to test

1. **It must render:** At the very least, make sure the component renders without error. This verifies there are no JSX syntax errors, that all variables are defined, etc. This could be as simple as verifying that the rendered output is not null.

1. **Test the output:** One step above “it renders” is “it renders the correct thing.” Given a set of props, what output is expected?

1. **Test the states:** Every conditional should be accounted for. If the props are conditional (enabled/disabled, success/warning/error, etc), make sure to test that the deciding logic is working right. Likewise for conditionally-rendered children: if a Logout button is only visible when the user is logged in, for instance, make sure to test for that.

1. **Test the behaviour:** If the component can be interacted with (an input or button with an onClick or onChange or onAnything), test that the events work as expected and call the specified functions with the correct arguments.

1. **Test the edge cases:** Anything that operates on an array could have boundary cases — an empty array, an array with 1 element, a paginated list that should truncate at 25 items, and so on. Try out every edge case you can think of, and make sure they all work correctly.
