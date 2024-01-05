import './styles.css'

import { useState, useEffect } from 'react'

import { Octokit } from 'octokit'

import { Chart as ChartJS, registerables } from 'chart.js'

import { Pie, Bar } from 'react-chartjs-2'

ChartJS.register(...registerables)

import { UserForm } from '../../components/UserForm/UserForm'
import { UserProfile } from '../../components/UserProfile/UserProfile'

import { UserProps } from '../../types/types'

import { CountBox } from '../../components/CountBox/CountBox'

import { RepoBox } from '../../components/RepoBox/RepoBox'

export function UserPage() {
  const [login, setLogin] = useState<string>('')
  const [userData, setUserData] = useState<UserProps>({})
  const [requestError, setRequestError] = useState(false)
  const [userRepos, setUserRepos] = useState<any[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [languagesUsage, setLanguagesUsage] = useState<any[]>([])
  const [languagesCount, setLanguagesCount] = useState([0])

  let totalStars = 0
  let totalForks = 0
  let totalWatchers = 0
  let totalIssues = 0

  const showUserInfo = login !== '' && !requestError

  const octokit = new Octokit({
    auth: import.meta.env.VITE_API_KEY
  })

  useEffect(() => {
    fetchUserData()
    fetchUserRepos()
  }, [login])

  useEffect(() => {
    fetchLanguages()
  }, [userRepos])

  useEffect(() => {
    countUsageOfLanguages()
  }, [languagesUsage])

  function handleFormSubmit(login: string) {
    setLogin(login)
  }

  async function fetchUserData() {
    if (login !== '') {
      try {
        const response = await octokit.request(`GET /users/${login}`)

        setUserData(response.data)
        setRequestError(false)
      } catch (error: any) {
        if (error.message === 'Not Found') {
          setRequestError(true)
          setUserData({})
        }
      }
    }
  }

  async function fetchUserRepos() {
    if (login !== '') {
      try {
        const response = await octokit.request(`GET /users/${login}/repos`)
        setUserRepos(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  }

  function fetchLanguages() {
    const uniqueLanguages: string[] = []
    const languagesObjects: any[] = []
    userRepos.map(async repo => {
      const response = await octokit.request(
        `GET /repos/${login}/${repo.name}/languages`
      )

      for (const language in response.data) {
        if (!uniqueLanguages.includes(language)) {
          uniqueLanguages.push(language)
        }
      }

      languagesObjects.push(response.data)
    })

    setLanguages(uniqueLanguages)
    setLanguagesUsage(languagesObjects)
  }

  function countUsageOfLanguages() {
    setTimeout(() => {
      const count: number[] = []
      languages.map(async language => {
        let languageSum = 0
        languagesUsage.map(index => {
          for (const item in index) {
            if (item === language) {
              languageSum += index[item]
            }
          }
        })
        count.push(languageSum)
      })
      setLanguagesCount(count)
    }, 2000)
  }

  function languageUsagePercentage() {
    let total = 0
    const percentages: string[] = []
    languagesCount.map(value => {
      total += value
    })

    languagesCount.map(value => {
      const percentage = ((value / total) * 100).toFixed(0)
      percentages.push(percentage)
    })

    return percentages
  }

  const renderReposBoxes: any[] = []

  if (userRepos.length === 0) {
  } else if (userRepos.length <= 4) {
    userRepos.map(repo => {
      renderReposBoxes.push(
        <RepoBox
          name={repo.name}
          description={repo.description}
          forks={repo.forks}
          stars={repo.stargazers_count}
          key={repo.name}
          login={login}
        />
      )
    })
  } else {
    for (let i = 1; i <= 4; i++) {
      renderReposBoxes.push(
        <RepoBox
          name={userRepos[i].name}
          description={userRepos[i].description}
          forks={userRepos[i].forks}
          stars={userRepos[i].stargazers_count}
          key={userRepos[i].name}
          login={login}
        />
      )
    }
  }

  userRepos.map(repo => {
    totalStars += repo.stargazers_count
    totalForks += repo.forks
    totalWatchers += repo.watchers
    totalIssues += repo.open_issues
  })

  return (
    <main id="user-page">
      <div className="main-top">
        <h1>User Page</h1>
        <section className="form">
          <UserForm handleFormSubmit={handleFormSubmit} />
          {requestError && <span>User not found</span>}
        </section>
      </div>
      {showUserInfo && (
        <div className="main-left">
          <section className="user-info">
            <UserProfile
              avatar_url={userData.avatar_url}
              bio={userData.bio}
              company={userData.company}
              email={userData.email}
              location={userData.location}
              login={userData.login}
              name={userData.name}
            />
          </section>
        </div>
      )}
      {showUserInfo && (
        <div className="main-right">
          <section className="counts">
            <CountBox count={userData.followers} title="followers" />
            <CountBox count={userData.following} title="following" />
            <CountBox count={userData.public_repos} title="Repositories" />
          </section>
          <section className="repos">
            <h2>Main repos</h2>
            <div className="repos-boxes">{renderReposBoxes}</div>
          </section>
          <section className="charts">
            <h2>User Stats</h2>
            <div className="charts-container">
              <Pie
                data={{
                  labels: languages,
                  datasets: [
                    {
                      label: 'Language usage (%)',
                      data: languageUsagePercentage(),
                      backgroundColor: [
                        'red',
                        'green',
                        'yellow',
                        'blue',
                        'magenta',
                        'orange',
                        'purple',
                        'gray',
                        'brown',
                        'chocolate',
                        'darkblue',
                        'tomato',
                        'teal',
                        'seagreen',
                        'sienna',
                        'salmon',
                        'royalblue',
                        'pink',
                        'peru',
                        'olive',
                        'navy',
                        'indigo',
                        'lime'
                      ]
                    }
                  ]
                }}
                id="language-usage"
                className="chart"
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: 'Languages used (%)',
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
              <Bar
                data={{
                  labels: ['Stars', 'Forks', 'Watchers', 'Issues'],
                  datasets: [
                    {
                      label: '',
                      data: [
                        totalStars,
                        totalForks,
                        totalWatchers,
                        totalIssues
                      ],
                      backgroundColor: ['olive', 'navy', 'peru', 'lime']
                    }
                  ]
                }}
                id="repos- stats-count"
                className="chart"
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: 'Repos stats',
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
            </div>
          </section>
        </div>
      )}
    </main>
  )
}
