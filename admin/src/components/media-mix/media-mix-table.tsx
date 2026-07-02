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
import { MoreHorizontal, Pencil, Trash, ChevronLeft, ChevronRight, Globe, Radio } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { MediaMixLine } from "@/app/media-mix/page"
import { cn } from "@/lib/utils"

interface MediaMixTableProps {
  lines: MediaMixLine[]
  onEdit: (line: MediaMixLine) => void
  onDelete: (id: string) => void
}

const fmt = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n)

export function MediaMixTable({ lines, onEdit, onDelete }: MediaMixTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  const totalPages = Math.max(1, Math.ceil(lines.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const current = lines.slice(startIndex, endIndex)

  return (
    <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden transition-all duration-200">
      <Table>
        <TableHeader className="bg-zinc-50/55 dark:bg-zinc-900/30 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <TableRow>
            <TableHead className="font-semibold px-2 sm:px-4 whitespace-normal min-w-[120px]">Campaña</TableHead>
            <TableHead className="font-semibold px-2 sm:px-4 whitespace-normal">Medio / Canal</TableHead>
            <TableHead className="font-semibold px-2 sm:px-4 whitespace-normal">Proveedor</TableHead>
            <TableHead className="font-semibold px-2 sm:px-4 whitespace-normal">Fechas</TableHead>
            <TableHead className="font-semibold text-right px-2 sm:px-4 whitespace-normal">Costo Total</TableHead>
            <TableHead className="font-semibold text-right px-2 sm:px-4 whitespace-normal">Alcance (Real / Est.)</TableHead>
            <TableHead className="font-semibold px-2 sm:px-4 whitespace-normal">Estatus</TableHead>
            <TableHead className="w-[80px] font-semibold text-center px-2 sm:px-4 whitespace-normal">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lines.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-28 text-center text-zinc-400 dark:text-zinc-500">
                No hay pautas de medios registradas.
              </TableCell>
            </TableRow>
          ) : (
            current.map((line) => (
              <TableRow key={line.id} className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/10 transition-colors">
                <TableCell className="font-bold text-zinc-900 dark:text-zinc-50 px-2 sm:px-4 text-sm whitespace-normal">
                  {line.campaignName}
                </TableCell>
                <TableCell className="px-2 sm:px-4 whitespace-normal">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 font-semibold text-sm">
                      {line.mediaType === "Online" ? <Globe className="h-3.5 w-3.5 text-blue-500 shrink-0" /> : <Radio className="h-3.5 w-3.5 text-orange-500 shrink-0" />}
                      {line.mediaType}
                    </div>
                    <span className="text-zinc-500 dark:text-zinc-400 text-xs font-medium pl-5">{line.channel}</span>
                  </div>
                </TableCell>
                <TableCell className="text-zinc-700 dark:text-zinc-300 text-sm px-2 sm:px-4 whitespace-normal">
                  {line.provider}
                </TableCell>
                <TableCell className="px-2 sm:px-4 whitespace-normal">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">Del: {line.startDate || "—"}</span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">Al: {line.endDate || "—"}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold text-zinc-900 dark:text-zinc-100 text-sm px-2 sm:px-4 whitespace-normal">
                  {fmt(line.totalCost)}
                </TableCell>
                <TableCell className="text-right px-2 sm:px-4 whitespace-normal">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{new Intl.NumberFormat('es-MX').format(line.realReach)}</span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 line-through">{new Intl.NumberFormat('es-MX').format(line.estimatedReach)}</span>
                  </div>
                </TableCell>
                <TableCell className="px-2 sm:px-4 whitespace-normal">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors select-none",
                    line.status === "Planeación" && "bg-slate-50/70 text-slate-700 border-slate-200/60 dark:bg-slate-950/20 dark:text-slate-400 dark:border-slate-800/40",
                    line.status === "Activa" && "bg-emerald-50/70 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800/40",
                    line.status === "Pausada" && "bg-amber-50/70 text-amber-700 border-amber-200/60 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800/40",
                    line.status === "Finalizada" && "bg-blue-50/70 text-blue-700 border-blue-200/60 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800/40",
                    line.status === "Cancelada" && "bg-rose-50/70 text-rose-700 border-rose-200/60 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-800/40"
                  )}>
                    <span className={cn(
                      "h-1.5 w-1.5 rounded-full shrink-0",
                      line.status === "Activa" ? "animate-pulse" : "",
                      line.status === "Planeación" && "bg-slate-500 dark:bg-slate-400",
                      line.status === "Activa" && "bg-emerald-500 dark:bg-emerald-400",
                      line.status === "Pausada" && "bg-amber-500 dark:bg-amber-400",
                      line.status === "Finalizada" && "bg-blue-500 dark:bg-blue-400",
                      line.status === "Cancelada" && "bg-rose-500 dark:bg-rose-400"
                    )} />
                    {line.status}
                  </span>
                </TableCell>
                <TableCell className="text-center px-2 sm:px-4 whitespace-normal">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button variant="ghost" className="h-9 w-9 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors inline-flex items-center justify-center" />
                    }>
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[140px]">
                      <DropdownMenuItem onClick={() => onEdit(line)} className="flex items-center gap-2 cursor-pointer py-2">
                        <Pencil className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 text-rose-600 dark:text-rose-400 cursor-pointer py-2 hover:bg-rose-50 dark:hover:bg-rose-950/20" onClick={() => onDelete(line.id)}>
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
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/10">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Mostrando <span className="font-medium text-zinc-900 dark:text-zinc-100">{startIndex + 1}</span> a <span className="font-medium text-zinc-900 dark:text-zinc-100">{Math.min(endIndex, lines.length)}</span> de <span className="font-medium text-zinc-900 dark:text-zinc-100">{lines.length}</span> pautas
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 w-12 text-center">
              {currentPage} / {totalPages}
            </span>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="h-8 w-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
