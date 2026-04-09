"use client"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE BUILDER EDITOR
 *  Constructor de landing pages sin código. Cada sección es un acordeón
 *  desplegable con todos los campos necesarios para personalizar el sitio.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState } from "react"
import {
  ChevronDown,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Navigation,
  Sparkles,
  LayoutGrid,
  ImagePlay,
  Megaphone,
  Footprints,
  Palette,
  ExternalLink,
  RotateCcw,
  Monitor,
  GripVertical,
} from "lucide-react"
import { useSiteBuilderStore } from "@/store/sitebuilder"
import type { SBState, SBActions } from "@/store/sitebuilder"
import { ImageUpload } from "@/components/cms/ImageUpload"

// ─── Micro helpers ────────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </label>
      {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
      {children}
    </div>
  )
}

function Inp(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 ${props.className ?? ""}`}
    />
  )
}

function Txt(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={props.rows ?? 2}
      className={`w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none resize-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 ${props.className ?? ""}`}
    />
  )
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-9 shrink-0 cursor-pointer rounded-lg border border-gray-200 p-0.5"
        />
        <Inp
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="font-mono"
        />
      </div>
    </Field>
  )
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  )
}

// ─── Collapsible section wrapper ──────────────────────────────────────────────

function CollapsibleSection({
  icon,
  title,
  badge,
  isOpen,
  onToggle,
  visible,
  onToggleVisible,
  accent = "#2563eb",
  children,
}: {
  icon: React.ReactNode
  title: string
  badge?: string
  isOpen: boolean
  onToggle: () => void
  visible?: boolean
  onToggleVisible?: () => void
  accent?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50/80 transition text-left"
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-xl shrink-0 text-sm"
          style={{ backgroundColor: `${accent}18`, color: accent }}
        >
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800">{title}</p>
          {badge && <p className="text-[11px] text-gray-400 truncate">{badge}</p>}
        </div>

        {/* Visibility toggle */}
        {onToggleVisible !== undefined && (
          <span
            role="button"
            title={visible ? "Visible en el sitio" : "Oculto del sitio"}
            onClick={(e) => {
              e.stopPropagation()
              onToggleVisible()
            }}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              visible ? "text-blue-500 bg-blue-50" : "text-gray-300 hover:text-gray-500"
            }`}
          >
            {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </span>
        )}

        <ChevronDown
          className="h-4 w-4 text-gray-400 transition-transform shrink-0"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Body */}
      <div
        className="overflow-hidden transition-all duration-200"
        style={{ maxHeight: isOpen ? "9999px" : "0px" }}
      >
        <div className="px-4 pb-5 pt-3 border-t border-gray-100 space-y-4">
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Main editor ──────────────────────────────────────────────────────────────

