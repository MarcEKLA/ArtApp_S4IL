
import type { Oeuvre } from '../types/api.types'

interface Props {
  oeuvre: Oeuvre
  onEdit?: (oeuvre: Oeuvre) => void
  onDelete?: (id: number) => void
}

export function OeuvreCard({ oeuvre, onEdit, onDelete }: Props) {

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('fr-FR') 
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">

      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 text-lg">{oeuvre.titre}</h3>

        {oeuvre.disponible ? (
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
            Disponible
          </span>
        ) : (
          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
            Indisponible
          </span>
        )}
      </div>

      <p className="text-fuchsia-600 text-sm font-medium mb-1">
        {oeuvre.artisteFullName ?? 'Artiste inconnu'}
      </p>

      <p className="text-gray-500 text-sm mb-1">Technique : {oeuvre.technique}</p>
      <p className="text-gray-500 text-sm mb-1">Année : {oeuvre.anneeCreation}</p>

      {oeuvre.dateAjout && (
        <p className="text-gray-400 text-xs mb-2">
          Ajouté le {formatDate(oeuvre.dateAjout)}
        </p>
      )}

      <div className="flex items-center gap-4 mb-3">
        <span className="text-gray-600 text-sm">Prix : {oeuvre.prix} €</span>
        <span className="text-fuchsia-700 font-bold text-sm">
          Total : {oeuvre.prixTotal} €
        </span>
      </div>

      {oeuvre.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {oeuvre.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-white text-xs px-2 py-1 rounded-full"

              style={{ backgroundColor: tag.couleur || '#a855f7' }}
            >
              {tag.nom}
            </span>
          ))}
        </div>
      )}

      {(onEdit || onDelete) && (
        <div className="flex gap-2 mt-2">
          {onEdit && (
            <button
              onClick={() => onEdit(oeuvre)}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-xs px-3 py-1 rounded transition-colors"
            >
              Modifier
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(oeuvre.id)}
              className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded transition-colors"
            >
              Supprimer
            </button>
          )}
        </div>
      )}
    </div>
  )
}
