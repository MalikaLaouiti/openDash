import { Suspense } from "react"
import { WeatherChart } from "@/components/weather-chart"
import { WeatherDetails } from "@/components/weather-details"
import { RefreshButton } from "@/components/refresh-button"
// import { JsonViewer } from "@/components/json-viewer"
// import { DetailHeader } from "@/components/detail-header"
import { WeatherProvider } from "@/components/WeatherContext"

export default function WeatherDetailPage() {
  return (
    <WeatherProvider>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6 py-8">
        {/* <DetailHeader
          title="🌤️ Météo Détaillée"
          description="Analyse complète des conditions météorologiques"
          backHref="/geography"
        /> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <Suspense fallback={<div>Chargement du graphique...</div>}>
              <WeatherChart />
            </Suspense>
          </div>

          <div className="space-y-6">
            <Suspense fallback={<div>Chargement des détails...</div>}>
              <WeatherDetails />
            </Suspense>

            <RefreshButton />
          </div>
        </div>

        <div className="mt-8">
          <Suspense fallback={<div>Chargement des données...</div>}>
            {/* <JsonViewer endpoint="/api/weather" title="Données JSON Brutes" /> */}
          </Suspense>
        </div>
      </div>
    </div>
    </WeatherProvider>
  )
}
