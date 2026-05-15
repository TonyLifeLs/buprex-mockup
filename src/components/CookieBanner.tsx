"use client"

import { useEffect, useState } from "react"
import { Check, Cookie, Settings, X } from "lucide-react"

const COOKIE_KEY = "portal_cookie_consent"

type SiteConsent = {
  buprex: boolean
  labosuisse: boolean
  vitacap: boolean
}

const SITES: { id: keyof SiteConsent; label: string; description: string }[] = [
  { id: "buprex",     label: "BUPREX",     description: "Portal de ibuprofeno y alivio del dolor" },
  { id: "labosuisse", label: "LaboSuisse", description: "Portal de dermocosméticos" },
  { id: "vitacap",    label: "Vitacap",    description: "Portal de vitaminas y suplementos" },
]

const ALL_ACCEPTED: SiteConsent = { buprex: true, labosuisse: true, vitacap: true }
const ALL_REJECTED: SiteConsent = { buprex: false, labosuisse: false, vitacap: false }

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [configuring, setConfiguring] = useState(false)
  const [sites, setSites] = useState<SiteConsent>(ALL_ACCEPTED)

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY)
    if (!stored) setVisible(true)
  }, [])

  function acceptAll() {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(ALL_ACCEPTED))
    setVisible(false)
  }

  function rejectAll() {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(ALL_REJECTED))
    setVisible(false)
  }

  function savePreferences() {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(sites))
    setVisible(false)
  }

  function toggleSite(id: keyof SiteConsent) {
    setSites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Preferencias de cookies"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">

          {/* Header */}
          <div className="flex items-start gap-4 border-b border-gray-100 p-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-50">
              <Cookie className="h-6 w-6 text-red-700" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-gray-900">Preferencias de privacidad</h2>
              <p className="mt-1 text-sm text-gray-500">
                Utilizamos cookies para mejorar tu experiencia en nuestros portales.
              </p>
            </div>
            <button
              onClick={rejectAll}
              aria-label="Cerrar"
              className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {!configuring ? (
              <p className="text-sm leading-relaxed text-gray-600">
                Usamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico
                y personalizar el contenido en nuestros portales{" "}
                <strong className="text-gray-800">BUPREX</strong>,{" "}
                <strong className="text-gray-800">LaboSuisse</strong> y{" "}
                <strong className="text-gray-800">Vitacap</strong>. Si aceptas, el consentimiento
                se aplicará a los tres portales.{" "}
                <a
                  href="/politica-de-privacidad"
                  className="font-medium text-red-700 underline underline-offset-2 hover:text-red-600 transition"
                >
                  Política de privacidad
                </a>
              </p>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-gray-500 mb-1">
                  Activa o desactiva las cookies para cada portal:
                </p>
                {SITES.map((site) => (
                  <div
                    key={site.id}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 transition hover:border-red-200 hover:bg-red-50/30"
                    onClick={() => toggleSite(site.id)}
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{site.label}</p>
                      <p className="text-xs text-gray-500">{site.description}</p>
                    </div>
                    {/* Toggle switch */}
                    <button
                      role="switch"
                      aria-checked={sites[site.id]}
                      aria-label={`Cookies para ${site.label}`}
                      onClick={(e) => { e.stopPropagation(); toggleSite(site.id) }}
                      className={`relative flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400 ${
                        sites[site.id] ? "bg-red-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`absolute h-4 w-4 rounded-full bg-white shadow transition-transform ${
                          sites[site.id] ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-2 border-t border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={() => setConfiguring(!configuring)}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400"
            >
              <Settings className="h-3.5 w-3.5" />
              {configuring ? "Volver" : "Configurar por portal"}
            </button>

            <div className="flex gap-2">
              <button
                onClick={rejectAll}
                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400 sm:flex-none"
              >
                Rechazar todo
              </button>
              {configuring ? (
                <button
                  onClick={savePreferences}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#C0392B] to-[#7B0D0D] px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-red-200/50 transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400 sm:flex-none"
                >
                  <Check className="h-3.5 w-3.5" />
                  Guardar preferencias
                </button>
              ) : (
                <button
                  onClick={acceptAll}
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#C0392B] to-[#7B0D0D] px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-red-200/50 transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400 sm:flex-none"
                >
                  Aceptar todas
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
