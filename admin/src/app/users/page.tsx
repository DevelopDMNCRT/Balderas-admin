"use client"

import { useState } from "react"
import { UsersTable } from "@/components/users/users-table"
import { UserForm } from "@/components/users/user-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"

export type UserRole = "Administrador general BALDERAS" | "Ejecutivo de cuenta" | "Cliente" | "Proveedor"

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Ricardo Balderas",
    email: "ricardo@balderas.com",
    role: "Administrador general BALDERAS",
    createdAt: "01/07/2026",
  },
  {
    id: "2",
    name: "Ana García",
    email: "ana@balderas.com",
    role: "Ejecutivo de cuenta",
    createdAt: "01/07/2026",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [view, setView] = useState<"list" | "form">("list")
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const handleSave = (userData: any) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...userData, id: editingUser.id, createdAt: editingUser.createdAt } as User : u))
    } else {
      const today = new Date()
      const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`
      setUsers([{ ...userData, id: Math.random().toString(36).substr(2, 9), createdAt: formattedDate } as User, ...users])
    }
    setView("list")
    setEditingUser(null)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setView("form")
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.")) {
      setUsers(users.filter(u => u.id !== id))
    }
  }

  const handleOpenNew = () => {
    setEditingUser(null)
    setView("form")
  }

  if (view === "form") {
    return (
      <div className="space-y-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setView("list")} className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {editingUser ? "Editar Usuario" : "Registrar Nuevo Usuario"}
            </h1>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1 pl-10">
            {editingUser ? "Modifica los datos y permisos del usuario." : "Ingresa los datos para dar de alta un nuevo usuario en el sistema."}
          </p>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm w-full">
          <UserForm 
            initialData={editingUser} 
            onSubmitData={handleSave} 
            onCancel={() => setView("list")}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">Directorio de Usuarios</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1">
            Administra los usuarios del sistema, sus roles y accesos.
          </p>
        </div>
        
        <Button onClick={handleOpenNew} className="shadow-sm font-semibold h-10 px-4 gap-2 rounded-lg">
          <Plus className="h-4 w-4" /> Nuevo Usuario
        </Button>
      </div>

      <UsersTable 
        users={users} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  )
}
