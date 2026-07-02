"use client"

import { ReportTypesGrid } from "@/components/reports/report-types-grid"
import { ReportsHistoryTable } from "@/components/reports/reports-history-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Centro de Reportes
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1">
            Genera, cruza y exporta datos de todas tus campañas en múltiples formatos.
          </p>
        </div>
        <Link href="/reports/new?type=personalizado">
          <Button className="shadow-sm font-semibold h-10 px-4 gap-2 rounded-lg shrink-0">
            <Plus className="h-4 w-4" />
            Nuevo Reporte
          </Button>
        </Link>
      </div>

      {/* Report Types Grid */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Tipos de Reporte
        </h2>
        <ReportTypesGrid />
      </section>

      {/* History Table */}
      <section className="space-y-4 pt-4">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Últimos Reportes Generados
        </h2>
        <ReportsHistoryTable />
      </section>
    </div>
  )
}
