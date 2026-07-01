"use client"

import { useState } from "react"
import { ClientsTable } from "@/components/clients/clients-table"
import { ClientForm } from "@/components/clients/client-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"

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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const handleSave = (clientData: Omit<Client, "id">) => {
    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { ...clientData, id: editingClient.id } as Client : c))
    } else {
      setClients([{ ...clientData, id: Math.random().toString(36).substr(2, 9) } as Client, ...clients])
    }
    setIsDialogOpen(false)
    setEditingClient(null)
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este cliente? Esta acción no se puede deshacer.")) {
      setClients(clients.filter(c => c.id !== id))
    }
  }

  const handleOpenNew = () => {
    setEditingClient(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Directorio de Clientes</h1>
          <p className="text-muted-foreground mt-2">
            Administra los clientes, su presupuesto mensual y su estatus operativo.
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) setEditingClient(null)
        }}>
          <DialogTrigger render={<Button onClick={handleOpenNew} />}>
            <Plus className="mr-2 h-4 w-4" /> Nuevo Cliente
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{editingClient ? "Editar Cliente" : "Registrar Nuevo Cliente"}</DialogTitle>
              <DialogDescription>
                {editingClient ? "Modifica los datos del cliente seleccionado." : "Ingresa los datos base del cliente para agregarlo al ERP."}
              </DialogDescription>
            </DialogHeader>
            <ClientForm 
              initialData={editingClient} 
              onSubmitData={handleSave} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <ClientsTable 
        clients={clients} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  )
}
