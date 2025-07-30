# 🧩 Guide des Composants

Cette section documente tous les composants React utilisés dans Open-Dash.

## 📋 Vue d'Ensemble

Les composants sont organisés en deux catégories principales :
- **Composants UI** : Composants de base réutilisables
- **Composants Métier** : Composants spécifiques aux fonctionnalités

## 🎨 Composants UI

### Button (`ui/button.tsx`)

Bouton réutilisable avec variantes et tailles.

```tsx
import { Button } from "@/components/ui/button"

// Utilisation
<Button variant="default" size="lg">
  Cliquer ici
</Button>
```

**Props :**
- `variant` : "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
- `size` : "default" | "sm" | "lg" | "icon"
- `children` : Contenu du bouton

### Card (`ui/card.tsx`)

Conteneur de carte avec header, contenu et footer.

```tsx
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

<Card>
  <CardHeader>
    <h3>Titre de la carte</h3>
  </CardHeader>
  <CardContent>
    Contenu de la carte
  </CardContent>
  <CardFooter>
    Actions
  </CardFooter>
</Card>
```

### Input (`ui/input.tsx`)

Champ de saisie stylisé.

```tsx
import { Input } from "@/components/ui/input"

<Input 
  type="text" 
  placeholder="Entrez votre texte"
  className="w-full"
/>
```

### Progress (`ui/progress.tsx`)

Barre de progression.

```tsx
import { Progress } from "@/components/ui/progress"

<Progress value={75} className="w-full" />
```

## 🌍 Composants Géographie

### WeatherCardReal (`weather-card-real.tsx`)

Affiche les données météo en temps réel.

```tsx
import { WeatherCardReal } from "@/components/weather-card-real"

<WeatherCardReal />
```

**Fonctionnalités :**
- Affichage température actuelle
- Conditions météorologiques
- Humidité et pression
- Mise à jour automatique

**Hooks utilisés :**
- `useWeather` : Récupération des données météo
- `useLocation` : Géolocalisation

### MapCard (`map-card.tsx`)

Carte interactive avec Leaflet.

```tsx
import { MapCard } from "@/components/map-card"

<MapCard />
```

**Fonctionnalités :**
- Carte interactive Leaflet
- Marqueurs de localisation
- Zoom et déplacement
- Intégration avec les données météo

### LocationCard (`location-card.tsx`)

Informations détaillées de localisation.

```tsx
import { LocationCard } from "@/components/location-card"

<LocationCard />
```

**Fonctionnalités :**
- Nom de la ville
- Coordonnées GPS
- Informations du pays
- Données démographiques

### InteractiveMapCard (`interactive-map-card.tsx`)

Carte interactive avancée avec fonctionnalités étendues.

```tsx
import { InteractiveMapCard } from "@/components/interactive-map-card"

<InteractiveMapCard />
```

**Fonctionnalités :**
- Carte 3D avec Three.js
- Animations fluides
- Interactions avancées
- Données en temps réel

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
    status: "active",
    href: "/geography/weather"
  }
]

<ApiGrid apis={apis} />
```

**Props :**
- `apis` : Array d'objets API avec id, title, description, status, href

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

<WeatherChart data={weatherData} />
```

**Props :**
- `data` : Données météo pour le graphique
- `type` : Type de graphique ("line" | "bar" | "radar")

### JsonViewer (`json-viewer.tsx`)

Visualiseur JSON pour le débogage.

```tsx
import { JsonViewer } from "@/components/json-viewer"

<JsonViewer data={apiResponse} />
```

**Props :**
- `data` : Données JSON à afficher
- `collapsed` : État replié/déplié

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