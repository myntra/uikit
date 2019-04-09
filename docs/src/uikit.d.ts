// -----------[[Alert]]--------------- //
interface AlertProps extends BaseProps {
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
/**
 * Show a message intended to draw the user's attention.
 *
 * @since 0.3.0
 * @status READY
 * @category basic
 */

declare function Alert(props: AlertProps): JSX.Element

// -----------[[Avatar]]--------------- //
interface AvatarProps extends BaseProps {
  /** The name of the person/object.  */
  name: string
  /** The size of the avatar. */
  size?: 'small' | 'medium' | 'large'
}
/**
 * Displays user icon.
 *
 * @since 0.3.1
 * @status EXPERIMENTAL
 * @category basic
 */

declare function Avatar(props: AvatarProps): JSX.Element

// -----------[[Badge]]--------------- //
interface BadgeProps extends BaseProps {
  /** The visual style to convey purpose of the badge. */
  type?: 'primary' | 'success' | 'warning' | 'error'
  /** The label text of the badge. */
  children: string
}
/**
 * Displays an information pill/badge.
 *
 * @since 0.8.0
 * @status EXPERIMENTAL
 * @category basic
 */

declare function Badge(props: BadgeProps): JSX.Element

// -----------[[BreadCrumb]]--------------- //

interface BreadCrumbProps extends BaseProps {}
/**
 * The BreadCrumb component.
 *
 * @since 0.3.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/bread-crumb
 */

declare function BreadCrumb(props: BreadCrumbProps): JSX.Element
interface BreadCrumbItem extends BaseProps {}
/**
 * A breadcrumb item
 * @since 0.3.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/bread-crum#BreadCrumbIcon
 */

declare namespace BreadCrumb {
  declare function Item(props: BreadCrumbItemProps): JSX.Element
}

// -----------[[Button]]--------------- //

interface ButtonProps extends BaseProps {
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
/**
 * Buttons provide click-able actions.
 *
 * @since 0.0.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/button
 */

declare function Button(props: ButtonProps): JSX.Element

// -----------[[ClickAway]]--------------- //

interface ClickAwayProps {
  /**
   * Reference to the container which requires click away functionality.
   */
  target: RefObject<HTMLElement>
  /**
   * The handler to call when click-away is triggered.
   */
  onClickAway: () => void
  /**
   * Browser event which triggers click-away.
   */
  domEventName?: 'click' | 'mousedown' | 'mouseup'
}
/**
 * Watch for clicks outside the target element.
 *
 * @since 0.0.0
 * @status REVIEWING
 * @category advanced
 */

declare function ClickAway(props: ClickAwayProps): JSX.Element

// -----------[[Dropdown]]--------------- //

declare function Dropdown(props: DropdownProps): JSX.Element

// -----------[[ErrorBoundary]]--------------- //

declare function ErrorBoundary(props: ErrorBoundaryProps): JSX.Element

// -----------[[Field]]--------------- //

declare function Field(props: FieldProps): JSX.Element

// -----------[[Grid]]--------------- //

declare function Grid(props: GridProps): JSX.Element

declare namespace Grid {
  declare function Column(props: GridColumnProps): JSX.Element
}

// -----------[[Group]]--------------- //
interface GroupProps extends BaseProps {}
/**
 * A group component to combine multiple group-able components.
 *
 * @since 0.11.0
 * @status READY
 * @category composition
 * @see http://uikit.myntra.com/components/group
 */

declare function Group(props: GroupProps): JSX.Element

// -----------[[Icon]]--------------- //

type IconName = IconNameGlobal[keyof IconNameGlobal]

interface IconProps extends BaseProps {
  /** [FontAwesome](https://fontawesome.com/icons?d=gallery) icon name */
  name: IconName
  /** Accessibility text for screen readers */
  title?: string
  spin?: boolean
}
/**
 * Displays a glyph using an SVG sprite-sheet.
 *
 * @since 0.0.0
 * @status REVIEWING
 * @category basic
 */

declare function Icon(props: IconProps): JSX.Element

// -----------[[Image]]--------------- //

interface ImageContainerObserver {
  observe(
    element: HTMLElement,
    handler: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void
  ): void
  unobserve(element: HTMLElement): void
  raw: IntersectionObserver
}

interface ImageProps extends BaseProps {
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
/**
 * A component to lazy load images.
 *
 * @since 0.3.0
 * @status EXPERIMENTAL
 */

declare function Image(props: ImageProps): JSX.Element

// -----------[[InputCheckbox]]--------------- //
interface InputCheckBoxProps extends BaseProps {
  /**
   * The state of the checkbox.
   *
   * > **Why `value` instead of `checked`?**
   * >
   * > We have a set convention of having `value` as the controlled input value and `onChange` event to
   * propagate the change to parent component.
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
   * > We use `value` prop to set controlled value to any `<InputXxx>` component for consistency.
   */
  htmlValue: string
  /**
   * Component to render title for the checkbox
   */
  title?: string
  renderTitle?(): JSX.Element
}
/**
 * The input checkbox component
 *
 * @since 0.0.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/button
 */

declare function InputCheckbox(props: InputCheckboxProps): JSX.Element

// -----------[[InputS3File]]--------------- //

interface InputS3FileProps extends BaseProps {
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
   * @deprecated
   */
  inputWidth?: string | number
  /**
   * @deprecated - Use [autoStart](#S3Upload-autoStartUpload) instead.
   */
  autostart?: boolean
  /**
   * @deprecated - Use [clearOnSuccess](#S3Upload-clearOnSuccess) instead.
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
/**
 * The InputS3File component.
 * @since 0.11.0
 * @status READY
 * @category convention
 * @see http://uikit.myntra.com/components/input-s3-file
 */

declare function InputS3File(props: InputS3FileProps): JSX.Element

// -----------[[InputText]]--------------- //
interface InputTextProps extends BaseProps {
  /** Sets the text format for the field. */
  type?: 'text' | 'email' | 'password' | 'tel' | 'url'
  /** Current value of the text input field. */
  value?: string
  /** The handler to call when the value changes. */
  onChange?(value: string): void
  /** Displays a disabled text field */
  disabled?: boolean
  /** Displays a readonly text field */
  readOnly?: boolean
}
/**
 * A text input component for text-like data (email, tel, text, password and url).
 *
 * @since 0.0.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/input-text
 */

declare function InputText(props: InputTextProps): JSX.Element

// -----------[[List]]--------------- //

interface ListProps<T = any> extends BaseProps {
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
}
/**
 * An accessible list of item.
 *
 * @since 0.10.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/list
 */

declare function List(props: ListProps): JSX.Element

// -----------[[Measure]]--------------- //

declare function Measure(props: MeasureProps): JSX.Element

// -----------[[NavBar]]--------------- //

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
  isActivePath?(navLinkPath: any, currentPath: any): boolean
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
/**
 * A sidebar nav list for app navigation.
 *
 * @since 0.3.0
 * @status EXPERIMENTAL
 * @category opinionated
 * @see http://uikit.myntra.com/components/nav-bar
 */

declare function NavBar(props: NavBarProps): JSX.Element

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
/**
 * A group of [links](#NavGroupItem) in the nav bar.
 *
 * This component should be used as a child of [NavBar](#NavBar) or other [NavBar.Group](#NavBarGroup) component.
 *
 * @since 0.3.0
 * @status EXPERIMENTAL
 * @category sub-component
 * @see http://uikit.myntra.com/components/nav-bar#NavBarGroup
 */

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
/**
 * A component to display links in the nav.
 *
 * This component should be used as a child of [NavBar](#NavBar) or [NavBar.Group](#NavBarGroup) component.
 *
 * @since 0.3.0
 * @status EXPERIMENTAL
 * @category sub-component
 * @see http://uikit.myntra.com/components/nav-bar#NavBarItem
 */

declare namespace NavBar {
  declare function Group(props: NavBarGroupProps): JSX.Element
  declare function Item(props: NavBarItemProps): JSX.Element
}

// -----------[[Page]]--------------- //
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
/**
 * A basic layout component with side nav and header.
 *
 * @since 0.11.0
 * @status READY
 * @category layout
 * @see http://uikit.myntra.com/components/page
 */

declare function Page(props: PageProps): JSX.Element

// -----------[[Portal]]--------------- //

declare function Portal(props: PortalProps): JSX.Element

// -----------[[Progress]]--------------- //

type ProgressProps =
  | ({
      /**
       * Type of progress view (bar or circular).
       */
      type: 'bar'
    } & ProgressBarProps)
  | ({
      type: 'circle'
    } & ProgressCircleProps)
/**
 * A component to display loading progress.
 *
 * @since 0.6.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/progress
 */

declare function Progress(props: ProgressProps): JSX.Element
interface ProgressBarProps extends BaseProps {
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

interface ProgressCircleProps extends BaseProps {
  value: number
  appearance?: 'success' | 'info' | 'warning' | 'danger'
  size?: 'small' | 'medium' | 'large'
}

declare namespace Progress {
  declare function Bar(props: ProgressBarProps): JSX.Element
  declare function Circle(props: ProgressCircleProps): JSX.Element
}

// -----------[[TopBar]]--------------- //

interface TopBarProps extends BaseProps {
  title: string
  user: Partial<{
    name: string
    photo: string
  }> & {
    email: string
  }
}
/**
 * A component for page header
 *
 * @since 0.3.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/top-bar
 */

declare function TopBar(props: TopBarProps): JSX.Element

interface TopBarProps extends BaseProps {
  title: string
  user: Partial<{
    name: string
    photo: string
  }> & {
    email: string
  }
}
/**
 * A component for page header
 *
 * @since 0.3.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/top-bar
 */

declare namespace TopBar {
  declare function TobBarItem(props: TopBarTobBarItemProps): JSX.Element
}

// ----------[[DeclaredTypes]]---------- //

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
  className?: string

