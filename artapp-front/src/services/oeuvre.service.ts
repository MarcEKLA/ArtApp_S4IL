import apiClient from './axiosInstance'
import type { ArtResponse, PageDTO, Oeuvre, OeuvreCreate } from '../types/api.types'

export const oeuvreService = {
  getAll: async (page = 0, size = 10) => {
    const res = await apiClient.get<ArtResponse<PageDTO<Oeuvre>>>('/api/oeuvres', { params: { page, size } })
    return res.data.data
  },

  getById: async (id: number) => {
    const res = await apiClient.get<ArtResponse<Oeuvre>>(`/api/oeuvres/${id}`)
    return res.data.data
  },

  create: async (data: OeuvreCreate) => {
    const res = await apiClient.post<ArtResponse<Oeuvre>>('/api/oeuvres', data)
    return res.data.data
  },

  update: async (id: number, data: OeuvreCreate) => {
    const res = await apiClient.put<ArtResponse<Oeuvre>>(`/api/oeuvres/${id}`, data)
    return res.data.data
  },

  delete: async (id: number) => {
    await apiClient.delete(`/api/oeuvres/${id}`)
  },

  search: async (titre: string, page = 0, size = 10) => {
    const res = await apiClient.get<ArtResponse<PageDTO<Oeuvre>>>('/api/oeuvres/search', { params: { titre, page, size } })
    return res.data.data
  },

  addTag: async (id: number, tagId: number) => {
    const res = await apiClient.post<ArtResponse<Oeuvre>>(`/api/oeuvres/${id}/tags/${tagId}`)
    return res.data.data
  },
}
