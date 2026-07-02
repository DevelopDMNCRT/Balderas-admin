"use client"

import * as React from "react"
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  addDays,
  subDays
} from "date-fns"
import { es } from "date-fns/locale"
import { ChevronLeft, ChevronRight, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type EventType = "pauta" | "publicacion" | "radio" | "tv" | "activacion" | "entrega" | "aprobacion" | "pago" | "reporte"

export interface CalendarEvent {
  id: string
  title: string
  date: Date
  type: EventType
  client: string
  campaign: string
  responsible: string
}

const typeStyles: Record<EventType, string> = {
  pauta: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  publicacion: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  radio: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
  tv: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
  activacion: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300 border-pink-200 dark:border-pink-800",
  entrega: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  aprobacion: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 border-orange-200 dark:border-orange-800",
  pago: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  reporte: "bg-slate-100 text-slate-700 dark:bg-slate-800/40 dark:text-slate-300 border-slate-200 dark:border-slate-700",
}

interface CalendarViewProps {
  events: CalendarEvent[]
}

export function CalendarView({ events }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [view, setView] = React.useState("mensual")
  
  // Filters
  const [clientFilter, setClientFilter] = React.useState("todos")
  const [campaignFilter, setCampaignFilter] = React.useState("todos")
  const [typeFilter, setTypeFilter] = React.useState("todos")
  const [responsibleFilter, setResponsibleFilter] = React.useState("todos")

  const handleNext = () => {
    if (view === "mensual") setCurrentDate(addMonths(currentDate, 1))
    else if (view === "semanal") setCurrentDate(addWeeks(currentDate, 1))
    else if (view === "diaria") setCurrentDate(addDays(currentDate, 1))
  }

  const handlePrev = () => {
    if (view === "mensual") setCurrentDate(subMonths(currentDate, 1))
    else if (view === "semanal") setCurrentDate(subWeeks(currentDate, 1))
    else if (view === "diaria") setCurrentDate(subDays(currentDate, 1))
  }

  // Calculate interval based on view
  let startDate = currentDate
  let endDate = currentDate
  let displayTitle = ""

  if (view === "mensual") {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    startDate = startOfWeek(monthStart)
    endDate = endOfWeek(monthEnd)
    
    const formatted = format(currentDate, "MMMM yyyy", { locale: es })
    displayTitle = formatted.charAt(0).toUpperCase() + formatted.slice(1)
  } else if (view === "semanal") {
    startDate = startOfWeek(currentDate)
    endDate = endOfWeek(currentDate)
    
    const startStr = format(startDate, "d", { locale: es })
    const endStr = format(endDate, "d 'de' MMMM yyyy", { locale: es })
    displayTitle = `Semana del ${startStr} al ${endStr}`
  } else if (view === "diaria") {
    const formatted = format(currentDate, "EEEE d 'de' MMMM yyyy", { locale: es })
    displayTitle = formatted.charAt(0).toUpperCase() + formatted.slice(1)
  }

  const days = view === "diaria" ? [currentDate] : eachDayOfInterval({
    start: startDate,
    end: endDate
  })

  const filteredEvents = events.filter(event => {
    if (clientFilter !== "todos" && event.client !== clientFilter) return false
    if (campaignFilter !== "todos" && event.campaign !== campaignFilter) return false
    if (typeFilter !== "todos" && event.type !== typeFilter) return false
    if (responsibleFilter !== "todos" && event.responsible !== responsibleFilter) return false
    return true
  })

  // Group events by date string
  const eventsByDate = filteredEvents.reduce((acc, event) => {
    const dateKey = format(event.date, "yyyy-MM-dd")
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(event)
    return acc
  }, {} as Record<string, CalendarEvent[]>)

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 rounded-xl border shadow-sm overflow-hidden">
      {/* Header and Filters */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between p-4 border-b gap-4 shrink-0">
        <div className="flex items-center gap-4 whitespace-nowrap shrink-0">
          <h2 className="text-xl font-bold tracking-tight">
            {displayTitle}
          </h2>
          <div className="flex items-center rounded-md border p-1 bg-zinc-50 dark:bg-zinc-900">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handlePrev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-3 text-xs" onClick={() => setCurrentDate(new Date())}>
              Hoy
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full scrollbar-hide">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mr-1 shrink-0">
            <Filter className="h-4 w-4" /> Filtros:
          </div>
          
          <Select value={clientFilter} onValueChange={(val) => val && setClientFilter(val)}>
            <SelectTrigger className="h-9 w-[110px] text-xs shrink-0">
              <SelectValue placeholder="Cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos (Cliente)</SelectItem>
              <SelectItem value="Acme Corp">Acme Corp</SelectItem>
              <SelectItem value="Tech Solutions">Tech Solutions</SelectItem>
            </SelectContent>
          </Select>

          <Select value={campaignFilter} onValueChange={(val) => val && setCampaignFilter(val)}>
            <SelectTrigger className="h-9 w-[110px] text-xs shrink-0">
              <SelectValue placeholder="Campaña" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas (Campaña)</SelectItem>
              <SelectItem value="Lanzamiento Verano">Lanzamiento Verano</SelectItem>
              <SelectItem value="B2B SaaS">B2B SaaS</SelectItem>
              <SelectItem value="General">General</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={(val) => val && setTypeFilter(val)}>
            <SelectTrigger className="h-9 w-[110px] text-xs shrink-0">
              <SelectValue placeholder="Canal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos (Canal)</SelectItem>
              <SelectItem value="pauta">Pauta Digital</SelectItem>
              <SelectItem value="publicacion">Publicaciones</SelectItem>
              <SelectItem value="radio">Spots de Radio</SelectItem>
              <SelectItem value="tv">Spots de TV</SelectItem>
              <SelectItem value="activacion">Activaciones</SelectItem>
              <SelectItem value="entrega">Entregables</SelectItem>
              <SelectItem value="aprobacion">Aprobaciones</SelectItem>
              <SelectItem value="pago">Pagos</SelectItem>
              <SelectItem value="reporte">Reportes</SelectItem>
            </SelectContent>
          </Select>

          <Select value={responsibleFilter} onValueChange={(val) => val && setResponsibleFilter(val)}>
            <SelectTrigger className="h-9 w-[110px] text-xs shrink-0">
              <SelectValue placeholder="Responsable" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos (Resp.)</SelectItem>
              <SelectItem value="Finanzas">Finanzas</SelectItem>
              <SelectItem value="Ana Diseño">Ana Diseño</SelectItem>
              <SelectItem value="CM María">CM María</SelectItem>
              <SelectItem value="Pedro Ads">Pedro Ads</SelectItem>
              <SelectItem value="BTL Team">BTL Team</SelectItem>
              <SelectItem value="Medios">Medios</SelectItem>
              <SelectItem value="Copywriting">Copywriting</SelectItem>
              <SelectItem value="Data Team">Data Team</SelectItem>
            </SelectContent>
          </Select>

          <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block shrink-0" />

          <Select value={view} onValueChange={(val) => val && setView(val as "mes" | "semana" | "dia")}>
            <SelectTrigger className="h-9 w-[100px] text-xs font-semibold shrink-0">
              <SelectValue placeholder="Vista" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mensual">Mensual</SelectItem>
              <SelectItem value="semanal">Semanal</SelectItem>
              <SelectItem value="diaria">Diaria</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Days Header */}
      <div className={cn(
        "grid border-b bg-zinc-50/50 dark:bg-zinc-900/20 shrink-0",
        view === "diaria" ? "grid-cols-1" : "grid-cols-7"
      )}>
        {(view === "diaria" ? [currentDate] : ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]).map((dayStr, idx) => (
          <div key={idx} className="py-2 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {typeof dayStr === "string" ? dayStr : format(dayStr, "EEEE", { locale: es })}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className={cn(
        "grid overflow-y-auto",
        view === "mensual" ? "flex-1" : "",
        view === "diaria" ? "grid-cols-1 grid-rows-1 flex-1" : "grid-cols-7",
        view === "semanal" ? "grid-rows-1" : "",
        view === "mensual" ? "auto-rows-[minmax(120px,auto)]" : ""
      )}>
        {days.map((day, i) => {
          const dateKey = format(day, "yyyy-MM-dd")
          const dayEvents = eventsByDate[dateKey] || []
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isToday = isSameDay(day, new Date())

          return (
            <div 
              key={day.toString()} 
              className={cn(
                "p-1.5 border-r border-b transition-colors flex flex-col gap-1 relative",
                view === "mensual" && "hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30",
                view === "semanal" && "min-h-[120px]",
                view === "diaria" && "p-6 min-h-[200px]",
                !isCurrentMonth && view === "mensual" && "bg-zinc-50/30 dark:bg-zinc-900/10 text-muted-foreground"
              )}
            >
              <div className="flex justify-between items-center px-1 mb-1 shrink-0">
                <span className={cn(
                  "font-medium flex items-center justify-center rounded-full",
                  view === "diaria" ? "h-12 w-12 text-xl" : "h-7 w-7 text-sm",
                  isToday && "bg-black text-white dark:bg-white dark:text-black",
                  !isCurrentMonth && !isToday && view === "mensual" && "text-muted-foreground/50"
                )}>
                  {format(day, "d")}
                </span>
              </div>
              
              <div className={cn(
                "flex-1 flex flex-col pr-1",
                view === "diaria" ? "gap-3" : "gap-1"
              )}>
                {dayEvents.length === 0 && view === "diaria" && (
                  <div className="text-muted-foreground text-center mt-10">
                    No hay eventos programados para este día.
                  </div>
                )}
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "shrink-0 px-2 py-1 leading-tight font-medium rounded-md border truncate transition-opacity cursor-default",
                      view === "diaria" ? "p-3 text-sm flex justify-between items-center" : "text-[10px] hover:opacity-80 cursor-pointer",
                      typeStyles[event.type]
                    )}
                    title={`${event.title} - ${event.client} (${event.responsible})`}
                  >
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-semibold truncate">{event.title}</span>
                      <span className={cn(
                        "opacity-80 truncate",
                        view === "diaria" ? "text-xs mt-1" : "text-[9px]"
                      )}>
                        {event.client} • {event.campaign}
                      </span>
                    </div>
                    {view === "diaria" && (
                      <div className="text-right flex flex-col items-end shrink-0 ml-4">
                        <span className="capitalize font-bold text-xs opacity-90">{event.type}</span>
                        <span className="text-xs opacity-80 mt-1">{event.responsible}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
