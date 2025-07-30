# 🔌 Guide des APIs

Cette section documente toutes les APIs externes intégrées dans Open-Dash.

Nous avons sélectionné les meilleures APIs publiques pour vous offrir des données en temps réel de qualité ! Chaque API est comme un petit super-héros qui nous apporte des informations précieuses. 🦸‍♂️

Open-Dash intègre plusieurs APIs publiques pour fournir des données en temps réel dans différentes catégories.

## 🌍 APIs Géographie

### 🌤️ OpenWeatherMap API - Notre Météorologue Star

**Endpoint :** `GET /api/weather`

**Description :** Notre API météo préférée ! Elle nous donne toutes les informations météorologiques en temps réel avec une précision incroyable ! 🌤️

**🎯 Ce qu'elle fait :**
- Données météorologiques en temps réel
- Température, humidité, pression, vent
- Conditions météo détaillées
- Icônes météo pour une belle présentation

**📝 Paramètres :**
- `city` (string, optionnel) : Nom de la ville (défaut: "Monastir")

**🎁 Réponse :**
```json
{
  "name": "Monastir",
  "main": {
    "temp": 25.6,
    "humidity": 65,
    "pressure": 1013
  },
  "weather": [
    {
      "main": "Clear",
      "description": "ciel dégagé",
      "icon": "01d"
    }
  ],
  "wind": {
    "speed": 3.2,
    "deg": 180
  }
}
```

**Configuration :**
```env
OPENWEATHERMAP_API_KEY=votre_clé_api
```

**Limites :**
- 1000 appels/jour (gratuit)
- 60 appels/minute

### 🌦️ Open-Meteo API - Nos Prévisions Gratuites

**Endpoint :** `GET /api/open-meteo`

**Description :** Une API météo 100% gratuite et géniale ! Elle nous donne des prévisions précises sans demander de clé API ! 🌦️

**🎯 Ce qu'elle fait :**
- Prévisions météorologiques sur 7 jours
- Températures min/max et précipitations
- Données basées sur les coordonnées GPS
- Prévisions ultra-précises

**📝 Paramètres :**
- `lat` (number, optionnel) : Latitude (défaut: 35.78)
- `lon` (number, optionnel) : Longitude (défaut: 10.83)

**🎁 Réponse :**
```json
{
  "daily": {
    "time": ["2024-01-01", "2024-01-02"],
    "temperature_2m_max": [25.6, 26.1],
    "temperature_2m_min": [18.2, 19.1],
    "precipitation_sum": [0, 2.5]
  }
}
```

**⭐ Avantages :**
- 🆓 Gratuit sans clé API
- 🎯 Données précises
- 📅 Prévisions sur 7 jours
- ⚡ Rapide et fiable

### 📍 LocationIQ API - Notre GPS Intelligent

**Endpoint :** `GET /api/locationiq`

**Description :** Notre GPS intelligent ! Elle transforme les coordonnées GPS en adresses lisibles. C'est comme avoir un traducteur GPS ! 📍

**🎯 Ce qu'elle fait :**
- Géocodage inverse (coordonnées → adresse)
- Informations détaillées de localisation
- Données de pays, ville, code postal
- Précision géographique élevée

**📝 Paramètres :**
- `lat` (number, requis) : Latitude
- `lon` (number, requis) : Longitude

**🎁 Réponse :**
```json
{
  "display_name": "Monastir, Monastir, Tunisia",
  "address": {
    "city": "Monastir",
    "state": "Monastir",
    "country": "Tunisia",
    "postcode": "5000"
  },
  "lat": "35.766",
  "lon": "10.836"
}
```

**Configuration :**
```env
LOCATIONIQ_KEY=votre_clé_api
```

### 🌍 REST Countries API - Notre Encyclopédie Mondiale

**Endpoint :** `GET /api/countries`

**Description :** Notre encyclopédie mondiale ! Elle nous donne toutes les informations sur tous les pays du monde. C'est comme avoir Wikipédia pour les pays ! 🌍

**🎯 Ce qu'elle fait :**
- Informations détaillées sur tous les pays
- Drapeaux, capitales, populations
- Devises, langues, frontières
- Données démographiques complètes

**📝 Paramètres :**
- `code` (string, requis) : Code ISO du pays (ex: "TN", "FR", "US")

