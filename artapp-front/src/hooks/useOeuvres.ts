import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { oeuvreService } from '../services/oeuvre.service'
import type { OeuvreCreate } from '../types/api.types'

const OEUVRES_KEY = ['oeuvres']

export function useOeuvres(page = 0, size = 10) {
  return useQuery({
    queryKey: [...OEUVRES_KEY, page, size],
    queryFn: () => oeuvreService.getAll(page, size),
  })
}

export function useOeuvre(id: number) {
  return useQuery({
    queryKey: [...OEUVRES_KEY, id],
    queryFn: () => oeuvreService.getById(id),
    enabled: !!id,
  })
}

export function useSearchOeuvres(titre: string, page = 0, size = 10) {
  return useQuery({
    queryKey: [...OEUVRES_KEY, 'search', titre, page, size],
    queryFn: () => oeuvreService.search(titre, page, size),
  })
}

export function useCreateOeuvre() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: OeuvreCreate) => oeuvreService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: OEUVRES_KEY })
    },
  })
}

export function useUpdateOeuvre() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: OeuvreCreate }) =>
      oeuvreService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: OEUVRES_KEY })
    },
  })
}

export function useDeleteOeuvre() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => oeuvreService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: OEUVRES_KEY })
    },
  })
}
