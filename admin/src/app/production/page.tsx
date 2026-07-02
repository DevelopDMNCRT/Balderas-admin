"use client"

import { useState } from "react"
import { ProductionTable, type ProductionItem } from "@/components/production/production-table"
import { ProductionForm, type ProductionFormValues } from "@/components/production/production-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"

const sampleItems: ProductionItem[] = [
  {
    id: "prod-1",
    cliente: "Acme Corp",
    campana: "Lanzamiento Verano",
    tipoPieza: "Diseño gráfico",
    formato: "JPG",
    medidas: "1080x1080px",
    responsable: "Ana Diseño",
    fechaSolicitud: new Date(2026, 6, 1), // 1 de julio
    fechaEntrega: new Date(2026, 6, 5), // 5 de julio
    estatus: "Aprobado",
    archivoFinal: "https://figma.com/file/xyz",
    comentarios: "Aprobado por cliente sin cambios.",
    historialCambios: "01/Jul: Solicitud recibida.\n03/Jul: Envío V1.\n04/Jul: Aprobado.",
  },
  {
    id: "prod-2",
    cliente: "Tech Solutions",
    campana: "B2B SaaS",
    tipoPieza: "Video",
    formato: "MP4",
    medidas: "1920x1080px (60s)",
    responsable: "Carlos Video",
    fechaSolicitud: new Date(2026, 6, 2),
    fechaEntrega: new Date(2026, 6, 10),
    estatus: "En revisión",
    comentarios: "Esperando feedback del director de marketing.",
    historialCambios: "02/Jul: Inicio de grabación.\n08/Jul: Envío corte preliminar.",
  },
  {
    id: "prod-3",
    cliente: "Acme Corp",
    campana: "Lanzamiento Verano",
    tipoPieza: "Audio para radio",
    formato: "MP3",
    medidas: "20 segundos",
    responsable: "Estudio Audio",
    fechaSolicitud: new Date(2026, 6, 10),
    fechaEntrega: new Date(2026, 6, 15),
    estatus: "Solicitado",
    comentarios: "Se requiere locutor voz grave.",
  }
]

export default function ProductionPage() {
  const [items, setItems] = useState<ProductionItem[]>(sampleItems)
  const [view, setView] = useState<"list" | "form">("list")
  const [editingItem, setEditingItem] = useState<ProductionItem | null>(null)

  const handleSave = (data: ProductionFormValues) => {
    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item))
    } else {
      setItems([{ ...data, id: Math.random().toString(36).substr(2, 9) }, ...items])
    }
    setView("list")
    setEditingItem(null)
  }

  const handleEdit = (item: ProductionItem) => {
    setEditingItem(item)
    setView("form")
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este entregable creativo? Esta acción no se puede deshacer.")) {
      setItems(items.filter(i => i.id !== id))
    }
  }

  if (view === "form") {
    return (
      <div className="space-y-8 max-w-5xl">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setView("list")} className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {editingItem ? "Editar Entregable" : "Nuevo Entregable Creativo"}
            </h1>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1 pl-10">
            {editingItem ? "Actualiza el estatus, archivos o historial de cambios de la pieza." : "Registra una nueva pieza solicitada a producción."}
          </p>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm w-full">
          <ProductionForm 
            initialData={editingItem} 
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
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">Control de Producción</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1">
            Administra los entregables creativos, diseños, videos y copys.
          </p>
        </div>
        
        <Button onClick={() => { setEditingItem(null); setView("form") }} className="shadow-sm font-semibold h-10 px-4 gap-2 rounded-lg shrink-0">
          <Plus className="h-4 w-4" /> Nueva Pieza
        </Button>
      </div>

      <ProductionTable 
        items={items} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  )
}
