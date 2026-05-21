import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
 
export function MainLayout() {
  const { email, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
 
  const handleLogout = () => {
    logout()
 
    navigate('/login')
  }
 
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded text-sm font-medium transition-colors ${
      isActive
        ? 'bg-fuchsia-600 text-white'
        : 'text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-600'
    }`
 
  return (
    <div className="flex h-screen bg-gray-50">
 
      {}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
 
        {}
        <div className="px-4 py-5 border-b border-gray-100">
          <h1 className="text-xl font-bold text-fuchsia-600">🎨 ArtApp</h1>
          <p className="text-xs text-gray-400 mt-1 truncate">{email}</p>
        </div>
 
        {}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavLink to="/dashboard" className={navClass}>
            Dashboard
          </NavLink>
 
          <NavLink to="/oeuvres" className={navClass}>
            Oeuvres
          </NavLink>
 
          {}
          {isAdmin && (
            <>
              <div className="pt-3 pb-1">
                <p className="text-xs text-gray-400 uppercase font-semibold px-3">Admin</p>
              </div>
              <NavLink to="/admin/users" className={navClass}>
                Utilisateurs
              </NavLink>
              <NavLink to="/admin/artistes" className={navClass}>
                Artistes
              </NavLink>
            </>
          )}
        </nav>
 
        {}
        <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded text-sm text-red-500 hover:bg-red-50 font-medium"
          >
            Déconnexion
          </button>
        </div>
      </aside>
 
      {}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}