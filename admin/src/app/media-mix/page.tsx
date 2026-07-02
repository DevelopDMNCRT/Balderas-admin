"use client"

import { useState } from "react"
import { MediaMixTable } from "@/components/media-mix/media-mix-table"
import { MediaMixForm } from "@/components/media-mix/media-mix-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"

export type MediaMixLine = {
  id: string
  campaignName: string
  mediaType: "Online" | "Offline"
  channel: string
  provider: string
  format: string
  location?: string
  startDate: string
  endDate: string
  activeDays: number
  schedule?: string
  insertions: number
  unitCost: number
  totalCost: number
  estimatedReach: number
  realReach: number
  objective?: string
  mainKpi?: string
  status: "Planeación" | "Activa" | "Pausada" | "Finalizada" | "Cancelada"
  evidence?: string
  comments?: string
}

const sampleLines: MediaMixLine[] = [
  {
    id: "1",
    campaignName: "Lanzamiento App Móvil",
    mediaType: "Online",
    channel: "Meta Ads",
    provider: "Meta Platforms",
    format: "Video 15s - Reels",
    location: "Nacional",
    startDate: "2026-07-01",
    endDate: "2026-07-31",
    activeDays: 31,
    schedule: "24/7",
    insertions: 1,
    unitCost: 50000,
    totalCost: 50000,
    estimatedReach: 500000,
    realReach: 542000,
    objective: "Descargas",
    mainKpi: "CPI < $15",
    status: "Activa",
    evidence: "link_al_reporte_meta.pdf",
    comments: "El formato Reels está trayendo el mejor CTR.",
  },
  {
    id: "2",
    campaignName: "Colección Verano",
    mediaType: "Offline",
    channel: "Espectaculares",
    provider: "Carteleras Nacionales",
    format: "Espectacular 12x4m",
    location: "Periférico Sur, CDMX",
    startDate: "2026-06-01",
    endDate: "2026-08-31",
    activeDays: 90,
    schedule: "24/7",
    insertions: 2,
    unitCost: 35000,
    totalCost: 70000,
    estimatedReach: 2000000,
    realReach: 0,
    objective: "Branding local",
    mainKpi: "Impactos visuales",
    status: "Planeación",
    comments: "Pendiente confirmación de la disponibilidad del segundo espacio.",
  }
]

export default function MediaMixPage() {
  const [lines, setLines] = useState<MediaMixLine[]>(sampleLines)
  const [view, setView] = useState<"list" | "form">("list")
  const [editingLine, setEditingLine] = useState<MediaMixLine | null>(null)

  const handleSave = (data: any) => {
    // Calculamos el costo total dinámicamente antes de guardar
    const completeData: MediaMixLine = {
      ...data,
      totalCost: data.insertions * data.unitCost,
    }

    if (editingLine) {
      setLines(lines.map(l => l.id === editingLine.id ? { ...completeData, id: editingLine.id } : l))
    } else {
      setLines([{ ...completeData, id: Math.random().toString(36).substr(2, 9) }, ...lines])
    }
    setView("list")
    setEditingLine(null)
  }

  const handleEdit = (line: MediaMixLine) => {
    setEditingLine(line)
    setView("form")
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta pauta? Esta acción no se puede deshacer.")) {
      setLines(lines.filter(l => l.id !== id))
    }
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
              {editingLine ? "Editar Pauta de Medios" : "Configurar Nueva Pauta"}
            </h1>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1 pl-10">
            {editingLine ? "Ajusta la programación, presupuesto y alcances de la pauta seleccionada." : "Registra un nuevo canal (online u offline) para distribuir el presupuesto."}
          </p>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm w-full">
          <MediaMixForm 
            initialData={editingLine} 
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
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">Mix de Medios</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1">
            Planea y visualiza la distribución de inversión entre canales Online y Offline.
          </p>
        </div>
        
        <Button onClick={() => { setEditingLine(null); setView("form") }} className="shadow-sm font-semibold h-10 px-4 gap-2 rounded-lg">
          <Plus className="h-4 w-4" /> Nueva Pauta
        </Button>
      </div>

      <MediaMixTable 
        lines={lines} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  )
}
