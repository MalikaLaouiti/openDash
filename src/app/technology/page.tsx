import { Suspense } from "react"
import { NpmCardGeneral } from "@/components/general-npm-card"
 import { GitHubInfoCard } from "@/components/general-github-card"
// import { LocationCard } from "@/components/location-card"
import { ApiGrid } from "@/components/api-grid"


export default function GeographyPage() {
  const apis = [
    {
        id: "npm",
        title: "npm Registry API",
        description: "Accès aux métadonnées des packages JavaScript et Node.js via registry.npmjs.org",
        lastUpdate: "Il y a 5 min",
        status: "active" as const,
        href: "/technology/npm",
    },
    {
        id: "github",
        title: "GitHub REST API",
        description: "Gestion des dépôts, issues, pull requests et données GitHub",
        lastUpdate: "Il y a 10 min",
        status: "active" as const,
        href: "/technology/github",
    },
    {
        id: "stackoverflow",
        title: "Stack Overflow API",
        description: "Recherche et récupération de questions, réponses et tags sur Stack Overflow",
        lastUpdate: "Il y a 15 min",
        status: "active" as const,
        href: "/technology/stackoverflow",
    },
  ]

  return (
    <div>
        <div className="container mx-auto px-6 py-8">
            <div className="text-center py-8">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">🛠 Technologie</h1>
                <div className={`w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mb-6 rounded-full`} />
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Explorez les données et services technologiques en temps réel</p>
            </div>
        <ApiGrid apis={apis} />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          <Suspense fallback={<div>Chargement package...</div>}>
            <NpmCardGeneral />
          </Suspense>

          <Suspense fallback={<div>Chargement GitHub organisation...</div>}>
            <GitHubInfoCard />
          </Suspense>

          <Suspense fallback={<div>Chargement localisation...</div>}>
            {/* <LocationCard /> */}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
