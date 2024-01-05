import './styles.css'

import { UserProfileProps } from '../../types/types'

export function UserProfile(props: UserProfileProps) {
  return (
    <div className="user-profile box">
      <div className="user-pic-name">
        <img src={props.avatar_url} alt={props.name} className="user-avatar" />
        <h2 className="name">{props.name}</h2>
        <p className="bio">{props.bio}</p>
      </div>
      <div className="user-social-info">
        <ul>
          <li>
            <img src="../location.svg" className="icon" />
            <span>{props.location}</span>
          </li>
          <li>
            <img src="../company.svg" className="icon" />
            <span>{props.company}</span>
          </li>
          <li>
            <img src="../mail.svg" className="icon" />
            <span>{props.email}</span>
          </li>
          <li>
            <img src="../github-icon.svg" className="icon" />
            <span>{props.login}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
