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
      <body className={`${inter.className} antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}>
        <TooltipProvider>
          <SidebarProvider>
            <div className="flex w-full min-h-screen">
              <AppSidebar />
            <div className="flex flex-col flex-1 w-full relative">
              <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-white dark:bg-zinc-900 px-6">
                <SidebarTrigger className="-ml-2" />
                <div className="flex-1 flex items-center justify-between">
                  <h1 className="font-semibold text-sm lg:text-base text-zinc-800 dark:text-zinc-200">
                    Sistema de Gestión
                  </h1>
                  {/* User profile dropdown would go here */}
                  <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-medium">
                    AD
                  </div>
                </div>
              </header>
              <main className="flex-1 overflow-auto p-4 lg:p-8">
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
