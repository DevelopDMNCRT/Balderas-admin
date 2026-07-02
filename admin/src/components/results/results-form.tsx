"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import * as z from "zod"
import { useEffect } from "react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  campana: z.string().min(1, "Campo requerido"),
  medio: z.string().min(1, "Campo requerido"),
  canal: z.string().min(1, "Campo requerido"),
  tipoRegistro: z.enum(["digital", "offline"]),
  
  // Digital
  inversion: z.coerce.number().min(0).default(0),
  alcance: z.coerce.number().min(0).default(0),
  impresiones: z.coerce.number().min(0).default(0),
  clics: z.coerce.number().min(0).default(0),
  ctr: z.coerce.number().min(0).default(0),
  cpc: z.coerce.number().min(0).default(0),
  cpm: z.coerce.number().min(0).default(0),
  leads: z.coerce.number().min(0).default(0),
  costoPorLead: z.coerce.number().min(0).default(0),
  conversiones: z.coerce.number().min(0).default(0),
  costoPorConversion: z.coerce.number().min(0).default(0),
  ventas: z.coerce.number().min(0).default(0),
  ingresos: z.coerce.number().min(0).default(0),
  roas: z.coerce.number().min(0).default(0),
  roi: z.coerce.number().default(0),
  frecuencia: z.coerce.number().min(0).default(0),
  engagement: z.coerce.number().min(0).default(0),
  mensajes: z.coerce.number().min(0).default(0),
  whatsapps: z.coerce.number().min(0).default(0),
  formularios: z.coerce.number().min(0).default(0),
  llamadas: z.coerce.number().min(0).default(0),

  // Offline
  ubicacion: z.string().optional(),
  diasActivos: z.coerce.number().min(0).default(0),
  inserciones: z.coerce.number().min(0).default(0),
  cuponesRedimidos: z.coerce.number().min(0).default(0),
  qrEscaneados: z.coerce.number().min(0).default(0),
  visitasSucursal: z.coerce.number().min(0).default(0),
  evidencias: z.string().optional(),
  observaciones: z.string().optional(),
  costoImpacto: z.coerce.number().min(0).default(0),
  costoVisita: z.coerce.number().min(0).default(0),
  costoVenta: z.coerce.number().min(0).default(0),
})

export type ResultsFormValues = z.infer<typeof formSchema>

interface ResultsFormProps {
  initialData?: (ResultsFormValues & { id?: string }) | null
  onSubmitData: (data: ResultsFormValues) => void
  onCancel: () => void
}

