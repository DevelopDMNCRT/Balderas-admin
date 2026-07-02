"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { ArrowLeft, FileText, FileSpreadsheet, FileJson } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { reportTypes } from "@/components/reports/report-types-grid"

export default function NewReportPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const typeParam = searchParams.get("type")
  
  const form = useForm({
    defaultValues: {
      type: typeParam || "personalizado",
      client: "",
      campaign: "",
      medium: "",
      month: "",
      year: "",
      manager: "",
    }
  })

  const handleDownload = (format: string) => {
    console.log(`Downloading report in ${format} format with filters:`, form.getValues())
    // Simulate generation delay
    setTimeout(() => {
      router.push("/reports")
    }, 1000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" render={<Link href="/reports" />} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Configurar Reporte
          </h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1 pl-10">
          Ajusta los filtros y parámetros antes de generar tu archivo.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm w-full">
        <Form {...form}>
          <form className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold leading-none tracking-tight">Filtros Generales</h3>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-6">
                      <FormLabel>Tipo de Reporte</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un reporte" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="personalizado">Reporte Personalizado / A Medida</SelectItem>
                          {reportTypes.map(rt => (
                            <SelectItem key={rt.id} value={rt.id}>{rt.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-3">
                      <FormLabel>Cliente</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Todos los clientes" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="todos">Todos los clientes</SelectItem>
                          <SelectItem value="nike">Nike México</SelectItem>
                          <SelectItem value="samsung">Samsung</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="campaign"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-3">
                      <FormLabel>Campaña</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Todas las campañas" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="todas">Todas las campañas</SelectItem>
                          <SelectItem value="hot-sale">Hot Sale 2026</SelectItem>
                          <SelectItem value="navidad">Navidad 2025</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold leading-none tracking-tight">Filtros Específicos</h3>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Mes</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Cualquiera" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="todos">Todos</SelectItem>
                          <SelectItem value="01">Enero</SelectItem>
                          <SelectItem value="06">Junio</SelectItem>
                          <SelectItem value="07">Julio</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Año</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Cualquiera" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2026">2026</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="medium"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Medio / Canal</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Todos los medios" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="todos">Todos los medios</SelectItem>
                          <SelectItem value="digital">Solo Digital</SelectItem>
                          <SelectItem value="offline">Solo Offline</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="manager"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-6">
                      <FormLabel>Responsable</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Cualquier responsable" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="todos">Cualquier responsable</SelectItem>
                          <SelectItem value="juan">Juan Pérez</SelectItem>
                          <SelectItem value="ana">Ana Gómez</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" type="button" render={<Link href="/reports" />} className="w-full h-11">
                Cancelar
              </Button>
              <Button type="button" onClick={() => handleDownload('pdf')} variant="outline" className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 w-full h-11">
                <FileText className="h-4 w-4" />
                PDF
              </Button>
              <Button type="button" onClick={() => handleDownload('excel')} variant="outline" className="gap-2 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 border-emerald-200 w-full h-11">
                <FileSpreadsheet className="h-4 w-4" />
                Excel
              </Button>
              <Button type="button" onClick={() => handleDownload('csv')} variant="outline" className="gap-2 w-full h-11">
                <FileJson className="h-4 w-4 text-zinc-500" />
                CSV
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
