# UIKit

This library contains components used in scm apps.

## Usage

Usage docs are available at [uikit.myntra.com](http://uikit.myntra.com).

## Roadmap

| Stage    | Timeline      | Status      |
| -------- | ------------- | ----------- |
| 1 (Form) | May - Mid Jun | In Progress |
| 2 (Grid) | Mid Jun - Jul | Planning    |

### Stage 1

Forms are key parts of the applications, we develop in SCM world. The primary objective of UIKit is to provide easy to use, composeable and powerful building blocks for the forms.

Key considerations:

* **Minimal API:** A component should accept as few props as possible while providing maximum utility.
* **Minimal required API:** A component should try to have zero required props.
* **Reusability:** The components in UIKit are created to be reused. It can be used in many possible conditions, each components should be self-contained and it should not leak out any style or make any assumptions about the surrounding environment.
* **Composable:** Composition is the primary way of re-use. A component should be composable and should not require any configuration.
* **Meaningful Default:** All props should have default values which cover most common scenarios.

#### Stage 1 Component Catalog

* [ ] Button
* [ ] Form
  * [ ] InputText
  * [ ] InputSelect
  * [ ] InputCheckbox
  * [ ] InputSwitch
  * [ ] InputTypeahead
  * [ ] InputDate
  * [ ] InputTime
  * [ ] InputDateTime
  * [ ] InputMasked
  * [ ] InputRange (Slider)
  * [ ] InputPlaceholder
  * [ ] Disable
* [ ] Group
  * [ ] Button
  * [ ] Radio
  * [ ] Checkbox
  * [ ] Switch

### Stage 2

The grid or table is second mostly used component. Table is a very complex component, providing one API for all is very dificult. But a low level verbose API to hadle every possible usage case is comparatively easier. Then the low level table component can be composed to create pattern components with minimal API.

#### Stage 2 Component Catalog

* [ ] Table

### Framework

* [ ] Gather better insights from component props.
* [ ] Improve ComponentDocumenter to provide better fiddling experience. e.g. for enum props show select field.
* [ ] Generate typescript typings for component.
* [ ] Gather component usage metric.
