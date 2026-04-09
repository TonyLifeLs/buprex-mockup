"use client"

import { useEffect, useState } from "react"
import { Cookie, X } from "lucide-react"

const COOKIE_KEY = "buprex_cookie_consent"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY)
    if (!stored) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(COOKIE_KEY, "accepted")
    setVisible(false)
  }

  function reject() {
    localStorage.setItem(COOKIE_KEY, "rejected")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Preferencias de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/10 ring-1 ring-black/5">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6">

          {/* Icono */}
          <div className="hidden sm:flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-50">
            <Cookie className="h-5 w-5 text-red-700" />
          </div>

          {/* Texto */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              Este sitio utiliza cookies
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
              Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación, 
              analizar el tráfico y personalizar el contenido. Puedes aceptarlas todas o rechazar 
              las no esenciales.{" "}
              <a
                href="/politica-de-privacidad"
                className="font-medium text-red-700 underline underline-offset-2 hover:text-red-600 transition"
              >
                Política de privacidad
              </a>
            </p>
          </div>

          {/* Botones */}
          <div className="flex flex-shrink-0 items-center gap-2">
            <button
              onClick={reject}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400"
            >
              Rechazar
            </button>
            <button
              onClick={accept}
              className="rounded-xl bg-gradient-to-r from-[#C0392B] to-[#7B0D0D] px-5 py-2 text-xs font-semibold text-white shadow-md shadow-red-200/50 transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400"
            >
              Aceptar todas
            </button>
            <button
              onClick={reject}
              aria-label="Cerrar"
              className="ml-1 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
