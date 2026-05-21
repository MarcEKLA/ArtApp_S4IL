# ArtApp — Galerie d'oeuvres d'art
Evaluation S4 IL — Fiche personnelle n10

## Section 1 — Comment lancer le projet

### Pre-requis
- Java 17+
- Node.js 18+
- MySQL 8+

### Lancer le backend
Ouvrir dans VS Code avec Spring Boot Dashboard et cliquer sur play
Ou depuis IntelliJ IDEA : Run ArtAppApplication

### Lancer le frontend
cd artapp-front
npm install
npm run dev
Accessible sur http://localhost:5174

### Compte ADMIN par defaut
Email : test@test.com
Password : Password1!

## Section 2 — Parametres de la fiche

Domaine : Art (galerie d'oeuvres)
Entite principale : Oeuvre
Entite parente : Artiste (table : artiste_art)
Entite tag : Mouvement
Champ signature : anneeCreation (Integer, Min 1000 Max 2100)
Wrapper REST : ArtResponse (pas ApiResponse)
Champ DTO artiste : artisteFullName (pas artisteNom)
Couleur UI : fuchsia
Base URL : /api/oeuvres

Formule prixTotal :
prix x nbTirage x 2.0 si anneeCreation < 1950, sinon x 1.0
Exemple : prix=100, nbTirage=3, anneeCreation=1920 → prixTotal = 600

## Section 3 — Choix techniques

Q1 — BCrypt cout 10
J'ai choisi le cout 10 car c'est la valeur par defaut recommandee par Spring Security. Elle offre un bon equilibre entre securite et performance. Avec un cout de 4, le hash serait trop rapide et vulnerable. Avec 15, le temps de calcul deviendrait trop long.

Q2 — Pourquoi ArtResponse generique
J'ai choisi une classe generique ArtResponse car cela evite la duplication de code. Une seule classe gere tous les cas. Le generique permet aussi d'avoir une structure de reponse coherente partout dans l'API.

Q3 — L'interceptor REQUEST Axios
L'interceptor REQUEST d'Axios injecte automatiquement le token JWT dans le header Authorization de chaque requete. Sans lui, il faudrait manuellement ajouter le header a chaque appel API.

Q4 — invalidateQueries apres mutation
Apres une mutation, j'utilise invalidateQueries plutot que de modifier directement le cache car cela garantit que les donnees affichees correspondent exactement a ce que le serveur a en base.

## Section 4 — Analyse critique

Proposition A — Desactiver @Valid
Je rejette car sans validation, des donnees invalides arrivent en base. Le GlobalExceptionHandler ne peut plus renvoyer des erreurs 400. La validation est une couche de securite essentielle.

Proposition B — permitAll sur DELETE
Je rejette car la securite frontend est contournable via curl ou Postman. Un utilisateur malveillant pourrait supprimer tous les enregistrements. Spring Security est la seule vraie protection.

Proposition C — Desactiver l'interceptor RESPONSE
Je rejette car sans gestion des 401, un token expire laisserait l'utilisateur bloque. Le token localStorage ne disparait pas automatiquement. Les erreurs 401 peuvent arriver a tout moment.

## Section 5 — Difficultes rencontrees

1. Connexion MySQL — Le service ne demarrait pas car MySQL n'etait pas installe. Apres installation, le mot de passe etait incorrect. Resolu en corrigeant le mot de passe dans application.properties.

2. Erreur CORS — Le frontend tournait sur le port 5174 mais le backend n'autorisait que 5173. Resolu en ajoutant le port 5174 dans SecurityConfig.java.

3. Fichier OeuvreForm incorrect — Le fichier contenait le code de OeuvreCard. Resolu en reecrivant completement le fichier avec le bon composant.

## Section 6 — Captures Swagger

Voir dossier /screenshots/
test_01 : POST /api/users/register → 201
test_02 : POST /login → 200 + token JWT
test_03 : GET /api/oeuvres sans token → 200
test_04 : POST /api/oeuvres sans token → 401
test_05 : POST /api/oeuvres avec token USER → 201
test_06 : DELETE /api/artistes/1 avec token USER → 403
test_07 : GET /api/oeuvres/999 → 404
test_08 : POST /api/oeuvres avec prix negatif → 400
test_09 : POST /api/oeuvres valeurs fiche prixTotal=600