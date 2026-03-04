"use client"

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
  closestCenter,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react"
import {
  GripVertical,
  Trash2,
  ChevronUp,
  ChevronDown,
  Plus,
  X,
  Minus,
  Eye,
  Smartphone,
  Monitor,
  PanelLeftOpen,
  PanelRightOpen,
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react"
import { useCMSStore, createDefaultVisualBlock } from "@/store/cms"
import type { VisualBlock, VisualBlockType } from "@/store/cms"
import { ImageUpload } from "@/components/cms/ImageUpload"

// ─── Palette categories ────────────────────────────────────────────────────────

const PALETTE: {
  label: string
  color: string
  items: { type: VisualBlockType; label: string; icon: string; desc: string }[]
}[] = [
  {
    label: "Estructura",
    color: "#0c3d6e",
    items: [
      { type: "navbar",       label: "Navbar",     icon: "🧭", desc: "Barra de navegación" },
      { type: "footer-block", label: "Footer",     icon: "📋", desc: "Pie de página" },
      { type: "divider",      label: "Divisor",    icon: "─",  desc: "Línea separadora" },
      { type: "spacer",       label: "Espacio",    icon: "↕",  desc: "Espacio en blanco" },
    ],
  },
  {
    label: "Contenido",
    color: "#0099d6",
    items: [
      { type: "hero-banner",  label: "Hero Banner", icon: "🎯", desc: "Gran banner de cabecera" },
      { type: "heading",      label: "Título",      icon: "H",  desc: "Encabezado de texto" },
      { type: "paragraph",    label: "Párrafo",     icon: "¶",  desc: "Bloque de texto" },
      { type: "image-block",  label: "Imagen",      icon: "🖼", desc: "Imagen o fotografía" },
      { type: "button-block", label: "Botón",       icon: "🔲", desc: "Botón de acción" },
    ],
  },
  {
    label: "Secciones",
    color: "#7c3aed",
    items: [
      { type: "two-column", label: "2 Columnas", icon: "▏▕", desc: "Layout dividido" },
      { type: "card-grid",  label: "Tarjetas",   icon: "▦",  desc: "Grilla de tarjetas" },
      { type: "cta-banner", label: "Banner CTA", icon: "⚡",  desc: "Llamada a la acción" },
      { type: "accordion",  label: "Acordeón",   icon: "☰",  desc: "FAQ / preguntas" },
    ],
  },
]

// ─── Block visual renderer ────────────────────────────────────────────────────

export function BlockRenderer({ block }: { block: VisualBlock }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p: Record<string, any> = block.props

  switch (block.type) {
    case "navbar":
      return (
        <nav style={{ backgroundColor: p.bgColor || "#0c3d6e" }} className="flex items-center justify-between px-6 py-3 gap-4">
          <div className="flex-shrink-0">
            {p.logoUrl
              ? <img src={p.logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
              : <span className="font-extrabold text-white text-sm">{p.logoText || "Mi Logo"}</span>}
          </div>
          <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1 flex-wrap">
            {(p.links as { id: string; label: string }[]).map((l) => (
              <span key={l.id} className="px-3 py-1 text-xs font-semibold text-white whitespace-nowrap">{l.label}</span>
            ))}
          </div>
        </nav>
      )

    case "hero-banner":
      return (
        <section
          className="relative overflow-hidden py-20 px-8"
          style={{ backgroundColor: p.bgColor || "#0c3d6e", textAlign: p.align || "center" }}
        >
          {p.bgImage && (
            <img src={p.bgImage} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ opacity: 0.2 }} />
          )}
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold leading-tight mb-4" style={{ color: p.textColor || "#fff" }}>
              {p.title || "Título Principal"}
            </h1>
            {p.subtitle && (
              <p className="text-lg mb-8 opacity-90" style={{ color: p.textColor || "#fff" }}>{p.subtitle}</p>
            )}
            {p.ctaLabel && (
              <a
                href={p.ctaHref || "#"}
                className="inline-block rounded-full px-8 py-3 font-bold text-sm"
                style={{ backgroundColor: p.ctaColor || "#fff", color: p.bgColor || "#0c3d6e" }}
              >
                {p.ctaLabel}
              </a>
            )}
          </div>
        </section>
      )

    case "heading": {
      const Tag = (p.level || "h2") as "h1" | "h2" | "h3" | "h4"
      const sz: Record<string, string> = { h1: "text-5xl", h2: "text-3xl", h3: "text-2xl", h4: "text-xl" }
      return (
        <div className="px-8 py-6" style={{ textAlign: p.align || "center" }}>
          <Tag className={`${sz[p.level] || "text-3xl"} font-extrabold`} style={{ color: p.color || "#0c3d6e" }}>
            {p.text || "Título de sección"}
          </Tag>
        </div>
      )
    }

    case "paragraph": {
      const fsz: Record<string, string> = { sm: "text-sm", base: "text-base", lg: "text-lg" }
      return (
        <div className="px-8 py-4" style={{ textAlign: p.align || "left" }}>
          <p className={`${fsz[p.fontSize] || "text-base"} leading-relaxed`} style={{ color: p.color || "#374151" }}>
            {p.text || "Escribe aquí tu contenido..."}
          </p>
        </div>
      )
    }

    case "image-block": {
      const wMap: Record<string, string> = { full: "w-full", half: "max-w-md", third: "max-w-xs" }
      const aMap: Record<string, string> = { left: "mr-auto", center: "mx-auto", right: "ml-auto" }
      return (
        <div className="px-8 py-4">
          {p.src ? (
            <div className={`${wMap[p.width] || "w-full"} ${aMap[p.align] || "mx-auto"}`}>
              <img src={p.src} alt={p.alt || ""} className={`w-full object-cover ${p.rounded ? "rounded-2xl" : ""}`} />
              {p.caption && <p className="text-xs text-gray-400 text-center mt-2 italic">{p.caption}</p>}
            </div>
          ) : (
            <div className="w-full bg-gray-100 rounded-xl h-40 flex flex-col items-center justify-center gap-2">
              <span className="text-3xl">🖼</span>
              <span className="text-xs text-gray-400">Sin imagen — súbela en el panel de propiedades</span>
            </div>
          )}
        </div>
      )
    }

    case "button-block": {
      const bsz: Record<string, string> = { sm: "px-4 py-2 text-xs", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" }
      const bAlign: Record<string, string> = { left: "justify-start", center: "justify-center", right: "justify-end" }
      return (
        <div className={`px-8 py-4 flex ${bAlign[p.align] || "justify-center"}`}>
          <button
            className={`rounded-full font-bold ${bsz[p.size] || "px-6 py-3 text-sm"} ${p.variant === "outline" ? "border-2" : ""}`}
            style={
              p.variant === "outline"
                ? { borderColor: p.bgColor || "#0099d6", color: p.bgColor || "#0099d6", backgroundColor: "transparent" }
                : { backgroundColor: p.bgColor || "#0099d6", color: p.textColor || "#fff" }
            }
          >
            {p.label || "Botón"}
          </button>
        </div>
      )
    }

    case "two-column":
      return (
        <div className="px-8 py-6 grid grid-cols-2 gap-8 min-h-[80px]">
          <div>
            {p.leftType === "image" && p.leftImage
              ? <img src={p.leftImage} alt="" className="w-full rounded-xl object-cover" />
              : <p className="text-sm text-gray-700 whitespace-pre-line">{p.leftText || "Columna izquierda"}</p>}
          </div>
          <div>
            {p.rightType === "image" && p.rightImage
              ? <img src={p.rightImage} alt="" className="w-full rounded-xl object-cover" />
              : <p className="text-sm text-gray-700 whitespace-pre-line">{p.rightText || "Columna derecha"}</p>}
          </div>
        </div>
      )

    case "card-grid": {
      const cgCols: Record<number, string> = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" }
      return (
        <div className={`px-8 py-6 grid ${cgCols[p.cols] || "grid-cols-3"} gap-4`}>
          {(p.cards as { id: string; title: string; description: string; image: string; bgColor: string }[]).map((card) => (
            <div key={card.id} className="rounded-2xl overflow-hidden border border-gray-200" style={{ backgroundColor: card.bgColor || "#f0f6fb" }}>
              {card.image
                ? <img src={card.image} alt="" className="w-full h-28 object-cover" />
                : <div className="w-full h-28 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">🖼 Sin imagen</div>}
              <div className="p-3">
                <p className="font-bold text-gray-800 text-sm">{card.title}</p>
                <p className="text-xs text-gray-500 mt-1">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      )
    }

    case "divider":
      return (
        <div style={{ paddingTop: `${p.marginY || 16}px`, paddingBottom: `${p.marginY || 16}px` }} className="px-8">
          <hr style={{ borderColor: p.color || "#e5e7eb", borderTopWidth: `${p.thickness || 1}px`, borderStyle: p.style || "solid" }} />
        </div>
      )

    case "spacer":
      return (
        <div style={{ height: `${p.height || 48}px` }} className="relative">
          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-300 select-none pointer-events-none">
            Espacio {p.height || 48}px
          </div>
        </div>
      )

    case "cta-banner":
      return (
        <section className="px-8 py-16 text-center" style={{ backgroundColor: p.bgColor || "#0099d6" }}>
          <h2 className="text-3xl font-extrabold mb-3" style={{ color: p.textColor || "#fff" }}>{p.title || "¿Listo para empezar?"}</h2>
          {p.subtitle && <p className="text-base mb-6 opacity-90" style={{ color: p.textColor || "#fff" }}>{p.subtitle}</p>}
          <a href={p.ctaHref || "#"} className="inline-block bg-white rounded-full px-8 py-3 font-bold text-sm"
            style={{ color: p.bgColor || "#0099d6" }}>
            {p.ctaLabel || "Empezar"}
          </a>
        </section>
      )

    case "accordion":
      return (
        <div className="px-8 py-6">
          {p.title && <h3 className="text-xl font-bold text-[#0c3d6e] mb-4 text-center">{p.title}</h3>}
          <div className="space-y-2">
            {(p.items as { id: string; title: string; content: string }[]).map((item, i) => (
              <div key={item.id} className="rounded-xl border border-gray-200 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50">
                  <span className="text-xs font-bold text-[#0099d6] w-5 flex-shrink-0">{i + 1}</span>
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                </div>
                <div className="px-4 py-3 bg-white">
                  <p className="text-sm text-gray-600">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case "footer-block":
      return (
        <footer className="px-8 py-10 text-center" style={{ backgroundColor: p.bgColor || "#1e293b" }}>
          <p className="text-sm" style={{ color: p.textColor || "#94a3b8" }}>{p.text || "© 2026 Mi Empresa"}</p>
        </footer>
      )

    default:
      return <div className="p-4 bg-gray-100 text-gray-400 text-center text-xs">[Bloque: {block.type}]</div>
  }
}

// ─── Palette item (draggable) ─────────────────────────────────────────────────

function PaletteItem({ type, label, icon, desc }: { type: VisualBlockType; label: string; icon: string; desc: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette::${type}`,
    data: { source: "palette", blockType: type },
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      title={desc}
      className={`flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5 cursor-grab select-none transition-all active:cursor-grabbing hover:border-[#0099d6]/40 hover:shadow-sm hover:bg-[#0099d6]/5 ${isDragging ? "opacity-40 scale-95" : ""}`}
    >
      <span className="text-lg w-6 text-center flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-bold text-gray-700 leading-tight">{label}</p>
        <p className="text-[10px] text-gray-400 truncate">{desc}</p>
      </div>
    </div>
  )
}

// ─── Canvas block (sortable + selectable) ────────────────────────────────────

function CanvasBlock({
  block, isSelected, onSelect, onDelete, onMoveUp, onMoveDown,
}: {
  block: VisualBlock
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id, data: { source: "canvas" } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 50 : undefined,
  }

  const blockLabels: Partial<Record<VisualBlockType, string>> = {
    "navbar": "Navbar", "hero-banner": "Hero Banner", "heading": "Título",
    "paragraph": "Párrafo", "image-block": "Imagen", "button-block": "Botón",
    "two-column": "2 Columnas", "card-grid": "Tarjetas", "divider": "Divisor",
    "spacer": "Espacio", "cta-banner": "Banner CTA", "accordion": "Acordeón", "footer-block": "Footer",
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`group relative border-2 rounded-xl overflow-hidden transition-all cursor-pointer ${
        isSelected
          ? "border-[#0099d6] shadow-lg shadow-[#0099d6]/20 ring-1 ring-[#0099d6]/20"
          : "border-transparent hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      {/* Top controls - always visible on hover, always on when selected */}
      <div className={`absolute top-2 left-2 right-2 flex items-center gap-1 z-20 pointer-events-none ${isSelected || true ? "" : ""}`}>
        {/* Block type badge */}
        <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold transition ${isSelected ? "bg-[#0099d6] text-white opacity-100" : "bg-black/40 text-white opacity-0 group-hover:opacity-100"}`}>
          {blockLabels[block.type] || block.type}
        </div>

        {/* Controls */}
        <div className={`ml-auto flex gap-1 pointer-events-auto transition ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
          <button
            {...attributes}
            {...listeners}
            type="button"
            onClick={(e) => e.stopPropagation()}
            title="Arrastrar"
            className="h-6 w-6 flex items-center justify-center rounded-lg bg-white/90 shadow text-gray-500 hover:text-gray-700 cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="h-3 w-3" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); onMoveUp() }} title="Subir" className="h-6 w-6 flex items-center justify-center rounded-lg bg-white/90 shadow text-gray-500 hover:text-gray-700">
            <ChevronUp className="h-3 w-3" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); onMoveDown() }} title="Bajar" className="h-6 w-6 flex items-center justify-center rounded-lg bg-white/90 shadow text-gray-500 hover:text-gray-700">
            <ChevronDown className="h-3 w-3" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); onDelete() }} title="Eliminar" className="h-6 w-6 flex items-center justify-center rounded-lg bg-red-500 text-white shadow hover:bg-red-600">
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Rendered block */}
      <div className={`${block.type === "spacer" || block.type === "divider" ? "" : "pt-6"}`}>
        <BlockRenderer block={block} />
      </div>
    </div>
  )
}

// ─── Canvas drop zone ─────────────────────────────────────────────────────────

function Canvas({
  blocks,
  selectedId,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  blocks: VisualBlock[]
  selectedId: string | null
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onMoveUp: (id: string) => void
  onMoveDown: (id: string) => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" })

  return (
    <div
      ref={setNodeRef}
      className={`min-h-full transition-colors ${isOver ? "bg-[#0099d6]/5" : "bg-white"}`}
    >
      {blocks.length === 0 ? (
        <div className={`flex flex-col items-center justify-center min-h-[480px] gap-4 transition ${isOver ? "scale-[1.01]" : ""}`}>
          <div className={`border-4 border-dashed rounded-3xl p-12 text-center transition ${isOver ? "border-[#0099d6] bg-[#0099d6]/10" : "border-gray-200"}`}>
            <div className="text-5xl mb-4">🎨</div>
            <p className="text-lg font-bold text-gray-600">Página vacía</p>
            <p className="text-sm text-gray-400 mt-1 max-w-xs">
              Arrastra elementos desde el panel izquierdo o haz clic en <strong>+</strong> para añadirlos
            </p>
          </div>
        </div>
      ) : (
        <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-1 p-2">
            {blocks.map((block) => (
              <CanvasBlock
                key={block.id}
                block={block}
                isSelected={selectedId === block.id}
                onSelect={() => onSelect(block.id)}
                onDelete={() => onDelete(block.id)}
                onMoveUp={() => onMoveUp(block.id)}
                onMoveDown={() => onMoveDown(block.id)}
              />
            ))}
          </div>
        </SortableContext>
      )}
    </div>
  )
}

// ─── Props panel ─────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}
const inp = "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:bg-white focus:ring-2 focus:ring-[#0099d6]/20"
const inpM = inp + " font-mono"
const sel = "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6]"
const txa = inp + " resize-none"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ColorField({ label, pkey, p, update }: { label: string; pkey: string; p: Record<string, any>; update: (d: Record<string, unknown>) => void }) {
  return (
    <Field label={label}>
      <div className="flex gap-2">
        <input type="color" value={p[pkey] || "#000000"} onChange={(e) => update({ [pkey]: e.target.value })}
          className="h-9 w-9 rounded-lg border border-gray-200 cursor-pointer p-0.5 flex-shrink-0" />
        <input value={p[pkey] || ""} onChange={(e) => update({ [pkey]: e.target.value })} className={inpM} />
      </div>
    </Field>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PropsPanel({ block, onUpdate, onClose }: { block: VisualBlock | null; onUpdate: (props: Record<string, unknown>) => void; onClose: () => void }) {
  if (!block) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-6 gap-3">
        <div className="text-5xl">👆</div>
        <div>
          <p className="text-sm font-bold text-gray-600">Selecciona un bloque</p>
          <p className="text-xs text-gray-400 mt-1">Haz clic en cualquier bloque del canvas para editar sus propiedades aquí</p>
        </div>
      </div>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p: Record<string, any> = block.props
  const up = (partial: Record<string, unknown>) => onUpdate({ ...p, ...partial })

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <p className="text-xs font-bold text-[#0c3d6e] uppercase tracking-wide">Propiedades</p>
          <p className="text-[10px] text-gray-400 mt-0.5 capitalize">{block.type.replace("-", " ")}</p>
        </div>
        <button onClick={onClose} className="h-7 w-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Fields — scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {block.type === "navbar" && (
          <>
            <ColorField label="Color de fondo" pkey="bgColor" p={p} update={up} />
            <Field label="Texto del logo (si no hay imagen)">
              <input value={p.logoText || ""} onChange={(e) => up({ logoText: e.target.value })} className={inp} />
            </Field>
            <ImageUpload label="Imagen del logo" value={p.logoUrl || ""} onChange={(v) => up({ logoUrl: v })} previewHeight={40} previewWidth={140} />
            <Field label="Enlace de navegación">
              <div className="space-y-2">
                {(p.links as { id: string; label: string; href: string }[]).map((link, i) => (
                  <div key={link.id} className="flex gap-2 items-center">
                    <input value={link.label} onChange={(e) => { const ls = [...p.links]; ls[i] = { ...ls[i], label: e.target.value }; up({ links: ls }) }} placeholder="Etiqueta" className={inp} />
                    <button type="button" onClick={() => up({ links: p.links.filter((_: unknown, j: number) => j !== i) })} className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50"><Minus className="h-3.5 w-3.5" /></button>
                  </div>
                ))}
                <button type="button" onClick={() => up({ links: [...p.links, { id: Date.now().toString(), label: "Nuevo enlace", href: "#" }] })} className="flex items-center gap-1 text-xs text-[#0099d6] font-semibold hover:underline">
                  <Plus className="h-3 w-3" /> Añadir enlace
                </button>
              </div>
            </Field>
          </>
        )}

        {block.type === "hero-banner" && (
          <>
            <Field label="Título"><input value={p.title || ""} onChange={(e) => up({ title: e.target.value })} className={inp} /></Field>
            <Field label="Subtítulo"><textarea value={p.subtitle || ""} onChange={(e) => up({ subtitle: e.target.value })} rows={2} className={txa} /></Field>
            <Field label="Texto del botón"><input value={p.ctaLabel || ""} onChange={(e) => up({ ctaLabel: e.target.value })} className={inp} /></Field>
            <Field label="Enlace del botón"><input value={p.ctaHref || ""} onChange={(e) => up({ ctaHref: e.target.value })} className={inpM} /></Field>
            <ColorField label="Color de fondo" pkey="bgColor" p={p} update={up} />
            <ColorField label="Color del texto" pkey="textColor" p={p} update={up} />
            <ColorField label="Color del botón" pkey="ctaColor" p={p} update={up} />
            <Field label="Alineación">
              <select value={p.align || "center"} onChange={(e) => up({ align: e.target.value })} className={sel}>
                <option value="left">Izquierda</option>
                <option value="center">Centro</option>
                <option value="right">Derecha</option>
              </select>
            </Field>
            <ImageUpload label="Imagen de fondo (opcional)" value={p.bgImage || ""} onChange={(v) => up({ bgImage: v })} previewHeight={60} previewWidth={120} />
          </>
        )}

        {block.type === "heading" && (
          <>
            <Field label="Texto"><input value={p.text || ""} onChange={(e) => up({ text: e.target.value })} className={inp} /></Field>
            <Field label="Nivel">
              <select value={p.level || "h2"} onChange={(e) => up({ level: e.target.value })} className={sel}>
                {["h1","h2","h3","h4"].map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
              </select>
            </Field>
            <Field label="Alineación">
              <select value={p.align || "center"} onChange={(e) => up({ align: e.target.value })} className={sel}>
                <option value="left">Izquierda</option><option value="center">Centro</option><option value="right">Derecha</option>
              </select>
            </Field>
            <ColorField label="Color del texto" pkey="color" p={p} update={up} />
          </>
        )}

        {block.type === "paragraph" && (
          <>
            <Field label="Contenido"><textarea value={p.text || ""} onChange={(e) => up({ text: e.target.value })} rows={5} className={txa} /></Field>
            <Field label="Alineación">
              <select value={p.align || "left"} onChange={(e) => up({ align: e.target.value })} className={sel}>
                <option value="left">Izquierda</option><option value="center">Centro</option><option value="right">Derecha</option>
              </select>
            </Field>
            <Field label="Tamaño de fuente">
              <select value={p.fontSize || "base"} onChange={(e) => up({ fontSize: e.target.value })} className={sel}>
                <option value="sm">Pequeño</option><option value="base">Normal</option><option value="lg">Grande</option>
              </select>
            </Field>
            <ColorField label="Color del texto" pkey="color" p={p} update={up} />
          </>
        )}

        {block.type === "image-block" && (
          <>
            <ImageUpload label="Imagen" value={p.src || ""} onChange={(v) => up({ src: v })} previewHeight={80} previewWidth={140} />
            <Field label="Texto alternativo (SEO)"><input value={p.alt || ""} onChange={(e) => up({ alt: e.target.value })} className={inp} /></Field>
            <Field label="Pie de foto"><input value={p.caption || ""} onChange={(e) => up({ caption: e.target.value })} className={inp} /></Field>
            <Field label="Anchura">
              <select value={p.width || "full"} onChange={(e) => up({ width: e.target.value })} className={sel}>
                <option value="full">Completo</option><option value="half">Mitad</option><option value="third">Tercio</option>
              </select>
            </Field>
            <Field label="Alineación">
              <select value={p.align || "center"} onChange={(e) => up({ align: e.target.value })} className={sel}>
                <option value="left">Izquierda</option><option value="center">Centro</option><option value="right">Derecha</option>
              </select>
            </Field>
            <Field label="Bordes redondeados">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={!!p.rounded} onChange={(e) => up({ rounded: e.target.checked })} className="rounded accent-[#0099d6]" />
                <span className="text-sm text-gray-600">Activar bordes redondeados</span>
              </label>
            </Field>
          </>
        )}

        {block.type === "button-block" && (
          <>
            <Field label="Texto del botón"><input value={p.label || ""} onChange={(e) => up({ label: e.target.value })} className={inp} /></Field>
            <Field label="Enlace (href)"><input value={p.href || ""} onChange={(e) => up({ href: e.target.value })} className={inpM} /></Field>
            <Field label="Estilo">
              <select value={p.variant || "solid"} onChange={(e) => up({ variant: e.target.value })} className={sel}>
                <option value="solid">Sólido (relleno)</option><option value="outline">Contorno</option>
              </select>
            </Field>
            <ColorField label="Color del botón" pkey="bgColor" p={p} update={up} />
            <ColorField label="Color del texto" pkey="textColor" p={p} update={up} />
            <Field label="Tamaño">
              <select value={p.size || "md"} onChange={(e) => up({ size: e.target.value })} className={sel}>
                <option value="sm">Pequeño</option><option value="md">Mediano</option><option value="lg">Grande</option>
              </select>
            </Field>
            <Field label="Alineación">
              <select value={p.align || "center"} onChange={(e) => up({ align: e.target.value })} className={sel}>
                <option value="left">Izquierda</option><option value="center">Centro</option><option value="right">Derecha</option>
              </select>
            </Field>
          </>
        )}

        {block.type === "two-column" && (
          <>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Columna Izquierda</p>
            <Field label="Tipo de contenido">
              <select value={p.leftType || "text"} onChange={(e) => up({ leftType: e.target.value })} className={sel}>
                <option value="text">Texto</option><option value="image">Imagen</option>
              </select>
            </Field>
            {p.leftType === "image"
              ? <ImageUpload label="Imagen izquierda" value={p.leftImage || ""} onChange={(v) => up({ leftImage: v })} previewHeight={60} previewWidth={100} />
              : <Field label="Texto"><textarea value={p.leftText || ""} onChange={(e) => up({ leftText: e.target.value })} rows={4} className={txa} /></Field>}
            <div className="border-t border-gray-100" />
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Columna Derecha</p>
            <Field label="Tipo de contenido">
              <select value={p.rightType || "text"} onChange={(e) => up({ rightType: e.target.value })} className={sel}>
                <option value="text">Texto</option><option value="image">Imagen</option>
              </select>
            </Field>
            {p.rightType === "image"
              ? <ImageUpload label="Imagen derecha" value={p.rightImage || ""} onChange={(v) => up({ rightImage: v })} previewHeight={60} previewWidth={100} />
              : <Field label="Texto"><textarea value={p.rightText || ""} onChange={(e) => up({ rightText: e.target.value })} rows={4} className={txa} /></Field>}
          </>
        )}

        {block.type === "card-grid" && (
          <>
            <Field label="Columnas">
              <select value={String(p.cols || 3)} onChange={(e) => up({ cols: parseInt(e.target.value) })} className={sel}>
                <option value="2">2 columnas</option><option value="3">3 columnas</option><option value="4">4 columnas</option>
              </select>
            </Field>
            {(p.cards as { id: string; title: string; description: string; image: string; bgColor: string }[]).map((card, i) => (
              <div key={card.id} className="rounded-xl border border-gray-200 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-gray-500">Tarjeta {i + 1}</p>
                  <button type="button" onClick={() => up({ cards: p.cards.filter((_: unknown, j: number) => j !== i) })} className="h-6 w-6 flex items-center justify-center rounded text-red-400 hover:bg-red-50">
                    <Minus className="h-3 w-3" />
                  </button>
                </div>
                <input value={card.title} onChange={(e) => { const cs = [...p.cards]; cs[i] = { ...cs[i], title: e.target.value }; up({ cards: cs }) }} placeholder="Título" className={inp} />
                <textarea value={card.description} onChange={(e) => { const cs = [...p.cards]; cs[i] = { ...cs[i], description: e.target.value }; up({ cards: cs }) }} placeholder="Descripción" rows={2} className={txa} />
                <ImageUpload label="Imagen" value={card.image || ""} onChange={(v) => { const cs = [...p.cards]; cs[i] = { ...cs[i], image: v }; up({ cards: cs }) }} previewHeight={48} previewWidth={80} />
              </div>
            ))}
            <button type="button" onClick={() => up({ cards: [...p.cards, { id: Date.now().toString(), title: `Tarjeta ${p.cards.length + 1}`, description: "Descripción.", image: "", bgColor: "#f0f6fb" }] })} className="flex items-center gap-1 text-xs text-[#0099d6] font-semibold hover:underline">
              <Plus className="h-3 w-3" /> Añadir tarjeta
            </button>
          </>
        )}

        {block.type === "divider" && (
          <>
            <ColorField label="Color de la línea" pkey="color" p={p} update={up} />
            <Field label="Estilo">
              <select value={p.style || "solid"} onChange={(e) => up({ style: e.target.value })} className={sel}>
                <option value="solid">Sólido</option><option value="dashed">Guiones</option><option value="dotted">Puntos</option>
              </select>
            </Field>
            <Field label={`Grosor: ${p.thickness || 1}px`}>
              <input type="range" min={1} max={8} value={p.thickness || 1} onChange={(e) => up({ thickness: parseInt(e.target.value) })} className="w-full accent-[#0099d6]" />
            </Field>
            <Field label={`Margen vertical: ${p.marginY || 16}px`}>
              <input type="range" min={0} max={80} step={4} value={p.marginY || 16} onChange={(e) => up({ marginY: parseInt(e.target.value) })} className="w-full accent-[#0099d6]" />
            </Field>
          </>
        )}

        {block.type === "spacer" && (
          <Field label={`Altura: ${p.height || 48}px`}>
            <input type="range" min={8} max={240} step={8} value={p.height || 48} onChange={(e) => up({ height: parseInt(e.target.value) })} className="w-full accent-[#0099d6]" />
          </Field>
        )}

        {block.type === "cta-banner" && (
          <>
            <Field label="Título"><input value={p.title || ""} onChange={(e) => up({ title: e.target.value })} className={inp} /></Field>
            <Field label="Subtítulo"><textarea value={p.subtitle || ""} onChange={(e) => up({ subtitle: e.target.value })} rows={2} className={txa} /></Field>
            <Field label="Texto del botón"><input value={p.ctaLabel || ""} onChange={(e) => up({ ctaLabel: e.target.value })} className={inp} /></Field>
            <Field label="Enlace"><input value={p.ctaHref || ""} onChange={(e) => up({ ctaHref: e.target.value })} className={inpM} /></Field>
            <ColorField label="Color de fondo" pkey="bgColor" p={p} update={up} />
            <ColorField label="Color del texto" pkey="textColor" p={p} update={up} />
          </>
        )}

        {block.type === "accordion" && (
          <>
            <Field label="Título de la sección">
              <input value={p.title || ""} onChange={(e) => up({ title: e.target.value })} className={inp} />
            </Field>
            {(p.items as { id: string; title: string; content: string }[]).map((item, i) => (
              <div key={item.id} className="rounded-xl border border-gray-200 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-gray-500">Item {i + 1}</p>
                  <button type="button" onClick={() => up({ items: p.items.filter((_: unknown, j: number) => j !== i) })} className="h-6 w-6 flex items-center justify-center rounded text-red-400 hover:bg-red-50">
                    <Minus className="h-3 w-3" />
                  </button>
                </div>
                <input value={item.title} onChange={(e) => { const its = [...p.items]; its[i] = { ...its[i], title: e.target.value }; up({ items: its }) }} placeholder="Pregunta" className={inp} />
                <textarea value={item.content} onChange={(e) => { const its = [...p.items]; its[i] = { ...its[i], content: e.target.value }; up({ items: its }) }} placeholder="Respuesta" rows={2} className={txa} />
              </div>
            ))}
            <button type="button" onClick={() => up({ items: [...p.items, { id: Date.now().toString(), title: "Nueva pregunta", content: "Respuesta aquí." }] })} className="flex items-center gap-1 text-xs text-[#0099d6] font-semibold hover:underline">
              <Plus className="h-3 w-3" /> Añadir pregunta
            </button>
          </>
        )}

        {block.type === "footer-block" && (
          <>
            <Field label="Texto del footer">
              <textarea value={p.text || ""} onChange={(e) => up({ text: e.target.value })} rows={3} className={txa} />
            </Field>
            <ColorField label="Color de fondo" pkey="bgColor" p={p} update={up} />
            <ColorField label="Color del texto" pkey="textColor" p={p} update={up} />
          </>
        )}
      </div>
    </div>
  )
}

// ─── Main Visual Builder ──────────────────────────────────────────────────────

export function VisualBuilder() {
  const { visualBlocks, setVisualBlocks, addVisualBlock, updateVisualBlock, removeVisualBlock } = useCMSStore()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [dragActiveId, setDragActiveId] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop")
  const [showPreview, setShowPreview] = useState(false)
  const [showPalette, setShowPalette] = useState(true)
  const [showProps, setShowProps] = useState(true)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const selectedBlock = visualBlocks.find((b) => b.id === selectedId) ?? null

  // Get drag ghost info
  const isPaletteItem = dragActiveId?.startsWith("palette::")
  const paletteType = isPaletteItem ? dragActiveId!.replace("palette::", "") as VisualBlockType : null
  const dragGhostBlock = paletteType
    ? createDefaultVisualBlock(paletteType)
    : visualBlocks.find((b) => b.id === dragActiveId) ?? null

  function handleDragStart(e: DragStartEvent) {
    setDragActiveId(e.active.id as string)
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e
    setDragActiveId(null)
    if (!over) return

    const source = active.data.current?.source

    if (source === "palette") {
      const blockType = active.data.current?.blockType as VisualBlockType
      const overId = over.id as string
      // Find insert position
      let atIndex: number | undefined
      if (overId !== "canvas") {
        const idx = visualBlocks.findIndex((b) => b.id === overId)
        if (idx !== -1) atIndex = idx + 1
      }
      addVisualBlock(blockType, atIndex)
    } else if (source === "canvas") {
      if (active.id !== over.id) {
        const oldI = visualBlocks.findIndex((b) => b.id === active.id)
        const newI = visualBlocks.findIndex((b) => b.id === over.id)
        if (oldI !== -1 && newI !== -1) setVisualBlocks(arrayMove(visualBlocks, oldI, newI))
      }
    }
  }

  function handleMoveUp(id: string) {
    const i = visualBlocks.findIndex((b) => b.id === id)
    if (i > 0) setVisualBlocks(arrayMove(visualBlocks, i, i - 1))
  }
  function handleMoveDown(id: string) {
    const i = visualBlocks.findIndex((b) => b.id === id)
    if (i < visualBlocks.length - 1) setVisualBlocks(arrayMove(visualBlocks, i, i + 1))
  }

  const blockName = (t?: VisualBlockType) => t?.replace("-", " ") ?? ""

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full overflow-hidden">

        {/* ── LEFT: Palette ── */}
        <div className={`flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden transition-all duration-200 ${showPalette ? "w-52" : "w-0 border-0"}`}>
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-extrabold text-[#0c3d6e] uppercase tracking-wider">Elementos</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Arrastra al canvas →</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {PALETTE.map((cat) => (
              <div key={cat.label}>
                <p className="text-[10px] font-extrabold uppercase tracking-widest mb-2 px-1" style={{ color: cat.color }}>
                  {cat.label}
                </p>
                <div className="space-y-1.5">
                  {cat.items.map((item) => (
                    <PaletteItem key={item.type} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CENTER: Canvas ── */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#f0f6fb]">
          {/* Toolbar */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-white border-b border-gray-200 shadow-sm overflow-x-auto flex-shrink-0 min-h-[44px] whitespace-nowrap">
            {/* Panel toggles */}
            <button
              onClick={() => setShowPalette((v) => !v)}
              title={showPalette ? "Ocultar elementos" : "Mostrar elementos"}
              className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border transition ${
                showPalette ? "border-[#0099d6] bg-[#0099d6]/10 text-[#0099d6]" : "border-gray-200 bg-white text-gray-400 hover:bg-gray-50"
              }`}
            >
              {showPalette ? <PanelLeftClose className="h-3.5 w-3.5" /> : <PanelLeftOpen className="h-3.5 w-3.5" />}
            </button>
            <p className="text-xs font-bold text-gray-600 flex-shrink-0">
              <span className="text-[#0c3d6e] font-extrabold">{visualBlocks.length}</span> elem.
            </p>
            <div className="flex items-center gap-1 rounded-lg bg-emerald-50 border border-emerald-200 px-2 py-1 ml-auto flex-shrink-0">
              <span className="text-emerald-500 text-xs">✓</span>
              <p className="text-[10px] font-medium text-emerald-700">Guardado</p>
            </div>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
              <button onClick={() => setPreviewMode("desktop")} className={`flex items-center px-2 py-1.5 transition ${previewMode === "desktop" ? "bg-[#0099d6] text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}><Monitor className="h-3.5 w-3.5" /></button>
              <button onClick={() => setPreviewMode("mobile")} className={`flex items-center px-2 py-1.5 transition ${previewMode === "mobile" ? "bg-[#0099d6] text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}><Smartphone className="h-3.5 w-3.5" /></button>
            </div>
            <button onClick={() => setShowPreview(true)} className="flex flex-shrink-0 items-center gap-1 rounded-xl bg-[#0c3d6e] text-white px-2.5 py-1.5 text-xs font-bold hover:bg-[#0099d6] transition">
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Vista previa</span>
            </button>
            {visualBlocks.length > 0 && (
              <button onClick={() => { if (confirm("¿Limpiar todos los bloques?")) { setVisualBlocks([]); setSelectedId(null) } }} className="flex flex-shrink-0 items-center gap-1 text-xs text-red-400 hover:text-red-600 font-semibold">
                <Trash2 className="h-3 w-3" />
                <span className="hidden sm:inline">Limpiar</span>
              </button>
            )}
            <button
              onClick={() => setShowProps((v) => !v)}
              title={showProps ? "Ocultar propiedades" : "Mostrar propiedades"}
              className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border transition ${
                showProps ? "border-[#0099d6] bg-[#0099d6]/10 text-[#0099d6]" : "border-gray-200 bg-white text-gray-400 hover:bg-gray-50"
              }`}
            >
              {showProps ? <PanelRightClose className="h-3.5 w-3.5" /> : <PanelRightOpen className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Canvas area */}
          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className={`mx-auto bg-white shadow-xl rounded-2xl overflow-hidden min-h-[480px] transition-all ${previewMode === "mobile" ? "max-w-sm" : "max-w-full"}`}>
              <Canvas
                blocks={visualBlocks}
                selectedId={selectedId}
                onSelect={(id) => setSelectedId(id === selectedId ? null : id)}
                onDelete={(id) => { removeVisualBlock(id); if (selectedId === id) setSelectedId(null) }}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Properties ── */}
        <div className={`flex-shrink-0 bg-white border-l border-gray-200 overflow-hidden flex flex-col transition-all duration-200 ${showProps ? "w-72" : "w-0 border-0"}`}>
          <PropsPanel
            block={selectedBlock}
            onUpdate={(props) => { if (selectedBlock) updateVisualBlock(selectedBlock.id, props) }}
            onClose={() => setSelectedId(null)}
          />
        </div>
      </div>

      {/* ── DragOverlay ── */}
      <DragOverlay>
        {dragGhostBlock && (
          <div className="bg-white rounded-xl border-2 border-[#0099d6] shadow-2xl overflow-hidden max-w-sm opacity-90 pointer-events-none">
            <div className="bg-[#0099d6] px-3 py-1.5 flex items-center gap-2">
              <GripVertical className="h-3.5 w-3.5 text-white" />
              <span className="text-xs font-bold text-white uppercase tracking-wide">{blockName(dragGhostBlock.type)}</span>
            </div>
            <div className="max-h-32 overflow-hidden">
              <BlockRenderer block={dragGhostBlock} />
            </div>
          </div>
        )}
      </DragOverlay>

      {/* ── Preview modal ── */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 flex flex-col">
          <div className="flex items-center justify-between px-6 py-3 bg-[#0c3d6e] text-white">
            <p className="text-sm font-bold">Vista Previa de Página</p>
            <div className="flex items-center gap-3">
              <div className="flex rounded-lg border border-white/20 overflow-hidden">
                <button onClick={() => setPreviewMode("desktop")} className={`flex items-center gap-1 px-3 py-1.5 text-xs transition ${previewMode === "desktop" ? "bg-white/20" : "hover:bg-white/10"}`}><Monitor className="h-3.5 w-3.5" /> Desktop</button>
                <button onClick={() => setPreviewMode("mobile")} className={`flex items-center gap-1 px-3 py-1.5 text-xs transition ${previewMode === "mobile" ? "bg-white/20" : "hover:bg-white/10"}`}><Smartphone className="h-3.5 w-3.5" /> Móvil</button>
              </div>
              <button onClick={() => setShowPreview(false)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/20 transition">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-800 flex justify-center py-6 px-4">
            <div className={`bg-white shadow-2xl overflow-hidden w-full ${previewMode === "mobile" ? "max-w-sm rounded-3xl" : "max-w-5xl rounded-xl"}`}>
              {visualBlocks.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
                  Página vacía — añade elementos desde el editor
                </div>
              ) : (
                visualBlocks.map((block) => <BlockRenderer key={block.id} block={block} />)
              )}
            </div>
          </div>
        </div>
      )}
    </DndContext>
  )
}
