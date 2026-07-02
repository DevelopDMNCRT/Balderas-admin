"use client"

import { useState } from "react"
import { CampaignsTable } from "@/components/campaigns/campaigns-table"
import { CampaignForm } from "@/components/campaigns/campaign-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"

export type Campaign = {
  id: string
  clientName: string
  name: string
  objective: string
  startDate: string
  endDate: string
  internalOwner: string
  authorizedBudget: number
  exercisedBudget: number
  availableBudget: number
  status: string
  targetAudience?: string
  cities?: string
  segmentation?: string
  mainMessage?: string
  callToAction?: string
  strategicNotes?: string
}

const initialCampaigns: Campaign[] = [
  {
    id: "1",
    clientName: "Tech Solutions Inc.",
    name: "Lanzamiento App Móvil",
    objective: "Lanzamiento",
    startDate: "2026-07-01",
    endDate: "2026-08-15",
    internalOwner: "Ana García",
    authorizedBudget: 150000,
    exercisedBudget: 45000,
    availableBudget: 105000,
    status: "Activa",
    targetAudience: "Usuarios de iOS y Android",
    cities: "CDMX, GDL, MTY",
  },
  {
    id: "2",
    clientName: "Boutique Elegance",
    name: "Colección Verano",
    objective: "Ventas",
    startDate: "2026-06-15",
    endDate: "2026-07-30",
    internalOwner: "Ricardo Balderas",
    authorizedBudget: 80000,
    exercisedBudget: 75000,
    availableBudget: 5000,
    status: "En producción",
    targetAudience: "Mujeres 25-45 años",
  }
]

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns)
  const [view, setView] = useState<"list" | "form">("list")
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)

  const handleSave = (data: any) => {
    // Calculamos el presupuesto disponible antes de guardar
    const completeData = {
      ...data,
      availableBudget: data.authorizedBudget - data.exercisedBudget
    }

    if (editingCampaign) {
      setCampaigns(campaigns.map(c => c.id === editingCampaign.id ? { ...completeData, id: editingCampaign.id } as Campaign : c))
    } else {
      setCampaigns([{ ...completeData, id: Math.random().toString(36).substr(2, 9) } as Campaign, ...campaigns])
    }
    setView("list")
    setEditingCampaign(null)
  }

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign)
    setView("form")
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta campaña? Esta acción no se puede deshacer.")) {
      setCampaigns(campaigns.filter(c => c.id !== id))
    }
  }

  const handleOpenNew = () => {
    setEditingCampaign(null)
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
              {editingCampaign ? "Editar Campaña" : "Crear Nueva Campaña"}
            </h1>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1 pl-10">
            {editingCampaign ? "Modifica los detalles, presupuesto y estrategia de la campaña." : "Configura los parámetros, presupuesto y objetivos de la nueva campaña."}
          </p>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm w-full">
          <CampaignForm 
            initialData={editingCampaign} 
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
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">Gestión de Campañas</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1">
            Administra presupuestos, fechas, estrategias y rendimiento de todas las campañas activas.
          </p>
        </div>
        
        <Button onClick={handleOpenNew} className="shadow-sm font-semibold h-10 px-4 gap-2 rounded-lg">
          <Plus className="h-4 w-4" /> Nueva Campaña
        </Button>
      </div>

      <CampaignsTable 
        campaigns={campaigns} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  )
}
