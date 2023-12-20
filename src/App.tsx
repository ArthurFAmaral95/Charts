import { useState } from 'react'
import { SideBar } from './components/SideBar/SideBar'
import { HomePage } from './pages/HomePage/HomePage'
import { UserPage } from './pages/UserPage/UserPage'

export function App() {
  const [sideBarOpen, setSideBarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState('home')

  function handleSideBar() {
    setSideBarOpen(!sideBarOpen)
  }

  function changePage(page: string) {
    setCurrentPage(page)
  }

  return (
    <div className={sideBarOpen ? 'container' : 'container hidden'}>
      <SideBar handleSideBar={handleSideBar} changePage={changePage} />

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'user' && <UserPage />}
    </div>
  )
}
