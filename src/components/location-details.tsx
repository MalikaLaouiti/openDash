"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useIpInfo } from "@/hooks/useIpInfo"; // Ton hook ip info

export function LocationDetails() {
  const { data: ipInfo, loading, error,  } = useIpInfo();
  

  if (loading) return <div>Chargement des infos IP...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!ipInfo) return null;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">🌍 Infos Géolocalisation IP</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {ipInfo.city}, {ipInfo.region}, {ipInfo.country} {ipInfo.flag?.emoji}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">IP: {ipInfo.ip}</p>
          <Badge variant="secondary" className="mt-2">
            {ipInfo.connection?.isp ?? "ISP inconnu"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <span className="text-sm font-medium">Continent</span>
            <span className="text-sm font-semibold">{ipInfo.continent} ({ipInfo.continent_code})</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <span className="text-sm font-medium">Fuseau Horaire</span>
            <span className="text-sm font-semibold">{ipInfo.timezone?.id} ({ipInfo.timezone?.abbr})</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <span className="text-sm font-medium">Heure locale</span>
            <span className="text-sm font-semibold">{new Date(ipInfo.timezone?.current_time).toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <span className="text-sm font-medium">Latitude</span>
            <span className="text-sm font-semibold">{ipInfo.latitude}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <span className="text-sm font-medium">Longitude</span>
            <span className="text-sm font-semibold">{ipInfo.longitude}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <span className="text-sm font-medium">Code postal</span>
            <span className="text-sm font-semibold">{ipInfo.postal}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-xs text-slate-600 dark:text-slate-400">Drapeau</p>
            <img src={ipInfo.flag?.img} alt={`Drapeau ${ipInfo.country}`} className="inline-block h-8" />
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-600 dark:text-slate-400">Opérateur réseau</p>
            <p className="font-semibold">{ipInfo.connection?.org}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
