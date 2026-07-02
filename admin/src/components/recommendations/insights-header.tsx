import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, TrendingUp, TrendingDown, Info, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Insight {
  id: string
  title: string
  description: string
  type: "positive" | "negative" | "info"
}

interface InsightsHeaderProps {
  insights: Insight[]
}

const typeConfig: Record<Insight["type"], { icon: LucideIcon, color: string, bgColor: string, borderColor: string }> = {
  positive: { 
    icon: TrendingUp, 
    color: "text-emerald-600 dark:text-emerald-500", 
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
    borderColor: "border-emerald-200 dark:border-emerald-500/20"
  },
  negative: { 
    icon: TrendingDown, 
    color: "text-rose-600 dark:text-rose-500", 
    bgColor: "bg-rose-50 dark:bg-rose-500/10",
    borderColor: "border-rose-200 dark:border-rose-500/20"
  },
  info: { 
    icon: Info, 
    color: "text-blue-600 dark:text-blue-500", 
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
    borderColor: "border-blue-200 dark:border-blue-500/20"
  },
}

export function InsightsHeader({ insights }: InsightsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-sm">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Inteligencia Automática
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight) => {
          const config = typeConfig[insight.type]
          const Icon = config.icon
          
          return (
            <Card key={insight.id} className={cn("overflow-hidden transition-all duration-200 shadow-sm border", config.borderColor)}>
              <CardContent className="p-5 flex gap-4 relative">
                {/* Subtle gradient background based on type */}
                <div className={cn("absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none", config.bgColor)} />
                
                <div className={cn("mt-1 shrink-0 p-2 rounded-lg h-10 w-10 flex items-center justify-center z-10 bg-white dark:bg-zinc-950 shadow-sm border", config.borderColor)}>
                  <Icon className={cn("h-5 w-5", config.color)} />
                </div>
                
                <div className="flex flex-col gap-1 z-10">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-snug">
                    {insight.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
