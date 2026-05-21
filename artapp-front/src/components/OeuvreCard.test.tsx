
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OeuvreCard } from './OeuvreCard'
import type { Oeuvre } from '../types/api.types'

describe('OeuvreCard', () => {
  it('affiche le titre, le prix et le champ artisteFullName', () => {

    const oeuvre: Oeuvre = {
      id: 1,
      titre: 'Les Nymphéas',
      technique: 'Huile sur toile',
      prix: 100,
      nbTirage: 3,

      artisteFullName: 'Monet (Impressionnisme)',
      disponible: true,
      prixTotal: 600,        
      dateAjout: '2026-05-21T14:30:00',
      anneeCreation: 1920,
      tags: [],
    }

    render(<OeuvreCard oeuvre={oeuvre} />)

    expect(screen.getByText('Les Nymphéas')).toBeInTheDocument()
    expect(screen.getByText('Monet (Impressionnisme)')).toBeInTheDocument()

    expect(screen.getByText(/Prix : 100/)).toBeInTheDocument()
  })

  it('affiche le badge "Indisponible" quand disponible est false', () => {
    const oeuvre: Oeuvre = {
      id: 2,
      titre: 'Test',
      technique: 'Aquarelle',
      prix: 50,
      nbTirage: 1,
      artisteFullName: 'Dupont',
      disponible: false,    
      prixTotal: 50,
      dateAjout: '2026-01-01T00:00:00',
      anneeCreation: 2000,
      tags: [],
    }

    render(<OeuvreCard oeuvre={oeuvre} />)

    expect(screen.getByText('Indisponible')).toBeInTheDocument()
  })
})
