"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Filler,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOpenMeteo } from "@/hooks/useOpenMeteo";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Filler);

interface WeatherChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    tension: number;
    yAxisID: string;
    
  }[];
}

export function WeatherChart() {
  const { data: weather, loading, error } = useOpenMeteo(35.78, 10.83); // Monastir
  console.log("Weather data:", weather);

  const [weatherData, setWeatherData] = useState<WeatherChartData | null>(null);

  // Met à jour les données du graphique quand les données météo arrivent
  useEffect(() => {
    if (!weather) return;

    const labels = weather.daily.time.map((date: string) =>
      new Date(date).toLocaleDateString("fr-FR", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    );

    setWeatherData({
      labels,
      datasets: [
        {
          label: "Température Max (°C)",
          data: weather.daily.temperature_2m_max,
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.4,
          yAxisID: "y",
        },
        {
          label: "Température Min (°C)",
          data: weather.daily.temperature_2m_min,
          borderColor: "rgb(16, 185, 129)",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          fill: true,
          tension: 0.4,
          yAxisID: "y1",
        },
      ],
    });
  }, [weather]);

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: "Prévisions Météo - 7 Jours",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Jours",
        },
      },
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Température Max (°C)",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "Température Min (°C)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  // Loading, error, ou pas encore de données
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse h-64 bg-slate-200 dark:bg-slate-700 rounded" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-red-500">
          Erreur lors du chargement des données météo : {error}
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) return null;

  return (
    
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">📊 Graphique Météorologique</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex justify-center">
          <Line data={weatherData} options={options} />
        </div>
        <div className="flex justify-between mt-4">
        {weather?.daily.precipitation_sum.map((precip, idx) => (
        <Tooltip key={idx}>
          <TooltipTrigger className="text-sm text-muted-foreground">💧{precip} mm</TooltipTrigger>
          <TooltipContent>
            {weather.daily.time[idx]}  
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
      </CardContent>
    </Card>
    

  );
}
