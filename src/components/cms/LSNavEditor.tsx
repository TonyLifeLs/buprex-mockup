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
import { useLaboSuisseStore, type LSNavLink } from "@/store/labosuisse"

// ─── Sortable nav link ────────────────────────────────────────────────────────

function SortableLinkRow({
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
      <button {...attributes} {...listeners} className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none" type="button">
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
      <button type="button" onClick={onDelete} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

// ─── Editor ───────────────────────────────────────────────────────────────────

export function LSNavEditor() {
  const { colors, navbar, navLinks, updateNavbar, setNavLinks } = useLaboSuisseStore()
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
            Navbar
          </div>
        </div>
        <p className="text-[13px] text-white/75">Logo, colores, botón principal y enlaces de navegación.</p>
      </div>

      {/* Logo */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-800">Logo tipográfico</h3>
        </div>
        <div className="px-5 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Palabra 1 (negrita)</label>
              <input value={navbar.logoWord1} onChange={(e) => updateNavbar({ logoWord1: e.target.value })}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Palabra 2 (ligera)</label>
              <input value={navbar.logoWord2} onChange={(e) => updateNavbar({ logoWord2: e.target.value })}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Color palabra 1</label>
              <div className="flex items-center gap-2">
                <input type="color" value={navbar.logoWord1Color} onChange={(e) => updateNavbar({ logoWord1Color: e.target.value })}
                  className="h-9 w-9 cursor-pointer rounded-lg border border-gray-200 p-0.5" />
                <input type="text" value={navbar.logoWord1Color}
                  onChange={(e) => { const v = e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value; if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) updateNavbar({ logoWord1Color: v }) }}
                  maxLength={7}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono uppercase outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Color palabra 2</label>
              <div className="flex items-center gap-2">
                <input type="color" value={navbar.logoWord2Color} onChange={(e) => updateNavbar({ logoWord2Color: e.target.value })}
                  className="h-9 w-9 cursor-pointer rounded-lg border border-gray-200 p-0.5" />
                <input type="text" value={navbar.logoWord2Color}
                  onChange={(e) => { const v = e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value; if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) updateNavbar({ logoWord2Color: v }) }}
                  maxLength={7}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono uppercase outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20" />
              </div>
            </div>
          </div>

          {/* Logo preview */}
          <div className="flex items-center gap-1 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
            <span className="font-bold tracking-[0.15em] uppercase text-lg" style={{ color: navbar.logoWord1Color }}>{navbar.logoWord1}</span>
            <span className="font-light tracking-[0.1em] uppercase text-base ml-1" style={{ color: navbar.logoWord2Color }}>{navbar.logoWord2}</span>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Texto del botón principal</label>
            <input value={navbar.ctaLabel} onChange={(e) => updateNavbar({ ctaLabel: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Enlace del botón principal</label>
            <input value={navbar.ctaHref} onChange={(e) => updateNavbar({ ctaHref: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20" />
          </div>
        </div>
      </div>

      {/* Nav links */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-800">Navegación</h3>
          <p className="mt-0.5 text-xs text-gray-500">Arrastra para reordenar. Máximo 7 enlaces recomendado.</p>
        </div>
        <div className="px-5 py-5 space-y-3">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={navLinks.map((l) => l.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <SortableLinkRow
                    key={link.id}
                    link={link}
                    onChange={(updated) => setNavLinks(navLinks.map((l) => (l.id === updated.id ? updated : l)))}
                    onDelete={() => setNavLinks(navLinks.filter((l) => l.id !== link.id))}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <button type="button" onClick={addLink}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-500 transition hover:border-[#B52A2D] hover:bg-red-50 hover:text-[#B52A2D]">
            <Plus className="h-4 w-4" /> Agregar enlace
          </button>
        </div>
      </div>
    </div>
  )
}
