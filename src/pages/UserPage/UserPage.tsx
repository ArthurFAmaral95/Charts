import { useState } from 'react'

import { Octokit } from 'octokit'

import { UserForm } from '../../components/UserForm/UserForm'

export function UserPage() {
  const [login, setLogin] = useState<string>('')
  const [userData, setUserData] = useState<any[]>([])

  function handleFormSubmit(login: string) {
    setLogin(login)
  }

  return (
    <main id="user-page">
      <h1>User Page</h1>
      <UserForm handleFormSubmit={handleFormSubmit} />
    </main>
  )
}
