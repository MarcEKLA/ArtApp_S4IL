# ArtApp — S4 IL Évaluation finale

Fiche n°10 — Domaine : Galerie d'œuvres d'art

---

## Section 1 — Lancer le projet

**Pré-requis**
- Java 17
- Node 18+
- MySQL 8

**Backend**

Créer la base :
```sql
CREATE DATABASE artapp_db;
```

Insérer les rôles (obligatoire au premier lancement) :
```sql
INSERT INTO role (role, type) VALUES ('USER', 'standard');
INSERT INTO role (role, type) VALUES ('ADMIN', 'admin');
```

Lancer :
```bash
cd artapp
mvn spring-boot:run
```

L'API tourne sur http://localhost:8080

**Frontend**

```bash
cd artapp-front
npm install
npm run dev
```

Le front tourne sur http://localhost:5173

**Compte ADMIN**

Créer un compte via POST /api/users/register puis modifier le rôle en base :
```sql
INSERT INTO user_roles SELECT u.id_user, r.id FROM user u, role r
WHERE u.email = 'admin@artapp.fr' AND r.role = 'ADMIN';
```
Identifiants par défaut : admin@artapp.fr / Admin@1234

---

## Section 2 — Paramètres de la fiche

- **Domaine** : Galerie d'œuvres d'art
- **Entité principale** : Oeuvre (titre, technique, prix, nbTirage, anneeCreation)
- **Entité parente** : Artiste (nom, courant)
- **Tag** : Mouvement (ex : Impressionnisme, Cubisme)
- **Champ signature** : anneeCreation (Integer, @Min(1000) @Max(2100))
- **Formule prixTotal** : prix × nbTirage × 2.0 si anneeCreation < 1950, sinon × 1.0
- **Wrapper REST** : ArtResponse (pas ApiResponse)
- **Champ DTO artiste** : artisteFullName (pas artisteNom)
- **Thème UI** : fuchsia (bg-fuchsia-600)

Valeur test JUnit : prix=100, qte=3, annee=1920 → prixTotal = 600.0

---

## Section 3 — Choix techniques

**Q1 — BCrypt strength**

J'ai choisi strength=10 qui est la valeur par défaut. C'est un bon compromis entre sécurité et performance : le hachage prend environ 100ms ce qui est acceptable pour un login. Avec strength=4 ce serait trop rapide et vulnérable aux attaques par force brute. Avec strength=15 le serveur mettrait plusieurs secondes par login ce qui est inutilisable en pratique.

**Q2 — Générique ArtResponse<T>**

Avoir une seule classe générique évite de dupliquer du code. Si on faisait ArtResponseOeuvre, ArtResponseUser etc. il faudrait maintenir autant de classes que de types de réponse. Avec le générique un seul endroit à modifier si on veut changer le format de réponse (ajouter un timestamp par exemple).

**Q3 — Interceptor Axios**

Sans l'interceptor il faudrait ajouter le header Authorization à la main dans chaque appel fetch(). L'interceptor le fait automatiquement pour toutes les requêtes. Si le token change (refresh) on le met à jour à un seul endroit. Avec fetch natif on aurait la duplication dans tous les services.

**Q4 — invalidateQueries vs modifier le cache**

invalidateQueries force React Query à recharger les données depuis le serveur. Si on modifiait directement le cache on pourrait avoir des données désynchronisées avec la base (par exemple si le backend a appliqué des calculs côté serveur comme prixTotal). C'est plus simple et on est sûr d'avoir les vraies données.

---

## Section 4 — Analyse critique

**Proposition A — désactiver @Valid**

1. Les données non validées arrivent directement dans la base, on peut insérer des prix négatifs ou des titres vides.
2. Les erreurs 400 existent pour signaler au client ce qui ne va pas, les supprimer rend le debug impossible côté frontend.
3. Jakarta Validation est fait pour ça, la désactiver contre-dit les bonnes pratiques REST et rend le code moins maintenable.

**Proposition B — permitAll() sur DELETE + vérification frontend**

1. N'importe qui avec le token peut appeler l'endpoint DELETE directement via curl ou Postman sans passer par l'interface.
2. Le frontend peut être contourné, la sécurité doit être côté serveur par définition.
3. Si quelqu'un désactive JavaScript ou inspecte les requêtes réseau il peut contourner la vérification frontend sans effort.

**Proposition C — désactiver l'interceptor RESPONSE**

1. Si le token expire pendant la session l'utilisateur voit des erreurs 401 sans être redirigé vers /login, l'interface se comporte bizarrement.
2. Les tokens JWT expirent, c'est leur fonctionnement normal donc les 401 ne sont pas rares en pratique.
3. Sans nettoyage du localStorage un token expiré reste stocké et cause des erreurs à la prochaine session.

---

## Section 5 — Difficultés rencontrées

1. **MapStruct et la méthode default** : j'avais du mal à faire compiler calculerPrixTotal parce que j'utilisais `oeuvre.getNbTirage()` au lieu de `oeuvre.getNbTirages()` (faute de frappe). Le test JUnit m'a aidé à trouver l'erreur.

2. **@WebMvcTest et Spring Security** : le test OeuvreControllerTest ne compilait pas au début parce que SecurityConfig injectait des beans non disponibles dans le contexte de test. J'ai dû ajouter @MockBean pour JwtService et MyUserDetailsService.

3. **z.coerce.number() dans Zod** : les champs prix et nbTirage revenaient comme string depuis le formulaire HTML. Il a fallu utiliser z.coerce.number() pour que la conversion se fasse avant la validation.

---

## Section 6 — Screenshots Swagger

Les captures sont dans le dossier /screenshots/ (test_01.png à test_09.png).
