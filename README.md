# 🌐 Open-Dash

Salut ! 👋 Je suis **Open-Dash**, votre compagnon de données en temps réel ! 

Une plateforme de tableau de bord moderne et interactive qui agrège des données en temps réel provenant de multiples APIs publiques. Développé avec Next.js 15, TypeScript et Tailwind CSS.

## 🌐 Site Déployé

🎉 **Visitez Open-Dash en ligne** : [https://opendash.vercel.app](https://opendash.vercel.app)

Explorez la section Géographie : [https://opendash.vercel.app/geography](https://opendash.vercel.app/geography)

## ✨ Fonctionnalités

### 🌍 Géographie
- **Météo en temps réel** : Données météorologiques via OpenWeatherMap et Open-Meteo APIs
- **Cartes interactives** : Intégration Leaflet avec géolocalisation
- **Informations géographiques** : Données détaillées sur les pays et régions

### 🌍 Géographie ✅ **FONCTIONNEL**
- **Météo en temps réel** : Données météorologiques via OpenWeatherMap et Open-Meteo APIs
- **Cartes interactives** : Intégration Leaflet avec géolocalisation
- **Informations géographiques** : Données détaillées sur les pays et régions

### 💻 Technologie 🚧 **EN DÉVELOPPEMENT**
- **GitHub API** : Statistiques des dépôts et utilisateurs
- **NPM Registry** : Informations sur les packages
- **StackOverflow** : Données de questions et réponses

### 🌐 Web et Réseaux 🚧 **EN DÉVELOPPEMENT**
- **Géolocalisation IP** : Informations sur les adresses IP
- **DNS Lookup** : Recherche d'informations DNS
- **Vérification SSL** : Analyse de sécurité des certificats

### 📈 Données Économiques 🚧 **EN DÉVELOPPEMENT**
- **Cryptomonnaies** : Prix et statistiques via CoinGecko
- **Actions boursières** : Données financières via Alpha Vantage
- **Taux de change** : Conversion de devises en temps réel

## 🚀 Technologies Utilisées

- **Frontend** : Next.js 15, React 19, TypeScript
- **Styling** : Tailwind CSS 4, Radix UI
- **Cartographie** : Leaflet, React-Leaflet
- **Graphiques** : Chart.js, React-Chartjs-2
- **3D** : Three.js, React Three Fiber
- **Backend** : Express.js (serveur API personnalisé)
- **Animations** : Framer Motion

## 📊 État du Projet

| Catégorie | Statut | Progression |
|-----------|--------|-------------|
| 🌍 Géographie | ✅ Fonctionnel | 100% |
| 💻 Technologie | 🚧 En développement | 25% |
| 🌐 Web & Réseaux | 🚧 En développement | 10% |
| 📈 Données Économiques | 🚧 En développement | 10% |

## 📦 Installation

1. **Cloner le repository**
```bash
git clone [URL_DU_REPO]
cd open-dash
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration des variables d'environnement**
Créez un fichier `.env.local` à la racine du projet :
```env
OPENWEATHERMAP_API_KEY=votre_clé_api_openweathermap
LOCATIONIQ_KEY=votre_clé_api_locationiq
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

5. **Ouvrir dans le navigateur**
Accédez à [http://localhost:3000](http://localhost:3000)

## 🛠️ Scripts Disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm run start` : Lance le serveur de production
- `npm run lint` : Vérifie le code avec ESLint

## 🏗️ Architecture

```
src/
├── app/                 # Pages Next.js (App Router)
│   ├── geography/       # Section géographie
│   ├── technology/      # Section technologie
│   └── ...
├── components/          # Composants React réutilisables
│   ├── ui/             # Composants UI de base
│   └── ...
├── hooks/              # Hooks React personnalisés
└── lib/                # Utilitaires et configuration
```

## 🔌 APIs Intégrées

- **OpenWeatherMap** : Données météorologiques
- **Open-Meteo** : Prévisions météo
- **LocationIQ** : Géocodage inverse
- **GitHub** : Données des dépôts
- **CoinGecko** : Cryptomonnaies
- **World Bank** : Données économiques
- **REST Countries** : Informations sur les pays

## 🎨 Interface Utilisateur

- Design moderne et responsive
- Thème sombre/clair
- Animations fluides avec Framer Motion
- Composants accessibles avec Radix UI
- Cartes interactives avec Leaflet

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- Ordinateurs de bureau
- Tablettes
- Smartphones

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm run build
vercel --prod
```

### Autres plateformes
L'application peut être déployée sur n'importe quelle plateforme supportant Node.js.

## 🎯 Prochaines Étapes

- [ ] Finaliser la section Technologie (GitHub, NPM, StackOverflow)
- [ ] Implémenter la section Web & Réseaux (IP, DNS, SSL)
- [ ] Développer la section Données Économiques (Crypto, Actions, Forex)
- [ ] Ajouter des tests automatisés
- [ ] Optimiser les performances
- [ ] Ajouter plus d'APIs et de fonctionnalités


*Merci de visiter Open-Dash ! 🌟*
