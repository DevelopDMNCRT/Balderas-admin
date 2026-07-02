"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { EvidenceGrid, type EvidenceItem } from "@/components/evidence/evidence-grid"

const mockEvidences: EvidenceItem[] = [
  { id: "ev-1", name: "Espectacular Periférico Sur", type: "Fotografías", campaign: "Hot Sale 2026", medium: "OOH (Exterior)", date: "01 Jul 2026", url: "https://drive.google.com/...", size: "2.4 MB" },
  { id: "ev-2", name: "Factura Meta Ads - Junio", type: "Facturas", campaign: "Lanzamiento App", medium: "Meta Ads", date: "30 Jun 2026", url: "https://drive.google.com/...", size: "125 KB" },
  { id: "ev-3", name: "Contrato Influencers GDL", type: "Contratos", campaign: "Hot Sale 2026", medium: "Influencers", date: "15 Jun 2026", url: "https://drive.google.com/...", size: "1.1 MB" },
  { id: "ev-4", name: "Spot Comercial 30s", type: "Videos", campaign: "Campaña Navidad", medium: "TV / Radio", date: "10 Dic 2025", url: "https://vimeo.com/...", size: "45 MB" },
  { id: "ev-5", name: "Landing Page Captación", type: "Links de landing pages", campaign: "Lanzamiento App", medium: "Google Ads", date: "02 Jul 2026", url: "https://landing.cliente.com" },
  { id: "ev-6", name: "Reporte Mensual Analytics", type: "Reportes", campaign: "Hot Sale 2026", medium: "Digital", date: "05 Jul 2026", url: "https://drive.google.com/...", size: "5.4 MB" },
  { id: "ev-7", name: "Comprobante Transferencia Vendor", type: "Comprobantes de pago", campaign: "Hot Sale 2026", medium: "OOH (Exterior)", date: "10 Jun 2026", url: "https://drive.google.com/...", size: "300 KB" },
  { id: "ev-8", name: "Master Graphic Redes Sociales", type: "Artes finales", campaign: "Lanzamiento App", medium: "Meta Ads", date: "28 Jun 2026", url: "https://figma.com/...", size: "18 MB" },
  { id: "ev-9", name: "Reel de TikTok Orgánico", type: "Links de publicaciones", campaign: "Campaña Navidad", medium: "Redes Sociales", date: "20 Dic 2025", url: "https://tiktok.com/..." },
  { id: "ev-10", name: "Screenshot Configuración Pauta", type: "Capturas de pantalla", campaign: "Lanzamiento App", medium: "Meta Ads", date: "01 Jul 2026", url: "https://drive.google.com/...", size: "850 KB" },
  { id: "ev-11", name: "Brief de Cotización Producción", type: "Cotizaciones", campaign: "Campaña Navidad", medium: "Producción Audiovisual", date: "05 Nov 2025", url: "https://drive.google.com/...", size: "450 KB" },
  { id: "ev-12", name: "Anuncio de Búsqueda Google", type: "Links de anuncios", campaign: "Lanzamiento App", medium: "Google Ads", date: "15 Jun 2026", url: "https://google.com/..." },
  { id: "ev-13", name: "Folleto Promocional PDF", type: "PDFs", campaign: "Hot Sale 2026", medium: "BTL", date: "01 Jun 2026", url: "https://drive.google.com/...", size: "3.2 MB" },
]

export default function EvidencePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = mockEvidences.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6 shrink-0">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Repositorio de Evidencias
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1">
            Gestiona comprobantes, artes finales y documentos legales de todas tus campañas.
          </p>
        </div>
        
        <Link href="/evidence/new">
          <Button className="shadow-sm font-semibold h-10 px-4 gap-2 rounded-lg shrink-0">
            <Plus className="h-4 w-4" />
            Nueva Evidencia
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between shrink-0">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por nombre, campaña o tipo..." 
            className="pl-9 bg-white dark:bg-zinc-950"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 pb-8">
        {filteredItems.length > 0 ? (
          <EvidenceGrid items={filteredItems} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50 border-dashed">
            <Search className="h-10 w-10 text-zinc-300 mb-4" />
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">No se encontraron archivos</h3>
            <p className="text-zinc-500 max-w-sm mt-1">Prueba usando otros términos de búsqueda o sube una nueva evidencia.</p>
          </div>
        )}
      </div>
    </div>
  )
}
