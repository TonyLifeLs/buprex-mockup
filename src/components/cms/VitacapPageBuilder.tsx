"use client"

/**
 * VitacapPageBuilder — Constructor de orden y visibilidad para Vitacap G.
 * Idéntico en UX a PageBuilder (Buprex) y LSPageBuilder (Labo Suisse) pero
 * con colores, secciones y wireframes propios de Vitacap G.
 */

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
import { GripVertical, Eye, EyeOff, Monitor, Smartphone, ExternalLink } from "lucide-react"
import { useState } from "react"
import type { ReactNode } from "react"
import { useVitacapStore } from "@/store/vitacap"
import type { VitacapSectionConfig } from "@/store/vitacap"

// ─── Brand color ──────────────────────────────────────────────────────────────
const VC_RED       = "#C3311D"
const VC_RED_HOVER = "#922216"

// ─── Sortable Row ─────────────────────────────────────────────────────────────

function SortableSectionCard({
  section,
  index,
  onToggle,
}: {
  section: VitacapSectionConfig
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
        isDragging ? "opacity-60 shadow-xl ring-2 ring-[#C3311D]/30" : ""
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
      <span
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{ backgroundColor: section.enabled ? VC_RED : "#9E9E9E" }}
      >
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
        className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-xl transition"
        style={{
          backgroundColor: section.enabled ? VC_RED : "#F5F5F5",
          color: section.enabled ? "#fff" : "#9E9E9E",
        }}
        onMouseEnter={(e) => {
          if (section.enabled)
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = VC_RED_HOVER
        }}
        onMouseLeave={(e) => {
          if (section.enabled)
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = VC_RED
        }}
      >
        {section.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </button>
    </div>
  )
}

// ─── Wireframes (mini visual preview per section) ─────────────────────────────

