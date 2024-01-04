import './styles.css'

import { UserProfileProps } from '../../types/types'

export function UserProfile(props: UserProfileProps) {
  return (
    <div className="user-profile">
      <div className="user-pic-name">
        <img src={props.avatar_url} alt={props.name} />
        <h2 className="name">{props.name}</h2>
        <p className="bio">{props.bio}</p>
      </div>
      <div className="user-social-info">
        <ul>
          <li>
            <img src="../location.svg" alt="" />
            <span>{props.location}</span>
          </li>
          <li>
            <img src="../company.svg" alt="" />
            <span>{props.company}</span>
          </li>
          <li>
            <img src="../mail.svg" alt="" />
            <span>{props.email}</span>
          </li>
          <li>
            <img src="../github-icon.svg" alt="" />
            <span>{props.login}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
