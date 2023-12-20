import './styles.css'

import '../../styles/charts.css'

import { CountBox } from '../../components/CountBox/CountBox'

import { useState, useEffect } from 'react'

import { Octokit } from 'octokit'

import { Chart as ChartJS, registerables } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(...registerables)

export function HomePage() {
  const [usersData, setUsersData] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
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
    const individualUsers: any[] = []
    usersData.map(async user => {
      try {
        const response = await octokit.request(`GET /users/${user.login}`)
        individualUsers.push(response.data)
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
        setUsers(individualUsers)
      } catch (error) {
        console.error(error)
      }
    })
  }

  function countUserPerLocation() {
    const count: number[] = []
    locations.map(location => {
      let numberOfUsers = 0
      users.map(user => {
        if (user.location === location) {
          numberOfUsers += user.followers
        }
      })
      count.push(numberOfUsers)
    })

    return count
  }

  function countReposPerLocation() {
    const count: number[] = []
    locations.map(location => {
      let numberOfUsers = 0
      users.map(user => {
        if (user.location === location) {
          numberOfUsers += user.public_repos
        }
      })
      count.push(numberOfUsers)
    })

    return count
  }

  function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  function generateRandomColor() {
    const rgb = `rgb(${generateRandomNumber(0, 50)},${generateRandomNumber(
      0,
      150
    )},${generateRandomNumber(0, 100)})`

    return rgb
  }

  function colorLocation() {
    const colors: string[] = []
    locations.map(() => {
      const color = generateRandomColor()
      colors.push(color)
    })
    return colors
  }

  return (
    <main id="home-page">
      <h1>Home Page</h1>
      <section className="counts">
        <CountBox count={usersCount} title="users" />
        <CountBox count={reposCount} title="repositories" />
        <CountBox count={locations.length} title="locations" />
      </section>
      <section className="charts">
        <Bar
          data={{
            labels: locations,
            datasets: [
              {
                label: '# of Users',
                data: countUserPerLocation(),
                backgroundColor: 'black'
              }
            ]
          }}
          id="user-location"
          className="chart"
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Number of Users per Location',
                align: 'center',
                font: {
                  size: 20
                }
              }
            },
            responsive: true,
            maintainAspectRatio: false
          }}
        />
        <Pie
          data={{
            labels: locations,
            datasets: [
              {
                label: '# of Repos',
                data: countReposPerLocation(),
                backgroundColor: colorLocation()
              }
            ]
          }}
          id="repo-location"
          className="chart"
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Number of Repositories per Location',
                align: 'center',
                font: {
                  size: 20
                }
              },
              legend: {
                display: false
              }
            },
            responsive: true,
            maintainAspectRatio: false
          }}
        />
      </section>
    </main>
  )
}
