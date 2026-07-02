"use client"

import { useState } from "react"
import { ResultsTable, type ResultsItem } from "@/components/results/results-table"
import { ResultsForm, type ResultsFormValues } from "@/components/results/results-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const sampleItems: ResultsItem[] = [
  {
    id: "res-1",
    campana: "Hot Sale 2026",
    medio: "Redes Sociales",
    canal: "Meta Ads (IG/FB)",
    tipoRegistro: "digital",
    inversion: 15000,
    alcance: 450000,
    impresiones: 890000,
    clics: 12500,
    ctr: 1.4,
    cpc: 1.2,
    cpm: 16.85,
    leads: 450,
    costoPorLead: 33.33,
    conversiones: 85,
    costoPorConversion: 176.47,
    ventas: 85,
    ingresos: 255000,
    roas: 17,
    roi: 1600,
    frecuencia: 1.97,
    engagement: 4500,
    mensajes: 120,
    whatsapps: 300,
    formularios: 150,
    llamadas: 12,
    diasActivos: 0,
    inserciones: 0,
    cuponesRedimidos: 0,
    qrEscaneados: 0,
    visitasSucursal: 0,
    costoImpacto: 0,
    costoVisita: 0,
    costoVenta: 0,
  },
  {
    id: "res-2",
    campana: "Hot Sale 2026",
    medio: "OOH",
    canal: "Espectacular Periférico",
    tipoRegistro: "offline",
    inversion: 35000,
    alcance: 1200000, // alcance estimado
    ubicacion: "Periférico Sur y Av. San Jerónimo",
    diasActivos: 30,
    inserciones: 1,
    cuponesRedimidos: 45,
    qrEscaneados: 120,
    llamadas: 15,
    visitasSucursal: 300,
    ventas: 12,
    costoImpacto: 0.029,
    costoVisita: 116.66,
    costoVenta: 2916.66,
    evidencias: "https://drive.google.com/...",
    observaciones: "Alto flujo vehicular, el QR fue difícil de escanear por la velocidad.",
    impresiones: 0, clics: 0, ctr: 0, cpc: 0, cpm: 0, leads: 0, costoPorLead: 0,
    conversiones: 0, costoPorConversion: 0, ingresos: 0, roas: 0, roi: 0,
    frecuencia: 0, engagement: 0, mensajes: 0, whatsapps: 0, formularios: 0,
  }
]

export default function ResultsPage() {
  const [items, setItems] = useState<ResultsItem[]>(sampleItems)
  const [view, setView] = useState<"list" | "form">("list")
  const [editingItem, setEditingItem] = useState<ResultsItem | null>(null)
  const [activeTab, setActiveTab] = useState<string>("digital")

  const handleSave = (data: ResultsFormValues) => {
    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item))
    } else {
      setItems([{ ...data, id: Math.random().toString(36).substr(2, 9) }, ...items])
    }
    setActiveTab(data.tipoRegistro)
    setView("list")
    setEditingItem(null)
  }

  const handleEdit = (item: ResultsItem) => {
    setEditingItem(item)
    setView("form")
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este registro de resultados?")) {
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
              {editingItem ? "Editar Resultados" : "Registrar Resultados"}
            </h1>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1 pl-10">
            Captura las métricas de desempeño de la campaña seleccionada.
          </p>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm w-full">
          <ResultsForm 
            initialData={editingItem} 
            onSubmitData={handleSave} 
            onCancel={() => setView("list")}
          />
        </div>
      </div>
    )
  }

  const digitalItems = items.filter(i => i.tipoRegistro === "digital")
  const offlineItems = items.filter(i => i.tipoRegistro === "offline")

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">Métricas y Resultados</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1">
            Mide el desempeño, retorno de inversión y alcance de todas tus campañas.
          </p>
        </div>
        
        <Button onClick={() => { setEditingItem(null); setView("form") }} className="shadow-sm font-semibold h-10 px-4 gap-2 rounded-lg shrink-0">
          <Plus className="h-4 w-4" /> Registrar Métricas
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="digital" className="px-8">Medios Digitales</TabsTrigger>
          <TabsTrigger value="offline" className="px-8">Medios Offline (BTL/OOH)</TabsTrigger>
        </TabsList>
        <TabsContent value="digital" className="mt-0">
          <ResultsTable 
            items={digitalItems} 
            tipo="digital"
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        </TabsContent>
        <TabsContent value="offline" className="mt-0">
          <ResultsTable 
            items={offlineItems} 
            tipo="offline"
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
