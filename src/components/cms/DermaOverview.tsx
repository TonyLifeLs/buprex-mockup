"use client"

import { ExternalLink, Stethoscope, Wrench } from "lucide-react"

export function DermaOverview() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Sitio Derma</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Panel de configuración del sitio{" "}
            <a
              href="/derma"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#7c3aed] font-semibold hover:underline"
            >
              /derma <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7c3aed]/10">
          <Stethoscope className="h-6 w-6 text-[#7c3aed]" />
        </div>
      </div>

      {/* Coming soon card */}
      <div className="rounded-2xl border-2 border-dashed border-[#7c3aed]/30 bg-[#7c3aed]/5 p-10 flex flex-col items-center text-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7c3aed]/15">
          <Wrench className="h-7 w-7 text-[#7c3aed]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-800">Editores en construcción</h3>
          <p className="mt-1 text-sm text-gray-500 max-w-sm">
            Los editores de sección para el sitio Derma están próximamente disponibles.
            Por ahora puedes visualizar el sitio directamente.
          </p>
        </div>
        <a
          href="/derma"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#7c3aed] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#6d28d9] transition"
        >
          <ExternalLink className="h-4 w-4" />
          Ver sitio Derma
        </a>
      </div>
    </div>
  )
}
