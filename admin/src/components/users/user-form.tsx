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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const userFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Correo electrónico inválido." }),
  role: z.enum(["Administrador general BALDERAS", "Ejecutivo de cuenta", "Cliente", "Proveedor"]),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword
  }
  return true
}, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"]
})

type UserFormValues = z.infer<typeof userFormSchema>

const defaultValues: UserFormValues = {
  name: "",
  email: "",
  role: "Ejecutivo de cuenta",
  password: "",
  confirmPassword: "",
}

interface UserFormProps {
  initialData?: any
  onSubmitData: (data: UserFormValues) => void
  onCancel?: () => void
}

export function UserForm({ initialData, onSubmitData, onCancel }: UserFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialData ? { ...initialData, password: "", confirmPassword: "" } : defaultValues,
  })

  useEffect(() => {
    if (initialData) {
      form.reset({ ...initialData, password: "", confirmPassword: "" })
    } else {
      form.reset(defaultValues)
    }
  }, [initialData, form])

  function onSubmit(values: UserFormValues) {
    onSubmitData(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="space-y-4">
          <h3 className="font-semibold leading-none tracking-tight">Información de Usuario</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4"><FormLabel>Nombre Completo</FormLabel><FormControl><Input placeholder="Nombre" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4"><FormLabel>Correo Electrónico</FormLabel><FormControl><Input type="email" placeholder="correo@ejemplo.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="role" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4">
                <FormLabel>Rol de Usuario</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Administrador general BALDERAS">Administrador general BALDERAS</SelectItem>
                    <SelectItem value="Ejecutivo de cuenta">Ejecutivo de cuenta</SelectItem>
                    <SelectItem value="Cliente">Cliente</SelectItem>
                    <SelectItem value="Proveedor">Proveedor</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold leading-none tracking-tight">Seguridad {initialData && <span className="text-zinc-500 font-normal text-sm ml-2">(Opcional si no deseas cambiarla)</span>}</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4"><FormLabel>Contraseña</FormLabel><FormControl><Input type="password" placeholder="********" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-4"><FormLabel>Confirmar Contraseña</FormLabel><FormControl><Input type="password" placeholder="********" {...field} /></FormControl><FormMessage /></FormItem>
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
            <Button type="submit" className="w-full h-11">{initialData ? "Actualizar Usuario" : "Guardar Usuario"}</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
