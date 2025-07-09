"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Home, Globe, Code, Network, TrendingUp, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Géographie", href: "/geography", icon: Globe },
  { name: "Technologie", href: "/technology", icon: Code },
  { name: "Web & Réseaux", href: "/web-networks", icon: Network },
  { name: "Économie", href: "/economics", icon: TrendingUp },
  { name: "À propos", href: "/about", icon: Info },
]

export function DashboardHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">OpenDash</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center gap-2",
                      isActive && "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
