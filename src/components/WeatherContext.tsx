"use client";
import { createContext, useContext, useState, useCallback } from "react";

interface WeatherContextType {
  refetchAll: () => void;
  lastUpdated: Date | null;
  setRefetchers: (cb: () => void) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [refetchers, setRefetchersList] = useState<(() => void)[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  
  const setRefetchers = useCallback((cb: () => void) => {
    setRefetchersList((prev) => {
      if (!prev.includes(cb)) {
        return [...prev, cb];
      }
      return prev;
    });
  }, []);

  const refetchAll = () => {
    refetchers.forEach((refetch) => refetch());
    setLastUpdated(new Date());
  };

  return (
    <WeatherContext.Provider value={{ refetchAll, lastUpdated, setRefetchers }}>
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error("useWeatherContext must be used inside WeatherProvider");
  return context;
};
