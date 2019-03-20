import { PureComponent } from 'react'
import PropTypes from 'prop-types'

/**
 A component to sort data.

 @since 0.3.0
 @status EXPERIMENTAL
 @example
<Sortable data={[1, 4, 3, 2]}>
  {data => (
    <ul>
      {data.map(item => <li key={item}>{item}</li>)}
    </ul>
  )}
</Sortable>
 */
class Sortable extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    compareFn: PropTypes.func,
    children: PropTypes.func.isRequired
  }

  render() {
    return this.props.children(this.props.data.slice().sort(this.props.compareFn))
  }
}

export default Sortable
