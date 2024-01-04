import './styles.css'

import { useState, useEffect } from 'react'

import { Octokit } from 'octokit'

import { UserForm } from '../../components/UserForm/UserForm'
import { UserProfile } from '../../components/UserProfile/UserProfile'

import { UserProps } from '../../types/types'

import { CountBox } from '../../components/CountBox/CountBox'

export function UserPage() {
  const [login, setLogin] = useState<string>('')
  const [userData, setUserData] = useState<UserProps>({})
  const [requestError, setRequestError] = useState(false)

  const showUserInfo = login !== '' && !requestError

  const octokit = new Octokit({
    auth: import.meta.env.VITE_API_KEY
  })

  useEffect(() => {
    fetchUserData()
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

  return (
    <main id="user-page">
      <div className="main-top">
        <h1>User Page</h1>
        <section className="form">
          <UserForm handleFormSubmit={handleFormSubmit} />
          {requestError && <span>User not found</span>}
        </section>
      </div>
      <div className="main-left">
        {showUserInfo && (
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
        )}
      </div>
      <div className="main-right">
        <section className="counts">
          <CountBox count={userData.followers} title="followers" />
          <CountBox count={userData.following} title="following" />
          <CountBox count={userData.public_repos} title="Repositories" />
        </section>
      </div>
    </main>
  )
}
