import { CountBoxProps } from '../../types/types'

import './styles.css'

export function CountBox(props: CountBoxProps) {
  return (
    <div className="users-count box">
      <h3>{props.title}</h3>
      <span>{props.count}</span>
    </div>
  )
}
