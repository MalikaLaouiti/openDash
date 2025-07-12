import { Suspense } from "react"
import { WeatherCardReal } from "@/components/weather-card-real"
import { MapCard } from "@/components/map-card"
import { LocationCard } from "@/components/location-card"
// import { PageHeader } from "@/components/page-header"
import { ApiGrid } from "@/components/api-grid"
import { DashboardHeader } from "@/components/dashboard-header"

export default function GeographyPage() {
  const apis = [
    {
      id: "weather",
      title: "Météo OpenWeatherMap",
      description: "Données météorologiques en temps réel via OpenWeatherMap API",
      lastUpdate: "Il y a 2 min",
      status: "active" as const,
      href: "/geography/weather",
    },
    {
      id: "maps",
      title: "Cartes & Géolocalisation",
      description: "Services de cartographie et données de localisation",
      lastUpdate: "Il y a 1 min",
      status: "active" as const,
      href: "/geography/maps",
    },
    {
      id: "location",
      title: "Informations Géographiques",
      description: "Données détaillées sur les emplacements et régions",
      lastUpdate: "Il y a 3 min",
      status: "active" as const,
      href: "/geography/location",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800">
        <DashboardHeader/>
        <div className="container mx-auto px-6 py-8">
            <div className="text-center py-8">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">🌍 Géographie</h1>
                <div className={`w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mb-6 rounded-full`} />
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Explorez les données météorologiques, cartographiques et géographiques en temps réel</p>
            </div>
        <ApiGrid apis={apis} />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          <Suspense fallback={<div>Chargement météo...</div>}>
            <WeatherCardReal />
          </Suspense>

          <Suspense fallback={<div>Chargement cartes...</div>}>
            <MapCard />
          </Suspense>

          <Suspense fallback={<div>Chargement localisation...</div>}>
            <LocationCard />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
