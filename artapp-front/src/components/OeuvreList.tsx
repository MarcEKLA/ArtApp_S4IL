import { useState, useEffect } from 'react'
import { OeuvreCard } from './OeuvreCard'
import { OeuvreForm } from './OeuvreForm'
import { useOeuvres, useCreateOeuvre, useUpdateOeuvre, useDeleteOeuvre } from '../hooks/useOeuvres'
import { useAuth } from '../hooks/useAuth'
import type { Oeuvre, Artiste } from '../types/api.types'
import type { OeuvreFormData } from '../schemas/oeuvre.schema'
import apiClient from '../services/axiosInstance'
 
export function OeuvreList() {
  const { isAuthenticated } = useAuth()
 
  const [page, setPage] = useState(0)
 
  const [search, setSearch] = useState('')
 
  const [showOnlyDisponibles, setShowOnlyDisponibles] = useState(false)
 
  const [showModal, setShowModal] = useState(false)
  const [editingOeuvre, setEditingOeuvre] = useState<Oeuvre | null>(null)
 
  const [artistes, setArtistes] = useState<Artiste[]>([])
 
  useEffect(() => {
    document.title = 'ArtApp — Galerie'
    apiClient
      .get<{ data: Artiste[] }>('/api/artistes')
      .then((res) => setArtistes(res.data.data))
      .catch(() => setArtistes([]))
  }, [])
 
  const { data, isLoading, error } = useOeuvres(page, 10)
  const createMutation = useCreateOeuvre()
  const updateMutation = useUpdateOeuvre()
  const deleteMutation = useDeleteOeuvre()
 
  const oeuvres = data?.content ?? []
  const filtered = showOnlyDisponibles
    ? oeuvres.filter((o) => o.disponible)
    : oeuvres
 
  const handleSubmit = (formData: OeuvreFormData) => {
    if (editingOeuvre) {
      updateMutation.mutate(
        { id: editingOeuvre.id, data: formData },
        { onSuccess: () => { setShowModal(false); setEditingOeuvre(null) } }
      )
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => setShowModal(false),
      })
    }
  }
 
  const handleEdit = (oeuvre: Oeuvre) => {
    setEditingOeuvre(oeuvre)
    setShowModal(true)
  }
 
  const handleDelete = (id: number) => {
    if (confirm('Supprimer cette oeuvre ?')) {
      deleteMutation.mutate(id)
    }
  }
 
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-fuchsia-600 font-medium">Chargement...</p>
      </div>
    )
  }
 
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded p-4">
        <p className="text-red-600">Erreur lors du chargement des oeuvres.</p>
      </div>
    )
  }
 
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Galerie d'oeuvres</h1>
 
        {}
        {isAuthenticated && (
          <button
            onClick={() => { setEditingOeuvre(null); setShowModal(true) }}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded font-medium text-sm"
          >
            + Nouvelle oeuvre
          </button>
        )}
      </div>
 
      {}
      <div className="mb-4 flex gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par titre..."
          className="border border-gray-300 rounded px-3 py-2 text-sm w-64 focus:outline-none focus:border-fuchsia-500"
        />
 
        {}
        <button
          onClick={() => setShowOnlyDisponibles(!showOnlyDisponibles)}
          className={`px-3 py-2 rounded text-sm font-medium border transition-colors ${
            showOnlyDisponibles
              ? 'bg-fuchsia-600 text-white border-fuchsia-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-fuchsia-50'
          }`}
        >
          {showOnlyDisponibles ? 'Toutes les oeuvres' : 'Disponibles seulement'}
        </button>
      </div>
 
      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((oeuvre) => (
          <OeuvreCard
            key={oeuvre.id}
            oeuvre={oeuvre}
            onEdit={isAuthenticated ? handleEdit : undefined}
            onDelete={isAuthenticated ? handleDelete : undefined}
          />
        ))}
      </div>
 
      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-8">Aucune oeuvre à afficher.</p>
      )}
 
      {}
      {data && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={data.first}
            className="px-3 py-1 border rounded text-sm disabled:opacity-40 hover:bg-fuchsia-50"
          >
            ← Précédent
          </button>
          <span className="text-sm text-gray-600">
            Page {data.page + 1} / {data.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={data.last}
            className="px-3 py-1 border rounded text-sm disabled:opacity-40 hover:bg-fuchsia-50"
          >
            Suivant →
          </button>
        </div>
      )}
 
      {}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editingOeuvre ? 'Modifier l\'oeuvre' : 'Nouvelle oeuvre'}
            </h2>
            <OeuvreForm
              onSubmit={handleSubmit}
              onCancel={() => { setShowModal(false); setEditingOeuvre(null) }}
              defaultValues={editingOeuvre ?? undefined}
              artistes={artistes}
              isLoading={createMutation.isPending || updateMutation.isPending}
            />
          </div>
        </div>
      )}
    </div>
  )
}
