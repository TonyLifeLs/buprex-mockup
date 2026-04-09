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
import type { VitacapBenefitCard } from "@/store/vitacap"
import { ImageUpload } from "@/components/cms/ImageUpload"

// ─── Sortable Benefit Card ────────────────────────────────────────────────────

function SortableBenefitCard({
  card,
  onUpdate,
  onDelete,
}: {
  card: VitacapBenefitCard
  onUpdate: (patch: Partial<VitacapBenefitCard>) => void
  onDelete: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Row header */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b border-gray-100"
        style={{ backgroundColor: card.color + "12" }}
      >
        <button {...attributes} {...listeners} type="button"
          className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none">
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="h-9 w-9 rounded-full flex-shrink-0 flex items-center justify-center text-lg"
          style={{ backgroundColor: card.color + "25", border: `2px solid ${card.color}` }}>
          {card.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">{card.title || "Sin título"}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: card.color }} />
            <span className="text-xs text-gray-400 font-mono">{card.color}</span>
          </div>
        </div>
        <button type="button" onClick={() => setExpanded(!expanded)}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition">
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
          {/* Color */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Color de la card</label>
            <div className="flex items-center gap-3 flex-wrap">
              <input type="color" value={card.color}
                onChange={(e) => onUpdate({ color: e.target.value })}
                className="h-9 w-9 cursor-pointer rounded-lg border border-gray-200 p-0.5 flex-shrink-0" />
              <input type="text" value={card.color} maxLength={7}
                onChange={(e) => { const v = e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value; if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onUpdate({ color: v }) }}
                className="w-28 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono uppercase outline-none focus:border-[#C3311D] focus:ring-1 focus:ring-[#C3311D]/20" />
              <div className="flex gap-1.5">
                {["#C3311D", "#922216", "#D35844", "#671225", "#ECC057", "#F1DF00"].map((c) => (
                  <button key={c} type="button" onClick={() => onUpdate({ color: c })}
                    className={`h-6 w-6 rounded-md border-2 transition hover:scale-110 ${card.color === c ? "border-gray-500 scale-110" : "border-transparent"}`}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </div>
          {/* Emoji */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Ícono (emoji)</label>
            <input type="text" value={card.icon} onChange={(e) => onUpdate({ icon: e.target.value })}
              className="w-20 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-lg outline-none focus:border-[#C3311D] focus:ring-1 focus:ring-[#C3311D]/20" />
          </div>
          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Título</label>
            <input type="text" value={card.title} onChange={(e) => onUpdate({ title: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#C3311D] focus:ring-2 focus:ring-[#C3311D]/20" />
          </div>
          {/* Body */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Descripción</label>
            <textarea value={card.body} onChange={(e) => onUpdate({ body: e.target.value })} rows={3}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#C3311D] focus:ring-2 focus:ring-[#C3311D]/20 resize-none" />
          </div>
          {/* Image */}
          <ImageUpload label="Imagen de la card (opcional)"
            value={card.image ?? ""} onChange={(v) => onUpdate({ image: v })}
            previewHeight={72} previewWidth={72} />
        </div>
      )}
    </div>
  )
}

// ─── Main Editor ─────────────────────────────────────────────────────────────

export function VitacapBeneficiosEditor() {
  const { content, setContent, tokens, updateBenefit, addBenefit, deleteBenefit, setBenefits } = useVitacapStore()
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oi = content.benefits.findIndex((b) => b.id === active.id)
      const ni = content.benefits.findIndex((b) => b.id === over.id)
      setBenefits(arrayMove(content.benefits, oi, ni))
    }
  }

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
            Beneficios
          </div>
        </div>
        <p className="text-[13px] text-white/75">Cards — arrastra para reordenar · expande para editar.</p>
      </div>

      {/* Section heading */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-800">Encabezado de la sección</h3>
        </div>
        <div className="px-5 py-5 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Etiqueta</label>
            <input type="text" value={content.beneficiosLabel}
              onChange={(e) => setContent("beneficiosLabel", e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#C3311D] focus:ring-2 focus:ring-[#C3311D]/20" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Título</label>
            <input type="text" value={content.beneficiosTitle}
              onChange={(e) => setContent("beneficiosTitle", e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#C3311D] focus:ring-2 focus:ring-[#C3311D]/20" />
          </div>
        </div>
      </div>

      {/* DnD list */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-800">Cards de beneficios</h3>
            <p className="text-xs text-gray-400 mt-0.5">Arrastra para reordenar · Expande para editar</p>
          </div>
          <button type="button" onClick={addBenefit}
            className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white transition"
            style={{ backgroundColor: tokens.brand800 }}>
            <Plus className="h-3.5 w-3.5" /> Añadir card
          </button>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={content.benefits.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {content.benefits.map((card) => (
                <SortableBenefitCard key={card.id} card={card}
                  onUpdate={(p) => updateBenefit(card.id, p)}
                  onDelete={() => deleteBenefit(card.id)} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {content.benefits.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-12 text-center">
            <p className="text-sm text-gray-400">No hay cards. Añade la primera.</p>
          </div>
        )}
      </div>
    </div>
  )
}
