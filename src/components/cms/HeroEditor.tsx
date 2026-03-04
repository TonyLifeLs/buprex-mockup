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
import Image from "next/image"
import { useCMSStore } from "@/store/cms"
import type { HeroSlide, TrustBadge } from "@/store/cms"
import { ImageUpload } from "@/components/cms/ImageUpload"

// ─── Shared field helper ──────────────────────────────────────────────────────

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  )
}

function Input({
  value,
  onChange,
  placeholder,
  mono,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  mono?: boolean
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:bg-white focus:ring-2 focus:ring-[#0099d6]/20 ${mono ? "font-mono" : ""}`}
    />
  )
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:bg-white focus:ring-2 focus:ring-[#0099d6]/20 resize-none"
    />
  )
}

// ─── Sortable Slide Card ──────────────────────────────────────────────────────

function SortableSlideCard({
  slide,
  onUpdate,
  onDelete,
}: {
  slide: HeroSlide
  onUpdate: (data: Partial<HeroSlide>) => void
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
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <button
          {...attributes}
          {...listeners}
          type="button"
          className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        {/* Mini preview */}
        <div
          className="h-8 w-8 rounded-lg flex-shrink-0 overflow-hidden"
          style={{ backgroundColor: slide.bgColor }}
        >
          {slide.image && (
            <Image
              src={slide.image}
              alt=""
              width={32}
              height={32}
              className="h-full w-full object-contain"
              unoptimized
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">{slide.title || "Sin título"}</p>
          <p className="text-xs text-gray-400 truncate">{slide.tag}</p>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-200 transition"
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Expanded fields */}
      {expanded && (
        <div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Etiqueta (tag)">
            <Input value={slide.tag} onChange={(v) => onUpdate({ tag: v })} placeholder="BUPREX ES IBUPROFENO" />
          </Field>
          <Field label="Color de fondo">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={slide.bgColor}
                onChange={(e) => onUpdate({ bgColor: e.target.value })}
                className="h-9 w-9 cursor-pointer rounded-lg border-0 p-0"
              />
              <Input value={slide.bgColor} onChange={(v) => onUpdate({ bgColor: v })} mono />
            </div>
          </Field>
          <Field label="Título principal">
            <Input value={slide.title} onChange={(v) => onUpdate({ title: v })} placeholder="TENEMOS LA CÁPSULA..." />
          </Field>
          <Field label="Texto destacado (highlight)">
            <Input value={slide.highlight} onChange={(v) => onUpdate({ highlight: v })} placeholder="DEL PAÍS" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Descripción (opcional)">
              <Textarea value={slide.description} onChange={(v) => onUpdate({ description: v })} placeholder="Texto descriptivo debajo del título..." />
            </Field>
          </div>
          <Field label="Badge 1">
            <Input value={slide.badge1} onChange={(v) => onUpdate({ badge1: v })} placeholder="Acción Rápida" />
          </Field>
          <Field label="Badge 2">
            <Input value={slide.badge2} onChange={(v) => onUpdate({ badge2: v })} placeholder="La más pequeña" />
          </Field>
          <div className="sm:col-span-2">
            <ImageUpload label="Imagen del producto" value={slide.image} onChange={(v) => onUpdate({ image: v })} previewHeight={64} previewWidth={64} />
          </div>
          <div className="sm:col-span-2">
            <ImageUpload label="Imagen de fondo" value={slide.bgImage} onChange={(v) => onUpdate({ bgImage: v })} previewHeight={64} previewWidth={120} />
          </div>
          <Field label="Opacidad fondo (0–1)">
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={slide.bgOpacity}
              onChange={(e) => onUpdate({ bgOpacity: parseFloat(e.target.value) })}
              className="w-full accent-[#0099d6]"
            />
            <span className="text-xs text-gray-400">{slide.bgOpacity}</span>
          </Field>
          <Field label="Modo fondo">
            <select
              value={slide.bgMode}
              onChange={(e) => onUpdate({ bgMode: e.target.value as "full" | "right" })}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6]"
            >
              <option value="right">Derecha (right)</option>
              <option value="full">Completo (full)</option>
            </select>
          </Field>
        </div>
      )}
    </div>
  )
}

// ─── Trust Badge Row ──────────────────────────────────────────────────────────

function TrustBadgeRow({ badge, onUpdate }: { badge: TrustBadge; onUpdate: (d: Partial<TrustBadge>) => void }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
      <input
        type="color"
        value={badge.color}
        onChange={(e) => onUpdate({ color: e.target.value })}
        className="h-8 w-8 cursor-pointer rounded-lg border-0 p-0 flex-shrink-0"
      />
      <div className="flex-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <input
          value={badge.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Título"
          className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:ring-2 focus:ring-[#0099d6]/20"
        />
        <input
          value={badge.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Descripción"
          className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:ring-2 focus:ring-[#0099d6]/20"
        />
      </div>
    </div>
  )
}

// ─── Hero Editor ─────────────────────────────────────────────────────────────

export function HeroEditor() {
  const { heroSlides, trustBadges, setHeroSlides, updateHeroSlide, addHeroSlide, deleteHeroSlide, setTrustBadges, updateTrustBadge } =
    useCMSStore()

  const sensors = useSensors(useSensor(PointerSensor))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = heroSlides.findIndex((s) => s.id === active.id)
      const newIndex = heroSlides.findIndex((s) => s.id === over.id)
      setHeroSlides(arrayMove(heroSlides, oldIndex, newIndex))
    }
  }

  return (
    <div className="space-y-10">
      {/* ── Slides ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0c3d6e]">Slides del carrusel</h3>
            <p className="text-xs text-gray-400 mt-0.5">Arrastra para reordenar • Expande para editar cada slide</p>
          </div>
          <button
            type="button"
            onClick={addHeroSlide}
            className="flex items-center gap-1.5 rounded-xl bg-[#0099d6] px-4 py-2 text-xs font-bold text-white hover:bg-[#0080b8] transition"
          >
            <Plus className="h-3.5 w-3.5" />
            Nuevo slide
          </button>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={heroSlides.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {heroSlides.map((slide) => (
                <SortableSlideCard
                  key={slide.id}
                  slide={slide}
                  onUpdate={(data) => updateHeroSlide(slide.id, data)}
                  onDelete={() => deleteHeroSlide(slide.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* ── Trust Badges ── */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-[#0c3d6e]">Badges de confianza</h3>
          <p className="text-xs text-gray-400 mt-0.5">Barra debajo del carrusel</p>
        </div>
        <div className="space-y-2">
          {trustBadges.map((badge) => (
            <TrustBadgeRow
              key={badge.id}
              badge={badge}
              onUpdate={(d) => updateTrustBadge(badge.id, d)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
