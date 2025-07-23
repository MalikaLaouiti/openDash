"use client";

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useIpInfo } from "@/hooks/useIpInfo"
import { useLocation } from "@/hooks/useLocation"
import Image from 'next/image'

// Fix pour les icônes Leaflet par défaut
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
    const { data: ipData } = useIpInfo()
    const { data: location, error, loading } = useLocation(ipData?.latitude, ipData?.longitude)
    

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current || !location) return

        const mapCenter = {
            lat: parseFloat(location.lat),
            lon: parseFloat(location.lon),
        }

        const map = L.map(mapRef.current).setView([mapCenter.lat, mapCenter.lon], zoom)
        mapInstanceRef.current = map

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(map)

        const marker = L.marker([mapCenter.lat, mapCenter.lon]).addTo(map)

        const popupContent = `
      <strong>${location.display_name}</strong>
      <p class="text-xs text-gray-500">Lat: ${mapCenter.lat.toFixed(4)}, Lon: ${mapCenter.lon.toFixed(4)}</p>
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

    const lat = parseFloat(location.lat)
    const lon = parseFloat(location.lon)

    return (
        <Card className="h-full">
            <CardHeader className=" gap-4 items-center">
                <CardTitle className=" flex items-center gap-4">🗺️ Votre position sur la carte</CardTitle>
            </CardHeader>
            <CardContent>
                <div
                    ref={mapRef}
                    style={{ height }}
                    className="w-full rounded-lg border border-gray-200 overflow-hidden"
                />
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <h4 className="font-semibold text-blue-900">📍 {location.display_name}</h4>
                    </div>
                    <div className="text-center text-sm text-blue-600 ">
                        <div className="font-mono">Lat: {lat.toFixed(4)}</div>
                        <div className="font-mono">Lon: {lon.toFixed(4)}</div>
                        <Image
                            src={location.icon ?? "/location.png"}
                            alt="Location icon"
                            width={16}  // or 20, matching your design
                            height={16}
                            className="inline-block mr-2"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
