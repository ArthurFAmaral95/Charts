import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { HandleFormSubmit } from '../../types/types'

const UserFormSchema = z.object({
  login: z.string().min(1, 'Search for an user to continue.').trim()
})

export type UserFormProps = z.infer<typeof UserFormSchema>

export function UserForm(props: HandleFormSubmit) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserFormProps>({ resolver: zodResolver(UserFormSchema) })

  function sendLogin(data: UserFormProps) {
    props.handleFormSubmit(data.login)
  }

  return (
    <form id="user-form" onSubmit={handleSubmit(sendLogin)}>
      <div className="input-text">
        <label htmlFor="login">User Login</label>
        {errors.login && <span>{errors.login.message}</span>}
      </div>
      <input type="text" id="login" {...register('login')} />
      <button>Search</button>
    </form>
  )
}