function SectionWireframe({
  section,
  index,
}: {
  section: VitacapSectionConfig
  index: number
}) {
  const colors: Record<string, string> = {
    navbar:      "#1a1a1a",
    hero:        "#C3311D",
    "que-es":    "#922216",
    beneficios:  "#D35844",
    carousel1:   "#671225",
    "para-quien":"#922216",
    carousel2:   "#C3311D",
    "como-usarlo":"#1a1a1a",
    destacado:   "#922216",
    newsletter:  "#1a1a1a",
    footer:      "#111111",
  }
  const bg = colors[section.id] ?? "#9E9E9E"

  const wireframes: Record<string, ReactNode> = {
    navbar: (
      <div className="flex items-center justify-between h-full px-3">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-full bg-[#F1DF00]/80" />
          <div className="h-2.5 w-12 rounded bg-white/60 font-bold" />
        </div>
        <div className="flex gap-1.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-1.5 w-7 rounded-full bg-white/30" />
          ))}
        </div>
        <div className="h-5 w-14 rounded-full bg-[#F1DF00]/40 border border-[#F1DF00]/60" />
      </div>
    ),
    hero: (
      <div className="flex items-center gap-2 h-full px-3">
        <div className="flex-1 space-y-1.5">
          <div className="h-1.5 w-2/3 rounded-full bg-[#F1DF00]/50" />
          <div className="h-3 w-full rounded-full bg-white/70" />
          <div className="h-2 w-4/5 rounded-full bg-white/40" />
          <div className="h-1.5 w-full rounded-full bg-white/20" />
          <div className="flex gap-1 mt-2">
            <div className="h-4 w-14 rounded-full bg-[#F1DF00]/70" />
            <div className="h-4 w-10 rounded-lg border border-white/30 bg-transparent" />
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/15 flex-shrink-0" />
      </div>
    ),
    "que-es": (
      <div className="flex flex-col justify-center gap-1 h-full px-3 py-2">
        <div className="h-1.5 w-1/3 rounded-full bg-[#F1DF00]/60" />
        <div className="h-3 w-4/5 rounded-full bg-white/60" />
        <div className="h-1.5 w-full rounded-full bg-white/30" />
        <div className="grid grid-cols-4 gap-1 mt-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-7 rounded-lg bg-white/20" />
          ))}
        </div>
      </div>
    ),
    beneficios: (
      <div className="grid grid-cols-4 gap-1 h-full px-2 py-2 items-center">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl bg-white/20 overflow-hidden">
            <div className="h-3 bg-white/30 flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
            </div>
            <div className="p-1 space-y-0.5">
              <div className="h-1 w-full rounded-full bg-white/40" />
              <div className="h-1 w-4/5 rounded-full bg-white/20" />
            </div>
          </div>
        ))}
      </div>
    ),
    carousel1: (
      <div className="flex items-stretch gap-1.5 h-full px-2 py-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-xl bg-white/20 flex flex-col justify-end p-1.5 gap-0.5"
            style={{ opacity: i === 1 ? 1 : 0.5 }}
          >
            <div className="h-1.5 w-full rounded-full bg-[#F1DF00]/50" />
            <div className="h-1 w-4/5 rounded-full bg-white/30" />
          </div>
        ))}
      </div>
    ),
    "para-quien": (
      <div className="flex items-center gap-2 h-full px-3">
        <div className="flex-1 space-y-1">
          <div className="h-1.5 w-1/3 rounded-full bg-[#F1DF00]/60" />
          <div className="h-3 w-3/4 rounded-full bg-white/60" />
          <div className="h-5 w-20 rounded-full bg-[#F1DF00]/40 mt-1" />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-md bg-white/20 flex items-center gap-1 px-1.5 py-1">
              <div className="h-2.5 w-2.5 rounded-full bg-white/40 flex-shrink-0" />
              <div className="flex-1 h-1 rounded-full bg-white/30" />
            </div>
          ))}
        </div>
      </div>
    ),
    carousel2: (
      <div className="flex flex-col justify-center gap-1.5 h-full px-3 py-2">
        <div className="h-1.5 w-1/3 rounded-full bg-[#F1DF00]/60" />
        <div className="h-2.5 w-3/4 rounded-full bg-white/60" />
        <div className="flex gap-1.5 mt-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex-1 h-8 rounded-lg bg-white/20" style={{ opacity: i === 0 ? 1 : 0.5 }} />
          ))}
        </div>
      </div>
    ),
    "como-usarlo": (
      <div className="grid grid-cols-3 gap-1 h-full px-2 py-2 items-center">
        {["01", "02", "03"].map((n) => (
          <div key={n} className="rounded-xl bg-white/15 p-1.5 flex flex-col gap-0.5">
            <div className="text-[10px] font-black text-white/30 leading-none">{n}</div>
            <div className="h-1 w-full rounded-full bg-white/40" />
            <div className="h-1 w-4/5 rounded-full bg-white/20" />
          </div>
        ))}
      </div>
    ),
    destacado: (
      <div className="flex items-center gap-2 h-full px-3">
        <div className="flex-1 space-y-1">
          <div className="h-1.5 w-1/3 rounded-full bg-[#F1DF00]/60" />
          <div className="h-3 w-3/4 rounded-full bg-white/60" />
          <div className="flex flex-wrap gap-0.5 mt-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-2.5 w-8 rounded-full bg-[#F1DF00]/40" />
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg bg-white/15 h-4 px-1.5 flex items-center">
              <div className="h-1 w-full rounded-full bg-white/30" />
            </div>
          ))}
        </div>
      </div>
    ),
    newsletter: (
      <div className="flex flex-col items-center justify-center gap-1 h-full px-3">
        <div className="h-2.5 w-2/3 rounded-full bg-white/60" />
        <div className="h-1.5 w-4/5 rounded-full bg-white/30" />
        <div className="flex gap-1 mt-1">
          <div className="h-4 w-16 rounded-lg bg-white/20 border border-white/30" />
          <div className="h-4 w-12 rounded-lg" style={{ backgroundColor: VC_RED + "80" }} />
        </div>
      </div>
    ),
    footer: (
      <div className="flex items-end justify-between h-full px-3 pb-2">
        <div className="space-y-0.5">
          <div className="h-3 w-10 rounded bg-white/40 font-bold" />
          <div className="h-1 w-8 rounded-full bg-[#F1DF00]/30" />
        </div>
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

function DragCard({ section }: { section: VitacapSectionConfig }) {
  return (
    <div
      className="flex items-center gap-4 rounded-2xl border-2 bg-white px-5 py-4 shadow-2xl"
      style={{ borderColor: VC_RED, boxShadow: `0 0 0 4px ${VC_RED}22` }}
    >
      <GripVertical className="h-5 w-5" style={{ color: VC_RED }} />
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
        style={{ backgroundColor: VC_RED + "22", color: VC_RED }}
      >
        ↕
      </span>
      <span className="text-2xl">{section.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-800 truncate">{section.label}</p>
        <p className="text-xs text-gray-400 truncate">{section.description}</p>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function VitacapPageBuilder() {
  const vitacapSections    = useVitacapStore((s) => s.vitacapSections)
  const setVitacapSections = useVitacapStore((s) => s.setVitacapSections)

  const sensors    = useSensors(useSensor(PointerSensor))
  const [activeId, setActiveId]       = useState<string | null>(null)
  const [wireframe, setWireframe]     = useState<"desktop" | "mobile">("desktop")

  const activeSection = vitacapSections.find((s) => s.id === activeId) ?? null

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null)
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = vitacapSections.findIndex((s) => s.id === active.id)
      const newIndex = vitacapSections.findIndex((s) => s.id === over.id)
      setVitacapSections(arrayMove(vitacapSections, oldIndex, newIndex))
    }
  }

  function toggleSection(id: string) {
    setVitacapSections(
      vitacapSections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    )
  }

  const enabledCount    = vitacapSections.filter((s) => s.enabled).length
  const enabledSections = vitacapSections.filter((s) => s.enabled)

  return (
    <div className="flex gap-8 items-start">
      {/* ── Left: sortable list ── */}
      <div className="flex-1 min-w-0 space-y-6">

        {/* Header stats */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              <span className="font-bold" style={{ color: VC_RED }}>{enabledCount}</span>{" "}
              de{" "}
              <span className="font-bold">{vitacapSections.length}</span> secciones visibles
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Arrastra para reordenar · La previsualización se actualiza en tiempo real
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2">
            <span className="text-emerald-500 text-sm">✓</span>
            <p className="text-xs font-medium text-emerald-700">Guardado automático</p>
          </div>
        </div>

        {/* Quick visibility bar */}
        <div className="flex flex-wrap gap-2">
          {vitacapSections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => toggleSection(s.id)}
              title={s.enabled ? "Ocultar" : "Mostrar"}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all"
              style={{
                backgroundColor: s.enabled ? VC_RED + "14" : "#F5F5F5",
                borderColor:     s.enabled ? VC_RED + "40" : "#E0E0E0",
                color:           s.enabled ? VC_RED         : "#9E9E9E",
              }}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
              {s.enabled ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            </button>
          ))}
        </div>

        {/* DnD list */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={vitacapSections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {vitacapSections.map((section, index) => (
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

        {/* Preview link */}
        <a
          href="/vitacap"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-2xl border px-5 py-3.5 text-sm font-medium transition hover:shadow-sm"
          style={{ borderColor: VC_RED + "40", color: VC_RED }}
        >
          <ExternalLink className="h-4 w-4" />
          Ver sitio Vitacap G en vivo
        </a>
      </div>

      {/* ── Right: visual wireframe preview ── */}
      <div className="hidden xl:flex flex-col gap-4 w-72 flex-shrink-0">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Vista previa</p>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              type="button"
              onClick={() => setWireframe("desktop")}
              className="flex items-center px-2.5 py-1.5 text-xs transition"
              style={{
                backgroundColor: wireframe === "desktop" ? VC_RED : "white",
                color:           wireframe === "desktop" ? "white" : "#9E9E9E",
              }}
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setWireframe("mobile")}
              className="flex items-center px-2.5 py-1.5 text-xs transition"
              style={{
                backgroundColor: wireframe === "mobile" ? VC_RED : "white",
                color:           wireframe === "mobile" ? "white" : "#9E9E9E",
              }}
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Browser / Phone mockup */}
        <div
          className={`rounded-2xl border-2 border-gray-300 bg-gray-100 shadow-xl overflow-hidden transition-all ${
            wireframe === "mobile" ? "mx-auto w-44" : "w-full"
          }`}
        >
          {wireframe === "desktop" ? (
            <div>
              <div className="flex items-center gap-1.5 border-b border-gray-200 bg-white px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                <div className="h-2 w-2 rounded-full bg-yellow-400" />
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <div className="mx-2 flex-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-400">
                  vitacap.life.cl
                </div>
              </div>
              <div className="space-y-1 p-2">
                {enabledSections.map((section, index) => (
                  <SectionWireframe key={section.id} section={section} index={index} />
                ))}
                {enabledSections.length === 0 && (
                  <div className="flex h-24 items-center justify-center text-[10px] text-gray-400">
                    Sin secciones visibles
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center border-b border-gray-200 bg-white py-2">
                <div className="h-1.5 w-12 rounded-full bg-gray-300" />
              </div>
              <div className="space-y-1 p-1.5">
                {enabledSections.map((section, index) => (
                  <SectionWireframe key={section.id} section={section} index={index} />
                ))}
                {enabledSections.length === 0 && (
                  <div className="flex h-16 items-center justify-center text-[10px] text-gray-400">
                    Sin secciones
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Brand note */}
        <div
          className="rounded-2xl border p-4 space-y-1"
          style={{ borderColor: VC_RED + "30", backgroundColor: VC_RED + "08" }}
        >
          <p className="text-xs font-bold" style={{ color: VC_RED }}>Manual de marca Vitacap G</p>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Respeta los colores oficiales: Rojo vivo <span className="font-mono">#C3311D</span>,
            Rojo medio <span className="font-mono">#922216</span> y
            Amarillo <span className="font-mono">#F1DF00</span>. Usa Montserrat como tipografía base.
          </p>
        </div>
      </div>
    </div>
  )
}
