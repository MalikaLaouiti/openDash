"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useNpmDown } from "@/hooks/useNpmDown"
import { DataLoader } from "@/components/load-data"
import { ErrorAlert } from "@/components/error-alert"

export default function NpmDownloadTrend() {

  const { data: downloadData, loading, error } = useNpmDown("node");
  if (loading) return <DataLoader message="Chargement de données" />;
  if (error) return <ErrorAlert error={error} />;
  if (!downloadData) return <ErrorAlert error="Aucune donnée météo disponible." />;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (    
    <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
        <CardHeader>
            <CardTitle>Daily Download Trend</CardTitle>
            <CardDescription>Daily downloads over the last month</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer
            config={{
                downloads: {
                label: "Downloads",
                color: "hsl(var(--chart-1))",
                },
            }}
            className="h-64"
            >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={downloadData?.downloads}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="day"
                    tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    }
                />
                <YAxis tickFormatter={formatNumber} />
                <ChartTooltip
                    content={<ChartTooltipContent />}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value: number) => [formatNumber(value), "Downloads"]}
                />
                <Line
                    type="monotone"
                    dataKey="downloads"
                    stroke="var(--color-downloads)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-downloads)", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                />
                </LineChart>
            </ResponsiveContainer>
            </ChartContainer>
        </CardContent>
        </Card>
    </div>
  )};