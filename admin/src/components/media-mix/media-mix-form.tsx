"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const mediaMixFormSchema = z.object({
  campaignName: z.string().min(2, "La campaña es requerida."),
  mediaType: z.enum(["Online", "Offline"]),
  channel: z.string().min(1, "El canal es requerido."),
  provider: z.string().min(1, "El proveedor es requerido."),
  format: z.string().min(1, "El formato es requerido."),
  location: z.string().optional(),
  startDate: z.string().min(1, "Requerido"),
  endDate: z.string().min(1, "Requerido"),
  activeDays: z.coerce.number().min(1),
  schedule: z.string().optional(),
  insertions: z.coerce.number().min(1),
  unitCost: z.coerce.number().min(0),
  estimatedReach: z.coerce.number().min(0),
  realReach: z.coerce.number().min(0),
  objective: z.string().optional(),
  mainKpi: z.string().optional(),
  status: z.enum(["Planeación", "Activa", "Pausada", "Finalizada", "Cancelada"]),
  evidence: z.string().optional(),
  comments: z.string().optional(),
})

type MediaMixFormValues = z.infer<typeof mediaMixFormSchema>

const defaultValues: MediaMixFormValues = {
  campaignName: "",
  mediaType: "Online",
  channel: "",
  provider: "",
  format: "",
  location: "",
  startDate: "",
  endDate: "",
  activeDays: 1,
  schedule: "",
  insertions: 1,
  unitCost: 0,
  estimatedReach: 0,
  realReach: 0,
  objective: "",
  mainKpi: "",
  status: "Planeación",
  evidence: "",
  comments: "",
}

const ONLINE_CHANNELS = [
  "Meta Ads", "Google Ads", "TikTok Ads", "LinkedIn Ads", "YouTube Ads", 
  "Display", "Email marketing", "SEO", "Influencers", "WhatsApp", "Landing pages"
]

const OFFLINE_CHANNELS = [
  "Radio", "Televisión", "Espectaculares", "Vallas móviles", "Perifoneo", 
  "Volantes", "Prensa", "Revistas", "Activaciones", "Eventos", "Cine", 
  "Patrocinios", "Material POP"
]

interface MediaMixFormProps {
  initialData?: any
  onSubmitData: (data: MediaMixFormValues) => void
  onCancel?: () => void
}

export function MediaMixForm({ initialData, onSubmitData, onCancel }: MediaMixFormProps) {
  const form = useForm<MediaMixFormValues>({
    resolver: zodResolver(mediaMixFormSchema) as any,
    defaultValues: initialData || defaultValues,
  })

  const selectedMediaType = form.watch("mediaType")
  const currentChannels = selectedMediaType === "Online" ? ONLINE_CHANNELS : OFFLINE_CHANNELS

  // Live calculations
  const insertions = form.watch("insertions") || 0
  const unitCost = form.watch("unitCost") || 0
  const totalCost = insertions * unitCost

  // Reset channel if media type changes
  useEffect(() => {
    if (!initialData) {
      form.setValue("channel", "")
    }
  }, [selectedMediaType, form, initialData])

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    } else {
      form.reset(defaultValues)
    }
  }, [initialData, form])

  function onSubmit(values: MediaMixFormValues) {
    onSubmitData(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* 1. Clasificación del Medio */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg tracking-tight">1. Clasificación del Medio</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <FormField control={form.control} name="campaignName" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Campaña</FormLabel>
                <FormControl><Input placeholder="Nombre de la campaña" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mediaType" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Tipo de medio</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="Online">Online (Digital)</SelectItem>
                    <SelectItem value="Offline">Offline (Tradicional)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="channel" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Canal</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder={`Canal ${selectedMediaType}`} /></SelectTrigger></FormControl>
                  <SelectContent>
                    {currentChannels.map(ch => (
                      <SelectItem key={ch} value={ch}>{ch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        {/* 2. Pautaje y Temporalidad */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg tracking-tight">2. Pautaje y Temporalidad</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <FormField control={form.control} name="provider" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Proveedor</FormLabel>
                <FormControl><Input placeholder="Nombre del proveedor" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="format" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Formato</FormLabel>
                <FormControl><Input placeholder="Ej. Video 15s, Banner, Spot 20s" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="location" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Ubicación</FormLabel>
                <FormControl><Input placeholder="Ej. Av. Principal / Nacional" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="startDate" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Fecha inicio</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="endDate" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Fecha término</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="activeDays" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Días activos</FormLabel>
                <FormControl><Input type="number" min="1" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="schedule" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Horarios</FormLabel>
                <FormControl><Input placeholder="Ej. 08:00 - 20:00" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        {/* 3. Inversión e Impacto */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg tracking-tight">3. Inversión e Impacto</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <FormField control={form.control} name="insertions" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Cantidad de inserciones</FormLabel>
                <FormControl><Input type="number" min="1" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="unitCost" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Costo unitario ($)</FormLabel>
                <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="col-span-1 md:col-span-4 space-y-2">
              <FormLabel className="text-zinc-500 dark:text-zinc-400">Costo total ($)</FormLabel>
              <div className="flex h-10 w-full items-center rounded-lg border border-zinc-200/50 bg-zinc-50/50 dark:border-zinc-800/50 dark:bg-zinc-900/30 px-3 text-sm font-semibold text-zinc-500 cursor-not-allowed">
                {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(totalCost)}
              </div>
            </div>

            <FormField control={form.control} name="estimatedReach" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Alcance estimado</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="realReach" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Alcance real</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="objective" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Objetivo</FormLabel>
                <FormControl><Input placeholder="Ej. Generación de Leads" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mainKpi" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>KPI Principal</FormLabel>
                <FormControl><Input placeholder="Ej. CPL < $50" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        {/* 4. Seguimiento */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg tracking-tight">4. Seguimiento</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <FormField control={form.control} name="status" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Estatus</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Estatus" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {["Planeación", "Activa", "Pausada", "Finalizada", "Cancelada"].map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="evidence" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-8">
                <FormLabel>Evidencia</FormLabel>
                <FormControl><Input placeholder="URL del reporte o nombre de archivo" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="comments" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-12">
                <FormLabel>Comentarios</FormLabel>
                <FormControl><Textarea className="min-h-[100px]" placeholder="Observaciones adicionales..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-6 gap-4">
          {onCancel && (
            <div className="col-span-1 md:col-span-3">
              <Button type="button" variant="outline" className="w-full h-11" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          )}
          <div className="col-span-1 md:col-span-3">
            <Button type="submit" className="w-full h-11">
              {initialData ? "Guardar Cambios" : "Guardar Pauta"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
