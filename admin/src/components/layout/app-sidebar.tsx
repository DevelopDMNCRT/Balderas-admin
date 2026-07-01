import { Calendar, Users, Receipt, LayoutDashboard, Target, Activity, Settings, Layers, Image as ImageIcon, BarChart } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Link from "next/link"

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Clientes", url: "/clients", icon: Users },
  { title: "Campañas", url: "/campaigns", icon: Target },
  { title: "Presupuestos", url: "/budgets", icon: Receipt },
  { title: "Mix de Medios", url: "/media", icon: Layers },
  { title: "Calendario", url: "/calendar", icon: Calendar },
  { title: "Producción", url: "/production", icon: ImageIcon },
  { title: "Resultados", url: "/results", icon: Activity },
  { title: "Reportes", url: "/reports", icon: BarChart },
  { title: "Configuración", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-zinc-200 dark:border-zinc-800">
      <SidebarHeader className="h-16 flex items-center px-4 border-b">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">BALDERAS</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-zinc-500">Módulos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} render={
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  } />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