export function ResultsForm({ initialData, onSubmitData, onCancel }: ResultsFormProps) {
  const form = useForm<ResultsFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: initialData || {
      campana: "", medio: "", canal: "", tipoRegistro: "digital",
      inversion: 0, alcance: 0, impresiones: 0, clics: 0, ctr: 0, cpc: 0, cpm: 0,
      leads: 0, costoPorLead: 0, conversiones: 0, costoPorConversion: 0,
      ventas: 0, ingresos: 0, roas: 0, roi: 0, frecuencia: 0, engagement: 0,
      mensajes: 0, whatsapps: 0, formularios: 0, llamadas: 0,
      ubicacion: "", diasActivos: 0, inserciones: 0, cuponesRedimidos: 0,
      qrEscaneados: 0, visitasSucursal: 0, evidencias: "", observaciones: "",
      costoImpacto: 0, costoVisita: 0, costoVenta: 0
    },
  })

  const tipoRegistro = form.watch("tipoRegistro")

  // Auto-calculos
  const inv = form.watch("inversion") || 0
  const imp = form.watch("impresiones") || 0
  const clc = form.watch("clics") || 0
  const lds = form.watch("leads") || 0
  const cnv = form.watch("conversiones") || 0
  const vnt = form.watch("ventas") || 0
  const ing = form.watch("ingresos") || 0
  const alc = form.watch("alcance") || 0
  const vis = form.watch("visitasSucursal") || 0

  useEffect(() => {
    if (tipoRegistro === "digital") {
      const ctr = imp > 0 ? (clc / imp) * 100 : 0
      const cpc = clc > 0 ? (inv / clc) : 0
      const cpm = imp > 0 ? (inv / imp) * 1000 : 0
      const cpl = lds > 0 ? (inv / lds) : 0
      const cpa = cnv > 0 ? (inv / cnv) : 0
      const roas = inv > 0 ? (ing / inv) : 0
      const roi = inv > 0 ? ((ing - inv) / inv) * 100 : 0

      if (form.getValues("ctr") !== Number(ctr.toFixed(2))) form.setValue("ctr", Number(ctr.toFixed(2)))
      if (form.getValues("cpc") !== Number(cpc.toFixed(2))) form.setValue("cpc", Number(cpc.toFixed(2)))
      if (form.getValues("cpm") !== Number(cpm.toFixed(2))) form.setValue("cpm", Number(cpm.toFixed(2)))
      if (form.getValues("costoPorLead") !== Number(cpl.toFixed(2))) form.setValue("costoPorLead", Number(cpl.toFixed(2)))
      if (form.getValues("costoPorConversion") !== Number(cpa.toFixed(2))) form.setValue("costoPorConversion", Number(cpa.toFixed(2)))
      if (form.getValues("roas") !== Number(roas.toFixed(2))) form.setValue("roas", Number(roas.toFixed(2)))
      if (form.getValues("roi") !== Number(roi.toFixed(2))) form.setValue("roi", Number(roi.toFixed(2)))
    } else {
      const costoImp = alc > 0 ? (inv / alc) : 0
      const costoVis = vis > 0 ? (inv / vis) : 0
      const costoVen = vnt > 0 ? (inv / vnt) : 0

      if (form.getValues("costoImpacto") !== Number(costoImp.toFixed(2))) form.setValue("costoImpacto", Number(costoImp.toFixed(2)))
      if (form.getValues("costoVisita") !== Number(costoVis.toFixed(2))) form.setValue("costoVisita", Number(costoVis.toFixed(2)))
      if (form.getValues("costoVenta") !== Number(costoVen.toFixed(2))) form.setValue("costoVenta", Number(costoVen.toFixed(2)))
    }
  }, [inv, imp, clc, lds, cnv, vnt, ing, alc, vis, tipoRegistro, form])

  const NumberField = ({ name, label, disabled = false, step = "1", icon = "" }: { name: any, label: string, disabled?: boolean, step?: string, icon?: string }) => (
    <FormField control={form.control} name={name} render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <div className="relative">
            {icon && <span className="absolute left-3 top-2 text-muted-foreground">{icon}</span>}
            <Input type="number" step={step} className={icon ? "pl-7" : ""} disabled={disabled} {...field} />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitData)} className="space-y-8">
        
        {/* Identificadores Base */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50">
          <FormField control={form.control} name="campana" render={({ field }) => (
            <FormItem>
              <FormLabel>Campaña</FormLabel>
              <FormControl><Input placeholder="Ej. Hot Sale 2026" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="medio" render={({ field }) => (
            <FormItem>
              <FormLabel>Medio</FormLabel>
              <FormControl><Input placeholder="Ej. Redes Sociales, TV..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="canal" render={({ field }) => (
            <FormItem>
              <FormLabel>Canal Específico</FormLabel>
              <FormControl><Input placeholder="Ej. Meta Ads, Espectacular Periférico..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="tipoRegistro" render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Métricas</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger className="w-full"><SelectValue /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="digital">Resultados Digitales</SelectItem>
                  <SelectItem value="offline">Resultados Offline</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {tipoRegistro === "digital" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-b pb-2">Métricas Digitales</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <NumberField name="inversion" label="Inversión" icon="$" />
              <NumberField name="ingresos" label="Ingresos" icon="$" />
              <NumberField name="alcance" label="Alcance" />
              <NumberField name="impresiones" label="Impresiones" />
              <NumberField name="frecuencia" label="Frecuencia" step="0.1" />
              
              <NumberField name="clics" label="Clics" />
              <NumberField name="ctr" label="CTR (%)" disabled icon="%" />
              <NumberField name="cpc" label="CPC" disabled icon="$" />
              <NumberField name="cpm" label="CPM" disabled icon="$" />
              <NumberField name="engagement" label="Engagement" />
              
              <NumberField name="leads" label="Leads" />
              <NumberField name="costoPorLead" label="CPL" disabled icon="$" />
              <NumberField name="mensajes" label="Mensajes (DM)" />
              <NumberField name="whatsapps" label="WhatsApps" />
              <NumberField name="formularios" label="Formularios" />
              
              <NumberField name="conversiones" label="Conversiones" />
              <NumberField name="costoPorConversion" label="CPA" disabled icon="$" />
              <NumberField name="ventas" label="Ventas" />
              <NumberField name="roas" label="ROAS (x)" disabled />
              <NumberField name="roi" label="ROI (%)" disabled icon="%" />
              
              <NumberField name="llamadas" label="Llamadas" />
            </div>
          </div>
        )}

        {tipoRegistro === "offline" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-b pb-2">Métricas Offline</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="ubicacion" render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación / Cobertura</FormLabel>
                  <FormControl><Input placeholder="Ej. Periférico Sur y Av. Reforma" {...field} /></FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="evidencias" render={({ field }) => (
                <FormItem>
                  <FormLabel>Enlace a Evidencias (Fotos/Reportes)</FormLabel>
                  <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <NumberField name="inversion" label="Inversión" icon="$" />
              <NumberField name="alcance" label="Alcance Est." />
              <NumberField name="diasActivos" label="Días Activos" />
              <NumberField name="inserciones" label="Inserciones" />
              <NumberField name="costoImpacto" label="Costo/Impacto Est." disabled icon="$" />
              
              <NumberField name="cuponesRedimidos" label="Cupones Redimidos" />
              <NumberField name="qrEscaneados" label="QR Escaneados" />
              <NumberField name="llamadas" label="Llamadas Gen." />
              <NumberField name="visitasSucursal" label="Visitas a Sucursal" />
              <NumberField name="costoVisita" label="Costo/Visita" disabled icon="$" />
              
              <NumberField name="ventas" label="Ventas Atribuibles" />
              <NumberField name="costoVenta" label="Costo/Venta" disabled icon="$" />
            </div>

            <FormField control={form.control} name="observaciones" render={({ field }) => (
                <FormItem>
                  <FormLabel>Observaciones</FormLabel>
                  <FormControl><Textarea placeholder="Resultados cualitativos..." className="resize-none" {...field} /></FormControl>
                </FormItem>
            )} />
          </div>
        )}

        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="col-span-1 md:col-span-3">
            <Button type="button" variant="outline" onClick={onCancel} className="w-full h-11">
              Cancelar
            </Button>
          </div>
          <div className="col-span-1 md:col-span-3">
            <Button type="submit" className="w-full h-11">
              Guardar Resultados
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
