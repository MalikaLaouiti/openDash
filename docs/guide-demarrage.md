# 🚀 Guide de Démarrage

Ce guide vous accompagnera dans l'installation et la configuration d'Open-Dash sur votre machine locale.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure)
- **npm** ou **yarn** ou **pnpm**
- **Git**

### Vérification des prérequis

```bash
# Vérifier Node.js
node --version

# Vérifier npm
npm --version

# Vérifier Git
git --version
```

## 🔧 Installation

### 1. Cloner le Repository

```bash
git clone [URL_DU_REPO]
cd open-dash
```

### 2. Installer les Dépendances

```bash
npm install
```

### 3. Configuration des Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# APIs Météo
OPENWEATHERMAP_API_KEY=votre_clé_api_openweathermap

# Géolocalisation
LOCATIONIQ_KEY=votre_clé_api_locationiq

# Autres APIs (optionnel)
GITHUB_TOKEN=votre_token_github
COINGECKO_API_KEY=votre_clé_api_coingecko
```

#### Obtenir les Clés API

**OpenWeatherMap :**
1. Rendez-vous sur [OpenWeatherMap](https://openweathermap.org/api)
2. Créez un compte gratuit
3. Obtenez votre clé API dans votre dashboard

**LocationIQ :**
1. Rendez-vous sur [LocationIQ](https://locationiq.com/)
2. Créez un compte gratuit
3. Obtenez votre clé API

### 4. Lancer le Serveur de Développement

```bash
npm run dev
```

L'application sera accessible à l'adresse : [http://localhost:3000](http://localhost:3000)

## 🛠️ Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile l'application pour la production |
| `npm run start` | Lance le serveur de production |
| `npm run lint` | Vérifie le code avec ESLint |

## 🔍 Vérification de l'Installation

Après l'installation, vous devriez pouvoir :

1. **Accéder à la page d'accueil** : [http://localhost:3000](http://localhost:3000)
2. **Naviguer vers la section Géographie** : [http://localhost:3000/geography](http://localhost:3000/geography)
3. **Voir les données météo** en temps réel
4. **Interagir avec les cartes** interactives

## 🐛 Dépannage

### Problème : "Module not found"
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Problème : "API key not found"
- Vérifiez que votre fichier `.env.local` existe
- Vérifiez que les clés API sont correctement configurées
- Redémarrez le serveur de développement

### Problème : "Port already in use"
```bash
# Utiliser un autre port
npm run dev -- -p 3001
```

## 📱 Test sur Mobile

Pour tester l'application sur votre mobile :

1. Trouvez l'adresse IP de votre machine :
   ```bash
   # Sur Windows
   ipconfig
   
   # Sur Mac/Linux
   ifconfig
   ```

2. Accédez à `http://[VOTRE_IP]:3000` depuis votre mobile

## 🔄 Mise à Jour

Pour mettre à jour le projet :

```bash
# Récupérer les dernières modifications
git pull origin main

# Réinstaller les dépendances (si nécessaire)
npm install

# Redémarrer le serveur
npm run dev
```

## 📚 Prochaines Étapes

Maintenant que votre environnement est configuré :

1. Explorez la [Documentation des Composants](./composants.md)
2. Découvrez l'[Architecture du Projet](./architecture.md)
3. Consultez le [Guide des APIs](./apis.md)

---

*Besoin d'aide ? Consultez la section [Troubleshooting](../troubleshooting.md)* 