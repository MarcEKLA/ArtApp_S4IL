import { useAuthStore } from '../stores/auth.store'

export function useAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const email = useAuthStore((state) => state.email)
  const roles = useAuthStore((state) => state.roles)
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)

  const isAdmin = roles.includes('ADMIN')

  return { isAuthenticated, email, roles, isAdmin, login, logout }
}
