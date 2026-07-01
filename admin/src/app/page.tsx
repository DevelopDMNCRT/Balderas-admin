import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Ejecutivo</h1>
        <p className="text-muted-foreground mt-2">
          Resumen de presupuestos, campañas y rendimiento general.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presupuesto Ejercido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% respecto al mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campañas Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">3 por terminar esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Generados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+19% en Meta Ads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROAS Global</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2x</div>
            <p className="text-xs text-muted-foreground">Estable</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Inversión por Canal</CardTitle>
            <CardDescription>Distribución del gasto en medios online y offline.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground bg-zinc-50 dark:bg-zinc-900 rounded-md border border-dashed">
            (Gráfica de barras aquí)
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recomendaciones de IA</CardTitle>
            <CardDescription>Insights accionables para mejorar el rendimiento.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                <p className="text-sm">Meta Ads generó el 48% de los leads usando solo el 25% del presupuesto en el cliente X.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500 mt-2" />
                <p className="text-sm">La campaña de Radio consumió 30% del presupuesto con bajo impacto medible. Sugerimos revisar.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                <p className="text-sm">Mover $10,000 de Google a Meta en la campaña Y podría mejorar el CPL en un 15%.</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
