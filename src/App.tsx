import { useState } from 'react'
import { SideBar } from './components/SideBar/SideBar'

export function App() {
  const [sideBarOpen, setSideBarOpen] = useState(true)

  function handleSideBar() {
    setSideBarOpen(!sideBarOpen)
  }

  return (
    <>
      <SideBar sideBarOpen={sideBarOpen} handleSideBar={handleSideBar} />
    </>
  )
}
