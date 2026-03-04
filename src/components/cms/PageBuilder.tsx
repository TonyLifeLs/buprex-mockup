"use client"

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Eye, EyeOff, Monitor, Smartphone } from "lucide-react"
import { useState } from "react"
import type { ReactNode } from "react"
import { useCMSStore } from "@/store/cms"
import type { SectionConfig } from "@/store/cms"

// ─── Sortable Section Card ────────────────────────────────────────────────────

function SortableSectionCard({
  section,
  index,
  onToggle,
}: {
  section: SectionConfig
  index: number
  onToggle: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 rounded-2xl border bg-white px-5 py-4 shadow-sm transition-all ${
        isDragging ? "opacity-60 shadow-xl ring-2 ring-[#0099d6]/40" : ""
      } ${section.enabled ? "border-gray-200" : "border-dashed border-gray-200 opacity-60"}`}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        type="button"
        className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none flex-shrink-0"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      {/* Index badge */}
      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">
        {index + 1}
      </span>

      {/* Icon */}
      <span className="text-2xl flex-shrink-0">{section.icon}</span>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-800 truncate">{section.label}</p>
        <p className="text-xs text-gray-400 truncate">{section.description}</p>
      </div>

      {/* Status pill */}
      <span
        className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
          section.enabled
            ? "bg-emerald-50 text-emerald-600"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {section.enabled ? "Visible" : "Oculto"}
      </span>

      {/* Toggle */}
      <button
        type="button"
        onClick={onToggle}
        title={section.enabled ? "Ocultar sección" : "Mostrar sección"}
        className={`flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-xl transition ${
          section.enabled
            ? "bg-[#0099d6] text-white hover:bg-[#0080b8]"
            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
        }`}
      >
        {section.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </button>
    </div>
  )
}

// ─── Mini Section Wireframe ───────────────────────────────────────────────────

function SectionWireframe({ section, index }: { section: SectionConfig; index: number }) {
  const colors: Record<string, string> = {
    hero:            "#0c3d6e",
    symptoms:        "#0099d6",
    malestars:       "#7c3aed",
    products:        "#0c5ea8",
    "pharma-info":   "#0f766e",
    articles:        "#0369a1",
    faq:             "#1e40af",
    footer:          "#1e293b",
  }
  const bg = colors[section.id] ?? "#64748b"

  const wireframes: Record<string, ReactNode> = {
    hero: (
      <div className="flex items-center gap-2 h-full px-3">
        <div className="flex-1 space-y-1.5">
          <div className="h-2 w-2/3 rounded-full bg-white/30" />
          <div className="h-3 w-full rounded-full bg-white/50" />
          <div className="h-1.5 w-4/5 rounded-full bg-white/20" />
          <div className="flex gap-1 mt-2">
            <div className="h-4 w-12 rounded-full bg-white/40" />
            <div className="h-4 w-10 rounded-full bg-white/20" />
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/20 flex-shrink-0" />
      </div>
    ),
    symptoms: (
      <div className="grid grid-cols-3 gap-1.5 h-full px-3 py-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-lg bg-white/20 flex flex-col items-center justify-center gap-1 p-1">
            <div className="h-4 w-4 rounded-full bg-white/40" />
            <div className="h-1 w-full rounded-full bg-white/30" />
          </div>
        ))}
      </div>
    ),
    malestars: (
      <div className="flex items-end justify-around h-full px-2 pb-2">
        <div className="h-8 w-5 rounded-t-2xl bg-white/30" />
        <div className="h-11 w-6 rounded-t-2xl bg-white/50" />
        <div className="h-7 w-5 rounded-t-2xl bg-white/30" />
      </div>
    ),
    products: (
      <div className="grid grid-cols-2 gap-1.5 h-full px-3 py-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-lg bg-white/20 p-1 space-y-1">
            <div className="h-4 w-4 rounded bg-white/40 mx-auto" />
            <div className="h-1 w-full rounded-full bg-white/30" />
            <div className="h-1 w-3/4 rounded-full bg-white/20 mx-auto" />
          </div>
        ))}
      </div>
    ),
    "pharma-info": (
      <div className="flex items-center gap-2 h-full px-3">
        <div className="h-8 w-8 rounded-full bg-white/30 flex-shrink-0" />
        <div className="flex-1 space-y-1">
          <div className="h-2 w-3/4 rounded-full bg-white/40" />
          <div className="h-1.5 w-full rounded-full bg-white/20" />
          <div className="h-1.5 w-2/3 rounded-full bg-white/20" />
        </div>
      </div>
    ),
    articles: (
      <div className="grid grid-cols-3 gap-1 h-full px-2 py-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-md bg-white/20 overflow-hidden">
            <div className="h-4 bg-white/30" />
            <div className="p-1 space-y-0.5">
              <div className="h-1 w-full rounded-full bg-white/30" />
              <div className="h-1 w-2/3 rounded-full bg-white/20" />
            </div>
          </div>
        ))}
      </div>
    ),
    faq: (
      <div className="flex flex-col gap-1.5 h-full px-3 py-2 justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-1.5 rounded-lg bg-white/20 px-2 py-1">
            <div className="h-2 w-2 rounded-full bg-white/40 flex-shrink-0" />
            <div className="flex-1 h-1.5 rounded-full bg-white/30" />
          </div>
        ))}
      </div>
    ),
    footer: (
      <div className="flex items-end justify-between h-full px-3 pb-2">
        <div className="h-4 w-8 rounded bg-white/30" />
        <div className="flex gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-3 w-3 rounded-full bg-white/30" />
          ))}
        </div>
        <div className="space-y-0.5">
          <div className="h-1 w-10 rounded-full bg-white/20" />
          <div className="h-1 w-8 rounded-full bg-white/20" />
        </div>
      </div>
    ),
  }

  return (
    <div
      className="relative rounded-md overflow-hidden border border-white/10 select-none"
      style={{ backgroundColor: bg, height: 64 }}
    >
      {wireframes[section.id] ?? (
        <div className="flex items-center justify-center h-full">
          <span className="text-white/40 text-xs">{section.icon}</span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-black/30 backdrop-blur-sm px-2 py-0.5 flex items-center gap-1">
        <span className="text-[10px] font-bold text-white truncate">{section.label.toUpperCase()}</span>
        <span className="ml-auto text-[10px] font-semibold text-white/50">#{index + 1}</span>
      </div>
    </div>
  )
}

// ─── Drag Overlay Ghost ───────────────────────────────────────────────────────

function DragCard({ section }: { section: SectionConfig }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-[#0099d6] bg-white px-5 py-4 shadow-2xl ring-4 ring-[#0099d6]/20">
      <GripVertical className="h-5 w-5 text-[#0099d6]" />
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0099d6]/10 text-xs font-bold text-[#0099d6]">↕</span>
      <span className="text-2xl">{section.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#0c3d6e] truncate">{section.label}</p>
        <p className="text-xs text-gray-400 truncate">{section.description}</p>
      </div>
    </div>
  )
}

// ─── Page Builder ─────────────────────────────────────────────────────────────

export function PageBuilder() {
  const sections = useCMSStore((s) => s.sections)
  const setSections = useCMSStore((s) => s.setSections)
  const sensors = useSensors(useSensor(PointerSensor))
  const [activeId, setActiveId] = useState<string | null>(null)
  const [wireframe, setWireframe] = useState<"desktop" | "mobile">("desktop")

  const activeSection = sections.find((s) => s.id === activeId) ?? null

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null)
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id)
      const newIndex = sections.findIndex((s) => s.id === over.id)
      setSections(arrayMove(sections, oldIndex, newIndex))
    }
  }

  function toggleSection(id: string) {
    setSections(sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)))
  }

  const enabledCount = sections.filter((s) => s.enabled).length
  const enabledSections = sections.filter((s) => s.enabled)

  return (
    <div className="flex gap-8 items-start">
      {/* ── Left: Sortable list ── */}
      <div className="flex-1 min-w-0 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              <span className="font-bold text-[#0c3d6e]">{enabledCount}</span> de{" "}
              <span className="font-bold">{sections.length}</span> secciones visibles
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Arrastra para reordenar • La previsualización se actualiza en tiempo real
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2">
            <span className="text-emerald-500 text-sm">✓</span>
            <p className="text-xs font-medium text-emerald-700">Guardado automático</p>
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {sections.map((section, index) => (
                <SortableSectionCard
                  key={section.id}
                  section={section}
                  index={index}
                  onToggle={() => toggleSection(section.id)}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeSection && <DragCard section={activeSection} />}
          </DragOverlay>
        </DndContext>
      </div>

      {/* ── Right: Visual wireframe ── */}
      <div className="hidden xl:flex flex-col gap-4 w-72 flex-shrink-0">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Vista previa
          </p>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              type="button"
              onClick={() => setWireframe("desktop")}
              className={`flex items-center px-2.5 py-1.5 text-xs transition ${wireframe === "desktop" ? "bg-[#0099d6] text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setWireframe("mobile")}
              className={`flex items-center px-2.5 py-1.5 text-xs transition ${wireframe === "mobile" ? "bg-[#0099d6] text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Browser / Phone mockup */}
        <div className={`rounded-2xl border-2 border-gray-300 bg-gray-100 shadow-xl overflow-hidden transition-all ${wireframe === "mobile" ? "mx-auto w-44" : "w-full"}`}>
          {wireframe === "desktop" ? (
            <div className="bg-gray-200 px-3 py-2 border-b border-gray-300 flex items-center gap-2">
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                <div className="h-2 w-2 rounded-full bg-yellow-400" />
                <div className="h-2 w-2 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 h-4 rounded bg-white/70 mx-2 flex items-center px-2">
                <span className="text-[10px] text-gray-400">buprex.com</span>
              </div>
            </div>
          ) : (
            <div className="bg-gray-200 flex justify-center py-2 border-b border-gray-300">
              <div className="h-1.5 w-12 rounded-full bg-gray-400" />
            </div>
          )}

          <div className="bg-white">
            {/* Navbar always shown */}
            <div className="flex items-center justify-between px-2 py-1.5 bg-[#0c3d6e]">
              <div className="h-2.5 w-10 rounded-full bg-white/60" />
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-1.5 w-6 rounded-full bg-white/40" />
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-0.5 p-1">
              {enabledSections.length === 0 ? (
                <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-200 rounded-lg m-2">
                  <p className="text-[10px] text-gray-300">Sin secciones activas</p>
                </div>
              ) : (
                enabledSections.map((section, i) => (
                  <SectionWireframe key={section.id} section={section} index={i} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Section legend */}
        <div className="rounded-xl border border-gray-200 bg-white p-3 space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Orden actual
          </p>
          {enabledSections.length === 0 ? (
            <p className="text-xs text-gray-300 italic">Ninguna sección activa</p>
          ) : (
            enabledSections.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                <span className="text-sm">{s.icon}</span>
                <span className="text-xs font-semibold text-gray-600">{s.label}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
