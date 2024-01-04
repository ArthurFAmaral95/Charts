import './styles.css'

import { useState, useEffect } from 'react'

import { Octokit } from 'octokit'

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

  const showUserInfo = login !== '' && !requestError

  const octokit = new Octokit({
    auth: import.meta.env.VITE_API_KEY
  })

  useEffect(() => {
    fetchUserData()
    fetchUserRepos()
  }, [login])

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
        </div>
      )}
    </main>
  )
}
