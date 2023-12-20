import './styles.css'

import { HandleSideBar, ChangePage } from '../../types/types'

type SideBarProps = HandleSideBar & ChangePage

export function SideBar(props: SideBarProps) {
  return (
    <aside>
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
