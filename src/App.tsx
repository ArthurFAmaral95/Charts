import { useState, useEffect } from 'react'
import { SideBar } from './components/SideBar/SideBar'

import axios from 'axios'

export function App() {
  const [sideBarOpen, setSideBarOpen] = useState(true)

  const [apiData, setApiData] = useState([])

  const apiUrl = 'https://api.github.com/users'

  useEffect(() => {
    fetchData()
  }, [])

  function handleSideBar() {
    setSideBarOpen(!sideBarOpen)
  }

  function fetchData() {
    axios
      .get(apiUrl)
      .then(response => {
        setApiData(response.data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <>
      <SideBar sideBarOpen={sideBarOpen} handleSideBar={handleSideBar} />
    </>
  )
}
