"use client"

import { useVitacapStore } from "@/store/vitacap"
import type { VitacapTokens } from "@/components/vitacap/theme"

// ─── Primitives ───────────────────────────────────────────────────────────────

function ColorRow({
  label,
  hint,
  value,
  onChange,
}: {
  label: string
  hint?: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-shrink-0">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-10 cursor-pointer rounded-lg border border-gray-200 p-0.5 shadow-sm"
          title={label}
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const v = e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value
          if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v)
        }}
        maxLength={7}
        className="w-28 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono uppercase outline-none focus:border-[#C3311D] focus:bg-white focus:ring-2 focus:ring-[#C3311D]/20"
      />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        {hint && <p className="text-xs text-gray-400 truncate">{hint}</p>}
      </div>
    </div>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
      </div>
      <div className="px-5 py-5 space-y-4">{children}</div>
    </div>
  )
}

// ─── Editor ───────────────────────────────────────────────────────────────────

export function VitacapColoresEditor() {
  const { tokens, setToken } = useVitacapStore()

  const colorGroups: {
    groupLabel: string
    items: { key: keyof VitacapTokens; label: string; hint: string }[]
  }[] = [
    {
      groupLabel: "Colores principales",
      items: [
        { key: "brand900", label: "Rojo vivo", hint: "#C3311D — Hero, botones, acentos primarios" },
        { key: "brand800", label: "Rojo medio", hint: "#922216 — Fondo carruseles, destacado" },
        { key: "brandAccent", label: "Amarillo brillante", hint: "#F1DF00 — Etiquetas, tags, acentos" },
      ],
    },
    {
      groupLabel: "Colores complementarios",
      items: [
        { key: "surfaceGold", label: "Sunrise / Dorado", hint: "Gradientes, tonos cálidos" },
        { key: "surfaceSand", label: "Durazno / Terracota", hint: "Card beneficio #3" },
        { key: "lineSoft", label: "Vino oscuro", hint: "Card beneficio #4, bordes suaves" },
      ],
    },
    {
      groupLabel: "Neutros",
      items: [
        { key: "neutral100", label: "Blanco", hint: "Fondos claros, texto sobre rojo" },
        { key: "neutral900", label: "Negro / Oscuro", hint: "Texto principal" },
      ],
    },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl p-6"
        style={{ background: `linear-gradient(135deg, ${tokens.brand900} 0%, ${tokens.brand800} 100%)` }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex flex-col leading-none select-none">
            <span className="text-[20px] font-black tracking-tight text-white">Vitacap</span>
            <span className="text-[26px] font-black leading-none" style={{ color: tokens.brandAccent }}>G</span>
          </div>
          <div className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
            style={{ backgroundColor: tokens.brandAccent, color: tokens.neutral900 }}>
            Colores
          </div>
        </div>
        <p className="text-[13px] text-white/75">
          Paleta oficial según el manual de marca Vitacap G.
        </p>
      </div>

      {/* Color groups */}
      {colorGroups.map((group) => (
        <SectionCard key={group.groupLabel} title={group.groupLabel}>
          {group.items.map(({ key, label, hint }) => (
            <ColorRow
              key={key}
              label={label}
              hint={hint}
              value={tokens[key]}
              onChange={(v) => setToken(key, v)}
            />
          ))}
        </SectionCard>
      ))}

      {/* Live preview */}
      <div
        className="rounded-2xl p-5 flex flex-wrap gap-3 items-center"
        style={{ background: `linear-gradient(135deg, ${tokens.brand900}, ${tokens.brand800})` }}
      >
        <span className="text-white text-sm font-bold w-full mb-1">Vista previa de paleta:</span>
        {(
          [
            { color: tokens.brand900, label: "brand-900" },
            { color: tokens.brand800, label: "brand-800" },
            { color: tokens.brandAccent, label: "accent" },
            { color: tokens.surfaceGold, label: "gold" },
            { color: tokens.surfaceSand, label: "sand" },
            { color: tokens.lineSoft, label: "vino" },
          ] as { color: string; label: string }[]
        ).map(({ color, label }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div className="h-8 w-8 rounded-full border-2 border-white/30 shadow" style={{ backgroundColor: color }} />
            <span className="text-[10px] font-mono text-white/70">{label}</span>
          </div>
        ))}
      </div>

      {/* Brand manual note */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
        <p className="text-sm font-bold text-amber-800 mb-1">📋 Manual de marca</p>
        <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
          <li>Rojo vivo (#C3311D) es el color primario — usar en Hero y botones.</li>
          <li>Amarillo brillante (#F1DF00) solo como acento, nunca como fondo principal.</li>
          <li>No usar fondos fuera de la paleta oficial.</li>
        </ul>
      </div>
    </div>
  )
}
