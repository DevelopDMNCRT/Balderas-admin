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
import { ExternalLink, MoreHorizontal, Pencil, Trash } from "lucide-react"
import type { ProductionFormValues } from "./production-form"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

export type ProductionItem = ProductionFormValues & { id: string }

interface ProductionTableProps {
  items: ProductionItem[]
  onEdit: (item: ProductionItem) => void
  onDelete: (id: string) => void
}

export function ProductionTable({ items, onEdit, onDelete }: ProductionTableProps) {

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Solicitado":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">Solicitado</Badge>
      case "En proceso":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800">En proceso</Badge>
      case "En revisión":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800">En revisión</Badge>
      case "Cambios solicitados":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">Cambios solicitados</Badge>
      case "Aprobado":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">Aprobado</Badge>
      case "Publicado":
        return <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">Publicado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="rounded-xl border bg-white dark:bg-zinc-950 shadow-sm overflow-hidden w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <TableHead className="font-semibold w-[250px]">Pieza Creativa</TableHead>
              <TableHead className="font-semibold">Responsable</TableHead>
              <TableHead className="font-semibold text-center">Tiempos</TableHead>
              <TableHead className="font-semibold text-center">Estatus</TableHead>
              <TableHead className="text-right font-semibold">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No hay entregables registrados.
                </TableCell>
              </TableRow>
            )}
            {items.map((item) => (
              <TableRow key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-900 dark:text-zinc-50 text-sm">
                      {item.tipoPieza}
                    </span>
                    <span className="text-xs text-muted-foreground mt-0.5">
                      {item.cliente} • {item.campana}
                    </span>
                    {(item.formato || item.medidas) && (
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 uppercase tracking-wider font-semibold">
                        {item.formato} {item.medidas ? `| ${item.medidas}` : ""}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                      {item.responsable.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{item.responsable}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col items-center justify-center text-xs space-y-1">
                    <div className="flex justify-between w-full max-w-[140px]">
                      <span className="text-muted-foreground">Solicitud:</span>
                      <span className="font-medium">{format(item.fechaSolicitud, "d MMM yyyy", { locale: es })}</span>
                    </div>
                    <div className="flex justify-between w-full max-w-[140px]">
                      <span className="text-muted-foreground">Entrega:</span>
                      <span className="font-medium">{format(item.fechaEntrega, "d MMM yyyy", { locale: es })}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    {getStatusBadge(item.estatus)}
                    {item.archivoFinal && (
                      <a 
                        href={item.archivoFinal} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 mt-1"
                      >
                        <ExternalLink className="h-3 w-3" /> Ver archivo
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
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
