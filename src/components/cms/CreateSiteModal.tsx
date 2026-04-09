"use client"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CREATE SITE MODAL
 *  Diálogo para crear un nuevo sitio personalizado.
 *  El usuario ingresa el título y elige un color de acento.
 *  Al confirmar se llama onConfirm(title, accent).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from "react"
import { X, Globe, Sparkles } from "lucide-react"

// ─── Preset accent colors ─────────────────────────────────────────────────────

const ACCENT_PRESETS = [
  { color: "#2563eb", label: "Azul"      },
  { color: "#7c3aed", label: "Violeta"   },
  { color: "#0891b2", label: "Cian"      },
  { color: "#059669", label: "Esmeralda" },
  { color: "#d97706", label: "Ámbar"     },
  { color: "#dc2626", label: "Rojo"      },
  { color: "#db2777", label: "Rosa"      },
  { color: "#0f172a", label: "Negro"     },
]

// ─── Props ────────────────────────────────────────────────────────────────────

interface CreateSiteModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (title: string, accent: string) => void
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CreateSiteModal({ open, onClose, onConfirm }: CreateSiteModalProps) {
  const [title, setTitle]   = useState("")
  const [accent, setAccent] = useState(ACCENT_PRESETS[0].color)
  const [error, setError]   = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset when opened
  useEffect(() => {
    if (open) {
      setTitle("")
      setAccent(ACCENT_PRESETS[0].color)
      setError("")
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  function handleConfirm() {
    const trimmed = title.trim()
    if (!trimmed) {
      setError("El nombre del sitio es obligatorio.")
      inputRef.current?.focus()
      return
    }
    onConfirm(trimmed, accent)
    onClose()
  }

  if (!open) return null

  return (
    /* ── Overlay ── */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* ── Card ── */}
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}
        <div
          className="px-6 py-5 text-white"
          style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                <Globe className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/70">
                  Nuevo sitio
                </p>
                <h2 className="text-lg font-black leading-tight">
                  Publica tu sitio web
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 hover:bg-white/30 transition"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-sm text-white/70">
            Dale un nombre a tu nueva landing page. Podrás personalizarla desde el panel.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">

          {/* Site title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wide text-gray-500">
              Nombre del sitio
            </label>
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError("") }}
              onKeyDown={(e) => { if (e.key === "Enter") handleConfirm() }}
              placeholder="Ej: Sitio Pharma Pro, Landing Clínica..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition"
            />
            {error && (
              <p className="text-xs text-red-500 font-medium">{error}</p>
            )}
          </div>

          {/* Accent color */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-gray-500">
              Color de marca
            </label>
            <div className="flex flex-wrap gap-2">
              {ACCENT_PRESETS.map((p) => (
                <button
                  key={p.color}
                  type="button"
                  title={p.label}
                  onClick={() => setAccent(p.color)}
                  className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    accent === p.color
                      ? "border-gray-800 scale-110 shadow-md"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: p.color }}
                />
              ))}
              {/* Custom color */}
              <label
                title="Color personalizado"
                className="relative h-8 w-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-500 transition overflow-hidden"
              >
                <span className="text-[10px] text-gray-400">+</span>
                <input
                  type="color"
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </label>
            </div>
            {/* Preview badge */}
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-white text-xs font-bold w-fit"
              style={{ backgroundColor: accent }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {title.trim() || "Tu sitio"} — vista previa del color
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-3 px-6 pb-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white transition hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: accent }}
          >
            Crear sitio
          </button>
        </div>
      </div>
    </div>
  )
}
