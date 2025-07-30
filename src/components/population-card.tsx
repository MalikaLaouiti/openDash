"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {  TrendingUp, Users } from "lucide-react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import { DataLoader } from "@/components/load-data"
import { ErrorAlert } from "@/components/error-alert"
import { useWorldBank } from "@/hooks/useWorldBank"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)



export default function Component() {
const {data: population , loading, error} = useWorldBank("TN") // Tunisia country code

if (!population) return <DataLoader message="Aucune donnée de population disponible" />
if (loading) return <DataLoader message="Chargement des données de population..." />
if (error) return <ErrorAlert error={error} />


const data = Array.isArray(population) ? population : [population];

const getLatestValue = () => {
  const item = data.find(item => item.value !== null);
  return {
    value: item?.value ,
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
    // Get last 15 years of data for better visualization
    const recentData = data.slice(0, 15).reverse()

    return {
      labels: recentData.map((item) => item.date),
      datasets: [
        {
          label: "Population Density (people/km²)",
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
        text: "Population Density Trend (Last 15 Years)",
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
          text: "People per km²",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Year",
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
    return (
      <ErrorAlert error={error}/>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-xl">Tunisia Population Density</CardTitle>
        </div>
        <CardDescription className="flex items-center gap-4">
          <span>Population per square kilometer</span>
          <Badge variant="secondary" className="text-xs">
            {getYearRange()}
          </Badge>
        </CardDescription>
        <div className="flex items-center gap-2 pt-2">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="text-2xl font-bold text-green-600">{getLatestValue().value} people/km²</span>
          <span className="text-sm text-muted-foreground">(Latest: {data[0]?.date})</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart Section */}
          <div className="h-80 w-full">
            <Bar data={getChartData()} options={chartOptions} />
          </div>
        </div>
        {data.length === 0 && <div className="text-center py-8 text-muted-foreground">No data available</div>}
      </CardContent>
    </Card>
  )
}
