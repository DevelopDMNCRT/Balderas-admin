"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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

const clientFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  legalName: z.string().min(2, { message: "La razón social es requerida." }),
  industry: z.string().min(2, { message: "El giro es requerido." }),
  city: z.string().min(2, { message: "La ciudad es requerida." }),
  state: z.string().min(2, { message: "El estado es requerido." }),
  contact: z.string().min(2, { message: "El contacto es requerido." }),
  phone: z.string().min(10, { message: "Teléfono válido es requerido." }),
  email: z.string().email({ message: "Correo electrónico inválido." }),
  monthlyBudget: z.string().min(1, { message: "Requerido." }),
  annualBudget: z.string().min(1, { message: "Requerido." }),
  marketingObjective: z.string().min(2, { message: "Requerido." }),
  branches: z.string().optional(),
  socialMedia: z.string().optional(),
  website: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["activo", "pausado", "inactivo"]),
})

type ClientFormValues = z.infer<typeof clientFormSchema>

const defaultValues: ClientFormValues = {
  name: "",
  legalName: "",
  industry: "",
  city: "",
  state: "",
  contact: "",
  phone: "",
  email: "",
  monthlyBudget: "",
  annualBudget: "",
  marketingObjective: "",
  branches: "",
  socialMedia: "",
  website: "",
  notes: "",
  status: "activo",
}

interface ClientFormProps {
  initialData?: any
  onSubmitData: (data: ClientFormValues) => void
  onCancel?: () => void
}

export function ClientForm({ initialData, onSubmitData, onCancel }: ClientFormProps) {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: initialData || defaultValues,
  })

  // Reset form when initialData changes (e.g. clicking different items)
  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    } else {
      form.reset(defaultValues)
    }
  }, [initialData, form])

  function onSubmit(values: ClientFormValues) {
    onSubmitData(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Información Básica */}
        <div className="space-y-4">
          <h3 className="font-semibold leading-none tracking-tight">Información Comercial</h3>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2"><FormLabel>Nombre Comercial</FormLabel><FormControl><Input placeholder="Ej. Acme Corp" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="legalName" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2"><FormLabel>Razón Social</FormLabel><FormControl><Input placeholder="Ej. Acme de México S.A. de C.V." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="industry" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2"><FormLabel>Giro</FormLabel><FormControl><Input placeholder="Ej. Retail" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="website" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4"><FormLabel>Sitio Web</FormLabel><FormControl><Input placeholder="https://" {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
        </div>

        {/* Contacto y Ubicación */}
        <div className="space-y-4">
          <h3 className="font-semibold leading-none tracking-tight">Contacto y Ubicación</h3>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <FormField control={form.control} name="contact" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2"><FormLabel>Contacto Principal</FormLabel><FormControl><Input placeholder="Nombre" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2"><FormLabel>Correo</FormLabel><FormControl><Input placeholder="correo@ejemplo.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2"><FormLabel>Teléfono</FormLabel><FormControl><Input placeholder="10 dígitos" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="city" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2"><FormLabel>Ciudad</FormLabel><FormControl><Input placeholder="Ej. Monterrey" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="state" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2"><FormLabel>Estado</FormLabel><FormControl><Input placeholder="Ej. Nuevo León" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="branches" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2"><FormLabel>Sucursales</FormLabel><FormControl><Input placeholder="Ej. 5 sucursales" {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
        </div>

        {/* Datos de Marketing */}
        <div className="space-y-4">
          <h3 className="font-semibold leading-none tracking-tight">Estrategia y Presupuesto</h3>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <FormField control={form.control} name="monthlyBudget" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3"><FormLabel>Presupuesto Mensual</FormLabel><FormControl><Input type="number" placeholder="$" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="annualBudget" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-3"><FormLabel>Presupuesto Anual</FormLabel><FormControl><Input type="number" placeholder="$" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="status" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Estatus</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estatus" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="pausado">Pausado</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="marketingObjective" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4"><FormLabel>Objetivo Principal de Marketing</FormLabel><FormControl><Input placeholder="Ej. Posicionamiento, Leads, Ventas..." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="socialMedia" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2"><FormLabel>Redes Sociales</FormLabel><FormControl><Input placeholder="Links de redes sociales..." {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="notes" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-6"><FormLabel>Notas Estratégicas</FormLabel><FormControl><Textarea placeholder="Estrategias, acuerdos, detalles clave..." {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 pt-4">
          {onCancel && (
            <div className="col-span-1 md:col-span-3">
              <Button type="button" variant="outline" className="w-full h-11" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          )}
          <div className="col-span-1 md:col-span-3">
            <Button type="submit" className="w-full h-11">Guardar Cliente</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
