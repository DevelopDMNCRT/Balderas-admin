"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, UploadCloud, File, X, Image as ImageIcon } from "lucide-react"

const evidenceTypes = [
  "Fotografías",
  "Videos",
  "Capturas de pantalla",
  "PDFs",
  "Facturas",
  "Cotizaciones",
  "Contratos",
  "Comprobantes de pago",
  "Reportes",
  "Artes finales",
  "Links de publicaciones",
  "Links de anuncios",
  "Links de landing pages"
] as const

// Extend schema for file or URL depending on type
const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  type: z.enum(evidenceTypes, {
    required_error: "Por favor selecciona un tipo de evidencia",
  }),
  campaign: z.string().min(1, "Selecciona una campaña"),
  medium: z.string().min(1, "Selecciona un medio"),
  // We'll manage file state manually since standard inputs don't play perfectly with react-hook-form right out of the box
})

export type EvidenceFormValues = z.infer<typeof formSchema>

export default function NewEvidencePage() {
  const router = useRouter()
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<EvidenceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "Fotografías",
      campaign: "",
      medium: "",
    },
  })

  // Handle Drag & Drop
  const handleDrag = function(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = function(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = function(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  function onSubmit(data: EvidenceFormValues) {
    console.log("Form Data:", data)
    console.log("File:", selectedFile)
    // Simulate upload delay
    setTimeout(() => {
      router.push("/evidence")
    }, 500)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link href="/evidence">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Subir Nueva Evidencia
          </h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1 pl-10">
          Carga documentos, fotografías o contratos desde tu computadora.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* File Upload Zone */}
            <div className="space-y-4">
              <h3 className="font-semibold leading-none tracking-tight">Archivo</h3>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="col-span-1 md:col-span-6">
                  {!selectedFile ? (
                    <div 
                      className={`relative border-2 border-dashed rounded-xl p-8 transition-colors flex flex-col items-center justify-center gap-2 text-center cursor-pointer ${
                        dragActive 
                          ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900/50" 
                          : "border-zinc-300 hover:border-zinc-400 bg-zinc-50/50 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-zinc-600 dark:bg-zinc-900/20 dark:hover:bg-zinc-900/50"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleChange}
                      />
                      <div className="p-3 bg-white dark:bg-zinc-800 rounded-full shadow-sm mb-2 border border-zinc-100 dark:border-zinc-700">
                        <UploadCloud className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                      </div>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                        Haz clic para subir o arrastra tu archivo aquí
                      </p>
                      <p className="text-xs text-muted-foreground max-w-xs">
                        Soporta JPG, PNG, MP4, PDF, DOCX (Máx. 50MB)
                      </p>
                    </div>
                  ) : (
                    <div className="relative border rounded-xl p-4 flex items-center gap-4 bg-zinc-50/50 dark:bg-zinc-900/30">
                      <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-100 dark:border-zinc-700 shrink-0">
                        {selectedFile.type.includes('image') ? (
                          <ImageIcon className="h-6 w-6 text-blue-500" />
                        ) : (
                          <File className="h-6 w-6 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100 truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="shrink-0 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                        onClick={() => setSelectedFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold leading-none tracking-tight">Detalles de la Evidencia</h3>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-4">
                      <FormLabel>Nombre o Descripción</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. Factura Meta Ads Junio 2026" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Tipo de Evidencia</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona la categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[250px]">
                          {evidenceTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="campaign"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-3">
                      <FormLabel>Campaña Asociada</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hot-sale">Hot Sale 2026</SelectItem>
                          <SelectItem value="navidad">Campaña Navidad</SelectItem>
                          <SelectItem value="lanzamiento">Lanzamiento App</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="medium"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-3">
                      <FormLabel>Medio / Canal</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="meta">Meta Ads</SelectItem>
                          <SelectItem value="google">Google Ads</SelectItem>
                          <SelectItem value="ooh">OOH (Espectaculares)</SelectItem>
                          <SelectItem value="radio">Radio</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="col-span-1 md:col-span-3">
                <Button variant="outline" type="button" asChild className="w-full h-11">
                  <Link href="/evidence">Cancelar</Link>
                </Button>
              </div>
              <div className="col-span-1 md:col-span-3">
                <Button type="submit" disabled={!selectedFile} className="w-full h-11">
                  Guardar Evidencia
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
