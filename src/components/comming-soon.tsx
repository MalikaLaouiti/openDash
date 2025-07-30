"use client"

import type React from "react"
import { Sparkles, Rocket } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CommingSoon({message}: { message?: string }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl mx-auto p-6 flex items-center justify-center">
                <Card className="border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 md:scale-105">
                    <CardContent>
                        <div className="w-full max-w-4xl mx-auto">
                            {/* Floating elements for visual interest */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
                                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                                <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
                            </div>

                            <div className="relative z-10 text-center space-y-8">
                                {/* Main heading with animated icon */}
                                <div className="space-y-4">
                                    <div className="flex justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
                                            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
                                                <Rocket className="h-12 w-12 text-white animate-bounce" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                                            <Sparkles className="h-4 w-4 mr-2" />
                                            {message}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}