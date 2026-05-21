import { z } from 'zod'
 
export const oeuvreSchema = z.object({
  titre: z.string().min(2, 'Le titre doit faire au moins 2 caractères'),
 
  technique: z.string().min(2, 'La technique doit faire au moins 2 caractères'),
 
  prix: z.coerce
    .number({ invalid_type_error: 'Le prix doit être un nombre' })
    .positive('Le prix doit être positif'),
 
  nbTirage: z.coerce
    .number({ invalid_type_error: 'Le nombre de tirages doit être un nombre' })
    .int('Le nombre de tirages doit être un entier')
    .min(1, 'Le nombre de tirages doit être au moins 1'),
 
  artisteId: z.coerce
    .number({ invalid_type_error: "L'identifiant de l'artiste est requis" })
    .min(1, "Sélectionnez un artiste"),
 
  anneeCreation: z.coerce
    .number({ invalid_type_error: "L'année doit être un nombre" })
    .int("L'année doit être un entier")
    .min(1000, "L'année doit être au moins 1000")
    .max(2100, "L'année doit être au maximum 2100"),
})
 
export type OeuvreFormData = z.infer<typeof oeuvreSchema>
 