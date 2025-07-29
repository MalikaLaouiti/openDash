import { Progress } from "@/components/ui/progress";
import React from "react";

export function DataLoader({ message }: { message: string }) {
    const [progress, setProgress] = React.useState(13)
    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(80), 10)
        return () => clearTimeout(timer)
    }, [])
    return (
        <div>
            <div className="text-center text-gray-500 mb-4">

                <Progress value={progress} />
                {message}
            </div>
        </div>

    )
}