  children?: ReactNode

  [key: string]: any
}

// -----------[[IconNames]]----------//
interface IconNameGlobal {
  AddressBook: 'address-book'
  AddressCard: 'address-card'
  AirFreshener: 'air-freshener'
  Adjust: 'adjust'
  AlignCenter: 'align-center'
  AlarmClock: 'alarm-clock'
  AlignJustify: 'align-justify'
  AlignLeft: 'align-left'
  AlignRight: 'align-right'
  Allergies: 'allergies'
  Ambulance: 'ambulance'
  Anchor: 'anchor'
  AmericanSignLanguageInterpreting: 'american-sign-language-interpreting'
  AngleDoubleDown: 'angle-double-down'
  AngleDoubleLeft: 'angle-double-left'
  AngleDoubleRight: 'angle-double-right'
  AngleDoubleUp: 'angle-double-up'
  AngleDown: 'angle-down'
  AngleLeft: 'angle-left'
  AngleRight: 'angle-right'
  AngleUp: 'angle-up'
  Angry: 'angry'
  AppleAlt: 'apple-alt'
  Archive: 'archive'
  Archway: 'archway'
  ArrowAltCircleDown: 'arrow-alt-circle-down'
  ArrowAltCircleLeft: 'arrow-alt-circle-left'
  ArrowAltCircleRight: 'arrow-alt-circle-right'
  ArrowAltCircleUp: 'arrow-alt-circle-up'
  ArrowAltDown: 'arrow-alt-down'
  ArrowAltFromBottom: 'arrow-alt-from-bottom'
  ArrowAltFromLeft: 'arrow-alt-from-left'
  ArrowAltFromRight: 'arrow-alt-from-right'
  ArrowAltFromTop: 'arrow-alt-from-top'
  ArrowAltLeft: 'arrow-alt-left'
  ArrowAltRight: 'arrow-alt-right'
  ArrowAltSquareDown: 'arrow-alt-square-down'
  ArrowAltSquareLeft: 'arrow-alt-square-left'
  ArrowAltSquareRight: 'arrow-alt-square-right'
  ArrowAltSquareUp: 'arrow-alt-square-up'
  ArrowAltToBottom: 'arrow-alt-to-bottom'
  ArrowAltToTop: 'arrow-alt-to-top'
  ArrowAltToRight: 'arrow-alt-to-right'
  ArrowAltToLeft: 'arrow-alt-to-left'
  ArrowAltUp: 'arrow-alt-up'
  ArrowCircleDown: 'arrow-circle-down'
  ArrowCircleLeft: 'arrow-circle-left'
  ArrowCircleRight: 'arrow-circle-right'
  ArrowCircleUp: 'arrow-circle-up'
  ArrowDown: 'arrow-down'
  ArrowFromBottom: 'arrow-from-bottom'
  ArrowFromLeft: 'arrow-from-left'
  ArrowFromRight: 'arrow-from-right'
  ArrowFromTop: 'arrow-from-top'
  ArrowLeft: 'arrow-left'
  ArrowRight: 'arrow-right'
  ArrowSquareLeft: 'arrow-square-left'
  ArrowSquareDown: 'arrow-square-down'
  ArrowSquareRight: 'arrow-square-right'
  ArrowSquareUp: 'arrow-square-up'
  ArrowToBottom: 'arrow-to-bottom'
  ArrowToLeft: 'arrow-to-left'
  ArrowToRight: 'arrow-to-right'
  ArrowToTop: 'arrow-to-top'
  ArrowUp: 'arrow-up'
  ArrowsAltV: 'arrows-alt-v'
  ArrowsAlt: 'arrows-alt'
  ArrowsAltH: 'arrows-alt-h'
  ArrowsH: 'arrows-h'
  ArrowsV: 'arrows-v'
  Arrows: 'arrows'
  Asterisk: 'asterisk'
  AssistiveListeningSystems: 'assistive-listening-systems'
  At: 'at'
  Atlas: 'atlas'
  AtomAlt: 'atom-alt'
  Atom: 'atom'
  AudioDescription: 'audio-description'
  Award: 'award'
  Backpack: 'backpack'
  Backspace: 'backspace'
  Backward: 'backward'
  BadgeCheck: 'badge-check'
  Badge: 'badge'
  BalanceScaleLeft: 'balance-scale-left'
  BalanceScaleRight: 'balance-scale-right'
  BalanceScale: 'balance-scale'
  Ban: 'ban'
  BandAid: 'band-aid'
  BarcodeAlt: 'barcode-alt'
  BarcodeRead: 'barcode-read'
  BarcodeScan: 'barcode-scan'
  Barcode: 'barcode'
  Bars: 'bars'
  BaseballBall: 'baseball-ball'
  Baseball: 'baseball'
  BasketballBall: 'basketball-ball'
  BasketballHoop: 'basketball-hoop'
  Bath: 'bath'
  BatteryBolt: 'battery-bolt'
  BatteryEmpty: 'battery-empty'
  BatteryFull: 'battery-full'
  BatteryQuarter: 'battery-quarter'
  BatterySlash: 'battery-slash'
  BatteryHalf: 'battery-half'
  Bed: 'bed'
  BatteryThreeQuarters: 'battery-three-quarters'
  Beer: 'beer'
  BellSlash: 'bell-slash'
  BellSchool: 'bell-school'
  BellSchoolSlash: 'bell-school-slash'
  BezierCurve: 'bezier-curve'
  Bicycle: 'bicycle'
  Binoculars: 'binoculars'
  Bell: 'bell'
  Blanket: 'blanket'
  BirthdayCake: 'birthday-cake'
  Blender: 'blender'
  Blind: 'blind'
  Bold: 'bold'
  Bomb: 'bomb'
  Bolt: 'bolt'
  BoneBreak: 'bone-break'
  Bong: 'bong'
  Bone: 'bone'
  BookHeart: 'book-heart'
  BookAlt: 'book-alt'
  BookOpen: 'book-open'
  BookReader: 'book-reader'
  Book: 'book'
  Bookmark: 'bookmark'
  Books: 'books'
  BowlingBall: 'bowling-ball'
  BowlingPins: 'bowling-pins'
  BoxAlt: 'box-alt'
  BoxCheck: 'box-check'
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
  BriefcaseMedical: 'briefcase-medical'
  Briefcase: 'briefcase'
  BroadcastTower: 'broadcast-tower'
  Browser: 'browser'
  Broom: 'broom'
  Brush: 'brush'
  Bug: 'bug'
  Building: 'building'
  Bullhorn: 'bullhorn'
  Bullseye: 'bullseye'
  Burn: 'burn'
  BusAlt: 'bus-alt'
  BusSchool: 'bus-school'
  Bus: 'bus'
  Calculator: 'calculator'
  CalendarAlt: 'calendar-alt'
  CalendarCheck: 'calendar-check'
  CalendarEdit: 'calendar-edit'
  CalendarExclamation: 'calendar-exclamation'
  CalendarPlus: 'calendar-plus'
  CalendarTimes: 'calendar-times'
  CalendarMinus: 'calendar-minus'
  Calendar: 'calendar'
  CameraRetro: 'camera-retro'
  CameraAlt: 'camera-alt'
  Camera: 'camera'
  Cannabis: 'cannabis'
  Capsules: 'capsules'
  CarAlt: 'car-alt'
  CarBattery: 'car-battery'
  CarBump: 'car-bump'
  CarCrash: 'car-crash'
  CarGarage: 'car-garage'
  CarMechanic: 'car-mechanic'
  CarSide: 'car-side'
  CarWash: 'car-wash'
  CarTilt: 'car-tilt'
  Car: 'car'
  CaretCircleDown: 'caret-circle-down'
  CaretCircleLeft: 'caret-circle-left'
  CaretCircleRight: 'caret-circle-right'
  CaretCircleUp: 'caret-circle-up'
  CaretDown: 'caret-down'
  CaretRight: 'caret-right'
  CaretLeft: 'caret-left'
  CaretSquareDown: 'caret-square-down'
  CaretSquareRight: 'caret-square-right'
  CaretSquareUp: 'caret-square-up'
  CaretSquareLeft: 'caret-square-left'
  CartPlus: 'cart-plus'
  CartArrowDown: 'cart-arrow-down'
  Certificate: 'certificate'
  CaretUp: 'caret-up'
  ChalkboardTeacher: 'chalkboard-teacher'
  Chalkboard: 'chalkboard'
  ChargingStation: 'charging-station'
  ChartArea: 'chart-area'
  ChartBar: 'chart-bar'
  ChartLine: 'chart-line'
  ChartPie: 'chart-pie'
  CheckCircle: 'check-circle'
  CheckDouble: 'check-double'
  CheckSquare: 'check-square'
  Check: 'check'
  ChessBishopAlt: 'chess-bishop-alt'
  ChessBishop: 'chess-bishop'
  ChessBoard: 'chess-board'
  ChessClockAlt: 'chess-clock-alt'
  ChessKingAlt: 'chess-king-alt'
  ChessClock: 'chess-clock'
  ChessKnightAlt: 'chess-knight-alt'
  ChessKing: 'chess-king'
  ChessKnight: 'chess-knight'
  ChessPawnAlt: 'chess-pawn-alt'
  ChessQueenAlt: 'chess-queen-alt'
  ChessPawn: 'chess-pawn'
  ChessRookAlt: 'chess-rook-alt'
  ChessQueen: 'chess-queen'
  Chess: 'chess'
  ChessRook: 'chess-rook'
  ChevronCircleLeft: 'chevron-circle-left'
  ChevronCircleDown: 'chevron-circle-down'
  ChevronCircleUp: 'chevron-circle-up'
  ChevronCircleRight: 'chevron-circle-right'
  ChevronDoubleDown: 'chevron-double-down'
  ChevronDoubleLeft: 'chevron-double-left'
  ChevronDoubleRight: 'chevron-double-right'
  ChevronDoubleUp: 'chevron-double-up'
  ChevronDown: 'chevron-down'
  ChevronLeft: 'chevron-left'
  ChevronSquareDown: 'chevron-square-down'
  ChevronRight: 'chevron-right'
  ChevronSquareLeft: 'chevron-square-left'
  ChevronSquareUp: 'chevron-square-up'
  ChevronSquareRight: 'chevron-square-right'
  ChevronUp: 'chevron-up'
  Church: 'church'
  Child: 'child'
  Circle: 'circle'
  ClipboardCheck: 'clipboard-check'
  ClipboardList: 'clipboard-list'
  CircleNotch: 'circle-notch'
  ClipboardPrescription: 'clipboard-prescription'
  Clipboard: 'clipboard'
  Clock: 'clock'
  Clone: 'clone'
  CloudDownloadAlt: 'cloud-download-alt'
  ClosedCaptioning: 'closed-captioning'
  CloudDownload: 'cloud-download'
  CloudUploadAlt: 'cloud-upload-alt'
  CloudUpload: 'cloud-upload'
  Cloud: 'cloud'
  Club: 'club'
  CodeBranch: 'code-branch'
  CodeCommit: 'code-commit'
  Cocktail: 'cocktail'
  CodeMerge: 'code-merge'
  Code: 'code'
  Cog: 'cog'
  Coffee: 'coffee'
  Cogs: 'cogs'
  Columns: 'columns'
  CommentAltCheck: 'comment-alt-check'
  Coins: 'coins'
  CommentAltEdit: 'comment-alt-edit'
  CommentAltExclamation: 'comment-alt-exclamation'
  CommentAltLines: 'comment-alt-lines'
  CommentAltDots: 'comment-alt-dots'
  CommentAltSlash: 'comment-alt-slash'
  CommentAltMinus: 'comment-alt-minus'
  CommentAltSmile: 'comment-alt-smile'
  CommentAltPlus: 'comment-alt-plus'
  CommentAltTimes: 'comment-alt-times'
  CommentAlt: 'comment-alt'
  CommentDots: 'comment-dots'
  CommentEdit: 'comment-edit'
  CommentCheck: 'comment-check'
  CommentExclamation: 'comment-exclamation'
  CommentLines: 'comment-lines'
  CommentMinus: 'comment-minus'
  CommentPlus: 'comment-plus'
  CommentSlash: 'comment-slash'
  CommentSmile: 'comment-smile'
  CommentTimes: 'comment-times'
  Comment: 'comment'
  CommentsAlt: 'comments-alt'
  Comments: 'comments'
  CompactDisc: 'compact-disc'
  Compass: 'compass'
  CompressWide: 'compress-wide'
  CompassSlash: 'compass-slash'
  CompressAlt: 'compress-alt'
  Compress: 'compress'
  ConciergeBell: 'concierge-bell'
  ContainerStorage: 'container-storage'
  ConveyorBeltAlt: 'conveyor-belt-alt'
  ConveyorBelt: 'conveyor-belt'
  CookieBite: 'cookie-bite'
  Cookie: 'cookie'
  Copy: 'copy'
  Copyright: 'copyright'
  Couch: 'couch'
  CreditCardBlank: 'credit-card-blank'
  CreditCardFront: 'credit-card-front'
  Cricket: 'cricket'
  CreditCard: 'credit-card'
  CropAlt: 'crop-alt'
  Crop: 'crop'
  Crow: 'crow'
  Crown: 'crown'
  Crosshairs: 'crosshairs'
  Cubes: 'cubes'
  Curling: 'curling'
  Cube: 'cube'
  Cut: 'cut'
  Database: 'database'
  Deaf: 'deaf'
  DesktopAlt: 'desktop-alt'
  Diagnoses: 'diagnoses'
  Diamond: 'diamond'
  Desktop: 'desktop'
  DiceFive: 'dice-five'
  DiceOne: 'dice-one'
  DiceSix: 'dice-six'
  DiceFour: 'dice-four'
  DiceThree: 'dice-three'
  Dice: 'dice'
  DiceTwo: 'dice-two'
  DigitalTachograph: 'digital-tachograph'
  Diploma: 'diploma'
  Directions: 'directions'
  Dizzy: 'dizzy'
  Dna: 'dna'
  Divide: 'divide'
  DoNotEnter: 'do-not-enter'
  DollyFlatbedAlt: 'dolly-flatbed-alt'
  DollyEmpty: 'dolly-empty'
  DollarSign: 'dollar-sign'
  DollyFlatbedEmpty: 'dolly-flatbed-empty'
  DollyFlatbed: 'dolly-flatbed'
  Dolly: 'dolly'
  DoorOpen: 'door-open'
  DotCircle: 'dot-circle'
  Donate: 'donate'
  DoorClosed: 'door-closed'
  Dove: 'dove'
  Download: 'download'
  DrawCircle: 'draw-circle'
  DraftingCompass: 'drafting-compass'
  DrawPolygon: 'draw-polygon'
  DrumSteelpan: 'drum-steelpan'
  Drum: 'drum'
  DrawSquare: 'draw-square'
  Dumbbell: 'dumbbell'
  Ear: 'ear'
  Edit: 'edit'
  Eject: 'eject'
  EllipsisVAlt: 'ellipsis-v-alt'
  EllipsisH: 'ellipsis-h'
  EllipsisV: 'ellipsis-v'
  EllipsisHAlt: 'ellipsis-h-alt'
  EngineWarning: 'engine-warning'
  EnvelopeSquare: 'envelope-square'
  EnvelopeOpen: 'envelope-open'
  Envelope: 'envelope'
  Equals: 'equals'
  Eraser: 'eraser'
  EuroSign: 'euro-sign'
  ExchangeAlt: 'exchange-alt'
  ExclamationCircle: 'exclamation-circle'
  Exchange: 'exchange'
  ExclamationTriangle: 'exclamation-triangle'
  ExclamationSquare: 'exclamation-square'
  Exclamation: 'exclamation'
  ExpandAlt: 'expand-alt'
  ExpandArrowsAlt: 'expand-arrows-alt'
  ExpandWide: 'expand-wide'
  Expand: 'expand'
  ExpandArrows: 'expand-arrows'
  ExternalLinkAlt: 'external-link-alt'
  ExternalLinkSquareAlt: 'external-link-square-alt'
  ExternalLink: 'external-link'
  EyeDropper: 'eye-dropper'
  ExternalLinkSquare: 'external-link-square'
  EyeSlash: 'eye-slash'
  FastBackward: 'fast-backward'
  Eye: 'eye'
  FastForward: 'fast-forward'
  Fax: 'fax'
  Feather: 'feather'
  FeatherAlt: 'feather-alt'
  FighterJet: 'fighter-jet'
  FieldHockey: 'field-hockey'
  Female: 'female'
  FileAlt: 'file-alt'
  FileArchive: 'file-archive'
  FileAudio: 'file-audio'
  FileCertificate: 'file-certificate'
  FileCheck: 'file-check'
  FileCode: 'file-code'
  FileContract: 'file-contract'
  FileDownload: 'file-download'
  FileEdit: 'file-edit'
  FileExcel: 'file-excel'
  FileExclamation: 'file-exclamation'
  FileExport: 'file-export'
  FileImage: 'file-image'
  FileImport: 'file-import'
  FileInvoiceDollar: 'file-invoice-dollar'
  FileInvoice: 'file-invoice'
  FileMedicalAlt: 'file-medical-alt'
  FileMedical: 'file-medical'
  FilePdf: 'file-pdf'
  FilePlus: 'file-plus'
  FileMinus: 'file-minus'
  FilePowerpoint: 'file-powerpoint'
  FilePrescription: 'file-prescription'
  FileTimes: 'file-times'
  FileSignature: 'file-signature'
  FileUpload: 'file-upload'
  FileVideo: 'file-video'
  FileWord: 'file-word'
  File: 'file'
  FillDrip: 'fill-drip'
  Fill: 'fill'
  FilmAlt: 'film-alt'
  Film: 'film'
  Filter: 'filter'
  Fingerprint: 'fingerprint'
  FireExtinguisher: 'fire-extinguisher'
  Fire: 'fire'
  FlagCheckered: 'flag-checkered'
  Fish: 'fish'
  FirstAid: 'first-aid'
  Flag: 'flag'
  Flask: 'flask'
  Flushed: 'flushed'
  Folder: 'folder'
  FolderOpen: 'folder-open'
  FontAwesomeLogoFull: 'font-awesome-logo-full'
  FootballBall: 'football-ball'
  FootballHelmet: 'football-helmet'
  Font: 'font'
  Forklift: 'forklift'
  Forward: 'forward'
  Frog: 'frog'
  Fragile: 'fragile'
  FrownOpen: 'frown-open'
  Frown: 'frown'
  Futbol: 'futbol'
  Gamepad: 'gamepad'
  GasPumpSlash: 'gas-pump-slash'
  Gavel: 'gavel'
  GasPump: 'gas-pump'
  Gem: 'gem'
  Genderless: 'genderless'
  Gift: 'gift'
  GlassMartiniAlt: 'glass-martini-alt'
  GlassMartini: 'glass-martini'
  GlassesAlt: 'glasses-alt'
  GlobeAfrica: 'globe-africa'
  Glasses: 'glasses'
  GlobeAsia: 'globe-asia'
  GlobeAmericas: 'globe-americas'
  Globe: 'globe'
  GolfBall: 'golf-ball'
  GlobeStand: 'globe-stand'
  GolfClub: 'golf-club'
  GraduationCap: 'graduation-cap'
  GreaterThanEqual: 'greater-than-equal'
  GreaterThan: 'greater-than'
  Grimace: 'grimace'
  GrinAlt: 'grin-alt'
  GrinBeamSweat: 'grin-beam-sweat'
  GrinBeam: 'grin-beam'
  GrinSquintTears: 'grin-squint-tears'
  GrinSquint: 'grin-squint'
  GrinStars: 'grin-stars'
  GrinHearts: 'grin-hearts'
  GrinTears: 'grin-tears'
  GrinTongueSquint: 'grin-tongue-squint'
  GrinTongueWink: 'grin-tongue-wink'
  GrinTongue: 'grin-tongue'
  GrinWink: 'grin-wink'
  GripVertical: 'grip-vertical'
  HSquare: 'h-square'
  GripHorizontal: 'grip-horizontal'
  Grin: 'grin'
  H1: 'h1'
  H3: 'h3'
  HandHeart: 'hand-heart'
  HandHoldingBox: 'hand-holding-box'
  HandHoldingHeart: 'hand-holding-heart'
  H2: 'h2'
  HandHoldingSeedling: 'hand-holding-seedling'
  HandHoldingUsd: 'hand-holding-usd'
  HandHoldingWater: 'hand-holding-water'
  HandHolding: 'hand-holding'
  HandLizard: 'hand-lizard'
  HandPaper: 'hand-paper'
  HandPeace: 'hand-peace'
  HandPointDown: 'hand-point-down'
  HandPointLeft: 'hand-point-left'
  HandPointRight: 'hand-point-right'
  HandPointUp: 'hand-point-up'
  HandPointer: 'hand-pointer'
  HandReceiving: 'hand-receiving'
  HandRock: 'hand-rock'
  HandScissors: 'hand-scissors'
  HandSpock: 'hand-spock'
  HandsHeart: 'hands-heart'
  HandsHelping: 'hands-helping'
  Hands: 'hands'
  HandsUsd: 'hands-usd'
  Handshake: 'handshake'
  HandshakeAlt: 'handshake-alt'
  Hashtag: 'hashtag'
  Heading: 'heading'
  HeadphonesAlt: 'headphones-alt'
  Hdd: 'hdd'
  Headphones: 'headphones'
  Headset: 'headset'
  HeartCircle: 'heart-circle'
  HeartRate: 'heart-rate'
  HeartSquare: 'heart-square'
  Heart: 'heart'
  Heartbeat: 'heartbeat'
  Helicopter: 'helicopter'
  Highlighter: 'highlighter'
  History: 'history'
  HockeyPuck: 'hockey-puck'
  Hexagon: 'hexagon'
  HomeHeart: 'home-heart'
  HockeySticks: 'hockey-sticks'
  HospitalAlt: 'hospital-alt'
  HospitalSymbol: 'hospital-symbol'
  Home: 'home'
  Hospital: 'hospital'
  HotTub: 'hot-tub'
  Hotel: 'hotel'
  HourglassEnd: 'hourglass-end'
  HourglassHalf: 'hourglass-half'
  HourglassStart: 'hourglass-start'
  ICursor: 'i-cursor'
  Hourglass: 'hourglass'
  IdBadge: 'id-badge'
  IdCardAlt: 'id-card-alt'
  IdCard: 'id-card'
  Image: 'image'
  Images: 'images'
  InboxIn: 'inbox-in'
  InboxOut: 'inbox-out'
  Indent: 'indent'
  Inbox: 'inbox'
  Industry: 'industry'
  IndustryAlt: 'industry-alt'
  Infinity: 'infinity'
  InfoCircle: 'info-circle'
  Inhaler: 'inhaler'
  InfoSquare: 'info-square'
  Info: 'info'
  Inventory: 'inventory'
  Italic: 'italic'
  JackOLantern: 'jack-o-lantern'
  Joint: 'joint'
  Key: 'key'
  Keyboard: 'keyboard'
  Kidneys: 'kidneys'
  KissBeam: 'kiss-beam'
  KissWinkHeart: 'kiss-wink-heart'
  Kiss: 'kiss'
  KiwiBird: 'kiwi-bird'
  Lamp: 'lamp'
  Language: 'language'
  LaptopCode: 'laptop-code'
  Laptop: 'laptop'
  LaughBeam: 'laugh-beam'
  LaughSquint: 'laugh-squint'
  LaughWink: 'laugh-wink'
  Laugh: 'laugh'
  LayerMinus: 'layer-minus'
  LayerPlus: 'layer-plus'
  LeafHeart: 'leaf-heart'
  LayerGroup: 'layer-group'
  Leaf: 'leaf'
  Lemon: 'lemon'
  LessThanEqual: 'less-than-equal'
  LevelDown: 'level-down'
  LessThan: 'less-than'
  LevelDownAlt: 'level-down-alt'
  LevelUpAlt: 'level-up-alt'
  LevelUp: 'level-up'
  LifeRing: 'life-ring'
  Link: 'link'
  Lightbulb: 'lightbulb'
  LiraSign: 'lira-sign'
  Lips: 'lips'
  ListUl: 'list-ul'
  ListAlt: 'list-alt'
  List: 'list'
  ListOl: 'list-ol'
  LocationArrow: 'location-arrow'
  LocationCircle: 'location-circle'
  Location: 'location'
  LocationSlash: 'location-slash'
  LockAlt: 'lock-alt'
  LockOpenAlt: 'lock-open-alt'
  Lock: 'lock'
  LockOpen: 'lock-open'
  LongArrowAltDown: 'long-arrow-alt-down'
  LongArrowAltLeft: 'long-arrow-alt-left'
  LongArrowAltUp: 'long-arrow-alt-up'
  LongArrowAltRight: 'long-arrow-alt-right'
  LongArrowDown: 'long-arrow-down'
  LongArrowRight: 'long-arrow-right'
  LongArrowUp: 'long-arrow-up'
  LongArrowLeft: 'long-arrow-left'
  Loveseat: 'loveseat'
  LowVision: 'low-vision'
  Luchador: 'luchador'
  Lungs: 'lungs'
  LuggageCart: 'luggage-cart'
  Magnet: 'magnet'
  Magic: 'magic'
  Male: 'male'
  MapMarked: 'map-marked'
  MapMarkedAlt: 'map-marked-alt'
  MapMarkerAltSlash: 'map-marker-alt-slash'
  MapMarkerAlt: 'map-marker-alt'
  MapMarkerCheck: 'map-marker-check'
  MapMarkerEdit: 'map-marker-edit'
  MapMarkerMinus: 'map-marker-minus'
  MapMarkerPlus: 'map-marker-plus'
  MapMarkerExclamation: 'map-marker-exclamation'
  MapMarkerQuestion: 'map-marker-question'
  MapMarkerSmile: 'map-marker-smile'
  MapMarkerSlash: 'map-marker-slash'
  MapMarker: 'map-marker'
  MapPin: 'map-pin'
  MapMarkerTimes: 'map-marker-times'
  MapSigns: 'map-signs'
  Marker: 'marker'
  Map: 'map'
  MarsStrokeH: 'mars-stroke-h'
  MarsDouble: 'mars-double'
  MarsStrokeV: 'mars-stroke-v'
  MarsStroke: 'mars-stroke'
  Medal: 'medal'
  Mars: 'mars'
  MehRollingEyes: 'meh-rolling-eyes'
  MehBlank: 'meh-blank'
  Medkit: 'medkit'
  Memory: 'memory'
  Meh: 'meh'
  Mercury: 'mercury'
  Microchip: 'microchip'
  MicrophoneAltSlash: 'microphone-alt-slash'
  MicrophoneAlt: 'microphone-alt'
  Microphone: 'microphone'
  Microscope: 'microscope'
  MicrophoneSlash: 'microphone-slash'
  MinusCircle: 'minus-circle'
  MinusHexagon: 'minus-hexagon'
  MinusOctagon: 'minus-octagon'
  MinusSquare: 'minus-square'
  Minus: 'minus'
  MobileAndroidAlt: 'mobile-android-alt'
  MobileAlt: 'mobile-alt'
  MobileAndroid: 'mobile-android'
  Mobile: 'mobile'
  MoneyBillAlt: 'money-bill-alt'
  MoneyBillWaveAlt: 'money-bill-wave-alt'
  MoneyBill: 'money-bill'
  MoneyCheckAlt: 'money-check-alt'
  MoneyBillWave: 'money-bill-wave'
  MoneyCheck: 'money-check'
  MonitorHeartRate: 'monitor-heart-rate'
  Monument: 'monument'
  Moon: 'moon'
  MortarPestle: 'mortar-pestle'
  MousePointer: 'mouse-pointer'
  Motorcycle: 'motorcycle'
  Music: 'music'
  Neuter: 'neuter'
  Newspaper: 'newspaper'
  NotEqual: 'not-equal'
  NotesMedical: 'notes-medical'
  ObjectUngroup: 'object-ungroup'
  ObjectGroup: 'object-group'
  Octagon: 'octagon'
  OilTemp: 'oil-temp'
  OilCan: 'oil-can'
  Outdent: 'outdent'
  PaintBrushAlt: 'paint-brush-alt'
  PaintBrush: 'paint-brush'
  PaintRoller: 'paint-roller'
  PalletAlt: 'pallet-alt'
  Palette: 'palette'
  Pallet: 'pallet'
  Paperclip: 'paperclip'
  ParachuteBox: 'parachute-box'
  PaperPlane: 'paper-plane'
  Paragraph: 'paragraph'
  ParkingCircleSlash: 'parking-circle-slash'
  ParkingCircle: 'parking-circle'
  Parking: 'parking'
  Passport: 'passport'
  ParkingSlash: 'parking-slash'
  Paste: 'paste'
  Pause: 'pause'
  PauseCircle: 'pause-circle'
  Paw: 'paw'
  PenAlt: 'pen-alt'
  PenNib: 'pen-nib'
  PenSquare: 'pen-square'
  PenFancy: 'pen-fancy'
  Pen: 'pen'
  Pencil: 'pencil'
  PencilRuler: 'pencil-ruler'
  PencilAlt: 'pencil-alt'
  PencilPaintbrush: 'pencil-paintbrush'
  Pennant: 'pennant'
  PeopleCarry: 'people-carry'
  Percent: 'percent'
  Percentage: 'percentage'
  PersonCarry: 'person-carry'
  PersonDollyEmpty: 'person-dolly-empty'
  PersonDolly: 'person-dolly'
  PhonePlus: 'phone-plus'
  PhoneSlash: 'phone-slash'
  PhoneSquare: 'phone-square'
  PhoneVolume: 'phone-volume'
  Phone: 'phone'
  PiggyBank: 'piggy-bank'
  Pills: 'pills'
  PlaneArrival: 'plane-arrival'
  PlaneAlt: 'plane-alt'
  PlaneDeparture: 'plane-departure'
  Plane: 'plane'
  PlayCircle: 'play-circle'
  Play: 'play'
  Plug: 'plug'
  PlusCircle: 'plus-circle'
  PlusHexagon: 'plus-hexagon'
  PlusOctagon: 'plus-octagon'
  PlusSquare: 'plus-square'
  Plus: 'plus'
  Podcast: 'podcast'
  Poo: 'poo'
  Poop: 'poop'
  Portrait: 'portrait'
  PoundSign: 'pound-sign'
  PowerOff: 'power-off'
  PrescriptionBottleAlt: 'prescription-bottle-alt'
  PrescriptionBottle: 'prescription-bottle'
  Prescription: 'prescription'
  PuzzlePiece: 'puzzle-piece'
  ProjectDiagram: 'project-diagram'
  Qrcode: 'qrcode'
  Procedures: 'procedures'
  QuestionSquare: 'question-square'
  QuestionCircle: 'question-circle'
  Question: 'question'
  Print: 'print'
  Racquet: 'racquet'
  Quidditch: 'quidditch'
  QuoteLeft: 'quote-left'
  QuoteRight: 'quote-right'
  RampLoading: 'ramp-loading'
  RectangleLandscape: 'rectangle-landscape'
  Receipt: 'receipt'
  Random: 'random'
  RectanglePortrait: 'rectangle-portrait'
  RectangleWide: 'rectangle-wide'
  Recycle: 'recycle'
  RedoAlt: 'redo-alt'
  Redo: 'redo'
  Registered: 'registered'
  Repeat1Alt: 'repeat-1-alt'
  Repeat1: 'repeat-1'
  RepeatAlt: 'repeat-alt'
  ReplyAll: 'reply-all'
  Repeat: 'repeat'
  Reply: 'reply'
  Ribbon: 'ribbon'
  RetweetAlt: 'retweet-alt'
  Retweet: 'retweet'
  Road: 'road'
  Robot: 'robot'
  Rocket: 'rocket'
  RouteInterstate: 'route-interstate'
  RouteHighway: 'route-highway'
  Route: 'route'
  RssSquare: 'rss-square'
  Rss: 'rss'
  RulerCombined: 'ruler-combined'
  RubleSign: 'ruble-sign'
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
  ScannerTouchscreen: 'scanner-touchscreen'
  ScannerKeyboard: 'scanner-keyboard'
  Scanner: 'scanner'
  Screwdriver: 'screwdriver'
  School: 'school'
  Scrubber: 'scrubber'
  SearchPlus: 'search-plus'
  SearchMinus: 'search-minus'
  Seedling: 'seedling'
  Search: 'search'
  Server: 'server'
  ShareAll: 'share-all'
  Shapes: 'shapes'
  ShareAltSquare: 'share-alt-square'
  ShareAlt: 'share-alt'
  ShareSquare: 'share-square'
  Share: 'share'
  ShekelSign: 'shekel-sign'
  ShieldAlt: 'shield-alt'
  ShieldCheck: 'shield-check'
  Shield: 'shield'
  Ship: 'ship'
  ShippingFast: 'shipping-fast'
  ShippingTimed: 'shipping-timed'
  ShoePrints: 'shoe-prints'
  ShoppingBag: 'shopping-bag'
  ShoppingBasket: 'shopping-basket'
  ShoppingCart: 'shopping-cart'
  Shower: 'shower'
  ShuttleVan: 'shuttle-van'
  Shuttlecock: 'shuttlecock'
  SignInAlt: 'sign-in-alt'
  SignIn: 'sign-in'
  SignLanguage: 'sign-language'
  SignOutAlt: 'sign-out-alt'
  SignOut: 'sign-out'
  Sign: 'sign'
  Signal: 'signal'
  Sitemap: 'sitemap'
  Signature: 'signature'
  Skull: 'skull'
  Skeleton: 'skeleton'
  SlidersHSquare: 'sliders-h-square'
  SlidersH: 'sliders-h'
  SlidersVSquare: 'sliders-v-square'
  SlidersV: 'sliders-v'
  SmileBeam: 'smile-beam'
  SmilePlus: 'smile-plus'
  SmileWink: 'smile-wink'
  Smile: 'smile'
  SmokingBan: 'smoking-ban'
  Smoking: 'smoking'
  Snowflake: 'snowflake'
  SolarPanel: 'solar-panel'
  SortAlphaDown: 'sort-alpha-down'
  SortAlphaUp: 'sort-alpha-up'
  SortAmountDown: 'sort-amount-down'
  SortAmountUp: 'sort-amount-up'
  SortDown: 'sort-down'
  SortNumericDown: 'sort-numeric-down'
  SortNumericUp: 'sort-numeric-up'
  SortUp: 'sort-up'
  Sort: 'sort'
  Spa: 'spa'
  SpaceShuttle: 'space-shuttle'
  Spade: 'spade'
  Spinner: 'spinner'
  SpinnerThird: 'spinner-third'
  Splotch: 'splotch'
  SprayCan: 'spray-can'
  SquareFull: 'square-full'
  Square: 'square'
  Stamp: 'stamp'
  StarExclamation: 'star-exclamation'
  StarHalfAlt: 'star-half-alt'
  StarHalf: 'star-half'
  StarOfLife: 'star-of-life'
  Star: 'star'
  SteeringWheel: 'steering-wheel'
  StepBackward: 'step-backward'
  StepForward: 'step-forward'
  Stethoscope: 'stethoscope'
  Stomach: 'stomach'
  StickyNote: 'sticky-note'
  StopCircle: 'stop-circle'
  Stop: 'stop'
  Stopwatch: 'stopwatch'
  StoreAlt: 'store-alt'
  Store: 'store'
  Stream: 'stream'
  StreetView: 'street-view'
  Strikethrough: 'strikethrough'
  Stroopwafel: 'stroopwafel'
  Subscript: 'subscript'
  Subway: 'subway'
  SuitcaseRolling: 'suitcase-rolling'
  Suitcase: 'suitcase'
  Sun: 'sun'
  Superscript: 'superscript'
  Swatchbook: 'swatchbook'
  Surprise: 'surprise'
  Swimmer: 'swimmer'
  SwimmingPool: 'swimming-pool'
  Sync: 'sync'
  SyncAlt: 'sync-alt'
  Syringe: 'syringe'
  TableTennis: 'table-tennis'
  Table: 'table'
  TabletAlt: 'tablet-alt'
  TabletAndroidAlt: 'tablet-android-alt'
  TabletAndroid: 'tablet-android'
  TabletRugged: 'tablet-rugged'
  Tablet: 'tablet'
  Tablets: 'tablets'
  TachometerAltAverage: 'tachometer-alt-average'
  TachometerAltFast: 'tachometer-alt-fast'
  TachometerAltFastest: 'tachometer-alt-fastest'
  TachometerAltSlowest: 'tachometer-alt-slowest'
  TachometerAltSlow: 'tachometer-alt-slow'
  TachometerAlt: 'tachometer-alt'
  TachometerFast: 'tachometer-fast'
  TachometerAverage: 'tachometer-average'
  TachometerFastest: 'tachometer-fastest'
  TachometerSlow: 'tachometer-slow'
  TachometerSlowest: 'tachometer-slowest'
  Tag: 'tag'
  Tachometer: 'tachometer'
  Tags: 'tags'
  Tape: 'tape'
  Tasks: 'tasks'
  Taxi: 'taxi'
  TeethOpen: 'teeth-open'
  TennisBall: 'tennis-ball'
  Teeth: 'teeth'
  Terminal: 'terminal'
  TextWidth: 'text-width'
  TextHeight: 'text-height'
  ThLarge: 'th-large'
  ThList: 'th-list'
  Th: 'th'
  TheaterMasks: 'theater-masks'
  ThermometerEmpty: 'thermometer-empty'
  ThermometerFull: 'thermometer-full'
  ThermometerHalf: 'thermometer-half'
  ThermometerQuarter: 'thermometer-quarter'
  ThermometerThreeQuarters: 'thermometer-three-quarters'
  Thermometer: 'thermometer'
  ThumbsDown: 'thumbs-down'
  ThumbsUp: 'thumbs-up'
  Thumbtack: 'thumbtack'
  TicketAlt: 'ticket-alt'
  Ticket: 'ticket'
  TimesCircle: 'times-circle'
  TimesHexagon: 'times-hexagon'
  TimesOctagon: 'times-octagon'
  TimesSquare: 'times-square'
  Times: 'times'
  TintSlash: 'tint-slash'
  Tint: 'tint'
  TireFlat: 'tire-flat'
  TirePressureWarning: 'tire-pressure-warning'
  TireRugged: 'tire-rugged'
  Tire: 'tire'
  Tired: 'tired'
  ToggleOff: 'toggle-off'
  ToggleOn: 'toggle-on'
  Toolbox: 'toolbox'
  Tooth: 'tooth'
  Toothbrush: 'toothbrush'
  Trademark: 'trademark'
  TrafficCone: 'traffic-cone'
  TrafficLightGo: 'traffic-light-go'
  TrafficLightSlow: 'traffic-light-slow'
  TrafficLightStop: 'traffic-light-stop'
  TrafficLight: 'traffic-light'
  Train: 'train'
  TransgenderAlt: 'transgender-alt'
  Transgender: 'transgender'
  TrashAlt: 'trash-alt'
  Trash: 'trash'
  TreeAlt: 'tree-alt'
  Tree: 'tree'
  Triangle: 'triangle'
  TrophyAlt: 'trophy-alt'
  TruckContainer: 'truck-container'
  Trophy: 'trophy'
  TruckCouch: 'truck-couch'
  TruckLoading: 'truck-loading'
  TruckMoving: 'truck-moving'
  TruckMonster: 'truck-monster'
  TruckPickup: 'truck-pickup'
  TruckRamp: 'truck-ramp'
  Truck: 'truck'
  Tshirt: 'tshirt'
  Tty: 'tty'
  TvRetro: 'tv-retro'
  Tv: 'tv'
  UmbrellaBeach: 'umbrella-beach'
  Umbrella: 'umbrella'
  Underline: 'underline'
  Undo: 'undo'
  UndoAlt: 'undo-alt'
  University: 'university'
  UniversalAccess: 'universal-access'
  Unlink: 'unlink'
  Unlock: 'unlock'
  UnlockAlt: 'unlock-alt'
  Upload: 'upload'
  UsdCircle: 'usd-circle'
  UsdSquare: 'usd-square'
  UserAltSlash: 'user-alt-slash'
  UserAlt: 'user-alt'
  UserAstronaut: 'user-astronaut'
  UserCheck: 'user-check'
  UserCircle: 'user-circle'
  UserClock: 'user-clock'
  UserCog: 'user-cog'
  UserFriends: 'user-friends'
  UserEdit: 'user-edit'
  UserGraduate: 'user-graduate'
  UserLock: 'user-lock'
  UserNinja: 'user-ninja'
  UserMd: 'user-md'
  UserMinus: 'user-minus'
  UserPlus: 'user-plus'
  UserSecret: 'user-secret'
  UserShield: 'user-shield'
  UserSlash: 'user-slash'
  UserTag: 'user-tag'
  UserTie: 'user-tie'
  UserTimes: 'user-times'
  User: 'user'
  UsersClass: 'users-class'
  UsersCog: 'users-cog'
  Users: 'users'
  UtensilFork: 'utensil-fork'
  UtensilKnife: 'utensil-knife'
  UtensilSpoon: 'utensil-spoon'
  UtensilsAlt: 'utensils-alt'
  Utensils: 'utensils'
  VectorSquare: 'vector-square'
  VenusDouble: 'venus-double'
  VenusMars: 'venus-mars'
  Venus: 'venus'
  Vial: 'vial'
  Vials: 'vials'
  VideoPlus: 'video-plus'
  VideoSlash: 'video-slash'
  Video: 'video'
  VolleyballBall: 'volleyball-ball'
  VolumeDown: 'volume-down'
  VolumeMute: 'volume-mute'
  VolumeOff: 'volume-off'
  Walking: 'walking'
  Wallet: 'wallet'
  VolumeUp: 'volume-up'
  WarehouseAlt: 'warehouse-alt'
  Warehouse: 'warehouse'
  WatchFitness: 'watch-fitness'
  Watch: 'watch'
  WeightHanging: 'weight-hanging'
  Weight: 'weight'
  Wheelchair: 'wheelchair'
  Whistle: 'whistle'
  Wifi: 'wifi'
  WindowAlt: 'window-alt'
  WindowClose: 'window-close'
  WindowMaximize: 'window-maximize'
  WindowMinimize: 'window-minimize'
  WindowRestore: 'window-restore'
  Window: 'window'
  WineGlassAlt: 'wine-glass-alt'
  WineGlass: 'wine-glass'
  WonSign: 'won-sign'
  Wrench: 'wrench'
  XRay: 'x-ray'
  YenSign: 'yen-sign'
}
