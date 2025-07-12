import Link from "next/link"
import { Clock, Activity, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ApiGridProps {
  apis: Array<{
    id: string
    title: string
    description: string
    lastUpdate: string
    status: "active" | "inactive" | "error"
    href: string
  }>
}

export function ApiGrid({ apis }: ApiGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "inactive":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Activity className="h-4 w-4 text-green-600" />
      case "inactive":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apis.map((api) => (
        <Card key={api.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{api.title}</CardTitle>
              <div className="flex items-center gap-2">
                {getStatusIcon(api.status)}
                <div className={`w-2 h-2 rounded-full ${getStatusColor(api.status)}`} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{api.description}</p>

            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-xs">
                {api.lastUpdate}
              </Badge>
              <Badge variant={api.status === "active" ? "default" : "secondary"}>
                {api.status === "active" ? "Actif" : api.status === "inactive" ? "Inactif" : "Erreur"}
              </Badge>
            </div>

            <Link href={api.href}>
              <Button className="w-full">Voir les détails</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
