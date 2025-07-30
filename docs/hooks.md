# 🎣 Guide des Hooks

Cette section documente tous les hooks React personnalisés utilisés dans Open-Dash.

## 📋 Vue d'Ensemble

Les hooks personnalisés encapsulent la logique réutilisable et simplifient la gestion d'état dans les composants.

## 🌍 Hooks Géographie

### useWeather

Gère la récupération et l'état des données météo.

```tsx
import { useWeather } from "@/hooks/useWeather"

const { weather, loading, error, refetch } = useWeather(city)
```

**Paramètres :**
- `city` (string, optionnel) : Ville pour les données météo

**Retour :**
- `weather` : Données météo actuelles
- `loading` : État de chargement
- `error` : Erreur éventuelle
- `refetch` : Fonction de rafraîchissement

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

Gère la géolocalisation et les informations de localisation.

```tsx
import { useLocation } from "@/hooks/useLocation"

const { location, loading, error, updateLocation } = useLocation()
```

**Retour :**
- `location` : Coordonnées et informations de localisation
- `loading` : État de chargement
- `error` : Erreur éventuelle
- `updateLocation` : Fonction de mise à jour

### useCountries

Récupère les informations sur les pays.

```tsx
import { useCountries } from "@/hooks/useCountries"

const { countries, loading, error, getCountry } = useCountries()
```

**Méthodes :**
- `getCountry(code)` : Récupère un pays par son code ISO

### useOpenMeteo

Gère les données de l'API Open-Meteo.

```tsx
import { useOpenMeteo } from "@/hooks/useOpenMeteo"

const { forecast, loading, error } = useOpenMeteo(lat, lon)
```

**Paramètres :**
- `lat` (number) : Latitude
- `lon` (number) : Longitude

## 💻 Hooks Technologie

### useGithub

Gère les données de l'API GitHub.

```tsx
import { useGithub } from "@/hooks/useGithub"

const { repos, loading, error, getUserRepos } = useGithub()
```

**Méthodes :**
- `getUserRepos(username)` : Récupère les dépôts d'un utilisateur

### useStackOverflow

Gère les données de Stack Overflow.

```tsx
import { useStackOverflow } from "@/hooks/useStackOverflow"

const { questions, loading, error, searchQuestions } = useStackOverflow()
```

**Méthodes :**
- `searchQuestions(query)` : Recherche des questions

## 🌐 Hooks Web & Réseaux

### useIpInfo

Gère les informations IP.

```tsx
import { useIpInfo } from "@/hooks/useIpInfo"

const { ipInfo, loading, error } = useIpInfo()
```

**Retour :**
- `ipInfo` : Informations sur l'adresse IP (pays, ville, ISP, etc.)

## 📈 Hooks Économiques

### useCrypto

Gère les données de cryptomonnaies.

```tsx
import { useCrypto } from "@/hooks/useCrypto"

const { cryptoData, loading, error, getCryptoPrice } = useCrypto()
```

**Méthodes :**
- `getCryptoPrice(symbol)` : Récupère le prix d'une cryptomonnaie

## 🔧 Hook Générique

### useApi

Hook générique pour les appels API.

```tsx
import { useApi } from "@/hooks/useApi"

const { data, loading, error, refetch } = useApi(endpoint, options)
```

**Paramètres :**
- `endpoint` (string) : Point de terminaison de l'API
- `options` (object, optionnel) : Options de configuration

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