"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useIpInfo } from "@/hooks/useIpInfo"

// Fix for default markers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

interface InteractiveMapCardProps {
  zoom?: number
  height?: string
}

export default function InteractiveMapCard({
  zoom = 13,
  height = "400px",
}: InteractiveMapCardProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const { data: location, loading, error } = useIpInfo()

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current || !location) return

    const mapCenter = {
      lat: location.lat,
      lon: location.lon,
    }

    const map = L.map(mapRef.current).setView([mapCenter.lat, mapCenter.lon], zoom)
    mapInstanceRef.current = map

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map)

    const marker = L.marker([location.lat, location.lon]).addTo(map)

    const popupContent = `
      ${location.title ? `<h3 class="font-semibold text-sm mb-1">${location.title}</h3>` : ""}
      ${location.description ? `<p class="text-xs text-gray-600">${location.description}</p>` : ""}
      <p class="text-xs text-gray-500 mt-1">Lat: ${location.lat.toFixed(4)}, Lon: ${location.lon.toFixed(4)}</p>
    `
    marker.bindPopup(popupContent)

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [location, zoom])

  if (loading) return <div>Chargement de la carte...</div>
  if (error) return <div>Erreur: {error}</div>
  if (!location) return null

  return (
    <Card className="h-full">
      <CardHeader className="grid grid-cols-3 gap-4 items-center">
        <CardTitle className="lg:col-span-2 flex items-center gap-4">🗺️ Votre position sur la carte</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={mapRef}
          style={{ height }}
          className="w-full rounded-lg border border-gray-200 overflow-hidden"
        />
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-blue-900">{location.title ?? "Position détectée"}</h4>
              {location.description && (
                <p className="text-sm text-blue-700 mt-1">{location.description}</p>
              )}
            </div>
            <div className="text-right text-sm text-blue-600">
              <div className="font-mono">Lat: {location.lat.toFixed(4)}</div>
              <div className="font-mono">Lon: {location.lon.toFixed(4)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
