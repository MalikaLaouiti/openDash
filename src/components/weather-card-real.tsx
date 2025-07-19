"use client"

import { Cloud, Sun, CloudRain, Droplets, Wind, Eye, Gauge, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useWeather } from '@/hooks/useWeather';


interface WeatherWidgetProps {
  city?: string;
}

export function WeatherCardReal({ city = 'Monastir' }: WeatherWidgetProps) {
  const { data: weather, loading, error, refetch } = useWeather(city);

  if (loading) return <div>Chargement météo...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!weather) return null;


  const getWeatherIcon = (condition: string, iconCode: string) => {
    if (iconCode.includes("01")) return <Sun className="h-8 w-8 text-yellow-500" />
    if (iconCode.includes("02") || iconCode.includes("03") || iconCode.includes("04"))
      return <Cloud className="h-8 w-8 text-gray-500" />
    if (iconCode.includes("09") || iconCode.includes("10") || iconCode.includes("11"))
      return <CloudRain className="h-8 w-8 text-blue-500" />
    return <Sun className="h-8 w-8 text-yellow-500" />
  }

  

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-blue-900 dark:text-blue-100">🌤️ Météo en Temps Réel</span>
          <div className="flex items-center gap-2">
            {getWeatherIcon(weather.condition, weather.icon)}
            <Button onClick={refetch} size="sm" variant="ghost">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {weather.city}, {weather.country}
            </p>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{weather.temperature}°C</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Ressenti {weather.feelsLike}°C</p>
            <Badge variant="secondary" className="mt-1 capitalize">
              {weather.condition}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-600" />
              <span className="text-blue-800 dark:text-blue-200">{weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-blue-600" />
              <span className="text-blue-800 dark:text-blue-200">{weather.windSpeed} km/h</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-600" />
              <span className="text-blue-800 dark:text-blue-200">{weather.visibility} km</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-blue-600" />
              <span className="text-blue-800 dark:text-blue-200">{weather.pressure} hPa</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-200 dark:border-blue-700">
            <div className="text-center">
              <p className="text-xs text-blue-600 dark:text-blue-400">Lever</p>
              <p className="font-semibold text-blue-900 dark:text-blue-100">🌅 {weather.sunrise}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-blue-600 dark:text-blue-400">Coucher</p>
              <p className="font-semibold text-blue-900 dark:text-blue-100">🌇 {weather.sunset}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
