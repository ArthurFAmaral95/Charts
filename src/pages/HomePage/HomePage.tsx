import { UsersCount } from '../../components/UsersCount/UsersCount'

import { Count } from '../../types/types'

export function HomePage(props: Count) {
  return (
    <main id="home-page">
      <h1>Home Page</h1>
      <UsersCount count={props.count} />
    </main>
  )
}
