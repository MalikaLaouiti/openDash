import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CategoryCardProps {
  category: {
    id: string
    title: string
    description: string
    href: string
    color: string
    apis: string[]
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className={`w-full h-2 bg-gradient-to-r ${category.color} rounded-full mb-4`} />
        <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">{category.title}</CardTitle>
        <p className="text-sm text-slate-600 dark:text-slate-400">{category.description}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-4">
          {category.apis.map((api) => (
            <Badge key={api} variant="secondary" className="text-xs">
              {api}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Mis à jour il y a 2min</span>
          </div>
          <span>{category.apis.length} APIs</span>
        </div>

        <Link href={category.href}>
          <Button className="w-full group-hover:bg-slate-900 dark:group-hover:bg-slate-100 transition-colors">
            Explorer
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
