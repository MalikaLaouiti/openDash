"use client";
import { Globe, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCountries } from "@/hooks/useCountries"
import { useIpInfo } from "@/hooks/useIpInfo";
import { ErrorAlert } from "@/components/error-alert";
import  {DataLoader}  from "@/components/load-data";



export  function LocationCard() {
  const { data: country } = useIpInfo();
  const countryCode = country?.country_code;
  const { data: stats, loading, error,refetch } = useCountries(countryCode);
  
  if (loading) return <DataLoader message= "Chargement d'Informations..."/>
  if (error) return <ErrorAlert error={error} />;
  if (!location) return <ErrorAlert error="Aucune donnée géographique disponible." />;

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-800/20 border-purple-200 dark:border-purple-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
          <Globe className="h-5 w-5" />
          Informations Géographiques
          <Button onClick={refetch} size="sm" variant="ghost">
              <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-purple-900 dark:text-purple-100">{stats?.population}</p>
              <p className="text-xs text-purple-700 dark:text-purple-300">Population</p>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
              <Globe className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-purple-900 dark:text-purple-100">{stats?.area}</p>
              <p className="text-xs text-purple-700 dark:text-purple-300">Superficie</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-purple-700 dark:text-purple-300">Capitale:</span>
              <span className="font-medium text-purple-900 dark:text-purple-100">{stats?.capital}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-700 dark:text-purple-300">Continent:</span>
              <span className="font-medium text-purple-900 dark:text-purple-100">{stats?.region}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-700 dark:text-purple-300"> Langue officielle:</span>
              <span className="font-medium text-purple-900 dark:text-purple-100">
                {stats?.languages
                  ? Object.entries(stats.languages)
                      .map(([code, name]) => `${name} (${code})`)
                      .join(', ')
                  : 'Aucune langue disponible'}
              </span>

            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
