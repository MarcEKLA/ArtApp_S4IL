import apiClient from './axiosInstance'
import type { ArtResponse, LoginResponse, User } from '../types/api.types'

export const authService = {
  login: async (email: string, password: string) => {
    const res = await apiClient.post<ArtResponse<LoginResponse>>('/login', { email, password })
    return res.data.data
  },

  register: async (nom: string, prenom: string, email: string, password: string) => {
    const res = await apiClient.post<ArtResponse<User>>('/api/users/register', { nom, prenom, email, password })
    return res.data.data
  },
}
