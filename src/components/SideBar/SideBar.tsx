import './styles.css'

export function SideBar() {
  return (
    <aside>
      <img src="./menu.svg" alt="Menu icon" />

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
