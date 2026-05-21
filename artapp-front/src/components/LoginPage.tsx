
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { authService } from '../services/auth.service'
import { useState } from 'react'

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setServerError('')
    try {
      const response = await authService.login(data.email, data.password)

      login(response.token, response.username, response.roles)
      navigate('/dashboard')
    } catch {
      setServerError('Email ou mot de passe incorrect')
    }
  }

  return (
    <div className="min-h-screen bg-fuchsia-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm">

        <h1 className="text-2xl font-bold text-fuchsia-600 mb-6 text-center">
          ArtApp
        </h1>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Connexion
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
              {...register('password')}
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {serverError && (
            <p className="text-red-500 text-sm text-center">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-2 rounded font-medium text-sm disabled:opacity-50"
          >
            {isSubmitting ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Pas encore inscrit ?{' '}
          <Link to="/register" className="text-fuchsia-600 hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}
