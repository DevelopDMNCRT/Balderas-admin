"use client"

import { usePathname } from "next/navigation"
import { Calendar, Users, Receipt, LayoutDashboard, Target, Activity, Settings, Layers, Image as ImageIcon, BarChart, FileCheck, Sparkles, UserCog } from "lucide-react"
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
import { cn } from "@/lib/utils"

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Usuarios", url: "/users", icon: UserCog },
  { title: "Clientes", url: "/clients", icon: Users },
  { title: "Campañas", url: "/campaigns", icon: Target },
  { title: "Presupuestos", url: "/budgets", icon: Receipt },
  { title: "Mix de medios", url: "/media-mix", icon: Layers },
  { title: "Calendario", url: "/calendar", icon: Calendar },
  { title: "Producción", url: "/production", icon: ImageIcon },
  { title: "Resultados", url: "/results", icon: Activity },
  { title: "Evidencias", url: "/evidence", icon: FileCheck },
  { title: "Reportes", url: "/reports", icon: BarChart },
  { title: "Recomendaciones", url: "/recommendations", icon: Sparkles },
  { title: "Configuración", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
      <SidebarHeader className="h-16 flex items-center justify-center px-6 border-b border-zinc-100 dark:border-zinc-800/50">
        <div className="flex items-center gap-3 w-full">
          <div className="h-9 w-9 rounded-xl bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center text-white dark:text-zinc-950 font-black text-lg shadow-md tracking-wider">
            B
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none text-zinc-900 dark:text-zinc-50 tracking-tight">BALDERAS</span>
            <span className="text-[10px] text-zinc-400 font-semibold tracking-wider uppercase mt-1">Marketing ERP</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 px-3 mb-2">
            Módulos
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => {
                const isActive = pathname === item.url || (item.url !== "/" && pathname?.startsWith(item.url))
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      tooltip={item.title} 
                      isActive={isActive}
                      className={cn(
                        "w-full h-10 px-3 rounded-lg flex items-center gap-3 transition-all duration-200",
                        isActive 
                          ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 shadow-sm font-semibold" 
                          : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:bg-zinc-100/80 dark:hover:bg-zinc-900/60 font-medium"
                      )}
                      render={
                        <Link href={item.url} className="flex items-center gap-3 w-full overflow-hidden">
                          <item.icon className={cn(
                            "h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover/menu-button:scale-105", 
                            isActive ? "text-red-800 dark:text-red-700" : "text-zinc-400 group-hover/menu-button:text-zinc-600 dark:text-zinc-500 dark:group-hover/menu-button:text-zinc-300"
                          )} />
                          <span className="truncate">{item.title}</span>
                        </Link>
                      } 
                    />
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
