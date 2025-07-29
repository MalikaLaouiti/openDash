import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react";

export function ErrorAlert({ error }: { error: string }) {
    return (
        <div>
            <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Oops!</AlertTitle>
                <AlertDescription>
                    Erreur: {error}
                </AlertDescription>
            </Alert>
        </div>
    )
}