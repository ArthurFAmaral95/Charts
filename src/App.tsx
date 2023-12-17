import { useState, useEffect } from 'react'
import { SideBar } from './components/SideBar/SideBar'
import { HomePage } from './pages/HomePage/HomePage'
import { UserPage } from './pages/UserPage/UserPage'

import axios from 'axios'

export function App() {
  const [sideBarOpen, setSideBarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState('home')

  const [usersData, setUsersData] = useState([])

  const apiUrl = import.meta.env.VITE_API_URL

  console.log(apiUrl)

  let usersCount = 0
  let locations: string[] = []
  let reposCount = 0

  useEffect(() => {
    fetchData()
  }, [])

  // useEffect(() => {
  //   fillCounts()
  // }, [usersData])

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

  // function fillCounts() {
  //   // usersData.map(user => {
  //   //   axios.get(`${apiUrl}/${user.login}`).then(response => {
  //   //     usersCount += response.data.followers
  //   //   })
  //   // })
  // }
  // console.log({ usersCount, locations, reposCount })

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
