import React, { PureComponent } from 'react'

export interface Props extends BaseProps {
  mode: 'container' | 'window'
  offsetAdjust: number
  onScroll(
    event: { scrollLeft: number; scrollTop: number },
    target: HTMLElement
  ): void
}

const RE = /(auto|scroll)/
function isElementScrollable(element: HTMLElement) {
  const style = window.getComputedStyle(element)
  const scroll = style.getPropertyValue('overflow')
  const scrollY = style.getPropertyValue('overflow-y')

  return RE.test(scroll) || RE.test(scrollY)
}

function findScrollParent(node: Node) {
  if (!node || node === document.body) return window
  else if (isElementScrollable(node as HTMLElement)) return node
  else return findScrollParent(node.parentElement)
}

export default class ScrollObserver extends PureComponent<Props> {
  targetRef: { current: HTMLElement | null } = { current: null }
  scrollRef: { current: HTMLElement | null } = { current: null }

  detectedMode: 'window' | 'container'
  lastScrollLeft: number = 0
  lastScrollTop: number = 0

  componentWillUnmount() {
    this.unregister()
  }

  get isWindowMode() {
    return this.props.mode === 'window'
  }

  register() {
    if (this.scrollRef.current) {
      this.scrollRef.current.addEventListener('scroll', this.handleScroll, {
        passive: true,
      })
    }

    if (this.isWindowMode && this.targetRef.current) {
      this.targetRef.current.addEventListener('scroll', this.handleScroll, {
        passive: true,
      })
    }
  }

  unregister() {
    if (this.scrollRef.current) {
      this.scrollRef.current.removeEventListener('scroll', this.handleScroll)
    }

    if (this.targetRef.current) {
      this.targetRef.current.removeEventListener('scroll', this.handleScroll)
    }
  }

  getWindowScrollTop() {
    const scrollTop =
      'scrollY' in window ? window.scrollY : document.documentElement.scrollTop

    return Number.isFinite(scrollTop) ? scrollTop : 0
  }

  handleScroll = (event: UIEvent) => {
    const target = event.currentTarget as any
    const isTargetWindow = target === window

    const _scrollTop =
      target === this.scrollRef.current
        ? isTargetWindow
          ? this.getWindowScrollTop()
          : target.scrollTop
        : this.lastScrollTop
    const scrollLeft =
      this.targetRef.current === target
        ? target.scrollLeft
        : this.lastScrollLeft

    const offsetTop =
      (this.targetRef.current.offsetParent as HTMLElement).offsetTop +
      this.props.offsetAdjust

    this.lastScrollTop = _scrollTop
    this.lastScrollLeft = scrollLeft

    if (this.isWindowMode && isTargetWindow && offsetTop > _scrollTop) return

    const scrollTop = this.isWindowMode
      ? Math.max(0, _scrollTop - offsetTop)
      : _scrollTop

    this.props.onScroll({ scrollLeft, scrollTop }, this.targetRef.current)
  }

  handleRef = (target: HTMLElement | null) => {
    if (this.targetRef.current !== target) {
      this.unregister()
      this.targetRef.current = target
      if (this.isWindowMode)
        this.scrollRef.current = findScrollParent(
          this.targetRef.current.parentNode
        )
      else this.scrollRef.current = target
      this.register()
    }

    const node = React.Children.only(this.props.children)
    if (typeof node.ref === 'function') {
      node.ref(target)
    }
  }

  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      ref: this.handleRef,
    })
  }
}
