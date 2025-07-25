"use client";
import { Globe, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCountries } from "@/hooks/useCountries"
import { useIpInfo } from "@/hooks/useIpInfo";



export  function LocationCard() {
  const { data: country } = useIpInfo();
  console.log("Country Data:", country);

  const countryCode = country?.country_code;

  const { data: stats, loading, error,refetch } = useCountries(countryCode);
  console.log("Country Stats:", stats);

  if (loading) return <div>Chargement d&apos;Informations...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!location) return null;

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
              <span className="text-purple-700 dark:text-purple-300">Nom du pays :</span>
              <span className="font-medium text-purple-900 dark:text-purple-100">{stats?. name.nativeName[Object.keys(stats.name.nativeName)[0]].official}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-700 dark:text-purple-300">Continent :</span>
              <span className="font-medium text-purple-900 dark:text-purple-100">{stats?.continents}</span>
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

          <div className="flex items-center justify-center gap-2 pt-2 border-t border-purple-200 dark:border-purple-700">
            <Clock className="h-4 w-4 text-purple-600" />
            <span className="text-sm text-purple-700 dark:text-purple-300">
              {stats?.timezones && stats.timezones.length > 0 ? stats.timezones[0] : "Fuseau horaire inconnu"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
