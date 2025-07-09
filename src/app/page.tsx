// import { CategoryCard } from "@/components/category-card"
import { DashboardHeader } from "@/components/dashboard-header"
// import { HeroSection } from "@/components/hero-section"
// import { StatsOverview } from "@/components/stats-overview"

// const categories = [
//   {
//     id: "geography",
//     title: "🌍 Géographie",
//     description: "Météo en temps réel, cartes interactives, données géographiques",
//     href: "/geography",
//     color: "from-blue-500 to-cyan-500",
//     apis: ["OpenWeatherMap", "Géolocalisation", "Cartes"],
//     count: 3,
//   },
//   {
//     id: "technology",
//     title: "💻 Technologie",
//     description: "GitHub, NPM, StackOverflow, statistiques de développement",
//     href: "/technology",
//     color: "from-purple-500 to-pink-500",
//     apis: ["GitHub API", "NPM Registry", "StackOverflow"],
//     count: 4,
//   },
//   {
//     id: "web-networks",
//     title: "🌐 Web et Réseaux",
//     description: "Informations IP, DNS, sécurité, performance réseau",
//     href: "/web-networks",
//     color: "from-green-500 to-teal-500",
//     apis: ["IP Geolocation", "DNS Lookup", "SSL Check"],
//     count: 3,
//   },
//   {
//     id: "economics",
//     title: "📈 Données Économiques",
//     description: "Cryptomonnaies, actions, forex, données financières",
//     href: "/economics",
//     color: "from-orange-500 to-red-500",
//     apis: ["CoinGecko", "Alpha Vantage", "Exchange Rates"],
//     count: 5,
//   },
// ]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        {/* <HeroSection /> */}
        {/* <StatsOverview /> */}

        <section className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Explorez nos Catégories d&apos;APIs
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Accédez à des données en temps réel provenant de sources fiables et reconnues
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* {categories.map((category) => (
              // <CategoryCard key={category.id} category={category} />
            ))} */}
          </div>
        </section>
      </main>
    </div>
  )
}
