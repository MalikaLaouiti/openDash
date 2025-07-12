import { Globe, Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function getLocationStats() {
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    population: "2,161,000",
    area: "105.4 km²",
    density: "20,500/km²",
    elevation: "35 m",
    founded: "3ème siècle av. J.-C.",
    timeZone: "UTC+1",
  }
}

export async function LocationCard() {
  const stats = await getLocationStats()

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-800/20 border-purple-200 dark:border-purple-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
          <Globe className="h-5 w-5" />
          Informations Géographiques
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-purple-900 dark:text-purple-100">{stats.population}</p>
              <p className="text-xs text-purple-700 dark:text-purple-300">Population</p>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
              <Globe className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-purple-900 dark:text-purple-100">{stats.area}</p>
              <p className="text-xs text-purple-700 dark:text-purple-300">Superficie</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-purple-700 dark:text-purple-300">Densité:</span>
              <span className="font-medium text-purple-900 dark:text-purple-100">{stats.density}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-700 dark:text-purple-300">Altitude:</span>
              <span className="font-medium text-purple-900 dark:text-purple-100">{stats.elevation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-700 dark:text-purple-300">Fondée:</span>
              <span className="font-medium text-purple-900 dark:text-purple-100">{stats.founded}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2 border-t border-purple-200 dark:border-purple-700">
            <Clock className="h-4 w-4 text-purple-600" />
            <span className="text-sm text-purple-700 dark:text-purple-300">{stats.timeZone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
