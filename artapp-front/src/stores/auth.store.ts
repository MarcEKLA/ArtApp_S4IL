
import { create } from 'zustand'

interface AuthState {
  token: string | null
  email: string | null
  roles: string[]
  isAuthenticated: boolean
  login: (token: string, email: string, roles: string[]) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({

  token: localStorage.getItem('token'),
  email: localStorage.getItem('email'),
  roles: JSON.parse(localStorage.getItem('roles') || '[]'),
  isAuthenticated: !!localStorage.getItem('token'),

  login: (token, email, roles) => {

    localStorage.setItem('token', token)
    localStorage.setItem('email', email)
    localStorage.setItem('roles', JSON.stringify(roles))
    set({ token, email, roles, isAuthenticated: true })
  },

  logout: () => {

    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('roles')
    set({ token: null, email: null, roles: [], isAuthenticated: false })
  },
}))
