import { useState, useEffect } from 'react'

import { Octokit } from 'octokit'

import { UserForm } from '../../components/UserForm/UserForm'
import { UserProfile } from '../../components/UserProfile/UserProfile'

import { UserProps } from '../../types/types'

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
      <h1>User Page</h1>
      <section className="form">
        <UserForm handleFormSubmit={handleFormSubmit} />
        {requestError && <span>User not found</span>}
      </section>
      {showUserInfo && (
        <section className="user-info">
          <UserProfile userData={userData} />
        </section>
      )}
    </main>
  )
}