**🎁 Réponse :**
```json
{
  "name": {
    "common": "Tunisia",
    "official": "Republic of Tunisia"
  },
  "capital": ["Tunis"],
  "population": 11818618,
  "area": 163610,
  "currencies": {
    "TND": {
      "name": "Tunisian dinar",
      "symbol": "د.ت"
    }
  },
  "flags": {
    "png": "https://flagcdn.com/w320/tn.png"
  }
}
```

## 💻 APIs Technologie

### 🐙 GitHub API - Notre Explorateur de Code

**Endpoint :** `GET /api/github`

**Description :** Notre explorateur de code ! Elle nous connecte directement à l'univers GitHub pour découvrir les meilleurs projets open source ! 🐙

**🎯 Ce qu'elle fait :**
- Données des dépôts GitHub
- Statistiques des projets (stars, forks)
- Informations sur les langages utilisés
- Dates de création et mise à jour

**📝 Paramètres :**
- `user` (string, optionnel) : Nom d'utilisateur (défaut: "vercel")

**🎁 Réponse :**
```json
[
  {
    "name": "next.js",
    "description": "The React Framework",
    "stargazers_count": 100000,
    "forks_count": 22000,
    "language": "JavaScript",
    "updated_at": "2024-01-01T10:00:00Z"
  }
]
```

**Configuration :**
```env
GITHUB_TOKEN=votre_token_personnel
```

**Limites :**
- 5000 appels/heure (avec token)
- 60 appels/heure (sans token)

### 💬 Stack Overflow API - Notre Assistant Programmation

**Endpoint :** `GET /api/stackoverflow`

**Description :** Notre assistant programmation ! Elle nous connecte à la plus grande communauté de développeurs du monde ! 💬

**🎯 Ce qu'elle fait :**
- Données de questions et réponses
- Recherche par tags de programmation
- Statistiques des questions (score, réponses)
- Informations sur les auteurs

**📝 Paramètres :**
- `tag` (string, optionnel) : Tag de recherche (ex: "javascript", "react")
- `page` (number, optionnel) : Numéro de page pour la pagination

**🎁 Réponse :**
```json
{
  "items": [
    {
      "title": "How to use React hooks?",
      "score": 15,
      "answer_count": 3,
      "tags": ["react", "javascript"],
      "creation_date": 1640995200
    }
  ],
  "has_more": true
}
```

## 🌐 APIs Web & Réseaux

### 🌐 IP Geolocation API - Notre Détective IP

**Endpoint :** `GET /api/ipinfo`

**Description :** Notre détective IP ! Elle nous révèle tous les secrets de votre connexion internet ! 🔍

**🎯 Ce qu'elle fait :**
- Informations détaillées sur l'adresse IP
- Géolocalisation précise
- Informations sur l'ISP et l'organisation
- Fuseau horaire et données de connexion

**📝 Paramètres :**
- Aucun paramètre requis (utilise automatiquement votre IP)

**🎁 Réponse :**
```json
{
  "ip": "192.168.1.1",
  "city": "Monastir",
  "region": "Monastir",
  "country": "TN",
  "loc": "35.766,10.836",
  "org": "Internet Service Provider",
  "timezone": "Africa/Tunis"
}
```

### DNS Lookup API

**Endpoint :** `GET /api/dns`

**Description :** Recherche d'informations DNS

**Paramètres :**
- `domain` (string, requis) : Nom de domaine

**Réponse :**
```json
{
  "domain": "example.com",
  "a": ["93.184.216.34"],
  "aaaa": ["2606:2800:220:1:248:1893:25c8:1946"],
  "mx": [
    {
      "priority": 10,
      "exchange": "mail.example.com"
    }
  ],
  "ns": ["ns1.example.com", "ns2.example.com"]
}
```

## 📈 APIs Économiques

### 💰 CoinGecko API - Notre Expert Cryptomonnaies

**Endpoint :** `GET /api/crypto`

**Description :** Notre expert cryptomonnaies ! Elle nous donne toutes les informations sur les marchés crypto en temps réel ! 💰

**🎯 Ce qu'elle fait :**
- Données de cryptomonnaies en temps réel
- Prix, capitalisations, volumes
- Variations sur 24h
- Informations détaillées sur chaque crypto

**📝 Paramètres :**
- `coin` (string, optionnel) : ID de la cryptomonnaie (ex: "bitcoin", "ethereum")

**🎁 Réponse :**
```json
{
  "id": "bitcoin",
  "symbol": "btc",
  "name": "Bitcoin",
  "current_price": 45000,
  "market_cap": 850000000000,
  "price_change_24h": 2.5,
  "volume_24h": 25000000000
}
```

