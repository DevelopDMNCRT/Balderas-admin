"use client"

import { addDays, subDays } from "date-fns"
import { CalendarView, type CalendarEvent } from "@/components/calendar/calendar-view"

// Generate dates dynamically based on current date so it always shows data
const today = new Date()

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Pago Proveedor TV",
    date: addDays(today, -2),
    type: "pago",
    client: "Acme Corp",
    campaign: "Lanzamiento Verano",
    responsible: "Finanzas",
  },
  {
    id: "2",
    title: "Aprobación de Arte",
    date: addDays(today, -1),
    type: "aprobacion",
    client: "Tech Solutions",
    campaign: "B2B SaaS",
    responsible: "Ana Diseño",
  },
  {
    id: "3",
    title: "Post Facebook (Carrusel)",
    date: today,
    type: "publicacion",
    client: "Acme Corp",
    campaign: "Lanzamiento Verano",
    responsible: "CM María",
  },
  {
    id: "4",
    title: "Pauta Google Ads",
    date: today,
    type: "pauta",
    client: "Tech Solutions",
    campaign: "B2B SaaS",
    responsible: "Pedro Ads",
  },
  {
    id: "5",
    title: "Activación en Punto de Venta",
    date: addDays(today, 2),
    type: "activacion",
    client: "Acme Corp",
    campaign: "Lanzamiento Verano",
    responsible: "BTL Team",
  },
  {
    id: "6",
    title: "Spot Radio 30s",
    date: addDays(today, 3),
    type: "radio",
    client: "Acme Corp",
    campaign: "Lanzamiento Verano",
    responsible: "Medios",
  },
  {
    id: "7",
    title: "Entrega de Guiones TV",
    date: addDays(today, 5),
    type: "entrega",
    client: "Tech Solutions",
    campaign: "B2B SaaS",
    responsible: "Copywriting",
  },
  {
    id: "8",
    title: "Reporte Mensual Resultados",
    date: addDays(today, 10),
    type: "reporte",
    client: "Acme Corp",
    campaign: "General",
    responsible: "Data Team",
  },
  {
    id: "9",
    title: "Spot TV Estelar",
    date: addDays(today, 15),
    type: "tv",
    client: "Acme Corp",
    campaign: "Lanzamiento Verano",
    responsible: "Medios",
  }
]

export default function CalendarPage() {
  return (
    <div className="flex flex-col h-full gap-4 max-h-[calc(100vh-2rem)]">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">Calendario de Medios</h1>
        <p className="text-muted-foreground mt-1">
          Visualiza todas las campañas, pautas, fechas de entrega y pagos.
        </p>
      </div>
      
      <div className="flex-1 min-h-0 overflow-hidden pb-4">
        <CalendarView events={mockEvents} />
      </div>
    </div>
  )
}
