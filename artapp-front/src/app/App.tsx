import React from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { LoginPage } from '../components/LoginPage'
import { RegisterPage } from '../components/RegisterPage'
import { OeuvreList } from '../components/OeuvreList'
import { MainLayout } from '../components/MainLayout'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { useOeuvre } from '../hooks/useOeuvres'
import apiClient from '../services/axiosInstance'

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
      <p className="text-gray-600 text-sm mb-1">Annee : {oeuvre.anneeCreation}</p>
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
  const [users, setUsers] = React.useState<any[]>([])

  React.useEffect(() => {
    apiClient.get('/api/users').then(res => setUsers(res.data.data || []))
  }, [])

  const handleDelete = async (id: number) => {
    await apiClient.delete(`/api/users/${id}`)
    setUsers(prev => prev.filter(u => u.idUser !== id))
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Gestion utilisateurs</h2>
      <div className="space-y-2">
        {users.map(u => (
          <div key={u.idUser} className="flex items-center justify-between bg-white border rounded p-3">
            <div>
              <p className="font-medium text-gray-900">{u.prenom} {u.nom}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
            </div>
            <button onClick={() => handleDelete(u.idUser)} className="text-red-500 hover:text-red-700 text-sm">Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArtisteList() {
  const [artistes, setArtistes] = React.useState<any[]>([])
  const [nom, setNom] = React.useState('')
  const [courant, setCourant] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    apiClient.get('/api/artistes').then(res => setArtistes(res.data.data || []))
  }, [])

  const handleCreate = async () => {
    setLoading(true)
    await apiClient.post('/api/artistes', { nom, courant })
    const res = await apiClient.get('/api/artistes')
    setArtistes(res.data.data || [])
    setNom('')
    setCourant('')
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    await apiClient.delete(`/api/artistes/${id}`)
    setArtistes(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Gestion artistes</h2>
      <div className="flex gap-2 mb-6">
        <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom" className="border rounded px-3 py-2 text-sm" />
        <input value={courant} onChange={e => setCourant(e.target.value)} placeholder="Courant" className="border rounded px-3 py-2 text-sm" />
        <button onClick={handleCreate} disabled={loading} className="bg-fuchsia-600 text-white px-4 py-2 rounded text-sm hover:bg-fuchsia-700">
          Ajouter
        </button>
      </div>
      <div className="space-y-2">
        {artistes.map(a => (
          <div key={a.id} className="flex items-center justify-between bg-white border rounded p-3">
            <div>
              <p className="font-medium text-gray-900">{a.nom}</p>
              <p className="text-sm text-gray-500">{a.courant}</p>
            </div>
            <button onClick={() => handleDelete(a.id)} className="text-red-500 hover:text-red-700 text-sm">Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/oeuvres" element={<OeuvreList />} />
        <Route path="/oeuvres/:id" element={<OeuvreDetail />} />
        <Route path="/admin/users" element={<ProtectedRoute requiredRole="ADMIN"><UserList /></ProtectedRoute>} />
        <Route path="/admin/artistes" element={<ProtectedRoute requiredRole="ADMIN"><ArtisteList /></ProtectedRoute>} />
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
