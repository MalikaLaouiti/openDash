"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, MapPin, Mail, Users, BookOpen, Shield } from "lucide-react"
import { useGithubOrg } from "@/hooks/useGithubOrg"
import { ErrorAlert } from "@/components/error-alert"
import { DataLoader } from "@/components/load-data"


export function GitHubInfoCard() {
    const { data , loading, error } = useGithubOrg('vercel');
    console.log("GitHub Data:", data);
    if (loading) return <DataLoader message="Chargement de données" />;
    if (error) return <ErrorAlert error={error} />;
    if (!data) return <ErrorAlert error="Aucune donnée disponible." />;
    
  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Github className="h-6 w-6 text-red-600" />
          <h2 className="text-lg font-semibold text-red-800">Informations générales sur le profil GitHub</h2>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-red-600 font-medium">
            {data.name} — {data.login}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">ID</span>
          <span className="text-gray-600">{data.id}</span>
        </div>

        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-red-500" />
          <span className="text-red-600">{data.email}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-red-500" />
          <span className="text-red-600">{data.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-red-500" />
            <span className="text-red-600">{data.public_repos} dépôts publics</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-red-500" />
            <span className="text-red-600">{data.followers.toLocaleString()} abonnés</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-red-500" />
            <span className="text-red-600">Statut de vérification</span>
          </div>

          <Badge
            variant={data.is_verified ? "default" : "secondary"}
            className="bg-red-100 text-red-800 hover:bg-red-200"
          >
            {data.is_verified ? "Vérifié" : "Non vérifié"}
          </Badge>
        </div>

        <div className="text-center pt-2">
          <div className="text-sm text-gray-600 mb-1">Profil GitHub</div>
          <a
            href={data.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-700 font-medium underline"
          >
            {data.login}
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
