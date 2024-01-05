import './styles.css'

import { DatesBoxProps } from '../../types/types'

export function DatesBox(props: DatesBoxProps) {
  const userCrationDate = props.created?.split('T')[0]
  const userLastModifiedDate = props.modified?.split('T')[0]

  return (
    <div className="dates box">
      <ul className="dates-list">
        <li>
          <span className="label">Created:</span>
          <span>{userCrationDate}</span>
        </li>
        <li>
          <span className="label">Modified:</span>
          <span>{userLastModifiedDate}</span>
        </li>
      </ul>
    </div>
  )
}
