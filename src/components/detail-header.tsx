import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface DetailHeaderProps {
  title: string
  description: string
  backHref: string
}

export function DetailHeader({ title, description, backHref }: DetailHeaderProps) {
  return (
    <div className="py-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href={backHref}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
      </div>

      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">{title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{description}</p>
      </div>
    </div>
  )
}
