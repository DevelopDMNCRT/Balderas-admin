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
import { MoreHorizontal, Pencil, Trash, ChevronLeft, ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { User } from "@/app/users/page"
import { cn } from "@/lib/utils"

interface UsersTableProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (id: string) => void
}

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentUsers = users.slice(startIndex, endIndex)

  return (
    <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden transition-all duration-200">
      <Table>
        <TableHeader className="bg-zinc-50/55 dark:bg-zinc-900/30 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <TableRow>
            <TableHead className="font-semibold px-6">Nombre</TableHead>
            <TableHead className="font-semibold">Correo</TableHead>
            <TableHead className="font-semibold">Fecha de Alta</TableHead>
            <TableHead className="font-semibold">Rol</TableHead>
            <TableHead className="w-[80px] font-semibold text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-28 text-center text-zinc-400 dark:text-zinc-500">
                No hay usuarios registrados.
              </TableCell>
            </TableRow>
          ) : (
            currentUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/10 transition-colors">
                <TableCell className="font-bold text-zinc-900 dark:text-zinc-50 px-6 text-sm lg:text-base">
                  {user.name}
                </TableCell>
                <TableCell className="text-zinc-500 dark:text-zinc-400 text-sm">
                  {user.email}
                </TableCell>
                <TableCell className="text-zinc-600 dark:text-zinc-300 text-sm">
                  {user.createdAt}
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors select-none",
                    user.role === "Administrador general BALDERAS" && "bg-blue-50/70 text-blue-700 border-blue-200/60 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800/40",
                    user.role === "Ejecutivo de cuenta" && "bg-violet-50/70 text-violet-700 border-violet-200/60 dark:bg-violet-950/20 dark:text-violet-400 dark:border-violet-800/40",
                    user.role === "Cliente" && "bg-emerald-50/70 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800/40",
                    user.role === "Proveedor" && "bg-amber-50/70 text-amber-700 border-amber-200/60 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800/40"
                  )}>
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button variant="ghost" className="h-9 w-9 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors inline-flex items-center justify-center" />
                    }>
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[140px]">
                      <DropdownMenuItem onClick={() => onEdit(user)} className="flex items-center gap-2 cursor-pointer py-2">
                        <Pencil className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 text-rose-600 dark:text-rose-400 cursor-pointer py-2 hover:bg-rose-50 dark:hover:bg-rose-950/20" onClick={() => onDelete(user.id)}>
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
            Mostrando <span className="font-medium text-zinc-900 dark:text-zinc-100">{startIndex + 1}</span> a <span className="font-medium text-zinc-900 dark:text-zinc-100">{Math.min(endIndex, users.length)}</span> de <span className="font-medium text-zinc-900 dark:text-zinc-100">{users.length}</span> resultados
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 w-12 text-center">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
