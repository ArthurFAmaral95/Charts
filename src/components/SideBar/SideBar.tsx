import './styles.css'

import { SideBarOpen, HandleSideBar, ChangePage } from '../../types/types'

type SideBarProps = SideBarOpen & HandleSideBar & ChangePage

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

      <nav className="fields">
        <div
          className="field"
          onClick={() => {
            props.changePage('home')
          }}
        >
          <img src="./home.svg" alt="Home icon" />
          <span>Home</span>
        </div>
        <div
          className="field"
          onClick={() => {
            props.changePage('user')
          }}
        >
          <img src="./user.svg" alt="User icon" />
          <span>User</span>
        </div>
      </nav>
    </aside>
  )
}
