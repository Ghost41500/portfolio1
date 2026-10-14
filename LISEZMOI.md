# Portfolio de Nathan Place, mode d'emploi

## Les fichiers

```
portfolio-nathan-place/
├── index.html            Structure de la page (rarement à modifier)
├── contenu.js            ★ TOUS les textes : profil, compétences, projets, parcours, certifications, contact
├── couleurs.css          ★ Couleurs et polices, en thème sombre et en thème clair
├── style.css             Mise en page, version mobile, animations (pas besoin d'y toucher)
├── script.js             Affiche le contenu, relie compétences et preuves, gère le thème, le menu et la console
├── CV_Nathan_Place.pdf   Ton CV, tel que tu l'as envoyé (bouton « Télécharger mon CV »)
├── images/
│   ├── photo.jpg               Ta photo, reprise de ton CV
│   ├── attestation-anssi.jpg   Attestation SecNumacadémie
│   ├── attestation-pix.jpg     Attestation Pix, date de naissance floutée
│   ├── apercu-lien.png         Image affichée quand le lien du site est partagé (LinkedIn, messageries)
│   └── favicon.svg             Icône de l'onglet du navigateur
├── polices/              Les 3 polices du site et leurs licences (rien à toucher)
└── LISEZMOI.md           Ce mode d'emploi
```

En pratique, tu ne modifieras que **contenu.js** (les textes) et, si tu veux changer de look, **couleurs.css**.

## Voir le site sur ton ordinateur

Double-clique sur `index.html` : le site s'ouvre dans ton navigateur, sans connexion internet.
Après chaque modification, enregistre le fichier puis recharge la page avec **Ctrl + F5**.

Si tu fais une erreur dans `contenu.js`, un encadré orange apparaît en bas de la page et dit quoi corriger. Cet encadré ne s'affiche que sur ton ordinateur, jamais sur le site en ligne.
Si la page affiche « Le contenu du portfolio n'a pas pu être chargé », il manque une virgule, un guillemet ou une accolade : appuie sur F12, onglet « Console », pour voir la ligne fautive.

## Modifier un texte

Ouvre `contenu.js` avec Visual Studio Code. Le fichier est découpé en parties numérotées :

| Ce que tu veux changer | Où, dans `contenu.js` |
|---|---|
| Nom, phrase d'accroche, photo, CV | partie 2, `profil` |
| Stage recherché, date de disponibilité | partie 2, `profil.stage` |
| Texte « À propos », langues, atouts, centres d'intérêt | partie 3, `aPropos` |
| Compétences et leur niveau, outils | partie 4 |
| Projets | partie 5, `projets` |
| Frise du parcours | partie 6, `parcours` |
| Certifications | partie 7, `certifications` |
| Emails, LinkedIn, GitHub | partie 8, `contact` |
| Phrases d'introduction des sections | partie 9, `intros` |
| Titre de l'onglet et description pour Google | `index.html`, en haut du fichier |

Trois règles à respecter : chaque texte entre guillemets droits `"…"`, une virgule après chaque élément, et un champ vide (`""` ou `[]`) n'est simplement pas affiché.
Les textes visibles par les recruteurs les vouvoient : garde ce ton.

## Ajouter un projet

1. Dans `contenu.js`, partie 5, copie le **modèle de projet** (dans le commentaire au début de la partie).
2. Colle-le dans la liste `projets`, entre les crochets `[ ]`. L'ordre de la liste est l'ordre d'affichage.
3. Remplis les champs. Dans `competences`, écris les identifiants (`id`) des compétences de la partie 4 que ce projet prouve, par exemple `["vlan", "dhcp-dns"]`.
4. Pour une capture ou un rapport, mets le fichier dans `images/` (ou dans un nouveau dossier `documents/`) et indique son chemin dans `image` ou `liens`.

Les liens se créent tout seuls : la compétence affiche le projet dans sa colonne « Preuves », et le projet affiche la compétence.

## Ajouter une compétence

Ajoute une ligne dans la bonne catégorie de la partie 4, avec un `id` unique, sans espace ni accent :

```js
{ id: "fibre", nom: "Accès optique", detail: "Raccordement et mesures", niveau: "pratique" },
```

Les niveaux possibles sont `"notions"` (bases acquises), `"pratique"` (mis en œuvre concrètement) et `"valide"` (attesté par une certification ou une évaluation).

## Changer les couleurs

