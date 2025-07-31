"use client";

import { useCountries } from "@/hooks/useCountries"
import { DetailHeader } from "@/components/detail-header"
import { Suspense } from "react"
import { LocationDetails } from "@/components/location-details"
import { JsonViewer } from "@/components/json-viewer";
import PopulationCard from "@/components/population-card";



export default function Page() {
  const { data: country } = useCountries("TN")

  return (
      <div className="container mx-auto px-6 py-8">
        <DetailHeader
          title="📍 Informations Géographiques"
          description="Données détaillées sur les emplacements, démographie et caractéristiques régionales"
          backHref="/geography"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 items-stretch">
          <div className="lg:col-span-2 ">
            <Suspense fallback={<div>Chargement de donnees...</div>}>
              <PopulationCard />
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
              data={country}
              title=" 📍 Détails de la localisation"
              apiUrl="/api/countries?code=TN"
            />
          </Suspense>
        </div>
        {/* <div className="mt-8">
          <Suspense fallback={<div>Chargement des données météo...</div>}>
            <JsonViewer
              data={ipData}
              title="🌍 Infos IP"
              apiUrl="/api/ipwhois"
            />
          </Suspense>
        </div> */}
      </div>
  )
}
