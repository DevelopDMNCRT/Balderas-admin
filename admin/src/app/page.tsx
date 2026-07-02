import { Settings, Cog } from "lucide-react"

export default function Home() {
  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-6">
      <div className="relative h-24 w-24">
        <Settings className="absolute left-0 top-0 h-16 w-16 text-zinc-300 dark:text-zinc-700 animate-[spin_4s_linear_infinite]" />
        <Cog className="absolute right-0 bottom-0 h-12 w-12 text-zinc-400 dark:text-zinc-600 animate-[spin_3s_linear_infinite_reverse]" />
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Sección en desarrollo
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
          Estamos trabajando para brindarte una nueva experiencia en este módulo. ¡Pronto estará disponible!
        </p>
      </div>
    </div>
  )
}
