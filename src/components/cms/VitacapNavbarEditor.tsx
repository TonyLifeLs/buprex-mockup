"use client"

import { Plus, Trash2, GripVertical } from "lucide-react"
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
import { useVitacapStore, type VitacapNavLink } from "@/store/vitacap"

const ACCENT = "#C3311D"

// ─── Sortable nav link ─────────────────────────────────────────────────────────

function SortableLinkRow({
  link,
  onChange,
  onDelete,
}: {
  link: VitacapNavLink
  onChange: (l: VitacapNavLink) => void
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
        type="button"
        className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex flex-1 gap-2">
        <input
          value={link.label}
          onChange={(e) => onChange({ ...link, label: e.target.value })}
          placeholder="Etiqueta"
          className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#C3311D] focus:bg-white focus:ring-2 focus:ring-[#C3311D]/20"
        />
        <input
          value={link.href}
          onChange={(e) => onChange({ ...link, href: e.target.value })}
          placeholder="#seccion"
          className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#C3311D] focus:bg-white focus:ring-2 focus:ring-[#C3311D]/20"
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

// ─── Editor ───────────────────────────────────────────────────────────────────

export function VitacapNavbarEditor() {
  const { content, setContent, addNavLink, setNavLinks } = useVitacapStore()
  const links = content.navbarLinks
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oi = links.findIndex((l) => l.id === active.id)
      const ni = links.findIndex((l) => l.id === over.id)
      setNavLinks(arrayMove(links, oi, ni))
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Header */}
      <div
        className="rounded-2xl p-6"
        style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #671225 100%)` }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex flex-col items-start leading-none select-none">
            <span className="text-[16px] font-bold uppercase tracking-[0.12em] text-white">VITACAP</span>
            <span className="text-[22px] font-bold leading-none" style={{ color: "#F1DF00" }}>G</span>
          </div>
          <div className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
            Navbar
          </div>
        </div>
        <p className="text-[13px] text-white/75">Logo tipográfico, CTA y enlaces de navegación.</p>
      </div>

      {/* Logo preview card */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-800">Vista previa del navbar</h3>
          <p className="mt-0.5 text-xs text-gray-500">El logo tipográfico sigue el manual de marca (VITACAP / G en amarillo).</p>
        </div>
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ backgroundColor: ACCENT }}
        >
          {/* Logo */}
          <div className="flex flex-col items-start leading-none">
            <span className="text-[14px] font-bold uppercase tracking-[0.12em] text-white">VITACAP</span>
            <span className="text-[20px] font-bold leading-none" style={{ color: "#F1DF00" }}>G</span>
          </div>
          {/* Links preview */}
          <div className="hidden md:flex items-center gap-4">
            {links.map((l) => (
              <span key={l.id} className="text-[13px] font-medium text-white/85">{l.label}</span>
            ))}
          </div>

        </div>
      </div>

      {/* Nav links */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-800">Navegación</h3>
          <p className="mt-0.5 text-xs text-gray-500">
            Arrastra para reordenar. Máximo 6 enlaces recomendado.
          </p>
        </div>
        <div className="px-5 py-5 space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={links.map((l) => l.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {links.map((link) => (
                  <SortableLinkRow
                    key={link.id}
                    link={link}
                    onChange={(updated) =>
                      setNavLinks(links.map((l) => (l.id === updated.id ? updated : l)))
                    }
                    onDelete={() => setNavLinks(links.filter((l) => l.id !== link.id))}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <button
            type="button"
            onClick={addNavLink}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-500 transition hover:border-[#C3311D] hover:bg-red-50 hover:text-[#C3311D]"
          >
            <Plus className="h-4 w-4" /> Agregar enlace
          </button>
        </div>
      </div>

      {/* Brand note */}
      <div
        className="rounded-xl border px-4 py-3 text-[12px] leading-[18px]"
        style={{ borderColor: "#F1DF00", backgroundColor: "#fffdf0", color: "#5a4a00" }}
      >
        <span className="font-bold">Manual de marca:</span> El logotipo es siempre tipográfico.
        La palabra "VITACAP" en blanco y la letra "G" en amarillo brillante (#F1DF00).
        No usar fondos fuera de la paleta oficial. El fondo del navbar es siempre Rojo vivo (#C3311D).
      </div>
    </div>
  )
}
