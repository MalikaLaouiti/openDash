# 🧩 Guide des Composants

Cette section documente tous les composants React utilisés dans Open-Dash.

Open-Dash utilise **shadcn/ui v0** pour créer une interface utilisateur moderne et cohérente.
Cette approche nous permet de nous concentrer sur la logique métier tout en ayant une interface utilisateur de qualité professionnelle !

## 📋 Vue d'Ensemble

Les composants sont organisés en deux catégories principales :
- **Composants UI** : Composants de base réutilisables (shadcn/ui)
- **Composants Métier** : Composants spécifiques aux fonctionnalités


## 🌍 Composants Géographie

### WeatherCardReal (`weather-card-real.tsx`)

Affiche les données météo en temps réel.

```tsx
import { WeatherCardReal } from "@/components/weather-card-real"

<WeatherCardReal />
```

**🎯 Ce qu'il fait :**
- Affichage température actuelle avec icônes météo dynamiques
- Conditions météorologiques détaillées (humidité, pression, vent, visibilité)
- Informations sur le lever et coucher du soleil
- Bouton de rafraîchissement intégré
- Design avec gradient bleu et thème adaptatif

**🔧 Hooks utilisés :**
- `useWeather` : Récupération des données météo
- `useLocation` : Géolocalisation

**💡 Fonctionnalités avancées :**
- Icônes météo intelligentes selon les conditions
- Gradient de couleur bleu pour l'identité visuelle
- Affichage du ressenti thermique
- Badges pour les conditions météo
- Interface responsive avec grille adaptative

Carte interactive avec Leaflet.

```tsx
import { MapCard } from "@/components/map-card"

<MapCard />
```

**🎯 Ce qu'il fait :**
- Carte interactive Leaflet haute performance
- Marqueurs de localisation dynamiques
- Contrôles de zoom et déplacement
- Intégration parfaite avec les données météo
- Design responsive et moderne

**🔧 Technologies utilisées :**
- **Leaflet** : Carte interactive
- **React-Leaflet** : Intégration React
- **shadcn/ui** : Interface utilisateur

**💡 Fonctionnalités avancées :**
- Marqueurs personnalisés avec icônes météo
- Popups informatifs sur les marqueurs
- Géolocalisation automatique
- Animations de transition fluides

### LocationCard (`location-card.tsx`) - Notre Expert Localisation

Informations détaillées de localisation avec un design informatif et élégant ! 📍

```tsx
import { LocationCard } from "@/components/location-card"

<LocationCard />
```

**🎯 Ce qu'il fait :**
- Affichage des informations géographiques complètes
- Statistiques de population et superficie
- Informations sur la capitale et le continent
- Langues officielles du pays
- Design avec gradient violet et thème adaptatif

**🔧 Hooks utilisés :**
- `useIpInfo` : Géolocalisation par IP
- `useCountries` : Informations détaillées des pays
- `DataLoader` : Affichage du chargement
- `ErrorAlert` : Gestion des erreurs

**💡 Fonctionnalités avancées :**
- Détection automatique du pays par IP
- Affichage des statistiques dans des cartes stylisées
- Gradient de couleur violet pour l'identité visuelle
- Bouton de rafraîchissement intégré
- Interface responsive avec icônes Lucide

### InteractiveMapCard (`interactive-map-card.tsx`) - Notre Carte 3D Avancée

Carte interactive avancée avec fonctionnalités 3D et animations immersives ! 🌍

```tsx
import { InteractiveMapCard } from "@/components/interactive-map-card"

<InteractiveMapCard />
```

**🎯 Ce qu'il fait :**
- Carte 3D interactive avec Three.js
- Animations fluides et transitions élégantes
- Interactions avancées (rotation, zoom, pan)
- Données en temps réel avec visualisations 3D
- Expérience utilisateur immersive

**🔧 Technologies utilisées :**
- **Three.js** : Rendu 3D
- **React Three Fiber** : Intégration React
- **shadcn/ui** : Interface utilisateur

