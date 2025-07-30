# 🚀 Guide de Déploiement

Salut ! 👋 Prêt à déployer Open-Dash ? Ce guide vous accompagne dans le déploiement sur différentes plateformes.

## 🎉 Site Déployé !

**Open-Dash est déjà en ligne !** 🌐

- **🌍 Site Principal** : [https://opendash.vercel.app](https://opendash.vercel.app)

Le site est déployé sur Vercel et fonctionne parfaitement ! Vous pouvez le visiter dès maintenant pour voir Open-Dash en action.

## 📋 Prérequis

Avant de déployer, assurez-vous que :

- ✅ Le projet fonctionne en local
- ✅ Toutes les variables d'environnement sont configurées
- ✅ Les tests passent (si disponibles)
- ✅ Le build de production fonctionne

## 🔧 Préparation au Déploiement

### 1. Build de Production

```bash
# Vérifier que le build fonctionne
npm run build

# Tester le serveur de production localement
npm run start
```

### 2. Variables d'Environnement

Créez un fichier `.env.production` avec vos clés API :

```env
# APIs Météo
OPENWEATHERMAP_API_KEY=votre_clé_api_openweathermap

# Géolocalisation
LOCATIONIQ_KEY=votre_clé_api_locationiq

# Autres APIs
GITHUB_TOKEN=votre_token_github
COINGECKO_API_KEY=votre_clé_api_coingecko

# Configuration
NODE_ENV=production
```

## 🌐 Déploiement sur Vercel (Recommandé)

Vercel est la plateforme recommandée pour les applications Next.js.

### 1. Installation de Vercel CLI

```bash
npm install -g vercel
```

### 2. Connexion à Vercel

```bash
vercel login
```

### 3. Déploiement

```bash
# Déploiement initial
vercel

# Déploiement en production
vercel --prod
```

### 4. Configuration Vercel

Créez un fichier `vercel.json` à la racine :

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/server.mjs",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/server.mjs"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 5. Variables d'Environnement sur Vercel

Dans le dashboard Vercel :

1. Allez dans votre projet
2. Onglet "Settings" → "Environment Variables"
3. Ajoutez vos variables d'environnement

### 6. Domaine Personnalisé (Optionnel)

```bash
# Ajouter un domaine personnalisé
vercel domains add opendash.com
```

## ☁️ Déploiement sur Netlify

### 1. Configuration Netlify

Créez un fichier `netlify.toml` :

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_ENV = "production"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Fonctions Serverless

Créez `netlify/functions/api.js` :

```javascript
const { handler } = require('../../server/server.mjs')

exports.handler = async (event, context) => {
  return handler(event, context)
}
```

### 3. Déploiement

```bash
# Installation de Netlify CLI
npm install -g netlify-cli

# Déploiement
netlify deploy --prod
```

## 🐳 Déploiement avec Docker

### 1. Dockerfile

Créez un `Dockerfile` :

```dockerfile
# Image de base
FROM node:18-alpine AS base

# Dépendances
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### 2. Docker Compose

Créez `docker-compose.yml` :

```yaml
version: '3.8'

services:
  opendash:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - OPENWEATHERMAP_API_KEY=${OPENWEATHERMAP_API_KEY}
      - LOCATIONIQ_KEY=${LOCATIONIQ_KEY}
    restart: unless-stopped
```

### 3. Build et Déploiement

```bash
# Build de l'image
docker build -t opendash .

# Lancement avec Docker Compose
docker-compose up -d
```

## 🚀 Déploiement sur AWS

### 1. AWS Elastic Beanstalk

Créez un fichier `.ebextensions/nodecommand.config` :

```yaml
option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeCommand: "npm start"
  aws:elasticbeanstalk:application:environment:
    NODE_ENV: production
```

### 2. Déploiement

```bash
# Installation d'EB CLI
pip install awsebcli

# Initialisation
eb init

# Création de l'environnement
eb create opendash-production

# Déploiement
eb deploy
```

## 🔧 Déploiement sur Heroku

### 1. Configuration Heroku

Créez un `Procfile` :

```
web: npm start
```

### 2. Déploiement

```bash
# Installation de Heroku CLI
npm install -g heroku

# Connexion
heroku login

# Création de l'app
heroku create opendash-app

# Configuration des variables d'environnement
heroku config:set NODE_ENV=production
heroku config:set OPENWEATHERMAP_API_KEY=votre_clé
heroku config:set LOCATIONIQ_KEY=votre_clé

# Déploiement
git push heroku main
```

## 📱 Déploiement Mobile (PWA)

### 1. Configuration PWA

Créez `public/manifest.json` :

```json
{
  "name": "Open-Dash",
  "short_name": "OpenDash",
  "description": "Tableau de bord de données en temps réel",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. Service Worker

Créez `public/sw.js` :

```javascript
const CACHE_NAME = 'opendash-v1'
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  )
})
```

## 🔍 Monitoring et Logs

### 1. Logs d'Application

```javascript
// Configuration des logs
const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}
```

### 2. Métriques de Performance

```javascript
// Middleware de métriques
app.use((req, res, next) => {
  const start = Date.now()
  
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration,
      timestamp: new Date().toISOString()
    })
  })
  
  next()
})
```

## 🔐 Sécurité en Production

### 1. Headers de Sécurité

```javascript
const helmet = require('helmet')

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}))
```

### 2. Rate Limiting

```javascript
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite à 100 requêtes par fenêtre
  message: 'Too many requests from this IP'
})

app.use('/api/', limiter)
```

### 3. Validation des Entrées

```javascript
const { body, validationResult } = require('express-validator')

app.post('/api/data', [
  body('city').isString().trim().isLength({ min: 1, max: 100 }),
  body('temperature').isNumeric()
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  // Traitement de la requête
})
```

## 🚨 Troubleshooting

### Problèmes Courants

#### 1. "Build failed"
```bash
# Vérifier les erreurs de build
npm run build

# Nettoyer le cache
rm -rf .next node_modules
npm install
```

#### 2. "Environment variables not found"
- Vérifiez que les variables sont configurées sur la plateforme
- Redéployez après avoir ajouté les variables

#### 3. "API calls failing"
- Vérifiez les clés API
- Testez les endpoints individuellement
- Vérifiez les limites de taux

#### 4. "Performance issues"
```bash
# Analyser le bundle
npm run build
npx @next/bundle-analyzer
```

## 📊 Monitoring Post-Déploiement

### 1. Vérification de Santé

```javascript
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  })
})
```

### 2. Métriques Clés

- **Temps de réponse** : < 2 secondes
- **Disponibilité** : > 99.9%
- **Taux d'erreur** : < 1%
- **Utilisation CPU** : < 80%
- **Utilisation mémoire** : < 80%

### 3. Alertes

Configurez des alertes pour :
- Temps de réponse élevé
- Taux d'erreur élevé
- Utilisation des ressources
- Disponibilité du service

---

*Pour plus d'informations sur la configuration, consultez le [Guide de Démarrage](./guide-demarrage.md)* 