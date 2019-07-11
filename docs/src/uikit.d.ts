// -----------[[Accordion]]--------------- //
/**
 * A component to render accordion effect.
 *
 * @since 0.3.0
 * @status REVIEWING
 * @category functional
 * @see http://uikit.myntra.com/components/accordion
 */
declare function Accordion(props: Accordion.Props): JSX.Element
declare namespace Accordion {
  interface Props extends BaseProps {
    /**
     * Sets the expanded item for the accordion.
     */
    active?: number
    /**
     * The callback function called when an item is expanded.
     *
     * @param active - Next expanded item.
     */
    onChange?(active: number): void
  }
  // -----------[[Item]]--------------- //
  /**
   * @since 0.3.0
   * @status REVIEWING
   * @see http://uikit.myntra.com/components/accordion#AccordionItem
   */
  declare function Item(props: Item.Props): JSX.Element
  declare namespace Item {
    interface Props extends BaseProps {
      /**
       * The title or always visible part of the accordion item.
       */
      title: ReactElement | string
    }
  }
}

// -----------[[Alert]]--------------- //
/**
 * Show a message intended to draw the user's attention.
 *
 * @since 0.3.0
 * @status READY
 * @category basic
 */
declare function Alert(props: Alert.Props): JSX.Element
declare namespace Alert {
  interface Props extends BaseProps {
    /**
     * The visual style to convey purpose of the alert.
     */
    type: 'primary' | 'error' | 'warning' | 'success'
    /**
     * The handler to call when the alert box is dismissed.
     */
    onClose?: () => void
    /**
     * Displays a alert box with filled background.
     */
    solid?: boolean
    /**
     * The message/body of the alert box.
     */
    children: string | JSX.Element
  }
}

// -----------[[Avatar]]--------------- //
/**
 * Displays user icon.
 *
 * @since 0.3.1
 * @status REVIEWING
 * @category basic
 */
declare function Avatar(props: Avatar.Props): JSX.Element
declare namespace Avatar {
  interface Props extends BaseProps {
    /** The name of the person/object.  */
    name: string
    /** The size of the avatar. */
    size?: 'small' | 'medium' | 'large'
  }
}

// -----------[[Badge]]--------------- //
/**
 * Displays an information pill/badge.
 *
 * @since 0.8.0
 * @status REVIEWING
 * @category basic
 */
declare function Badge(props: Badge.Props): JSX.Element
declare namespace Badge {
  interface Props extends BaseProps {
    /** The visual style to convey purpose of the badge. */
    type?: 'primary' | 'success' | 'warning' | 'error'
    /** The label text of the badge. */
    children: string
  }
}

// -----------[[BreadCrumb]]--------------- //
/**
 * The BreadCrumb component.
 *
 * @since 0.3.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/bread-crumb
 */
declare function BreadCrumb(props: BreadCrumb.Props): JSX.Element
declare namespace BreadCrumb {
  interface Props extends BaseProps {}
  // -----------[[Item]]--------------- //
  /**
   * A breadcrumb item
   * @since 0.3.0
   * @status READY
   * @category basic
   * @see http://uikit.myntra.com/components/bread-crum#BreadCrumbIcon
   */
  declare function Item(props: Item.Props): JSX.Element
  declare namespace Item {
    interface Props extends BaseProps {}
  }
}

// -----------[[Button]]--------------- //
/**
 * Buttons provide click-able actions.
 *
 * @since 0.0.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/button
 */
declare function Button(props: Button.Props): JSX.Element
declare namespace Button {
  interface Props extends BaseProps {
    /** The visual style to convey purpose of the button. */
    type: 'primary' | 'secondary' | 'link'
    /** The label text of the button. */
    children?: string
    /** The handler to call when the button is clicked. */
    onClick?(event: MouseEvent): void
    /** The name of the icon (displayed on left side of content). */
    icon?: IconName
    /** The name of the icon (displayed on right side of content). */
    secondaryIcon?: IconName
    /** Disables the button (changes visual style and ignores button interactions). */
    disabled?: boolean
    /** Changes visual style to show progress. */
    loading?: boolean
    /** Uses current text color (useful for link buttons). */
    inheritTextColor?: boolean
    /** The 'type' attribute for the button element (as 'type' is used for defining visual type) */
    htmlType?: 'submit' | 'reset' | 'button'
    /** The URL to navigate to when the button is clicked (uses client side router). */
    to?: string | object
    /** The URL to navigate to when the button is clicked (uses browser anchor tag). */
    href?: string
  }
  type IconName = Icon.IconName
}

// -----------[[ClickAway]]--------------- //
/**
 * Watch for clicks outside the target element.
 *
 * @since 0.0.0
 * @status REVIEWING
 * @category advanced
 */
declare function ClickAway(props: ClickAway.Props): JSX.Element
declare namespace ClickAway {
  interface Props {
    /**
     * Reference to the container which requires click away functionality.
     */
    target: RefObject<HTMLElement>
    /**
     * The handler to call when click-away is triggered.
     */
    onClickAway: (event: MouseEvent) => void
    /**
     * Browser event which triggers click-away.
     */
    domEventName?: 'click' | 'mousedown' | 'mouseup'
  }
}

// -----------[[Dropdown]]--------------- //
/**
 * A bare-bones dropdown implementation. It requires a trigger component or text.
 *
 * @since 0.0.0
 * @status READY
 * @category advanced
 * @see http://uikit.myntra.com/components/dropdown
 */
declare function Dropdown(props: Dropdown.Props): JSX.Element
declare namespace Dropdown {
  interface Props extends BaseProps {
    renderTrigger(props: {
      onMouseLeave?(event: MouseEvent | React.MouseEvent): void
      onMouseEnter?(event: MouseEvent | React.MouseEvent): void
      onClick?(event: MouseEvent | React.MouseEvent): void
      onFocus?(event: FocusEvent | React.FocusEvent): void
      onBlur?(event: FocusEvent | React.FocusEvent): void
    }): string | JSX.Element
    /**
     * Trigger to open dropdown.
     *
     * @deprecated - Use [renderTrigger](#Dropdown-renderTrigger)
     */
    trigger?: string | JSX.Element
    /** Dropdown state */
    isOpen: boolean
    /** Attach child to specific component/element */
    container?: boolean | string | HTMLElement
    /**
     * Event fired when dropdown drawer is displayed
     * @function
     */
    onOpen?(): void
    /**
     * Event fired when dropdown drawer is closed
     */
    onclose?(): void
    /** Open dropdown drawer above the trigger. */
    up?: boolean
    /** Align dropdown drawer with the right edge of the trigger. */
    right?: boolean
    /** Align dropdown drawer with the left edge of the trigger. */
    left?: boolean
    /** Align dropdown drawer below the trigger. */
    down?: boolean
    /**
     * Position dropdown drawer in best suited place.
     */
    auto?: boolean
    /**
     * Event to trigger dropdown
     */
    triggerOn?: 'hover' | 'click' | 'focus'
  }
  type MeasureData = Measure.MeasureData
}

// -----------[[ErrorBoundary]]--------------- //
/**
 * Contains errors in child components.
 *
 * @since 0.0.0
 * @status REVIEWING
 * @category basic
 */
declare function ErrorBoundary(props: ErrorBoundary.Props): JSX.Element
declare namespace ErrorBoundary {
  interface Props extends BaseProps {
    /**
     * Render fallback content in case of error.
     */
    renderFallback?(props: { hasError: boolean; error: Error; info: string }): any
  }
}

// -----------[[Field]]--------------- //
/**
 * A wrapper component to add title, label and description to form fields.
 *
 * @since 0.6.0
 * @status REVIEWING
 */
declare function Field(props: Field.Props): JSX.Element
declare namespace Field {
  interface Props extends BaseProps {
    /**
     * The name of the value.
     */
    title: ReactNode
    /** A small description to set the context of the input field. */
    description?: ReactNode
    /**
     * Display an error message instead of deccription
     */
    error?: ReactNode
    /**
     * Visually conveys that the field is required.
     */
    required?: boolean
  }
}

// -----------[[Flex]]--------------- //
/**
 * Flex is a wrapper for inlining flex based styles in JSX.
 *
 * __NOTE:__ Flex is added to UIKit for backward compatibility.
 * Prefer using [Grid](../component-compounds/Grid) component for creating layouts.
 * Soon, we would either removing it or providing a simpler API with lesser props.
 *
 * @since 0.3.0
 * @status DEPRECATED
 */
declare function Flex(props: Flex.Props): JSX.Element
declare namespace Flex {
  interface Props extends BaseProps {
    className: string
    container: boolean
    inline: boolean
    column: boolean
    start: boolean
    center: boolean
    end: boolean
    around: boolean
    between: boolean
    top: boolean
    middle: boolean
    bottom: boolean
    stretch: boolean
    baseline: boolean
    acStart: boolean
    acCenter: boolean
    acEnd: boolean
    acAround: boolean
    acBetween: boolean
    acStretch: boolean
    wrap: boolean
    noWrap: boolean
    wrapReverse: boolean
    reverse: boolean
    asStart: boolean
    asEnd: boolean
    asCenter: boolean
    asBaseline: boolean
    asStretch: boolean
    order: number
    grow: number
    shrink: number
    basis: string | number
    equal: boolean
  }
}

// -----------[[Form]]--------------- //
/**
 * The Form component
 *
 * @since 0.3.0
 * @status REVIEWING
 */
declare function Form(props: Form.Props): JSX.Element
declare namespace Form {
  interface Props extends BaseProps {
    /**
     * A heading/label for the form.
     */
    title?: ReactNode
    /**
     * Default width of a field in the form.
     */
    defaultFieldSize?: ColumnSize
    /**
     * The callback function called when form is submitted.
     *
     * @param event - Form submission event.
     */
    onSubmit?(event: FormEvent): void
  }

  interface FormFieldProps extends Pick<GridColumnProps, Exclude<keyof GridColumnProps, 'className' | 'children'>> {}
  type ColumnSize = Grid.Column.ColumnSize
  type GridColumnProps = Grid.Column.Props
  type InputCheckboxProps = InputCheckbox.Props
  type InputDateProps = InputDate.Props
  type InputMaskedProps = InputMasked.Props
  type InputNumberProps = InputNumber.Props
  type InputS3FileProps = InputS3File.Props
  type InputSelectProps = InputSelect.Props
  type InputTextProps = InputText.Props
  type InputTextAreaProps = InputTextArea.Props
  // -----------[[Action]]--------------- //
  /**
   * @since 0.3.0
   * @status REVIEWING
   */
  declare function Action(props: Action.Props): JSX.Element
  declare namespace Action {
    interface Props extends ButtonProps {}
    type ButtonProps = Button.Props
  }
}

// -----------[[Grid]]--------------- //
/**
 * It is a flexbox based layouting component.
 *
 * @since 0.0.0
 * @status REVIEWING
 */
declare function Grid(props: Grid.Props): JSX.Element
declare namespace Grid {
  interface Props extends BaseProps {
    gap?: 'small' | 'base' | 'large' | 'xx-small' | 'x-small' | 'none'
    gapless?: boolean
    centered?: boolean
    hcentered?: boolean
    vcentered?: boolean
    multiline?: boolean
  }
  // -----------[[Column]]--------------- //
  /**
   * Sub component of `<Grid>`.
   *
   * @since 0.0.0
   * @status REVIEWING
   */
  declare function Column(props: Column.Props): JSX.Element
  declare namespace Column {
    type ColumnSize =
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 7
      | 8
      | 9
      | 10
      | 11
      | 12
      | 'full'
      | 'three-quarters'
      | 'two-thirds'
      | 'half'
      | 'one-third'
      | 'one-quarter'
      | 'one-fifth'
      | 'two-fifth'
      | 'three-fifth'
      | 'four-fifth'

    interface Props extends BaseProps {
      /** Take only required space */
      narrow?: boolean
      /** Width */
      size?: ColumnSize
      /** Leaves empty space on left */
      offset?: ColumnSize
      /** Narrow on mobile screen */
      narrowOnMobile?: boolean
      /** Width on mobile screen */
      sizeOnMobile?: ColumnSize
      /** Offset on mobiles screen */
      offsetOnMobile?: ColumnSize
      /** Narrow on tablet screen */
      narrowOnTablet?: boolean
      /** Width on tablet screen */
      sizeOnTablet?: ColumnSize
      /** Offset on tablet screen */
      offsetOnTablet?: ColumnSize
      /** Narrow on touch enabled devices */
      narrowOnTouch?: boolean
      /** Width on touch enabled devices */
      sizeOnTouch?: ColumnSize
      /** Offset on touch enabled devices */
      offsetOnTouch?: ColumnSize
      /** Narrow on desktop screen */
      narrowOnDesktop?: boolean
      /** Width on desktop screen */
      sizeOnDesktop?: ColumnSize
      /** Offset on desktop screen */
      offsetOnDesktop?: ColumnSize
    }
  }
}

// -----------[[Group]]--------------- //
/**
 * A group component to combine multiple group-able components.
 *
 * @since 0.11.0
 * @status REVIEWING
 * @category composition
 * @see http://uikit.myntra.com/components/group
 */
declare function Group(props: Group.Props): JSX.Element
declare namespace Group {
  interface Props extends BaseProps {}
}

// -----------[[Icon]]--------------- //
/**
 * Displays a glyph using an SVG sprite-sheet.
 *
 * @since 0.0.0
 * @status REVIEWING
 * @category basic
 */
declare function Icon(props: Icon.Props): JSX.Element
declare namespace Icon {
  type IconName = IconNameGlobal[keyof IconNameGlobal]

  interface Props extends BaseProps {
    /** [FontAwesome](https://fontawesome.com/icons?d=gallery) icon name */
    name: IconName
    /** Accessibility text for screen readers */
    title?: string
    spin?: boolean
  }
}

// -----------[[Image]]--------------- //
/**
 * A component to lazy load images.
 *
 * @since 0.3.0
 * @status REVIEWING
 * @category basic
 * @see http://uikit.myntra.com/components/image
 */
declare function Image(props: Image.Props): JSX.Element
declare namespace Image {
  interface Props extends BaseProps {
    /** Image source file/link. */
    src: string
    /** Image height */
    height: number | string
    /** Image width */
    width: number | string
    /**
     * Lazy loading image
     * @private
     * @deprecated
     */
    lazyLoad: boolean
    /** Lazy load image */
    lazy: boolean
  }
}

// -----------[[InputCheckbox]]--------------- //
/**
 * A custom styled checkbox input.
 *
 * @since 0.0.0
 * @status READY
 * @category input
 * @see http://uikit.myntra.com/components/input-checkbox
 */
declare function InputCheckbox(props: InputCheckbox.Props): JSX.Element
declare namespace InputCheckbox {
  interface Props extends BaseProps {
    /**
     * The state of the checkbox.
     *
     * > **Why `value` instead of `checked`?**
     * >
     * > All __InputXxx__ components accept `value` as the controlled input value and `onChange` event to
     * propagate the change back to parent component. For consistency, we use `value` prop instead `checked`.
     */
    value?: boolean
    /**
     * The handler to call when the value changes.
     */
    onChange?(value: boolean): void
    /**
     * Displays a disabled checkbox field.
     */
    disabled?: boolean
    /**
     * Displays a readonly checkbox field.
     */
    readOnly?: boolean
    /**
     * Checkbox value attribute.
     *
     * > **Why `htmlValue` instead of `value`?**
     * >
     * > As per [our convention](#input-checkbox-value), we use `value` prop for controlled input value so
     * an alternate prop (`htmlValue`) is accepted to set native `value` attribute.
     */
    htmlValue: string
    /**
     * A label text for the checkbox.
     */
    title?: string
    /**
     * Custom label text renderer.
     */
    renderTitle?(): JSX.Element
  }
}

// -----------[[InputDate]]--------------- //
/**
 * A component to read date and date ranges.
 *
 * @since 0.0.0
 * @status READY
 * @category input
 * @see http://uikit.myntra.com/components/input-date
 */
declare function InputDate(props: InputDate.Props): JSX.Element
declare namespace InputDate {
  interface Props extends InputDatePickerProps {
    /**
     * The date format to format value for displaying.
     */
    displayFormat?: string
  }
  // -----------[[Picker]]--------------- //
  /**
   * @since 0.0.0
   * @status REVIEWING
   * @category input
   * @see http://uikit.myntra.com/components/input-date#inputdatepicker
   */
  declare function Picker(props: Picker.Props): JSX.Element
  declare namespace Picker {
    interface Props<DateLike = string | Date, DateLikeOrDateRangeLike = string | Date | DateRange | StringDateRange>
      extends BaseProps {
      /**
       * Current value of the text input field.
       */
      value?: DateLikeOrDateRangeLike
      /**
       * The callback function called when the value changes.
       */
      onChange?(value: DateLikeOrDateRangeLike): void
      /**
       * The date format to parse and format value when using string dates.
       */
      format?: string
      /**
       * Set the picker in range selection mode. The value would have two dates (`from` and `to`).
       */
      range?: boolean
      /**
       * Custom renderer to display day in the picker dropdown.
       */
      renderDate?(props: { date: Date; children: ReactNode }): ReactNode
      monthsToDisplay?: number
      disabledRanges?: Array<DateRange | StringDateRange>
      min?: DateLike
      max?: DateLike
      presets?: Array<
        | {
            range: false
            label: string
            value(): Date
          }
        | {
            range: true
            label: string
            value(): {
              from: Date
              to: Date
            }
          }
      >
    }
    // -----------[[MonthGroup]]--------------- //
    /**
     *
     */
    declare function MonthGroup(props: MonthGroup.Props): JSX.Element
    declare namespace MonthGroup {}

    // -----------[[Month]]--------------- //
    /**
     *
     */
    declare function Month(props: Month.Props): JSX.Element
    declare namespace Month {}

    // -----------[[Day]]--------------- //
    /**
     *
     */
    declare function Day(props: Day.Props): JSX.Element
    declare namespace Day {}
  }
}

