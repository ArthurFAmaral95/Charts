import './styles.css'

import { CountBox } from '../../components/CountBox/CountBox'

import { useState, useEffect } from 'react'

import { Octokit } from 'octokit'

export function HomePage() {
  const [usersData, setUsersData] = useState<any[]>([])
  const [usersCount, setUsersCount] = useState(0)
  const [locations, setLocations] = useState<string[]>([])
  const [reposCount, setReposCount] = useState(0)

  const octokit = new Octokit({
    auth: import.meta.env.VITE_API_KEY
  })

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fillCounts()
  }, [usersData])

  async function fetchData() {
    try {
      const response: any = await octokit.request('GET /users')

      setUsersData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  function fillCounts() {
    const fillLocations: string[] = []
    usersData.map(async user => {
      try {
        const response = await octokit.request(`GET /users/${user.login}`)
        setUsersCount(prevState => prevState + response.data.followers)
        setReposCount(prevState => prevState + response.data.public_repos)

        if (
          fillLocations.includes(response.data.location) ||
          response.data.location === null
        ) {
        } else {
          fillLocations.push(response.data.location)
        }
        setLocations(fillLocations)
      } catch (error) {
        console.error(error)
      }
    })
  }

  return (
    <main id="home-page">
      <h1>Home Page</h1>
      <section className="counts">
        <CountBox count={usersCount} title="users" />
        <CountBox count={reposCount} title="repositories" />
        <CountBox count={locations.length} title="locations" />
      </section>
    </main>
  )
}
