"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { BudgetLine } from "@/app/budgets/page"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface BudgetsTableProps {
  lines: BudgetLine[]
  onEdit: (line: BudgetLine) => void
  onDelete: (id: string) => void
}

const fmt = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n)

const STATUS_STYLES: Record<string, string> = {
  Pendiente: "bg-amber-50/70 text-amber-700 border-amber-200/60 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800/40",
  Parcial: "bg-blue-50/70 text-blue-700 border-blue-200/60 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800/40",
  Pagado: "bg-emerald-50/70 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800/40",
  Cancelado: "bg-rose-50/70 text-rose-700 border-rose-200/60 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-800/40",
}

const DOT_STYLES: Record<string, string> = {
  Pendiente: "bg-amber-500",
  Parcial: "bg-blue-500",
  Pagado: "bg-emerald-500",
  Cancelado: "bg-rose-500",
}

export function BudgetsTable({ lines, onEdit, onDelete }: BudgetsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [filterClient, setFilterClient] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const ITEMS_PER_PAGE = 10

  const filtered = lines.filter((l) => {
    const matchClient = filterClient === "" || l.clientName.toLowerCase().includes(filterClient.toLowerCase())
    const matchStatus = filterStatus === "" || l.paymentStatus === filterStatus
    return matchClient && matchStatus
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const current = filtered.slice(startIndex, endIndex)

  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  return (
    <div className="space-y-3">
      {/* Filtros rápidos */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 shrink-0">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filtrar:</span>
        </div>
        <Input
          placeholder="Buscar por cliente..."
          value={filterClient}
          onChange={(e) => { setFilterClient(e.target.value); handleFilterChange() }}
          className="max-w-xs h-9 text-sm"
        />
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); handleFilterChange() }}
          className="h-9 rounded-lg border border-input bg-transparent px-3 text-sm text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors"
        >
          <option value="">Todos los estatus</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Parcial">Parcial</option>
          <option value="Pagado">Pagado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
        {(filterClient || filterStatus) && (
          <Button variant="ghost" size="sm" className="h-9 text-xs text-zinc-500" onClick={() => { setFilterClient(""); setFilterStatus(""); }}>
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Tabla */}
      <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-zinc-50/55 dark:bg-zinc-900/30 border-b border-zinc-200/80 dark:border-zinc-800/80">
              <TableRow>
                <TableHead className="font-semibold px-4 whitespace-nowrap">Cliente</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Campaña</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Medio</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Canal</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Proveedor</TableHead>
                <TableHead className="font-semibold text-right whitespace-nowrap">P. Autorizado</TableHead>
                <TableHead className="font-semibold text-right whitespace-nowrap">C. Unitario</TableHead>
                <TableHead className="font-semibold text-right whitespace-nowrap">Cantidad</TableHead>
                <TableHead className="font-semibold text-right whitespace-nowrap">Subtotal</TableHead>
                <TableHead className="font-semibold text-right whitespace-nowrap">IVA</TableHead>
                <TableHead className="font-semibold text-right whitespace-nowrap">Total</TableHead>
                <TableHead className="font-semibold text-right whitespace-nowrap">Pagado</TableHead>
                <TableHead className="font-semibold text-right whitespace-nowrap">Pendiente</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Estatus Pago</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Evidencia</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Factura</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Fecha Pago</TableHead>
                <TableHead className="w-[60px] font-semibold text-center">Acc.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {current.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={18} className="h-28 text-center text-zinc-400 dark:text-zinc-500">
                    No hay partidas registradas.
                  </TableCell>
                </TableRow>
              ) : (
                current.map((line) => (
                  <TableRow key={line.id} className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/10 transition-colors">
                    <TableCell className="font-bold text-zinc-900 dark:text-zinc-50 px-4 text-sm whitespace-nowrap">{line.clientName}</TableCell>
                    <TableCell className="text-zinc-700 dark:text-zinc-300 text-sm whitespace-nowrap">{line.campaignName}</TableCell>
                    <TableCell className="text-zinc-500 dark:text-zinc-400 text-sm whitespace-nowrap">{line.medium}</TableCell>
                    <TableCell className="text-zinc-500 dark:text-zinc-400 text-sm whitespace-nowrap">{line.channel}</TableCell>
                    <TableCell className="text-zinc-500 dark:text-zinc-400 text-sm whitespace-nowrap">{line.provider}</TableCell>
                    <TableCell className="text-right text-sm font-medium whitespace-nowrap">{fmt(line.authorizedBudget)}</TableCell>
                    <TableCell className="text-right text-sm whitespace-nowrap">{fmt(line.unitCost)}</TableCell>
                    <TableCell className="text-right text-sm whitespace-nowrap">{line.quantity}</TableCell>
                    <TableCell className="text-right text-sm whitespace-nowrap">{fmt(line.subtotal)}</TableCell>
                    <TableCell className="text-right text-sm text-zinc-500 whitespace-nowrap">{fmt(line.iva)}</TableCell>
                    <TableCell className="text-right text-sm font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">{fmt(line.total)}</TableCell>
                    <TableCell className="text-right text-sm text-emerald-700 dark:text-emerald-400 font-medium whitespace-nowrap">{fmt(line.paid)}</TableCell>
                    <TableCell className="text-right text-sm text-rose-700 dark:text-rose-400 font-medium whitespace-nowrap">{fmt(line.pending)}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
                        STATUS_STYLES[line.paymentStatus] ?? ""
                      )}>
                        <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", DOT_STYLES[line.paymentStatus] ?? "")} />
                        {line.paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-zinc-500 whitespace-nowrap max-w-[120px] truncate">{line.evidence || "—"}</TableCell>
                    <TableCell className="text-sm text-zinc-500 whitespace-nowrap">{line.invoice || "—"}</TableCell>
                    <TableCell className="text-sm text-zinc-500 whitespace-nowrap">{line.paymentDate || "—"}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger render={
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg inline-flex items-center justify-center" />
                        }>
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4 text-zinc-500" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[140px]">
                          <DropdownMenuItem onClick={() => onEdit(line)} className="flex items-center gap-2 cursor-pointer py-2">
                            <Pencil className="h-4 w-4 text-zinc-400" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-rose-600 cursor-pointer py-2" onClick={() => onDelete(line.id)}>
                            <Trash className="h-4 w-4" />
                            <span>Eliminar</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/10">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Mostrando <span className="font-medium text-zinc-900 dark:text-zinc-100">{startIndex + 1}</span> a <span className="font-medium text-zinc-900 dark:text-zinc-100">{Math.min(endIndex, filtered.length)}</span> de <span className="font-medium text-zinc-900 dark:text-zinc-100">{filtered.length}</span> partidas
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="h-8 w-8 p-0">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 w-12 text-center">{currentPage} / {totalPages}</span>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="h-8 w-8 p-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
