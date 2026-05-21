
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../services/auth.service'
import { useState } from 'react'

const passwordSchema = z
  .string()
  .min(12, 'Au moins 12 caractères')
  .regex(/[A-Z]/, 'Au moins une majuscule')
  .regex(/[a-z]/, 'Au moins une minuscule')
  .regex(/[0-9]/, 'Au moins un chiffre')
  .regex(/[^A-Za-z0-9]/, 'Au moins un caractère spécial (!@#$...)')

const registerSchema = z.object({
  nom: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit faire au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  password: passwordSchema,
})

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterPage() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setServerError('')
    try {
      await authService.register(data.nom, data.prenom, data.email, data.password)
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch {
      setServerError('Cet email est déjà utilisé')
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-fuchsia-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-green-600 font-semibold text-lg">Inscription réussie !</p>
          <p className="text-gray-500 text-sm mt-2">Redirection vers la connexion...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-fuchsia-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-fuchsia-600 mb-6 text-center">ArtApp</h1>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Inscription</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input {...register('nom')} type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500" />
            {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input {...register('prenom')} type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500" />
            {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input {...register('email')} type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input {...register('password')} type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500" />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            <p className="text-gray-400 text-xs mt-1">12 car. min, maj, min, chiffre, spécial</p>
          </div>

          {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

          <button type="submit" disabled={isSubmitting}
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-2 rounded font-medium text-sm disabled:opacity-50">
            {isSubmitting ? 'Inscription...' : "S'inscrire"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Déjà inscrit ?{' '}
          <Link to="/login" className="text-fuchsia-600 hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
