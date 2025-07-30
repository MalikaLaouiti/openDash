# 🔧 Guide de Dépannage

Ce guide vous aide à résoudre les problèmes courants rencontrés avec Open-Dash.

## 📋 Table des Matières

- [Problèmes d'Installation](#problèmes-dinstallation)
- [Problèmes de Développement](#problèmes-de-développement)
- [Problèmes d'APIs](#problèmes-dapis)
- [Problèmes de Performance](#problèmes-de-performance)
- [Problèmes de Déploiement](#problèmes-de-déploiement)
- [Problèmes de Navigateur](#problèmes-de-navigateur)

## 🚀 Problèmes d'Installation

### ❌ "Module not found"

**Symptômes :**
```
Error: Cannot find module 'react'
Error: Cannot find module '@next/font'
```

**Solutions :**

1. **Nettoyer et réinstaller :**
```bash
# Supprimer node_modules et package-lock.json
rm -rf node_modules package-lock.json

# Réinstaller les dépendances
npm install
```

2. **Vérifier la version de Node.js :**
```bash
node --version
# Doit être >= 18.0.0
```

3. **Vérifier le cache npm :**
```bash
npm cache clean --force
npm install
```

### ❌ "Port already in use"

**Symptômes :**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions :**

1. **Utiliser un autre port :**
```bash
npm run dev -- -p 3001
```

2. **Trouver et tuer le processus :**
```bash
# Sur Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Sur Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### ❌ "Permission denied"

**Symptômes :**
```
Error: EACCES: permission denied
```

**Solutions :**

1. **Utiliser sudo (Linux/Mac) :**
```bash
sudo npm install
```

2. **Changer les permissions :**
```bash
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
```

## 💻 Problèmes de Développement

### ❌ "Build failed"

**Symptômes :**
```
Error: Build failed
```

**Solutions :**

1. **Vérifier les erreurs TypeScript :**
```bash
npx tsc --noEmit
```

2. **Vérifier ESLint :**
```bash
npm run lint
```

3. **Nettoyer le cache Next.js :**
```bash
rm -rf .next
npm run build
```

### ❌ "Hot reload not working"

**Symptômes :**
Les changements ne se reflètent pas automatiquement.

**Solutions :**

1. **Vérifier le fichier de configuration :**
```javascript
// next.config.js
module.exports = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
}
```

2. **Redémarrer le serveur :**
```bash
npm run dev
```

### ❌ "TypeScript errors"

**Symptômes :**
```
Type 'X' is not assignable to type 'Y'
```

**Solutions :**

1. **Vérifier les types :**
```typescript
// Ajouter des types explicites
const data: WeatherData = await fetchWeather()
```

2. **Utiliser des assertions de type :**
```typescript
const result = data as WeatherData
```

3. **Mettre à jour les types :**
```typescript
// types/weather.ts
export interface WeatherData {
  temperature: number
  humidity: number
  description: string
}
```

## 🔌 Problèmes d'APIs

### ❌ "API key not found"

**Symptômes :**
```
Error: Missing API key
```

**Solutions :**

1. **Vérifier le fichier .env.local :**
```env
OPENWEATHERMAP_API_KEY=votre_clé_api
LOCATIONIQ_KEY=votre_clé_api
```

2. **Redémarrer le serveur :**
```bash
npm run dev
```

3. **Vérifier les variables d'environnement :**
```bash
# Vérifier que les variables sont chargées
console.log(process.env.OPENWEATHERMAP_API_KEY)
```

### ❌ "API rate limit exceeded"

**Symptômes :**
```
Error: 429 Too Many Requests
```

**Solutions :**

1. **Implémenter un cache :**
```javascript
const cache = new Map()

app.get('/api/weather', async (req, res) => {
  const city = req.query.city
  const cacheKey = `weather_${city}`
  
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)
    if (Date.now() - cached.timestamp < 5 * 60 * 1000) {
      return res.json(cached.data)
    }
  }
  
  // Appel API et mise en cache
})
```

2. **Utiliser des clés API alternatives :**
```javascript
const apiKeys = [
  process.env.OPENWEATHERMAP_API_KEY_1,
  process.env.OPENWEATHERMAP_API_KEY_2
]
const currentKey = apiKeys[Math.floor(Math.random() * apiKeys.length)]
```

### ❌ "CORS error"

**Symptômes :**
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**Solutions :**

1. **Configurer le proxy dans Next.js :**
```javascript
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ]
  },
}
```

2. **Utiliser le serveur Express comme proxy :**
```javascript
// server/server.mjs
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
```

### ❌ "Network error"

**Symptômes :**
```
Error: Network Error
Error: Failed to fetch
```

**Solutions :**

1. **Vérifier la connectivité :**
```bash
# Tester la connexion
curl https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=test
```

2. **Ajouter une gestion d'erreur :**
```javascript
try {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
} catch (error) {
  console.error('API Error:', error)
  // Gérer l'erreur gracieusement
}
```

## ⚡ Problèmes de Performance

### ❌ "Slow loading"

**Symptômes :**
L'application met du temps à charger.

**Solutions :**

1. **Optimiser les images :**
```javascript
import Image from 'next/image'

<Image
  src="/weather-icon.png"
  alt="Weather"
  width={64}
  height={64}
  priority
