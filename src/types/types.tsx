export type SideBarOpen = {
  sideBarOpen: boolean
}

export type CountBoxProps = {
  count: number | string | undefined
  title: string
}

export type UserProps = {
  avatar_url?: string
  bio?: string
  blog?: string
  company?: string
  created_at?: string
  email?: string
  events_url?: string
  followers?: number | string
  followers_url?: string
  following?: number | string
  following_url?: string
  gists_url?: string
  gravatar_id?: string
  hireable?: boolean | undefined | null
  html_url?: string
  id?: number | string
  location?: string
  login?: string
  name?: string
  node_id?: string
  organizations_url?: string
  public_gists?: string | number
  public_repos?: number
  received_events_url?: string
  repos_url?: string
  site_admin?: boolean
  starred_url?: string
  subscriptions_url?: string
  twitter_username?: string
  type?: string
  updated_at?: string
  url?: string
}

export type UserProfileProps = {
  avatar_url?: string
  bio?: string
  company?: string
  email?: string
  location?: string
  login?: string
  name?: string
}

export type RepoBoxProps = {
  name?: string
  description?: string
  stars?: number
  forks?: number
  login?: string
}

export type DatesBoxProps = {
  created?: string
  modified?: string
}

export type HandleSideBar = {
  handleSideBar: () => void
}

export type ChangePage = {
  changePage: (page: string) => void
}

export type HandleFormSubmit = {
  handleFormSubmit: (login: string) => void
}
