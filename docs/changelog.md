# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.5.5"></a>
## [0.5.5](https://bitbucket.org/myntra/uikit/compare/v0.5.4...v0.5.5) (2018-11-26)


### Bug Fixes

* **compounds | Grid:** Remove top and bottom padding from column ([cc0f2f9](https://bitbucket.org/myntra/uikit/commits/cc0f2f9))
* **elements | ClickAway:** Allow function refs ([15347e9](https://bitbucket.org/myntra/uikit/commits/15347e9))
* **elements | InputSelect:** Hide remove icon for required and allow removing multiple options ([48e0e45](https://bitbucket.org/myntra/uikit/commits/48e0e45))



<a name="0.5.4"></a>
## [0.5.4](https://bitbucket.org/myntra/uikit/compare/v0.5.3...v0.5.4) (2018-11-22)


### Bug Fixes

* **elements | Button:** Missing border-radius variable ([3ef5810](https://bitbucket.org/myntra/uikit/commits/3ef5810))



<a name="0.5.3"></a>
## [0.5.3](https://bitbucket.org/myntra/uikit/compare/v0.5.2...v0.5.3) (2018-11-22)


### Bug Fixes

* **compounds | SchemaForm:** Use relative path to import local components ([0d584bd](https://bitbucket.org/myntra/uikit/commits/0d584bd))
* **elements | Button:** Use border-radius from theme ([274e9d7](https://bitbucket.org/myntra/uikit/commits/274e9d7))
* **elements | InputSelect:** Hidden search field under selected value ([72c4bb2](https://bitbucket.org/myntra/uikit/commits/72c4bb2))
* **elements | Loader:** Unexpected background color ([16b2989](https://bitbucket.org/myntra/uikit/commits/16b2989))
* **elements | Modal:** Embedded modal without trigger not possible ([022f3e1](https://bitbucket.org/myntra/uikit/commits/022f3e1))



<a name="0.5.2"></a>
## [0.5.2](https://bitbucket.org/myntra/uikit/compare/v0.5.1...v0.5.2) (2018-11-20)


### Bug Fixes

* **elements | InputSelect:** Search in select options ([4e970ae](https://bitbucket.org/myntra/uikit/commits/4e970ae))
* **elements | InputSelect:** Search in select options ([fe1150e](https://bitbucket.org/myntra/uikit/commits/fe1150e))



<a name="0.5.1"></a>
## [0.5.1](https://bitbucket.org/myntra/uikit/compare/v0.5.0...v0.5.1) (2018-11-20)


### Bug Fixes

* **elements | Dropdown:** Use fixed positioning to avoid misplaced container ([bafea32](https://bitbucket.org/myntra/uikit/commits/bafea32))
* **elements | InputDate:** Close dropdown on value selection and input field blur ([a6e67d1](https://bitbucket.org/myntra/uikit/commits/a6e67d1))



<a name="0.5.0"></a>

# [0.5.0](https://bitbucket.org/myntra/uikit/compare/v0.4.0...v0.5.0) (2018-11-19)

### Features

- **compounds | Accordion:** Allow Accordion.Item in decendent tree ([c65ce44](https://bitbucket.org/myntra/uikit/commits/c65ce44))
- **compounds | Accordion:** Use legacy context API to provide accordion for react 15.x ([8af50d4](https://bitbucket.org/myntra/uikit/commits/8af50d4))
- **compounds | SchemaForm:** Dispatch submit event on form submit ([f834ff3](https://bitbucket.org/myntra/uikit/commits/f834ff3))
- **compounds | SchemaForm:** Support for conditional branches in schema ([e42bbc0](https://bitbucket.org/myntra/uikit/commits/e42bbc0))
- **compounds | Table:** Configure column order ([6a906e9](https://bitbucket.org/myntra/uikit/commits/6a906e9))
- **compounds | Table:** Custom row renderer and optionally uses div ([3cdf0ee](https://bitbucket.org/myntra/uikit/commits/3cdf0ee))
- **compounds | Table:** Helper component `WithSentinel` to render custom content with row ([3d980c6](https://bitbucket.org/myntra/uikit/commits/3d980c6))
- **elements | Loader:** Add Loader component ([7a5e5c5](https://bitbucket.org/myntra/uikit/commits/7a5e5c5))
- **elements | Portal:** Render in document.body if container prop is true ([a199c80](https://bitbucket.org/myntra/uikit/commits/a199c80))
- **theme | unity:** Add tokens for the unity theme ([4e1c361](https://bitbucket.org/myntra/uikit/commits/4e1c361)), closes [#101](https://bitbucket.org/myntra/uikit/issue/101)

### Bug Fixes

- **compounds | Accordion:** Use Fragment to render accordion title & children ([9986eba](https://bitbucket.org/myntra/uikit/commits/9986eba))
- **compounds | Form:** Allow null children ([7dab0e0](https://bitbucket.org/myntra/uikit/commits/7dab0e0))
- **compounds | NavBar:** Display icon only for top level items ([86f53fb](https://bitbucket.org/myntra/uikit/commits/86f53fb)), closes [#97](https://bitbucket.org/myntra/uikit/issue/97)
- **compounds | Table:** Allow null children ([aac41e0](https://bitbucket.org/myntra/uikit/commits/aac41e0))
- **compounds | TopBar:** Title prop can be react node ([066e740](https://bitbucket.org/myntra/uikit/commits/066e740))
- **elements | Dropdown:** Reposition dropdown on scroll ([4daa413](https://bitbucket.org/myntra/uikit/commits/4daa413))
- **elements | Dropdown:** Use scroll offset to position content correctly ([3df6715](https://bitbucket.org/myntra/uikit/commits/3df6715))
- **elements | InputDate:** Popup picker does not capture keyboard focus ([e752fc2](https://bitbucket.org/myntra/uikit/commits/e752fc2))
- **elements | InputDate:** Preserve end date focus after choosing start date ([fe2a752](https://bitbucket.org/myntra/uikit/commits/fe2a752))
- **elements | InputSelect:** Render hidden select field for browser ([6ac3eb7](https://bitbucket.org/myntra/uikit/commits/6ac3eb7)), closes [#98](https://bitbucket.org/myntra/uikit/issue/98)
- **elements | InputSelect:** Render options in body portal to prevent any occlusion ([afa135a](https://bitbucket.org/myntra/uikit/commits/afa135a))
- **elements | Portal:** Use theme class from context to preserve current theme ([ba749e5](https://bitbucket.org/myntra/uikit/commits/ba749e5)), closes [#103](https://bitbucket.org/myntra/uikit/issue/103)
- **tokenizer:** Generate 15.x compatible ThemeProvider ([69f7d46](https://bitbucket.org/myntra/uikit/commits/69f7d46))

<a name="0.4.0"></a>

# [0.4.0](https://bitbucket.org/myntra/uikit/compare/v0.3.1...v0.4.0) (2018-09-28)

### Features

- **uikit:** Provide pre-built ESM build ([be171ed](https://bitbucket.org/myntra/uikit/commits/be171ed))

<a name="0.3.1"></a>

## [0.3.1](https://bitbucket.org/myntra/uikit/compare/v0.3.0...v0.3.1) (2018-09-26)

### Bug Fixes

- **elements:** Update icons ([6182f0f](https://bitbucket.org/myntra/uikit/commits/6182f0f))
- **elements | Avatar:** Add component for Icon fallback in Nav ([697f22b](https://bitbucket.org/myntra/uikit/commits/697f22b))

<a name="0.3.0"></a>

# [0.3.0](https://bitbucket.org/myntra/uikit/compare/v0.3.0...v0.3.0) (2018-09-26)

### Features

- **compounds | Accordion:** Add Accordion component ([55a9783](https://bitbucket.org/myntra/uikit/commits/55a9783)), closes [#71](https://bitbucket.org/myntra/uikit/issue/71)
- **compounds | BreadCrumb:** Add BreadCrumb component ([e57e95c](https://bitbucket.org/myntra/uikit/commits/e57e95c)), closes [#73](https://bitbucket.org/myntra/uikit/issue/73)
- **compounds | Form:** Add Form component ([26500a4](https://bitbucket.org/myntra/uikit/commits/26500a4)), closes [#70](https://bitbucket.org/myntra/uikit/issue/70)
- **compounds | Grid:** Move GridColumn component to Grid.Column ([bbabbb5](https://bitbucket.org/myntra/uikit/commits/bbabbb5))
- **compounds | NavBar:** Add side navigation component ([66b26f0](https://bitbucket.org/myntra/uikit/commits/66b26f0)), closes [#67](https://bitbucket.org/myntra/uikit/issue/67)
- **compounds | NavBar:** Custom match function to find active nav item ([e52eea6](https://bitbucket.org/myntra/uikit/commits/e52eea6))
- **compounds | SchemaForm:** Add SchemaForm component ([e046509](https://bitbucket.org/myntra/uikit/commits/e046509))
- **compounds | Table:** Add Table component ([cf7ac48](https://bitbucket.org/myntra/uikit/commits/cf7ac48)), closes [#76](https://bitbucket.org/myntra/uikit/issue/76)
- **compounds | Tabs:** Add Tab component ([93242a4](https://bitbucket.org/myntra/uikit/commits/93242a4)), closes [#79](https://bitbucket.org/myntra/uikit/issue/79) [#70](https://bitbucket.org/myntra/uikit/issue/70)
- **compounds | TopBar:** Add TopBar component ([cebcc9b](https://bitbucket.org/myntra/uikit/commits/cebcc9b)), closes [#66](https://bitbucket.org/myntra/uikit/issue/66)
- **elements | Alert:** Add Alert component ([813c449](https://bitbucket.org/myntra/uikit/commits/813c449)), closes [#68](https://bitbucket.org/myntra/uikit/issue/68)
- **elements | Button:** Add 'link' to type of buttons ([b542dc6](https://bitbucket.org/myntra/uikit/commits/b542dc6))
- **elements | Flex:** Add Flex component ([792ff1b](https://bitbucket.org/myntra/uikit/commits/792ff1b)), closes [#78](https://bitbucket.org/myntra/uikit/issue/78)
- **elements | Icon:** Use font-awesome icons ([f834798](https://bitbucket.org/myntra/uikit/commits/f834798)), closes [#96](https://bitbucket.org/myntra/uikit/issue/96)
- **elements | Image:** Add component to lazy load images ([643cf87](https://bitbucket.org/myntra/uikit/commits/643cf87)), closes [#91](https://bitbucket.org/myntra/uikit/issue/91)
- **elements | InputCheckBox, elements | InputRange:** Add title prop to InputCheckBox, Use input styles on InputRange ([7e00421](https://bitbucket.org/myntra/uikit/commits/7e00421)), closes [#81](https://bitbucket.org/myntra/uikit/issue/81)
- **elements | Measure:** Add Measure component ([ab8329b](https://bitbucket.org/myntra/uikit/commits/ab8329b)), closes [#74](https://bitbucket.org/myntra/uikit/issue/74)
- **elements | Modal:** Add popover modal component ([5fa70f9](https://bitbucket.org/myntra/uikit/commits/5fa70f9)), closes [#94](https://bitbucket.org/myntra/uikit/issue/94)
- **elements | Pagiantion:** Add Pagination component ([82afda0](https://bitbucket.org/myntra/uikit/commits/82afda0)), closes [#69](https://bitbucket.org/myntra/uikit/issue/69)
- **elements | Text:** Add text style utility component ([3557b3a](https://bitbucket.org/myntra/uikit/commits/3557b3a)), closes [#89](https://bitbucket.org/myntra/uikit/issue/89)
- **theme | Nuclei:** Make theme selection explicit ([a1dca53](https://bitbucket.org/myntra/uikit/commits/a1dca53))

### Bug Fixes

- **codemod-utils:** Get local identifier for named import ([6911bb3](https://bitbucket.org/myntra/uikit/commits/6911bb3))
- **compounds | Grid:** Ignore falsy children in type check ([5e282b8](https://bitbucket.org/myntra/uikit/commits/5e282b8)), closes [#72](https://bitbucket.org/myntra/uikit/issue/72)
- **compounds | TopBar:** Align with NavBar title ([de6d2fb](https://bitbucket.org/myntra/uikit/commits/de6d2fb)), closes [#77](https://bitbucket.org/myntra/uikit/issue/77) [#70](https://bitbucket.org/myntra/uikit/issue/70)
- **elements | Button:** Link inherits color when rendered in Alert ([99ad28b](https://bitbucket.org/myntra/uikit/commits/99ad28b))
- **elements | Dropdown:** Use Measure to detect size of content and reposition ([470f144](https://bitbucket.org/myntra/uikit/commits/470f144)), closes [#82](https://bitbucket.org/myntra/uikit/issue/82)
- **elements | InputDate:** Prevent presets wrapping to next line when date field width is less ([b6cefee](https://bitbucket.org/myntra/uikit/commits/b6cefee)), closes [#83](https://bitbucket.org/myntra/uikit/issue/83)
- **elements | InputRange:** Make hidden input element readOnly to supress react warning ([3f4acb4](https://bitbucket.org/myntra/uikit/commits/3f4acb4)), closes [#87](https://bitbucket.org/myntra/uikit/issue/87)
- **elements | InputSelect:** Arrow keys selection after droprown is closed. Placeholder text not being as user types. Option selection not working if search field is clicked. Remove option selection on tab. ([31c8eb2](https://bitbucket.org/myntra/uikit/commits/31c8eb2)), closes [#90](https://bitbucket.org/myntra/uikit/issue/90)
- **elements | InputSelect:** Render select element with selected options for browser native field compatibility ([8f11394](https://bitbucket.org/myntra/uikit/commits/8f11394)), closes [#86](https://bitbucket.org/myntra/uikit/issue/86)
- **elements | InputSelect:** Select popper takes full available width ([01b282a](https://bitbucket.org/myntra/uikit/commits/01b282a)), closes [#84](https://bitbucket.org/myntra/uikit/issue/84)
- **stylelint:** Force kebab-case in class selectors ([0626753](https://bitbucket.org/myntra/uikit/commits/0626753))
- **tokens:** Include CSS module build in package ([3a37f9a](https://bitbucket.org/myntra/uikit/commits/3a37f9a))
- **tokens:** Typo in package files filter ([7e200f4](https://bitbucket.org/myntra/uikit/commits/7e200f4))
- Remove dupliate css variables ([23488a3](https://bitbucket.org/myntra/uikit/commits/23488a3))
- Use .module.css for CSS modules ([1a989c8](https://bitbucket.org/myntra/uikit/commits/1a989c8)

<a name="0.2.2"></a>

## [0.2.2](https://bitbucket.org/myntra/uikit/compare/v0.2.1...v0.2.2) (2018-07-25)

### Bug Fixes

- **cli | migrate:** Process .codemod. files in node_modules directory with babel ([2432388](https://bitbucket.org/myntra/uikit/commits/2432388)), closes [#65](https://bitbucket.org/myntra/uikit/issue/65)

<a name="0.2.1"></a>

## [0.2.1](https://bitbucket.org/myntra/uikit/compare/v0.2.0...v0.2.1) (2018-07-24)

### Bug Fixes

- **cli:** Always process codemods with babel ([0515af1](https://bitbucket.org/myntra/uikit/commits/0515af1)), closes [#64](https://bitbucket.org/myntra/uikit/issue/64)

<a name="0.2.0"></a>

# [0.2.0](https://bitbucket.org/myntra/uikit/compare/v0.1.0...v0.2.0) (2018-07-24)

### Features

- **elements | InputCheckBox:** Auto upgrade from unity-uikit ([ba9c2ba](https://bitbucket.org/myntra/uikit/commits/ba9c2ba)), closes [#61](https://bitbucket.org/myntra/uikit/issue/61)
- **elements | InputDate:** Auto upgrade from unity-uikit ([0f3972c](https://bitbucket.org/myntra/uikit/commits/0f3972c)), closes [#62](https://bitbucket.org/myntra/uikit/issue/62)
- **elements | InputNumber:** Auto upgrade from unity-uikit ([03b005e](https://bitbucket.org/myntra/uikit/commits/03b005e)), closes [#59](https://bitbucket.org/myntra/uikit/issue/59)
- **elements | InputSelect:** Auto upgrade from unity-uikit ([58f9945](https://bitbucket.org/myntra/uikit/commits/58f9945)), closes [#63](https://bitbucket.org/myntra/uikit/issue/63)
- **elements | InputText:** Auto upgrade from unity-uikit ([60808e6](https://bitbucket.org/myntra/uikit/commits/60808e6)), closes [#60](https://bitbucket.org/myntra/uikit/issue/60)
- **elements | Portal:** Add Portal component to render content outside of react controlled root element ([3948051](https://bitbucket.org/myntra/uikit/commits/3948051)), closes [#37](https://bitbucket.org/myntra/uikit/issue/37)

<a name="0.1.0"></a>

# [0.1.0](https://bitbucket.org/myntra/uikit/compare/v0.1.0-alpha.2...v0.1.0) (2018-07-10)

### Features

- **codemods:** Find component with prop, apply JSx transformations to selective nodes ([9da6c02](https://bitbucket.org/myntra/uikit/commits/9da6c02)), closes [#58](https://bitbucket.org/myntra/uikit/issue/58)
- **elements | InputSelect:** Add InputSelect component ([be72624](https://bitbucket.org/myntra/uikit/commits/be72624)), closes [#19](https://bitbucket.org/myntra/uikit/issue/19) [#52](https://bitbucket.org/myntra/uikit/issue/52) [#55](https://bitbucket.org/myntra/uikit/issue/55) [#56](https://bitbucket.org/myntra/uikit/issue/56) [#54](https://bitbucket.org/myntra/uikit/issue/54) [#48](https://bitbucket.org/myntra/uikit/issue/48)

<a name="0.1.0-alpha.2"></a>

# [0.1.0-alpha.2](https://bitbucket.org/myntra/uikit/compare/v0.1.0-alpha.1...v0.1.0-alpha.2) (2018-06-26)

### Bug Fixes

- Add eslint no-extraneous import rule ([debfd23](https://bitbucket.org/myntra/uikit/commits/debfd23)), closes [#43](https://bitbucket.org/myntra/uikit/issue/43)
- **docgen:** Hot reload on jsdoc comments changes ([84609da](https://bitbucket.org/myntra/uikit/commits/84609da)), closes [#3](https://bitbucket.org/myntra/uikit/issue/3) [#50](https://bitbucket.org/myntra/uikit/issue/50)
- Correct last 30 days preset ([96c05d9](https://bitbucket.org/myntra/uikit/commits/96c05d9))
- **elements | InputDate:** Handle string dates ([cea3f44](https://bitbucket.org/myntra/uikit/commits/cea3f44)), closes [#53](https://bitbucket.org/myntra/uikit/issue/53)
- **elements | InputDate:** Highlight current field in range selection ([a8546cf](https://bitbucket.org/myntra/uikit/commits/a8546cf)), closes [#55](https://bitbucket.org/myntra/uikit/issue/55)
- **elements | InputMasked:** Use tokens and sync styles with mocks ([610824f](https://bitbucket.org/myntra/uikit/commits/610824f)), closes [#42](https://bitbucket.org/myntra/uikit/issue/42)
- **elements | InputSwitch:** Use relative sizes & add label prop ([a6c0d68](https://bitbucket.org/myntra/uikit/commits/a6c0d68)), closes [#47](https://bitbucket.org/myntra/uikit/issue/47)
- **elements | InputText:** Allow text-like input types ([b0637fa](https://bitbucket.org/myntra/uikit/commits/b0637fa)), closes [#54](https://bitbucket.org/myntra/uikit/issue/54)
- **utils:** Include unknown class names in css modules token mapping ([71f5372](https://bitbucket.org/myntra/uikit/commits/71f5372)), closes [#1](https://bitbucket.org/myntra/uikit/issue/1) [#44](https://bitbucket.org/myntra/uikit/issue/44)

### Features

- **docgen:** Handle computed enum types ([684d6a1](https://bitbucket.org/myntra/uikit/commits/684d6a1))
- **docgen:** Improved support for enum and function type props ([1a5b59c](https://bitbucket.org/myntra/uikit/commits/1a5b59c)), closes [#45](https://bitbucket.org/myntra/uikit/issue/45)
- **elements:** Sync heights of input and button ([f90dcd2](https://bitbucket.org/myntra/uikit/commits/f90dcd2)), closes [#48](https://bitbucket.org/myntra/uikit/issue/48)
- **elements | Dropdown:** Add auto mode to display content in appropriate position ([77d5da7](https://bitbucket.org/myntra/uikit/commits/77d5da7)), closes [#51](https://bitbucket.org/myntra/uikit/issue/51)
- **elements | Icon:** Runtime icon sprite loader ([049241f](https://bitbucket.org/myntra/uikit/commits/049241f)), closes [#49](https://bitbucket.org/myntra/uikit/issue/49)
- **elements | InputCheckBox:** Add InputCheckBox component ([731cfc3](https://bitbucket.org/myntra/uikit/commits/731cfc3)), closes [#41](https://bitbucket.org/myntra/uikit/issue/41)
- **elements | InputDate:** Add InputDate component ([ab3822a](https://bitbucket.org/myntra/uikit/commits/ab3822a)), closes [#32](https://bitbucket.org/myntra/uikit/issue/32)
- **elements | InputNumber:** Add InputNumber component ([975ee05](https://bitbucket.org/myntra/uikit/commits/975ee05)), closes [#40](https://bitbucket.org/myntra/uikit/issue/40)
- **elements | InputRange:** Add InputRange component ([d2fcf90](https://bitbucket.org/myntra/uikit/commits/d2fcf90)), closes [#26](https://bitbucket.org/myntra/uikit/issue/26)
- **elements | InputRange:** Use animation frame to smoothen the drag ([f2e00cf](https://bitbucket.org/myntra/uikit/commits/f2e00cf)), closes [#46](https://bitbucket.org/myntra/uikit/issue/46)
- Improve JSDoc support in component documenter ([830902e](https://bitbucket.org/myntra/uikit/commits/830902e))
- **elements | InputText:** Add InputText component ([2d53573](https://bitbucket.org/myntra/uikit/commits/2d53573)), closes [#22](https://bitbucket.org/myntra/uikit/issue/22)
- Add chevron icons ([86dc60d](https://bitbucket.org/myntra/uikit/commits/86dc60d))
- **elements | InputTextarea:** Add InputTextarea component ([c8d8f6c](https://bitbucket.org/myntra/uikit/commits/c8d8f6c)), closes [#33](https://bitbucket.org/myntra/uikit/issue/33)
- **InputMasked:** Forward unhandled props ([a4cf119](https://bitbucket.org/myntra/uikit/commits/a4cf119))
- **tokens:** Add z-index ([3867f7e](https://bitbucket.org/myntra/uikit/commits/3867f7e))
- Add next and prev jumpers ([c503ac6](https://bitbucket.org/myntra/uikit/commits/c503ac6))
- Always have start date in view ([9773bbc](https://bitbucket.org/myntra/uikit/commits/9773bbc))
- Dropdown use onFocus and onBlur on unknown trigger components ([6b27677](https://bitbucket.org/myntra/uikit/commits/6b27677))
- Use date-fns to parse/format date ([6d8bfff](https://bitbucket.org/myntra/uikit/commits/6d8bfff))

<a name="0.1.0-alpha.1"></a>

# [0.1.0-alpha.1](https://bitbucket.org/myntra/uikit/compare/v0.1.0-alpha.0...v0.1.0-alpha.1) (2018-06-10)

### Features

- Set sideEffects to false for webpack ([7a5d095](https://bitbucket.org/myntra/uikit/commits/7a5d095))
- **cli:** Add lint, codemods and migrate commands ([2e8ed4e](https://bitbucket.org/myntra/uikit/commits/2e8ed4e)), closes [#39](https://bitbucket.org/myntra/uikit/issue/39)
- **codemod:** High level utility functions to apply AST transformations ([ba734a7](https://bitbucket.org/myntra/uikit/commits/ba734a7)), closes [#36](https://bitbucket.org/myntra/uikit/issue/36)
- **compounds|Grid:** Flexbox based layouting component ([94b8ad8](https://bitbucket.org/myntra/uikit/commits/94b8ad8)), closes [#17](https://bitbucket.org/myntra/uikit/issue/17)
- **elements|Dropdown:** Add Dropdown component ([4b4482c](https://bitbucket.org/myntra/uikit/commits/4b4482c)), closes [#21](https://bitbucket.org/myntra/uikit/issue/21)
- **elements|InputMasked:** Add InputMasked component ([172dd92](https://bitbucket.org/myntra/uikit/commits/172dd92)), closes [#18](https://bitbucket.org/myntra/uikit/issue/18)
- **elements|InputSwitch:** Add InputSwitch component ([ceb8f11](https://bitbucket.org/myntra/uikit/commits/ceb8f11)), closes [#25](https://bitbucket.org/myntra/uikit/issue/25) [#2121226](https://bitbucket.org/myntra/uikit/issue/2121226) [#2121230](https://bitbucket.org/myntra/uikit/issue/2121230) [#2121198](https://bitbucket.org/myntra/uikit/issue/2121198) [#2121247](https://bitbucket.org/myntra/uikit/issue/2121247) [#2121187](https://bitbucket.org/myntra/uikit/issue/2121187) [#2121193](https://bitbucket.org/myntra/uikit/issue/2121193) [#2121196](https://bitbucket.org/myntra/uikit/issue/2121196) [#2125428](https://bitbucket.org/myntra/uikit/issue/2125428)
- **elements|Intersection:** Component to use IntersectionObserver API in a declarative way ([ffa8f97](https://bitbucket.org/myntra/uikit/commits/ffa8f97)), closes [#23](https://bitbucket.org/myntra/uikit/issue/23)
- **utils:** Export isShallowEqual method ([c9fa9fd](https://bitbucket.org/myntra/uikit/commits/c9fa9fd))
- **utils:** Memoize helper to save computations ([32ef7ed](https://bitbucket.org/myntra/uikit/commits/32ef7ed))

<a name="0.1.0-alpha.0"></a>

# 0.1.0-alpha.0 (2018-05-10)

### Bug Fixes

- **eslint:** no trailing slashes ([bf328e4](https://bitbucket.org/myntra/uikit/commits/bf328e4))
- add branch name in router prefix ([0732ada](https://bitbucket.org/myntra/uikit/commits/0732ada))
- Add branch prefix to links ([ce441cb](https://bitbucket.org/myntra/uikit/commits/ce441cb))
- remove unused weak package ([bb311e0](https://bitbucket.org/myntra/uikit/commits/bb311e0))
- use CURRENT_BRANCH for adding prefix on build ([b95c3a5](https://bitbucket.org/myntra/uikit/commits/b95c3a5))
- **internals|Markdown:** Replace undefined CSS variables with correct ones ([9aedfee](https://bitbucket.org/myntra/uikit/commits/9aedfee))

### Features

- accept dest in docgen plugin ([4e7801b](https://bitbucket.org/myntra/uikit/commits/4e7801b))
- add contributing guidelines ([b56a308](https://bitbucket.org/myntra/uikit/commits/b56a308)), closes [#1](https://bitbucket.org/myntra/uikit/issue/1)
- add static routes after build ([224ee22](https://bitbucket.org/myntra/uikit/commits/224ee22))
- components to display jsdoc metadata ([cc7bac5](https://bitbucket.org/myntra/uikit/commits/cc7bac5))
- configure testing and docs ([f67a1a4](https://bitbucket.org/myntra/uikit/commits/f67a1a4))
- generate jsdoc meta data during webpack build ([bb20276](https://bitbucket.org/myntra/uikit/commits/bb20276))
- introduce javascript coding style standard for myntra ([28bbcc9](https://bitbucket.org/myntra/uikit/commits/28bbcc9))
- **docs:** Add source code URL and collocate examples in component directory ([f49eb0d](https://bitbucket.org/myntra/uikit/commits/f49eb0d))
- Promised component to delaratively render promises ([e5948a6](https://bitbucket.org/myntra/uikit/commits/e5948a6))
- **elements|ClickAway:** handles outside actions for target element ([d6237f0](https://bitbucket.org/myntra/uikit/commits/d6237f0))
- **utils:** Add a memoized extra props getter ([c43ce01](https://bitbucket.org/myntra/uikit/commits/c43ce01))
