import './styles.css'

import { RepoBoxProps } from '../../types/types'

import { Octokit } from 'octokit'

import { useState, useEffect } from 'react'

export function RepoBox(props: RepoBoxProps) {
  const [languages, setLanguages] = useState({
    language: 0
  })

  const octokit = new Octokit({
    auth: import.meta.env.VITE_API_KEY
  })

  useEffect(() => {
    fetchLanguages()
  }, [])

  async function fetchLanguages() {
    const response = await octokit.request(
      `GET /repos/${props.login}/${props.name}/languages`
    )

    setLanguages(response.data)
  }

  const renderLanguagesList: any[] = []

  for (const language in languages) {
    renderLanguagesList.push(
      <li key={language}>
        <div className="circle"></div>
        <span>{language}</span>
      </li>
    )
  }

  return (
    <div className="repo box">
      <div className="top">
        <img src="../folder.svg" className="icon" />
        <span className="repo-name">{props.name}</span>
      </div>
      <div className="middle">
        <p className="repo-description">{props.description}</p>
      </div>
      <div className="bottom">
        <div className="bottom-left">
          <ul className="stars-forks">
            <li>
              <img src="../star.svg" className="icon" />
              <span>{props.stars}</span>
            </li>
            <li>
              <img src="../fork.svg" className="icon" />
              <span>{props.forks}</span>
            </li>
          </ul>
        </div>
        <div className="bottom-right">
          <ul className="languages-list">{renderLanguagesList}</ul>
        </div>
      </div>
    </div>
  )
}
