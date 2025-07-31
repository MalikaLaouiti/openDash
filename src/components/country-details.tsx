"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useIpInfo } from "@/hooks/useIpInfo";
import { DataLoader } from "@/components/load-data";
import { ErrorAlert } from "@/components/error-alert";
import { useCountries } from "@/hooks/useCountries";

export function CountryDetails() {
  const { data: country } = useIpInfo();
  const countryCode = country?.country_code;
  const { data: info, loading, error } = useCountries(countryCode)


  if (loading) return <DataLoader message="Chargement des données de localisation..." />
  if (error) return <ErrorAlert error={error} />
  if (!info) return <ErrorAlert error="Aucune information sur ce pays disponible." />

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">🌍 Informations pratiques</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              {info.name.common}   {info.name.nativeName["ara"]?.official}
            </h2>
            {info.flags?.png && (
              <Image
                src={info.flags.png}
                alt={`Drapeau de ${info.name.common}`}
                width={40}
                height={25}
                className="rounded-sm"
              />
            )}
          </div>

          {info.translations?.fra && (
            <p className="text-sm text-slate-700 dark:text-slate-300 italic">
              Nom (FR) : {info.translations.fra.common} – {info.translations.fra.official}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <span className="text-sm font-medium">Région</span>
            <span className="text-sm font-semibold">{info.region}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <span className="text-sm font-medium">Sous-Région</span>
            <span className="text-sm font-semibold">{info.subregion}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <span className="text-sm font-medium">Capitale</span>
            <span className="text-sm font-semibold">{info.capital.join(", ")}</span>
          </div>
         

          {info.languages && (
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-sm font-medium">Langues</span>
              <span className="text-sm font-semibold">
                {Object.values(info.languages).join(", ")}
              </span>
            </div>
          )}

          {info.currencies && (
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-sm font-medium">Monnaies</span>
              <span className="text-sm font-medium pl-6">
                {Object.entries(info.currencies)
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  .map(([code, curr]) => `${curr.name}(${curr.symbol})`)
                  .join(", ")}
              </span>
            </div>
          )}

          {info.area && (
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-sm font-medium">Superficie</span>
              <span className="text-sm font-semibold">{info.area.toLocaleString()} km²</span>
            </div>
          )}

          {info.population && (
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-sm font-medium">Population</span>
              <span className="text-sm font-semibold">{info.population.toLocaleString()}</span>
            </div>
          )}

          {info.borders && (
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-sm font-medium">Frontières</span>
              <span className="text-sm font-semibold">{info.borders.join(", ")}</span>
            </div>
          )}

          {info.timezones && (
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-sm font-medium">Fuseaux horaires</span>
              <span className="text-sm font-semibold">{info.timezones.join(", ")}</span>
            </div>
          )}

          {info.gini && (
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-sm font-medium">Indice Gini</span>
              <span className="text-sm font-semibold">
                {Object.entries(info.gini)
                  .map(([year, value]) => `${year}: ${value}`)
                  .join(", ")}
              </span>
            </div>
          )}
        </div>

        {info.coatOfArms?.png && (
          <div className="grid grid-cols-1 pt-4 border-t">
            <div className="text-center">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Blason</p>
              <Image
                src={info.coatOfArms.png}
                alt={`Blason de ${info.name.common}`}
                width={50}
                height={50}
                className="border rounded-md mx-auto"
              />
            </div>
          </div>
        )}
      </CardContent>

    </Card>
  );
}
