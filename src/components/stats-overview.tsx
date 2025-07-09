import { Activity, Database, Globe, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function StatsOverview() {
  const stats = [
    {
      title: "APIs Actives",
      value: "15",
      change: "+2",
      icon: Database,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Requêtes/jour",
      value: "12.5K",
      change: "+15%",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Uptime",
      value: "99.9%",
      change: "Stable",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      title: "Pays couverts",
      value: "195",
      change: "Global",
      icon: Globe,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ]

  return (
    <section className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
