"use client"

import { useEffect } from "react"
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

const campaignFormSchema = z.object({
  clientName: z.string().min(2, { message: "El cliente es requerido." }),
  name: z.string().min(2, { message: "El nombre es requerido." }),
  objective: z.enum([
    "Branding", "Leads", "Ventas", "Tráfico a sucursal", 
    "Lanzamiento", "Posicionamiento", "Promoción", 
    "Remarketing", "Evento", "Temporada especial"
  ]),
  startDate: z.string().min(1, { message: "Fecha de inicio es requerida." }),
  endDate: z.string().min(1, { message: "Fecha de término es requerida." }),
  internalOwner: z.string().min(2, { message: "El responsable es requerido." }),
  authorizedBudget: z.coerce.number().min(0),
  exercisedBudget: z.coerce.number().min(0),
  status: z.enum(["Planeación", "En producción", "Activa", "Pausada", "Finalizada", "Cancelada"]),
  targetAudience: z.string().optional(),
  cities: z.string().optional(),
  segmentation: z.string().optional(),
  mainMessage: z.string().optional(),
  callToAction: z.string().optional(),
  strategicNotes: z.string().optional(),
})

type CampaignFormValues = z.infer<typeof campaignFormSchema>

const defaultValues: CampaignFormValues = {
  clientName: "",
  name: "",
  objective: "Branding",
  startDate: "",
  endDate: "",
  internalOwner: "",
  authorizedBudget: 0,
  exercisedBudget: 0,
  status: "Planeación",
  targetAudience: "",
  cities: "",
  segmentation: "",
  mainMessage: "",
  callToAction: "",
  strategicNotes: "",
}

interface CampaignFormProps {
  initialData?: any
  onSubmitData: (data: CampaignFormValues) => void
  onCancel?: () => void
}

export function CampaignForm({ initialData, onSubmitData, onCancel }: CampaignFormProps) {
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: initialData || defaultValues,
  })

  // Calculate available budget dynamically based on form fields
  const authorized = form.watch("authorizedBudget") || 0
  const exercised = form.watch("exercisedBudget") || 0
  const availableBudget = authorized - exercised

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    } else {
      form.reset(defaultValues)
    }
  }, [initialData, form])

  function onSubmit(values: CampaignFormValues) {
    onSubmitData(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        {/* 1. Información General */}
        <div className="space-y-4">
          <h3 className="font-semibold leading-none tracking-tight text-lg">1. Información General</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <FormField control={form.control} name="clientName" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Cliente</FormLabel>
                <FormControl><Input placeholder="Nombre del cliente" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Nombre de campaña</FormLabel>
                <FormControl><Input placeholder="Ej. Hot Sale 2026" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="objective" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Objetivo de campaña</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Selecciona objetivo" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {["Branding", "Leads", "Ventas", "Tráfico a sucursal", "Lanzamiento", "Posicionamiento", "Promoción", "Remarketing", "Evento", "Temporada especial"].map(obj => (
                      <SelectItem key={obj} value={obj}>{obj}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        {/* 2. Fechas y Responsabilidad */}
        <div className="space-y-4">
          <h3 className="font-semibold leading-none tracking-tight text-lg">2. Fechas y Responsabilidad</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <FormField control={form.control} name="startDate" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Fecha de inicio</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="endDate" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Fecha de término</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="internalOwner" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Responsable interno</FormLabel>
                <FormControl><Input placeholder="Nombre del responsable" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        {/* 3. Presupuesto y Estatus */}
        <div className="space-y-4">
          <h3 className="font-semibold leading-none tracking-tight text-lg">3. Presupuesto y Estatus</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <FormField control={form.control} name="authorizedBudget" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Presupuesto Autorizado ($)</FormLabel>
                <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="exercisedBudget" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Presupuesto Ejercido ($)</FormLabel>
                <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
            <div className="col-span-1 md:col-span-3 space-y-2">
              <FormLabel className="text-zinc-500 dark:text-zinc-400">Presupuesto Disponible ($)</FormLabel>
              <div className="flex h-10 w-full items-center rounded-lg border border-zinc-200/50 bg-zinc-50/50 dark:border-zinc-800/50 dark:bg-zinc-900/30 px-3 py-2 text-sm text-zinc-500 font-medium cursor-not-allowed">
                {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(availableBudget)}
              </div>
            </div>

            <FormField control={form.control} name="status" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Estatus</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Estatus" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {["Planeación", "En producción", "Activa", "Pausada", "Finalizada", "Cancelada"].map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        {/* 4. Segmentación y Alcance */}
        <div className="space-y-4">
          <h3 className="font-semibold leading-none tracking-tight text-lg">4. Segmentación y Alcance</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <FormField control={form.control} name="targetAudience" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Público objetivo</FormLabel>
                <FormControl><Input placeholder="Ej. Jóvenes 18-25 años" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="cities" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Ciudades</FormLabel>
                <FormControl><Input placeholder="Ej. CDMX, Monterrey" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="segmentation" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Segmentación (Intereses)</FormLabel>
                <FormControl><Input placeholder="Ej. Tecnología, Compras" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        {/* 5. Contenido y Estrategia */}
        <div className="space-y-4">
          <h3 className="font-semibold leading-none tracking-tight text-lg">5. Contenido y Estrategia</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <FormField control={form.control} name="mainMessage" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-6">
                <FormLabel>Mensaje principal</FormLabel>
                <FormControl><Textarea className="min-h-[100px]" placeholder="El mensaje central de la campaña..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="callToAction" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-6">
                <FormLabel>Call to action (CTA)</FormLabel>
                <FormControl><Textarea className="min-h-[100px]" placeholder="Ej. ¡Compra ahora y recibe 50% de descuento!" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="strategicNotes" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-12">
                <FormLabel>Notas estratégicas (Opcional)</FormLabel>
                <FormControl><Textarea className="min-h-[120px]" placeholder="Observaciones, acuerdos o requerimientos especiales..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="col-span-1 md:col-span-6"></div>
          {onCancel && (
            <div className="col-span-1 md:col-span-3">
              <Button type="button" variant="outline" className="w-full h-11" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          )}
          <div className="col-span-1 md:col-span-3">
            <Button type="submit" className="w-full h-11">{initialData ? "Guardar Cambios" : "Crear Campaña"}</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