**💡 Fonctionnalités avancées :**
- Contrôles 3D intuitifs
- Visualisations de données en 3D
- Animations de chargement sophistiquées
- Performance optimisée pour le web

## 📊 Composants de Données

### ApiGrid (`api-grid.tsx`)

Grille d'affichage des APIs disponibles.

```tsx
import { ApiGrid } from "@/components/api-grid"

const apis = [
  {
    id: "weather",
    title: "Météo OpenWeatherMap",
    description: "Données météorologiques en temps réel",
    lastUpdate: "Il y a 2 min",
    status: "active",
    href: "/geography/weather"
  }
]

<ApiGrid apis={apis} />
```

**🎯 Ce qu'il fait :**
- Affichage des APIs dans une grille responsive
- Indicateurs de statut visuels (actif, inactif, erreur)
- Horodatage de la dernière mise à jour
- Navigation vers les pages de détails
- Design avec hover effects et transitions

**📝 Props :**
- `apis` : Array d'objets API avec id, title, description, lastUpdate, status, href

**💡 Fonctionnalités avancées :**
- Icônes de statut dynamiques (Activity, Clock, AlertCircle)
- Badges colorés pour les statuts
- Boutons de navigation intégrés
- Design responsive (1 colonne mobile, 2 tablette, 3 desktop)
- Transitions fluides au survol

### CategoryCard (`category-card.tsx`)

Carte de catégorie pour la page d'accueil.

```tsx
import { CategoryCard } from "@/components/category-card"

const category = {
  id: "geography",
  title: "🌍 Géographie",
  description: "Météo et cartes interactives",
  href: "/geography",
  color: "from-blue-500 to-cyan-500",
  apis: ["OpenWeatherMap", "Géolocalisation"],
  count: 3
}

<CategoryCard category={category} />
```

### StatsOverview (`stats-overview.tsx`)

Vue d'ensemble des statistiques.

```tsx
import { StatsOverview } from "@/components/stats-overview"

<StatsOverview />
```

**Fonctionnalités :**
- Métriques en temps réel
- Graphiques interactifs
- Mise à jour automatique

## 🎯 Composants de Navigation

### DashboardHeader (`dashboard-header.tsx`)

En-tête du tableau de bord.

```tsx
import { DashboardHeader } from "@/components/dashboard-header"

<DashboardHeader />
```

**Fonctionnalités :**
- Navigation principale
- Recherche
- Thème sombre/clair
- Menu utilisateur

### DetailHeader (`detail-header.tsx`)

En-tête des pages de détails.

```tsx
import { DetailHeader } from "@/components/detail-header"

<DetailHeader 
  title="Titre de la page"
  description="Description de la page"
/>
```

### HeroSection (`hero-section.tsx`)

Section héro de la page d'accueil.

```tsx
import { HeroSection } from "@/components/hero-section"

<HeroSection />
```

**Fonctionnalités :**
- Titre principal
- Description du projet
- Call-to-action
- Animations d'entrée

## 🔄 Composants d'État

### WeatherContext (`WeatherContext.tsx`)

Contexte React pour la gestion de l'état météo.

```tsx
import { WeatherProvider, useWeather } from "@/components/WeatherContext"

// Provider
<WeatherProvider>
  <App />
</WeatherProvider>

// Hook
const { weather, loading, error } = useWeather()
```

**État géré :**
- Données météo actuelles
- État de chargement
- Erreurs
- Historique

### RefreshButton (`refresh-button.tsx`)

Bouton de rafraîchissement des données.

```tsx
import { RefreshButton } from "@/components/refresh-button"

<RefreshButton onRefresh={handleRefresh} />
```

**Props :**
- `onRefresh` : Fonction de rafraîchissement
- `loading` : État de chargement
- `disabled` : État désactivé

## ⚠️ Composants d'Erreur

### ErrorAlert (`error-alert.tsx`)

Affichage des erreurs utilisateur.

```tsx
import { ErrorAlert } from "@/components/error-alert"

<ErrorAlert 
  title="Erreur de connexion"
  message="Impossible de récupérer les données"
  onRetry={handleRetry}
/>
```

