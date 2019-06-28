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
   * Declarative way of defining table column configuration. It is a render-less component
   * use to declare rendering behavior of the table.
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
  AddressBook: 'address-book'
  AirFreshener: 'air-freshener'
  Adjust: 'adjust'
  AlarmClock: 'alarm-clock'
  AddressCard: 'address-card'
  AlignCenter: 'align-center'
  AlignLeft: 'align-left'
  AlignRight: 'align-right'
  Allergies: 'allergies'
  AlignJustify: 'align-justify'
  Ambulance: 'ambulance'
  Anchor: 'anchor'
  AmericanSignLanguageInterpreting: 'american-sign-language-interpreting'
  AngleDoubleDown: 'angle-double-down'
  AngleDoubleLeft: 'angle-double-left'
  AngleDoubleUp: 'angle-double-up'
  AngleDown: 'angle-down'
  AngleDoubleRight: 'angle-double-right'
  AngleLeft: 'angle-left'
  AngleRight: 'angle-right'
  Angry: 'angry'
  AppleAlt: 'apple-alt'
  AngleUp: 'angle-up'
  Archway: 'archway'
  Archive: 'archive'
  ArrowAltCircleLeft: 'arrow-alt-circle-left'
  ArrowAltCircleUp: 'arrow-alt-circle-up'
  ArrowAltCircleDown: 'arrow-alt-circle-down'
  ArrowAltCircleRight: 'arrow-alt-circle-right'
  ArrowAltDown: 'arrow-alt-down'
  ArrowAltFromBottom: 'arrow-alt-from-bottom'
  ArrowAltFromTop: 'arrow-alt-from-top'
  ArrowAltLeft: 'arrow-alt-left'
  ArrowAltFromLeft: 'arrow-alt-from-left'
  ArrowAltRight: 'arrow-alt-right'
  ArrowAltFromRight: 'arrow-alt-from-right'
  ArrowAltSquareDown: 'arrow-alt-square-down'
  ArrowAltSquareRight: 'arrow-alt-square-right'
  ArrowAltSquareLeft: 'arrow-alt-square-left'
  ArrowAltToBottom: 'arrow-alt-to-bottom'
  ArrowAltSquareUp: 'arrow-alt-square-up'
  ArrowAltToLeft: 'arrow-alt-to-left'
  ArrowAltToTop: 'arrow-alt-to-top'
  ArrowCircleDown: 'arrow-circle-down'
  ArrowAltToRight: 'arrow-alt-to-right'
  ArrowAltUp: 'arrow-alt-up'
  ArrowCircleLeft: 'arrow-circle-left'
  ArrowCircleRight: 'arrow-circle-right'
  ArrowFromBottom: 'arrow-from-bottom'
  ArrowCircleUp: 'arrow-circle-up'
  ArrowFromLeft: 'arrow-from-left'
  ArrowDown: 'arrow-down'
  ArrowFromRight: 'arrow-from-right'
  ArrowLeft: 'arrow-left'
  ArrowSquareDown: 'arrow-square-down'
  ArrowFromTop: 'arrow-from-top'
  ArrowRight: 'arrow-right'
  ArrowSquareUp: 'arrow-square-up'
  ArrowSquareRight: 'arrow-square-right'
  ArrowToBottom: 'arrow-to-bottom'
  ArrowSquareLeft: 'arrow-square-left'
  ArrowToLeft: 'arrow-to-left'
  ArrowToRight: 'arrow-to-right'
  ArrowToTop: 'arrow-to-top'
  ArrowUp: 'arrow-up'
  ArrowsAltH: 'arrows-alt-h'
  ArrowsAlt: 'arrows-alt'
  ArrowsH: 'arrows-h'
  ArrowsAltV: 'arrows-alt-v'
  ArrowsV: 'arrows-v'
  AssistiveListeningSystems: 'assistive-listening-systems'
  Arrows: 'arrows'
  At: 'at'
  Asterisk: 'asterisk'
  Atlas: 'atlas'
  AtomAlt: 'atom-alt'
  Atom: 'atom'
  Award: 'award'
  Backpack: 'backpack'
  Backspace: 'backspace'
  AudioDescription: 'audio-description'
  Backward: 'backward'
  BadgeCheck: 'badge-check'
  Badge: 'badge'
  BalanceScaleRight: 'balance-scale-right'
  BalanceScaleLeft: 'balance-scale-left'
  BalanceScale: 'balance-scale'
  BandAid: 'band-aid'
  Ban: 'ban'
  BarcodeRead: 'barcode-read'
  BarcodeScan: 'barcode-scan'
  BarcodeAlt: 'barcode-alt'
  Barcode: 'barcode'
  Bars: 'bars'
  BaseballBall: 'baseball-ball'
  BasketballBall: 'basketball-ball'
  Baseball: 'baseball'
  BasketballHoop: 'basketball-hoop'
  Bath: 'bath'
  BatteryBolt: 'battery-bolt'
  BatteryFull: 'battery-full'
  BatteryHalf: 'battery-half'
  BatteryEmpty: 'battery-empty'
  BatteryQuarter: 'battery-quarter'
  BatteryThreeQuarters: 'battery-three-quarters'
  BatterySlash: 'battery-slash'
  Beer: 'beer'
  BellSchoolSlash: 'bell-school-slash'
  Bed: 'bed'
  BellSchool: 'bell-school'
  Bell: 'bell'
  BezierCurve: 'bezier-curve'
  Bicycle: 'bicycle'
  Binoculars: 'binoculars'
  BellSlash: 'bell-slash'
  BirthdayCake: 'birthday-cake'
  Blanket: 'blanket'
  Blind: 'blind'
  Blender: 'blender'
  Bold: 'bold'
  Bolt: 'bolt'
  BoneBreak: 'bone-break'
  Bong: 'bong'
  Bomb: 'bomb'
  Bone: 'bone'
  BookAlt: 'book-alt'
  BookHeart: 'book-heart'
  BookOpen: 'book-open'
  BookReader: 'book-reader'
  Books: 'books'
  Book: 'book'
  Bookmark: 'bookmark'
  BowlingBall: 'bowling-ball'
  BowlingPins: 'bowling-pins'
  BoxCheck: 'box-check'
  BoxAlt: 'box-alt'
  BoxFragile: 'box-fragile'
  BoxFull: 'box-full'
  BoxHeart: 'box-heart'
  BoxOpen: 'box-open'
  BoxUp: 'box-up'
  BoxUsd: 'box-usd'
  Box: 'box'
  BoxesAlt: 'boxes-alt'
  Boxes: 'boxes'
  BoxingGlove: 'boxing-glove'
  Braille: 'braille'
  Brain: 'brain'
  Briefcase: 'briefcase'
  BroadcastTower: 'broadcast-tower'
  Broom: 'broom'
  Browser: 'browser'
  Brush: 'brush'
  BriefcaseMedical: 'briefcase-medical'
  Building: 'building'
  Bug: 'bug'
  Bullseye: 'bullseye'
  Burn: 'burn'
  BusAlt: 'bus-alt'
  BusSchool: 'bus-school'
  Bus: 'bus'
  Calculator: 'calculator'
  Bullhorn: 'bullhorn'
  CalendarCheck: 'calendar-check'
  CalendarAlt: 'calendar-alt'
  CalendarEdit: 'calendar-edit'
  CalendarMinus: 'calendar-minus'
  CalendarPlus: 'calendar-plus'
  CalendarExclamation: 'calendar-exclamation'
  Calendar: 'calendar'
  CameraAlt: 'camera-alt'
  CalendarTimes: 'calendar-times'
  Capsules: 'capsules'
  CameraRetro: 'camera-retro'
  Camera: 'camera'
  CarBattery: 'car-battery'
  CarCrash: 'car-crash'
  Cannabis: 'cannabis'
  CarAlt: 'car-alt'
  CarGarage: 'car-garage'
  CarMechanic: 'car-mechanic'
  CarTilt: 'car-tilt'
  CarSide: 'car-side'
  CarBump: 'car-bump'
  CarWash: 'car-wash'
  Car: 'car'
  CaretCircleDown: 'caret-circle-down'
  CaretCircleLeft: 'caret-circle-left'
  CaretCircleUp: 'caret-circle-up'
  CaretCircleRight: 'caret-circle-right'
  CaretDown: 'caret-down'
  CaretLeft: 'caret-left'
  CaretRight: 'caret-right'
  CaretSquareRight: 'caret-square-right'
  CaretSquareUp: 'caret-square-up'
  CaretSquareDown: 'caret-square-down'
  CaretSquareLeft: 'caret-square-left'
  CaretUp: 'caret-up'
  CartArrowDown: 'cart-arrow-down'
  Certificate: 'certificate'
  CartPlus: 'cart-plus'
  ChalkboardTeacher: 'chalkboard-teacher'
  Chalkboard: 'chalkboard'
  ChartArea: 'chart-area'
  ChargingStation: 'charging-station'
  ChartBar: 'chart-bar'
  CheckCircle: 'check-circle'
  ChartLine: 'chart-line'
  ChartPie: 'chart-pie'
  CheckDouble: 'check-double'
  CheckSquare: 'check-square'
  Check: 'check'
  ChessBishopAlt: 'chess-bishop-alt'
  ChessBishop: 'chess-bishop'
  ChessBoard: 'chess-board'
  ChessClock: 'chess-clock'
  ChessKingAlt: 'chess-king-alt'
  ChessClockAlt: 'chess-clock-alt'
  ChessKnightAlt: 'chess-knight-alt'
  ChessKing: 'chess-king'
  ChessKnight: 'chess-knight'
  ChessPawn: 'chess-pawn'
  ChessPawnAlt: 'chess-pawn-alt'
  ChessRookAlt: 'chess-rook-alt'
  ChessQueen: 'chess-queen'
  ChessQueenAlt: 'chess-queen-alt'
  ChessRook: 'chess-rook'
  Chess: 'chess'
  ChevronDoubleLeft: 'chevron-double-left'
  ChevronCircleRight: 'chevron-circle-right'
  ChevronDoubleDown: 'chevron-double-down'
  ChevronCircleUp: 'chevron-circle-up'
  ChevronDoubleRight: 'chevron-double-right'
  ChevronDoubleUp: 'chevron-double-up'
  ChevronCircleDown: 'chevron-circle-down'
  ChevronDown: 'chevron-down'
  ChevronLeft: 'chevron-left'
  ChevronRight: 'chevron-right'
  ChevronCircleLeft: 'chevron-circle-left'
  ChevronSquareRight: 'chevron-square-right'
  Child: 'child'
  ChevronUp: 'chevron-up'
  Church: 'church'
  ChevronSquareUp: 'chevron-square-up'
  CircleNotch: 'circle-notch'
  Circle: 'circle'
  ChevronSquareLeft: 'chevron-square-left'
  ClipboardCheck: 'clipboard-check'
  ChevronSquareDown: 'chevron-square-down'
  ClipboardList: 'clipboard-list'
  ClipboardPrescription: 'clipboard-prescription'
  Clone: 'clone'
  Clock: 'clock'
  ClosedCaptioning: 'closed-captioning'
  Clipboard: 'clipboard'
  CloudDownloadAlt: 'cloud-download-alt'
  CloudUploadAlt: 'cloud-upload-alt'
  Cloud: 'cloud'
  CloudDownload: 'cloud-download'
  CloudUpload: 'cloud-upload'
  Club: 'club'
  Cocktail: 'cocktail'
  CodeBranch: 'code-branch'
  CodeMerge: 'code-merge'
  CodeCommit: 'code-commit'
  Code: 'code'
  Coins: 'coins'
  Cog: 'cog'
  Coffee: 'coffee'
  Cogs: 'cogs'
  CommentAltCheck: 'comment-alt-check'
  CommentAltExclamation: 'comment-alt-exclamation'
  CommentAltEdit: 'comment-alt-edit'
  Columns: 'columns'
  CommentAltDots: 'comment-alt-dots'
  CommentAltPlus: 'comment-alt-plus'
  CommentAltLines: 'comment-alt-lines'
  CommentAltSlash: 'comment-alt-slash'
  CommentAltTimes: 'comment-alt-times'
  CommentCheck: 'comment-check'
  CommentAlt: 'comment-alt'
  CommentAltMinus: 'comment-alt-minus'
  CommentAltSmile: 'comment-alt-smile'
  CommentDots: 'comment-dots'
  CommentEdit: 'comment-edit'
  CommentMinus: 'comment-minus'
  CommentExclamation: 'comment-exclamation'
  CommentLines: 'comment-lines'
  CommentPlus: 'comment-plus'
  CommentSmile: 'comment-smile'
  Comment: 'comment'
  CommentSlash: 'comment-slash'
  CommentTimes: 'comment-times'
  CompactDisc: 'compact-disc'
  Comments: 'comments'
  CommentsAlt: 'comments-alt'
  Compass: 'compass'
  CompressAlt: 'compress-alt'
  CompressWide: 'compress-wide'
  CompassSlash: 'compass-slash'
  ContainerStorage: 'container-storage'
  ConveyorBeltAlt: 'conveyor-belt-alt'
  Compress: 'compress'
  ConciergeBell: 'concierge-bell'
  CookieBite: 'cookie-bite'
  ConveyorBelt: 'conveyor-belt'
  Cookie: 'cookie'
  Copy: 'copy'
  Copyright: 'copyright'
  Couch: 'couch'
  CreditCardBlank: 'credit-card-blank'
  CreditCardFront: 'credit-card-front'
  CreditCard: 'credit-card'
  Crop: 'crop'
  CropAlt: 'crop-alt'
  Crow: 'crow'
  Cricket: 'cricket'
  Crosshairs: 'crosshairs'
  Cube: 'cube'
  Cut: 'cut'
  Crown: 'crown'
  Cubes: 'cubes'
  Curling: 'curling'
  DesktopAlt: 'desktop-alt'
  Desktop: 'desktop'
  Deaf: 'deaf'
  Database: 'database'
  DiceFive: 'dice-five'
  Diagnoses: 'diagnoses'
  Diamond: 'diamond'
  DiceFour: 'dice-four'
  DiceOne: 'dice-one'
  DiceSix: 'dice-six'
  DiceThree: 'dice-three'
  Dice: 'dice'
  DiceTwo: 'dice-two'
  Directions: 'directions'
  DigitalTachograph: 'digital-tachograph'
  Diploma: 'diploma'
  Dizzy: 'dizzy'
  Divide: 'divide'
  DollyEmpty: 'dolly-empty'
  Dna: 'dna'
  DollarSign: 'dollar-sign'
  DollyFlatbedEmpty: 'dolly-flatbed-empty'
  DollyFlatbedAlt: 'dolly-flatbed-alt'
  DoNotEnter: 'do-not-enter'
  Donate: 'donate'
  Dolly: 'dolly'
  DoorOpen: 'door-open'
  DollyFlatbed: 'dolly-flatbed'
  DoorClosed: 'door-closed'
  Download: 'download'
  Dove: 'dove'
  DraftingCompass: 'drafting-compass'
  DrawCircle: 'draw-circle'
  DrawPolygon: 'draw-polygon'
  DrawSquare: 'draw-square'
  DrumSteelpan: 'drum-steelpan'
  Dumbbell: 'dumbbell'
  DotCircle: 'dot-circle'
  Ear: 'ear'
  Drum: 'drum'
  EllipsisHAlt: 'ellipsis-h-alt'
  Eject: 'eject'
  EllipsisVAlt: 'ellipsis-v-alt'
  Edit: 'edit'
  EllipsisV: 'ellipsis-v'
  EngineWarning: 'engine-warning'
  EnvelopeSquare: 'envelope-square'
  Eraser: 'eraser'
  EnvelopeOpen: 'envelope-open'
  Equals: 'equals'
  EllipsisH: 'ellipsis-h'
  ExchangeAlt: 'exchange-alt'
  Exchange: 'exchange'
  Envelope: 'envelope'
  ExclamationCircle: 'exclamation-circle'
  EuroSign: 'euro-sign'
  ExpandAlt: 'expand-alt'
  ExpandArrows: 'expand-arrows'
  ExpandArrowsAlt: 'expand-arrows-alt'
  ExclamationSquare: 'exclamation-square'
  ExclamationTriangle: 'exclamation-triangle'
  Expand: 'expand'
  ExpandWide: 'expand-wide'
  Exclamation: 'exclamation'
  ExternalLinkSquareAlt: 'external-link-square-alt'
  ExternalLinkAlt: 'external-link-alt'
  EyeDropper: 'eye-dropper'
  Eye: 'eye'
  ExternalLinkSquare: 'external-link-square'
  FastBackward: 'fast-backward'
  ExternalLink: 'external-link'
  FastForward: 'fast-forward'
  Feather: 'feather'
  Fax: 'fax'
  FeatherAlt: 'feather-alt'
  EyeSlash: 'eye-slash'
  Female: 'female'
  FighterJet: 'fighter-jet'
  FieldHockey: 'field-hockey'
  FileAudio: 'file-audio'
  FileArchive: 'file-archive'
  FileAlt: 'file-alt'
  FileCheck: 'file-check'
  FileCode: 'file-code'
  FileCertificate: 'file-certificate'
  FileEdit: 'file-edit'
  FileExcel: 'file-excel'
  FileExclamation: 'file-exclamation'
  FileDownload: 'file-download'
  FileImage: 'file-image'
  FileExport: 'file-export'
  FileImport: 'file-import'
  FileContract: 'file-contract'
  FileInvoiceDollar: 'file-invoice-dollar'
  FileInvoice: 'file-invoice'
  FileMedicalAlt: 'file-medical-alt'
  FileMedical: 'file-medical'
  FilePowerpoint: 'file-powerpoint'
  FilePlus: 'file-plus'
  FileMinus: 'file-minus'
  FilePrescription: 'file-prescription'
  FilePdf: 'file-pdf'
  FileTimes: 'file-times'
  FileUpload: 'file-upload'
  FileSignature: 'file-signature'
  FileVideo: 'file-video'
  File: 'file'
  FileWord: 'file-word'
  FilmAlt: 'film-alt'
  FillDrip: 'fill-drip'
  Fill: 'fill'
  Filter: 'filter'
  Fingerprint: 'fingerprint'
  Film: 'film'
  FireExtinguisher: 'fire-extinguisher'
  Fire: 'fire'
  Flag: 'flag'
  Flask: 'flask'
  Fish: 'fish'
  FirstAid: 'first-aid'
  Flushed: 'flushed'
  FolderOpen: 'folder-open'
  Folder: 'folder'
  FlagCheckered: 'flag-checkered'
  FontAwesomeLogoFull: 'font-awesome-logo-full'
  Font: 'font'
  FootballBall: 'football-ball'
  FootballHelmet: 'football-helmet'
  Forklift: 'forklift'
  Fragile: 'fragile'
  Frog: 'frog'
  Futbol: 'futbol'
  FrownOpen: 'frown-open'
  Gamepad: 'gamepad'
  Frown: 'frown'
  GasPump: 'gas-pump'
  Gavel: 'gavel'
  Gem: 'gem'
  GasPumpSlash: 'gas-pump-slash'
  Genderless: 'genderless'
  Forward: 'forward'
  Gift: 'gift'
  GlassMartiniAlt: 'glass-martini-alt'
  GlassMartini: 'glass-martini'
  Glasses: 'glasses'
  GlobeAfrica: 'globe-africa'
  GlassesAlt: 'glasses-alt'
  GlobeAmericas: 'globe-americas'
  GlobeAsia: 'globe-asia'
  Globe: 'globe'
  GolfBall: 'golf-ball'
  GolfClub: 'golf-club'
  GlobeStand: 'globe-stand'
  GreaterThanEqual: 'greater-than-equal'
  GreaterThan: 'greater-than'
  Grimace: 'grimace'
  GraduationCap: 'graduation-cap'
  GrinBeamSweat: 'grin-beam-sweat'
  GrinAlt: 'grin-alt'
  GrinSquintTears: 'grin-squint-tears'
  GrinHearts: 'grin-hearts'
  GrinBeam: 'grin-beam'
  GrinStars: 'grin-stars'
  GrinTears: 'grin-tears'
  GrinTongueSquint: 'grin-tongue-squint'
  GrinTongueWink: 'grin-tongue-wink'
  GrinSquint: 'grin-squint'
  GrinWink: 'grin-wink'
  GrinTongue: 'grin-tongue'
  GripVertical: 'grip-vertical'
  HSquare: 'h-square'
  GripHorizontal: 'grip-horizontal'
  Grin: 'grin'
  H2: 'h2'
  H3: 'h3'
  HandHeart: 'hand-heart'
  HandHoldingBox: 'hand-holding-box'
  H1: 'h1'
  HandHoldingHeart: 'hand-holding-heart'
  HandHoldingWater: 'hand-holding-water'
  HandHoldingSeedling: 'hand-holding-seedling'
  HandHoldingUsd: 'hand-holding-usd'
  HandHolding: 'hand-holding'
  HandPaper: 'hand-paper'
  HandPointRight: 'hand-point-right'
  HandPointDown: 'hand-point-down'
  HandPointLeft: 'hand-point-left'
  HandPointUp: 'hand-point-up'
  HandPointer: 'hand-pointer'
  HandLizard: 'hand-lizard'
  HandReceiving: 'hand-receiving'
  HandRock: 'hand-rock'
  HandPeace: 'hand-peace'
  HandScissors: 'hand-scissors'
  HandsHelping: 'hands-helping'
  Hands: 'hands'
  HandsUsd: 'hands-usd'
  HandshakeAlt: 'handshake-alt'
  HandsHeart: 'hands-heart'
  HandSpock: 'hand-spock'
  Handshake: 'handshake'
  Hashtag: 'hashtag'
  HeadphonesAlt: 'headphones-alt'
  Hdd: 'hdd'
  Headphones: 'headphones'
  Heading: 'heading'
  Headset: 'headset'
  HeartRate: 'heart-rate'
  Heartbeat: 'heartbeat'
  HeartCircle: 'heart-circle'
  HeartSquare: 'heart-square'
  Heart: 'heart'
  Helicopter: 'helicopter'
  History: 'history'
  Hexagon: 'hexagon'
  HockeySticks: 'hockey-sticks'
  Highlighter: 'highlighter'
  Home: 'home'
  HockeyPuck: 'hockey-puck'
  HospitalAlt: 'hospital-alt'
  HomeHeart: 'home-heart'
  Hospital: 'hospital'
  Hotel: 'hotel'
  HotTub: 'hot-tub'
  HourglassHalf: 'hourglass-half'
  HospitalSymbol: 'hospital-symbol'
  HourglassEnd: 'hourglass-end'
  HourglassStart: 'hourglass-start'
  Hourglass: 'hourglass'
  ICursor: 'i-cursor'
  IdCard: 'id-card'
  IdCardAlt: 'id-card-alt'
  IdBadge: 'id-badge'
  Image: 'image'
  Images: 'images'
  InboxIn: 'inbox-in'
  InboxOut: 'inbox-out'
  Indent: 'indent'
  IndustryAlt: 'industry-alt'
  Infinity: 'infinity'
  Industry: 'industry'
  InfoCircle: 'info-circle'
  Inbox: 'inbox'
  InfoSquare: 'info-square'
  Inhaler: 'inhaler'
  JackOLantern: 'jack-o-lantern'
  Info: 'info'
  Inventory: 'inventory'
  Joint: 'joint'
  Key: 'key'
  KissBeam: 'kiss-beam'
  Kidneys: 'kidneys'
  Keyboard: 'keyboard'
  Italic: 'italic'
  Kiss: 'kiss'
  Language: 'language'
  KissWinkHeart: 'kiss-wink-heart'
  KiwiBird: 'kiwi-bird'
  LaptopCode: 'laptop-code'
  Laptop: 'laptop'
  LaughSquint: 'laugh-squint'
  LaughBeam: 'laugh-beam'
  LaughWink: 'laugh-wink'
  Lamp: 'lamp'
  LayerGroup: 'layer-group'
  LayerMinus: 'layer-minus'
  Leaf: 'leaf'
  LeafHeart: 'leaf-heart'
  Lemon: 'lemon'
  LayerPlus: 'layer-plus'
  LessThanEqual: 'less-than-equal'
  Laugh: 'laugh'
  LevelDownAlt: 'level-down-alt'
  LessThan: 'less-than'
  LevelUpAlt: 'level-up-alt'
  LevelDown: 'level-down'
  Lightbulb: 'lightbulb'
  Lips: 'lips'
  LifeRing: 'life-ring'
  Link: 'link'
  LiraSign: 'lira-sign'
  ListAlt: 'list-alt'
  ListOl: 'list-ol'
  LocationArrow: 'location-arrow'
  ListUl: 'list-ul'
  List: 'list'
  LevelUp: 'level-up'
  Location: 'location'
  LocationSlash: 'location-slash'
  LocationCircle: 'location-circle'
  LockOpenAlt: 'lock-open-alt'
  LockAlt: 'lock-alt'
  LongArrowAltDown: 'long-arrow-alt-down'
  Lock: 'lock'
  LockOpen: 'lock-open'
  LongArrowAltLeft: 'long-arrow-alt-left'
  LongArrowAltRight: 'long-arrow-alt-right'
  LongArrowRight: 'long-arrow-right'
  LongArrowAltUp: 'long-arrow-alt-up'
  LongArrowUp: 'long-arrow-up'
  LongArrowDown: 'long-arrow-down'
  Loveseat: 'loveseat'
  LongArrowLeft: 'long-arrow-left'
  LuggageCart: 'luggage-cart'
  LowVision: 'low-vision'
  Luchador: 'luchador'
  Lungs: 'lungs'
  Magic: 'magic'
  Magnet: 'magnet'
  Male: 'male'
  MapMarked: 'map-marked'
  MapMarkerAltSlash: 'map-marker-alt-slash'
  MapMarkedAlt: 'map-marked-alt'
  MapMarkerExclamation: 'map-marker-exclamation'
  MapMarkerCheck: 'map-marker-check'
  MapMarkerAlt: 'map-marker-alt'
  MapMarkerMinus: 'map-marker-minus'
  MapMarkerPlus: 'map-marker-plus'
  MapMarkerQuestion: 'map-marker-question'
  MapMarkerSmile: 'map-marker-smile'
  MapMarkerSlash: 'map-marker-slash'
  MapMarkerEdit: 'map-marker-edit'
  MapMarker: 'map-marker'
  MapMarkerTimes: 'map-marker-times'
  MapSigns: 'map-signs'
  MapPin: 'map-pin'
  Map: 'map'
  MarsDouble: 'mars-double'
  Marker: 'marker'
  MarsStrokeH: 'mars-stroke-h'
  MarsStrokeV: 'mars-stroke-v'
  MarsStroke: 'mars-stroke'
  Mars: 'mars'
  Medkit: 'medkit'
  Medal: 'medal'
  MehBlank: 'meh-blank'
  Mercury: 'mercury'
  Microchip: 'microchip'
  Meh: 'meh'
  Memory: 'memory'
  MicrophoneAltSlash: 'microphone-alt-slash'
  MicrophoneAlt: 'microphone-alt'
  Microphone: 'microphone'
  MehRollingEyes: 'meh-rolling-eyes'
  MicrophoneSlash: 'microphone-slash'
  Microscope: 'microscope'
  MinusHexagon: 'minus-hexagon'
  Minus: 'minus'
  MinusOctagon: 'minus-octagon'
  MinusCircle: 'minus-circle'
  MinusSquare: 'minus-square'
  MobileAlt: 'mobile-alt'
  MoneyBillAlt: 'money-bill-alt'
  Mobile: 'mobile'
  MobileAndroidAlt: 'mobile-android-alt'
  MoneyBillWave: 'money-bill-wave'
  MoneyBill: 'money-bill'
  MoneyCheckAlt: 'money-check-alt'
  MoneyBillWaveAlt: 'money-bill-wave-alt'
  MobileAndroid: 'mobile-android'
  MoneyCheck: 'money-check'
  MonitorHeartRate: 'monitor-heart-rate'
  Motorcycle: 'motorcycle'
  MortarPestle: 'mortar-pestle'
  Moon: 'moon'
  MousePointer: 'mouse-pointer'
  Music: 'music'
  Neuter: 'neuter'
  Monument: 'monument'
  Newspaper: 'newspaper'
  NotesMedical: 'notes-medical'
  ObjectGroup: 'object-group'
  OilCan: 'oil-can'
  ObjectUngroup: 'object-ungroup'
  Octagon: 'octagon'
  NotEqual: 'not-equal'
  Outdent: 'outdent'
  OilTemp: 'oil-temp'
  PaintRoller: 'paint-roller'
  PaintBrush: 'paint-brush'
  Palette: 'palette'
  PalletAlt: 'pallet-alt'
  Pallet: 'pallet'
  PaintBrushAlt: 'paint-brush-alt'
  PaperPlane: 'paper-plane'
  ParachuteBox: 'parachute-box'
  Paragraph: 'paragraph'
  ParkingCircleSlash: 'parking-circle-slash'
  ParkingCircle: 'parking-circle'
  ParkingSlash: 'parking-slash'
  Parking: 'parking'
  Paperclip: 'paperclip'
  Pause: 'pause'
  Paste: 'paste'
  PauseCircle: 'pause-circle'
  Passport: 'passport'
  PenFancy: 'pen-fancy'
  PenNib: 'pen-nib'
  Pen: 'pen'
  PenSquare: 'pen-square'
  PenAlt: 'pen-alt'
  PencilAlt: 'pencil-alt'
  Paw: 'paw'
  PencilPaintbrush: 'pencil-paintbrush'
  Pencil: 'pencil'
  PencilRuler: 'pencil-ruler'
  PersonCarry: 'person-carry'
  Percentage: 'percentage'
  Percent: 'percent'
  Pennant: 'pennant'
  PersonDollyEmpty: 'person-dolly-empty'
  PersonDolly: 'person-dolly'
  PeopleCarry: 'people-carry'
  PhonePlus: 'phone-plus'
  PhoneSlash: 'phone-slash'
  PhoneSquare: 'phone-square'
  PhoneVolume: 'phone-volume'
  PiggyBank: 'piggy-bank'
  Phone: 'phone'
  PlaneAlt: 'plane-alt'
  PlaneDeparture: 'plane-departure'
  Pills: 'pills'
  Plane: 'plane'
  PlayCircle: 'play-circle'
  Play: 'play'
  Plug: 'plug'
  PlaneArrival: 'plane-arrival'
  PlusSquare: 'plus-square'
  PlusCircle: 'plus-circle'
  Plus: 'plus'
  PlusHexagon: 'plus-hexagon'
  Poo: 'poo'
  Podcast: 'podcast'
  Poop: 'poop'
  PoundSign: 'pound-sign'
  Portrait: 'portrait'
  PowerOff: 'power-off'
  PrescriptionBottleAlt: 'prescription-bottle-alt'
  PlusOctagon: 'plus-octagon'
  Prescription: 'prescription'
  Procedures: 'procedures'
  PrescriptionBottle: 'prescription-bottle'
  QuestionCircle: 'question-circle'
  ProjectDiagram: 'project-diagram'
  PuzzlePiece: 'puzzle-piece'
  QuestionSquare: 'question-square'
  Print: 'print'
  QuoteRight: 'quote-right'
  Question: 'question'
  Qrcode: 'qrcode'
  QuoteLeft: 'quote-left'
  Quidditch: 'quidditch'
  RampLoading: 'ramp-loading'
  Random: 'random'
  Racquet: 'racquet'
  Receipt: 'receipt'
  RectanglePortrait: 'rectangle-portrait'
  RectangleLandscape: 'rectangle-landscape'
  RectangleWide: 'rectangle-wide'
  Recycle: 'recycle'
  RedoAlt: 'redo-alt'
  Registered: 'registered'
  Redo: 'redo'
  Repeat1: 'repeat-1'
  Repeat: 'repeat'
  RepeatAlt: 'repeat-alt'
  Reply: 'reply'
  ReplyAll: 'reply-all'
  Repeat1Alt: 'repeat-1-alt'
  RetweetAlt: 'retweet-alt'
  Ribbon: 'ribbon'
  Retweet: 'retweet'
  Road: 'road'
  Robot: 'robot'
  Rocket: 'rocket'
  RouteHighway: 'route-highway'
  Rss: 'rss'
  RssSquare: 'rss-square'
  Route: 'route'
  RouteInterstate: 'route-interstate'
  RubleSign: 'ruble-sign'
  RulerCombined: 'ruler-combined'
  RulerHorizontal: 'ruler-horizontal'
  Ruler: 'ruler'
  RulerVertical: 'ruler-vertical'
  RupeeSign: 'rupee-sign'
  RulerTriangle: 'ruler-triangle'
  ScalpelPath: 'scalpel-path'
  SadCry: 'sad-cry'
  Save: 'save'
  Scalpel: 'scalpel'
  SadTear: 'sad-tear'
  ScannerKeyboard: 'scanner-keyboard'
  ScannerTouchscreen: 'scanner-touchscreen'
  Scanner: 'scanner'
  School: 'school'
  SearchMinus: 'search-minus'
  Scrubber: 'scrubber'
  SearchPlus: 'search-plus'
  Search: 'search'
  Screwdriver: 'screwdriver'
  Shapes: 'shapes'
  ShareAltSquare: 'share-alt-square'
  Seedling: 'seedling'
  Server: 'server'
  ShareAll: 'share-all'
  ShareSquare: 'share-square'
  ShieldAlt: 'shield-alt'
  ShekelSign: 'shekel-sign'
  Share: 'share'
  ShieldCheck: 'shield-check'
  Shield: 'shield'
  ShippingTimed: 'shipping-timed'
  ShippingFast: 'shipping-fast'
  Ship: 'ship'
  ShoePrints: 'shoe-prints'
  ShoppingBag: 'shopping-bag'
  ShoppingBasket: 'shopping-basket'
  ShoppingCart: 'shopping-cart'
  ShareAlt: 'share-alt'
  Shower: 'shower'
  Shuttlecock: 'shuttlecock'
  SignIn: 'sign-in'
  ShuttleVan: 'shuttle-van'
  SignInAlt: 'sign-in-alt'
  SignOutAlt: 'sign-out-alt'
  SignLanguage: 'sign-language'
  Signal: 'signal'
  Signature: 'signature'
  Sign: 'sign'
  SignOut: 'sign-out'
  Sitemap: 'sitemap'
  Skeleton: 'skeleton'
  SlidersH: 'sliders-h'
  SlidersHSquare: 'sliders-h-square'
  Skull: 'skull'
  SlidersVSquare: 'sliders-v-square'
  SmileBeam: 'smile-beam'
  SmilePlus: 'smile-plus'
  SlidersV: 'sliders-v'
  Smile: 'smile'
  SmileWink: 'smile-wink'
  SmokingBan: 'smoking-ban'
  SolarPanel: 'solar-panel'
  Snowflake: 'snowflake'
  Smoking: 'smoking'
  SortAlphaDown: 'sort-alpha-down'
  SortAlphaUp: 'sort-alpha-up'
  SortAmountDown: 'sort-amount-down'
  SortDown: 'sort-down'
  SortUp: 'sort-up'
  SortAmountUp: 'sort-amount-up'
  SortNumericDown: 'sort-numeric-down'
  Spa: 'spa'
  Spade: 'spade'
  Sort: 'sort'
  SpaceShuttle: 'space-shuttle'
  SpinnerThird: 'spinner-third'
  Spinner: 'spinner'
  Splotch: 'splotch'
  SprayCan: 'spray-can'
  SortNumericUp: 'sort-numeric-up'
  SquareFull: 'square-full'
  StarExclamation: 'star-exclamation'
  Square: 'square'
  StarHalfAlt: 'star-half-alt'
  Stamp: 'stamp'
  StarHalf: 'star-half'
  SteeringWheel: 'steering-wheel'
  StarOfLife: 'star-of-life'
  Star: 'star'
  StepForward: 'step-forward'
  StickyNote: 'sticky-note'
  Stop: 'stop'
  StepBackward: 'step-backward'
  Stomach: 'stomach'
  StopCircle: 'stop-circle'
  Stopwatch: 'stopwatch'
  Store: 'store'
  StoreAlt: 'store-alt'
  Stethoscope: 'stethoscope'
  Stream: 'stream'
  StreetView: 'street-view'
  Stroopwafel: 'stroopwafel'
  Subway: 'subway'
  Subscript: 'subscript'
  Strikethrough: 'strikethrough'
  SuitcaseRolling: 'suitcase-rolling'
  Suitcase: 'suitcase'
  Sun: 'sun'
  Superscript: 'superscript'
  Surprise: 'surprise'
  Swimmer: 'swimmer'
  SyncAlt: 'sync-alt'
  Sync: 'sync'
  SwimmingPool: 'swimming-pool'
  Swatchbook: 'swatchbook'
  Syringe: 'syringe'
  TableTennis: 'table-tennis'
  Table: 'table'
  TabletAlt: 'tablet-alt'
  TabletAndroidAlt: 'tablet-android-alt'
  TabletAndroid: 'tablet-android'
  TabletRugged: 'tablet-rugged'
  TachometerAltAverage: 'tachometer-alt-average'
  Tablets: 'tablets'
  TachometerAltFastest: 'tachometer-alt-fastest'
  TachometerAltFast: 'tachometer-alt-fast'
  TachometerAltSlow: 'tachometer-alt-slow'
  TachometerAlt: 'tachometer-alt'
  TachometerAverage: 'tachometer-average'
  TachometerAltSlowest: 'tachometer-alt-slowest'
  TachometerFastest: 'tachometer-fastest'
  Tablet: 'tablet'
  Tachometer: 'tachometer'
  Tag: 'tag'
  TachometerSlowest: 'tachometer-slowest'
  TachometerSlow: 'tachometer-slow'
  Tags: 'tags'
  Tape: 'tape'
  TachometerFast: 'tachometer-fast'
  Tasks: 'tasks'
  Taxi: 'taxi'
  Teeth: 'teeth'
  TennisBall: 'tennis-ball'
  TextWidth: 'text-width'
  TeethOpen: 'teeth-open'
  TextHeight: 'text-height'
  ThLarge: 'th-large'
  Terminal: 'terminal'
  ThList: 'th-list'
  TheaterMasks: 'theater-masks'
  ThermometerEmpty: 'thermometer-empty'
  Th: 'th'
  ThermometerFull: 'thermometer-full'
  ThermometerQuarter: 'thermometer-quarter'
  ThumbsDown: 'thumbs-down'
  ThermometerHalf: 'thermometer-half'
  Thermometer: 'thermometer'
  ThumbsUp: 'thumbs-up'
  ThermometerThreeQuarters: 'thermometer-three-quarters'
  TicketAlt: 'ticket-alt'
  Thumbtack: 'thumbtack'
  Ticket: 'ticket'
  TimesHexagon: 'times-hexagon'
  TimesOctagon: 'times-octagon'
  TimesSquare: 'times-square'
  Times: 'times'
  TimesCircle: 'times-circle'
  TintSlash: 'tint-slash'
  TirePressureWarning: 'tire-pressure-warning'
  TireRugged: 'tire-rugged'
  Tint: 'tint'
  TireFlat: 'tire-flat'
  Tire: 'tire'
  ToggleOff: 'toggle-off'
  Toolbox: 'toolbox'
  Tired: 'tired'
  ToggleOn: 'toggle-on'
  Tooth: 'tooth'
  Trademark: 'trademark'
  TrafficCone: 'traffic-cone'
  Toothbrush: 'toothbrush'
  TrafficLightGo: 'traffic-light-go'
  TrafficLightSlow: 'traffic-light-slow'
  TrafficLightStop: 'traffic-light-stop'
  TrafficLight: 'traffic-light'
  Transgender: 'transgender'
  Train: 'train'
  TrashAlt: 'trash-alt'
  TransgenderAlt: 'transgender-alt'
  Triangle: 'triangle'
  Tree: 'tree'
  TreeAlt: 'tree-alt'
  TrophyAlt: 'trophy-alt'
  Trash: 'trash'
  TruckCouch: 'truck-couch'
  TruckContainer: 'truck-container'
  TruckLoading: 'truck-loading'
  TruckMonster: 'truck-monster'
  TruckPickup: 'truck-pickup'
  TruckMoving: 'truck-moving'
  Truck: 'truck'
  Tshirt: 'tshirt'
  TruckRamp: 'truck-ramp'
  TvRetro: 'tv-retro'
  Tty: 'tty'
  Tv: 'tv'
  Trophy: 'trophy'
  Umbrella: 'umbrella'
  Underline: 'underline'
  UmbrellaBeach: 'umbrella-beach'
  UniversalAccess: 'universal-access'
  University: 'university'
  Undo: 'undo'
  UndoAlt: 'undo-alt'
  Unlink: 'unlink'
  UnlockAlt: 'unlock-alt'
  Unlock: 'unlock'
  Upload: 'upload'
  UsdCircle: 'usd-circle'
  UsdSquare: 'usd-square'
  UserAlt: 'user-alt'
  UserAstronaut: 'user-astronaut'
  UserCheck: 'user-check'
  UserCircle: 'user-circle'
  UserCog: 'user-cog'
  UserAltSlash: 'user-alt-slash'
  UserClock: 'user-clock'
  UserFriends: 'user-friends'
  UserLock: 'user-lock'
  UserEdit: 'user-edit'
  UserGraduate: 'user-graduate'
  UserNinja: 'user-ninja'
  UserSecret: 'user-secret'
  UserPlus: 'user-plus'
  UserMd: 'user-md'
  UserMinus: 'user-minus'
  UserSlash: 'user-slash'
  UserShield: 'user-shield'
  UserTimes: 'user-times'
  UserTie: 'user-tie'
  User: 'user'
  UsersClass: 'users-class'
  UtensilFork: 'utensil-fork'
  UsersCog: 'users-cog'
  Users: 'users'
  UtensilKnife: 'utensil-knife'
  UtensilSpoon: 'utensil-spoon'
  UtensilsAlt: 'utensils-alt'
  UserTag: 'user-tag'
  VectorSquare: 'vector-square'
  Utensils: 'utensils'
  VenusDouble: 'venus-double'
  VenusMars: 'venus-mars'
  Venus: 'venus'
  VideoPlus: 'video-plus'
  Vial: 'vial'
  VideoSlash: 'video-slash'
  VolleyballBall: 'volleyball-ball'
  Video: 'video'
  Vials: 'vials'
  VolumeDown: 'volume-down'
  VolumeMute: 'volume-mute'
  VolumeOff: 'volume-off'
  Wallet: 'wallet'
  Walking: 'walking'
  VolumeUp: 'volume-up'
  Warehouse: 'warehouse'
  WatchFitness: 'watch-fitness'
  WeightHanging: 'weight-hanging'
  Watch: 'watch'
  Weight: 'weight'
  Wheelchair: 'wheelchair'
  WarehouseAlt: 'warehouse-alt'
  WindowAlt: 'window-alt'
  Whistle: 'whistle'
  Wifi: 'wifi'
  WindowMaximize: 'window-maximize'
  WindowMinimize: 'window-minimize'
  Window: 'window'
  WineGlassAlt: 'wine-glass-alt'
  WineGlass: 'wine-glass'
  WonSign: 'won-sign'
  WindowClose: 'window-close'
  WindowRestore: 'window-restore'
  Wrench: 'wrench'
  XRay: 'x-ray'
  YenSign: 'yen-sign'
}
