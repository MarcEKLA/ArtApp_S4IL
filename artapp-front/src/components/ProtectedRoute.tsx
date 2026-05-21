import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
 
interface Props {
  children: React.ReactNode
  requiredRole?: string
}
 
export function ProtectedRoute({ children, requiredRole }: Props) {
  const { isAuthenticated, roles } = useAuth()
 
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
 
  if (requiredRole && !roles.includes(requiredRole)) {
    return <Navigate to="/dashboard" replace />
  }
 
  return <>{children}</>
}
 