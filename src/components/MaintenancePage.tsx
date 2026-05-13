import Image from "next/image"
import { Wrench } from "lucide-react"
import { APP_ROUTES } from "@/constants/routes"

export function MaintenancePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f8f8f8] px-4 py-16 text-center">
      {/* Logo */}
      <div className="mb-8">
        <div className="bg-white rounded-2xl px-5 py-4 inline-block shadow-md border border-gray-100">
          <Image
            src="/images/laboratorios-life.png"
            alt="Laboratorios Life"
            width={180}
            height={50}
            className="h-12 w-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Icono */}
      <div
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl shadow-lg"
        style={{ background: "linear-gradient(135deg, #C0392B, #7B0D0D)" }}
      >
        <Wrench className="h-9 w-9 text-white" />
      </div>

      {/* Título */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
        En mantenimiento
      </h1>
      <p className="text-gray-500 text-base sm:text-lg max-w-md leading-relaxed mb-8">
        Estamos realizando mejoras en el portal. Volveremos en breve.
        <br />
        Gracias por tu paciencia.
      </p>

      {/* Barra decorativa */}
      <div className="flex gap-2 mb-10">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="h-2 w-8 rounded-full"
            style={{ backgroundColor: i % 2 === 0 ? "#C0392B" : "#e5e7eb" }}
          />
        ))}
      </div>

      {/* Volver al sitio */}
      <a
        href={APP_ROUTES.home}
        className="text-sm text-red-700 font-semibold underline-offset-4 hover:underline hover:text-red-500 transition"
      >
        ← Volver al sitio web
      </a>
    </main>
  )
}
