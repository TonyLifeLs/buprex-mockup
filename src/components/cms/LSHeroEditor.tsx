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
import { GripVertical, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { useLaboSuisseStore, type LSHeroSlide } from "@/store/labosuisse"
import { ImageUpload } from "@/components/cms/ImageUpload"

// ─── Sortable Slide Card ──────────────────────────────────────────────────────

function SortableSlideCard({
  slide,
  index,
  onUpdate,
  onDelete,
}: {
  slide: LSHeroSlide
  index: number
  onUpdate: (patch: Partial<LSHeroSlide>) => void
  onDelete: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: slide.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  }

  return (
    <div ref={setNodeRef} style={style}
      className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <button {...attributes} {...listeners} type="button"
          className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none">
          <GripVertical className="h-4 w-4" />
        </button>
        <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
          style={{ backgroundColor: "#B52A2D" }}>{index + 1}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">{slide.title || `Slide ${index + 1}`}</p>
          <p className="text-xs text-gray-400 truncate">{slide.tag}</p>
        </div>
        <button type="button" onClick={() => setExpanded(!expanded)}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-200 transition">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        <button type="button" onClick={onDelete}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Expanded fields */}
      {expanded && (
        <div className="p-5 space-y-4">
          {(["tag", "title", "subtitle", "description", "cta", "ctaHref", "ctaSecondary", "ctaSecondaryHref", "badge"] as const).map((field) => {
            const FIELD_LABELS: Record<string, string> = {
              tag: "Etiqueta",
              title: "Título",
              subtitle: "Subtítulo",
              description: "Descripción",
              cta: "Texto del botón principal",
              ctaHref: "Enlace del botón principal",
              ctaSecondary: "Texto del botón secundario",
              ctaSecondaryHref: "Enlace del botón secundario",
              badge: "Insignia",
            };
            return (
            <div key={field} className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">{FIELD_LABELS[field] ?? field}</label>
              {field === "description" ? (
                <textarea value={String(slide[field] ?? "")}
                  onChange={(e) => onUpdate({ [field]: e.target.value })} rows={3}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:ring-2 focus:ring-[#B52A2D]/20 resize-none" />
              ) : (
                <input type="text" value={String(slide[field] ?? "")}
                  onChange={(e) => onUpdate({ [field]: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:ring-2 focus:ring-[#B52A2D]/20" />
              )}
            </div>
            );
          })}

          <ImageUpload label="Imagen del slide" value={slide.image}
            onChange={(v) => onUpdate({ image: v })} previewHeight={72} previewWidth={120} />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Fondo (HEX / CSS)</label>
              <div className="flex gap-2">
                <input type="color" value={slide.bg?.startsWith("#") ? slide.bg : "#ffffff"}
                  onChange={(e) => onUpdate({ bg: e.target.value })}
                  className="h-9 w-9 flex-shrink-0 cursor-pointer rounded-lg border border-gray-200 p-0.5" />
                <input type="text" value={slide.bg} onChange={(e) => onUpdate({ bg: e.target.value })}
                  className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono outline-none focus:border-[#B52A2D]" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Color badge</label>
              <input type="text" value={slide.badgeBg} onChange={(e) => onUpdate({ badgeBg: e.target.value })}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono outline-none focus:border-[#B52A2D]" />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
            <input type="checkbox" checked={slide.textDark}
              onChange={(e) => onUpdate({ textDark: e.target.checked })}
              className="rounded border-gray-300 text-[#B52A2D] focus:ring-[#B52A2D]" />
            Texto oscuro (slide con fondo claro)
          </label>
        </div>
      )}
    </div>
  )
}

// ─── Editor ───────────────────────────────────────────────────────────────────

export function LSHeroEditor() {
  const { heroSlides, setHeroSlides } = useLaboSuisseStore()
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oi = heroSlides.findIndex((s) => s.id === active.id)
      const ni = heroSlides.findIndex((s) => s.id === over.id)
      setHeroSlides(arrayMove(heroSlides, oi, ni))
    }
  }

  function updateSlide(id: string, patch: Partial<LSHeroSlide>) {
    setHeroSlides(heroSlides.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }

  function addSlide() {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
    setHeroSlides([
      ...heroSlides,
      {
        id,
        tag: "Nueva etiqueta",
        title: "Nuevo slide",
        subtitle: "",
        description: "",
        cta: "Ver más",
        ctaHref: "#",
        ctaSecondary: "",
        ctaSecondaryHref: "#",
        bg: "#F5F5F5",
        textDark: true,
        image: "",
        badge: "",
        badgeBg: "#e5e7eb",
      },
    ])
  }

  function deleteSlide(id: string) {
    setHeroSlides(heroSlides.filter((s) => s.id !== id))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Brand header */}
      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #B52A2D 0%, #7a1a1d 100%)" }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex flex-col leading-none select-none">
            <span className="text-[20px] font-black tracking-[0.15em] uppercase text-white">LABO</span>
            <span className="text-[18px] font-light tracking-[0.1em] uppercase text-white/80">SUISSE</span>
          </div>
          <div className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">Hero</div>
        </div>
        <p className="text-[13px] text-white/75">{heroSlides.length} slides — arrastra para reordenar · expande para editar.</p>
      </div>

      {/* DnD Slides */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-800">Diapositivas del carrusel</h3>
            <p className="text-xs text-gray-400 mt-0.5">Arrastra para reordenar · Expande para editar</p>
          </div>
          <button type="button" onClick={addSlide}
            className="flex items-center gap-1.5 rounded-xl bg-[#B52A2D] px-4 py-2 text-xs font-bold text-white hover:bg-[#922216] transition">
            <Plus className="h-3.5 w-3.5" /> Añadir slide
          </button>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={heroSlides.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {heroSlides.map((slide, i) => (
                <SortableSlideCard key={slide.id} slide={slide} index={i}
                  onUpdate={(p) => updateSlide(slide.id, p)}
                  onDelete={() => deleteSlide(slide.id)} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {heroSlides.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-12 text-center">
            <p className="text-sm text-gray-400">No hay slides. Añade el primero.</p>
          </div>
        )}
      </div>
      <p className="text-center text-xs text-gray-400 pb-4">Los cambios se guardan automáticamente.</p>
    </div>
  )
}