**Props :**
- `title` : Titre de l'erreur
- `message` : Message détaillé
- `onRetry` : Fonction de nouvelle tentative

### LoadData (`load-data.tsx`)

Composant de chargement de données.

```tsx
import { LoadData } from "@/components/load-data"

<LoadData message="Chargement des données..." />
```

## 🎨 Composants de Visualisation

### WeatherChart (`weather-chart.tsx`)

Graphique des données météo avec Chart.js.

```tsx
import { WeatherChart } from "@/components/weather-chart"

<WeatherChart />
```

**🎯 Ce qu'il fait :**
- Graphique linéaire des températures min/max sur 7 jours
- Visualisation des précipitations avec tooltips
- Données en temps réel via Open-Meteo API
- Interface interactive avec zoom et hover
- Design responsive et professionnel

**🔧 Hooks utilisés :**
- `useOpenMeteo` : Données de prévisions météo
- `WeatherContext` : Gestion du contexte météo
- `DataLoader` : Affichage du chargement
- `ErrorAlert` : Gestion des erreurs

**💡 Fonctionnalités avancées :**
- Graphique Chart.js avec animations fluides
- Affichage des précipitations avec icônes 💧
- Tooltips informatifs sur les données
- Bouton de rafraîchissement intégré
- Échelles automatiques selon les données
- Thème adaptatif (clair/sombre)

### JsonViewer (`json-viewer.tsx`)

Visualiseur JSON pour le débogage.

```tsx
import { JsonViewer } from "@/components/json-viewer"

<JsonViewer 
  data={apiResponse} 
  title="Données API"
  apiUrl="https://api.example.com/data"
/>
```

**🎯 Ce qu'il fait :**
- Affichage formaté des données JSON
- Fonction de copie en un clic
- Affichage de l'URL de l'API
- Thème sombre pour une meilleure lisibilité
- Interface utilisateur intuitive

**📝 Props :**
- `data` : Données JSON à afficher
- `title` : Titre du visualiseur
- `apiUrl` : URL de l'API (optionnel)

**💡 Fonctionnalités avancées :**
- Bouton de copie avec feedback visuel
- Affichage de l'URL de l'API source
- Thème sombre avec syntax highlighting
- Scroll automatique pour les gros fichiers
- Gestion des états de chargement et d'erreur
- Icônes Lucide pour une meilleure UX

## 🚧 Composants en Développement

### ComingSoon (`coming-soon.tsx`)

Placeholder pour les fonctionnalités à venir.

```tsx
import { ComingSoon } from "@/components/coming-soon"

<ComingSoon 
  title="Fonctionnalité à venir"
  description="Cette fonctionnalité sera bientôt disponible"
/>
```

**🎯 Ce qu'il fait :**
- Affichage élégant des fonctionnalités en développement
- Design cohérent avec le reste de l'application
- Message d'encouragement pour les utilisateurs
- Préparation pour les futures intégrations

**💡 Utilisation :**
- Sections en cours de développement
- APIs non encore implémentées
- Fonctionnalités planifiées
- Maintenance des pages

## 📱 Responsive Design

Tous les composants sont conçus pour être responsive :

```tsx
// Exemple de classes Tailwind responsive
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4
">
  {/* Contenu */}
</div>
```

## 🎯 Bonnes Pratiques

### Props Typées

```tsx
interface WeatherCardProps {
  city?: string
  showDetails?: boolean
  onRefresh?: () => void
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  city = "Paris",
  showDetails = true,
  onRefresh
}) => {
  // Composant
}
```

### Gestion d'Erreurs

```tsx
const [error, setError] = useState<string | null>(null)

if (error) {
  return <ErrorAlert title="Erreur" message={error} />
}
```

### Loading States

```tsx
const [loading, setLoading] = useState(false)

if (loading) {
  return <LoadData message="Chargement..." />
}
```

---

*Pour plus d'informations sur l'architecture, consultez le [Guide d'Architecture](./architecture.md)* 