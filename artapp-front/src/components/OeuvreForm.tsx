import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Oeuvre, Artiste } from '../types/api.types'

const oeuvreSchema = z.object({
  titre: z.string().min(1, 'Le titre est requis'),
  technique: z.string().min(1, 'La technique est requise'),
  anneeCreation: z.number().int().min(1000).max(new Date().getFullYear()),
  prix: z.number().positive('Le prix doit être positif'),
  nbTirage: z.number().int().positive(),
  disponible: z.boolean(),
  artisteId: z.number().int().positive('Artiste requis'),
})

export type OeuvreFormData = z.infer<typeof oeuvreSchema>

interface Props {
  onSubmit: (data: OeuvreFormData) => void
  onCancel?: () => void
  defaultValues?: Partial<OeuvreFormData> | Oeuvre
  artistes?: Artiste[]
  isLoading?: boolean
}

export function OeuvreForm({ onSubmit, onCancel, defaultValues, artistes, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<OeuvreFormData>({
    resolver: zodResolver(oeuvreSchema),
    defaultValues: {
      disponible: true,
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
        <input {...register('titre')} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
        {errors.titre && <p className="text-red-500 text-xs mt-1">{errors.titre.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Technique</label>
        <input {...register('technique')} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
        {errors.technique && <p className="text-red-500 text-xs mt-1">{errors.technique.message}</p>}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Année de création</label>
          <input type="number" {...register('anneeCreation', { valueAsNumber: true })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
          {errors.anneeCreation && <p className="text-red-500 text-xs mt-1">{errors.anneeCreation.message}</p>}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
          <input type="number" step="0.01" {...register('prix', { valueAsNumber: true })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
          {errors.prix && <p className="text-red-500 text-xs mt-1">{errors.prix.message}</p>}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nb tirage</label>
          <input type="number" {...register('nbTirage', { valueAsNumber: true })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
          {errors.nbTirage && <p className="text-red-500 text-xs mt-1">{errors.nbTirage.message}</p>}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Artiste</label>
          {artistes && artistes.length > 0 ? (
            <select {...register('artisteId', { valueAsNumber: true })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500">
              <option value="">-- Choisir --</option>
              {artistes.map(a => (
                <option key={a.id} value={a.id}>{a.nom}</option>
              ))}
            </select>
          ) : (
            <input type="number" {...register('artisteId', { valueAsNumber: true })} placeholder="ID artiste" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
          )}
          {errors.artisteId && <p className="text-red-500 text-xs mt-1">{errors.artisteId.message}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="disponible" {...register('disponible')} className="accent-fuchsia-600" />
        <label htmlFor="disponible" className="text-sm text-gray-700">Disponible</label>
      </div>

      <div className="flex gap-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded transition-colors">
            Annuler
          </button>
        )}
        <button type="submit" disabled={isLoading} className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-700 disabled:opacity-50 text-white font-medium py-2 rounded transition-colors">
          {isLoading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
    </form>
  )
}