// -----------[[InputMasked]]--------------- //
/**
 * Input component that provides a template for phone, credit card, etc.
 *
 * @since 0.0.0
 * @status REVIEWING
 */
declare function InputMasked(props: InputMasked.Props): JSX.Element
declare namespace InputMasked {
  type Mask = _Mask

  interface Props extends BaseProps {
    /**
     * The required pattern for the input field.
     */
    pattern: string
    /**
     * Current value of the masked input field.
     */
    value?: string
    /**
     * The callback function to call when the value changes.
     */
    onChange?(value: string): void
    /**
     * The placeholder text for input field.
     */
    placeholder?: string
    /**
     * Include mask characters in the value.
     */
    includeMaskChars?: boolean
    /**
     * Define custom masks.
     */
    masks?: Record<string, Mask>
    /**
     * Disables all interaction on the select field.
     */
    disabled?: boolean
    /**
     * Allows only previewing selected options.
     */
    readOnly?: boolean
    /**
     *  Makes select field required.
     */
    required?: boolean
  }
}

// -----------[[InputMonth]]--------------- //
/**
 * A component to input month.
 *
 * @since 0.7.0
 * @status REVIEWING
 * @category input
 * @see http://uikit.myntra.com/components/input-month
 */
declare function InputMonth(props: InputMonth.Props): JSX.Element
declare namespace InputMonth {
  interface InputMonthProps extends BaseProps, Pick<InputMonthPickerProps, 'value' | 'onChange' | 'highlight'> {}
  // -----------[[Picker]]--------------- //
  /**
   * An embeddable month/year selection component.
   *
   * @since 0.7.0
   * @status REVIEWING
   * @category input
   * @see http://uikit.myntra.com/components/input-month#inputmonthpicker
   */
  declare function Picker(props: Picker.Props): JSX.Element
  declare namespace Picker {
    interface InputMonthPickerProps extends BaseProps {
      /**
       * Current value of the input field.
       */
      value?: {
        month: number
        year: number
      }
      /**
       * The callback function to call when the value changes.
       */
      onChange?(value: { month: number | null; year: number | null }): void
      /**
       * Customize appearance of values in picker dropdown.
       * @param value - Month or Year to highlight.
       */
      highlight?(value: {
        month: number | null
        year: number | null
      }): 'info' | 'danger' | 'warning' | 'success' | 'disabled' | null
      /**
       * Custom render function to override contents of month values in the picker dropdown.
       */
      renderMonth?(props: { month: string; index: number }): ReactNode
    }
    // -----------[[Month]]--------------- //
    /**
     *
     */
    declare function Month(props: Month.Props): JSX.Element
    declare namespace Month {}

    // -----------[[Year]]--------------- //
    /**
     *
     */
    declare function Year(props: Year.Props): JSX.Element
    declare namespace Year {}
  }
}

// -----------[[InputNumber]]--------------- //
/**
 * An input component to read numbers. It is like `<input type="number">` but
 * value is a JavaScript number.
 *
 * @since 0.0.0
 * @status REVIEWING
 * @category input
 * @see http://uikit.myntra.com/components/input-number
 */
declare function InputNumber(props: InputNumber.Props): JSX.Element
declare namespace InputNumber {
  interface Props extends BaseProps {
    /** @private */
    className?: string
    /** Displays a disabled number field */
    disabled?: boolean
    /** Current value of the number input field. */
    value?: number
    /** The handler to call when the value changes. */
    onChange?(value: number): void
  }
}

// -----------[[InputRadio]]--------------- //
/**
 * A component to render radio inputs.
 * @since 0.6.0
 * @status REVIEWING
 * @category input
 * @see http://uikit.myntra.com/components/input-radio
 */
declare function InputRadio(props: InputRadio.Props): JSX.Element
declare namespace InputRadio {
  interface InputRadioProps extends BaseProps {
    /**
     * A list of options for the radio element.
     */
    options: Array<{
      value: string
      title: string
    }>
    /**
     * Selected option value.
     */
    value?: string
    /**
     * The callback function to call when the value changes.
     */
    onChange?(value: string): void
    /**
     * A render function to customize the appearance of each radio item.
     */
    renderOption?(option: { value: string; title: string }): ReactNode
    /**
     * Disables all interaction on the radio element.
     */
    disabled?: boolean
  }
}

// -----------[[InputS3File]]--------------- //
/**
 * A file input component that handles client side S3 uploads.
 *
 * __NOTE:__ This component depends on spectrum server to process uploads.
 *
 * @since 0.11.0
 * @status READY
 * @category input
 * @see http://uikit.myntra.com/components/input-s3-file
 */
declare function InputS3File(props: InputS3File.Props): JSX.Element
declare namespace InputS3File {
  interface Props extends BaseProps {
    /**
     * Auto start upload on file selection/change.
     * @since v0.11.0
     */
    autoStartUpload?: boolean
    /**
     * Clear value on successful upload.
     * @since v0.11.0
     */
    clearOnSuccess?: boolean
    /**
     *
     */
    placeholder?: string
    /**
     *
     */
    apiRoot: string
    /**
     * The handler called when file is uploaded successfully.
     */
    onSuccess?(payload: { name: string; url: string }): void
    /**
     * The handler called if any error occurs.
     */
    onError?(error: Error): void
    /**
     * @deprecated - It is no more required.
     */
    inputWidth?: string | number
    /**
     * @deprecated - Use [autoStartUpload](#InputS3File-autoStartUpload) instead.
     */
    autostart?: boolean
    /**
     * @deprecated - Use [clearOnSuccess](#InputS3File-clearOnSuccess) instead.
     */
    autoclear?: boolean
  }

  interface InputS3FileState {
    isUploading: boolean
    uploadProgress: number
    filename: string | null
    file: string | null
    error?: string | null
  }
}

// -----------[[InputSelect]]--------------- //
/**
 * A custom implementation of select input element to support option list customization.
 *
 * @since 0.0.0
 * @status READY
 * @category input
 * @see http://uikit.myntra.com/components/input-select
 */
declare function InputSelect(props: InputSelect.Props): JSX.Element
declare namespace InputSelect {
  interface Props<Value = any, Option = any> extends BaseProps {
    /**
     * A list of options for the select element.
     */
    options: Option[]
    /**
     * Selected option value (array of option values for [multiple](#InputSelect-multiple) select element).
     */
    value: Value
    /**
     * The callback function to call when the value changes.
     */
    onChange?(value: Value): void
    /**
     * The handler to call when the user types in search field.
     */
    onSearch?(text: string): void
    /**
     * A render function to display option in options dropdown.
     * @param option - One of the [options](#InputSelect-options) list.
     */
    renderOption?(option: Option): JSX.Element
    /**
     * A render function to display empty state when no options are available.
     * @since 0.11.0
     */
    renderEmptyState?(): JSX.Element
    /**
     * A placeholder message.
     */
    placeholder?: string
    /**
     * Allows multiple option selection.
     */
    multiple?: boolean
    /**
     * Disables all interaction on the select field.
     */
    disabled?: boolean
    /**
     * Allows only previewing selected options.
     */
    readOnly?: boolean
    /**
     *  Makes select field required.
     */
    required?: boolean
    /**
     * Displays a spinner while options are being loaded.
     */
    isLoading?: boolean
    /**
     * Displays a search box for filtering select options.
     */
    searchable?: boolean
    /**
     * List of key names in [option](#InputSelect-options) object use to search select options.
     */
    searchableKeys?: string[]
    /**
     * Name of the property to use as display value (or label) of option.
     */
    labelKey?: string
    /**
     * Name of the property to use as actual value (or label) of option.
     */
    valueKey?: string
    /**
     * A function to filter options with custom filtering logic.
     */
    filterOptions?(option: Option): boolean
    /**
     * @deprecated - Use [renderEmptyState](#InputSelect-renderEmptyState) instead.
     */
    noResultsPlaceholder?: string | JSX.Element
  }
}

// -----------[[InputText]]--------------- //
/**
 * A component to input text-like data (email, tel, text, password and url).
 *
 * @since 0.0.0
 * @status READY
 * @category input
 * @see http://uikit.myntra.com/components/input-text
 */
declare function InputText(props: InputText.Props): JSX.Element
declare namespace InputText {
  interface Props extends BaseProps {
    /** Sets the text format for the field. */
    type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search'
    /** Current value of the text input field. */
    value?: string
    /** The handler to call when the value changes. */
    onChange?(value: string): void
    /** Displays a disabled text field */
    disabled?: boolean
    /** Displays a readonly text field */
    readOnly?: boolean
  }
}

// -----------[[InputTextArea]]--------------- //
/**
 * A large text input component.
 *
 * @since 0.0.0
 * @status READY
 * @category input
 * @see http://uikit.myntra.com/components/input-text-area
 */
declare function InputTextArea(props: InputTextArea.Props): JSX.Element
declare namespace InputTextArea {
  interface Props extends BaseProps {
    /** @private */
    className?: string
    /** Current value of the text area input field. */
    value?: string
    /** The handler to call when the value changes. */
    onChange?(value: string): void
    /** Displays a disabled text area field */
    disabled?: boolean
    /** Number of Rows*/
    rows?: number
    /** Disable resize and hide resize handle */
    noResize?: boolean
    /** Placeholder */
    placeholder?: string
  }
}

// -----------[[JobTracker]]--------------- //
/**
 * The JobTracker component.
 * @since 0.6.0
 * @status REVIEWING
 * @category widget
 * @see http://uikit.myntra.com/components/job-tracker
 */
declare function JobTracker(props: JobTracker.Props): JSX.Element
declare namespace JobTracker {
  type Job = Pick<JobTrackerItemProps, Exclude<keyof JobTrackerItemProps, 'className' | 'children' | 'apiRoot'>>

  interface Props extends BaseProps {
    /**
     * A list of job items.
     */
    data?: Job[]
    /**
     * API Root for downloading job files.
     */
    apiRoot: string
  }
}

// -----------[[List]]--------------- //
/**
 * An accessible list of item.
 *
 * @since 0.11.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/list
 */
declare function List(props: List.Props): JSX.Element
declare namespace List {
  interface Props<T = any> extends BaseProps {
    /**
     * An array of items to render in the list.
     */
    items: T[]
    /**
     * Renders markup for displaying a list item.
     */
    children(props: { index: number; id: string | number | T; item: T }): void
    /**
     * The selected value in the list.
     */
    value?: T | T[]
    /**
     * The callback fired when a list item is selected or unselected.
     */
    onChange?(value: T | T[]): void
    /**
     * A getter function to get unique ID of a list item.
     */
    idForItem?(item: T): T | number | string
    /**
     * Checks if the item is disabled or not.
     */
    isItemDisabled?(item: T): boolean
    /**
     * Sets selection mode to multiple.
     */
    multiple?: boolean
    /**
     * Use [VirtualList](../virtual-list) component to render the list.
     */
    virtualized?: boolean
  }
}

// -----------[[Loader]]--------------- //
/**
 * A component to display infinite loading progress.
 *
 * @since 0.5.0
 * @status REVIEWING
 * @category basic
 * @see http://uikit.myntra.com/components/loader
 */
declare function Loader(props: Loader.Props): JSX.Element
declare namespace Loader {
  interface LoaderProps extends BaseProps {
    /**
     * The variant of the loader.
     */
    type: 'inline' | 'small' | 'large'
    /**
     * Use current color for loading spinner.
     */
    currentColor: boolean
    children: never
  }
}

// -----------[[Measure]]--------------- //
/**
 * A component to declaratively measure element size.
 *
 * @since 0.3.0
 * @status EXPERIMENTAL
 * @category advanced
 */
declare function Measure(props: Measure.Props): JSX.Element
declare namespace Measure {
  interface MeasureData {
    readonly bounds: {
      top: number
      left: number
      width: number
      height: number
    }
    readonly client: {
      top: number
      left: number
      width: number
      height: number
    }
    readonly margin: {
      top: number
      left: number
      bottom: number
      right: number
    }
    readonly offset: {
      top: number
      left: number
      width: number
      height: number
    }
    readonly scroll: {
      top: number
      left: number
      width: number
      height: number
    }
  }

  interface Props {
    /**
     * The callback fired when a DOM element is measured.
     */
    onMeasure?(data: MeasureData): void
    children:
      | React.ReactNode
      | ((props: { ref: React.RefObject<any>; content: MeasureData; measure(): MeasureData }) => React.ReactNode)
  }

  interface Observer {
    observe(element: HTMLElement): void
    unobserve(element: HTMLElement): void
    disconnect(): void
  }
}

// -----------[[Modal]]--------------- //
/**
 * A component to display popup modal.
 *
 * @since 0.3.0
 * @status REVIEWING
 * @category basic
 * @see http://uikit.myntra.com/components/modal
 */
declare function Modal(props: Modal.Props): JSX.Element
declare namespace Modal {
  interface ModalProps extends BaseProps, ModalLayoutProps {
    /** An element which opens the modal. */
    trigger: ReactNode
    /** Controls the state of the modal. */
    isOpen: boolean
    /** Hides the close button (small cross icon in top-right corner). */
    hideClose?: boolean
    /**
     * The callback function called on modal is opened.
     */
    onOpen?(): void
    /**
     * Render modal contents in a custom layout.
     */
    render?(props: ModalLayoutProps): JSX.Element
  }
  // -----------[[Layout]]--------------- //
  /**
   * A layout component to display a card (used for Modal component).
   *
   * @since 0.3.0
   * @status REVIEWING
   * @category layout
   * @see http://uikit.myntra.com/components/modal#modal-layout
   */
  declare function Layout(props: Layout.Props): JSX.Element
  declare namespace Layout {
    interface ModalLayoutProps extends BaseProps {
      /**
       * The title of the modal.
       */
      title?: ReactNode
      /**
       * Display action buttons.
       */
      actions?: ReactNode | ((close: () => void) => void)
      /**
       * The callback function called on modal is closed.
       */
      onClose?(): void
    }
  }
}

// -----------[[NavBar]]--------------- //
/**
 * A sidebar nav list for app navigation.
 *
 * @since 0.3.0
 * @status REVIEWING
 * @category opinionated
 * @see http://uikit.myntra.com/components/nav-bar
 */
declare function NavBar(props: NavBar.Props): JSX.Element
declare namespace NavBar {
  interface NavBarProps extends BaseProps {
    /**
     * The title of the nav bar. Generally, it is the name of the application/product/company.
     */
    title: string
    /**
     * URL of the current page. NavBar uses `currentPath` for highlighting active nav links.
     */
    currentPath: string | any
    /**
     * Check if current path is active.
     *
     * @since 0.10.0
     */
    isActivePath?(
      navLinkPath: any,
      currentPath: any,
      options?: {
        isGroup: boolean
      }
    ): boolean
    /**
     * Control NavBar state.
     */
    isOpen?: boolean
    /**
     * The [NavBar.Item](#NavBarItem) component renders an anchor tag (`<a>`).
     * This prop allows to override this behavior.
     *
     * @since 0.10.0
     */
    renderLink?(props: LinkProps): any
    /**
     * The callback fired when NavBar.Item is clicked.
     */
    onNavLinkClick?(link: { to: any }): void
    /**
     * The callback called when user clicks on the NavBar.
     */
    onClick?(event: MouseEvent): void
    /**
     * List of nav links and groups. Only [NavBar.Group](#NavBarGroup) and [NavBar.Item](#NavBarItem) should be used here.
     */
    children: React.ReactNode
    /**
     * @deprecated - Ambiguous prop name.
     */
    expand?: 'auto' | 'open' | 'close'
    /**
     * Match nav link with `currentPath`.
     *
     * @deprecated - Use [isActivePath](#NavBar-isActivePath) prop.
     */
    match?(args: { href: string; currentPath: string }): boolean
    /**
     * @deprecated - As NavBar does not control navigation, it should be handled by browser or any client-side router.
     */
    onChange?(href: string): void
    /**
     * @deprecated - Use [renderLink](#NavBar-renderLink) prop.
     */
    linkComponent?(props: { href: string; children: JSX.Element }): JSX.Element
  }
  // -----------[[Group]]--------------- //
  /**
   * A group of [links](#NavGroupItem) in the nav bar.
   *
   * This component should be used as a child of [NavBar](#NavBar) or other [NavBar.Group](#NavBarGroup) component.
   *
   * @since 0.3.0
   * @status REVIEWING
   * @category sub-component
   * @see http://uikit.myntra.com/components/nav-bar#NavBarGroup
   */
  declare function Group(props: Group.Props): JSX.Element
  declare namespace Group {
    interface NavBarGroupProps extends BaseProps, NavBarItemProps {
      /**
       * The title of the nav group.
       */
      title: string
      /**
       * List of nav links and groups. Only [NavBar.Group](#NavBarGroup) and [NavBar.Item](#NavBarItem) should be used here.
       */
      children: React.ReactNode
      /**
       * Internal nav item ID. Auto injected.
       *
       * @private
       */
      __$navId: number[]
    }

    interface NavBarGroupContext {
      depth: number
    }
  }

  // -----------[[Item]]--------------- //
  /**
   * A component to display links in the nav.
   *
   * This component should be used as a child of [NavBar](#NavBar) or [NavBar.Group](#NavBarGroup) component.
   *
   * @since 0.3.0
   * @status REVIEWING
   * @category sub-component
   * @see http://uikit.myntra.com/components/nav-bar#NavBarItem
   */
  declare function Item(props: Item.Props): JSX.Element
  declare namespace Item {
    interface NavBarItemProps extends BaseProps {
      /**
       * The title of the link.
       */
      children: any
      /**
       * The location of the linked page.
       */
      to?: string | any
      /**
       * The name of the icon (displayed on left side of title).
       */
      icon?: IconName
      /**
       * Render a custom [Icon](/components/icon) or an [Avatar](/components/avatar).
       */
      renderIcon?(): any
      /**
       * The callback fired on item click or press.
       *
       * @private
       */
      onActivation?: (event: Event | any) => void
    }
    type IconName = Icon.IconName
  }
}

