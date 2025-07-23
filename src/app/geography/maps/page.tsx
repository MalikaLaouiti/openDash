"use client";
import InteractiveMapCard from "@/components/interactive-map-card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DetailHeader } from "@/components/detail-header"
import { Suspense } from "react"
import { LocationDetails } from "@/components/location-details"

export default function Page() {
  // Single city location


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-8">
        <DetailHeader
          title="Cartes & Géolocalisation"
          description="Visualisation des données de géolocalisation"
          backHref="/geography"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 items-stretch">
                  <div className="lg:col-span-2 ">
                    <Suspense fallback={<div>Chargement du graphique...</div>}>
                      <InteractiveMapCard />
                    </Suspense>
                  </div>
        
                  <div className="space-y-6 ">
                    <Suspense fallback={<div>Chargement des détails...</div>}>
                      <LocationDetails />
                    </Suspense>
                  </div>
                </div>
      </div>
    </div>
  )
}
