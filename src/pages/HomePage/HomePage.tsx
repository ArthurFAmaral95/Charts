import './styles.css'

import '../../styles/charts.css'

import { CountBox } from '../../components/CountBox/CountBox'

import { UserProps } from '../../types/types'

import { useState, useEffect } from 'react'

import { Octokit } from 'octokit'

import { Chart as ChartJS, registerables } from 'chart.js'
import { Bar, Pie, Radar, Line } from 'react-chartjs-2'

ChartJS.register(...registerables)

export function HomePage() {
  const [usersData, setUsersData] = useState<any[]>([])
  const [users, setUsers] = useState<UserProps[]>([])
  const [logins, setLogins] = useState<string[]>([])
  const [usersCount, setUsersCount] = useState(0)
  const [locations, setLocations] = useState<string[]>([])
  const [reposCount, setReposCount] = useState(0)
  const [companies, setCompanies] = useState<string[]>([])
  const [dates, setDates] = useState<(string | undefined)[]>([])
  const [newUsersPerDate, setNewUsersPerDate] = useState<number[]>([])
  const [totalUsersPerDate, setTotalUsersPerDate] = useState<number[]>([])

  const octokit = new Octokit({
    auth: import.meta.env.VITE_API_KEY
  })

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fillCounts()
    usersLogins()
  }, [usersData])

  useEffect(() => {
    fillUserPerDate()
  }, [users])

  async function fetchData() {
    try {
      const response: any = await octokit.request('GET /users')

      setUsersData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  function usersLogins() {
    const logins: string[] = []
    usersData.map(user => {
      logins.push(user.login)
    })
    setLogins(logins)
  }

  function fillCounts() {
    const fillLocations: string[] = []
    const individualUsers: any[] = []
    const fillCompanies: string[] = []
    usersData.map(async user => {
      try {
        const response = await octokit.request(`GET /users/${user.login}`)
        individualUsers.push(response.data)
        setUsersCount(prevState => prevState + 1)
        setReposCount(prevState => prevState + response.data.public_repos)

        if (
          fillLocations.includes(response.data.location) ||
          response.data.location === null
        ) {
        } else {
          fillLocations.push(response.data.location)
        }

        if (response.data.company === null) {
        } else {
          const userCompanies: string[] = response.data.company.split(',')
          userCompanies.map(company => {
            if (!fillCompanies.includes(company)) {
              fillCompanies.push(company)
            }
          })
        }

        setLocations(fillLocations)
        setUsers(individualUsers)
        setCompanies(fillCompanies)
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
          numberOfUsers += 1
        }
      })
      count.push(numberOfUsers)
    })

    return count
  }

  function countReposPerLocation() {
    const count: number[] = []
    locations.map(location => {
      let numberOfRepos = 0
      users.map(user => {
        if (user.location === location && user.public_repos != undefined) {
          numberOfRepos += user.public_repos
        }
      })
      count.push(numberOfRepos)
    })

    return count
  }

  function countReposPerUser() {
    const count: number[] = []

    users.map(user => {
      if (user.public_repos) {
        count.push(user.public_repos)
      }
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

  function fillUserPerDate() {
    const uniqueDates: (string | undefined)[] = []
    users.map(user => {
      if (!uniqueDates.includes(user.created_at?.split('T')[0])) {
        uniqueDates.push(user.created_at?.split('T')[0])
      }
    })

    setDates(uniqueDates)

    const dayArray: number[] = []
    const totalArray: number[] = [0]

    uniqueDates.map(date => {
      let count = 0

      users.map(user => {
        if (user.created_at?.split('T')[0] === date) {
          count++
        }
      })
      dayArray.push(count)

      totalArray.push(count + totalArray[totalArray.length - 1])
    })
    totalArray.shift()
    setNewUsersPerDate(dayArray)
    setTotalUsersPerDate(totalArray)
  }

  return (
    <main id="home-page">
      <h1>Home Page</h1>
      <section className="counts">
        <CountBox count={usersCount} title="users" />
        <CountBox count={reposCount} title="repositories" />
        <CountBox count={locations.length} title="locations" />
        <CountBox count={companies.length} title="companies" />
      </section>
      <section className="charts">
        <Bar
          data={{
            labels: logins,
            datasets: [
              {
                label: '# of Repos',
                data: countReposPerUser(),
                backgroundColor: 'black'
              }
            ]
          }}
          id="repo-user"
          className="chart"
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Number of Repositories per User',
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
                display: true,
                align: 'center',
                position: 'left',
                fullSize: false,
                labels: {
                  boxWidth: 10
                }
              }
            },
            responsive: true,
            maintainAspectRatio: false
          }}
        />

        <Radar
          data={{
            labels: locations,
            datasets: [
              {
                label: '# of Users',
                data: countUserPerLocation()
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
              },
              legend: {
                display: false
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                suggestedMin: 0
              }
            }
          }}
        />
        <Line
          data={{
            labels: dates,
            datasets: [
              {
                label: '# of new user',
                data: newUsersPerDate,
                fill: 'start'
              },
              {
                label: '# of total users',
                data: totalUsersPerDate,
                fill: 'start'
              }
            ]
          }}
          id="date-users"
          className="chart"
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Number of users',
                align: 'center',
                font: {
                  size: 20
                }
              },
              legend: {
                display: true
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxix: {
                min: 0
              }
            }
          }}
        />
      </section>
    </main>
  )
}