// -----------[[Page]]--------------- //
/**
 * A basic layout component with side nav and header.
 *
 * @since 0.11.0
 * @status READY
 * @category layout
 * @see http://uikit.myntra.com/components/page
 */
declare function Page(props: Page.Props): JSX.Element
declare namespace Page {
  interface PageProps extends BaseProps {
    /**
     * Renders a nav using [NavBar](../components/nav-bar).
     */
    renderNavBar(): JSX.Element
    /**
     * Renders a header using [TopBar](../components/top-bar).
     */
    renderTopBar(): JSX.Element
    /**
     * Contents of the page.
     */
    children: JSX.Element
  }
}

// -----------[[Pagination]]--------------- //
/**
 The Pagination component.
 @since 0.3.0
 @status REVIEWING
 @category basic
 @see http://uikit.myntra.com/components/pagination
 */
declare function Pagination(props: Pagination.Props): JSX.Element
declare namespace Pagination {
  interface PaginationProps extends BaseProps {
    /** Current selected page */
    page: number
    /** On change handler */
    onChange(payload: { page: number; size: number }): void
    /** Sizes per page */
    size: number
    /** Total count of result items */
    total: number
    /** Allowed page sizes */
    sizes?: number[]
    /** Hide size selector */
    hideSize?: boolean
    /** @private */
    className?: string
  }
}

// -----------[[Portal]]--------------- //
/**
 *
 */
declare function Portal(props: Portal.Props): JSX.Element
declare namespace Portal {
  interface Props {
    /** Attach child to specific component/element */
    container?: boolean | string | HTMLElement
    /** Wrapper <div> */
    wrapper?: HTMLElement
  }
}

// -----------[[Progress]]--------------- //
/**
 * A component to display loading progress.
 *
 * @since 0.6.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/progress
 */
declare function Progress(props: Progress.Props): JSX.Element
declare namespace Progress {
  type Props =
    | ({
        /**
         * Type of progress view (bar or circular).
         */
        type: 'bar'
      } & ProgressBarProps)
    | ({
        type: 'circle'
      } & ProgressCircleProps)
  // -----------[[Bar]]--------------- //
  /**
   *
   */
  declare function Bar(props: Bar.Props): JSX.Element
  declare namespace Bar {
    interface Props extends BaseProps {
      /**
       * Completion state in percentage.
       */
      value: number
      /**
       * Visual style of progress bar.
       *
       * @since 0.11.0
       */
      appearance?: 'success' | 'info' | 'warning' | 'danger'
      /**
       * @deprecated - Use children prop.
       */
      title?: string
      /**
       * Height of progress bar.
       *
       * @since 0.11.0
       */
      size?: 'small' | 'medium' | 'large'
    }
  }

  // -----------[[Circle]]--------------- //
  /**
   *
   */
  declare function Circle(props: Circle.Props): JSX.Element
  declare namespace Circle {
    interface Props extends BaseProps {
      value: number
      appearance?: 'success' | 'info' | 'warning' | 'danger'
      size?: 'small' | 'medium' | 'large'
    }
  }
}

// -----------[[SchemaForm]]--------------- //
/**
 * A component for building Web forms from JSON Schema.
 *
 * It is meant to automatically generate a form when data structure changes often or has large number of fields.
 *
 * @since 0.3.0
 * @status REVIEWING
 *
 */
declare function SchemaForm(props: SchemaForm.Props): JSX.Element
declare namespace SchemaForm {
  interface Props extends FormProps {
    schema: Record<string, any>
    value?: Record<string, any>
    onChange(value: Record<string, any>): void
    optionsProvider?(format: string): Array<Record<string, any>> | null | Promise<Array<Record<string, any>>>
    componentProvider?(name: string): ComponentType
    error?: Record<string, string | string[]>
    onError?(error: Record<string, string | string[]>): void
  }
  type FormProps = Form.Props
}

// -----------[[Section]]--------------- //
/**
 * A building block of the page layout.
 *
 * @since 0.7.0
 * @status REVIEWING
 * @category layout
 * @see http://uikit.myntra.com/components/section
 */
declare function Section(props: Section.Props): JSX.Element
declare namespace Section {
  interface SectionProps extends BaseProps {
    title: string
    noPadding: boolean
  }
}

// -----------[[Table]]--------------- //
/**
 * A table.
 *
 * @since 0.3.0
 * @status REVIEWING
 */
declare function Table(props: Table.Props): JSX.Element
declare namespace Table {
  interface TableProps<T = any> extends BaseProps {
    data: T[]
    displayColumns?: string[]
    renderRow?(props: RowRendererProps): JSX.Element
    appearance?: 'default' | 'striped'
    virtualized?: boolean
    columnOrder?: string[]
  }

  interface TableState {
    /**
     * @example js
     *  {
     *    foo: {
     *      [symbol('sort')]: 'asc'
     *    }
     *  }
     */
    enhancers: Record<string, Record<symbol, any>>
  }
  // -----------[[Column]]--------------- //
  /**
   * Declarative way of defining table column configuration.
   *
   * @since 0.3.0
   * @status READY
   * @category renderless
   * @see http://uikit.myntra.com/components/table#tablecolumn
   */
  declare function Column(props: Column.Props): JSX.Element
  declare namespace Column {
    interface Props<T = any> extends BaseProps {
      /**
       * Unique column identifier for the column.
       */
      key: string
      /**
       * Header text for the column.
       */
      label?: ReactNode
      renderEditor?(props: EditableCellRendererProps): ReactNode
      fixed?: boolean | 'start' | 'end'
      sortable?: boolean | ((a: any, b: any) => number)
      minWidth?: number
      /**
       * Accessor to get value of column from the row object.
       */
      accessor?: string | ((item: T, index: number) => any)
    }
  }

  // -----------[[Row]]--------------- //
  /**
   * Declarative way of defining table row customizers. It is a render-less component,
   * use to declare rendering behavior of the table.
   *
   * @since 0.3.0
   * @status READY
   * @category renderless
   * @see http://uikit.myntra.com/components/table#tablerow
   */
  declare function Row(props: Row.Props): JSX.Element
  declare namespace Row {
    interface Props<T = any> extends BaseProps {
      /**
       * Unique column identifier for the column.
       */
      key: string
      /**
       * Find a row to customize.
       */
      selector?: number | ((rowId: number) => boolean)
      /**
       * Render contents of expanded row. Also, presence of this prop
       * makes the table row expandable.
       */
      renderBody?(props: RowRendererProps): JSX.Element
      /**
       * Customize row rendering behavior.
       *
       * __NOTE:__ Make sure to render `children` and use `Table.TR` as root element.
       */
      children(props: RowRendererProps): JSX.Element
    }
  }

  // -----------[[Filter]]--------------- //
  /**
   *
   */
  declare function Filter(props: Filter.Props): JSX.Element
  declare namespace Filter {}
}

// -----------[[Tabs]]--------------- //
/**
 * A layout component to display tabbed interface.
 *
 * @since 0.3.0
 * @status REVIEWING
 * @category layout
 * @see http://uikit.myntra.com/components/tabs
 */
declare function Tabs(props: Tabs.Props): JSX.Element
declare namespace Tabs {
  interface Props extends BaseProps {
    /**
     * Current active tab.
     */
    activeIndex?: number
    /**
     * The callback function called when active tab changes.
     *
     * @param activeIndex - New active tab.
     */
    onChange?(activeIndex: number): void
  }
}

// -----------[[Text]]--------------- //
/**
 * A utility component for styling text.
 *
 * @since 0.3.0
 * @status REVIEWING
 * @category basic
 * @see http://uikit.myntra.com/components/text
 */
declare function Text(props: Text.Props): JSX.Element
declare namespace Text {
  interface Props extends BaseProps {
    type: 'title' | 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'paragraph' | 'table' | 'small' | 'caption'
    color?:
      | 'inherit'
      | 'dark'
      | 'light'
      | 'info'
      | 'success'
      | 'warning'
      | 'error'
      | 'primary'
      | 'accent'
      | 'gray400'
      | 'gray300'
      | 'gray200'
      | 'gray100'
      | 'gray50'
    secondary?: boolean
    disabled?: boolean
    alternate?: boolean
    italic?: boolean
    oblique?: boolean
    size?: 900 | 800 | 700 | 600 | 500 | 400 | 300 | 200
    weight?: 'thin' | 'normal' | 'bold' | 'black' | 'bolder' | 'lighter'
  }
}

// -----------[[Tooltip]]--------------- //
/**
 * Tooltip component.
 * @since 0.6.0
 * @status REVIEWING
 */
declare function Tooltip(props: Tooltip.Props): JSX.Element
declare namespace Tooltip {
  interface TooltipProps extends BaseProps {
    /** Content of the tooltip */
    renderContent(): JSX.Element
    /** Position with relative to children */
    position?: 'up' | 'down' | 'left' | 'right'
    /** Event to display the tooltip */
    triggerOn?: 'hover' | 'click' | 'focus'
    /** Displays a tooltip with dark background */
    dark?: boolean
  }
}

// -----------[[TopBar]]--------------- //
/**
 * A component for page header
 *
 * @since 0.3.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/top-bar
 */
declare function TopBar(props: TopBar.Props): JSX.Element
declare namespace TopBar {
  interface TopBarProps extends BaseProps {
    title: string
    user: Partial<{
      name: string
      photo: string
    }> & {
      email: string
    }
  }
  // -----------[[Item]]--------------- //
  /**
   * A component for page header
   *
   * @since 0.3.0
   * @status READY
   * @category basic
   * @see http://uikit.myntra.com/components/top-bar#TopBarItem
   */
  declare function Item(props: Item.Props): JSX.Element
  declare namespace Item {
    interface TopBarItemProps extends BaseProps {
      /**
       * Adds icon.
       */
      icon?: IconName
      /**
       * Description of icon.
       */
      altText?: string
      /**
       * Breadcrumb text or link.
       */
      children: JSX.Element
    }
    type IconName = Icon.IconName
  }
}

// -----------[[VirtualGrid]]--------------- //
/**
 * A grid using windowing technique to render only visible area.
 *
 * @since 0.8.0
 * @status READY
 * @category advanced
 * @see http://uikit.myntra.com/components/virtual-grid
 */
declare function VirtualGrid(props: VirtualGrid.Props): JSX.Element
declare namespace VirtualGrid {
  interface ScrollPosition {
    scrollTop: number
    scrollLeft: number
  }

  interface VirtualGridProps extends BaseProps {
    /**
     * Number of rows in the grid.
     */
    rows: number
    /**
     * Number of columns in the grid.
     */
    columns: number
    /**
     * Height of the grid container.
     */
    height: number
    /**
     * Width of the grid container.
     */
    width: number
    /**
     * A callback to render grid item at given cell.
     */
    children(props: {
      rowIndex: number
      columnIndex: number
      offsetTop: number
      offsetLeft: number
      rowHeight: number
      columnWidth: number
      isScrolling: boolean
      style: Record<string, string | number>
    }): JSX.Element
    /**
     * Number of columns (from start) always rendered.
     * @deprecated Use [fixedColumnsFromStart](#table.fixedColumnsFromStart)
     */
    fixedColumns?: number
    /**
     * Number of columns (from start) always rendered.
     */
    fixedColumnsFromStart?: number
    /**
     * Number of columns (from end) always rendered.
     */
    fixedColumnsFromEnd?: number
    /**
     * Number of rows to render outside of viewport.
     */
    overScanRows?: number
    /**
     * Number of columns to render outside of viewport.
     */
    overScanColumns?: number
    /**
     * Estimated item height to estimate content height.
     */
    estimatedCellHeight?: number
    /**
     * Estimated item width to estimate content width.
     */
    estimatedCellWidth: number
    renderScroller?(props: {
      onScroll(event: {
        target: {
          scrollTop: number
          scrollLeft: number
        }
      }): void
      width: number
      height: number
      style: Record<string, string | number>
      children: any
    }): JSX.Element
    renderContainer?(props: {
      /**
       * Height of grid content.
       */
      offsetHeight: number
      /**
       * Width of grid content.
       */
      offsetWidth: number
      /**
       * Height of rendered content.
       */
      renderedHeight: number
      /**
       * Width of rendered content.
       */
      renderedWidth: number
      /**
       * Scroll position from left.
       */
      offsetLeft: number
      /**
       * Scroll position from top.
       */
      offsetTop: number
      /**
       * Styles to position and configure scroll behaviour.
       */
      style: Record<string, string | number>
      className?: string
      children: any
    }): ReactNode
    renderRow?(props: {
      grid: VirtualGrid
      offsetTop: number
      height: number
      rowIndex: number
      isScrolling: boolean
      scrollLeft: number
      children: Array<any>
    }): ReactNode
    onMeasure?(event: {
      row: number
      column: number
      size: {
        width: number
        height: number
      }
    }): void
  }
  type MeasureCache = VirtualList.MeasureCache
  type PositionManager = VirtualList.PositionManager
}

// -----------[[VirtualList]]--------------- //
/**
 * A list using windowing technique to render only visible area.
 *
 * @since 0.7.0
 * @status READY
 * @category advanced
 * @see http://uikit.myntra.com/components/virtual-list
 */
declare function VirtualList(props: VirtualList.Props): JSX.Element
declare namespace VirtualList {
  interface VirtualListProps extends BaseProps {
    /**
     * Number of items in the list.
     */
    itemCount: number
    /**
     * Height (or width for horizontal list) of the list container.
     */
    viewportSize: number
    /**
     * A callback to render list item at given position.
     */
    children(props: {
      list: VirtualList
      index: number
      offset: number
      size: number
      style: Record<string, string | number>
    }): JSX.Element
    /**
     * Estimated item height (or width) to estimate content height (or width).
     */
    estimatedItemSize?: number
    /**
     * Number of items to render outside of viewport.
     */
    overScanItemCount?: number
    /**
     * Number of items (from start) always rendered.
     */
    fixedItemCountFromStart?: number
    /**
     * Number of items (from start) always rendered.
     */
    fixedItemCountFromEnd?: number
    /**
     * @deprecated use [fixedItemCountFromStart](#virtual-list.fixedItemCountFromStart)
     */
    fixedItemCount?: number
    /**
     * List scroll direction.
     */
    direction?: 'horizontal' | 'vertical'
    /**
     * Render a wrapper element which would have scrollbars.
     */
    renderScroller?(props: {
      /**
       * A callback function to recompute visible area on scroll.
       */
      onScroll(event: {
        target: {
          scrollLeft: number
          screenTop: number
        }
      }): void
      /**
       * Height or width of the content.
       */
      size: number
      /**
       * Styles to position and configure scroll behaviour.
       */
      style: Record<string, string | number>
      className?: string
      children: any
    }): JSX.Element
    /**
     * Render inner container of scroller container. This sets the scroll height and
     * positions rendered content in visible window.
     */
    renderContainer?(props: {
      /**
       * Offset of rendered content from top (or left in horizontal scroller).
       */
      offsetStart: number
      /**
       * Scroll position from top (or left in horizontal scroller).
       */
      offsetScroll: number
      /**
       * Height or width of the content.
       */
      size: number
      /**
       * Styles to position and configure scroll behaviour.
       */
      style: Record<string, string | number>
      className?: string
      children: Array<any>
    }): JSX.Element
  }
}

// ----------[[DeclaredTypes]]---------- //

// -----------[[Form]]----------//
declare namespace Form {
  declare function Text(props: Field.Props & Form.FormFieldProps & InputText.Props): JSX.Element
  declare function Select(props: Field.Props & Form.FormFieldProps & InputSelect.Props): JSX.Element
  declare function Checkbox(props: Field.Props & Form.FormFieldProps & InputCheckbox.Props): JSX.Element
  declare function CheckBox(props: Field.Props & Form.FormFieldProps & InputCheckbox.Props): JSX.Element
  declare function Date(props: Field.Props & Form.FormFieldProps & InputDate.Props): JSX.Element
  declare function S3File(props: Field.Props & Form.FormFieldProps & InputS3File.Props): JSX.Element
  declare function Masked(props: Field.Props & Form.FormFieldProps & InputMasked.Props): JSX.Element
  declare function Number(props: Field.Props & Form.FormFieldProps & InputNumber.Props): JSX.Element
  declare function TextArea(props: Field.Props & Form.FormFieldProps & InputTextArea.Props): JSX.Element
}

/**
 *
 *
 * @since 0.3.0
 * @status EXPERIMENTAL
 * @category layout
 * @see http://uikit.myntra.com/components/tabs#tab
 */
declare function Tab(props: Tab.Props): JSX.Element
declare namespace Tab {
  interface Props extends BaseProps {
    title?: number
  }
}

// -----------[[React]]----------//
type Key = string | number

type ReactText = string | number
type ReactChild = ReactElement | ReactText
interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray
interface ReactPortal extends ReactElement {
  key: Key | null
  children: ReactNode
}
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined

interface ErrorInfo {
  /**
   * Captures which component contained the exception, and its ancestors.
   */
  componentStack: string
}

interface NewLifecycle<P, S, SS> {
  /**
   * Runs before React applies the result of `render` to the document, and
   * returns an object to be given to componentDidUpdate. Useful for saving
   * things such as scroll position before `render` causes changes to it.
   *
   * Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
   * lifecycle events from running.
   */
  getSnapshotBeforeUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>): SS | null
  /**
   * Called immediately after updating occurs. Not called for the initial render.
   *
   * The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.
   */
  componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void
}

interface ComponentLifecycle<P, S, SS = any> extends NewLifecycle<P, S, SS> {
  /**
   * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
   */
  componentDidMount?(): void
  /**
   * Called to determine whether the change in props and state should trigger a re-render.
   *
   * `Component` always returns true.
   * `PureComponent` implements a shallow comparison on props and state and returns true if any
   * props or states have changed.
   *
   * If false is returned, `Component#render`, `componentWillUpdate`
   * and `componentDidUpdate` will not be called.
   */
  shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean
  /**
   * Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
   * cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.
   */
  componentWillUnmount?(): void
  /**
   * Catches exceptions generated in descendant components. Unhandled exceptions will cause
   * the entire component tree to unmount.
   */
  componentDidCatch?(error: Error, errorInfo: ErrorInfo): void
}

interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> {}

type JSXElementConstructor<P> = ((props: P) => ReactElement | null) | (new (props: P) => Component<P, any>)

interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
  type: T
  props: P
  key: Key | null
}
interface ProviderProps<T> {
  value: T
  children?: ReactNode
}

interface ConsumerProps<T> {
  children: (value: T) => ReactNode
  unstable_observedBits?: number
}

interface ExoticComponent<P = {}> {
  /**
   * **NOTE**: Exotic components are not callable.
   */
  (props: P): ReactElement | null
  readonly $$typeof: symbol
}

interface NamedExoticComponent<P = {}> extends ExoticComponent<P> {
  displayName?: string
}

interface ProviderExoticComponent<P> extends ExoticComponent<P> {}

type ContextType<C extends Context<any>> = C extends Context<infer T> ? T : never
type Provider<T> = ProviderExoticComponent<ProviderProps<T>>
type Consumer<T> = ExoticComponent<ConsumerProps<T>>
interface Context<T> {
  Provider: Provider<T>
  Consumer: Consumer<T>
  displayName?: string
}
type SetStateAction<S> = S | ((prevState: S) => S)
type Dispatch<A> = (value: A) => void
type Reducer<S, A> = (prevState: S, action: A) => S
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never
type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never
type DependencyList = ReadonlyArray<any>
type EffectCallback = () => void | (() => void | undefined)

interface MutableRefObject<T> {
  current: T
}

/**
 * Accepts a context object (the value returned from `React.createContext`) and returns the current
 * context value, as given by the nearest context provider for the given context.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#usecontext
 */
declare function useContext<T>(context: Context<T> /*, (not public API) observedBits?: number|boolean */): T
/**
 * Returns a stateful value, and a function to update it.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#usestate
 */
declare function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]
/**
 * Returns a stateful value, and a function to update it.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#usestate
 */
declare function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>]
/**
 * An alternative to `useState`.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
 * multiple sub-values. It also lets you optimize performance for components that trigger deep
 * updates because you can pass `dispatch` down instead of callbacks.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */
declare function useReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & ReducerState<R>,
  initializer: (arg: I & ReducerState<R>) => ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>]
/**
 * An alternative to `useState`.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
 * multiple sub-values. It also lets you optimize performance for components that trigger deep
 * updates because you can pass `dispatch` down instead of callbacks.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */
declare function useReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I,
  initializer: (arg: I) => ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>]
/**
 * An alternative to `useState`.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
 * multiple sub-values. It also lets you optimize performance for components that trigger deep
 * updates because you can pass `dispatch` down instead of callbacks.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */

declare function useReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
  initializer?: undefined
): [ReducerState<R>, Dispatch<ReducerAction<R>>]
/**
 * `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument
 * (`initialValue`). The returned object will persist for the full lifetime of the component.
 *
 * Note that `useRef()` is useful for more than the `ref` attribute. It’s handy for keeping any mutable
 * value around similar to how you’d use instance fields in classes.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 */
declare function useRef<T>(initialValue: T): MutableRefObject<T>

/**
 * `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument
 * (`initialValue`). The returned object will persist for the full lifetime of the component.
 *
 * Note that `useRef()` is useful for more than the `ref` attribute. It’s handy for keeping any mutable
 * value around similar to how you’d use instance fields in classes.
 *
 * Usage note: if you need the result of useRef to be directly mutable, include `| null` in the type
 * of the generic argument.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 */
interface RefObject<T> {
  readonly current: T | null
}
declare function useRef<T>(initialValue: T | null): RefObject<T>
/**
 * `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument
 * (`initialValue`). The returned object will persist for the full lifetime of the component.
 *
 * Note that `useRef()` is useful for more than the `ref` attribute. It’s handy for keeping any mutable
 * value around similar to how you’d use instance fields in classes.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 */
declare function useRef<T = undefined>(): MutableRefObject<T | undefined>
/**
 * The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations.
 * Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside
 * `useLayoutEffect` will be flushed synchronously, before the browser has a chance to paint.
 *
 * Prefer the standard `useEffect` when possible to avoid blocking visual updates.
 *
 * If you’re migrating code from a class component, `useLayoutEffect` fires in the same phase as
 * `componentDidMount` and `componentDidUpdate`.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */
declare function useLayoutEffect(effect: EffectCallback, deps?: DependencyList): void
/**
 * Accepts a function that contains imperative, possibly effectful code.
 *
 * @param effect Imperative function that can return a cleanup function
 * @param deps If present, effect will only activate if the values in the list change.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#useeffect
 */
declare function useEffect(effect: EffectCallback, deps?: DependencyList): void

type Ref<T> = { bivarianceHack(instance: T | null): void }['bivarianceHack'] | RefObject<T> | null
/**
 * `useImperativeHandle` customizes the instance value that is exposed to parent components when using
 * `ref`. As always, imperative code using refs should be avoided in most cases.
 *
 * `useImperativeHandle` should be used with `React.forwardRef`.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#useimperativehandle
 */
declare function useImperativeHandle<T, R extends T>(
  ref: Ref<T> | undefined,
  init: () => R,
  deps?: DependencyList
): void
/**
 * `useCallback` will return a memoized version of the callback that only changes if one of the `inputs`
 * has changed.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#usecallback
 */
declare function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T
/**
 * `useMemo` will only recompute the memoized value when one of the `deps` has changed.
 *
 * Usage note: if calling `useMemo` with a referentially stable function, also give it as the input in
 * the second argument.
 *
 * ```ts
 * function expensive () { ... }
 *
 * function Component () {
 *   const expensiveResult = useMemo(expensive, [expensive])
 *   return ...
 * }
 * ```
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#usememo
 */
declare function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T
/**
 * `useDebugValue` can be used to display a label for custom hooks in React DevTools.
 *
 * NOTE: We don’t recommend adding debug values to every custom hook.
 * It’s most valuable for custom hooks that are part of shared libraries.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#usedebugvalue
 */
declare function useDebugValue<T>(value: T, format?: (value: T) => any): void

// -----------[[JSX]]----------//
/*
React projects that don't include the DOM library need these interfaces to compile.
React Native applications use React, but there is no DOM available. The JavaScript runtime
is ES6/ES2015 only. These definitions allow such projects to compile with only `--lib ES6`.
*/

interface Event {}
interface AnimationEvent extends Event {}
interface ClipboardEvent extends Event {}
interface CompositionEvent extends Event {}
interface DragEvent extends Event {}
interface FocusEvent extends Event {}
interface KeyboardEvent extends Event {}
interface MouseEvent extends Event {}
interface TouchEvent extends Event {}
interface PointerEvent extends Event {}
interface TransitionEvent extends Event {}
interface UIEvent extends Event {}
interface WheelEvent extends Event {}

interface EventTarget {}
interface Document {}
interface DataTransfer {}
interface StyleMedia {}

interface Element {}

interface HTMLElement extends Element {}
interface HTMLAnchorElement extends HTMLElement {}
interface HTMLAreaElement extends HTMLElement {}
interface HTMLAudioElement extends HTMLElement {}
interface HTMLBaseElement extends HTMLElement {}
interface HTMLBodyElement extends HTMLElement {}
interface HTMLBRElement extends HTMLElement {}
interface HTMLButtonElement extends HTMLElement {}
interface HTMLCanvasElement extends HTMLElement {}
interface HTMLDataListElement extends HTMLElement {}
interface HTMLDialogElement extends HTMLElement {}
interface HTMLDivElement extends HTMLElement {}
interface HTMLDListElement extends HTMLElement {}
interface HTMLEmbedElement extends HTMLElement {}
interface HTMLFieldSetElement extends HTMLElement {}
interface HTMLFormElement extends HTMLElement {}
interface HTMLHeadingElement extends HTMLElement {}
interface HTMLHeadElement extends HTMLElement {}
interface HTMLHRElement extends HTMLElement {}
interface HTMLHtmlElement extends HTMLElement {}
interface HTMLIFrameElement extends HTMLElement {}
interface HTMLImageElement extends HTMLElement {}
interface HTMLInputElement extends HTMLElement {}
interface HTMLModElement extends HTMLElement {}
interface HTMLLabelElement extends HTMLElement {}
interface HTMLLegendElement extends HTMLElement {}
interface HTMLLIElement extends HTMLElement {}
interface HTMLLinkElement extends HTMLElement {}
interface HTMLMapElement extends HTMLElement {}
interface HTMLMetaElement extends HTMLElement {}
interface HTMLObjectElement extends HTMLElement {}
interface HTMLOListElement extends HTMLElement {}
interface HTMLOptGroupElement extends HTMLElement {}
interface HTMLOptionElement extends HTMLElement {}
interface HTMLParagraphElement extends HTMLElement {}
interface HTMLParamElement extends HTMLElement {}
interface HTMLPreElement extends HTMLElement {}
interface HTMLProgressElement extends HTMLElement {}
interface HTMLQuoteElement extends HTMLElement {}
interface HTMLScriptElement extends HTMLElement {}
interface HTMLSelectElement extends HTMLElement {}
interface HTMLSourceElement extends HTMLElement {}
interface HTMLSpanElement extends HTMLElement {}
interface HTMLStyleElement extends HTMLElement {}
interface HTMLTableElement extends HTMLElement {}
interface HTMLTableColElement extends HTMLElement {}
interface HTMLTableDataCellElement extends HTMLElement {}
interface HTMLTableHeaderCellElement extends HTMLElement {}
interface HTMLTableRowElement extends HTMLElement {}
interface HTMLTableSectionElement extends HTMLElement {}
interface HTMLTextAreaElement extends HTMLElement {}
interface HTMLTitleElement extends HTMLElement {}
interface HTMLTrackElement extends HTMLElement {}
interface HTMLUListElement extends HTMLElement {}
interface HTMLVideoElement extends HTMLElement {}
interface HTMLWebViewElement extends HTMLElement {}

interface SVGElement extends Element {}
interface SVGSVGElement extends SVGElement {}
interface SVGCircleElement extends SVGElement {}
interface SVGClipPathElement extends SVGElement {}
interface SVGDefsElement extends SVGElement {}
interface SVGDescElement extends SVGElement {}
interface SVGEllipseElement extends SVGElement {}
interface SVGFEBlendElement extends SVGElement {}
interface SVGFEColorMatrixElement extends SVGElement {}
interface SVGFEComponentTransferElement extends SVGElement {}
interface SVGFECompositeElement extends SVGElement {}
interface SVGFEConvolveMatrixElement extends SVGElement {}
interface SVGFEDiffuseLightingElement extends SVGElement {}
interface SVGFEDisplacementMapElement extends SVGElement {}
interface SVGFEDistantLightElement extends SVGElement {}
interface SVGFEFloodElement extends SVGElement {}
interface SVGFEFuncAElement extends SVGElement {}
interface SVGFEFuncBElement extends SVGElement {}
interface SVGFEFuncGElement extends SVGElement {}
interface SVGFEFuncRElement extends SVGElement {}
interface SVGFEGaussianBlurElement extends SVGElement {}
interface SVGFEImageElement extends SVGElement {}
interface SVGFEMergeElement extends SVGElement {}
interface SVGFEMergeNodeElement extends SVGElement {}
interface SVGFEMorphologyElement extends SVGElement {}
interface SVGFEOffsetElement extends SVGElement {}
interface SVGFEPointLightElement extends SVGElement {}
interface SVGFESpecularLightingElement extends SVGElement {}
interface SVGFESpotLightElement extends SVGElement {}
interface SVGFETileElement extends SVGElement {}
interface SVGFETurbulenceElement extends SVGElement {}
interface SVGFilterElement extends SVGElement {}
interface SVGForeignObjectElement extends SVGElement {}
interface SVGGElement extends SVGElement {}
interface SVGImageElement extends SVGElement {}
interface SVGLineElement extends SVGElement {}
interface SVGLinearGradientElement extends SVGElement {}
interface SVGMarkerElement extends SVGElement {}
interface SVGMaskElement extends SVGElement {}
interface SVGMetadataElement extends SVGElement {}
interface SVGPathElement extends SVGElement {}
interface SVGPatternElement extends SVGElement {}
interface SVGPolygonElement extends SVGElement {}
interface SVGPolylineElement extends SVGElement {}
interface SVGRadialGradientElement extends SVGElement {}
interface SVGRectElement extends SVGElement {}
interface SVGStopElement extends SVGElement {}
interface SVGSwitchElement extends SVGElement {}
interface SVGSymbolElement extends SVGElement {}
interface SVGTextElement extends SVGElement {}
interface SVGTextPathElement extends SVGElement {}
interface SVGTSpanElement extends SVGElement {}
interface SVGUseElement extends SVGElement {}
interface SVGViewElement extends SVGElement {}

interface Text {}
interface TouchList {}
interface WebGLRenderingContext {}

declare namespace JSX {
  type EventHandler<E> = { bivarianceHack(event: E): void }['bivarianceHack']
  type FocusEventHandler<T = Element> = EventHandler<FocusEvent>
  type FormEventHandler<T = Element> = EventHandler<Event>
  type ChangeEventHandler<T = Element> = EventHandler<Event>
  type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent>
  type MouseEventHandler<T = Element> = EventHandler<MouseEvent>

  interface DOMAttributes<T> {
    children?: ReactNode
    dangerouslySetInnerHTML?: {
      __html: string
    }

    // Focus Events
    onFocus?: FocusEventHandler<T>
    onBlur?: FocusEventHandler<T>

    // Form Events
    onChange?: FormEventHandler<T>

    // Keyboard Events
    onKeyDown?: KeyboardEventHandler<T>
    onKeyPress?: KeyboardEventHandler<T>
    onKeyUp?: KeyboardEventHandler<T>

    // MouseEvents
    onClick?: MouseEventHandler<T>
    onMouseDown?: MouseEventHandler<T>
    onMouseEnter?: MouseEventHandler<T>
    onMouseLeave?: MouseEventHandler<T>
    onMouseMove?: MouseEventHandler<T>
    onMouseUp?: MouseEventHandler<T>
  }

  interface HTMLAttributes<T> extends DOMAttributes<T> {
    // React-specific Attributes
    defaultChecked?: boolean
    defaultValue?: string | string[]
    suppressContentEditableWarning?: boolean
    suppressHydrationWarning?: boolean

    // Standard HTML Attributes
    accessKey?: string
    className?: string
    contentEditable?: boolean
    contextMenu?: string
    dir?: string
    draggable?: boolean
    hidden?: boolean
    id?: string
    lang?: string
    placeholder?: string
    slot?: string
    spellCheck?: boolean
    style?: any
    tabIndex?: number
    title?: string

    // Unknown
    inputMode?: string
    is?: string
    radioGroup?: string // <command>, <menuitem>

    // WAI-ARIA
    role?: string

    // RDFa Attributes
    about?: string
    datatype?: string
    inlist?: any
    prefix?: string
    property?: string
    resource?: string
    typeof?: string
    vocab?: string

    // Non-standard Attributes
    autoCapitalize?: string
    autoCorrect?: string
    autoSave?: string
    color?: string
    itemProp?: string
    itemScope?: boolean
    itemType?: string
    itemID?: string
    itemRef?: string
    results?: number
    security?: string
    unselectable?: 'on' | 'off'
  }

  type DetailedHTMLProps<E extends HTMLAttributes<T>, T> = { key?: Key } & E
  interface SVGProps<T> extends SVGAttributes<T> {
    key?: Key
  }

  interface HTMLAttributes<T> extends DOMAttributes<T> {
    // React-specific Attributes
    defaultChecked?: boolean
    defaultValue?: string | string[]
    suppressContentEditableWarning?: boolean
    suppressHydrationWarning?: boolean

    // Standard HTML Attributes
    accessKey?: string
    className?: string
    contentEditable?: boolean
    contextMenu?: string
    dir?: string
    draggable?: boolean
    hidden?: boolean
    id?: string
    lang?: string
    placeholder?: string
    slot?: string
    spellCheck?: boolean
    style?: any
    tabIndex?: number
    title?: string

    // Unknown
    inputMode?: string
    is?: string
    radioGroup?: string // <command>, <menuitem>

    // WAI-ARIA
    role?: string

    // RDFa Attributes
    about?: string
    datatype?: string
    inlist?: any
    prefix?: string
    property?: string
    resource?: string
    typeof?: string
    vocab?: string

    // Non-standard Attributes
    autoCapitalize?: string
    autoCorrect?: string
    autoSave?: string
    color?: string
    itemProp?: string
    itemScope?: boolean
    itemType?: string
    itemID?: string
    itemRef?: string
    results?: number
    security?: string
    unselectable?: 'on' | 'off'
  }

  // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
    'aria-activedescendant'?: string
    /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
    'aria-atomic'?: boolean | 'false' | 'true'
    /**
     * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
     * presented if they are made.
     */
    'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both'
    /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
    'aria-busy'?: boolean | 'false' | 'true'
    /**
     * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
     * @see aria-pressed @see aria-selected.
     */
    'aria-checked'?: boolean | 'false' | 'mixed' | 'true'
    /**
     * Defines the total number of columns in a table, grid, or treegrid.
     * @see aria-colindex.
     */
    'aria-colcount'?: number
    /**
     * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
     * @see aria-colcount @see aria-colspan.
     */
    'aria-colindex'?: number
    /**
     * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-colindex @see aria-rowspan.
     */
    'aria-colspan'?: number
    /**
     * Identifies the element (or elements) whose contents or presence are controlled by the current element.
     * @see aria-owns.
     */
    'aria-controls'?: string
    /** Indicates the element that represents the current item within a container or set of related elements. */
    'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time'
    /**
     * Identifies the element (or elements) that describes the object.
     * @see aria-labelledby
     */
    'aria-describedby'?: string
    /**
     * Identifies the element that provides a detailed, extended description for the object.
     * @see aria-describedby.
     */
    'aria-details'?: string
    /**
     * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
     * @see aria-hidden @see aria-readonly.
     */
    'aria-disabled'?: boolean | 'false' | 'true'
    /**
     * Indicates what functions can be performed when a dragged object is released on the drop target.
     * @deprecated in ARIA 1.1
     */
    'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup'
    /**
     * Identifies the element that provides an error message for the object.
     * @see aria-invalid @see aria-describedby.
     */
    'aria-errormessage'?: string
    /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
    'aria-expanded'?: boolean | 'false' | 'true'
    /**
     * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
     * allows assistive technology to override the general default of reading in document source order.
     */
    'aria-flowto'?: string
    /**
     * Indicates an element's "grabbed" state in a drag-and-drop operation.
     * @deprecated in ARIA 1.1
     */
    'aria-grabbed'?: boolean | 'false' | 'true'
    /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
    'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
    /**
     * Indicates whether the element is exposed to an accessibility API.
     * @see aria-disabled.
     */
    'aria-hidden'?: boolean | 'false' | 'true'
    /**
     * Indicates the entered value does not conform to the format expected by the application.
     * @see aria-errormessage.
     */
    'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling'
    /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
    'aria-keyshortcuts'?: string
    /**
     * Defines a string value that labels the current element.
     * @see aria-labelledby.
     */
    'aria-label'?: string
    /**
     * Identifies the element (or elements) that labels the current element.
     * @see aria-describedby.
     */
    'aria-labelledby'?: string
    /** Defines the hierarchical level of an element within a structure. */
    'aria-level'?: number
    /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
    'aria-live'?: 'off' | 'assertive' | 'polite'
    /** Indicates whether an element is modal when displayed. */
    'aria-modal'?: boolean | 'false' | 'true'
    /** Indicates whether a text box accepts multiple lines of input or only a single line. */
    'aria-multiline'?: boolean | 'false' | 'true'
    /** Indicates that the user may select more than one item from the current selectable descendants. */
    'aria-multiselectable'?: boolean | 'false' | 'true'
    /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
    'aria-orientation'?: 'horizontal' | 'vertical'
    /**
     * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
     * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
     * @see aria-controls.
     */
    'aria-owns'?: string
    /**
     * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
     * A hint could be a sample value or a brief description of the expected format.
     */
    'aria-placeholder'?: string
    /**
     * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-setsize.
     */
    'aria-posinset'?: number
    /**
     * Indicates the current "pressed" state of toggle buttons.
     * @see aria-checked @see aria-selected.
     */
    'aria-pressed'?: boolean | 'false' | 'mixed' | 'true'
    /**
     * Indicates that the element is not editable, but is otherwise operable.
     * @see aria-disabled.
     */
    'aria-readonly'?: boolean | 'false' | 'true'
    /**
     * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
     * @see aria-atomic.
     */
    'aria-relevant'?: 'additions' | 'additions text' | 'all' | 'removals' | 'text'
    /** Indicates that user input is required on the element before a form may be submitted. */
    'aria-required'?: boolean | 'false' | 'true'
    /** Defines a human-readable, author-localized description for the role of an element. */
    'aria-roledescription'?: string
    /**
     * Defines the total number of rows in a table, grid, or treegrid.
     * @see aria-rowindex.
     */
    'aria-rowcount'?: number
    /**
     * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
     * @see aria-rowcount @see aria-rowspan.
     */
    'aria-rowindex'?: number
    /**
     * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-rowindex @see aria-colspan.
     */
    'aria-rowspan'?: number
    /**
     * Indicates the current "selected" state of various widgets.
     * @see aria-checked @see aria-pressed.
     */
    'aria-selected'?: boolean | 'false' | 'true'
    /**
     * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-posinset.
     */
    'aria-setsize'?: number
    /** Indicates if items in a table or grid are sorted in ascending or descending order. */
    'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other'
    /** Defines the maximum allowed value for a range widget. */
    'aria-valuemax'?: number
    /** Defines the minimum allowed value for a range widget. */
    'aria-valuemin'?: number
    /**
     * Defines the current value for a range widget.
     * @see aria-valuetext.
     */
    'aria-valuenow'?: number
    /** Defines the human readable text alternative of aria-valuenow for a range widget. */
    'aria-valuetext'?: string
  }

  interface AllHTMLAttributes<T> extends HTMLAttributes<T> {
    // Standard HTML Attributes
    accept?: string
    acceptCharset?: string
    action?: string
    allowFullScreen?: boolean
    allowTransparency?: boolean
    alt?: string
    as?: string
    async?: boolean
    autoComplete?: string
    autoFocus?: boolean
    autoPlay?: boolean
    capture?: boolean | string
    cellPadding?: number | string
    cellSpacing?: number | string
    charSet?: string
    challenge?: string
    checked?: boolean
    cite?: string
    classID?: string
    cols?: number
    colSpan?: number
    content?: string
    controls?: boolean
    coords?: string
    crossOrigin?: string
    data?: string
    dateTime?: string
    default?: boolean
    defer?: boolean
    disabled?: boolean
    download?: any
    encType?: string
    form?: string
    formAction?: string
    formEncType?: string
    formMethod?: string
    formNoValidate?: boolean
    formTarget?: string
    frameBorder?: number | string
    headers?: string
    height?: number | string
    high?: number
    href?: string
    hrefLang?: string
    htmlFor?: string
    httpEquiv?: string
    integrity?: string
    keyParams?: string
    keyType?: string
    kind?: string
    label?: string
    list?: string
    loop?: boolean
    low?: number
    manifest?: string
    marginHeight?: number
    marginWidth?: number
    max?: number | string
    maxLength?: number
    media?: string
    mediaGroup?: string
    method?: string
    min?: number | string
    minLength?: number
    multiple?: boolean
    muted?: boolean
    name?: string
    nonce?: string
    noValidate?: boolean
    open?: boolean
    optimum?: number
    pattern?: string
    placeholder?: string
    playsInline?: boolean
    poster?: string
    preload?: string
    readOnly?: boolean
    rel?: string
    required?: boolean
    reversed?: boolean
    rows?: number
    rowSpan?: number
    sandbox?: string
    scope?: string
    scoped?: boolean
    scrolling?: string
    seamless?: boolean
    selected?: boolean
    shape?: string
    size?: number
    sizes?: string
    span?: number
    src?: string
    srcDoc?: string
    srcLang?: string
    srcSet?: string
    start?: number
    step?: number | string
    summary?: string
    target?: string
    type?: string
    useMap?: string
    value?: string | string[] | number
    width?: number | string
    wmode?: string
    wrap?: string
  }

  interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    download?: any
    href?: string
    hrefLang?: string
    media?: string
    rel?: string
    target?: string
    type?: string
  }

  // tslint:disable-next-line:no-empty-interface
  interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {}

  interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string
    coords?: string
    download?: any
    href?: string
    hrefLang?: string
    media?: string
    rel?: string
    shape?: string
    target?: string
  }

  interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
    href?: string
    target?: string
  }

  interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string
  }

  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    autoFocus?: boolean
    disabled?: boolean
    form?: string
    formAction?: string
    formEncType?: string
    formMethod?: string
    formNoValidate?: boolean
    formTarget?: string
    name?: string
    type?: string
    value?: string | string[] | number
  }

  interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string
    width?: number | string
  }

  interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number
    width?: number | string
  }

  interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number
  }

  interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: boolean
  }

  interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string
    dateTime?: string
  }

  interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: boolean
  }

  interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string
    src?: string
    type?: string
    width?: number | string
  }

  interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean
    form?: string
    name?: string
  }

  interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    acceptCharset?: string
    action?: string
    autoComplete?: string
    encType?: string
    method?: string
    name?: string
    noValidate?: boolean
    target?: string
  }

  interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
    manifest?: string
  }

  interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    allow?: string
    allowFullScreen?: boolean
    allowTransparency?: boolean
    frameBorder?: number | string
    height?: number | string
    marginHeight?: number
    marginWidth?: number
    name?: string
    sandbox?: string
    scrolling?: string
    seamless?: boolean
    src?: string
    srcDoc?: string
    width?: number | string
  }

  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string
    crossOrigin?: 'anonymous' | 'use-credentials' | ''
    decoding?: 'async' | 'auto' | 'sync'
    height?: number | string
    sizes?: string
    src?: string
    srcSet?: string
    useMap?: string
    width?: number | string
  }

  interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string
    dateTime?: string
  }

  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    accept?: string
    alt?: string
    autoComplete?: string
    autoFocus?: boolean
    capture?: boolean | string // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
    checked?: boolean
    crossOrigin?: string
    disabled?: boolean
    form?: string
    formAction?: string
    formEncType?: string
    formMethod?: string
    formNoValidate?: boolean
    formTarget?: string
    height?: number | string
    list?: string
    max?: number | string
    maxLength?: number
    min?: number | string
    minLength?: number
    multiple?: boolean
    name?: string
    pattern?: string
    placeholder?: string
    readOnly?: boolean
    required?: boolean
    size?: number
    src?: string
    step?: number | string
    type?: string
    value?: string | string[] | number
    width?: number | string

    onChange?: ChangeEventHandler<T>
  }

  interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
    autoFocus?: boolean
    challenge?: string
    disabled?: boolean
    form?: string
    keyType?: string
    keyParams?: string
    name?: string
  }

  interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string
    htmlFor?: string
  }

  interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | string[] | number
  }

  interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
    as?: string
    crossOrigin?: string
    href?: string
    hrefLang?: string
    integrity?: string
    media?: string
    rel?: string
    sizes?: string
    type?: string
  }

  interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string
  }

  interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string
  }

  interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
    autoPlay?: boolean
    controls?: boolean
    controlsList?: string
    crossOrigin?: string
    loop?: boolean
    mediaGroup?: string
    muted?: boolean
    playsinline?: boolean
    preload?: string
    src?: string
  }

  interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
    charSet?: string
    content?: string
    httpEquiv?: string
    name?: string
  }

  interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string
    high?: number
    low?: number
    max?: number | string
    min?: number | string
    optimum?: number
    value?: string | string[] | number
  }

  interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string
  }

  interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
    classID?: string
    data?: string
    form?: string
    height?: number | string
    name?: string
    type?: string
    useMap?: string
    width?: number | string
    wmode?: string
  }

  interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
    reversed?: boolean
    start?: number
    type?: '1' | 'a' | 'A' | 'i' | 'I'
  }

  interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean
    label?: string
  }

  interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean
    label?: string
    selected?: boolean
    value?: string | string[] | number
  }

  interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string
    htmlFor?: string
    name?: string
  }

  interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string
    value?: string | string[] | number
  }

  interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
    max?: number | string
    value?: string | string[] | number
  }

  interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
    async?: boolean
    charSet?: string
    crossOrigin?: string
    defer?: boolean
    integrity?: string
    noModule?: boolean
    nonce?: string
    src?: string
    type?: string
  }

  interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    autoComplete?: string
    autoFocus?: boolean
    disabled?: boolean
    form?: string
    multiple?: boolean
    name?: string
    required?: boolean
    size?: number
    value?: string | string[] | number
    onChange?: ChangeEventHandler<T>
  }

  interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string
    sizes?: string
    src?: string
    srcSet?: string
    type?: string
  }

  interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string
    nonce?: string
    scoped?: boolean
    type?: string
  }

  interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
    cellPadding?: number | string
    cellSpacing?: number | string
    summary?: string
  }

  interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    autoComplete?: string
    autoFocus?: boolean
    cols?: number
    dirName?: string
    disabled?: boolean
    form?: string
    maxLength?: number
    minLength?: number
    name?: string
    placeholder?: string
    readOnly?: boolean
    required?: boolean
    rows?: number
    value?: string | string[] | number
    wrap?: string

    onChange?: ChangeEventHandler<T>
  }

  interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: 'left' | 'center' | 'right' | 'justify' | 'char'
    colSpan?: number
    headers?: string
    rowSpan?: number
    scope?: string
  }

  interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: 'left' | 'center' | 'right' | 'justify' | 'char'
    colSpan?: number
    headers?: string
    rowSpan?: number
    scope?: string
  }

  interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
    dateTime?: string
  }

  interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
    default?: boolean
    kind?: string
    label?: string
    src?: string
    srcLang?: string
  }

  interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
    height?: number | string
    playsInline?: boolean
    poster?: string
    width?: number | string
  }

  // this list is "complete" in that it contains every SVG attribute
  // that React supports, but the types can be improved.
  // Full list here: https://facebook.github.io/react/docs/dom-elements.html
  //
  // The three broad type categories are (in order of restrictiveness):
  //   - "number | string"
  //   - "string"
  //   - union of string literals
  interface SVGAttributes<T> extends DOMAttributes<T> {
    // Attributes which also defined in HTMLAttributes
    // See comment in SVGDOMPropertyConfig.js
    className?: string
    color?: string
    height?: number | string
    id?: string
    lang?: string
    max?: number | string
    media?: string
    method?: string
    min?: number | string
    name?: string
    style?: any
    target?: string
    type?: string
    width?: number | string

    // Other HTML properties supported by SVG elements in browsers
    role?: string
    tabIndex?: number

    // SVG Specific attributes
    accentHeight?: number | string
    accumulate?: 'none' | 'sum'
    additive?: 'replace' | 'sum'
    alignmentBaseline?:
      | 'auto'
      | 'baseline'
      | 'before-edge'
      | 'text-before-edge'
      | 'middle'
      | 'central'
      | 'after-edge'
      | 'text-after-edge'
      | 'ideographic'
      | 'alphabetic'
      | 'hanging'
      | 'mathematical'
      | 'inherit'
    allowReorder?: 'no' | 'yes'
    alphabetic?: number | string
    amplitude?: number | string
    arabicForm?: 'initial' | 'medial' | 'terminal' | 'isolated'
    ascent?: number | string
    attributeName?: string
    attributeType?: string
    autoReverse?: number | string
    azimuth?: number | string
    baseFrequency?: number | string
    baselineShift?: number | string
    baseProfile?: number | string
    bbox?: number | string
    begin?: number | string
    bias?: number | string
    by?: number | string
    calcMode?: number | string
    capHeight?: number | string
    clip?: number | string
    clipPath?: string
    clipPathUnits?: number | string
    clipRule?: number | string
    colorInterpolation?: number | string
    colorInterpolationFilters?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit'
    colorProfile?: number | string
    colorRendering?: number | string
    contentScriptType?: number | string
    contentStyleType?: number | string
    cursor?: number | string
    cx?: number | string
    cy?: number | string
    d?: string
    decelerate?: number | string
    descent?: number | string
    diffuseConstant?: number | string
    direction?: number | string
    display?: number | string
    divisor?: number | string
    dominantBaseline?: number | string
    dur?: number | string
    dx?: number | string
    dy?: number | string
    edgeMode?: number | string
    elevation?: number | string
    enableBackground?: number | string
    end?: number | string
    exponent?: number | string
    externalResourcesRequired?: number | string
    fill?: string
    fillOpacity?: number | string
    fillRule?: 'nonzero' | 'evenodd' | 'inherit'
    filter?: string
    filterRes?: number | string
    filterUnits?: number | string
    floodColor?: number | string
    floodOpacity?: number | string
    focusable?: number | string
    fontFamily?: string
    fontSize?: number | string
    fontSizeAdjust?: number | string
    fontStretch?: number | string
    fontStyle?: number | string
    fontVariant?: number | string
    fontWeight?: number | string
    format?: number | string
    from?: number | string
    fx?: number | string
    fy?: number | string
    g1?: number | string
    g2?: number | string
    glyphName?: number | string
    glyphOrientationHorizontal?: number | string
    glyphOrientationVertical?: number | string
    glyphRef?: number | string
    gradientTransform?: string
    gradientUnits?: string
    hanging?: number | string
    horizAdvX?: number | string
    horizOriginX?: number | string
    href?: string
    ideographic?: number | string
    imageRendering?: number | string
    in2?: number | string
    in?: string
    intercept?: number | string
    k1?: number | string
    k2?: number | string
    k3?: number | string
    k4?: number | string
    k?: number | string
    kernelMatrix?: number | string
    kernelUnitLength?: number | string
    kerning?: number | string
    keyPoints?: number | string
    keySplines?: number | string
    keyTimes?: number | string
    lengthAdjust?: number | string
    letterSpacing?: number | string
    lightingColor?: number | string
    limitingConeAngle?: number | string
    local?: number | string
    markerEnd?: string
    markerHeight?: number | string
    markerMid?: string
    markerStart?: string
    markerUnits?: number | string
    markerWidth?: number | string
    mask?: string
    maskContentUnits?: number | string
    maskUnits?: number | string
    mathematical?: number | string
    mode?: number | string
    numOctaves?: number | string
    offset?: number | string
    opacity?: number | string
    operator?: number | string
    order?: number | string
    orient?: number | string
    orientation?: number | string
    origin?: number | string
    overflow?: number | string
    overlinePosition?: number | string
    overlineThickness?: number | string
    paintOrder?: number | string
    panose1?: number | string
    pathLength?: number | string
    patternContentUnits?: string
    patternTransform?: number | string
    patternUnits?: string
    pointerEvents?: number | string
    points?: string
    pointsAtX?: number | string
    pointsAtY?: number | string
    pointsAtZ?: number | string
    preserveAlpha?: number | string
    preserveAspectRatio?: string
    primitiveUnits?: number | string
    r?: number | string
    radius?: number | string
    refX?: number | string
    refY?: number | string
    renderingIntent?: number | string
    repeatCount?: number | string
    repeatDur?: number | string
    requiredExtensions?: number | string
    requiredFeatures?: number | string
    restart?: number | string
    result?: string
    rotate?: number | string
    rx?: number | string
    ry?: number | string
    scale?: number | string
    seed?: number | string
    shapeRendering?: number | string
    slope?: number | string
    spacing?: number | string
    specularConstant?: number | string
    specularExponent?: number | string
    speed?: number | string
    spreadMethod?: string
    startOffset?: number | string
    stdDeviation?: number | string
    stemh?: number | string
    stemv?: number | string
    stitchTiles?: number | string
    stopColor?: string
    stopOpacity?: number | string
    strikethroughPosition?: number | string
    strikethroughThickness?: number | string
    string?: number | string
    stroke?: string
    strokeDasharray?: string | number
    strokeDashoffset?: string | number
    strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit'
    strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit'
    strokeMiterlimit?: number | string
    strokeOpacity?: number | string
    strokeWidth?: number | string
    surfaceScale?: number | string
    systemLanguage?: number | string
    tableValues?: number | string
    targetX?: number | string
    targetY?: number | string
    textAnchor?: string
    textDecoration?: number | string
    textLength?: number | string
    textRendering?: number | string
    to?: number | string
    transform?: string
    u1?: number | string
    u2?: number | string
    underlinePosition?: number | string
    underlineThickness?: number | string
    unicode?: number | string
    unicodeBidi?: number | string
    unicodeRange?: number | string
    unitsPerEm?: number | string
    vAlphabetic?: number | string
    values?: string
    vectorEffect?: number | string
    version?: string
    vertAdvY?: number | string
    vertOriginX?: number | string
    vertOriginY?: number | string
    vHanging?: number | string
    vIdeographic?: number | string
    viewBox?: string
    viewTarget?: number | string
    visibility?: number | string
    vMathematical?: number | string
    widths?: number | string
    wordSpacing?: number | string
    writingMode?: number | string
    x1?: number | string
    x2?: number | string
    x?: number | string
    xChannelSelector?: string
    xHeight?: number | string
    xlinkActuate?: string
    xlinkArcrole?: string
    xlinkHref?: string
    xlinkRole?: string
    xlinkShow?: string
    xlinkTitle?: string
    xlinkType?: string
    xmlBase?: string
    xmlLang?: string
    xmlns?: string
    xmlnsXlink?: string
    xmlSpace?: string
    y1?: number | string
    y2?: number | string
    y?: number | string
    yChannelSelector?: string
    z?: number | string
    zoomAndPan?: string
  }

  interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
    allowFullScreen?: boolean
    allowpopups?: boolean
    autoFocus?: boolean
    autosize?: boolean
    blinkfeatures?: string
    disableblinkfeatures?: string
    disableguestresize?: boolean
    disablewebsecurity?: boolean
    guestinstance?: string
    httpreferrer?: string
    nodeintegration?: boolean
    partition?: string
    plugins?: boolean
    preload?: string
    src?: string
    useragent?: string
    webpreferences?: string
  }

  // tslint:disable-next-line:no-empty-interface
  interface Element extends ReactElement<any, any> {}
  interface ElementClass extends Component<any> {
    render(): ReactNode
  }
  interface ElementAttributesProperty {
    props: {}
  }
  interface ElementChildrenAttribute {
    children: {}
  }

  // tslint:disable-next-line:no-empty-interface
  interface IntrinsicAttributes {
    key?: Key
  }
  // tslint:disable-next-line:no-empty-interface
  interface IntrinsicClassAttributes<T> {
    key?: Key
  }

  interface IntrinsicElements {
    // HTML
    a: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
    abbr: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    address: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    area: DetailedHTMLProps<AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>
    article: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    aside: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    audio: DetailedHTMLProps<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>
    b: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    base: DetailedHTMLProps<BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>
    bdi: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    bdo: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    big: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    blockquote: DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>
    body: DetailedHTMLProps<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>
    br: DetailedHTMLProps<HTMLAttributes<HTMLBRElement>, HTMLBRElement>
    button: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    canvas: DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>
    caption: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    cite: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    code: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    col: DetailedHTMLProps<ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>
    colgroup: DetailedHTMLProps<ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>
    data: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    datalist: DetailedHTMLProps<HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>
    dd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    del: DetailedHTMLProps<DelHTMLAttributes<HTMLElement>, HTMLElement>
    details: DetailedHTMLProps<DetailsHTMLAttributes<HTMLElement>, HTMLElement>
    dfn: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    dialog: DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>
    div: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    dl: DetailedHTMLProps<HTMLAttributes<HTMLDListElement>, HTMLDListElement>
    dt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    em: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    embed: DetailedHTMLProps<EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>
    fieldset: DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>
    figcaption: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    figure: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    footer: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    form: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
    h1: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    h2: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    h3: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    h4: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    h5: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    h6: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    head: DetailedHTMLProps<HTMLAttributes<HTMLHeadElement>, HTMLHeadElement>
    header: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    hgroup: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    hr: DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>
    html: DetailedHTMLProps<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>
    i: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    iframe: DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>
    img: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
    input: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    ins: DetailedHTMLProps<InsHTMLAttributes<HTMLModElement>, HTMLModElement>
    kbd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    keygen: DetailedHTMLProps<KeygenHTMLAttributes<HTMLElement>, HTMLElement>
    label: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
    legend: DetailedHTMLProps<HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>
    li: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
    link: DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>
    main: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    map: DetailedHTMLProps<MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>
    mark: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    menu: DetailedHTMLProps<MenuHTMLAttributes<HTMLElement>, HTMLElement>
    menuitem: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    meta: DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>
    meter: DetailedHTMLProps<MeterHTMLAttributes<HTMLElement>, HTMLElement>
    nav: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    noindex: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    noscript: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    object: DetailedHTMLProps<ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>
    ol: DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>
    optgroup: DetailedHTMLProps<OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>
    option: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>
    output: DetailedHTMLProps<OutputHTMLAttributes<HTMLElement>, HTMLElement>
    p: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
    param: DetailedHTMLProps<ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>
    picture: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    pre: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
    progress: DetailedHTMLProps<ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>
    q: DetailedHTMLProps<QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>
    rp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    rt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    ruby: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    s: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    samp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    script: DetailedHTMLProps<ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>
    section: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    select: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
    small: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    source: DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>
    span: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
    strong: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    style: DetailedHTMLProps<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>
    sub: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    summary: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    sup: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    table: DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>
    tbody: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
    td: DetailedHTMLProps<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>
    textarea: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
    tfoot: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
    th: DetailedHTMLProps<ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>
    thead: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
    time: DetailedHTMLProps<TimeHTMLAttributes<HTMLElement>, HTMLElement>
    title: DetailedHTMLProps<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>
    tr: DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>
    track: DetailedHTMLProps<TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>
    u: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    ul: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
    var: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    video: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>
    wbr: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    webview: DetailedHTMLProps<WebViewHTMLAttributes<HTMLWebViewElement>, HTMLWebViewElement>

    // SVG
    svg: SVGProps<SVGSVGElement>

    animate: SVGProps<SVGElement> // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
    animateMotion: SVGProps<SVGElement>
    animateTransform: SVGProps<SVGElement> // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
    circle: SVGProps<SVGCircleElement>
    clipPath: SVGProps<SVGClipPathElement>
    defs: SVGProps<SVGDefsElement>
    desc: SVGProps<SVGDescElement>
    ellipse: SVGProps<SVGEllipseElement>
    feBlend: SVGProps<SVGFEBlendElement>
    feColorMatrix: SVGProps<SVGFEColorMatrixElement>
    feComponentTransfer: SVGProps<SVGFEComponentTransferElement>
    feComposite: SVGProps<SVGFECompositeElement>
    feConvolveMatrix: SVGProps<SVGFEConvolveMatrixElement>
    feDiffuseLighting: SVGProps<SVGFEDiffuseLightingElement>
    feDisplacementMap: SVGProps<SVGFEDisplacementMapElement>
    feDistantLight: SVGProps<SVGFEDistantLightElement>
    feFlood: SVGProps<SVGFEFloodElement>
    feFuncA: SVGProps<SVGFEFuncAElement>
    feFuncB: SVGProps<SVGFEFuncBElement>
    feFuncG: SVGProps<SVGFEFuncGElement>
    feFuncR: SVGProps<SVGFEFuncRElement>
    feGaussianBlur: SVGProps<SVGFEGaussianBlurElement>
    feImage: SVGProps<SVGFEImageElement>
    feMerge: SVGProps<SVGFEMergeElement>
    feMergeNode: SVGProps<SVGFEMergeNodeElement>
    feMorphology: SVGProps<SVGFEMorphologyElement>
    feOffset: SVGProps<SVGFEOffsetElement>
    fePointLight: SVGProps<SVGFEPointLightElement>
    feSpecularLighting: SVGProps<SVGFESpecularLightingElement>
    feSpotLight: SVGProps<SVGFESpotLightElement>
    feTile: SVGProps<SVGFETileElement>
    feTurbulence: SVGProps<SVGFETurbulenceElement>
    filter: SVGProps<SVGFilterElement>
    foreignObject: SVGProps<SVGForeignObjectElement>
    g: SVGProps<SVGGElement>
    image: SVGProps<SVGImageElement>
    line: SVGProps<SVGLineElement>
    linearGradient: SVGProps<SVGLinearGradientElement>
    marker: SVGProps<SVGMarkerElement>
    mask: SVGProps<SVGMaskElement>
    metadata: SVGProps<SVGMetadataElement>
    mpath: SVGProps<SVGElement>
    path: SVGProps<SVGPathElement>
    pattern: SVGProps<SVGPatternElement>
    polygon: SVGProps<SVGPolygonElement>
    polyline: SVGProps<SVGPolylineElement>
    radialGradient: SVGProps<SVGRadialGradientElement>
    rect: SVGProps<SVGRectElement>
    stop: SVGProps<SVGStopElement>
    switch: SVGProps<SVGSwitchElement>
    symbol: SVGProps<SVGSymbolElement>
    text: SVGProps<SVGTextElement>
    textPath: SVGProps<SVGTextPathElement>
    tspan: SVGProps<SVGTSpanElement>
    use: SVGProps<SVGUseElement>
    view: SVGProps<SVGViewElement>
  }
}

