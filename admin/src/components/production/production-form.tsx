"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "@/components/ui/button"
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
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const tiposPieza = [
  "Diseño gráfico", "Video", "Reel", "Fotografía", "Copy", 
  "Landing page", "Guion", "Anuncio", "Audio para radio", 
  "Spot de TV", "Arte para espectacular", "Arte para impresión", "Material POP"
]

const estatusDisponibles = [
  "Solicitado", "En proceso", "En revisión", "Cambios solicitados", "Aprobado", "Publicado"
]

const formSchema = z.object({
  cliente: z.string().min(1, "Campo requerido"),
  campana: z.string().min(1, "Campo requerido"),
  tipoPieza: z.string().min(1, "Campo requerido"),
  formato: z.string().min(1, "Campo requerido"),
  medidas: z.string().optional(),
  responsable: z.string().min(1, "Campo requerido"),
  fechaSolicitud: z.date({ message: "Selecciona una fecha" }),
  fechaEntrega: z.date({ message: "Selecciona una fecha" }),
  fechaAprobacion: z.date().optional().nullable(),
  estatus: z.string().min(1, "Campo requerido"),
  archivoFinal: z.string().optional(),
  comentarios: z.string().optional(),
  historialCambios: z.string().optional(),
})

export type ProductionFormValues = z.infer<typeof formSchema>

interface ProductionFormProps {
  initialData?: ProductionFormValues & { id?: string } | null
  onSubmitData: (data: ProductionFormValues) => void
  onCancel: () => void
}

export function ProductionForm({ initialData, onSubmitData, onCancel }: ProductionFormProps) {
  const form = useForm<ProductionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      cliente: "",
      campana: "",
      tipoPieza: "",
      formato: "",
      medidas: "",
      responsable: "",
      estatus: "Solicitado",
      archivoFinal: "",
      comentarios: "",
      historialCambios: "",
    },
  })

  function onSubmit(values: ProductionFormValues) {
    onSubmitData(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="cliente"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente</FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Acme Corp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="campana"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaña</FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Lanzamiento Verano" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tipoPieza"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Pieza</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tiposPieza.map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="formato"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Formato</FormLabel>
                <FormControl>
                  <Input placeholder="Ej. MP4, PNG, PDF..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="medidas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medidas / Duración</FormLabel>
                <FormControl>
                  <Input placeholder="Ej. 1080x1080px o 15 segs" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="responsable"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsable (Asignado a)</FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Ana de Diseño" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fechaSolicitud"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de Solicitud</FormLabel>
                <Popover>
                  <FormControl>
                    <PopoverTrigger
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                          format(field.value, "PPP", { locale: es })
                        ) : (
                          <span>Elige una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </PopoverTrigger>
                  </FormControl>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => false}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fechaEntrega"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de Entrega Promesa</FormLabel>
                <Popover>
                  <FormControl>
                    <PopoverTrigger
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                          format(field.value, "PPP", { locale: es })
                        ) : (
                          <span>Elige una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </PopoverTrigger>
                  </FormControl>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => false}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fechaAprobacion"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de Aprobación (Opcional)</FormLabel>
                <Popover>
                  <FormControl>
                    <PopoverTrigger
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                          format(field.value, "PPP", { locale: es })
                        ) : (
                          <span>Elige una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </PopoverTrigger>
                  </FormControl>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value || undefined}
                      onSelect={field.onChange}
                      disabled={(date) => false}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estatus</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {estatusDisponibles.map(e => (
                      <SelectItem key={e} value={e}>{e}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="archivoFinal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enlace al Archivo Final (Drive, Figma, etc)</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comentarios"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentarios</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Instrucciones creativas o feedback del cliente..." 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="historialCambios"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Historial de Cambios / Bitácora</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="26/Oct: Se entregó v1. 27/Oct: Cliente pide cambiar color..." 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="col-span-1 md:col-span-3">
            <Button type="button" variant="outline" onClick={onCancel} className="w-full h-11">
              Cancelar
            </Button>
          </div>
          <div className="col-span-1 md:col-span-3">
            <Button type="submit" className="w-full h-11">
              {initialData ? "Guardar Cambios" : "Registrar Entregable"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