Ouvre `couleurs.css`. Chaque couleur est écrite deux fois : une fois pour le thème sombre, une fois pour le thème clair.
Pour changer la couleur principale, modifie `--vert` dans les deux thèmes. Le nom de la variable ne change pas, même si tu choisis du bleu.

## Remplacer la photo, le CV ou l'aperçu

- **Photo :** remplace `images/photo.jpg` par une image carrée portant le même nom.
- **CV :** remplace `CV_Nathan_Place.pdf` par ta nouvelle version, sous le même nom.
- **Aperçu de lien :** `images/apercu-lien.png` est une image fixe. Si ton stage change, remplace-la ou supprime-la.

## Publier gratuitement avec GitHub Pages

1. Sur github.com, ouvre le dépôt de ton site actuel, ou crée un dépôt **public** avec « New repository ».
2. Supprime les anciens fichiers devenus inutiles : `Competence.html`, `Contact.html`, `Diplomes_Certification.html`, `ANSSI_MOUC.jpg`, `Image.png`, `background.png`, et surtout `Pix.jpg`, qui montre ta date de naissance. Pour chaque fichier : clique dessus, menu « … », « Delete file », puis « Commit changes ». Garde `.gitattributes`.
3. Clique sur « Add file » puis « Upload files ». Glisse **le contenu** du dossier `portfolio-nathan-place`, pas le dossier lui-même : `index.html` doit se retrouver à la racine du dépôt. Valide avec « Commit changes ». Les fichiers de même nom, comme `index.html` ou `style.css`, sont remplacés.
4. Va dans « Settings », puis « Pages ». Sous « Build and deployment », choisis la source « Deploy from a branch », la branche `main` et le dossier `/ (root)`, puis « Save ».
5. Ton site est en ligne en quelques minutes (jusqu'à 10) à l'adresse `https://ton-pseudo.github.io/nom-du-depot/`.
6. Facultatif : dans `index.html`, remplace `images/apercu-lien.png` par l'adresse complète, par exemple `https://ton-pseudo.github.io/nom-du-depot/images/apercu-lien.png`. L'aperçu s'affichera alors quand tu partages le lien sur LinkedIn.

L'ancien `Pix.jpg` reste visible dans l'historique du dépôt. Si cela te gêne, le plus simple est de publier le site dans un nouveau dépôt.

## Mettre à jour le site

1. Modifie les fichiers sur ton ordinateur et vérifie le résultat en ouvrant `index.html`.
2. Mets à jour `miseAJour` (partie 1 de `contenu.js`).
3. Sur GitHub : « Add file », « Upload files », glisse les fichiers modifiés, puis « Commit changes ».
4. Attends quelques minutes, puis recharge ton site avec Ctrl + F5.

Quand tu auras trouvé ton stage, passe `enRecherche` à `false` dans `profil.stage` : la mention « je recherche un stage » disparaît partout.

## Ce qu'il reste à compléter

Ces informations ne figuraient pas dans tes fichiers ; les champs sont vides, donc invisibles sur le site.

- **Réseau d'entreprise multisites :** semestre (`periode`), résultat, captures ou documentation (`image`, `liens`). J'ai regroupé dans ce projet trois lignes de ton CV : la conception multisites, la sécurisation par ACL et NAT/PAT, et la documentation technique. Si ce sont des projets distincts, sépare-les.
- **Certification du câblage cuivre :** semestre, objectif, ce que tu as fait, outils (le certificateur utilisé, par exemple), résultat.
- **Compétences sans preuve :** adressage IP, MikroTik, diagnostic de pannes, machines virtuelles, Nginx, sécurité des accès, scripts et bases de données sont dans ton CV, mais aucun projet ne les prouve encore. Ajoute les TP ou projets correspondants avec leurs identifiants.
- **Accès optique :** rien dans tes fichiers. Ajoute un projet et la compétence `fibre` (exemple prêt en commentaire dans la partie 4).
- **Scripts :** précise le langage (Python, Bash…) dans le `detail` de la compétence `scripts`.
- **Stage :** ta date de disponibilité (`profil.stage.disponibilite`).
- **CybeR&T – Hygiène informatique :** organisme, date et attestation (`image`).
- **GitHub :** ton adresse de profil (`contact.github`), si tu veux l'afficher.
- **LinkedIn :** le site utilise `linkedin.com/in/nathan-place`, le lien du QR code de ton CV. Vérifie que c'est bien ton profil. Le mot « Linkedin » cliquable de ton CV pointe, lui, vers `linkedin.com/in/dez` : corrige-le dans ton CV.
