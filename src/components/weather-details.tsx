"use client";
import { Droplets, Wind, Eye, Thermometer, Gauge } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWeather } from "@/hooks/useWeather"
import { useEffect,useRef } from "react"
import { useWeatherContext } from "@/components/WeatherContext"



export function WeatherDetails() {
  const { data: weather, loading, error, refetch } = useWeather('Monastir');
  const { setRefetchers } = useWeatherContext();
  const refetchRef = useRef(refetch);

  useEffect(() => {
    refetchRef.current = refetch;
  }, [refetch]);

  useEffect(() => {
    setRefetchers(() => refetchRef.current);
  }, [setRefetchers]);
  if (loading) return <div>Chargement météo...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!weather) return null;
  

  const details = [
    {
      icon: Thermometer,
      label: "Ressenti",
      value: `${weather.feelsLike}°C`,
      color: "text-orange-600",
    },
    {
      icon: Droplets,
      label: "Humidité",
      value: `${weather.humidity}%`,
      color: "text-blue-600",
    },
    {
      icon: Wind,
      label: "Vent",
      value: `${weather.windSpeed} km/h`,
      color: "text-green-600",
    },
    {
      icon: Eye,
      label: "Visibilité",
      value: `${weather.visibility} km`,
      color: "text-purple-600",
    },
    {
      icon: Gauge,
      label: "Pression",
      value: `${weather.pressure} hPa`,
      color: "text-red-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">🌡️ Détails Météorologiques</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
          <p className="text-sm text-slate-600 dark:text-slate-400">{weather.city
            }</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{weather.temperature}°C</p>
          <Badge variant="secondary" className="mt-2">
            {weather.condition}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {details.map((detail, index) => {
            const Icon = detail.icon
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${detail.color}`} />
                  <span className="text-sm font-medium">{detail.label}</span>
                </div>
                <span className="text-sm font-semibold">{detail.value}</span>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-xs text-slate-600 dark:text-slate-400">Lever du soleil</p>
            <p className="font-semibold">🌅 {weather.sunrise}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-600 dark:text-slate-400">Coucher du soleil</p>
            <p className="font-semibold">🌇 {weather.sunset}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
