"use client"

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Plus, Trash2 } from "lucide-react"
import { useLaboSuisseStore, type LSCrescinaCard } from "@/store/labosuisse"
import { ImageUpload } from "@/components/cms/ImageUpload"

// ─── Primitives ───────────────────────────────────────────────────────────────

function Inp({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20 resize-y" />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20" />
      )}
    </div>
  )
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        {description && <p className="mt-0.5 text-xs text-gray-500">{description}</p>}
      </div>
      <div className="px-5 py-5 space-y-4">{children}</div>
    </div>
  )
}

// ─── Sortable Crescina Card ───────────────────────────────────────────────────

function SortableCrescinaCard({
  card,
  onUpdate,
  onDelete,
}: {
  card: LSCrescinaCard
  onUpdate: (patch: Partial<LSCrescinaCard>) => void
  onDelete: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: card.id })

  return (
    <div ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-2">
      <div className="flex items-start gap-2">
        <button {...attributes} {...listeners} type="button"
          className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none mt-1">
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex-1 space-y-2">
          <Inp label="Título" value={card.title} onChange={(v) => onUpdate({ title: v })} />
          <Inp label="Subtítulo" value={card.subtitle} onChange={(v) => onUpdate({ subtitle: v })} />
          <Inp label="Descripción" value={card.description} onChange={(v) => onUpdate({ description: v })} multiline />
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex-shrink-0">Fondo:</label>
            <input type="color" value={card.accentBg?.startsWith("#") ? card.accentBg : "#ffffff"}
              onChange={(e) => onUpdate({ accentBg: e.target.value })}
              className="h-8 w-8 cursor-pointer rounded-lg border border-gray-200 p-0.5 flex-shrink-0" />
            <input type="text" value={card.accentBg} onChange={(e) => onUpdate({ accentBg: e.target.value })}
              className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-mono outline-none focus:border-[#B52A2D]" />
          </div>
        </div>
        <button type="button" onClick={onDelete}
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// ─── Editor ───────────────────────────────────────────────────────────────────

export function LSContenidoEditor() {
  const { banner, brandIntro, crescinaFeatured, updateBanner, updateBrandIntro, updateCrescinaFeatured } = useLaboSuisseStore()

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function handleCardDrag(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const cards = crescinaFeatured.supportingCards
      const oi = cards.findIndex((c) => c.id === active.id)
      const ni = cards.findIndex((c) => c.id === over.id)
      updateCrescinaFeatured({ supportingCards: arrayMove(cards, oi, ni) })
    }
  }

  function addCard() {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
    updateCrescinaFeatured({
      supportingCards: [
        ...crescinaFeatured.supportingCards,
        { id, title: "Nueva tarjeta", subtitle: "", description: "", accentBg: "#e5e7eb" },
      ],
    })
  }

  function deleteCard(id: string) {
    updateCrescinaFeatured({ supportingCards: crescinaFeatured.supportingCards.filter((c) => c.id !== id) })
  }

  function updateCard(id: string, patch: Partial<LSCrescinaCard>) {
    updateCrescinaFeatured({ supportingCards: crescinaFeatured.supportingCards.map((c) => c.id === id ? { ...c, ...patch } : c) })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #B52A2D 0%, #7a1a1d 100%)" }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex flex-col leading-none select-none">
            <span className="text-[20px] font-black tracking-[0.15em] uppercase text-white">LABO</span>
            <span className="text-[18px] font-light tracking-[0.1em] uppercase text-white/80">SUISSE</span>
          </div>
          <div className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
            Contenido
          </div>
        </div>
        <p className="text-[13px] text-white/75">Banner alternado, introducción de marca y sección Crescina destacada.</p>
      </div>

      {/* Banner Alternate */}
      <Section title="Banner Alternado" description="Sección con imagen y botones.">
        <Inp label="Superlabel" value={banner.superlabel} onChange={(v) => updateBanner({ superlabel: v })} />
        <Inp label="Título" value={banner.title} onChange={(v) => updateBanner({ title: v })} />
        <Inp label="Título — acento" value={banner.titleAccent} onChange={(v) => updateBanner({ titleAccent: v })} />
        <Inp label="Descripción" value={banner.description} onChange={(v) => updateBanner({ description: v })} multiline />
        <div className="grid grid-cols-2 gap-3">
          <Inp label="Botón 1 — texto" value={banner.cta1Label} onChange={(v) => updateBanner({ cta1Label: v })} />
          <Inp label="Botón 1 — enlace" value={banner.cta1Href} onChange={(v) => updateBanner({ cta1Href: v })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Inp label="Botón 2 — texto" value={banner.cta2Label} onChange={(v) => updateBanner({ cta2Label: v })} />
          <Inp label="Botón 2 — enlace" value={banner.cta2Href} onChange={(v) => updateBanner({ cta2Href: v })} />
        </div>
        <ImageUpload label="Imagen del banner" value={banner.image}
          onChange={(v) => updateBanner({ image: v })} previewHeight={80} previewWidth={140} />
        <Inp label="Alt de la imagen" value={banner.imageAlt} onChange={(v) => updateBanner({ imageAlt: v })} />
      </Section>

      {/* Brand Intro */}
      <Section title="Introducción de Marca">
        <Inp label="Superlabel" value={brandIntro.superlabel} onChange={(v) => updateBrandIntro({ superlabel: v })} />
        <Inp label="Título" value={brandIntro.title} onChange={(v) => updateBrandIntro({ title: v })} />
        <Inp label="Título — acento" value={brandIntro.titleAccent} onChange={(v) => updateBrandIntro({ titleAccent: v })} />
        <Inp label="Descripción" value={brandIntro.description} onChange={(v) => updateBrandIntro({ description: v })} multiline />
        <div className="grid grid-cols-2 gap-3">
          <Inp label="Texto del botón" value={brandIntro.ctaLabel} onChange={(v) => updateBrandIntro({ ctaLabel: v })} />
          <Inp label="Enlace del botón" value={brandIntro.ctaHref} onChange={(v) => updateBrandIntro({ ctaHref: v })} />
        </div>
      </Section>

      {/* Crescina Featured */}
      <Section title="Crescina Destacada" description="Producto principal + tarjetas de apoyo arrastrables.">
        <Inp label="Superlabel" value={crescinaFeatured.superlabel} onChange={(v) => updateCrescinaFeatured({ superlabel: v })} />
        <Inp label="Título de la sección" value={crescinaFeatured.sectionTitle} onChange={(v) => updateCrescinaFeatured({ sectionTitle: v })} />
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Producto principal</p>
          <Inp label="Título" value={crescinaFeatured.mainTitle} onChange={(v) => updateCrescinaFeatured({ mainTitle: v })} />
          <Inp label="Subtítulo" value={crescinaFeatured.mainSubtitle} onChange={(v) => updateCrescinaFeatured({ mainSubtitle: v })} />
          <Inp label="Descripción" value={crescinaFeatured.mainDescription} onChange={(v) => updateCrescinaFeatured({ mainDescription: v })} multiline />
          <div className="grid grid-cols-2 gap-3">
            <Inp label="Texto del botón" value={crescinaFeatured.mainCta} onChange={(v) => updateCrescinaFeatured({ mainCta: v })} />
            <Inp label="CTA — enlace" value={crescinaFeatured.mainCtaHref} onChange={(v) => updateCrescinaFeatured({ mainCtaHref: v })} />
          </div>
          <ImageUpload label="Imagen del producto" value={crescinaFeatured.mainImage}
            onChange={(v) => updateCrescinaFeatured({ mainImage: v })} previewHeight={96} previewWidth={96} />
          <Inp label="Alt de imagen" value={crescinaFeatured.mainImageAlt} onChange={(v) => updateCrescinaFeatured({ mainImageAlt: v })} />
        </div>

        {/* Supporting Cards — DnD */}
        <div className="border-t border-gray-100 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tarjetas de apoyo</p>
            <button type="button" onClick={addCard}
              className="flex items-center gap-1 rounded-lg bg-[#B52A2D] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#922216] transition">
              <Plus className="h-3 w-3" /> Añadir
            </button>
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleCardDrag}>
            <SortableContext items={crescinaFeatured.supportingCards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {crescinaFeatured.supportingCards.map((card) => (
                  <SortableCrescinaCard key={card.id} card={card}
                    onUpdate={(p) => updateCard(card.id, p)}
                    onDelete={() => deleteCard(card.id)} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          {crescinaFeatured.supportingCards.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-4">Sin tarjetas. Añade la primera.</p>
          )}
        </div>
      </Section>

      <p className="text-center text-xs text-gray-400 pb-4">Los cambios se guardan automáticamente.</p>
    </div>
  )
}
