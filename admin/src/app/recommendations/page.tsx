"use client"

import { InsightsHeader, type Insight } from "@/components/recommendations/insights-header"
import { RecommendationsFeed, type Recommendation } from "@/components/recommendations/recommendations-feed"

const sampleInsights: Insight[] = [
  {
    id: "ins-1",
    title: "Eficiencia Sobresaliente",
    description: "Meta Ads generó el 48% de los leads usando solo el 25% del presupuesto total.",
    type: "positive"
  },
  {
    id: "ins-2",
    title: "Retorno de Inversión",
    description: "El canal con mejor ROAS consolidado este mes fue Meta Ads (17x).",
    type: "positive"
  },
  {
    id: "ins-3",
    title: "Alerta de Desperdicio",
    description: "Radio consumió el 30% del presupuesto, pero generó solo el 5% de los leads medibles.",
    type: "negative"
  }
]

const sampleRecommendations: Recommendation[] = [
  {
    id: "rec-1",
    alertType: "Optimización de Presupuesto",
    priority: "high",
    campaign: "Lanzamiento App Móvil",
    channel: "Google Ads / Meta Ads",
    description: "Google Ads tiene un CPL 40% más alto que Meta. Se recomienda reasignar presupuesto inmediato para maximizar captación.",
    impact: "Reducción del CPL global en un 15% y aumento estimado de 120 leads semanales.",
    actionLabel: "Mover $10,000 a Meta"
  },
  {
    id: "rec-2",
    alertType: "Alerta de Consumo",
    priority: "medium",
    campaign: "Colección Verano",
    channel: "TikTok Ads",
    description: "La campaña está cerca de agotar su presupuesto asignado a 15 días de su finalización planificada.",
    impact: "Pausa automática de la pauta si no se inyecta liquidez o se reduce la puja diaria.",
    actionLabel: "Revisar Pacing"
  },
  {
    id: "rec-3",
    alertType: "Riesgo de Atribución",
    priority: "low",
    campaign: "Posicionamiento de Marca (Anual)",
    channel: "Medios Offline (OOH / BTL)",
    description: "El presupuesto offline supera el 60% del total invertido, pero no cuenta con suficientes métricas de atribución digital.",
    impact: "Dificultad para calcular el ROAS consolidado de la campaña a fin de mes.",
    actionLabel: "Implementar Códigos QR"
  }
]

export default function RecommendationsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1 border-b pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Inteligencia y Recomendaciones
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1">
          Motor de análisis automático. Descubre oportunidades ocultas, previene riesgos presupuestales y maximiza tu ROAS.
        </p>
      </div>

      <InsightsHeader insights={sampleInsights} />
      
      <div className="mt-8">
        <RecommendationsFeed recommendations={sampleRecommendations} />
      </div>
    </div>
  )
}