// -----------[[UIKitGlobal]]----------//

interface BaseProps {
  /**
   * CSS class name.
   */
  className?: string

  children?: ReactNode

  [key: string]: any
}

// -----------[[IconNames]]----------//
interface IconNameGlobal {
  AirFreshener: 'air-freshener'
  AddressCard: 'address-card'
  AddressBook: 'address-book'
  Adjust: 'adjust'
  AlarmClock: 'alarm-clock'
  AlignJustify: 'align-justify'
  AlignLeft: 'align-left'
  AlignRight: 'align-right'
  AlignCenter: 'align-center'
  AmericanSignLanguageInterpreting: 'american-sign-language-interpreting'
  Ambulance: 'ambulance'
  Allergies: 'allergies'
  Anchor: 'anchor'
  AngleDoubleDown: 'angle-double-down'
  AngleDoubleLeft: 'angle-double-left'
  AngleDoubleRight: 'angle-double-right'
  AngleDown: 'angle-down'
  AngleDoubleUp: 'angle-double-up'
  AngleLeft: 'angle-left'
  AngleUp: 'angle-up'
  AngleRight: 'angle-right'
  Angry: 'angry'
  AppleAlt: 'apple-alt'
  ArrowAltCircleDown: 'arrow-alt-circle-down'
  Archive: 'archive'
  Archway: 'archway'
  ArrowAltCircleRight: 'arrow-alt-circle-right'
  ArrowAltCircleUp: 'arrow-alt-circle-up'
  ArrowAltCircleLeft: 'arrow-alt-circle-left'
  ArrowAltFromBottom: 'arrow-alt-from-bottom'
  ArrowAltFromRight: 'arrow-alt-from-right'
  ArrowAltDown: 'arrow-alt-down'
  ArrowAltFromLeft: 'arrow-alt-from-left'
  ArrowAltFromTop: 'arrow-alt-from-top'
  ArrowAltLeft: 'arrow-alt-left'
  ArrowAltRight: 'arrow-alt-right'
  ArrowAltSquareDown: 'arrow-alt-square-down'
  ArrowAltSquareLeft: 'arrow-alt-square-left'
  ArrowAltSquareRight: 'arrow-alt-square-right'
  ArrowAltSquareUp: 'arrow-alt-square-up'
  ArrowAltToLeft: 'arrow-alt-to-left'
  ArrowAltToBottom: 'arrow-alt-to-bottom'
  ArrowAltToRight: 'arrow-alt-to-right'
  ArrowAltUp: 'arrow-alt-up'
  ArrowAltToTop: 'arrow-alt-to-top'
  ArrowCircleLeft: 'arrow-circle-left'
  ArrowCircleRight: 'arrow-circle-right'
  ArrowCircleDown: 'arrow-circle-down'
  ArrowCircleUp: 'arrow-circle-up'
  ArrowDown: 'arrow-down'
  ArrowFromLeft: 'arrow-from-left'
  ArrowFromBottom: 'arrow-from-bottom'
  ArrowFromRight: 'arrow-from-right'
  ArrowFromTop: 'arrow-from-top'
  ArrowSquareLeft: 'arrow-square-left'
  ArrowSquareDown: 'arrow-square-down'
  ArrowLeft: 'arrow-left'
  ArrowRight: 'arrow-right'
  ArrowSquareUp: 'arrow-square-up'
  ArrowSquareRight: 'arrow-square-right'
  ArrowToBottom: 'arrow-to-bottom'
  ArrowToLeft: 'arrow-to-left'
  ArrowToRight: 'arrow-to-right'
  ArrowToTop: 'arrow-to-top'
  ArrowsAltV: 'arrows-alt-v'
  ArrowUp: 'arrow-up'
  ArrowsAltH: 'arrows-alt-h'
  ArrowsH: 'arrows-h'
  ArrowsAlt: 'arrows-alt'
  ArrowsV: 'arrows-v'
  Arrows: 'arrows'
  AssistiveListeningSystems: 'assistive-listening-systems'
  Atlas: 'atlas'
  AtomAlt: 'atom-alt'
  Asterisk: 'asterisk'
  At: 'at'
  AudioDescription: 'audio-description'
  Atom: 'atom'
  Award: 'award'
  Backpack: 'backpack'
  Backspace: 'backspace'
  Backward: 'backward'
  BadgeCheck: 'badge-check'
  Badge: 'badge'
  BalanceScaleLeft: 'balance-scale-left'
  Ban: 'ban'
  BalanceScaleRight: 'balance-scale-right'
  BalanceScale: 'balance-scale'
  BandAid: 'band-aid'
  BarcodeAlt: 'barcode-alt'
  BarcodeRead: 'barcode-read'
  Barcode: 'barcode'
  BarcodeScan: 'barcode-scan'
  Bars: 'bars'
  BaseballBall: 'baseball-ball'
  Baseball: 'baseball'
  BasketballBall: 'basketball-ball'
  BasketballHoop: 'basketball-hoop'
  Bath: 'bath'
  BatteryFull: 'battery-full'
  BatteryBolt: 'battery-bolt'
  BatteryEmpty: 'battery-empty'
  BatteryQuarter: 'battery-quarter'
  BatteryHalf: 'battery-half'
  BatterySlash: 'battery-slash'
  BatteryThreeQuarters: 'battery-three-quarters'
  Bed: 'bed'
  Beer: 'beer'
  BellSchoolSlash: 'bell-school-slash'
  BellSlash: 'bell-slash'
  BellSchool: 'bell-school'
  Bell: 'bell'
  Bicycle: 'bicycle'
  Binoculars: 'binoculars'
  BezierCurve: 'bezier-curve'
  BirthdayCake: 'birthday-cake'
  Blanket: 'blanket'
  Blender: 'blender'
  Blind: 'blind'
  Bolt: 'bolt'
  Bold: 'bold'
  BoneBreak: 'bone-break'
  Bone: 'bone'
  Bomb: 'bomb'
  Bong: 'bong'
  BookAlt: 'book-alt'
  BookHeart: 'book-heart'
  Book: 'book'
  BookReader: 'book-reader'
  BookOpen: 'book-open'
  Bookmark: 'bookmark'
  Books: 'books'
  BowlingBall: 'bowling-ball'
  BowlingPins: 'bowling-pins'
  BoxAlt: 'box-alt'
  BoxHeart: 'box-heart'
  BoxFragile: 'box-fragile'
  BoxCheck: 'box-check'
  BoxFull: 'box-full'
  BoxOpen: 'box-open'
  BoxUp: 'box-up'
  Box: 'box'
  BoxUsd: 'box-usd'
  BoxesAlt: 'boxes-alt'
  Boxes: 'boxes'
  Brain: 'brain'
  BoxingGlove: 'boxing-glove'
  Braille: 'braille'
  BriefcaseMedical: 'briefcase-medical'
  Briefcase: 'briefcase'
  BroadcastTower: 'broadcast-tower'
  Broom: 'broom'
  Brush: 'brush'
  Browser: 'browser'
  Bug: 'bug'
  Bullhorn: 'bullhorn'
  Building: 'building'
  Bullseye: 'bullseye'
  Burn: 'burn'
  BusAlt: 'bus-alt'
  BusSchool: 'bus-school'
  Bus: 'bus'
  Calculator: 'calculator'
  CalendarCheck: 'calendar-check'
  CalendarEdit: 'calendar-edit'
  CalendarMinus: 'calendar-minus'
  CalendarAlt: 'calendar-alt'
  CalendarExclamation: 'calendar-exclamation'
  CalendarPlus: 'calendar-plus'
  CalendarTimes: 'calendar-times'
  Calendar: 'calendar'
  CameraAlt: 'camera-alt'
  CameraRetro: 'camera-retro'
  Cannabis: 'cannabis'
  CarAlt: 'car-alt'
  CarBattery: 'car-battery'
  Camera: 'camera'
  Capsules: 'capsules'
  CarCrash: 'car-crash'
  CarBump: 'car-bump'
  CarGarage: 'car-garage'
  CarMechanic: 'car-mechanic'
  CarSide: 'car-side'
  CarTilt: 'car-tilt'
  Car: 'car'
  CaretCircleDown: 'caret-circle-down'
  CarWash: 'car-wash'
  CaretCircleLeft: 'caret-circle-left'
  CaretCircleRight: 'caret-circle-right'
  CaretDown: 'caret-down'
  CaretCircleUp: 'caret-circle-up'
  CaretLeft: 'caret-left'
  CaretRight: 'caret-right'
  CaretSquareDown: 'caret-square-down'
  CaretSquareLeft: 'caret-square-left'
  CaretUp: 'caret-up'
  CaretSquareUp: 'caret-square-up'
  CaretSquareRight: 'caret-square-right'
  CartArrowDown: 'cart-arrow-down'
  CartPlus: 'cart-plus'
  ChalkboardTeacher: 'chalkboard-teacher'
  Chalkboard: 'chalkboard'
  Certificate: 'certificate'
  ChargingStation: 'charging-station'
  ChartArea: 'chart-area'
  ChartPie: 'chart-pie'
  ChartBar: 'chart-bar'
  ChartLine: 'chart-line'
  CheckDouble: 'check-double'
  CheckSquare: 'check-square'
  CheckCircle: 'check-circle'
  Check: 'check'
  ChessBishopAlt: 'chess-bishop-alt'
  ChessBoard: 'chess-board'
  ChessClock: 'chess-clock'
  ChessClockAlt: 'chess-clock-alt'
  ChessBishop: 'chess-bishop'
  ChessKing: 'chess-king'
  ChessKingAlt: 'chess-king-alt'
  ChessKnightAlt: 'chess-knight-alt'
  ChessKnight: 'chess-knight'
  ChessPawnAlt: 'chess-pawn-alt'
  ChessPawn: 'chess-pawn'
  ChessQueen: 'chess-queen'
  ChessQueenAlt: 'chess-queen-alt'
  ChessRookAlt: 'chess-rook-alt'
  ChessRook: 'chess-rook'
  ChevronCircleLeft: 'chevron-circle-left'
  Chess: 'chess'
  ChevronCircleDown: 'chevron-circle-down'
  ChevronCircleRight: 'chevron-circle-right'
  ChevronCircleUp: 'chevron-circle-up'
  ChevronDoubleLeft: 'chevron-double-left'
  ChevronDoubleRight: 'chevron-double-right'
  ChevronDoubleUp: 'chevron-double-up'
  ChevronDoubleDown: 'chevron-double-down'
  ChevronRight: 'chevron-right'
  ChevronLeft: 'chevron-left'
  ChevronDown: 'chevron-down'
  ChevronSquareDown: 'chevron-square-down'
  ChevronSquareLeft: 'chevron-square-left'
  ChevronUp: 'chevron-up'
  ChevronSquareRight: 'chevron-square-right'
  ChevronSquareUp: 'chevron-square-up'
  Child: 'child'
  Church: 'church'
  ClipboardCheck: 'clipboard-check'
  CircleNotch: 'circle-notch'
  Circle: 'circle'
  ClipboardList: 'clipboard-list'
  ClipboardPrescription: 'clipboard-prescription'
  Clipboard: 'clipboard'
  Clone: 'clone'
  ClosedCaptioning: 'closed-captioning'
  Clock: 'clock'
  CloudDownload: 'cloud-download'
  CloudDownloadAlt: 'cloud-download-alt'
  CloudUploadAlt: 'cloud-upload-alt'
  CloudUpload: 'cloud-upload'
  Cloud: 'cloud'
  Cocktail: 'cocktail'
  Club: 'club'
  CodeCommit: 'code-commit'
  CodeMerge: 'code-merge'
  CodeBranch: 'code-branch'
  Code: 'code'
  Coffee: 'coffee'
  Cog: 'cog'
  Columns: 'columns'
  Coins: 'coins'
  Cogs: 'cogs'
  CommentAltCheck: 'comment-alt-check'
  CommentAltDots: 'comment-alt-dots'
  CommentAltLines: 'comment-alt-lines'
  CommentAltEdit: 'comment-alt-edit'
  CommentAltExclamation: 'comment-alt-exclamation'
  CommentAltMinus: 'comment-alt-minus'
  CommentAltPlus: 'comment-alt-plus'
  CommentAltSlash: 'comment-alt-slash'
  CommentAltTimes: 'comment-alt-times'
  CommentAltSmile: 'comment-alt-smile'
  CommentAlt: 'comment-alt'
  CommentDots: 'comment-dots'
  CommentCheck: 'comment-check'
  CommentExclamation: 'comment-exclamation'
  CommentEdit: 'comment-edit'
  CommentLines: 'comment-lines'
  CommentPlus: 'comment-plus'
  CommentMinus: 'comment-minus'
  CommentSmile: 'comment-smile'
  CommentTimes: 'comment-times'
  CommentSlash: 'comment-slash'
  CommentsAlt: 'comments-alt'
  Comment: 'comment'
  Comments: 'comments'
  CompassSlash: 'compass-slash'
  CompactDisc: 'compact-disc'
  Compass: 'compass'
  CompressAlt: 'compress-alt'
  CompressWide: 'compress-wide'
  ContainerStorage: 'container-storage'
  Compress: 'compress'
  ConciergeBell: 'concierge-bell'
  ConveyorBeltAlt: 'conveyor-belt-alt'
  ConveyorBelt: 'conveyor-belt'
  Copy: 'copy'
  Cookie: 'cookie'
  CookieBite: 'cookie-bite'
  Copyright: 'copyright'
  Couch: 'couch'
  CreditCard: 'credit-card'
  CreditCardBlank: 'credit-card-blank'
  CreditCardFront: 'credit-card-front'
  Cricket: 'cricket'
  CropAlt: 'crop-alt'
  Crop: 'crop'
  Crow: 'crow'
  Crosshairs: 'crosshairs'
  Crown: 'crown'
  Cubes: 'cubes'
  Cube: 'cube'
  Curling: 'curling'
  Cut: 'cut'
  Database: 'database'
  Deaf: 'deaf'
  Desktop: 'desktop'
  DesktopAlt: 'desktop-alt'
  Diagnoses: 'diagnoses'
  DiceFive: 'dice-five'
  Diamond: 'diamond'
  DiceFour: 'dice-four'
  DiceOne: 'dice-one'
  DiceSix: 'dice-six'
  DiceThree: 'dice-three'
  Dice: 'dice'
  DiceTwo: 'dice-two'
  DigitalTachograph: 'digital-tachograph'
  Directions: 'directions'
  Divide: 'divide'
  Dizzy: 'dizzy'
  Diploma: 'diploma'
  Dna: 'dna'
  DollarSign: 'dollar-sign'
  DoNotEnter: 'do-not-enter'
  DollyEmpty: 'dolly-empty'
  DollyFlatbedAlt: 'dolly-flatbed-alt'
  DollyFlatbedEmpty: 'dolly-flatbed-empty'
  DollyFlatbed: 'dolly-flatbed'
  Donate: 'donate'
  Dolly: 'dolly'
  DoorClosed: 'door-closed'
  DotCircle: 'dot-circle'
  DoorOpen: 'door-open'
  Download: 'download'
  Dove: 'dove'
  DraftingCompass: 'drafting-compass'
  DrawCircle: 'draw-circle'
  DrawPolygon: 'draw-polygon'
  DrawSquare: 'draw-square'
  DrumSteelpan: 'drum-steelpan'
  Drum: 'drum'
  Edit: 'edit'
  Ear: 'ear'
  Dumbbell: 'dumbbell'
  EllipsisHAlt: 'ellipsis-h-alt'
  Eject: 'eject'
  EllipsisH: 'ellipsis-h'
  EllipsisV: 'ellipsis-v'
  EllipsisVAlt: 'ellipsis-v-alt'
  EnvelopeSquare: 'envelope-square'
  EngineWarning: 'engine-warning'
  EnvelopeOpen: 'envelope-open'
  Envelope: 'envelope'
  Equals: 'equals'
  Eraser: 'eraser'
  EuroSign: 'euro-sign'
  Exchange: 'exchange'
  ExchangeAlt: 'exchange-alt'
  ExclamationCircle: 'exclamation-circle'
  ExclamationTriangle: 'exclamation-triangle'
  ExclamationSquare: 'exclamation-square'
  Exclamation: 'exclamation'
  ExpandArrowsAlt: 'expand-arrows-alt'
  ExpandAlt: 'expand-alt'
  ExpandArrows: 'expand-arrows'
  ExpandWide: 'expand-wide'
  Expand: 'expand'
  ExternalLinkAlt: 'external-link-alt'
  ExternalLinkSquare: 'external-link-square'
  ExternalLink: 'external-link'
  ExternalLinkSquareAlt: 'external-link-square-alt'
  EyeSlash: 'eye-slash'
  Eye: 'eye'
  EyeDropper: 'eye-dropper'
  FastForward: 'fast-forward'
  FastBackward: 'fast-backward'
  Fax: 'fax'
  Feather: 'feather'
  FeatherAlt: 'feather-alt'
  Female: 'female'
  FieldHockey: 'field-hockey'
  FighterJet: 'fighter-jet'
  FileAlt: 'file-alt'
  FileArchive: 'file-archive'
  FileCertificate: 'file-certificate'
  FileAudio: 'file-audio'
  FileContract: 'file-contract'
  FileCheck: 'file-check'
  FileCode: 'file-code'
  FileDownload: 'file-download'
  FileEdit: 'file-edit'
  FileExcel: 'file-excel'
  FileExclamation: 'file-exclamation'
  FileExport: 'file-export'
  FileImage: 'file-image'
  FileImport: 'file-import'
  FileMedicalAlt: 'file-medical-alt'
  FileInvoiceDollar: 'file-invoice-dollar'
  FileInvoice: 'file-invoice'
  FileMedical: 'file-medical'
  FileMinus: 'file-minus'
  FilePdf: 'file-pdf'
  FilePlus: 'file-plus'
  FilePowerpoint: 'file-powerpoint'
  FileSignature: 'file-signature'
  FilePrescription: 'file-prescription'
  FileUpload: 'file-upload'
  FileTimes: 'file-times'
  File: 'file'
  FileWord: 'file-word'
  FillDrip: 'fill-drip'
  FileVideo: 'file-video'
  Fill: 'fill'
  Film: 'film'
  Filter: 'filter'
  FilmAlt: 'film-alt'
  Fingerprint: 'fingerprint'
  FireExtinguisher: 'fire-extinguisher'
  Fire: 'fire'
  FirstAid: 'first-aid'
  FlagCheckered: 'flag-checkered'
  Fish: 'fish'
  Flag: 'flag'
  Flask: 'flask'
  Flushed: 'flushed'
  FolderOpen: 'folder-open'
  FontAwesomeLogoFull: 'font-awesome-logo-full'
  Font: 'font'
  Folder: 'folder'
  FootballBall: 'football-ball'
  FootballHelmet: 'football-helmet'
  Frog: 'frog'
  Forklift: 'forklift'
  Fragile: 'fragile'
  FrownOpen: 'frown-open'
  Forward: 'forward'
  Gamepad: 'gamepad'
  Futbol: 'futbol'
  Frown: 'frown'
  GasPumpSlash: 'gas-pump-slash'
  Gavel: 'gavel'
  GasPump: 'gas-pump'
  Genderless: 'genderless'
  Gem: 'gem'
  Gift: 'gift'
  GlassesAlt: 'glasses-alt'
  GlassMartini: 'glass-martini'
  Glasses: 'glasses'
  GlassMartiniAlt: 'glass-martini-alt'
  GlobeAfrica: 'globe-africa'
  GlobeAsia: 'globe-asia'
  GlobeAmericas: 'globe-americas'
  Globe: 'globe'
  GlobeStand: 'globe-stand'
  GolfBall: 'golf-ball'
  GolfClub: 'golf-club'
  GraduationCap: 'graduation-cap'
  GreaterThan: 'greater-than'
  GreaterThanEqual: 'greater-than-equal'
  GrinAlt: 'grin-alt'
  Grimace: 'grimace'
  GrinBeamSweat: 'grin-beam-sweat'
  GrinHearts: 'grin-hearts'
  GrinSquint: 'grin-squint'
  GrinBeam: 'grin-beam'
  GrinSquintTears: 'grin-squint-tears'
  GrinStars: 'grin-stars'
  GrinTears: 'grin-tears'
  GrinTongue: 'grin-tongue'
  GrinTongueSquint: 'grin-tongue-squint'
  GrinTongueWink: 'grin-tongue-wink'
  GrinWink: 'grin-wink'
  Grin: 'grin'
  HSquare: 'h-square'
  GripVertical: 'grip-vertical'
  GripHorizontal: 'grip-horizontal'
  H1: 'h1'
  H2: 'h2'
  HandHoldingBox: 'hand-holding-box'
  H3: 'h3'
  HandHeart: 'hand-heart'
  HandHoldingHeart: 'hand-holding-heart'
  HandHoldingSeedling: 'hand-holding-seedling'
  HandHolding: 'hand-holding'
  HandHoldingUsd: 'hand-holding-usd'
  HandHoldingWater: 'hand-holding-water'
  HandLizard: 'hand-lizard'
  HandPaper: 'hand-paper'
  HandPointLeft: 'hand-point-left'
  HandPeace: 'hand-peace'
  HandPointDown: 'hand-point-down'
  HandPointRight: 'hand-point-right'
  HandPointUp: 'hand-point-up'
  HandReceiving: 'hand-receiving'
  HandScissors: 'hand-scissors'
  HandPointer: 'hand-pointer'
  HandRock: 'hand-rock'
  HandSpock: 'hand-spock'
  HandsHeart: 'hands-heart'
  Hands: 'hands'
  HandsHelping: 'hands-helping'
  HandsUsd: 'hands-usd'
  HandshakeAlt: 'handshake-alt'
  Handshake: 'handshake'
  Heading: 'heading'
  Hdd: 'hdd'
  Hashtag: 'hashtag'
  HeadphonesAlt: 'headphones-alt'
  Headphones: 'headphones'
  Headset: 'headset'
  HeartRate: 'heart-rate'
  HeartCircle: 'heart-circle'
  HeartSquare: 'heart-square'
  Heartbeat: 'heartbeat'
  Heart: 'heart'
  Hexagon: 'hexagon'
  Helicopter: 'helicopter'
  Highlighter: 'highlighter'
  HockeyPuck: 'hockey-puck'
  History: 'history'
  HomeHeart: 'home-heart'
  HockeySticks: 'hockey-sticks'
  Home: 'home'
  HospitalSymbol: 'hospital-symbol'
  HospitalAlt: 'hospital-alt'
  Hospital: 'hospital'
  HotTub: 'hot-tub'
  Hotel: 'hotel'
  HourglassEnd: 'hourglass-end'
  HourglassStart: 'hourglass-start'
  HourglassHalf: 'hourglass-half'
  Hourglass: 'hourglass'
  ICursor: 'i-cursor'
  IdBadge: 'id-badge'
  IdCardAlt: 'id-card-alt'
  IdCard: 'id-card'
  Images: 'images'
  Image: 'image'
  InboxIn: 'inbox-in'
  Inbox: 'inbox'
  InboxOut: 'inbox-out'
  Indent: 'indent'
  IndustryAlt: 'industry-alt'
  Industry: 'industry'
  Infinity: 'infinity'
  InfoCircle: 'info-circle'
  Info: 'info'
  InfoSquare: 'info-square'
  Inhaler: 'inhaler'
  Italic: 'italic'
  Inventory: 'inventory'
  JackOLantern: 'jack-o-lantern'
  Key: 'key'
  Joint: 'joint'
  Kidneys: 'kidneys'
  KissBeam: 'kiss-beam'
  Keyboard: 'keyboard'
  KissWinkHeart: 'kiss-wink-heart'
  KiwiBird: 'kiwi-bird'
  Kiss: 'kiss'
  Lamp: 'lamp'
  Language: 'language'
  LaptopCode: 'laptop-code'
  LaughBeam: 'laugh-beam'
  Laptop: 'laptop'
  LaughWink: 'laugh-wink'
  LaughSquint: 'laugh-squint'
  Laugh: 'laugh'
  LayerGroup: 'layer-group'
  LayerMinus: 'layer-minus'
  LayerPlus: 'layer-plus'
  Leaf: 'leaf'
  LeafHeart: 'leaf-heart'
  Lemon: 'lemon'
  LessThan: 'less-than'
  LessThanEqual: 'less-than-equal'
  LevelDownAlt: 'level-down-alt'
  LevelUpAlt: 'level-up-alt'
  LevelDown: 'level-down'
  LevelUp: 'level-up'
  Lightbulb: 'lightbulb'
  LifeRing: 'life-ring'
  Link: 'link'
  Lips: 'lips'
  ListAlt: 'list-alt'
  LiraSign: 'lira-sign'
  ListUl: 'list-ul'
  List: 'list'
  ListOl: 'list-ol'
  LocationArrow: 'location-arrow'
  LocationCircle: 'location-circle'
  LocationSlash: 'location-slash'
  Location: 'location'
  LockOpen: 'lock-open'
  LockAlt: 'lock-alt'
  LockOpenAlt: 'lock-open-alt'
  Lock: 'lock'
  LongArrowAltDown: 'long-arrow-alt-down'
  LongArrowAltLeft: 'long-arrow-alt-left'
  LongArrowAltRight: 'long-arrow-alt-right'
  LongArrowAltUp: 'long-arrow-alt-up'
  LongArrowLeft: 'long-arrow-left'
  LongArrowUp: 'long-arrow-up'
  LongArrowRight: 'long-arrow-right'
  LongArrowDown: 'long-arrow-down'
  Loveseat: 'loveseat'
  LowVision: 'low-vision'
  LuggageCart: 'luggage-cart'
  Luchador: 'luchador'
  Lungs: 'lungs'
  Magic: 'magic'
  Magnet: 'magnet'
  Male: 'male'
  MapMarkedAlt: 'map-marked-alt'
  MapMarked: 'map-marked'
  MapMarkerAltSlash: 'map-marker-alt-slash'
  MapMarkerAlt: 'map-marker-alt'
  MapMarkerCheck: 'map-marker-check'
  MapMarkerExclamation: 'map-marker-exclamation'
  MapMarkerEdit: 'map-marker-edit'
  MapMarkerMinus: 'map-marker-minus'
  MapMarkerQuestion: 'map-marker-question'
  MapMarkerSlash: 'map-marker-slash'
  MapMarkerPlus: 'map-marker-plus'
  MapMarkerTimes: 'map-marker-times'
  MapMarkerSmile: 'map-marker-smile'
  MapMarker: 'map-marker'
  MapSigns: 'map-signs'
  MapPin: 'map-pin'
  Marker: 'marker'
  Map: 'map'
  MarsStrokeH: 'mars-stroke-h'
  MarsDouble: 'mars-double'
  MarsStroke: 'mars-stroke'
  MarsStrokeV: 'mars-stroke-v'
  Mars: 'mars'
  Medkit: 'medkit'
  Medal: 'medal'
  MehBlank: 'meh-blank'
  Meh: 'meh'
  MehRollingEyes: 'meh-rolling-eyes'
  Memory: 'memory'
  Microchip: 'microchip'
  Mercury: 'mercury'
  MicrophoneAltSlash: 'microphone-alt-slash'
  MicrophoneSlash: 'microphone-slash'
  MicrophoneAlt: 'microphone-alt'
  Microphone: 'microphone'
  Microscope: 'microscope'
  MinusCircle: 'minus-circle'
  MinusOctagon: 'minus-octagon'
  MinusHexagon: 'minus-hexagon'
  Minus: 'minus'
  MinusSquare: 'minus-square'
  MobileAlt: 'mobile-alt'
  MobileAndroidAlt: 'mobile-android-alt'
  MobileAndroid: 'mobile-android'
  MoneyBillWaveAlt: 'money-bill-wave-alt'
  MoneyBillAlt: 'money-bill-alt'
  Mobile: 'mobile'
  MoneyBillWave: 'money-bill-wave'
  MoneyBill: 'money-bill'
  MoneyCheckAlt: 'money-check-alt'
  MonitorHeartRate: 'monitor-heart-rate'
  MoneyCheck: 'money-check'
  Monument: 'monument'
  MortarPestle: 'mortar-pestle'
  Moon: 'moon'
  MousePointer: 'mouse-pointer'
  Motorcycle: 'motorcycle'
  Music: 'music'
  Newspaper: 'newspaper'
  Neuter: 'neuter'
  NotesMedical: 'notes-medical'
  NotEqual: 'not-equal'
  ObjectGroup: 'object-group'
  ObjectUngroup: 'object-ungroup'
  Octagon: 'octagon'
  OilTemp: 'oil-temp'
  OilCan: 'oil-can'
  PaintBrushAlt: 'paint-brush-alt'
  Outdent: 'outdent'
  PaintBrush: 'paint-brush'
  Palette: 'palette'
  PaintRoller: 'paint-roller'
  PalletAlt: 'pallet-alt'
  Pallet: 'pallet'
  PaperPlane: 'paper-plane'
  Paragraph: 'paragraph'
  Paperclip: 'paperclip'
  ParkingCircleSlash: 'parking-circle-slash'
  ParachuteBox: 'parachute-box'
  ParkingCircle: 'parking-circle'
  Parking: 'parking'
  ParkingSlash: 'parking-slash'
  Passport: 'passport'
  Paste: 'paste'
  PauseCircle: 'pause-circle'
  PenAlt: 'pen-alt'
  Paw: 'paw'
  Pause: 'pause'
  PenFancy: 'pen-fancy'
  PenNib: 'pen-nib'
  PencilAlt: 'pencil-alt'
  PenSquare: 'pen-square'
  Pen: 'pen'
  PencilPaintbrush: 'pencil-paintbrush'
  PencilRuler: 'pencil-ruler'
  Pencil: 'pencil'
  PeopleCarry: 'people-carry'
  Pennant: 'pennant'
  Percent: 'percent'
  PersonCarry: 'person-carry'
  Percentage: 'percentage'
  PersonDolly: 'person-dolly'
  PersonDollyEmpty: 'person-dolly-empty'
  PhonePlus: 'phone-plus'
  PhoneSlash: 'phone-slash'
  PhoneSquare: 'phone-square'
  Phone: 'phone'
  PhoneVolume: 'phone-volume'
  Pills: 'pills'
  PiggyBank: 'piggy-bank'
  PlaneAlt: 'plane-alt'
  PlaneArrival: 'plane-arrival'
  PlaneDeparture: 'plane-departure'
  Plane: 'plane'
  PlayCircle: 'play-circle'
  Play: 'play'
  PlusOctagon: 'plus-octagon'
  PlusCircle: 'plus-circle'
  PlusHexagon: 'plus-hexagon'
  Plug: 'plug'
  PlusSquare: 'plus-square'
  Podcast: 'podcast'
  Plus: 'plus'
  Poop: 'poop'
  Poo: 'poo'
  Portrait: 'portrait'
  PoundSign: 'pound-sign'
  PowerOff: 'power-off'
  PrescriptionBottle: 'prescription-bottle'
  PrescriptionBottleAlt: 'prescription-bottle-alt'
  Print: 'print'
  Prescription: 'prescription'
  Procedures: 'procedures'
  PuzzlePiece: 'puzzle-piece'
  ProjectDiagram: 'project-diagram'
  Qrcode: 'qrcode'
  QuestionSquare: 'question-square'
  QuestionCircle: 'question-circle'
  Question: 'question'
  QuoteLeft: 'quote-left'
  Quidditch: 'quidditch'
  QuoteRight: 'quote-right'
  Random: 'random'
  Racquet: 'racquet'
  RampLoading: 'ramp-loading'
  Receipt: 'receipt'
  RectanglePortrait: 'rectangle-portrait'
  RectangleLandscape: 'rectangle-landscape'
  RectangleWide: 'rectangle-wide'
  Recycle: 'recycle'
  Redo: 'redo'
  Registered: 'registered'
  RedoAlt: 'redo-alt'
  Repeat1Alt: 'repeat-1-alt'
  Repeat1: 'repeat-1'
  RepeatAlt: 'repeat-alt'
  Repeat: 'repeat'
  ReplyAll: 'reply-all'
  Reply: 'reply'
  Retweet: 'retweet'
  RetweetAlt: 'retweet-alt'
  Ribbon: 'ribbon'
  Road: 'road'
  Robot: 'robot'
  Rocket: 'rocket'
  Route: 'route'
  RouteHighway: 'route-highway'
  RouteInterstate: 'route-interstate'
  RssSquare: 'rss-square'
  RubleSign: 'ruble-sign'
  Rss: 'rss'
  RulerCombined: 'ruler-combined'
  RulerTriangle: 'ruler-triangle'
  RulerHorizontal: 'ruler-horizontal'
  RulerVertical: 'ruler-vertical'
  Ruler: 'ruler'
  RupeeSign: 'rupee-sign'
  SadCry: 'sad-cry'
  SadTear: 'sad-tear'
  Save: 'save'
  ScalpelPath: 'scalpel-path'
  Scalpel: 'scalpel'
  ScannerKeyboard: 'scanner-keyboard'
  Scanner: 'scanner'
  ScannerTouchscreen: 'scanner-touchscreen'
  Scrubber: 'scrubber'
  School: 'school'
  Screwdriver: 'screwdriver'
  SearchMinus: 'search-minus'
  SearchPlus: 'search-plus'
  Seedling: 'seedling'
  Search: 'search'
  Server: 'server'
  Shapes: 'shapes'
  ShareAltSquare: 'share-alt-square'
  ShareSquare: 'share-square'
  ShareAll: 'share-all'
  ShareAlt: 'share-alt'
  Share: 'share'
  ShieldAlt: 'shield-alt'
  ShieldCheck: 'shield-check'
  ShekelSign: 'shekel-sign'
  Shield: 'shield'
  Ship: 'ship'
  ShoePrints: 'shoe-prints'
  ShippingTimed: 'shipping-timed'
  ShippingFast: 'shipping-fast'
  ShoppingBasket: 'shopping-basket'
  ShoppingBag: 'shopping-bag'
  ShoppingCart: 'shopping-cart'
  ShuttleVan: 'shuttle-van'
  Shower: 'shower'
  Shuttlecock: 'shuttlecock'
  SignIn: 'sign-in'
  SignInAlt: 'sign-in-alt'
  SignLanguage: 'sign-language'
  SignOutAlt: 'sign-out-alt'
  SignOut: 'sign-out'
  Signal: 'signal'
  Sitemap: 'sitemap'
  Sign: 'sign'
  Signature: 'signature'
  Skull: 'skull'
  SlidersH: 'sliders-h'
  Skeleton: 'skeleton'
  SlidersHSquare: 'sliders-h-square'
  SlidersVSquare: 'sliders-v-square'
  SmilePlus: 'smile-plus'
  SlidersV: 'sliders-v'
  SmileWink: 'smile-wink'
  SmileBeam: 'smile-beam'
  Smile: 'smile'
  Smoking: 'smoking'
  SmokingBan: 'smoking-ban'
  SolarPanel: 'solar-panel'
  Snowflake: 'snowflake'
  SortAlphaDown: 'sort-alpha-down'
  SortAlphaUp: 'sort-alpha-up'
  SortAmountDown: 'sort-amount-down'
  SortDown: 'sort-down'
  SortAmountUp: 'sort-amount-up'
  SortNumericDown: 'sort-numeric-down'
  SortNumericUp: 'sort-numeric-up'
  Spa: 'spa'
  SortUp: 'sort-up'
  Sort: 'sort'
  SpaceShuttle: 'space-shuttle'
  Spade: 'spade'
  SpinnerThird: 'spinner-third'
  Spinner: 'spinner'
  Splotch: 'splotch'
  SprayCan: 'spray-can'
  Stamp: 'stamp'
  SquareFull: 'square-full'
  Square: 'square'
  StarExclamation: 'star-exclamation'
  StarOfLife: 'star-of-life'
  StarHalfAlt: 'star-half-alt'
  StarHalf: 'star-half'
  Star: 'star'
  SteeringWheel: 'steering-wheel'
  StepBackward: 'step-backward'
  StepForward: 'step-forward'
  StickyNote: 'sticky-note'
  Stethoscope: 'stethoscope'
  StopCircle: 'stop-circle'
  Stomach: 'stomach'
  Stop: 'stop'
  Stopwatch: 'stopwatch'
  StoreAlt: 'store-alt'
  Store: 'store'
  StreetView: 'street-view'
  Stream: 'stream'
  Strikethrough: 'strikethrough'
  Subscript: 'subscript'
  Stroopwafel: 'stroopwafel'
  Subway: 'subway'
  Suitcase: 'suitcase'
  SuitcaseRolling: 'suitcase-rolling'
  Sun: 'sun'
  Superscript: 'superscript'
  Surprise: 'surprise'
  Swatchbook: 'swatchbook'
  SyncAlt: 'sync-alt'
  Swimmer: 'swimmer'
  SwimmingPool: 'swimming-pool'
  Sync: 'sync'
  Syringe: 'syringe'
  Table: 'table'
  TableTennis: 'table-tennis'
  TabletAndroidAlt: 'tablet-android-alt'
  TabletAlt: 'tablet-alt'
  TabletRugged: 'tablet-rugged'
  TabletAndroid: 'tablet-android'
  Tablet: 'tablet'
  Tablets: 'tablets'
  TachometerAltAverage: 'tachometer-alt-average'
  TachometerAltFast: 'tachometer-alt-fast'
  TachometerAltSlow: 'tachometer-alt-slow'
  TachometerAltFastest: 'tachometer-alt-fastest'
  TachometerAltSlowest: 'tachometer-alt-slowest'
  TachometerAlt: 'tachometer-alt'
  TachometerFast: 'tachometer-fast'
  TachometerFastest: 'tachometer-fastest'
  TachometerAverage: 'tachometer-average'
  TachometerSlow: 'tachometer-slow'
  TachometerSlowest: 'tachometer-slowest'
  Tag: 'tag'
  Tape: 'tape'
  Tags: 'tags'
  Tachometer: 'tachometer'
  Tasks: 'tasks'
  Taxi: 'taxi'
  TeethOpen: 'teeth-open'
  Teeth: 'teeth'
  TennisBall: 'tennis-ball'
  Terminal: 'terminal'
  TextHeight: 'text-height'
  ThLarge: 'th-large'
  TextWidth: 'text-width'
  ThList: 'th-list'
  Th: 'th'
  TheaterMasks: 'theater-masks'
  ThermometerEmpty: 'thermometer-empty'
  ThermometerHalf: 'thermometer-half'
  ThermometerFull: 'thermometer-full'
  ThermometerThreeQuarters: 'thermometer-three-quarters'
  Thermometer: 'thermometer'
  ThermometerQuarter: 'thermometer-quarter'
  ThumbsDown: 'thumbs-down'
  ThumbsUp: 'thumbs-up'
  TicketAlt: 'ticket-alt'
  Thumbtack: 'thumbtack'
  Ticket: 'ticket'
  TimesCircle: 'times-circle'
  TimesHexagon: 'times-hexagon'
  TimesSquare: 'times-square'
  Times: 'times'
  TimesOctagon: 'times-octagon'
  Tint: 'tint'
  TintSlash: 'tint-slash'
  TireFlat: 'tire-flat'
  TirePressureWarning: 'tire-pressure-warning'
  TireRugged: 'tire-rugged'
  Tire: 'tire'
  ToggleOff: 'toggle-off'
  Tired: 'tired'
  ToggleOn: 'toggle-on'
  Toolbox: 'toolbox'
  Toothbrush: 'toothbrush'
  Trademark: 'trademark'
  Tooth: 'tooth'
  TrafficLightGo: 'traffic-light-go'
  TrafficCone: 'traffic-cone'
  TrafficLightSlow: 'traffic-light-slow'
  TrafficLight: 'traffic-light'
  TrafficLightStop: 'traffic-light-stop'
  Train: 'train'
  TransgenderAlt: 'transgender-alt'
  TrashAlt: 'trash-alt'
  Trash: 'trash'
  Transgender: 'transgender'
  TreeAlt: 'tree-alt'
  Trophy: 'trophy'
  Tree: 'tree'
  TrophyAlt: 'trophy-alt'
  Triangle: 'triangle'
  TruckContainer: 'truck-container'
  TruckCouch: 'truck-couch'
  TruckLoading: 'truck-loading'
  TruckMonster: 'truck-monster'
  TruckMoving: 'truck-moving'
  TruckRamp: 'truck-ramp'
  Tshirt: 'tshirt'
  TruckPickup: 'truck-pickup'
  Truck: 'truck'
  TvRetro: 'tv-retro'
  Tty: 'tty'
  Underline: 'underline'
  Tv: 'tv'
  UmbrellaBeach: 'umbrella-beach'
  Umbrella: 'umbrella'
  UndoAlt: 'undo-alt'
  Undo: 'undo'
  UniversalAccess: 'universal-access'
  Unlink: 'unlink'
  University: 'university'
  UsdCircle: 'usd-circle'
  Unlock: 'unlock'
  UnlockAlt: 'unlock-alt'
  Upload: 'upload'
  UsdSquare: 'usd-square'
  UserAltSlash: 'user-alt-slash'
  UserAlt: 'user-alt'
  UserCircle: 'user-circle'
  UserAstronaut: 'user-astronaut'
  UserCheck: 'user-check'
  UserClock: 'user-clock'
  UserCog: 'user-cog'
  UserEdit: 'user-edit'
  UserGraduate: 'user-graduate'
  UserFriends: 'user-friends'
  UserMd: 'user-md'
  UserLock: 'user-lock'
  UserMinus: 'user-minus'
  UserNinja: 'user-ninja'
  UserSecret: 'user-secret'
  UserPlus: 'user-plus'
  UserShield: 'user-shield'
  UserSlash: 'user-slash'
  UserTag: 'user-tag'
  UserTie: 'user-tie'
  UserTimes: 'user-times'
  UsersClass: 'users-class'
  User: 'user'
  UtensilFork: 'utensil-fork'
  Users: 'users'
  UsersCog: 'users-cog'
  UtensilKnife: 'utensil-knife'
  UtensilSpoon: 'utensil-spoon'
  UtensilsAlt: 'utensils-alt'
  VectorSquare: 'vector-square'
  Utensils: 'utensils'
  VenusDouble: 'venus-double'
  Vial: 'vial'
  Venus: 'venus'
  VenusMars: 'venus-mars'
  Vials: 'vials'
  VideoPlus: 'video-plus'
  VideoSlash: 'video-slash'
  Video: 'video'
  VolumeDown: 'volume-down'
  VolleyballBall: 'volleyball-ball'
  VolumeUp: 'volume-up'
  VolumeMute: 'volume-mute'
  VolumeOff: 'volume-off'
  Walking: 'walking'
  Wallet: 'wallet'
  Warehouse: 'warehouse'
  WarehouseAlt: 'warehouse-alt'
  WatchFitness: 'watch-fitness'
  Watch: 'watch'
  WeightHanging: 'weight-hanging'
  Whistle: 'whistle'
  Wheelchair: 'wheelchair'
  Weight: 'weight'
  WindowAlt: 'window-alt'
  Wifi: 'wifi'
  WindowMaximize: 'window-maximize'
  WindowClose: 'window-close'
  WindowMinimize: 'window-minimize'
  WindowRestore: 'window-restore'
  WineGlassAlt: 'wine-glass-alt'
  Window: 'window'
  WineGlass: 'wine-glass'
  WonSign: 'won-sign'
  XRay: 'x-ray'
  Wrench: 'wrench'
  YenSign: 'yen-sign'
}
