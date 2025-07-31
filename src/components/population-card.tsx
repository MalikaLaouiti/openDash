"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users } from "lucide-react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import { DataLoader } from "@/components/load-data"
import { ErrorAlert } from "@/components/error-alert"
import { useWorldBank } from "@/hooks/useWorldBank"
import { useIpInfo } from "@/hooks/useIpInfo";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)



export default function PopulationCard() {
  const { data: country } = useIpInfo();
  const countryCode = country?.country_code;
  const { data: population, loading, error } = useWorldBank(countryCode)

  if (loading) return <DataLoader message="Chargement des données de population..." />
  if (error) return <ErrorAlert error={error} />

  if (!population) return <ErrorAlert error="Aucune donnée de population disponible" />
  const data = Array.isArray(population) ? population : [population];

  const getLatestValue = () => {
    const item = data.find(item => item.value !== null);
    return {
      value: item?.value,
      year: item?.date,
    };
  };

  const getYearRange = () => {
    if (data.length === 0) return ""
    const years = data.map((item) => Number.parseInt(item.date)).filter((year) => !isNaN(year))
    const minYear = Math.min(...years)
    const maxYear = Math.max(...years)
    return `${minYear} - ${maxYear}`
  }

  const getChartData = () => {
    const recentData = data.slice(0, 20).reverse()

    return {
      labels: recentData.map((item) => item.date),
      datasets: [
        {
          label: "Densité de la population (personnes / km²)",
          data: recentData.map((item) => item.value || 0),
          backgroundColor: "rgba(59, 130, 246, 0.6)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Tendance de la densité de population (15 dernières années)",
        font: {
          size: 14,
          weight: "bold" as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Personnes/km²",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Années",
        },
        grid: {
          display: false,
        },
      },
    },
  }

  if (loading) {
    return <DataLoader message="Chargement données de population ..." />
  }

  if (error) {
    return <ErrorAlert error={error} />
  }

  return (
    <Card className="w-full max-w-4xl mx-auto h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-xl">Densité de population de {country?.country}</CardTitle>
        </div>
        <CardDescription className="flex items-center gap-4">
          <span>Population par kilomètre carré</span>
          <Badge variant="secondary" className="text-xs">
            {getYearRange()}
          </Badge>
        </CardDescription>
        <div className="flex items-center gap-2 pt-2">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="text-2xl font-bold text-green-600">{getLatestValue().value?.toFixed(3)} personnes / km²</span>
          <span className="text-sm text-muted-foreground">(Dernière: {data[0]?.date})</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="h-100 w-full">
            <Bar data={getChartData()} options={chartOptions} />
          </div>
        </div>
        {data.length === 0 && <div className="text-center py-8 text-muted-foreground">Aucune donnée</div>}
      </CardContent>
    </Card>
  )
}
