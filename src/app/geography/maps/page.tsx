"use client";
import { useIpInfo } from "@/hooks/useIpInfo"
import { useLocation } from "@/hooks/useLocation"
import { DetailHeader } from "@/components/detail-header"
import { Suspense } from "react"
import { LocationDetails } from "@/components/location-details"
import dynamic from "next/dynamic";
import { JsonViewer } from "@/components/json-viewer";


const InteractiveMapCard = dynamic(() => import('@/components/interactive-map-card'), {
  ssr: false,
});

export default function Page() {
  const { data: ipData } = useIpInfo()
  const { data: location } = useLocation(ipData?.latitude, ipData?.longitude)

  return (
      <div className="container mx-auto px-6 py-8">
        <DetailHeader
          title="Cartes & Géolocalisation"
          description="Visualisation des données de géolocalisation"
          backHref="/geography"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 items-stretch">
          <div className="lg:col-span-2 ">
            <Suspense fallback={<div>Chargement de la carte...</div>}>
              <InteractiveMapCard />
            </Suspense>
          </div>

          <div className="space-y-6 ">
            <Suspense fallback={<div>Chargement des détails...</div>}>
              <LocationDetails />
            </Suspense>
          </div>
        </div>

        <div className="mt-8">
          <Suspense fallback={<div>Chargement des données...</div>}>
            <JsonViewer
              data={location}
              title=" 📍 Détails de la localisation"
              apiUrl="/api/locationiq"
            />
          </Suspense>
        </div>
        <div className="mt-8">
          <Suspense fallback={<div>Chargement des données météo...</div>}>
            <JsonViewer
              data={ipData}
              title="🌍 Infos IP"
              apiUrl="/api/ipwhois"
            />
          </Suspense>
        </div>
      </div>
  )
}
