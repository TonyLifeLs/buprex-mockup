"use client"

import { useState } from "react"
import { Plus, Trash2, GripVertical, RotateCcw, ExternalLink } from "lucide-react"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  useLaboSuisseStore,
  DEFAULT_LS_COLORS,
  DEFAULT_LS_NAV_LINKS,
  type LSNavLink,
  type LSHeroSlide,
  type LSFAQItem,
  type LSNewsItem,
  type LSFooterLink,
} from "@/store/labosuisse"

// ─── Color swatch row ─────────────────────────────────────────────────────────

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
      {/* Color picker */}
      <div className="relative flex-shrink-0">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-10 cursor-pointer rounded-lg border border-gray-200 p-0.5 shadow-sm"
          title={label}
        />
      </div>
      {/* Hex input */}
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const v = e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value
          if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v)
        }}
        maxLength={7}
        className="w-28 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20 uppercase"
      />
      {/* Label + hint */}
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        {hint && <p className="text-xs text-gray-400 truncate">{hint}</p>}
      </div>
    </div>
  )
}

// ─── Sortable nav link row ────────────────────────────────────────────────────

function SortableLSLinkRow({
  link,
  onChange,
  onDelete,
}: {
  link: LSNavLink
  onChange: (l: LSNavLink) => void
  onDelete: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: link.id })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
      className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3 shadow-sm"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none"
        type="button"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex flex-1 gap-2">
        <input
          value={link.label}
          onChange={(e) => onChange({ ...link, label: e.target.value })}
          placeholder="Etiqueta"
          className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20"
        />
        <input
          value={link.href}
          onChange={(e) => onChange({ ...link, href: e.target.value })}
          placeholder="#seccion"
          className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20"
        />
      </div>
      <button
        type="button"
        onClick={onDelete}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

// ─── Section card ─────────────────────────────────────────────────────────────

function EditorSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        {description && <p className="mt-0.5 text-xs text-gray-500">{description}</p>}
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  )
}

// ─── Main editor ─────────────────────────────────────────────────────────────

