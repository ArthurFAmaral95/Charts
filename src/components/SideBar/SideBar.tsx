import './styles.css'

import { SideBarOpen, HandleSideBar } from '../../types/types'

type SideBarProps = SideBarOpen & HandleSideBar

export function SideBar(props: SideBarProps) {
  return (
    <aside className={props.sideBarOpen ? '' : 'hidden'}>
      <img
        src="./menu.svg"
        alt="Menu icon"
        onClick={() => {
          props.handleSideBar()
        }}
      />

      <div className="fields">
        <div className="field">
          <img src="./home.svg" alt="Home icon" />
          <span>Home</span>
        </div>
        <div className="field">
          <img src="./user.svg" alt="User icon" />
          <span>User</span>
        </div>
      </div>
    </aside>
  )
}
