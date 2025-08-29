"use client"

import {  RefreshCw, Package, User, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNpm } from '@/hooks/useNpm';
import { ErrorAlert } from "@/components/error-alert";
import { DataLoader } from "@/components/load-data"

export function NpmCardGeneral() {
    const { data: npmPackage, loading, error } = useNpm("node");

    if (loading) return <DataLoader message="Chargement de données" />;
    if (error) return <ErrorAlert error={error} />;
    if (!npmPackage) return <ErrorAlert error="Aucune donnée météo disponible." />;

    return (
        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                    <span className="text-red-900 dark:text-red-100">📦Général information sur npm package </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-1">
                    <p className="text-sm text-red-700 dark:text-red-300 text-center">
                            {npmPackage.name} — {npmPackage.author?.name || "Auteur inconnu"}
                    </p>
                    <div>
                        <p className="text-sm font-bold text-red-900 dark:text-red-100">
                            v{npmPackage.distTags?.latest}
                        </p>
                        <p className="text-sm text-red-700 dark:text-red-300">
                            {npmPackage.description}
                        </p>
                        <Badge variant="secondary" className="mt-1 capitalize">
                            {npmPackage.license || "Licence inconnue"}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-red-600" />
                            <span className="text-red-800 dark:text-red-200">
                                {Object.keys(npmPackage.versions || {}).length} versions
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-red-600" />
                            <span className="text-red-800 dark:text-red-200">
                                {npmPackage.maintainers?.length || 0} mainteneurs
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-red-600" />
                            <span className="text-red-800 dark:text-red-200">
                                Créé le {npmPackage.time?.created ? new Date(npmPackage.time.created).toLocaleDateString() : "Date inconnue"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 text-red-600" />
                            <span className="text-red-800 dark:text-red-200">
                                Modifié le {npmPackage.time?.modified ? new Date(npmPackage.time.modified).toLocaleDateString() : "Date inconnue"}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-redtext-red-200 dark:border-redtext-red-700">
                        <div className="text-center">
                            <p className="text-xs text-red-600 dark:text-red-400">Dernière version</p>
                            <p className="font-semibold text-red-900 dark:text-red-100">
                                📦 {npmPackage.distTags?.latest}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-red-600 dark:text-red-400">Fichier README</p>
                            <p className="font-semibold text-red-900 dark:text-red-100">
                                {npmPackage.readmeFilename || "Non spécifié"}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
