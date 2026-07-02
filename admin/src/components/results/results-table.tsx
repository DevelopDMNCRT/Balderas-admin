"use client"

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import type { ResultsFormValues } from "./results-form"

export type ResultsItem = ResultsFormValues & { id: string }

interface ResultsTableProps {
  items: ResultsItem[]
  tipo: "digital" | "offline"
  onEdit: (item: ResultsItem) => void
  onDelete: (id: string) => void
}

export function ResultsTable({ items, tipo, onEdit, onDelete }: ResultsTableProps) {
  const formatCurrency = (val: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val)
  const formatNumber = (val: number) => new Intl.NumberFormat('es-MX').format(val)
  const formatPercent = (val: number) => `${val.toFixed(2)}%`

  const getMetricBadge = (val: number, goodIsHigh = true, threshold = 0) => {
    if (val === 0) return <span>-</span>
    const isGood = goodIsHigh ? val > threshold : val < threshold
    if (isGood) return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{val.toFixed(2)}</Badge>
    return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{val.toFixed(2)}</Badge>
  }

  return (
    <div className="rounded-xl border bg-white dark:bg-zinc-950 shadow-sm overflow-hidden w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <TableHead className="font-semibold px-2 sm:px-4">Campaña / Medio</TableHead>
              <TableHead className="font-semibold text-right px-2 sm:px-4">Inversión</TableHead>
              
              {tipo === "digital" ? (
                <>
                  <TableHead className="font-semibold text-right px-2 sm:px-4">Alcance / Imp.</TableHead>
                  <TableHead className="font-semibold text-right px-2 sm:px-4">Clics / CTR</TableHead>
                  <TableHead className="font-semibold text-right px-2 sm:px-4">Leads / CPL</TableHead>
                  <TableHead className="font-semibold text-right px-2 sm:px-4">Ventas / CPA</TableHead>
                  <TableHead className="font-semibold text-right px-2 sm:px-4">Ingresos / Retorno</TableHead>
                </>
              ) : (
                <>
                  <TableHead className="font-semibold px-2 sm:px-4">Ubicación</TableHead>
                  <TableHead className="font-semibold text-right px-2 sm:px-4">Alcance Est.</TableHead>
                  <TableHead className="font-semibold text-right px-2 sm:px-4">Visitas / Llam.</TableHead>
                  <TableHead className="font-semibold text-right px-2 sm:px-4">Cupones / QR</TableHead>
                  <TableHead className="font-semibold text-right px-2 sm:px-4">Ventas / Costo</TableHead>
                </>
              )}
              
              <TableHead className="text-right font-semibold px-2 sm:px-4">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={tipo === "digital" ? 9 : 9} className="h-24 text-center text-muted-foreground">
                  No hay resultados {tipo} registrados.
                </TableCell>
              </TableRow>
            )}
            {items.map((item) => (
              <TableRow key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                <TableCell className="px-2 sm:px-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-900 dark:text-zinc-50 text-sm">{item.campana}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{item.medio} • {item.canal}</span>
                  </div>
                </TableCell>
                
                <TableCell className="text-right font-medium px-2 sm:px-4">
                  {formatCurrency(item.inversion)}
                </TableCell>

                {tipo === "digital" ? (
                  <>
                    <TableCell className="text-right px-2 sm:px-4">
                      <div className="flex flex-col text-sm">
                        <span>{formatNumber(item.alcance)} alc.</span>
                        <span className="text-xs text-muted-foreground">{formatNumber(item.impresiones)} imp.</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-2 sm:px-4">
                      <div className="flex flex-col text-sm">
                        <span>{formatNumber(item.clics)} clics</span>
                        <span className="text-xs text-muted-foreground">{item.ctr > 0 ? formatPercent(item.ctr) : "-"} CTR</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-2 sm:px-4">
                      <div className="flex flex-col text-sm">
                        <span>{formatNumber(item.leads)} leads</span>
                        <span className="text-xs text-muted-foreground">{item.costoPorLead > 0 ? `${formatCurrency(item.costoPorLead)} c/u` : "-"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-2 sm:px-4">
                      <div className="flex flex-col text-sm">
                        <span>{formatNumber(item.ventas)} ventas</span>
                        <span className="text-xs text-muted-foreground">{item.costoPorConversion > 0 ? `${formatCurrency(item.costoPorConversion)} c/u` : "-"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-2 sm:px-4">
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-medium text-emerald-600 dark:text-emerald-500">
                          {item.ingresos > 0 ? formatCurrency(item.ingresos) : "-"}
                        </span>
                        <div className="flex items-center gap-1 text-[10px]">
                          {item.roas > 0 && <span className="text-muted-foreground">{item.roas.toFixed(2)}x ROAS</span>}
                          {item.roi !== 0 && getMetricBadge(item.roi, true, 0)}
                        </div>
                      </div>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="px-2 sm:px-4">
                      <span className="text-sm truncate max-w-[150px] inline-block" title={item.ubicacion}>
                        {item.ubicacion || "-"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-sm px-2 sm:px-4">
                      {formatNumber(item.alcance)}
                    </TableCell>
                    <TableCell className="text-right px-2 sm:px-4">
                      <div className="flex flex-col text-sm">
                        <span>{formatNumber(item.visitasSucursal)} vis.</span>
                        <span className="text-xs text-muted-foreground">{formatNumber(item.llamadas)} llam.</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-2 sm:px-4">
                      <div className="flex flex-col text-sm">
                        <span>{formatNumber(item.cuponesRedimidos)} cup.</span>
                        <span className="text-xs text-muted-foreground">{formatNumber(item.qrEscaneados)} QR</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-2 sm:px-4">
                      <div className="flex flex-col text-sm">
                        <span>{formatNumber(item.ventas)} ventas</span>
                        <span className="text-xs text-muted-foreground">
                          {item.costoVenta > 0 ? `${formatCurrency(item.costoVenta)} c/u` : "-"}
                        </span>
                      </div>
                    </TableCell>
                  </>
                )}

                <TableCell className="text-right px-2 sm:px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button variant="ghost" className="h-9 w-9 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors inline-flex items-center justify-center" />
                    }>
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[140px]">
                      <DropdownMenuItem onClick={() => onEdit(item)} className="flex items-center gap-2 cursor-pointer py-2">
                        <Pencil className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 text-rose-600 dark:text-rose-400 cursor-pointer py-2 hover:bg-rose-50 dark:hover:bg-rose-950/20" onClick={() => onDelete(item.id)}>
                        <Trash className="h-4 w-4" />
                        <span>Eliminar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  )
}
