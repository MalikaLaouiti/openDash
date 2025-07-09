import { Activity, Database, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function HeroSection() {
  return (
    <section className="text-center py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
            <Activity className="h-12 w-12 text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          Dashboard{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">API</span>
        </h1>

        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Explorez et visualisez des données en temps réel provenant de multiples sources. Un tableau de bord moderne
          pour développeurs et analystes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">APIs Multiples</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Intégration de 10 APIs différentes</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
            <CardContent className="p-6 text-center">
              <Database className="h-8 w-8 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Temps Réel</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Données actualisées automatiquement</p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Visualisations</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Graphiques interactifs et cartes</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