export function LaboSuisseThemeEditor() {
  const {
    colors, navbar, navLinks, heroSlides, banner, brandIntro,
    categories, news, faq, newsletter, footer, crescinaFeatured,
    updateColors, updateNavbar, setNavLinks, setHeroSlides,
    updateBanner, updateBrandIntro, updateCrescinaFeatured,
    updateCategories, updateNews, updateFAQ, updateNewsletter,
    updateFooter, resetAll,
  } = useLaboSuisseStore()

  const [resetConfirm, setResetConfirm] = useState(false)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIdx = navLinks.findIndex((l) => l.id === active.id)
      const newIdx = navLinks.findIndex((l) => l.id === over.id)
      setNavLinks(arrayMove(navLinks, oldIdx, newIdx))
    }
  }

  function addLink() {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
    setNavLinks([...navLinks, { id, label: "Nuevo enlace", href: "#" }])
  }

  function handleReset() {
    if (resetConfirm) {
      resetAll()
      setResetConfirm(false)
    } else {
      setResetConfirm(true)
      setTimeout(() => setResetConfirm(false), 3000)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Tema Labo Suisse</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Personaliza los colores y la navegación del sitio{" "}
            <a
              href="/labosuisse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#B52A2D] font-semibold hover:underline"
            >
              /labosuisse <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </p>
        </div>
        <button
          onClick={handleReset}
          className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
            resetConfirm
              ? "border-red-300 bg-red-50 text-red-600 hover:bg-red-100"
              : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          }`}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {resetConfirm ? "¿Confirmar?" : "Restablecer"}
        </button>
      </div>

      {/* ── 1. Acento primario ─────────────────────────────────────────────────── */}
      <EditorSection
        title="Color de acento primario"
        description="Usado en botones secundarios (link), hover del acordeón, iconos del footer y encabezados."
      >
        <ColorRow
          label="Acento principal"
          hint="--ls-red-700 · botones link, hover acordeón"
          value={colors.lsRed700}
          onChange={(v) => updateColors({ lsRed700: v })}
        />
        <ColorRow
          label="Acento medio"
          hint="--ls-red-600 · sub-encabezados footer, hover íconos sociales"
          value={colors.lsRed600}
          onChange={(v) => updateColors({ lsRed600: v })}
        />
        <ColorRow
          label="Acento oscuro"
          hint="--ls-red-800 · hover en botones link"
          value={colors.lsRed800}
          onChange={(v) => updateColors({ lsRed800: v })}
        />
        {/* Preview */}
        <div className="mt-2 flex flex-wrap gap-3 rounded-xl bg-gray-50 p-4 border border-gray-100">
          <span className="text-xs text-gray-400 w-full mb-1 font-semibold uppercase tracking-wider">Vista previa</span>
          <span
            className="inline-flex items-center rounded px-3 py-1 text-xs font-bold"
            style={{ backgroundColor: colors.lsRed700, color: "#fff" }}
          >
            Botón primario
          </span>
          <span
            className="inline-flex items-center rounded border px-3 py-1 text-xs font-bold"
            style={{ borderColor: colors.lsRed700, color: colors.lsRed700 }}
          >
            Hover enlace
          </span>
          <span
            className="inline-flex items-center rounded px-3 py-1 text-xs font-bold"
            style={{ backgroundColor: colors.lsRed600, color: "#fff" }}
          >
            Footer heading
          </span>
        </div>
      </EditorSection>

      {/* ── 2. Colores de línea / categoría ───────────────────────────────────── */}
      <EditorSection
        title="Colores de línea (categorías)"
        description="Fondos de badges, tarjetas de categoría y bloques destacados. Usar tonos pasteles / neutros."
      >
        <ColorRow
          label="Crescina"
          hint="--brand-crescina · Cuidado Capilar"
          value={colors.brandCrescina}
          onChange={(v) => updateColors({ brandCrescina: v })}
        />
        <ColorRow
          label="Fillerina 12SP"
          hint="--brand-fillerina-12sp · Cuidado de la Piel"
          value={colors.brandFillerina12sp}
          onChange={(v) => updateColors({ brandFillerina12sp: v })}
        />
        <ColorRow
          label="Fillerina Color"
          hint="--brand-fillerina-color · Sección Marcas"
          value={colors.brandFillerinaColor}
          onChange={(v) => updateColors({ brandFillerinaColor: v })}
        />
        <ColorRow
          label="Transdermic"
          hint="--brand-transdermic · Descubre Labo"
          value={colors.brandTransdermic}
          onChange={(v) => updateColors({ brandTransdermic: v })}
        />
        <ColorRow
          label="Oxytreat"
          hint="--brand-oxytreat · Tecnología Transdérmica"
          value={colors.brandOxytreat}
          onChange={(v) => updateColors({ brandOxytreat: v })}
        />
        {/* Swatches preview */}
        <div className="flex gap-2 mt-2 flex-wrap">
          {[
            { label: "Crescina", color: colors.brandCrescina },
            { label: "Fillerina", color: colors.brandFillerina12sp },
            { label: "Fil.Color", color: colors.brandFillerinaColor },
            { label: "Transdermic", color: colors.brandTransdermic },
            { label: "Oxytreat", color: colors.brandOxytreat },
          ].map(({ label, color }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div
                className="h-10 w-10 rounded-lg border border-gray-200 shadow-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-[10px] text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </EditorSection>

      {/* ── 3. Paleta de grises ───────────────────────────────────────────────── */}
      <EditorSection
        title="Paleta de grises"
        description="Texto, bordes e iconos del sitio."
      >
        <ColorRow
          label="Gris 900 — texto principal"
          hint="--ls-gray-900"
          value={colors.lsGray900}
          onChange={(v) => updateColors({ lsGray900: v })}
        />
        <ColorRow
          label="Gris 700 — texto secundario"
          hint="--ls-gray-700"
          value={colors.lsGray700}
          onChange={(v) => updateColors({ lsGray700: v })}
        />
        <ColorRow
          label="Gris 500 — placeholder / iconos"
          hint="--ls-gray-500"
          value={colors.lsGray500}
          onChange={(v) => updateColors({ lsGray500: v })}
        />
        <ColorRow
          label="Gris 300 — bordes"
          hint="--ls-gray-300"
          value={colors.lsGray300}
          onChange={(v) => updateColors({ lsGray300: v })}
        />
        <ColorRow
          label="Gris 100 — fondos suaves"
          hint="--ls-gray-100"
          value={colors.lsGray100}
          onChange={(v) => updateColors({ lsGray100: v })}
        />
      </EditorSection>

      {/* ── 4. Footer ─────────────────────────────────────────────────────────── */}
      <EditorSection
        title="Footer"
        description="Color de fondo del pie de página oscuro."
      >
        <ColorRow
          label="Fondo del footer"
          hint="--ls-gray-900 override"
          value={colors.footerBg}
          onChange={(v) => updateColors({ footerBg: v })}
        />
        <div className="mt-2 rounded-xl overflow-hidden border border-gray-100" style={{ backgroundColor: colors.footerBg }}>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#fff" }}>
              LABO SUISSE
            </span>
            <span className="text-[10px] text-white/40">vista previa footer</span>
          </div>
        </div>
      </EditorSection>

      {/* ── 5. Navbar / Logo ──────────────────────────────────────────────────── */}
      <EditorSection
        title="Navbar — Logo y textos"
        description="Texto del logotipo bipartito y etiquetas de botones CTA."
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Palabra 1 (negrita)
            </label>
            <input
              value={navbar.logoWord1}
              onChange={(e) => updateNavbar({ logoWord1: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Palabra 2 (ligera)
            </label>
            <input
              value={navbar.logoWord2}
              onChange={(e) => updateNavbar({ logoWord2: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Color palabra 1
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={navbar.logoWord1Color}
                onChange={(e) => updateNavbar({ logoWord1Color: e.target.value })}
                className="h-9 w-9 cursor-pointer rounded-lg border border-gray-200 p-0.5"
              />
              <input
                type="text"
                value={navbar.logoWord1Color}
                onChange={(e) => {
                  const v = e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) updateNavbar({ logoWord1Color: v })
                }}
                maxLength={7}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20 uppercase"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Color palabra 2
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={navbar.logoWord2Color}
                onChange={(e) => updateNavbar({ logoWord2Color: e.target.value })}
                className="h-9 w-9 cursor-pointer rounded-lg border border-gray-200 p-0.5"
              />
              <input
                type="text"
                value={navbar.logoWord2Color}
                onChange={(e) => {
                  const v = e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) updateNavbar({ logoWord2Color: v })
                }}
                maxLength={7}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20 uppercase"
              />
            </div>
          </div>
        </div>

        {/* Logo preview */}
        <div className="mt-1 flex items-center gap-1 rounded-xl border border-gray-100 bg-white px-5 py-4">
          <span className="font-bold tracking-[0.15em] uppercase text-lg" style={{ color: navbar.logoWord1Color }}>
            {navbar.logoWord1}
          </span>
          <span className="font-light tracking-[0.1em] uppercase text-base ml-1" style={{ color: navbar.logoWord2Color }}>
            {navbar.logoWord2}
          </span>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Texto CTA del header
          </label>
          <input
            value={navbar.ctaLabel}
            onChange={(e) => updateNavbar({ ctaLabel: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Enlace CTA del header
          </label>
          <input
            value={navbar.ctaHref}
            onChange={(e) => updateNavbar({ ctaHref: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20"
          />
        </div>
      </EditorSection>

      {/* ── 6. Nav links ──────────────────────────────────────────────────────── */}
      <EditorSection
        title="Navegación"
        description="Drag para reordenar. Máximo 7 enlaces recomendado."
      >
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={navLinks.map((l) => l.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <SortableLSLinkRow
                  key={link.id}
                  link={link}
                  onChange={(updated) =>
                    setNavLinks(navLinks.map((l) => (l.id === updated.id ? updated : l)))
                  }
                  onDelete={() => setNavLinks(navLinks.filter((l) => l.id !== link.id))}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <button
          type="button"
          onClick={addLink}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-500 transition hover:border-[#B52A2D] hover:bg-red-50 hover:text-[#B52A2D]"
        >
          <Plus className="h-4 w-4" />
          Agregar enlace
        </button>
      </EditorSection>

      {/* ── 7. Hero slides ────────────────────────────────────────────────────── */}
      <EditorSection
        title="Hero — Diapositivas"
        description="Textos de cada slide del carrusel principal."
      >
        {heroSlides.map((slide, i) => (
          <div key={slide.id} className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Slide {i + 1}</p>
            {(["title", "subtitle", "description", "cta", "ctaSecondary", "badge"] as (keyof LSHeroSlide)[]).map((field) => (
              <div key={field}>
                <label className="mb-1 block text-xs text-gray-400 capitalize">{field}</label>
                <input
                  value={String(slide[field])}
                  onChange={(e) => {
                    const updated = heroSlides.map((s, j) => j === i ? { ...s, [field]: e.target.value } : s)
                    setHeroSlides(updated)
                  }}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#B52A2D]"
                />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-xs text-gray-400">ctaHref</label>
                <input
                  value={slide.ctaHref}
                  onChange={(e) => setHeroSlides(heroSlides.map((s, j) => j === i ? { ...s, ctaHref: e.target.value } : s))}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#B52A2D]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">ctaSecondaryHref</label>
                <input
                  value={slide.ctaSecondaryHref}
                  onChange={(e) => setHeroSlides(heroSlides.map((s, j) => j === i ? { ...s, ctaSecondaryHref: e.target.value } : s))}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#B52A2D]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Imagen (path)</label>
                <input
                  value={slide.image}
                  onChange={(e) => setHeroSlides(heroSlides.map((s, j) => j === i ? { ...s, image: e.target.value } : s))}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#B52A2D]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">Fondo (HEX / CSS)</label>
                <input
                  value={slide.bg}
                  onChange={(e) => setHeroSlides(heroSlides.map((s, j) => j === i ? { ...s, bg: e.target.value } : s))}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#B52A2D]"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={slide.textDark}
                onChange={(e) => setHeroSlides(heroSlides.map((s, j) => j === i ? { ...s, textDark: e.target.checked } : s))}
                className="rounded"
              />
              Texto oscuro (fondo claro)
            </label>
          </div>
        ))}
      </EditorSection>

      {/* ── 8. Banner Alternate ───────────────────────────────────────────────── */}
      <EditorSection
        title="Banner Alternado"
        description="Sección 'NO INJECTIONS · YES TRANSDERMIC TECHNOLOGY'."
      >
        {(["superlabel", "title", "titleAccent", "description", "cta1Label", "cta1Href", "cta2Label", "cta2Href", "imageAlt"] as (keyof typeof banner)[]).map((field) => (
          <div key={field}>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">{field}</label>
            <input
              value={String(banner[field])}
              onChange={(e) => updateBanner({ [field]: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white"
            />
          </div>
        ))}
      </EditorSection>

      {/* ── 9. Brand Intro ────────────────────────────────────────────────────── */}
      <EditorSection
        title="Introducción de Marca"
        description="Sección de copy de innovación dermocosmética."
      >
        {(["superlabel", "title", "titleAccent", "description", "ctaLabel", "ctaHref"] as (keyof typeof brandIntro)[]).map((field) => (
          <div key={field}>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">{field}</label>
            {field === "description" ? (
              <textarea
                value={brandIntro[field]}
                onChange={(e) => updateBrandIntro({ [field]: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white"
              />
            ) : (
              <input
                value={String(brandIntro[field])}
                onChange={(e) => updateBrandIntro({ [field]: e.target.value })}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white"
              />
            )}
          </div>
        ))}
      </EditorSection>

      {/* ── 10. Noticias ──────────────────────────────────────────────────────── */}
      <EditorSection
        title="Noticias — Títulos de sección"
        description="Superlabel y título del carrusel de noticias."
      >
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Superlabel</label>
          <input
            value={news.superlabel}
            onChange={(e) => updateNews({ superlabel: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Título de sección</label>
          <input
            value={news.sectionTitle}
            onChange={(e) => updateNews({ sectionTitle: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white"
          />
        </div>
        {news.items.map((item, i) => (
          <div key={item.id} className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Noticia {i + 1}</p>
              <button
                type="button"
                onClick={() => updateNews({ items: news.items.filter((_, j) => j !== i) })}
                className="text-red-400 hover:text-red-600 transition"
                aria-label="Eliminar noticia"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {(["date", "category", "title", "excerpt", "image", "href"] as (keyof LSNewsItem)[]).map((field) => (
              <div key={field}>
                <label className="mb-1 block text-xs text-gray-400 capitalize">{field}</label>
                <input
                  value={String(item[field])}
                  onChange={(e) => updateNews({ items: news.items.map((n, j) => j === i ? { ...n, [field]: e.target.value } : n) })}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#B52A2D]"
                />
              </div>
            ))}
          </div>
        ))}
        <button
          type="button"
          onClick={() => updateNews({ items: [...news.items, { id: Date.now().toString(36), date: "", category: "", title: "Nueva noticia", excerpt: "", image: "", href: "#" }] })}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-500 transition hover:border-[#B52A2D] hover:bg-red-50 hover:text-[#B52A2D]"
        >
          <Plus className="h-4 w-4" />
          Agregar noticia
        </button>
      </EditorSection>

      {/* ── 11. FAQ ───────────────────────────────────────────────────────────── */}
      <EditorSection
        title="FAQ"
        description="Preguntas frecuentes del acordeón."
      >
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Superlabel</label>
          <input
            value={faq.superlabel}
            onChange={(e) => updateFAQ({ superlabel: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Título</label>
          <input
            value={faq.sectionTitle}
            onChange={(e) => updateFAQ({ sectionTitle: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white"
          />
        </div>
        {faq.items.map((item, i) => (
          <div key={item.id} className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pregunta {i + 1}</p>
              <button
                type="button"
                onClick={() => updateFAQ({ items: faq.items.filter((_, j) => j !== i) })}
                className="text-red-400 hover:text-red-600 transition"
                aria-label="Eliminar pregunta"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Pregunta</label>
              <input
                value={item.question}
                onChange={(e) => updateFAQ({ items: faq.items.map((f, j) => j === i ? { ...f, question: e.target.value } : f) })}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#B52A2D]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Respuesta</label>
              <textarea
                value={item.answer}
                onChange={(e) => updateFAQ({ items: faq.items.map((f, j) => j === i ? { ...f, answer: e.target.value } : f) })}
                rows={3}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#B52A2D]"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => updateFAQ({ items: [...faq.items, { id: Date.now().toString(36), question: "Nueva pregunta", answer: "" }] })}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-500 transition hover:border-[#B52A2D] hover:bg-red-50 hover:text-[#B52A2D]"
        >
          <Plus className="h-4 w-4" />
          Agregar pregunta
        </button>
      </EditorSection>

      {/* ── 12. Newsletter ────────────────────────────────────────────────────── */}
      <EditorSection
        title="Newsletter — Labo Club"
        description="Textos del formulario de suscripción."
      >
        {(["superlabel", "title", "tagline", "description", "namePlaceholder", "emailPlaceholder", "ctaLabel", "consentText", "successTitle", "successDescription"] as (keyof typeof newsletter)[]).map((field) => (
          <div key={field}>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">{field}</label>
            {(field === "description" || field === "consentText") ? (
              <textarea
                value={String(newsletter[field])}
                onChange={(e) => updateNewsletter({ [field]: e.target.value })}
                rows={2}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white"
              />
            ) : (
              <input
                value={String(newsletter[field])}
                onChange={(e) => updateNewsletter({ [field]: e.target.value })}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white"
              />
            )}
          </div>
        ))}
      </EditorSection>

      {/* ── 13. Footer ────────────────────────────────────────────────────────── */}
      <EditorSection
        title="Footer"
        description="Logo, tagline, redes sociales y copyright."
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Palabra 1</label>
            <input
              value={footer.logoWord1}
              onChange={(e) => updateFooter({ logoWord1: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Palabra 2</label>
            <input
              value={footer.logoWord2}
              onChange={(e) => updateFooter({ logoWord2: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white"
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Tagline</label>
          <textarea
            value={footer.tagline}
            onChange={(e) => updateFooter({ tagline: e.target.value })}
            rows={2}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(["instagram", "facebook", "linkedin"] as const).map((net) => (
            <div key={net}>
              <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">{net}</label>
              <input
                value={footer[net]}
                onChange={(e) => updateFooter({ [net]: e.target.value })}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white"
              />
            </div>
          ))}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Copyright</label>
          <input
            value={footer.copyright}
            onChange={(e) => updateFooter({ copyright: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white"
          />
        </div>
        {/* Footer columns link editor */}
        {footer.columns.map((col, ci) => (
          <div key={col.id} className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Título columna</label>
              <input
                value={col.title}
                onChange={(e) => updateFooter({ columns: footer.columns.map((c, j) => j === ci ? { ...c, title: e.target.value } : c) })}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#B52A2D]"
              />
            </div>
            {col.links.map((link, li) => (
              <div key={link.id} className="flex gap-2 items-center">
                <input
                  value={link.label}
                  placeholder="Etiqueta"
                  onChange={(e) => updateFooter({ columns: footer.columns.map((c, j) => j === ci ? { ...c, links: c.links.map((l, k) => k === li ? { ...l, label: e.target.value } : l) } : c) })}
                  className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#B52A2D]"
                />
                <input
                  value={link.href}
                  placeholder="#href"
                  onChange={(e) => updateFooter({ columns: footer.columns.map((c, j) => j === ci ? { ...c, links: c.links.map((l, k) => k === li ? { ...l, href: e.target.value } : l) } : c) })}
                  className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#B52A2D]"
                />
                <button
                  type="button"
                  onClick={() => updateFooter({ columns: footer.columns.map((c, j) => j === ci ? { ...c, links: c.links.filter((_, k) => k !== li) } : c) })}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => updateFooter({ columns: footer.columns.map((c, j) => j === ci ? { ...c, links: [...c.links, { id: Date.now().toString(36), label: "Enlace", href: "#" }] } : c) })}
              className="flex items-center gap-2 text-sm text-[#B52A2D] font-semibold hover:underline"
            >
              <Plus className="h-3.5 w-3.5" /> Agregar enlace
            </button>
          </div>
        ))}
      </EditorSection>

      {/* Reset defaults reminder */}
      <p className="text-center text-xs text-gray-400 pb-4">
        Los cambios se guardan automáticamente en el navegador.
      </p>
    </div>
  )
}
