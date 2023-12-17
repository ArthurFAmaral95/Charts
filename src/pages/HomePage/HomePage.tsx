import { CountBox } from '../../components/CountBox/CountBox'

import { useState, useEffect } from 'react'

import axios from 'axios'

export function HomePage() {
  const [usersData, setUsersData] = useState([])

  const apiUrl = import.meta.env.VITE_API_URL

  let usersCount = 0
  // let locations: string[] = []
  // let reposCount = 0

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fillCounts()
  }, [usersData])

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

  function fillCounts() {
    // usersData.map(user => {
    //   axios
    //     .get(`${apiUrl}/${user.login}`)
    //     .then(response => {
    //       usersCount += response.data.followers
    //     })
    //     .then(() => {
    //       console.log({ usersCount, locations, reposCount })
    //     })
    // })
  }

  return (
    <main id="home-page">
      <h1>Home Page</h1>
      <CountBox count={usersCount} title='users'/>
    </main>
  )
}
