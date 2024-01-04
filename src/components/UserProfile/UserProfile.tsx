import './styles.css'

import { UserProfileProps } from '../../types/types'

export function UserProfile(props: UserProfileProps) {
  return (
    <div className="user-profile">
      <div className="user-pic-name">
        <img src={props.userData.avatar_url} alt={props.userData.name} />
        <h2 className="name">{props.userData.name}</h2>
        <p className="bio">{props.userData.bio}</p>
      </div>
      <div className="user-social-info">
        <ul>
          <li>
            <img src="../location.svg" alt="" />
            <span>{props.userData.location}</span>
          </li>
          <li>
            <img src="../company.svg" alt="" />
            <span>{props.userData.company}</span>
          </li>
          <li>
            <img src="../mail.svg" alt="" />
            <span>{props.userData.email}</span>
          </li>
          <li>
            <img src="../github-icon.svg" alt="" />
            <span>{props.userData.login}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
