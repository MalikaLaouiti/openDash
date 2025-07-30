# 🎣 Guide des Hooks

Cette section documente tous les hooks React personnalisés utilisés dans Open-Dash.

Les hooks personnalisés sont comme des petits assistants qui nous aident à gérer les données et l'état de notre application. Ils encapsulent la logique réutilisable et simplifient la gestion d'état dans les composants.

Les hooks personnalisés encapsulent la logique réutilisable et simplifient la gestion d'état dans les composants.

## 🌍 Hooks Géographie

### useWeather

Gère la récupération et l'état des données météo.

```tsx
import { useWeather } from "@/hooks/useWeather"

const { weather, loading, error, refetch } = useWeather(city)
```

**🎯 Ce qu'il fait :**
- Récupère les données météo en temps réel
- Gère automatiquement le chargement et les erreurs
- Permet de rafraîchir les données à la demande

**📝 Paramètres :**
- `city` (string, optionnel) : Ville pour les données météo (défaut: "Monastir")

**🎁 Ce qu'il vous donne :**
- `weather` : Données météo complètes (température, humidité, vent, etc.)
- `loading` : État de chargement (parfait pour les spinners !)
- `error` : Erreur éventuelle (pour informer l'utilisateur)
- `refetch` : Fonction de rafraîchissement (pour mettre à jour les données)

**Utilisation :**
```tsx
const WeatherComponent = () => {
  const { weather, loading, error } = useWeather("Paris")
  
  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>
  
  return (
    <div>
      <h2>Météo à {weather.city}</h2>
      <p>Température: {weather.temperature}°C</p>
    </div>
  )
}
```

### useLocation

Besoin de savoir où vous êtes ? Notre hook `useLocation` est votre GPS personnel ! 🗺️

```tsx
import { useLocation } from "@/hooks/useLocation"

const { location, loading, error, updateLocation } = useLocation(lat, lon)
```

**🎯 Ce qu'il fait :**
- Récupère les informations détaillées d'une localisation
- Gère la géolocalisation inverse (coordonnées → adresse)
- Fournit des données géographiques complètes

**📝 Paramètres :**
- `lat` (number, optionnel) : Latitude
- `lon` (number, optionnel) : Longitude

**🎁 Ce qu'il vous donne :**
- `location` : Informations complètes (adresse, pays, importance, etc.)
- `loading` : État de chargement
- `error` : Erreur éventuelle
- `updateLocation` : Fonction de mise à jour

### useCountries

Récupère les informations sur un ou plusieurs pays. 

```tsx
import { useCountries } from "@/hooks/useCountries"

const { countries, loading, error, getCountry } = useCountries(countryCode)
```

**🎯 Ce qu'il fait :**
- Récupère les informations détaillées sur les pays
- Fournit des données complètes (drapeaux, capitales, populations, etc.)
- Permet de rechercher par code pays ISO

**📝 Paramètres :**
- `countryCode` (string, optionnel) : Code ISO du pays (ex: "TN", "FR", "US")

**🎁 Ce qu'il vous donne :**
- `countries` : Informations complètes du pays (nom, capitale, population, drapeaux, etc.)
- `loading` : État de chargement
- `error` : Erreur éventuelle
- `getCountry` : Fonction pour récupérer un pays spécifique

### 🌦️ useOpenMeteo - Nos Prévisions Météo

Les prévisions météo, c'est notre spécialité ! Le hook `useOpenMeteo` vous donne les prévisions sur 7 jours ! 🌦️

```tsx
import { useOpenMeteo } from "@/hooks/useOpenMeteo"

const { forecast, loading, error } = useOpenMeteo(lat, lon)
```

**🎯 Ce qu'il fait :**
- Récupère les prévisions météo sur 7 jours
- Fournit les températures min/max et précipitations
- Données gratuites et précises

**📝 Paramètres :**
- `lat` (number) : Latitude de la localisation
- `lon` (number) : Longitude de la localisation

**🎁 Ce qu'il vous donne :**
- `forecast` : Prévisions détaillées (températures, précipitations, etc.)
- `loading` : État de chargement
- `error` : Erreur éventuelle

## 💻 Hooks Technologie

### useGithub

Gère les données de l'API GitHub.

```tsx
import { useGithub } from "@/hooks/useGithub"

const { repos, loading, error, getUserRepos } = useGithub(user)
```

**🎯 Ce qu'il fait :**
- Récupère les dépôts GitHub d'un utilisateur
- Fournit des informations détaillées (stars, forks, langage, etc.)
- Permet d'explorer les projets open source

**📝 Paramètres :**
- `user` (string, optionnel) : Nom d'utilisateur GitHub (défaut: "vercel")

**🎁 Ce qu'il vous donne :**
- `repos` : Liste des dépôts avec toutes les informations
- `loading` : État de chargement
- `error` : Erreur éventuelle
- `getUserRepos` : Fonction pour récupérer les dépôts d'un utilisateur

### 💬 useStackOverflow - Notre Assistant Programmation

Besoin d'aide en programmation ? Notre hook `useStackOverflow` vous connecte à la communauté des développeurs ! 💬

```tsx
import { useStackOverflow } from "@/hooks/useStackOverflow"

const { questions, loading, error, searchQuestions } = useStackOverflow(tag)
```

**🎯 Ce qu'il fait :**
- Récupère les questions Stack Overflow par tag
- Fournit des informations détaillées (score, réponses, vues, etc.)
- Permet d'explorer les solutions de la communauté

**📝 Paramètres :**
- `tag` (string, optionnel) : Tag de recherche (défaut: "javascript")

**🎁 Ce qu'il vous donne :**
- `questions` : Liste des questions avec toutes les informations
- `loading` : État de chargement
- `error` : Erreur éventuelle
- `searchQuestions` : Fonction pour rechercher des questions

## 🌐 Hooks Web & Réseaux

### useIpInfo

Gère les informations IP.

```tsx
import { useIpInfo } from "@/hooks/useIpInfo"

const { ipInfo, loading, error } = useIpInfo()
```

**🎯 Ce qu'il fait :**
- Récupère les informations détaillées sur votre adresse IP
- Fournit la géolocalisation, l'ISP, le fuseau horaire, etc.
- Permet de comprendre votre connexion internet

**📝 Paramètres :**
- Aucun paramètre requis (utilise automatiquement votre IP)

**🎁 Ce qu'il vous donne :**
- `ipInfo` : Informations complètes (pays, ville, ISP, fuseau horaire, etc.)
- `loading` : État de chargement
- `error` : Erreur éventuelle

## 📈 Hooks Économiques

### useCrypto

Gère les données de cryptomonnaies.

```tsx
import { useCrypto } from "@/hooks/useCrypto"

const { cryptoData, loading, error, getCryptoPrice } = useCrypto()
```

**🎯 Ce qu'il fait :**
- Récupère les données de cryptomonnaies en temps réel
- Fournit les prix, capitalisations, variations, etc.
- Permet de suivre l'évolution des marchés crypto

**📝 Paramètres :**
- Aucun paramètre requis (récupère les principales cryptomonnaies)

**🎁 Ce qu'il vous donne :**
- `cryptoData` : Données complètes des cryptomonnaies
- `loading` : État de chargement
- `error` : Erreur éventuelle
- `getCryptoPrice` : Fonction pour récupérer le prix d'une crypto spécifique

## 🔧 Hook Générique

### useApi

Hook générique pour les appels API.

```tsx
import { useApi } from "@/hooks/useApi"

const { data, loading, error, refetch } = useApi(apiCall, dependencies)
```

**🎯 Ce qu'il fait :**
- Gère automatiquement les appels API
- Fournit les états de chargement et d'erreur
- Permet de rafraîchir les données facilement
- Optimise les performances avec la mémoisation

**📝 Paramètres :**
- `apiCall` (function) : Fonction qui retourne une Promise
- `dependencies` (array, optionnel) : Dépendances pour le re-fetch

**🎁 Ce qu'il vous donne :**
- `data` : Données récupérées de l'API
- `loading` : État de chargement
- `error` : Erreur éventuelle
- `refetch` : Fonction pour rafraîchir les données

**Options :**
```tsx
{
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body: any,
  headers: Record<string, string>,
  cache: boolean,
  refetchInterval: number
}
```

## 🎯 Patterns Communs

### Gestion d'État

```tsx
const useCustomHook = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/endpoint')
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, fetchData }
}
```

### Cache et Optimisation

```tsx
const useCachedData = (key: string) => {
  const [data, setData] = useState(() => {
    const cached = localStorage.getItem(key)
    return cached ? JSON.parse(cached) : null
  })

  const updateData = useCallback((newData) => {
    setData(newData)
    localStorage.setItem(key, JSON.stringify(newData))
  }, [key])

  return [data, updateData]
}
```

### Debounce

```tsx
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
```

## 🔄 Gestion des Erreurs

### Hook d'Erreur Personnalisé

```tsx
const useErrorHandler = () => {
  const [error, setError] = useState(null)

  const handleError = useCallback((err) => {
    console.error('Hook Error:', err)
    setError(err.message)
    
    // Auto-clear après 5 secondes
    setTimeout(() => setError(null), 5000)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { error, handleError, clearError }
}
```

## 📊 Monitoring et Logs

### Hook de Logging

```tsx
const useLogger = (hookName: string) => {
  const log = useCallback((action: string, data?: any) => {
    console.log(`[${hookName}] ${action}`, data)
  }, [hookName])

  const logError = useCallback((error: Error) => {
    console.error(`[${hookName}] Error:`, error)
  }, [hookName])

  return { log, logError }
}
```

## 🧪 Tests des Hooks

### Exemple de Test

```tsx
import { renderHook, act } from '@testing-library/react'
import { useWeather } from '@/hooks/useWeather'

test('useWeather should fetch weather data', async () => {
  const { result } = renderHook(() => useWeather('Paris'))

  expect(result.current.loading).toBe(true)

  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })

  expect(result.current.loading).toBe(false)
  expect(result.current.weather).toBeDefined()
})
```

## 🎯 Bonnes Pratiques

### 1. Nommage

```tsx
// ✅ Bon
const useWeatherData = () => { ... }
const useUserProfile = () => { ... }

// ❌ Éviter
const useData = () => { ... }
const useHook = () => { ... }
```

### 2. Gestion des Dépendances

```tsx
// ✅ Bon - Dépendances explicites
useEffect(() => {
  fetchData(city, apiKey)
}, [city, apiKey, fetchData])

// ❌ Éviter - Dépendances manquantes
useEffect(() => {
  fetchData(city, apiKey)
}, [])
```

### 3. Nettoyage

```tsx
useEffect(() => {
  const controller = new AbortController()
  
  fetchData(controller.signal)
  
  return () => {
    controller.abort()
  }
}, [])
```

### 4. Performance

```tsx
// ✅ Bon - Mémoisation
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data)
}, [data])

// ✅ Bon - Callback mémoisé
const handleClick = useCallback(() => {
  console.log('Clicked')
}, [])
```

## 🔗 Intégration avec les Composants

### Exemple Complet

```tsx
const WeatherDashboard = () => {
  const { weather, loading, error, refetch } = useWeather()
  const { location } = useLocation()
  const { log } = useLogger('WeatherDashboard')

  useEffect(() => {
    log('Component mounted')
  }, [log])

  const handleRefresh = useCallback(() => {
    refetch()
    log('Manual refresh triggered')
  }, [refetch, log])

  if (loading) return <LoadData message="Chargement météo..." />
  if (error) return <ErrorAlert title="Erreur météo" message={error} />

  return (
    <div>
      <WeatherCard data={weather} location={location} />
      <RefreshButton onRefresh={handleRefresh} />
    </div>
  )
}
```

---

*Pour plus d'informations sur les composants, consultez le [Guide des Composants](./composants.md)* 