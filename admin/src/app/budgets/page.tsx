"use client"

import { useState, useMemo } from "react"
import { BudgetsTable } from "@/components/budgets/budgets-table"
import { BudgetForm } from "@/components/budgets/budget-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, DollarSign, TrendingUp, CheckCircle, AlertCircle, PieChart, BarChart2 } from "lucide-react"

export type BudgetLine = {
  id: string
  clientName: string
  campaignName: string
  medium: string
  channel: string
  provider: string
  authorizedBudget: number
  unitCost: number
  quantity: number
  subtotal: number
  iva: number
  total: number
  paid: number
  pending: number
  paymentStatus: "Pendiente" | "Parcial" | "Pagado" | "Cancelado"
  evidence?: string
  invoice?: string
  paymentDate?: string
  authorizedBy: string
  authorizationDate: string
  modificationHistory?: string
}

const sampleLines: BudgetLine[] = [
  {
    id: "1",
    clientName: "Tech Solutions Inc.",
    campaignName: "Lanzamiento App Móvil",
    medium: "Digital",
    channel: "Meta Ads",
    provider: "Facebook México",
    authorizedBudget: 80000,
    unitCost: 5000,
    quantity: 12,
    subtotal: 60000,
    iva: 9600,
    total: 69600,
    paid: 69600,
    pending: 0,
    paymentStatus: "Pagado",
    evidence: "comprobante_meta_jul26.pdf",
    invoice: "FAC-2026-0041",
    paymentDate: "2026-06-28",
    authorizedBy: "Ricardo Balderas",
    authorizationDate: "2026-06-01",
    modificationHistory: "[01/06/2026] Alta de partida.\n",
  },
  {
    id: "2",
    clientName: "Tech Solutions Inc.",
    campaignName: "Lanzamiento App Móvil",
    medium: "Digital",
    channel: "Google Ads",
    provider: "Google México",
    authorizedBudget: 50000,
    unitCost: 8000,
    quantity: 4,
    subtotal: 32000,
    iva: 5120,
    total: 37120,
    paid: 18560,
    pending: 18560,
    paymentStatus: "Parcial",
    invoice: "FAC-2026-0042",
    authorizedBy: "Ricardo Balderas",
    authorizationDate: "2026-06-01",
    modificationHistory: "[01/06/2026] Alta de partida.\n[15/06/2026] Pago parcial registrado.\n",
  },
  {
    id: "3",
    clientName: "Boutique Elegance",
    campaignName: "Colección Verano",
    medium: "OOH (Exterior)",
    channel: "Espectaculares",
    provider: "Espectaculares del Norte",
    authorizedBudget: 30000,
    unitCost: 15000,
    quantity: 2,
    subtotal: 30000,
    iva: 4800,
    total: 34800,
    paid: 0,
    pending: 34800,
    paymentStatus: "Pendiente",
    authorizedBy: "Ana García",
    authorizationDate: "2026-06-15",
    modificationHistory: "[15/06/2026] Alta de partida.\n",
  },
]

const fmt = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n)

function SummaryCard({
  title,
  value,
  icon: Icon,
  color,
  sub,
}: {
  title: string
  value: string
  icon: any
  color: string
  sub?: string
}) {
  return (
    <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm p-3.5 flex items-center gap-3 hover:shadow-md transition-all duration-200">
      <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 truncate">{title}</p>
        <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight truncate">{value}</p>
        {sub && <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

export default function BudgetsPage() {
  const [lines, setLines] = useState<BudgetLine[]>(sampleLines)
  const [view, setView] = useState<"list" | "form">("list")
  const [editingLine, setEditingLine] = useState<BudgetLine | null>(null)

  // Summary calculations
  const summary = useMemo(() => {
    const authorized = lines.reduce((acc, l) => acc + l.authorizedBudget, 0)
    const committed = lines.filter(l => l.paymentStatus !== "Pagado" && l.paymentStatus !== "Cancelado").reduce((acc, l) => acc + l.total, 0)
    const exercised = lines.reduce((acc, l) => acc + l.paid, 0)
    const available = authorized - exercised
    const usage = authorized > 0 ? (exercised / authorized) * 100 : 0
    const estimatedTotal = lines.reduce((acc, l) => acc + l.subtotal, 0)
    const realTotal = lines.reduce((acc, l) => acc + l.total, 0)
    const diff = realTotal - estimatedTotal
    return { authorized, committed, exercised, available, usage, diff }
  }, [lines])

  const handleSave = (data: any) => {
    const subtotal = data.unitCost * data.quantity
    const iva = subtotal * 0.16
    const total = subtotal + iva
    const pending = Math.max(0, total - data.paid)

    const complete: BudgetLine = {
      ...data,
      subtotal,
      iva,
      total,
      pending,
    }

    if (editingLine) {
      setLines(lines.map(l => l.id === editingLine.id ? { ...complete, id: editingLine.id } : l))
    } else {
      setLines([{ ...complete, id: Math.random().toString(36).substr(2, 9) }, ...lines])
    }
    setView("list")
    setEditingLine(null)
  }

  const handleEdit = (line: BudgetLine) => {
    setEditingLine(line)
    setView("form")
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar esta partida presupuestal? Esta acción no se puede deshacer.")) {
      setLines(lines.filter(l => l.id !== id))
    }
  }

  if (view === "form") {
    return (
      <div className="space-y-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setView("list")} className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {editingLine ? "Editar Partida Presupuestal" : "Registrar Nueva Partida"}
            </h1>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1 pl-10">
            {editingLine ? "Modifica los montos, estatus de pago y documentación de la partida." : "Captura los detalles de la nueva partida de gasto para esta campaña."}
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm w-full">
          <BudgetForm
            initialData={editingLine}
            onSubmitData={handleSave}
            onCancel={() => { setView("list"); setEditingLine(null) }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Control de Presupuestos
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1">
            Gestiona partidas de gasto, pagos, facturas y porcentaje de uso por cliente y campaña.
          </p>
        </div>
        <Button onClick={() => { setEditingLine(null); setView("form") }} className="shadow-sm font-semibold h-10 px-4 gap-2 rounded-lg">
          <Plus className="h-4 w-4" /> Nueva Partida
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Presupuesto Autorizado"
          value={fmt(summary.authorized)}
          icon={DollarSign}
          color="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
        />
        <SummaryCard
          title="Presupuesto Comprometido"
          value={fmt(summary.committed)}
          icon={AlertCircle}
          color="bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
        />
        <SummaryCard
          title="Presupuesto Ejercido"
          value={fmt(summary.exercised)}
          icon={CheckCircle}
          color="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
        />
        <SummaryCard
          title="Presupuesto Disponible"
          value={fmt(summary.available)}
          icon={TrendingUp}
          color="bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400"
        />
        <SummaryCard
          title="Porcentaje de Uso"
          value={`${summary.usage.toFixed(1)}%`}
          icon={PieChart}
          color="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
          sub={`${fmt(summary.exercised)} de ${fmt(summary.authorized)}`}
        />
        <SummaryCard
          title="Diferencia Estimado vs Real"
          value={fmt(Math.abs(summary.diff))}
          icon={BarChart2}
          color={summary.diff > 0
            ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400"
            : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"}
          sub={summary.diff > 0 ? "↑ Por encima del estimado" : "↓ Por debajo del estimado"}
        />
      </div>

      {/* Partidas Table */}
      <BudgetsTable lines={lines} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
