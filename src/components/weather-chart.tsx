"use client";

import { useEffect, useRef, useState } from "react";
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
import { useWeatherContext } from "@/components/WeatherContext";
import { RefreshButton } from "@/components/refresh-button"
import { ErrorAlert } from "@/components/error-alert";
import { DataLoader } from "@/components/load-data";

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
  }[];
}

export function WeatherChart() {
  const { data: weather, loading, error, refetch } = useOpenMeteo(35.78, 10.83);

  const [weatherData, setWeatherData] = useState<WeatherChartData | null>(null);
  const { setRefetchers } = useWeatherContext();
  const refetchRef = useRef(refetch);

  useEffect(() => {
    refetchRef.current = refetch;
  }, [refetch]);

  useEffect(() => {
    setRefetchers(() => refetchRef.current);
  }, [setRefetchers]);

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
        },
        {
          label: "Température Min (°C)",
          data: weather.daily.temperature_2m_min,
          borderColor: "rgb(16, 185, 129)",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          fill: true,
          tension: 0.4,
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
          size: 18,
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
          text: "Températures Min / Max (°C)", 
        },
        ticks: {
          stepSize: 2,
        },
        suggestedMin: Math.min(...weather!.daily.temperature_2m_min) - 2,
        suggestedMax: Math.max(...weather!.daily.temperature_2m_max) + 2,
      },
    },

  };


  if (loading) return <DataLoader message="Chargement des données météo..." />;
  if (error) return <ErrorAlert error={error} />;
  if (!weatherData) return <ErrorAlert error="Aucune donnée météo disponible." />;

  return (

    <Card className="h-full">
      <CardHeader className="grid grid-cols-3 gap-4 items-center">
        <CardTitle className="lg:col-span-2 flex items-center gap-4">📊 Graphique Météorologique</CardTitle>
        <RefreshButton />
      </CardHeader>
      <CardContent>
        <div className="mt-4 h-84 flex justify-center space-y-8">
          <Line data={weatherData} options={options} />
        </div>
        <div className="flex justify-between mt-8 mr-7 ml-7">
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
