import { Count } from '../../types/types'

import './styles.css'

export function UsersCount(props: Count) {
  return (
    <div className="users-count box">
      <h3>Active Users</h3>
      <span>{props.count}</span>
    </div>
  )
}
