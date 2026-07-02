import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, FileText, FileSpreadsheet } from "lucide-react"

interface ReportHistoryItem {
  id: string
  name: string
  date: string
  format: "pdf" | "excel"
  author: string
}

const mockHistory: ReportHistoryItem[] = [
  { id: "1", name: "Reporte Ejecutivo - Hot Sale 2026", date: "02 Jul 2026, 14:30", format: "pdf", author: "Juan Pérez" },
  { id: "2", name: "Resultados Meta Ads - Junio", date: "01 Jul 2026, 09:15", format: "excel", author: "Ana Gómez" },
  { id: "3", name: "Financiero Q2 2026", date: "30 Jun 2026, 18:45", format: "pdf", author: "Sistema" },
  { id: "4", name: "Comparativo On vs Off", date: "25 Jun 2026, 11:20", format: "excel", author: "Ana Gómez" },
]

export function ReportsHistoryTable() {
  return (
    <div className="rounded-xl border bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-zinc-50/50 dark:bg-zinc-900/50">
            <TableHead className="font-semibold px-4">Nombre del Documento</TableHead>
            <TableHead className="font-semibold">Fecha de Generación</TableHead>
            <TableHead className="font-semibold text-center">Formato</TableHead>
            <TableHead className="font-semibold">Generado por</TableHead>
            <TableHead className="text-right font-semibold px-4">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockHistory.map((item) => (
            <TableRow key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
              <TableCell className="px-4 font-medium text-zinc-900 dark:text-zinc-100">
                {item.name}
              </TableCell>
              <TableCell className="text-zinc-500 dark:text-zinc-400">
                {item.date}
              </TableCell>
              <TableCell className="text-center">
                {item.format === "pdf" ? (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20">
                    <FileText className="h-3 w-3 mr-1" /> PDF
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                    <FileSpreadsheet className="h-3 w-3 mr-1" /> EXCEL
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-zinc-500 dark:text-zinc-400">
                {item.author}
              </TableCell>
              <TableCell className="text-right px-4">
                <Button variant="ghost" size="sm" className="gap-2 h-8">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Descargar</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
