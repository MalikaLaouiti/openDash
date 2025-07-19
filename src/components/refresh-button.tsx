"use client";

import { Button } from "@/components/ui/button";
import { useWeatherContext } from "@/components/WeatherContext";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export function RefreshButton() {
  const { refetchAll, lastUpdated } = useWeatherContext();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetchAll(); 
    } catch (error) {
      console.error("Erreur lors de l'actualisation :", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    
      
      <div className="space-y-4">
        <Button onClick={handleRefresh} disabled={isRefreshing} className="w-full">
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Actualisation..." : "Rafraîchir les données"}
        </Button>

        {lastUpdated && (
          <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
            Dernière actualisation : {lastUpdated.toLocaleString()}
          </p>
        )}
      </div>
    
  );
}
