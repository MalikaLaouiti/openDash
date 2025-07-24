"use client";
import { MapPin, Navigation } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useIpInfo } from "@/hooks/useIpInfo"; 
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"



export function MapCard() {
  
  const { data: location,loading, error, refetch  } = useIpInfo();
  if (loading) return <div>Chargement données de localisation...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!location) return null;
  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 border-green-200 dark:border-green-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
          <MapPin className="h-5 w-5" />
          Géolocalisation
          <Button onClick={refetch} size="sm" variant="ghost">
            <RefreshCw className="h-4 w-4 " />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
            <p className="text-2xl font-bold text-green-900 dark:text-green-100">{location.city}</p>
            <p className="text-sm text-green-700 dark:text-green-300">{location.country}</p>
            <Badge variant="secondary" className="mt-2">
              {location.region}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm ">
            <div className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-green-600" />
              <div >
                <p className="font-medium">Latitude</p>
                <p className="text-green-800 dark:text-green-200 ">{location.latitude.toFixed(3)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-green-600" />
              <div >
                <p className="font-medium">Longitude</p>
                <p className="text-green-800 dark:text-green-200">{location.longitude.toFixed(3)}</p>
              </div>
            </div>
          </div>

          <div className="text-center text-s text-green-700 dark:text-green-300">
            Fuseau horaire: {new Date(location.timezone?.current_time).toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
