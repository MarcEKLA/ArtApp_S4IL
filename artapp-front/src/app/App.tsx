import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { LoginPage } from '../components/LoginPage'
import { RegisterPage } from '../components/RegisterPage'
import { OeuvreList } from '../components/OeuvreList'
import { MainLayout } from '../components/MainLayout'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { useOeuvre } from '../hooks/useOeuvres'

function Dashboard() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Tableau de bord</h2>
      <p className="text-gray-500">Bienvenue dans la galerie ArtApp.</p>
    </div>
  )
}

function OeuvreDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: oeuvre, isLoading, error } = useOeuvre(Number(id))

  if (isLoading) return <div className="p-8 text-gray-500">Chargement...</div>
  if (error || !oeuvre) return <div className="p-8 text-red-500">Oeuvre introuvable.</div>

  return (
    <div className="p-8 max-w-xl">
      <h2 className="text-xl font-bold text-gray-900 mb-1">{oeuvre.titre}</h2>
      <p className="text-fuchsia-600 font-medium mb-2">{oeuvre.artisteFullName ?? 'Artiste inconnu'}</p>
      <p className="text-gray-600 text-sm mb-1">Technique : {oeuvre.technique}</p>
      <p className="text-gray-600 text-sm mb-1">Année : {oeuvre.anneeCreation}</p>
      <p className="text-gray-600 text-sm mb-1">Prix unitaire : {oeuvre.prix} €</p>
      <p className="text-fuchsia-700 font-bold text-sm mb-3">Prix total : {oeuvre.prixTotal} €</p>
      {oeuvre.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {oeuvre.tags.map((tag) => (
            <span key={tag.id} className="text-white text-xs px-2 py-1 rounded-full"
              style={{ backgroundColor: tag.couleur || '#a855f7' }}>
              {tag.nom}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function UserList() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold text-gray-900">Gestion utilisateurs</h2>
    </div>
  )
}

function ArtisteList() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold text-gray-900">Gestion artistes</h2>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/oeuvres" element={<OeuvreList />} />
        <Route path="/oeuvres/:id" element={<OeuvreDetail />} />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/artistes"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <ArtisteList />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
