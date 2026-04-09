"use client"

import { useState } from "react"
import { RotateCcw, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import {
  useVitacapStore,
  DEFAULT_VITACAP_STATE,
  type VitacapBenefitCard,
  type VitacapSlide,
} from "@/store/vitacap"
import type { VitacapTokens } from "@/components/vitacap/theme"

// ─── Types ────────────────────────────────────────────────────────────────────

type EditorTab = "colores" | "hero" | "beneficios" | "carruseles" | "secciones"

// ─── Sub-components ───────────────────────────────────────────────────────────

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

function SectionCard({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
      >
        <span className="text-sm font-bold text-gray-800">{title}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>
      {open && <div className="px-5 pb-5 space-y-4 border-t border-gray-100">{children}</div>}
    </div>
  )
}

// ─── Tab panels ───────────────────────────────────────────────────────────────

function ColoresTab() {
  const { tokens, setToken } = useVitacapStore()

  const colorGroups: {
    groupLabel: string
    items: { key: keyof VitacapTokens; label: string; hint: string }[]
  }[] = [
    {
      groupLabel: "Colores principales",
      items: [
        { key: "brand900", label: "Rojo vivo", hint: "Color primario — Hero, acentos, botones" },
        { key: "brand800", label: "Rojo medio", hint: "Fondo carruseles, sección destacado" },
        { key: "brandAccent", label: "Amarillo brillante", hint: "Acentos, etiquetas, tags" },
      ],
    },
    {
      groupLabel: "Colores complementarios",
      items: [
        { key: "surfaceGold", label: "Sunrise / Dorado", hint: "Gradientes, cálido" },
        { key: "surfaceSand", label: "Durazno / Terracota", hint: "Cards benefit #3" },
        { key: "lineSoft", label: "Vino oscuro", hint: "Cards benefit #4, bordes" },
      ],
    },
    {
      groupLabel: "Neutros",
      items: [
        { key: "neutral100", label: "Blanco", hint: "Fondos claros, texto sobre rojo" },
        { key: "neutral900", label: "Negro/Oscuro", hint: "Texto principal" },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      {colorGroups.map((group) => (
        <SectionCard key={group.groupLabel} title={group.groupLabel}>
          <div className="pt-3 space-y-4">
            {group.items.map(({ key, label, hint }) => (
              <ColorRow
                key={key}
                label={label}
                hint={hint}
                value={tokens[key]}
                onChange={(v) => setToken(key, v)}
              />
            ))}
          </div>
        </SectionCard>
      ))}

      {/* Live preview */}
      <div
        className="rounded-2xl p-5 flex flex-wrap gap-3 items-center"
        style={{
          background: `linear-gradient(135deg, ${tokens.brand900}, ${tokens.brand800})`,
        }}
      >
        <span className="text-white text-sm font-bold">Vista previa de colores:</span>
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
            <div
              className="h-8 w-8 rounded-full border-2 border-white/30 shadow"
              style={{ backgroundColor: color }}
            />
            <span className="text-[10px] font-mono text-white/70">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function HeroTab() {
  const { content, setContent } = useVitacapStore()

  return (
    <div className="space-y-4">
      <SectionCard title="Texto del Hero">
        <div className="pt-3 space-y-4">
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
            label="Nota de apoyo (bajo los botones)"
            hint="Disclaimer opcional"
            value={content.heroSupport}
            onChange={(v) => setContent("heroSupport", v)}
          />
        </div>
      </SectionCard>
    </div>
  )
}

function BeneficiosTab() {
  const { content, updateBenefit } = useVitacapStore()

  return (
    <div className="space-y-4">
      <SectionCard title="Encabezado de la sección">
        <div className="pt-3 space-y-4">
          <Field
            label="Etiqueta"
            value={content.beneficiosLabel}
            onChange={(v) => {
              const { setContent } = useVitacapStore.getState()
              setContent("beneficiosLabel", v)
            }}
          />
          <Field
            label="Título de la sección"
            value={content.beneficiosTitle}
            onChange={(v) => {
              const { setContent } = useVitacapStore.getState()
              setContent("beneficiosTitle", v)
            }}
          />
        </div>
      </SectionCard>

      {content.benefits.map((card: VitacapBenefitCard, idx: number) => (
        <SectionCard key={card.id} title={`Beneficio ${idx + 1} — ${card.title}`}>
          <div className="pt-3 space-y-4">
            {/* Color preview strip */}
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center text-xl"
                style={{ backgroundColor: card.color + "20", border: `2px solid ${card.color}` }}
              >
                {card.icon}
              </div>
              <div className="flex items-center gap-2 flex-1">
                <label className="text-sm font-semibold text-gray-700 flex-shrink-0">Color:</label>
                <input
                  type="color"
                  value={card.color}
                  onChange={(e) => updateBenefit(card.id, { color: e.target.value })}
                  className="h-8 w-8 cursor-pointer rounded border border-gray-200 p-0.5"
                />
                <input
                  type="text"
                  value={card.color}
                  onChange={(e) => {
                    const v = e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) updateBenefit(card.id, { color: v })
                  }}
                  maxLength={7}
                  className="w-28 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-mono uppercase outline-none focus:border-[#C3311D] focus:ring-1 focus:ring-[#C3311D]/20"
                />
              </div>
            </div>
            <Field
              label="Ícono (emoji)"
              value={card.icon}
              onChange={(v) => updateBenefit(card.id, { icon: v })}
            />
            <Field
              label="Título"
              value={card.title}
              onChange={(v) => updateBenefit(card.id, { title: v })}
            />
            <Field
              label="Descripción"
              value={card.body}
              onChange={(v) => updateBenefit(card.id, { body: v })}
              multiline
            />
          </div>
        </SectionCard>
      ))}
    </div>
  )
}

function CarruselesTab() {
  const { content, updateSlideActiva, updateSlidePorQue, setContent } = useVitacapStore()

  return (
    <div className="space-y-4">
      {/* Carrusel 1 */}
      <SectionCard title="Carrusel 1 — Activa tu día">
        <div className="pt-3 space-y-4">
          <Field
            label="Título del carrusel"
            value={content.carousel1Title}
            onChange={(v) => setContent("carousel1Title", v)}
          />
          <div className="border-t border-gray-100 pt-3 space-y-6">
            {content.slidesActivaTuDia.map((slide: VitacapSlide, idx: number) => (
              <div key={slide.id} className="space-y-3 rounded-xl border border-gray-100 p-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Slide {idx + 1}</p>
                <Field
                  label="Título"
                  value={slide.title}
                  onChange={(v) => updateSlideActiva(slide.id, { title: v })}
                />
                <Field
                  label="Descripción"
                  value={slide.description}
                  onChange={(v) => updateSlideActiva(slide.id, { description: v })}
                  multiline
                />
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Carrusel 2 */}
      <SectionCard title="Carrusel 2 — ¿Por qué Vitacap G?">
        <div className="pt-3 space-y-4">
          <Field
            label="Título del carrusel"
            value={content.carousel2Title}
            onChange={(v) => setContent("carousel2Title", v)}
          />
          <div className="border-t border-gray-100 pt-3 space-y-6">
            {content.slidesPorQueElegir.map((slide: VitacapSlide, idx: number) => (
              <div key={slide.id} className="space-y-3 rounded-xl border border-gray-100 p-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Slide {idx + 1}</p>
                <Field
                  label="Título"
                  value={slide.title}
                  onChange={(v) => updateSlidePorQue(slide.id, { title: v })}
                />
                <Field
                  label="Descripción"
                  value={slide.description}
                  onChange={(v) => updateSlidePorQue(slide.id, { description: v })}
                  multiline
                />
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  )
}

function SeccionesTab() {
  const { content, setContent } = useVitacapStore()

  return (
    <div className="space-y-4">
      <SectionCard title="¿Qué es Vitacap G?">
        <div className="pt-3 space-y-4">
          <Field
            label="Etiqueta"
            value={content.queEsLabel}
            onChange={(v) => setContent("queEsLabel", v)}
          />
          <Field
            label="Título"
            value={content.queEsTitle}
            onChange={(v) => setContent("queEsTitle", v)}
          />
          <Field
            label="Descripción"
            value={content.queEsDesc}
            onChange={(v) => setContent("queEsDesc", v)}
            multiline
          />
        </div>
      </SectionCard>

      <SectionCard title="¿Para quién es?">
        <div className="pt-3 space-y-4">
          <Field
            label="Título"
            value={content.paraQuienTitle}
            onChange={(v) => setContent("paraQuienTitle", v)}
          />
          <Field
            label="Descripción"
            value={content.paraQuienDesc}
            onChange={(v) => setContent("paraQuienDesc", v)}
            multiline
          />
        </div>
      </SectionCard>

      <SectionCard title="Cómo usarlo">
        <div className="pt-3 space-y-4">
          <Field
            label="Título"
            value={content.comoUsarloTitle}
            onChange={(v) => setContent("comoUsarloTitle", v)}
          />
          <Field
            label="Subtítulo"
            value={content.comoUsarloDesc}
            onChange={(v) => setContent("comoUsarloDesc", v)}
          />
        </div>
      </SectionCard>

      <SectionCard title="Destacado final">
        <div className="pt-3 space-y-4">
          <Field
            label="Etiqueta"
            value={content.highlightLabel}
            onChange={(v) => setContent("highlightLabel", v)}
          />
          <Field
            label="Título"
            value={content.highlightTitle}
            onChange={(v) => setContent("highlightTitle", v)}
          />
          <Field
            label="Descripción"
            value={content.highlightDesc}
            onChange={(v) => setContent("highlightDesc", v)}
            multiline
          />
          <Field
            label="Tags (separados por coma)"
            hint="Ej: Ginseng, Aloe Vera, Vitamina C"
            value={content.highlightTags.join(", ")}
            onChange={(v) =>
              setContent(
                "highlightTags",
                v
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
              )
            }
          />
          <Field
            label="Nota de precaución"
            value={content.highlightNote}
            onChange={(v) => setContent("highlightNote", v)}
            multiline
          />
        </div>
      </SectionCard>
    </div>
  )
}

// ─── Main editor ──────────────────────────────────────────────────────────────

const TABS: { id: EditorTab; label: string }[] = [
  { id: "colores", label: "🎨 Colores" },
  { id: "hero", label: "🦸 Hero" },
  { id: "beneficios", label: "⚡ Beneficios" },
  { id: "carruseles", label: "🎠 Carruseles" },
  { id: "secciones", label: "📝 Secciones" },
]

export function VitacapCMSEditor() {
  const [activeTab, setActiveTab] = useState<EditorTab>("colores")
  const { resetAll, tokens } = useVitacapStore()

  function handleReset() {
    if (confirm("¿Restablecer toda la configuración de Vitacap G a los valores originales?")) {
      resetAll()
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{
          background: `linear-gradient(135deg, ${tokens.brand900} 0%, ${tokens.brand800} 100%)`,
        }}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            {/* Logo tipográfico */}
            <div className="flex flex-col leading-none select-none">
              <span
                className="text-[22px] font-black tracking-tight"
                style={{ color: "#fff", fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Vitacap
              </span>
              <span
                className="text-[28px] font-black leading-none"
                style={{ color: tokens.brandAccent, fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                G
              </span>
            </div>
            <div
              className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
              style={{ backgroundColor: tokens.brandAccent, color: tokens.neutral900 }}
            >
              CMS Editor
            </div>
          </div>
          <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.75)" }}>
            Personaliza colores, textos y contenido. Los cambios se guardan automáticamente.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="/vitacap"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-white/25 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Ver página
          </a>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-xl border border-white/25 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restablecer
          </button>
        </div>
      </div>

      {/* ── Tab switcher ─────────────────────────────────────────────────────── */}
      <div className="flex gap-1 rounded-2xl bg-gray-100 p-1 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab content ──────────────────────────────────────────────────────── */}
      {activeTab === "colores" && <ColoresTab />}
      {activeTab === "hero" && <HeroTab />}
      {activeTab === "beneficios" && <BeneficiosTab />}
      {activeTab === "carruseles" && <CarruselesTab />}
      {activeTab === "secciones" && <SeccionesTab />}

      {/* ── Brand manual reminder ────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
        <p className="text-sm font-bold text-amber-800 mb-1">📋 Manual de marca Vitacap G</p>
        <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
          <li>Rojo vivo (#C3311D) es el color primario — usar en Hero y botones principales.</li>
          <li>Amarillo brillante (#F1DF00) solo como acento, nunca como fondo principal.</li>
          <li>Tipografía base: Montserrat. Títulos de sección: Nairi Amber.</li>
          <li>No usar fondos fuera de la paleta oficial.</li>
        </ul>
      </div>
    </div>
  )
}
