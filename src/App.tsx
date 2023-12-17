import { useState, useEffect } from 'react'
import { SideBar } from './components/SideBar/SideBar'
import { HomePage } from './pages/HomePage/HomePage'
import { UserPage } from './pages/UserPage/UserPage'

import axios from 'axios'

export function App() {
  const [sideBarOpen, setSideBarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState('home')

  const [usersData, setUsersData] = useState([])

  const apiUrl = 'https://api.github.com/users'

  useEffect(() => {
    fetchData()
  }, [])

  function handleSideBar() {
    setSideBarOpen(!sideBarOpen)
  }

  function changePage(page: string) {
    setCurrentPage(page)
  }

  function fetchData() {
    axios
      .get(apiUrl)
      .then(response => {
        setUsersData(response.data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  console.log(usersData[0])

  return (
    <div className="container">
      <SideBar
        sideBarOpen={sideBarOpen}
        handleSideBar={handleSideBar}
        changePage={changePage}
      />

      {currentPage === 'home' && <HomePage count={usersData.length} />}
      {currentPage === 'user' && <UserPage />}
    </div>
  )
}
