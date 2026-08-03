# Facture Électronique — Générateur de factures

Application web moderne et réactive de création de factures professionnelles. Remplissez un formulaire, visualisez l'aperçu en temps réel et exportez vos factures en **PDF** en un clic.

## Fonctionnalités

### Création de factures
- **Formulaire complet** avec validation en temps réel (Zod + React Hook Form) :
  - Informations de l'entreprise émettrice (nom, logo, email, téléphone, adresse, signataire, lieu de signature)
  - Informations du client (nom, société, email, adresse, téléphone)
  - Lignes d'articles (produit, description, quantité, prix unitaire)
  - Métadonnées (numéro de facture, date d'émission, date d'échéance, devise, notes, taux de TVA)

### Aperçu en temps réel
- Aperçu instantané de la facture pendant la saisie
- **3 modèles de présentation** au choix :
  - **Moderne** — avec accent coloré et en-tête mis en évidence
  - **Classique** — sobre avec souligné épais
  - **Minimal** — épuré, sans fioritures
- Calcul automatique des totaux (sous-total, TVA, total général)

### Export PDF
- Génération d'un **PDF A4** de qualité (capture en 2x) via `html2canvas` + `jsPDF`
- Nom de fichier automatique basé sur le numéro de facture (`Facture-XXXX.pdf`)
- Notifications de succès / erreur via `sonner`

### Devises internationales
Prise en charge de nombreuses devises avec formatage automatique selon la locale :
`XOF (CFA)`, `XAF (FCFA)`, `EUR`, `USD`, `GBP`, `MAD`, `CDF`, `GHS`, `NGN`, `ZAR`, `KES`, `TZS`, `RWF`, `UGX`

### Expérience utilisateur
- **Sauvegarde automatique** du brouillon dans le `localStorage` (aucune perte de données)
- **Raccourcis clavier** :
  - `Ctrl/Cmd + N` — Nouvelle facture
  - `Ctrl/Cmd + E` — Exporter en PDF
  - `Ctrl/Cmd + \` — Basculer le thème
- **Thème clair / sombre**
- Animations fluides (Framer Motion)
- Interface responsive (disposition en deux panneaux sur desktop, empilée sur mobile)

## Technologies

| Technologie | Rôle |
|-------------|------|
| **React 19** | Interface utilisateur |
| **TypeScript** | Typage statique |
| **Vite 8** | Bundler / serveur de développement |
| **Tailwind CSS 4** | Styles et design system |
| **React Hook Form + Zod** | Gestion et validation des formulaires |
| **html2canvas + jsPDF** | Export PDF |
| **Framer Motion** | Animations |
| **sonner** | Notifications (toasts) |
| **lucide-react** | Icônes |
| **react-to-print** | Impression |

## Structure du projet

```
af-invoice/
├── public/                  # Fichiers statiques
├── src/
│   ├── components/          # Composants React
│   │   ├── ui/              # Composants réutilisables (Button, Input, Card, etc.)
│   │   ├── client-info.tsx          # Formulaire client
│   │   ├── company-profile.tsx      # Formulaire entreprise
│   │   ├── export-button.tsx        # Bouton d'export PDF
│   │   ├── invoice-form.tsx         # Formulaire principal de la facture
│   │   ├── invoice-metadata.tsx     # Métadonnées (dates, devise, TVA, statut)
│   │   ├── invoice-preview.tsx      # Aperçu de la facture
│   │   ├── keyboard-shortcuts.tsx   # Raccourcis clavier
│   │   ├── line-items.tsx           # Gestion des lignes d'articles
│   │   ├── template-selector.tsx    # Sélection du modèle (moderne/classique/minimal)
│   │   └── theme-toggle.tsx         # Basculer le thème clair/sombre
│   ├── hooks/
│   │   ├── useInvoice.ts            # État de la facture (localStorage)
│   │   ├── useLocalStorage.ts       # Hook générique localStorage
│   │   └── useTheme.ts              # Gestion du thème
│   ├── lib/
│   │   ├── utils.ts                 # Formatage devise, calcul totaux, numérotation
│   │   └── validations.ts           # Schémas Zod
│   ├── types/
│   │   └── index.ts                 # Types TypeScript
│   ├── App.tsx              # Composant racine (layout à deux panneaux)
│   ├── index.css            # Styles globaux
│   └── main.tsx             # Point d'entrée
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.ts
```

## Installation

Prérequis : **Node.js 18+** et **npm**

```bash
# 1. Cloner le dépôt
git clone https://github.com/Junior-obs/facture_electronique.git
cd facture_electronique

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

Ouvrez ensuite `http://localhost:5173` dans votre navigateur.

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement avec rechargement à chaud (HMR) |
| `npm run build` | Compile le TypeScript et génère la version de production dans `dist/` |
| `npm run lint` | Exécute ESLint sur tout le projet |
| `npm run preview` | Prévisualise la version de production en local |

## Utilisation

1. **Renseignez votre entreprise** : nom, logo, coordonnées, signataire.
2. **Ajoutez votre client** : nom, société, coordonnées.
3. **Ajoutez des articles** : produit, description, quantité et prix unitaire.
4. **Paramétrez la facture** : numéro, dates, devise, taux de TVA, notes.
5. **Choisissez un modèle** : Moderne, Classique ou Minimal.
6. **Exportez** : cliquez sur *Télécharger PDF* (ou `Ctrl/Cmd + E`).

Votre brouillon est enregistré automatiquement : vous pouvez fermer la page et reprendre où vous vous êtes arrêté.

## Licence

Projet personnel — tous droits réservés.
