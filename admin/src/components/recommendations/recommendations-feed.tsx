import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowRight, Zap, Target, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export type Priority = "high" | "medium" | "low"

export interface Recommendation {
  id: string
  alertType: string
  priority: Priority
  campaign: string
  channel: string
  description: string
  impact: string
  actionLabel: string
}

interface RecommendationsFeedProps {
  recommendations: Recommendation[]
}

const priorityConfig = {
  high: { label: "Prioridad Alta", color: "bg-red-500", badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800" },
  medium: { label: "Prioridad Media", color: "bg-amber-500", badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800" },
  low: { label: "Prioridad Baja", color: "bg-blue-500", badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800" },
}

export function RecommendationsFeed({ recommendations }: RecommendationsFeedProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Panel de Recomendaciones
        </h2>
        <Badge variant="outline" className="font-medium bg-zinc-50 dark:bg-zinc-900">
          {recommendations.length} Alertas Activas
        </Badge>
      </div>

      <div className="flex flex-col gap-4">
        {recommendations.map((rec) => {
          const config = priorityConfig[rec.priority]
          
          return (
            <Card key={rec.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row h-full">
                {/* Visual priority indicator line */}
                <div className={cn("w-full sm:w-1.5 shrink-0 h-1.5 sm:h-auto", config.color)} />
                
                <CardContent className="flex-1 p-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Info Column (Left) */}
                  <div className="md:col-span-3 flex flex-col gap-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className={cn("font-medium", config.badge)}>
                        {config.label}
                      </Badge>
                      <Badge variant="secondary" className="font-medium text-xs">
                        {rec.alertType}
                      </Badge>
                    </div>
                    <div className="mt-1">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                        {rec.campaign}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Target className="h-3 w-3" />
                        {rec.channel}
                      </p>
                    </div>
                  </div>

                  {/* Context Column (Middle) */}
                  <div className="md:col-span-6 flex flex-col gap-2 border-t md:border-t-0 md:border-l border-zinc-100 dark:border-zinc-800 pt-4 md:pt-0 md:pl-6">
                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-zinc-400" />
                      <span>{rec.description}</span>
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-start gap-2">
                      <Zap className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
                      <span><strong>Impacto estimado:</strong> {rec.impact}</span>
                    </p>
                  </div>

                  {/* Action Column (Right) */}
                  <div className="md:col-span-3 flex md:justify-end border-t md:border-t-0 border-zinc-100 dark:border-zinc-800 pt-4 md:pt-0">
                    <Button variant={rec.priority === "high" ? "default" : "secondary"} className="w-full md:w-auto font-medium gap-2">
                      {rec.actionLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>

                </CardContent>
              </div>
            </Card>
          )
        })}
        
        {recommendations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50 text-center">
            <Search className="h-10 w-10 text-zinc-300 mb-4" />
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">Todo en orden</h3>
            <p className="text-zinc-500 max-w-sm mt-1">No hay recomendaciones activas por el momento. El rendimiento de tus campañas es óptimo.</p>
          </div>
        )}
      </div>
    </div>
  )
}
