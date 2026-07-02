"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Briefcase, 
  Wallet, 
  LineChart, 
  Megaphone, 
  Clapperboard, 
  FileCheck, 
  SplitSquareHorizontal, 
  Sparkles,
  Download,
  FileText,
  FileSpreadsheet,
  FileJson,
  Plus
} from "lucide-react"
import Link from "next/link"

export interface ReportType {
  id: string
  title: string
  description: string
  icon: any
  color: string
}

export const reportTypes: ReportType[] = [
  { id: "ejecutivo", title: "Reporte Ejecutivo", description: "Resumen gerencial de métricas clave, presupuesto y conclusiones.", icon: Briefcase, color: "text-blue-500 bg-blue-50 dark:bg-blue-500/10" },
  { id: "financiero", title: "Reporte Financiero", description: "Desglose de presupuestos, pacing, comisiones y facturación.", icon: Wallet, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" },
  { id: "resultados", title: "Reporte de Resultados", description: "Métricas profundas, KPIs digitales y offline, conversiones.", icon: LineChart, color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" },
  { id: "medios", title: "Reporte de Medios", description: "Análisis por canal (Meta, Google, TV, Radio, OOH).", icon: Megaphone, color: "text-amber-500 bg-amber-50 dark:bg-amber-500/10" },
  { id: "produccion", title: "Reporte de Producción", description: "Estatus de piezas creativas, entregables y horas invertidas.", icon: Clapperboard, color: "text-rose-500 bg-rose-50 dark:bg-rose-500/10" },
  { id: "evidencias", title: "Reporte de Evidencias", description: "Compendio de links, capturas, artes finales y documentos.", icon: FileCheck, color: "text-teal-500 bg-teal-50 dark:bg-teal-500/10" },
  { id: "comparativo", title: "Comparativo On vs Off", description: "Atribución cruzada entre inversión digital y tradicional.", icon: SplitSquareHorizontal, color: "text-purple-500 bg-purple-50 dark:bg-purple-500/10" },
  { id: "recomendaciones", title: "Reporte de Inteligencia", description: "Listado de recomendaciones generadas por el sistema.", icon: Sparkles, color: "text-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-500/10" },
]

export function ReportTypesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {reportTypes.map((report) => {
        const Icon = report.icon
        return (
          <Link key={report.id} href={`/reports/new?type=${report.id}`}>
            <Card 
              className="cursor-pointer hover:shadow-md transition-all border-zinc-200 dark:border-zinc-800 flex flex-col group h-full"
            >
              <CardContent className="p-5 flex flex-col h-full gap-3">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${report.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" render={<Link href={`/reports/new?type=${report.id}`} />}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{report.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-snug">{report.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

