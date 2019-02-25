import React from 'react'
import PropTypes from 'prop-types'
import { withAppState } from '@spectrum'
import { setUser } from '@state/user'

function User({ user, onUserUpdate }) {
  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => onUserUpdate({ name: 'Jane Doe', email: 'jane.doe@example.com' })}>Create User</button>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object,
  onUserUpdate: PropTypes.func
}

export default withAppState(
  state => ({
    user: state.user
  }),
  { onUserUpdate: setUser }
)(User)
