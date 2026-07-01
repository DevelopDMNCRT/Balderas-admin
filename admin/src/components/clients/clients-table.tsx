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
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Client } from "@/app/clients/page"

interface ClientsTableProps {
  clients: Client[]
  onEdit: (client: Client) => void
  onDelete: (id: string) => void
}

export function ClientsTable({ clients, onEdit, onDelete }: ClientsTableProps) {
  return (
    <div className="rounded-md border bg-white dark:bg-zinc-950 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre Comercial</TableHead>
            <TableHead className="hidden md:table-cell">Razón Social</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead className="hidden lg:table-cell">Ciudad</TableHead>
            <TableHead>Presupuesto Mensual</TableHead>
            <TableHead>Estatus</TableHead>
            <TableHead className="w-[80px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                No hay clientes registrados.
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{client.legalName}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{client.contact}</span>
                    <span className="text-xs text-muted-foreground">{client.email}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{client.city}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(client.monthlyBudget))}
                </TableCell>
                <TableCell>
                  <Badge variant={client.status === "activo" ? "default" : client.status === "pausado" ? "secondary" : "destructive"} className="capitalize">
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(client)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => onDelete(client.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Eliminar
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
  )
}