/>
```

2. **Implémenter le lazy loading :**
```javascript
import dynamic from 'next/dynamic'

const WeatherChart = dynamic(() => import('./WeatherChart'), {
  loading: () => <p>Chargement du graphique...</p>,
  ssr: false
})
```

3. **Optimiser les bundles :**
```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
  },
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
    }
    return config
  },
}
```

### ❌ "Memory leaks"

**Symptômes :**
L'application consomme de plus en plus de mémoire.

**Solutions :**

1. **Nettoyer les event listeners :**
```javascript
useEffect(() => {
  const handleResize = () => {
    // Logique de redimensionnement
  }
  
  window.addEventListener('resize', handleResize)
  
  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])
```

2. **Nettoyer les timers :**
```javascript
useEffect(() => {
  const interval = setInterval(() => {
    // Logique périodique
  }, 5000)
  
  return () => {
    clearInterval(interval)
  }
}, [])
```

## 🚀 Problèmes de Déploiement

### ❌ "Build fails on Vercel"

**Symptômes :**
```
Build failed on Vercel
```

**Solutions :**

1. **Vérifier les variables d'environnement :**
- Allez dans le dashboard Vercel
- Onglet Settings → Environment Variables
- Ajoutez toutes les variables nécessaires

2. **Vérifier la configuration :**
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "server/server.mjs",
      "use": "@vercel/node"
    }
  ]
}
```

3. **Vérifier les logs de build :**
```bash
vercel logs
```

### ❌ "Environment variables not working"

**Symptômes :**
Les variables d'environnement ne sont pas disponibles.

**Solutions :**

1. **Vérifier le nom des variables :**
```env
# ✅ Correct
OPENWEATHERMAP_API_KEY=xxx

# ❌ Incorrect
OPENWEATHERMAP_API_KEY = xxx
```

2. **Redéployer après modification :**
```bash
vercel --prod
```

3. **Vérifier dans le code :**
```javascript
console.log('API Key:', process.env.OPENWEATHERMAP_API_KEY)
```

## 🌐 Problèmes de Navigateur

### ❌ "Not supported in this browser"

**Symptômes :**
```
This browser doesn't support the required features
```

**Solutions :**

1. **Ajouter des polyfills :**
```bash
npm install core-js regenerator-runtime
```

2. **Vérifier la compatibilité :**
```javascript
// .browserslistrc
> 1%
last 2 versions
not dead
```

### ❌ "Geolocation not working"

**Symptômes :**
```
Geolocation is not supported
```

**Solutions :**

1. **Vérifier les permissions :**
```javascript
if ('geolocation' in navigator) {
  navigator.permissions.query({ name: 'geolocation' })
    .then(result => {
      if (result.state === 'granted') {
        // Géolocalisation autorisée
      }
    })
}
```

2. **Gérer les erreurs :**
```javascript
navigator.geolocation.getCurrentPosition(
  (position) => {
    // Succès
  },
  (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log('Permission refusée')
        break
      case error.POSITION_UNAVAILABLE:
        console.log('Position non disponible')
        break
      case error.TIMEOUT:
        console.log('Timeout')
        break
    }
  }
)
```

### ❌ "LocalStorage not working"

**Symptômes :**
```
localStorage is not defined
```

**Solutions :**

1. **Vérifier la disponibilité :**
```javascript
const isLocalStorageAvailable = () => {
  try {
    const test = 'test'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}
```

2. **Utiliser un fallback :**
```javascript
const storage = {
  get: (key) => {
    try {
      return localStorage.getItem(key)
    } catch (e) {
      return null
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, value)
    } catch (e) {
      console.warn('localStorage not available')
    }
  }
}
```

## 🔍 Debugging

### Outils de Debug

1. **React Developer Tools :**
- Extension navigateur pour inspecter les composants
- Profiler pour analyser les performances

2. **Next.js Debug :**
```bash
DEBUG=* npm run dev
```

3. **Node.js Debug :**
```bash
node --inspect server/server.mjs
```

### Logs Utiles

```javascript
// Logs structurés
console.log('[Weather API]', {
  city: 'Paris',
  temperature: 25,
  timestamp: new Date().toISOString()
})

// Logs d'erreur
console.error('[API Error]', {
  endpoint: '/api/weather',
  error: error.message,
  stack: error.stack
})
```

## 📞 Support

### Quand Demander de l'Aide

- ✅ Vous avez essayé toutes les solutions ci-dessus
- ✅ Vous avez vérifié la documentation
- ✅ Vous avez cherché dans les issues existantes

### Comment Demander de l'Aide

1. **Créer une issue GitHub :**
- Titre descriptif
- Description détaillée du problème
- Étapes pour reproduire
- Informations sur l'environnement

2. **Fournir les informations :**
```markdown
## Environnement
- OS: Windows 10
- Node.js: 18.0.0
- npm: 9.0.0
- Navigateur: Chrome 120

## Erreur
```
Error: Cannot find module 'react'
```

## Étapes pour Reproduire
1. npm install
2. npm run dev
3. Erreur au démarrage
```

### Ressources Utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation React](https://react.dev)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)
- [GitHub Issues](https://github.com/votre-repo/open-dash/issues)

---

*Si vous ne trouvez pas la solution ici, n'hésitez pas à ouvrir une issue sur GitHub !* 