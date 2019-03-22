class InteractionObserverMock {
  constructor(handler, options) {
    this.handler = handler
    this.options = options
    InteractionObserverMock.instances.push(this)
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

InteractionObserverMock.instances = []
InteractionObserverMock.clear = () => {
  InteractionObserverMock.instances = []
}

module.exports = InteractionObserverMock