**Configuration :**
```env
COINGECKO_API_KEY=votre_clé_api
```

### 📊 World Bank API - Notre Expert Économique

**Endpoint :** `GET /api/worldBank`

**Description :** Notre expert économique ! Elle nous donne accès aux données officielles de la Banque Mondiale ! 📊

**🎯 Ce qu'elle fait :**
- Données économiques officielles des pays
- Indicateurs démographiques et économiques
- Données historiques et actuelles
- Informations fiables et vérifiées

**📝 Paramètres :**
- `country` (string, optionnel) : Code pays (défaut: "TN")
- `indicator` (string, optionnel) : Indicateur économique (ex: "EN.POP.DNST" pour la densité de population)

**🎁 Réponse :**
```json
[
  {
    "indicator": {
      "id": "EN.POP.DNST",
      "value": "Population density (people per sq. km of land area)"
    },
    "country": {
      "id": "TN",
      "value": "Tunisia"
    },
    "value": 76.5,
    "date": "2020"
  }
]
```

## 🔧 Configuration du Serveur

### Serveur Express.js

Le serveur `server/server.mjs` agit comme proxy pour toutes les APIs :

```javascript
// Exemple d'endpoint
app.get('/api/weather', async (req, res) => {
  const city = req.query.city || 'Monastir'
  const apiKey = process.env.OPENWEATHERMAP_API_KEY
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' })
  }
})
```

### Gestion des Erreurs

```javascript
// Middleware de gestion d'erreurs
app.use((error, req, res, next) => {
  console.error('[API Error]:', error)
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  })
})
```

### Rate Limiting

```javascript
// Exemple de rate limiting
const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite à 100 requêtes par fenêtre
  message: 'Too many requests from this IP'
})

app.use('/api/', apiLimiter)
```

## 📊 Monitoring des APIs

### Logs Structurés

```javascript
// Logging des appels API
app.use((req, res, next) => {
  const start = Date.now()
  
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    })
  })
  
  next()
})
```

### Métriques

```javascript
// Collecte de métriques
const metrics = {
  requests: 0,
  errors: 0,
  responseTime: []
}

app.use((req, res, next) => {
  metrics.requests++
  const start = Date.now()
  
  res.on('finish', () => {
    const duration = Date.now() - start
    metrics.responseTime.push(duration)
    
    if (res.statusCode >= 400) {
      metrics.errors++
    }
  })
  
  next()
})
```

## 🔐 Sécurité

### Validation des Entrées

```javascript
// Validation des paramètres
const validateCity = (city) => {
  if (!city || typeof city !== 'string') {
    throw new Error('City parameter is required and must be a string')
  }
  
  if (city.length > 100) {
    throw new Error('City name too long')
  }
  
  return city.trim()
}

app.get('/api/weather', async (req, res) => {
  try {
    const city = validateCity(req.query.city)
    // ... reste du code
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
```

### Sanitisation

```javascript
// Sanitisation des données
const sanitizeInput = (input) => {
  return input
    .replace(/[<>]/g, '') // Supprimer les balises HTML
    .trim()
    .substring(0, 100) // Limiter la longueur
}
```

## 🚀 Optimisation

### Cache

```javascript
// Cache simple en mémoire
const cache = new Map()

app.get('/api/weather', async (req, res) => {
  const city = req.query.city || 'Monastir'
  const cacheKey = `weather_${city}`
  
  // Vérifier le cache
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)
    if (Date.now() - cached.timestamp < 5 * 60 * 1000) { // 5 minutes
      return res.json(cached.data)
    }
  }
  
  // Récupérer les données
  const data = await fetchWeatherData(city)
  
  // Mettre en cache
  cache.set(cacheKey, {
    data,
    timestamp: Date.now()
  })
  
  res.json(data)
})
```

### Compression

```javascript
const compression = require('compression')

app.use(compression())
```

## 📝 Documentation des Erreurs

### Codes d'Erreur

| Code | Description |
|------|-------------|
| 400 | Paramètres manquants ou invalides |
| 401 | Clé API manquante ou invalide |
| 429 | Limite de taux dépassée |
| 500 | Erreur interne du serveur |
| 503 | Service temporairement indisponible |

### Messages d'Erreur

```json
{
  "error": "Bad Request",
  "message": "City parameter is required",
  "code": 400,
  "timestamp": "2024-01-01T10:00:00Z"
}
```

---

*Pour plus d'informations sur l'utilisation des APIs, consultez le [Guide des Hooks](./hooks.md)* 