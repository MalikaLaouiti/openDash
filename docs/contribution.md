# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à Open-Dash ! Ce guide vous accompagne dans le processus de contribution.

## 📋 Comment Contribuer

### Types de Contributions

Nous acceptons différents types de contributions :

- 🐛 **Rapports de bugs** : Signaler des problèmes
- 💡 **Suggestions de fonctionnalités** : Proposer de nouvelles idées
- 📝 **Documentation** : Améliorer la documentation
- 🔧 **Corrections** : Corriger des bugs
- ✨ **Nouvelles fonctionnalités** : Ajouter des fonctionnalités
- 🎨 **Améliorations UI/UX** : Améliorer l'interface

## 🚀 Démarrage Rapide

### 1. Fork et Clone

```bash
# Fork le repository sur GitHub
# Puis clonez votre fork
git clone https://github.com/votre-username/open-dash.git
cd open-dash

# Ajoutez le repository original comme upstream
git remote add upstream https://github.com/original-owner/open-dash.git
```

### 2. Installation

```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
```

### 3. Créer une Branche

```bash
# Créer une nouvelle branche pour votre contribution
git checkout -b feature/nom-de-votre-fonctionnalite

# Ou pour un bug fix
git checkout -b fix/nom-du-bug
```

## 📝 Processus de Contribution

### 1. Développement

```bash
# Lancer le serveur de développement
npm run dev

# Vérifier le code avec ESLint
npm run lint

# Tester votre code
npm test  # si des tests existent
```

### 2. Commit

```bash
# Ajouter vos modifications
git add .

# Créer un commit avec un message descriptif
git commit -m "feat: ajouter nouvelle fonctionnalité météo

- Ajout de la carte météo interactive
- Intégration avec OpenWeatherMap API
- Support du thème sombre

Closes #123"
```

### 3. Push et Pull Request

```bash
# Pousser votre branche
git push origin feature/nom-de-votre-fonctionnalite

# Créer une Pull Request sur GitHub
```

## 📋 Standards de Code

### 1. Convention de Nommage

```typescript
// ✅ Bon
const useWeatherData = () => { ... }
const WeatherCard = () => { ... }
const API_ENDPOINTS = { ... }

// ❌ Éviter
const useData = () => { ... }
const weatherCard = () => { ... }
const apiEndpoints = { ... }
```

### 2. Structure des Fichiers

```
src/
├── components/
│   ├── ui/           # Composants UI réutilisables
│   └── feature/      # Composants spécifiques aux fonctionnalités
├── hooks/            # Hooks personnalisés
├── lib/              # Utilitaires et configuration
└── types/            # Types TypeScript
```

### 3. Formatage

```bash
# Utiliser Prettier pour le formatage
npx prettier --write .

# Vérifier avec ESLint
npm run lint
```

## 🎯 Types de Contributions

### 🐛 Rapport de Bug

Utilisez le template de bug report :

```markdown
## Description du Bug

Description claire et concise du bug.

## Étapes pour Reproduire

1. Aller à '...'
2. Cliquer sur '...'
3. Faire défiler jusqu'à '...'
4. Voir l'erreur

## Comportement Attendu

Description de ce qui devrait se passer.

## Comportement Actuel

Description de ce qui se passe actuellement.

## Captures d'Écran

Si applicable, ajoutez des captures d'écran.

## Environnement

- OS: [ex: Windows 10]
- Navigateur: [ex: Chrome, Safari]
- Version: [ex: 22]

## Informations Supplémentaires

Toute autre information pertinente.
```

### 💡 Suggestion de Fonctionnalité

```markdown
## Problème à Résoudre

Description claire du problème que cette fonctionnalité résoudrait.

## Solution Proposée

Description de la solution que vous proposez.

## Alternatives Considérées

Autres solutions que vous avez considérées.

## Informations Supplémentaires

Captures d'écran, maquettes, etc.
```

### 🔧 Pull Request

Template pour les Pull Requests :

```markdown
## Description

Description claire et concise des changements.

## Type de Changement

- [ ] Bug fix (changement non-breaking qui corrige un problème)
- [ ] Nouvelle fonctionnalité (changement non-breaking qui ajoute une fonctionnalité)
- [ ] Breaking change (correction ou fonctionnalité qui cause un changement incompatible)
- [ ] Documentation

## Tests

- [ ] J'ai testé mes changements localement
- [ ] J'ai ajouté des tests pour mes changements
- [ ] Tous les tests passent

## Checklist

- [ ] Mon code suit les standards de style du projet
- [ ] J'ai effectué un auto-review de mon code
- [ ] J'ai commenté mon code, particulièrement dans les zones difficiles à comprendre
- [ ] J'ai apporté les changements correspondants à la documentation
- [ ] Mes changements ne génèrent pas de nouveaux warnings
- [ ] J'ai ajouté des tests qui prouvent que ma correction fonctionne
- [ ] Les tests unitaires et d'intégration passent avec mes changements
- [ ] Toute dépendance changeante a été mise à jour

## Captures d'Écran

Si applicable, ajoutez des captures d'écran.

## Informations Supplémentaires

Toute autre information pertinente.
```

