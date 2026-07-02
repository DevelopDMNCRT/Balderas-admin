import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BALDERAS | ERP de Marketing",
  description: "Plataforma de gestión de marketing para BALDERAS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 overflow-y-scroll`}>
        <TooltipProvider>
          <SidebarProvider>
            <div className="flex w-full min-h-screen">
              <AppSidebar />
            <div className="flex flex-col flex-1 min-w-0 relative">
              <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b border-zinc-100 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 lg:px-8">
                <SidebarTrigger className="-ml-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" />
                <div className="flex-1 flex items-center justify-between">
                  <h1 className="font-semibold text-base text-zinc-900 dark:text-zinc-50 tracking-tight">
                    Sistema de Gestión
                  </h1>
                  {/* User profile dropdown would go here */}
                  <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-sm cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                    AD
                  </div>
                </div>
              </header>
              <main className="flex-1 overflow-auto p-6 lg:p-10 bg-zinc-50/50 dark:bg-zinc-950/50">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
