
export interface ArtResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface PageDTO<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
}

export interface Mouvement {
  id: number
  nom: string
  couleur: string
}

export interface Oeuvre {
  id: number
  titre: string
  technique: string
  prix: number
  nbTirage: number

  artisteFullName: string | null
  disponible: boolean
  prixTotal: number
  dateAjout: string    
  anneeCreation: number
  tags: Mouvement[]
}

export interface OeuvreCreate {
  titre: string
  technique: string
  prix: number
  nbTirage: number
  artisteId: number
  anneeCreation: number
}

export interface Artiste {
  id: number
  nom: string
  courant: string
}

export interface LoginResponse {
  token: string
  username: string  
  roles: string[]
}

export interface User {
  idUser: number
  nom: string
  prenom: string
  email: string
  roles: string[]
}