## 🧪 Tests

### Tests Unitaires

```typescript
// Exemple de test pour un hook
import { renderHook, act } from '@testing-library/react'
import { useWeather } from '@/hooks/useWeather'

describe('useWeather', () => {
  it('should fetch weather data', async () => {
    const { result } = renderHook(() => useWeather('Paris'))

    expect(result.current.loading).toBe(true)

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.weather).toBeDefined()
  })
})
```

### Tests d'Intégration

```typescript
// Exemple de test pour un composant
import { render, screen } from '@testing-library/react'
import { WeatherCard } from '@/components/weather-card'

describe('WeatherCard', () => {
  it('should display weather information', () => {
    const mockWeather = {
      city: 'Paris',
      temperature: 25,
      description: 'Ensoleillé'
    }

    render(<WeatherCard weather={mockWeather} />)

    expect(screen.getByText('Paris')).toBeInTheDocument()
    expect(screen.getByText('25°C')).toBeInTheDocument()
    expect(screen.getByText('Ensoleillé')).toBeInTheDocument()
  })
})
```

## 📚 Documentation

### Mise à Jour de la Documentation

Quand vous ajoutez une nouvelle fonctionnalité :

1. **Mettez à jour le README** si nécessaire
2. **Ajoutez des commentaires** dans le code
3. **Documentez les APIs** nouvelles ou modifiées
4. **Mettez à jour les guides** concernés

### Exemple de Documentation

```typescript
/**
 * Hook personnalisé pour récupérer les données météo
 * 
 * @param city - Nom de la ville (optionnel, défaut: "Monastir")
 * @returns Objet contenant les données météo, l'état de chargement et les erreurs
 * 
 * @example
 * ```tsx
 * const { weather, loading, error } = useWeather("Paris")
 * 
 * if (loading) return <div>Chargement...</div>
 * if (error) return <div>Erreur: {error}</div>
 * 
 * return <div>Température: {weather.temperature}°C</div>
 * ```
 */
export const useWeather = (city?: string) => {
  // Implémentation...
}
```

## 🔍 Review Process

### Auto-Review

Avant de soumettre votre PR, vérifiez :

- [ ] Le code fonctionne comme attendu
- [ ] Les tests passent
- [ ] Le code suit les conventions
- [ ] La documentation est à jour
- [ ] Pas de code mort ou de console.log
- [ ] Les variables d'environnement sont gérées

### Checklist de Review

```markdown
## Review Checklist

### Code
- [ ] Le code est lisible et bien structuré
- [ ] Les noms de variables/fonctions sont explicites
- [ ] Pas de duplication de code
- [ ] Gestion d'erreurs appropriée
- [ ] Performance acceptable

### Tests
- [ ] Tests unitaires ajoutés
- [ ] Tests d'intégration si nécessaire
- [ ] Tous les tests passent
- [ ] Couverture de code suffisante

### Documentation
- [ ] README mis à jour si nécessaire
- [ ] Commentaires dans le code
- [ ] Documentation des APIs
- [ ] Exemples d'utilisation

### Sécurité
- [ ] Pas de vulnérabilités de sécurité
- [ ] Validation des entrées
- [ ] Gestion sécurisée des clés API
```

## 🏷️ Labels et Milestones

### Labels Utilisés

- `bug` : Problème à corriger
- `enhancement` : Amélioration de fonctionnalité
- `feature` : Nouvelle fonctionnalité
- `documentation` : Amélioration de la documentation
- `good first issue` : Bon pour les débutants
- `help wanted` : Besoin d'aide
- `priority: high` : Priorité élevée
- `priority: low` : Priorité faible

### Milestones

- `v1.0.0` : Version stable initiale
- `v1.1.0` : Nouvelles fonctionnalités
- `v1.0.1` : Corrections de bugs

## 🎉 Reconnaissance

### Hall of Fame

Les contributeurs seront ajoutés au fichier `CONTRIBUTORS.md` :

```markdown
# Contributeurs

Merci à tous ceux qui ont contribué à Open-Dash !

## Contributeurs Actifs

- [@votre-username](https://github.com/votre-username) - Fonctionnalité météo
- [@autre-contributeur](https://github.com/autre-contributeur) - Corrections de bugs

## Comment Contribuer

Voir le [Guide de Contribution](./docs/contribution.md) pour plus d'informations.
```

## 📞 Support

### Questions et Discussions

- **Issues GitHub** : Pour les bugs et suggestions
- **Discussions GitHub** : Pour les questions générales
- **Email** : [votre-email@example.com]

### Ressources Utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation React](https://react.dev)
- [Documentation TypeScript](https://www.typescriptlang.org/docs)
- [Guide Tailwind CSS](https://tailwindcss.com/docs)

## 🚀 Prochaines Étapes

Après avoir contribué :

1. **Attendez la review** de votre PR
2. **Répondez aux commentaires** rapidement
3. **Faites les modifications** demandées
4. **Célébrez** quand votre PR est mergée ! 🎉

---

*Merci de contribuer à Open-Dash ! Votre aide est précieuse pour faire de ce projet quelque chose d'extraordinaire.* 