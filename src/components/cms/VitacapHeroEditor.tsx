"use client"

import { useVitacapStore } from "@/store/vitacap"

// ─── Primitives ───────────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  value,
  onChange,
  multiline = false,
}: {
  label: string
  hint?: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {hint && <span className="ml-2 text-xs font-normal text-gray-400">{hint}</span>}
      </label>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#C3311D] focus:bg-white focus:ring-2 focus:ring-[#C3311D]/20 resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#C3311D] focus:bg-white focus:ring-2 focus:ring-[#C3311D]/20"
        />
      )}
    </div>
  )
}

// ─── Editor ───────────────────────────────────────────────────────────────────

export function VitacapHeroEditor() {
  const { content, setContent, tokens } = useVitacapStore()

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
          <div
            className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
            style={{ backgroundColor: tokens.brandAccent, color: tokens.neutral900 }}
          >
            Hero
          </div>
        </div>
        <p className="text-[13px] text-white/75">
          Textos y botón principal de la sección de inicio.
        </p>
      </div>

      {/* Live preview strip */}
      <div
        className="rounded-2xl p-6 space-y-2"
        style={{ background: `linear-gradient(135deg, ${tokens.brand900}, ${tokens.brand800})` }}
      >
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: tokens.brandAccent }}>
          {content.heroEyebrow || "Eyebrow…"}
        </p>
        <p className="text-2xl font-black text-white leading-tight">
          {content.heroTitle || "Título principal…"}
        </p>
        <p className="text-sm text-white/70">
          {content.heroSubtitle || "Subtítulo / descripción…"}
        </p>
        <div
          className="inline-block rounded-xl px-4 py-2 text-sm font-bold mt-2"
          style={{ backgroundColor: tokens.brandAccent, color: tokens.neutral900 }}
        >
          {content.heroCtaLabel || "Botón…"}
        </div>
      </div>

      {/* Fields */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-800">Texto del Hero</h3>
        </div>
        <div className="px-5 py-5 space-y-4">
          <Field
            label="Eyebrow (etiqueta superior)"
            hint="Texto pequeño sobre el título"
            value={content.heroEyebrow}
            onChange={(v) => setContent("heroEyebrow", v)}
          />
          <Field
            label="Título principal"
            value={content.heroTitle}
            onChange={(v) => setContent("heroTitle", v)}
          />
          <Field
            label="Subtítulo / descripción"
            value={content.heroSubtitle}
            onChange={(v) => setContent("heroSubtitle", v)}
            multiline
          />
          <Field
            label="Texto del botón principal"
            value={content.heroCtaLabel}
            onChange={(v) => setContent("heroCtaLabel", v)}
          />
          <Field
            label="Nota de apoyo (bajo el botón)"
            hint="Disclaimer opcional"
            value={content.heroSupport}
            onChange={(v) => setContent("heroSupport", v)}
          />
        </div>
      </div>
    </div>
  )
}
