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
import { useVitacapStore } from "@/store/vitacap"
import type { VitacapSlide } from "@/store/vitacap"
import { ImageUpload } from "@/components/cms/ImageUpload"

// ─── Sortable Slide Row ───────────────────────────────────────────────────────

function SortableSlideRow({
  slide,
  accentColor,
  onUpdate,
  onDelete,
}: {
  slide: VitacapSlide
  accentColor: string
  onUpdate: (patch: Partial<VitacapSlide>) => void
  onDelete: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: slide.id })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1, zIndex: isDragging ? 50 : undefined }}
      className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <button {...attributes} {...listeners} type="button"
          className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none">
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">{slide.title || "Sin título"}</p>
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
      {expanded && (
        <div className="p-4 space-y-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Título</label>
            <input type="text" value={slide.title} onChange={(e) => onUpdate({ title: e.target.value })}
              className={`w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[${accentColor}] focus:ring-2 focus:ring-[${accentColor}]/20`} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Descripción</label>
            <textarea value={slide.description} onChange={(e) => onUpdate({ description: e.target.value })} rows={3}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#C3311D] focus:ring-2 focus:ring-[#C3311D]/20 resize-none" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Imagen del slide</label>
            <ImageUpload
              value={slide.image || ""}
              onChange={(v) => onUpdate({ image: v || undefined })}
              label="Imagen del slide (opcional: reemplaza el panel de navegación)"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tono:</label>
            <select value={slide.tone} onChange={(e) => onUpdate({ tone: e.target.value as "gold" | "sand" })}
              className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-sm outline-none focus:border-[#C3311D]">
              <option value="gold">Gold (amarillo)</option>
              <option value="sand">Sand (suave)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Carousel Section ────────────────────────────────────────────────────────

function CarruselSection({
  title,
  titleKey,
  slides,
  accentColor,
  onUpdateTitle,
  onUpdateSlide,
  onAddSlide,
  onDeleteSlide,
  onReorder,
}: {
  title: string
  titleKey: string
  slides: VitacapSlide[]
  accentColor: string
  onUpdateTitle: (v: string) => void
  onUpdateSlide: (id: string, patch: Partial<VitacapSlide>) => void
  onAddSlide: () => void
  onDeleteSlide: (id: string) => void
  onReorder: (items: VitacapSlide[]) => void
}) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oi = slides.findIndex((s) => s.id === active.id)
      const ni = slides.findIndex((s) => s.id === over.id)
      onReorder(arrayMove(slides, oi, ni))
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        <p className="mt-0.5 text-xs text-gray-500">Arrastra para reordenar · Expande para editar</p>
      </div>
      <div className="px-5 py-5 space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Título del carrusel</label>
          <input type="text" value={titleKey} onChange={(e) => onUpdateTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#C3311D] focus:ring-2 focus:ring-[#C3311D]/20" />
        </div>

        <div className="border-t border-gray-100 pt-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={slides.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {slides.map((slide) => (
                  <SortableSlideRow key={slide.id} slide={slide} accentColor={accentColor}
                    onUpdate={(p) => onUpdateSlide(slide.id, p)}
                    onDelete={() => onDeleteSlide(slide.id)} />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {slides.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-6">No hay slides. Añade el primero.</p>
          )}

          <button type="button" onClick={onAddSlide}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-500 transition hover:border-[#C3311D] hover:bg-red-50 hover:text-[#C3311D]">
            <Plus className="h-4 w-4" /> Añadir slide
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Editor ─────────────────────────────────────────────────────────────

export function VitacapCarruselesEditor() {
  const {
    content, setContent, tokens,
    updateSlideActiva, addSlideActiva, deleteSlideActiva, setSlidesActiva,
    updateSlidePorQue, addSlidePorQue, deleteSlidePorQue, setSlidesPorQue,
  } = useVitacapStore()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Brand header */}
      <div className="rounded-2xl p-6"
        style={{ background: `linear-gradient(135deg, ${tokens.brand900} 0%, ${tokens.brand800} 100%)` }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex flex-col leading-none select-none">
            <span className="text-[20px] font-black tracking-tight text-white">Vitacap</span>
            <span className="text-[26px] font-black leading-none" style={{ color: tokens.brandAccent }}>G</span>
          </div>
          <div className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
            style={{ backgroundColor: tokens.brandAccent, color: tokens.neutral900 }}>
            Carruseles
          </div>
        </div>
        <p className="text-[13px] text-white/75">2 carruseles — arrastra slides para reordenar · expande para editar.</p>
      </div>

      {/* Carrusel 1 */}
      <CarruselSection
        title='Carrusel 1 — "Activa tu día"'
        titleKey={content.carousel1Title}
        slides={content.slidesActivaTuDia}
        accentColor={tokens.brand800}
        onUpdateTitle={(v) => setContent("carousel1Title", v)}
        onUpdateSlide={updateSlideActiva}
        onAddSlide={addSlideActiva}
        onDeleteSlide={deleteSlideActiva}
        onReorder={setSlidesActiva}
      />

      {/* Carrusel 2 */}
      <CarruselSection
        title='Carrusel 2 — "¿Por qué Vitacap G?"'
        titleKey={content.carousel2Title}
        slides={content.slidesPorQueElegir}
        accentColor={tokens.brand800}
        onUpdateTitle={(v) => setContent("carousel2Title", v)}
        onUpdateSlide={updateSlidePorQue}
        onAddSlide={addSlidePorQue}
        onDeleteSlide={deleteSlidePorQue}
        onReorder={setSlidesPorQue}
      />
    </div>
  )
}
