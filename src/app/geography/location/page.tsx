"use client";

import { useCountries } from "@/hooks/useCountries"
import { DetailHeader } from "@/components/detail-header"
import { Suspense } from "react"
import { JsonViewer } from "@/components/json-viewer";
import PopulationCard from "@/components/population-card";
import { CountryDetails } from "@/components/country-details";
import { useIpInfo } from "@/hooks/useIpInfo";
import { useWorldBank } from "@/hooks/useWorldBank";



export default function Page() {
  const { data: ipInfo } = useIpInfo();
  const countryCode = ipInfo?.country_code;
  const { data: country} = useCountries(countryCode)
  const { data: population} = useWorldBank(countryCode)

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
              <CountryDetails />
            </Suspense>
          </div>
        </div>

        <div className="mt-8">
          <Suspense fallback={<div>Chargement des données...</div>}>
            <JsonViewer
              data={population}
              title=" 📍 Détails de la population"
              apiUrl="/api/worldBank"
            />
          </Suspense>
        </div>
        <div className="mt-8">
          <Suspense fallback={<div>Chargement des données ...</div>}>
            <JsonViewer
              data={country}
              title="🌍 Informations pratiques"
              apiUrl="/api/countries"
            />
          </Suspense>
        </div>
      </div>
  )
}
