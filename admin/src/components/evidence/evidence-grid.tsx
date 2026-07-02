import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Image as ImageIcon, 
  Video, 
  MonitorPlay, 
  FileText, 
  Receipt, 
  FileSignature, 
  FileCheck, 
  BadgeDollarSign, 
  BarChart, 
  PenTool, 
  Globe, 
  Megaphone, 
  LayoutTemplate,
  ExternalLink,
  MoreVertical,
  Download
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export interface EvidenceItem {
  id: string
  name: string
  type: string
  campaign: string
  medium: string
  date: string
  url: string
  size?: string // Only for files
}

interface EvidenceGridProps {
  items: EvidenceItem[]
}

const typeConfig: Record<string, { icon: any, color: string, isDocument: boolean }> = {
  "Fotografías": { icon: ImageIcon, color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20", isDocument: false },
  "Videos": { icon: Video, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20", isDocument: false },
  "Capturas de pantalla": { icon: MonitorPlay, color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20", isDocument: false },
  "PDFs": { icon: FileText, color: "text-red-500 bg-red-50 dark:bg-red-900/20", isDocument: true },
  "Facturas": { icon: Receipt, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20", isDocument: true },
  "Cotizaciones": { icon: FileSignature, color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20", isDocument: true },
  "Contratos": { icon: FileCheck, color: "text-rose-500 bg-rose-50 dark:bg-rose-900/20", isDocument: true },
  "Comprobantes de pago": { icon: BadgeDollarSign, color: "text-green-500 bg-green-50 dark:bg-green-900/20", isDocument: true },
  "Reportes": { icon: BarChart, color: "text-sky-500 bg-sky-50 dark:bg-sky-900/20", isDocument: true },
  "Artes finales": { icon: PenTool, color: "text-pink-500 bg-pink-50 dark:bg-pink-900/20", isDocument: false },
  "Links de publicaciones": { icon: Globe, color: "text-zinc-500 bg-zinc-100 dark:bg-zinc-800", isDocument: false },
  "Links de anuncios": { icon: Megaphone, color: "text-orange-500 bg-orange-50 dark:bg-orange-900/20", isDocument: false },
  "Links de landing pages": { icon: LayoutTemplate, color: "text-teal-500 bg-teal-50 dark:bg-teal-900/20", isDocument: false },
}

export function EvidenceGrid({ items }: EvidenceGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map((item) => {
        const config = typeConfig[item.type] || { icon: FileText, color: "text-zinc-500 bg-zinc-100", isDocument: true }
        const Icon = config.icon

        return (
          <Card key={item.id} className="group overflow-hidden flex flex-col hover:shadow-md transition-all duration-200 border-zinc-200 dark:border-zinc-800">
            {/* Visual Thumbnail Area */}
            <div className="relative h-32 bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center justify-center p-4 border-b border-zinc-100 dark:border-zinc-800 overflow-hidden">
              <div className={cn("p-4 rounded-full", config.color)}>
                <Icon className="h-8 w-8" />
              </div>
              
              {/* Type Badge Floating */}
              <Badge variant="secondary" className="absolute bottom-2 left-2 text-[10px] uppercase font-semibold opacity-90">
                {item.type}
              </Badge>

              {/* Action Menu (Hidden until hover on desktop) */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-full">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Abrir enlace
                    </DropdownMenuItem>
                    {config.isDocument && (
                      <DropdownMenuItem className="gap-2">
                        <Download className="h-4 w-4" />
                        Descargar archivo
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Info Area */}
            <CardContent className="p-4 flex-1 flex flex-col gap-1">
              <h3 className="font-semibold text-sm line-clamp-2 text-zinc-900 dark:text-zinc-100 leading-tight" title={item.name}>
                {item.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1" title={item.campaign}>
                {item.campaign}
              </p>
              <div className="flex items-center gap-1.5 mt-auto pt-2">
                <span className="text-[10px] text-zinc-400 font-medium bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                  {item.medium}
                </span>
              </div>
            </CardContent>

            {/* Footer Area */}
            <CardFooter className="p-3 pt-0 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between mt-auto">
              <span className="text-[10px] text-zinc-400">{item.date}</span>
              {item.size && (
                <span className="text-[10px] text-zinc-400 font-mono">{item.size}</span>
              )}
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
