"use client";

import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface JsonViewerProps {
  data: object | null;
  title: string;
  apiUrl?: string;
}

export function JsonViewer({ data, title, apiUrl }: JsonViewerProps) {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = async () => {
    if (!data) return;
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            {title}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copié !
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copier
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      {apiUrl && (
        <div className="px-4 text-xs text-gray-500 break-all">
          URL API : <code>{apiUrl}</code>
        </div>
      )}
      <CardContent>
        <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 overflow-auto max-h-96">

          <pre className="text-sm text-green-400 font-mono">
            {data === null
              ? "Aucune donnée disponible."
              : data
                ? JSON.stringify(data, null, 2)
                : " Chargement..."}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
