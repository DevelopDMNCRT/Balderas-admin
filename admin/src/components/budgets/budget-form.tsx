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

const budgetFormSchema = z.object({
  clientName: z.string().min(1, "El cliente es requerido."),
  campaignName: z.string().min(1, "La campaña es requerida."),
  authorizedBy: z.string().min(1, "El responsable es requerido."),
  authorizationDate: z.string().min(1, "La fecha de autorización es requerida."),
  medium: z.string().min(1, "El medio es requerido."),
  channel: z.string().min(1, "El canal es requerido."),
  provider: z.string().min(1, "El proveedor es requerido."),
  authorizedBudget: z.coerce.number().min(0),
  unitCost: z.coerce.number().min(0),
  quantity: z.coerce.number().min(1),
  paid: z.coerce.number().min(0),
  paymentStatus: z.enum(["Pendiente", "Parcial", "Pagado", "Cancelado"]),
  evidence: z.string().optional(),
  invoice: z.string().optional(),
  paymentDate: z.string().optional(),
  modificationHistory: z.string().optional(),
})

type BudgetFormValues = z.infer<typeof budgetFormSchema>

const defaultValues: BudgetFormValues = {
  clientName: "",
  campaignName: "",
  authorizedBy: "",
  authorizationDate: "",
  medium: "",
  channel: "",
  provider: "",
  authorizedBudget: 0,
  unitCost: 0,
  quantity: 1,
  paid: 0,
  paymentStatus: "Pendiente",
  evidence: "",
  invoice: "",
  paymentDate: "",
  modificationHistory: "",
}

const fmt = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n)

interface BudgetFormProps {
  initialData?: any
  onSubmitData: (data: BudgetFormValues) => void
  onCancel?: () => void
}

export function BudgetForm({ initialData, onSubmitData, onCancel }: BudgetFormProps) {
  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetFormSchema) as any,
    defaultValues: initialData || defaultValues,
  })

  // Live calculations
  const unitCost = form.watch("unitCost") || 0
  const quantity = form.watch("quantity") || 0
  const paid = form.watch("paid") || 0
  const subtotal = unitCost * quantity
  const iva = subtotal * 0.16
  const total = subtotal + iva
  const pending = total - paid

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    } else {
      form.reset(defaultValues)
    }
  }, [initialData, form])

  function onSubmit(values: BudgetFormValues) {
    const now = new Date().toLocaleString("es-MX")
    const historyEntry = `[${now}] ${initialData ? "Modificación" : "Alta"} de partida.\n`
    onSubmitData({
      ...values,
      modificationHistory: historyEntry + (values.modificationHistory || ""),
    })
  }

  const ReadOnlyField = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none text-zinc-500 dark:text-zinc-400">{label}</label>
      <div className="flex h-10 w-full items-center rounded-lg border border-zinc-200/50 bg-zinc-50/50 dark:border-zinc-800/50 dark:bg-zinc-900/30 px-3 text-sm text-zinc-600 dark:text-zinc-400 font-semibold cursor-not-allowed">
        {value}
      </div>
    </div>
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* 1. Identificación */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg tracking-tight">1. Identificación</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <FormField control={form.control} name="clientName" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Cliente</FormLabel>
                <FormControl><Input placeholder="Nombre del cliente" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="campaignName" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Campaña</FormLabel>
                <FormControl><Input placeholder="Nombre de la campaña" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="authorizedBy" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Responsable que autorizó</FormLabel>
                <FormControl><Input placeholder="Nombre del autorizador" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        {/* 2. Clasificación */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg tracking-tight">2. Clasificación del Gasto</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <FormField control={form.control} name="medium" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Medio</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {["Digital", "TV", "Radio", "Prensa", "OOH (Exterior)", "Cine", "Directo"].map(m => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="channel" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Canal</FormLabel>
                <FormControl><Input placeholder="Ej. Meta Ads, Google Ads" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="provider" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Proveedor</FormLabel>
                <FormControl><Input placeholder="Nombre del proveedor" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="authorizationDate" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Fecha de autorización</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        {/* 3. Montos y Cálculos */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg tracking-tight">3. Montos y Cálculos</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <FormField control={form.control} name="authorizedBudget" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Presupuesto Autorizado ($)</FormLabel>
                <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="unitCost" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Costo Unitario ($)</FormLabel>
                <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="quantity" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Cantidad</FormLabel>
                <FormControl><Input type="number" min="1" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="paid" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Pagado ($)</FormLabel>
                <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Campos calculados */}
            <div className="col-span-1 md:col-span-3">
              <ReadOnlyField label="Subtotal (calculado)" value={fmt(subtotal)} />
            </div>
            <div className="col-span-1 md:col-span-3">
              <ReadOnlyField label="IVA 16% (calculado)" value={fmt(iva)} />
            </div>
            <div className="col-span-1 md:col-span-3">
              <ReadOnlyField label="Total (calculado)" value={fmt(total)} />
            </div>
            <div className="col-span-1 md:col-span-3">
              <ReadOnlyField label="Pendiente (calculado)" value={fmt(pending < 0 ? 0 : pending)} />
            </div>
          </div>
        </div>

        {/* 4. Estatus y Documentación */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg tracking-tight">4. Estatus y Documentación</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <FormField control={form.control} name="paymentStatus" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Estatus de pago</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Estatus" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {["Pendiente", "Parcial", "Pagado", "Cancelado"].map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="evidence" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Evidencia</FormLabel>
                <FormControl><Input placeholder="Nombre o URL del archivo" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="invoice" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Factura (No.)</FormLabel>
                <FormControl><Input placeholder="Ej. FAC-2026-0123" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="paymentDate" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3">
                <FormLabel>Fecha de pago</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        {/* 5. Historial */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg tracking-tight">5. Historial de Modificaciones</h3>
          <div className="grid grid-cols-1">
            <FormField control={form.control} name="modificationHistory" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-500 dark:text-zinc-400">Registro automático de cambios (solo lectura)</FormLabel>
                <FormControl>
                  <Textarea
                    readOnly
                    className="min-h-[100px] bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-500 dark:text-zinc-400 text-xs font-mono cursor-default resize-none"
                    placeholder="El historial aparecerá aquí al guardar..."
                    {...field}
                  />
                </FormControl>
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
              {initialData ? "Guardar Cambios" : "Registrar Partida"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
