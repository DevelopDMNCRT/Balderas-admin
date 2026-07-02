"use client"

import { useState } from "react"
import { ClientsTable } from "@/components/clients/clients-table"
import { ClientForm } from "@/components/clients/client-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
export type Client = {
  id: string
  name: string
  legalName: string
  industry: string
  city: string
  state: string
  contact: string
  phone: string
  email: string
  monthlyBudget: string
  annualBudget: string
  marketingObjective: string
  branches?: string
  socialMedia?: string
  website?: string
  notes?: string
  status: "activo" | "pausado" | "inactivo"
}

const initialClients: Client[] = [
  {
    id: "1",
    name: "Acme Corp",
    legalName: "Acme de México S.A.",
    industry: "Tecnología",
    city: "CDMX",
    state: "CDMX",
    contact: "Juan Pérez",
    phone: "5551234567",
    email: "juan@acme.com",
    monthlyBudget: "120000",
    annualBudget: "1440000",
    marketingObjective: "Generación de leads",
    status: "activo",
  },
  {
    id: "2",
    name: "Tech Solutions",
    legalName: "Tech Solutions SA de CV",
    industry: "Consultoría",
    city: "Monterrey",
    state: "Nuevo León",
    contact: "María Gómez",
    phone: "8123456789",
    email: "maria@techsol.com",
    monthlyBudget: "85000",
    annualBudget: "1020000",
    marketingObjective: "Branding",
    status: "activo",
  },
]

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [view, setView] = useState<"list" | "form">("list")
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const handleSave = (clientData: Omit<Client, "id">) => {
    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { ...clientData, id: editingClient.id } as Client : c))
    } else {
      setClients([{ ...clientData, id: Math.random().toString(36).substr(2, 9) } as Client, ...clients])
    }
    setView("list")
    setEditingClient(null)
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setView("form")
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este cliente? Esta acción no se puede deshacer.")) {
      setClients(clients.filter(c => c.id !== id))
    }
  }

  const handleOpenNew = () => {
    setEditingClient(null)
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
              {editingClient ? "Editar Cliente" : "Registrar Nuevo Cliente"}
            </h1>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1 pl-10">
            {editingClient ? "Modifica los datos del cliente seleccionado." : "Ingresa los datos base del cliente para agregarlo al ERP."}
          </p>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm w-full">
          <ClientForm 
            initialData={editingClient} 
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
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">Directorio de Clientes</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1">
            Administra los clientes, su presupuesto mensual y su estatus operativo.
          </p>
        </div>
        
        <Button onClick={handleOpenNew} className="shadow-sm font-semibold h-10 px-4 gap-2 rounded-lg">
          <Plus className="h-4 w-4" /> Nuevo Cliente
        </Button>
      </div>

      <ClientsTable 
        clients={clients} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  )
}