export function SiteBuilderEditor({ sb: sbProp, previewHref }: { sb?: SBState & SBActions; previewHref?: string } = {}) {
  const globalSb = useSiteBuilderStore()
  const sb = sbProp ?? globalSb
  const accent = sb.palette.primary

  const [open, setOpen] = useState<Record<string, boolean>>({
    palette:  true,
    navbar:   false,
    hero:     false,
    cards:    false,
    carousel: false,
    cta:      false,
    footer:   false,
  })

  function toggle(key: string) {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // ── 1. Palette ──────────────────────────────────────────────────────────────
  const PALETTE_KEYS: [keyof typeof sb.palette, string][] = [
    ["primary",   "Color principal"],
    ["secondary", "Color secundario"],
    ["accent",    "Acento / CTA"],
    ["bg",        "Fondo del sitio"],
    ["text",      "Texto oscuro"],
    ["textLight", "Texto claro"],
  ]

  // ── 2. Hero layout options ─────────────────────────────────────────────────
  const BG_OPTIONS = [
    { value: "gradient", label: "Degradado" },
    { value: "color",    label: "Color sólido" },
    { value: "image",    label: "Imagen" },
  ] as const

  const POS_OPTIONS = [
    { value: "right", label: "Derecha" },
    { value: "left",  label: "Izquierda" },
    { value: "none",  label: "Sin imagen" },
  ] as const

  // ── 3. Card layout options ─────────────────────────────────────────────────
  const LAYOUT_OPTIONS = [
    { value: "grid-2", label: "2 columnas" },
    { value: "grid-3", label: "3 columnas" },
    { value: "grid-4", label: "4 columnas" },
  ] as const

  return (
    <div className="space-y-3 max-w-2xl mx-auto pb-12">

      {/* ── Header card ── */}
      <div className="rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Monitor className="h-4 w-4 text-white/70" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                  Constructor sin código
                </span>
              </div>
              <h2 className="text-2xl font-black">Crea tu propio sitio</h2>
              <p className="text-sm text-white/70 mt-1 max-w-xs">
                Personaliza cada sección y ve el resultado en tiempo real.
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <a
                href={previewHref ?? "/mi-sitio"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-white/20 hover:bg-white/30 px-3 py-2 text-sm font-bold transition"
              >
                <ExternalLink className="h-4 w-4" />
                Ver preview
              </a>
              <button
                type="button"
                onClick={() => {
                  if (confirm("¿Restablecer todo al estado inicial?")) sb.resetAll()
                }}
                className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-3 py-2 text-sm font-semibold transition"
              >
                <RotateCcw className="h-4 w-4" />
                Reiniciar
              </button>
            </div>
          </div>
        </div>

        {/* Section visibility quick-toggle row */}
        <div className="bg-white border-t border-gray-100 px-4 py-3 flex flex-wrap gap-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide w-full mb-1">
            Visibilidad de secciones
          </p>
          {(
            [
              { key: "navbar",   label: "Navbar"    },
              { key: "hero",     label: "Hero"      },
              { key: "cards",    label: "Tarjetas"  },
              { key: "carousel", label: "Carrusel"  },
              { key: "cta",      label: "Banner"    },
              { key: "footer",   label: "Footer"    },
            ] as const
          ).map(({ key, label }) => {
            const visible = sb.visibility[key]
            return (
              <button
                key={key}
                type="button"
                onClick={() => sb.toggleVisibility(key)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold border transition ${
                  visible
                    ? "border-blue-200 bg-blue-50 text-blue-600"
                    : "border-gray-200 bg-gray-50 text-gray-400"
                }`}
              >
                {visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* 1 · PALETA DE COLORES                                               */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <CollapsibleSection
        icon={<Palette className="h-4 w-4" />}
        title="Paleta de colores"
        badge="Colores globales aplicados a todo el sitio"
        isOpen={open.palette}
        onToggle={() => toggle("palette")}
        accent={accent}
      >
        <div className="grid grid-cols-2 gap-3">
          {PALETTE_KEYS.map(([key, label]) => (
            <ColorField
              key={key}
              label={label}
              value={sb.palette[key]}
              onChange={(v) => sb.setPalette(key, v)}
            />
          ))}
        </div>

        {/* Swatch preview */}
        <div>
          <p className="text-[11px] text-gray-400 mb-1.5">Vista previa de paleta</p>
          <div className="flex gap-1.5 h-7">
            {PALETTE_KEYS.map(([key]) => (
              <div
                key={key}
                title={key}
                className="flex-1 rounded-lg border border-black/10 shadow-sm"
                style={{ backgroundColor: sb.palette[key] }}
              />
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* 2 · NAVBAR                                                           */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <CollapsibleSection
        icon={<Navigation className="h-4 w-4" />}
        title="Navbar"
        badge="Barra de navegación superior"
        isOpen={open.navbar}
        onToggle={() => toggle("navbar")}
        visible={sb.visibility.navbar}
        onToggleVisible={() => sb.toggleVisibility("navbar")}
        accent={accent}
      >
        {/* Logo */}
        <SectionDivider label="Logo" />
        <ImageUpload
          label="Imagen del logo"
          value={sb.navbar.logoUrl}
          onChange={(v) => sb.setNavbar({ logoUrl: v })}
        />
        <Field label="Texto del logo (si no hay imagen)">
          <Inp
            value={sb.navbar.logoText}
            onChange={(e) => sb.setNavbar({ logoText: e.target.value })}
            placeholder="Mi Empresa"
          />
        </Field>

        {/* Colors */}
        <SectionDivider label="Colores" />
        <div className="grid grid-cols-2 gap-3">
          <ColorField
            label="Fondo navbar"
            value={sb.navbar.bgColor}
            onChange={(v) => sb.setNavbar({ bgColor: v })}
          />
          <ColorField
            label="Color de texto"
            value={sb.navbar.textColor}
            onChange={(v) => sb.setNavbar({ textColor: v })}
          />
        </div>

        {/* CTA */}
        <SectionDivider label="Botón CTA" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Texto del botón">
            <Inp
              value={sb.navbar.ctaLabel}
              onChange={(e) => sb.setNavbar({ ctaLabel: e.target.value })}
              placeholder="Comenzar"
            />
          </Field>
          <Field label="Enlace del botón">
            <Inp
              value={sb.navbar.ctaHref}
              onChange={(e) => sb.setNavbar({ ctaHref: e.target.value })}
              placeholder="#contacto"
            />
          </Field>
          <ColorField
            label="Fondo botón"
            value={sb.navbar.ctaBg}
            onChange={(v) => sb.setNavbar({ ctaBg: v })}
          />
          <ColorField
            label="Texto botón"
            value={sb.navbar.ctaText}
            onChange={(v) => sb.setNavbar({ ctaText: v })}
          />
        </div>

        {/* Links */}
        <SectionDivider label="Enlaces de navegación" />
        <div className="space-y-2">
          {sb.navbar.links.map((link) => (
            <div
              key={link.id}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2"
            >
              <GripVertical className="h-4 w-4 text-gray-300 shrink-0" />
              <Inp
                value={link.label}
                onChange={(e) => sb.updateNavLink(link.id, { label: e.target.value })}
                placeholder="Etiqueta"
                className="flex-1"
              />
              <Inp
                value={link.href}
                onChange={(e) => sb.updateNavLink(link.id, { href: e.target.value })}
                placeholder="#seccion"
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => sb.removeNavLink(link.id)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={sb.addNavLink}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 py-2 text-sm font-semibold text-blue-500 hover:bg-blue-50 transition"
          >
            <Plus className="h-4 w-4" /> Agregar enlace
          </button>
        </div>
      </CollapsibleSection>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* 3 · HERO                                                             */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <CollapsibleSection
        icon={<Sparkles className="h-4 w-4" />}
        title="Hero"
        badge="Sección principal de bienvenida"
        isOpen={open.hero}
        onToggle={() => toggle("hero")}
        visible={sb.visibility.hero}
        onToggleVisible={() => sb.toggleVisibility("hero")}
        accent={accent}
      >
        {/* Background */}
        <SectionDivider label="Fondo" />
        <Field label="Tipo de fondo">
          <div className="flex gap-2">
            {BG_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => sb.setHero({ bgType: opt.value })}
                className={`flex-1 rounded-lg py-2 text-xs font-bold border transition ${
                  sb.hero.bgType === opt.value
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Field>

        {sb.hero.bgType === "gradient" && (
          <div className="grid grid-cols-2 gap-3">
            <ColorField label="Color inicial" value={sb.hero.bgColor}  onChange={(v) => sb.setHero({ bgColor: v })} />
            <ColorField label="Color final"   value={sb.hero.bgColor2} onChange={(v) => sb.setHero({ bgColor2: v })} />
          </div>
        )}
        {sb.hero.bgType === "color" && (
          <ColorField label="Color de fondo" value={sb.hero.bgColor} onChange={(v) => sb.setHero({ bgColor: v })} />
        )}
        {sb.hero.bgType === "image" && (
          <ImageUpload
            label="Imagen de fondo"
            value={sb.hero.bgImageUrl}
            onChange={(v) => sb.setHero({ bgImageUrl: v })}
          />
        )}

        {/* Texts */}
        <SectionDivider label="Textos" />
        <Field label="Eyebrow (texto pequeño arriba)">
          <Inp
            value={sb.hero.eyebrow}
            onChange={(e) => sb.setHero({ eyebrow: e.target.value })}
            placeholder="✨ Bienvenido"
          />
        </Field>
        <Field label="Título principal">
          <Txt
            value={sb.hero.title}
            onChange={(e) => sb.setHero({ title: e.target.value })}
            placeholder="Tu solución empieza aquí"
            rows={2}
          />
        </Field>
        <Field label="Subtítulo / descripción">
          <Txt
            value={sb.hero.subtitle}
            onChange={(e) => sb.setHero({ subtitle: e.target.value })}
            placeholder="Descripción breve y convincente"
            rows={2}
          />
        </Field>

        {/* CTA */}
        <SectionDivider label="Botón CTA" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Texto del botón">
            <Inp
              value={sb.hero.ctaLabel}
              onChange={(e) => sb.setHero({ ctaLabel: e.target.value })}
              placeholder="Ver más"
            />
          </Field>
          <Field label="Enlace">
            <Inp
              value={sb.hero.ctaHref}
              onChange={(e) => sb.setHero({ ctaHref: e.target.value })}
              placeholder="#servicios"
            />
          </Field>
          <ColorField label="Fondo botón"  value={sb.hero.ctaBg}   onChange={(v) => sb.setHero({ ctaBg: v })} />
          <ColorField label="Texto botón"  value={sb.hero.ctaText} onChange={(v) => sb.setHero({ ctaText: v })} />
        </div>

        {/* Image */}
        <SectionDivider label="Imagen lateral" />
        <Field label="Posición">
          <div className="flex gap-2">
            {POS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => sb.setHero({ imagePos: opt.value })}
                className={`flex-1 rounded-lg py-2 text-xs font-bold border transition ${
                  sb.hero.imagePos === opt.value
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Field>
        {sb.hero.imagePos !== "none" && (
          <ImageUpload
            label="Imagen del hero"
            value={sb.hero.imageUrl}
            onChange={(v) => sb.setHero({ imageUrl: v })}
          />
        )}
      </CollapsibleSection>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* 4 · TARJETAS / FEATURES                                              */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <CollapsibleSection
        icon={<LayoutGrid className="h-4 w-4" />}
        title="Tarjetas / Features"
        badge={`${sb.cards.items.length} tarjetas · ${sb.cards.layout}`}
        isOpen={open.cards}
        onToggle={() => toggle("cards")}
        visible={sb.visibility.cards}
        onToggleVisible={() => sb.toggleVisibility("cards")}
        accent={accent}
      >
        <SectionDivider label="Encabezado de sección" />
        <Field label="Título">
          <Inp
            value={sb.cards.sectionTitle}
            onChange={(e) => sb.setCards({ sectionTitle: e.target.value })}
            placeholder="¿Qué ofrecemos?"
          />
        </Field>
        <Field label="Subtítulo">
          <Inp
            value={sb.cards.sectionSubtitle}
            onChange={(e) => sb.setCards({ sectionSubtitle: e.target.value })}
            placeholder="Todo lo que necesitas."
          />
        </Field>

        <SectionDivider label="Diseño de grilla" />
        <Field label="Columnas">
          <div className="flex gap-2">
            {LAYOUT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => sb.setCards({ layout: opt.value })}
                className={`flex-1 rounded-lg py-2 text-xs font-bold border transition ${
                  sb.cards.layout === opt.value
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Field>

        <SectionDivider label="Tarjetas" />
        <div className="space-y-3">
          {sb.cards.items.map((card, idx) => (
            <div
              key={card.id}
              className="rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Card header */}
              <div
                className="flex items-center justify-between px-3 py-2.5"
                style={{ backgroundColor: card.bgColor }}
              >
                <span className="text-sm font-bold" style={{ color: card.textColor }}>
                  {card.icon} Tarjeta {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => sb.removeCard(card.id)}
                  className="flex h-6 w-6 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Card fields */}
              <div className="p-3 space-y-3 bg-gray-50/50">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Ícono (emoji)">
                    <Inp
                      value={card.icon}
                      onChange={(e) => sb.updateCard(card.id, { icon: e.target.value })}
                      placeholder="⚡"
                    />
                  </Field>
                  <Field label="Título">
                    <Inp
                      value={card.title}
                      onChange={(e) => sb.updateCard(card.id, { title: e.target.value })}
                      placeholder="Título"
                    />
                  </Field>
                </div>
                <Field label="Descripción">
                  <Txt
                    rows={2}
                    value={card.body}
                    onChange={(e) => sb.updateCard(card.id, { body: e.target.value })}
                    placeholder="Descripción breve"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <ColorField
                    label="Fondo tarjeta"
                    value={card.bgColor}
                    onChange={(v) => sb.updateCard(card.id, { bgColor: v })}
                  />
                  <ColorField
                    label="Color texto"
                    value={card.textColor}
                    onChange={(v) => sb.updateCard(card.id, { textColor: v })}
                  />
                </div>
                <ImageUpload
                  label="Imagen (opcional)"
                  value={card.imageUrl}
                  onChange={(v) => sb.updateCard(card.id, { imageUrl: v })}
                  previewHeight={60}
                  previewWidth={120}
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={sb.addCard}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 py-2.5 text-sm font-semibold text-blue-500 hover:bg-blue-50 transition"
          >
            <Plus className="h-4 w-4" /> Agregar tarjeta
          </button>
        </div>
      </CollapsibleSection>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* 5 · CARRUSEL                                                         */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <CollapsibleSection
        icon={<ImagePlay className="h-4 w-4" />}
        title="Carrusel"
        badge={`${sb.carousel.slides.length} diapositivas`}
        isOpen={open.carousel}
        onToggle={() => toggle("carousel")}
        visible={sb.visibility.carousel}
        onToggleVisible={() => sb.toggleVisibility("carousel")}
        accent={accent}
      >
        <SectionDivider label="Configuración" />
        <Field label="Título de la sección">
          <Inp
            value={sb.carousel.sectionTitle}
            onChange={(e) => sb.setCarousel({ sectionTitle: e.target.value })}
            placeholder="Nuestros proyectos"
          />
        </Field>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={sb.carousel.autoPlay}
              onChange={(e) => sb.setCarousel({ autoPlay: e.target.checked })}
              className="h-4 w-4 rounded accent-blue-600"
            />
            <span className="text-sm font-semibold text-gray-700">Auto-reproducir</span>
          </label>
        </div>

        <SectionDivider label="Diapositivas" />
        <div className="space-y-3">
          {sb.carousel.slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Slide header */}
              <div
                className="flex items-center justify-between px-3 py-2.5"
                style={{ backgroundColor: slide.bgColor }}
              >
                <span className="text-sm font-bold text-white">
                  Slide {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => sb.removeSlide(slide.id)}
                  className="flex h-6 w-6 items-center justify-center rounded-lg text-white/60 hover:bg-white/20 hover:text-white transition"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Slide fields */}
              <div className="p-3 space-y-3 bg-gray-50/50">
                <Field label="Título">
                  <Inp
                    value={slide.title}
                    onChange={(e) => sb.updateSlide(slide.id, { title: e.target.value })}
                    placeholder="Título del slide"
                  />
                </Field>
                <Field label="Subtítulo">
                  <Txt
                    rows={2}
                    value={slide.subtitle}
                    onChange={(e) => sb.updateSlide(slide.id, { subtitle: e.target.value })}
                    placeholder="Descripción"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Texto del CTA">
                    <Inp
                      value={slide.ctaLabel}
                      onChange={(e) => sb.updateSlide(slide.id, { ctaLabel: e.target.value })}
                      placeholder="Ver más"
                    />
                  </Field>
                  <Field label="Enlace CTA">
                    <Inp
                      value={slide.ctaHref}
                      onChange={(e) => sb.updateSlide(slide.id, { ctaHref: e.target.value })}
                      placeholder="#"
                    />
                  </Field>
                </div>
                <ColorField
                  label="Color de fondo"
                  value={slide.bgColor}
                  onChange={(v) => sb.updateSlide(slide.id, { bgColor: v })}
                />
                <ImageUpload
                  label="Imagen del slide"
                  value={slide.imageUrl}
                  onChange={(v) => sb.updateSlide(slide.id, { imageUrl: v })}
                  previewHeight={80}
                  previewWidth={200}
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={sb.addSlide}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 py-2.5 text-sm font-semibold text-blue-500 hover:bg-blue-50 transition"
          >
            <Plus className="h-4 w-4" /> Agregar slide
          </button>
        </div>
      </CollapsibleSection>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* 6 · BANNER CTA                                                       */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <CollapsibleSection
        icon={<Megaphone className="h-4 w-4" />}
        title="Banner de llamada a la acción"
        badge="Sección de conversión"
        isOpen={open.cta}
        onToggle={() => toggle("cta")}
        visible={sb.visibility.cta}
        onToggleVisible={() => sb.toggleVisibility("cta")}
        accent={accent}
      >
        <SectionDivider label="Textos" />
        <Field label="Título">
          <Inp
            value={sb.cta.title}
            onChange={(e) => sb.setCTA({ title: e.target.value })}
            placeholder="¿Listo para empezar?"
          />
        </Field>
        <Field label="Subtítulo">
          <Txt
            rows={2}
            value={sb.cta.subtitle}
            onChange={(e) => sb.setCTA({ subtitle: e.target.value })}
            placeholder="Únete a miles de personas..."
          />
        </Field>

        <SectionDivider label="Botón" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Texto del botón">
            <Inp
              value={sb.cta.btnLabel}
              onChange={(e) => sb.setCTA({ btnLabel: e.target.value })}
              placeholder="Contáctanos"
            />
          </Field>
          <Field label="Enlace">
            <Inp
              value={sb.cta.btnHref}
              onChange={(e) => sb.setCTA({ btnHref: e.target.value })}
              placeholder="#contacto"
            />
          </Field>
          <ColorField label="Fondo botón"  value={sb.cta.btnBg}    onChange={(v) => sb.setCTA({ btnBg: v })} />
          <ColorField label="Texto botón"  value={sb.cta.btnText}  onChange={(v) => sb.setCTA({ btnText: v })} />
        </div>

        <SectionDivider label="Colores del banner" />
        <div className="grid grid-cols-2 gap-3">
          <ColorField label="Fondo banner"     value={sb.cta.bgColor}    onChange={(v) => sb.setCTA({ bgColor: v })} />
          <ColorField label="Texto del banner" value={sb.cta.textColor}  onChange={(v) => sb.setCTA({ textColor: v })} />
        </div>
      </CollapsibleSection>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* 7 · FOOTER                                                           */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <CollapsibleSection
        icon={<Footprints className="h-4 w-4" />}
        title="Footer"
        badge="Pie de página"
        isOpen={open.footer}
        onToggle={() => toggle("footer")}
        visible={sb.visibility.footer}
        onToggleVisible={() => sb.toggleVisibility("footer")}
        accent={accent}
      >
        {/* Logo */}
        <SectionDivider label="Marca" />
        <ImageUpload
          label="Logo (opcional)"
          value={sb.footer.logoUrl}
          onChange={(v) => sb.setFooter({ logoUrl: v })}
        />
        <Field label="Nombre / texto del logo">
          <Inp
            value={sb.footer.logoText}
            onChange={(e) => sb.setFooter({ logoText: e.target.value })}
            placeholder="Mi Empresa"
          />
        </Field>
        <Field label="Tagline">
          <Inp
            value={sb.footer.tagline}
            onChange={(e) => sb.setFooter({ tagline: e.target.value })}
            placeholder="Construyendo el futuro contigo."
          />
        </Field>
        <Field label="Texto de copyright">
          <Inp
            value={sb.footer.copyright}
            onChange={(e) => sb.setFooter({ copyright: e.target.value })}
            placeholder="© 2026 Mi Empresa."
          />
        </Field>

        {/* Colors */}
        <SectionDivider label="Colores" />
        <div className="grid grid-cols-2 gap-3">
          <ColorField label="Fondo footer"  value={sb.footer.bgColor}    onChange={(v) => sb.setFooter({ bgColor: v })} />
          <ColorField label="Color de texto" value={sb.footer.textColor}  onChange={(v) => sb.setFooter({ textColor: v })} />
        </div>

        {/* Columns */}
        <SectionDivider label="Columnas de enlaces" />
        <div className="space-y-3">
          {sb.footer.columns.map((col) => (
            <div key={col.id} className="rounded-xl border border-gray-200 bg-gray-50/50 p-3 space-y-2">
              <div className="flex items-center gap-2">
                <Inp
                  value={col.title}
                  onChange={(e) => sb.updateFooterCol(col.id, e.target.value)}
                  placeholder="Título columna"
                  className="flex-1 font-semibold"
                />
                <button
                  type="button"
                  onClick={() => sb.removeFooterCol(col.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="space-y-1.5 pl-2">
                {col.links.map((link, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Inp
                      value={link.label}
                      onChange={(e) => sb.updateColLink(col.id, i, { label: e.target.value })}
                      placeholder="Etiqueta"
                      className="flex-1"
                    />
                    <Inp
                      value={link.href}
                      onChange={(e) => sb.updateColLink(col.id, i, { href: e.target.value })}
                      placeholder="#"
                      className="flex-1 font-mono text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => sb.removeColLink(col.id, i)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => sb.addColLink(col.id)}
                  className="text-xs font-semibold text-blue-500 hover:text-blue-700 transition"
                >
                  + Agregar enlace
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={sb.addFooterCol}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 py-2 text-sm font-semibold text-blue-500 hover:bg-blue-50 transition"
          >
            <Plus className="h-4 w-4" /> Agregar columna
          </button>
        </div>

        {/* Social */}
        <SectionDivider label="Redes sociales" />
        <div className="space-y-2">
          {sb.footer.social.map((soc) => (
            <div key={soc.id} className="flex items-center gap-2">
              <Inp
                value={soc.platform}
                onChange={(e) => sb.updateSocial(soc.id, { platform: e.target.value })}
                placeholder="Instagram"
                className="flex-1"
              />
              <Inp
                value={soc.url}
                onChange={(e) => sb.updateSocial(soc.id, { url: e.target.value })}
                placeholder="https://instagram.com/..."
                className="flex-1 font-mono text-xs"
              />
              <button
                type="button"
                onClick={() => sb.removeSocial(soc.id)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={sb.addSocial}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 py-2 text-sm font-semibold text-blue-500 hover:bg-blue-50 transition"
          >
            <Plus className="h-4 w-4" /> Agregar red social
          </button>
        </div>
      </CollapsibleSection>

      {/* Tip */}
      <p className="text-center text-xs text-gray-400">
        Los cambios se guardan automáticamente en el navegador.{" "}
        <a
          href={previewHref ?? "/mi-sitio"}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-500 hover:underline"
        >
          Ver mi sitio →
        </a>
      </p>
    </div>
  )
}
