"use client";
import { Suspense } from "react"
import { WeatherChart } from "@/components/weather-chart"
import { WeatherDetails } from "@/components/weather-details"
import { JsonViewer } from "@/components/json-viewer"
import { DetailHeader } from "@/components/detail-header"
import { WeatherProvider } from "@/components/WeatherContext"
import { useOpenMeteo } from "@/hooks/useOpenMeteo";
import { useWeather } from "@/hooks/useWeather";

export default function WeatherDetailPage() {
  const { data: weather } = useOpenMeteo(35.78, 10.83); 
  const { data: weatherData } = useWeather('Monastir'); 
  return (
    <WeatherProvider>
      <div className="container mx-auto px-6 py-8">
        <DetailHeader
          title="🌤️ Météo Détaillée"
          description="Analyse complète des conditions météorologiques"
          backHref="/geography"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 items-stretch">
          <div className="lg:col-span-2 ">
            <Suspense fallback={<div>Chargement du graphique...</div>}>
              <WeatherChart />
            </Suspense>
          </div>

          <div className="space-y-6 ">
            <Suspense fallback={<div>Chargement des détails...</div>}>
              <WeatherDetails />
            </Suspense>
          </div>
        </div>

        <div className="mt-8">
          <Suspense fallback={<div>Chargement des données...</div>}>
            <JsonViewer
              data={weatherData}
              title="📍 Conditions Actuelles"
              apiUrl="/api/weather"
            />
          </Suspense>
        </div>
        <div className="mt-8">
          <Suspense fallback={<div>Chargement des données météo...</div>}>
            <JsonViewer
              data={weather}
              title="📈 Prévisions"
              apiUrl="/api/open-meteo"
            />
          </Suspense>
        </div>
      </div>
    </WeatherProvider>
  )
}
