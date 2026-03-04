"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Trash2, GripVertical, Link, Palette, ImageIcon } from "lucide-react"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useCMSStore } from "@/store/cms"
import type { NavLink, NavbarConfig } from "@/store/cms"
import { ImageUpload } from "@/components/cms/ImageUpload"

// ─── Sortable Link Row ────────────────────────────────────────────────────────

function SortableLinkRow({
  link,
  onChange,
  onDelete,
}: {
  link: NavLink
  onChange: (updated: NavLink) => void
  onDelete: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3 shadow-sm"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none"
        type="button"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <div className="flex flex-1 gap-2">
        <input
          value={link.label}
          onChange={(e) => onChange({ ...link, label: e.target.value })}
          placeholder="Etiqueta"
          className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:bg-white focus:ring-2 focus:ring-[#0099d6]/20"
        />
        <input
          value={link.href}
          onChange={(e) => onChange({ ...link, href: e.target.value })}
          placeholder="#seccion o /ruta"
          className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:bg-white focus:ring-2 focus:ring-[#0099d6]/20"
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

// ─── Navbar Preview ───────────────────────────────────────────────────────────

function NavbarPreview({ navbar }: { navbar: NavbarConfig }) {
  return (
    <div
      className="rounded-xl overflow-hidden shadow-md"
      style={{ backgroundColor: navbar.bgColor }}
    >
      <nav className="flex items-center justify-between px-5 py-3 gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          {navbar.logoUrl ? (
            <Image
              src={navbar.logoUrl}
              alt="Logo"
              width={160}
              height={44}
              className="h-9 w-auto object-contain"
              unoptimized
            />
          ) : (
            <div className="h-9 w-24 rounded-md bg-white/20 flex items-center justify-center text-white/40 text-xs">
              Sin logo
            </div>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-1 rounded-full bg-white/10 p-1 overflow-x-auto max-w-full">
          {navbar.links.length === 0 ? (
            <span className="px-4 py-1.5 text-xs text-white/40 italic">Sin enlaces</span>
          ) : (
            navbar.links.map((link) => (
              <span
                key={link.id}
                className="rounded-full px-4 py-1.5 text-sm font-semibold text-white whitespace-nowrap"
              >
                {link.label || "Enlace"}
              </span>
            ))
          )}
        </div>
      </nav>
    </div>
  )
}

// ─── Main Editor ──────────────────────────────────────────────────────────────

export function NavbarEditor() {
  const navbar = useCMSStore((s) => s.navbar)
  const updateNavbar = useCMSStore((s) => s.updateNavbar)
  const setNavLinks = useCMSStore((s) => s.setNavLinks)
  const sensors = useSensors(useSensor(PointerSensor))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = navbar.links.findIndex((l) => l.id === active.id)
      const newIndex = navbar.links.findIndex((l) => l.id === over.id)
      setNavLinks(arrayMove(navbar.links, oldIndex, newIndex))
    }
  }

  function addLink() {
    setNavLinks([
      ...navbar.links,
      { id: Date.now().toString(), label: "Nuevo enlace", href: "#" },
    ])
  }

  function updateLink(id: string, updated: NavLink) {
    setNavLinks(navbar.links.map((l) => (l.id === id ? updated : l)))
  }

  function deleteLink(id: string) {
    setNavLinks(navbar.links.filter((l) => l.id !== id))
  }

  return (
    <div className="space-y-8">
      {/* Live preview */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Vista previa en tiempo real
        </h3>
        <NavbarPreview navbar={navbar} />
      </div>

      {/* Color & Logo */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Color */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Palette className="h-4 w-4 text-[#0099d6]" />
            Color de fondo
          </div>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={navbar.bgColor}
              onChange={(e) => updateNavbar({ bgColor: e.target.value })}
              className="h-12 w-12 cursor-pointer rounded-xl border-0 bg-transparent p-0"
            />
            <div>
              <p className="text-xs text-gray-400 mb-1">Valor hex</p>
              <input
                type="text"
                value={navbar.bgColor}
                onChange={(e) => updateNavbar({ bgColor: e.target.value })}
                className="w-32 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono outline-none focus:border-[#0099d6] focus:ring-2 focus:ring-[#0099d6]/20"
              />
            </div>
          </div>

          {/* Presets */}
          <div>
            <p className="text-xs text-gray-400 mb-2">Colores rápidos</p>
            <div className="flex flex-wrap gap-2">
              {["#0c3d6e", "#0099d6", "#1e293b", "#be123c", "#047857", "#7c3aed", "#ffffff"].map(
                (c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => updateNavbar({ bgColor: c })}
                    title={c}
                    className={`h-7 w-7 rounded-lg border-2 transition hover:scale-110 ${navbar.bgColor === c ? "border-[#0099d6] scale-110" : "border-transparent"}`}
                    style={{ backgroundColor: c }}
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <ImageIcon className="h-4 w-4 text-[#0099d6]" />
            Logo
          </div>
          <ImageUpload
            label="Imagen del logo"
            value={navbar.logoUrl}
            onChange={(v) => updateNavbar({ logoUrl: v })}
            previewHeight={48}
            previewWidth={140}
          />
        </div>
      </div>

      {/* Links */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Link className="h-4 w-4 text-[#0099d6]" />
            Etiquetas de navegación
          </div>
          <button
            type="button"
            onClick={addLink}
            className="flex items-center gap-1.5 rounded-xl bg-[#0099d6] px-4 py-2 text-xs font-bold text-white hover:bg-[#0080b8] transition"
          >
            <Plus className="h-3.5 w-3.5" />
            Añadir enlace
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Arrastra <GripVertical className="inline h-3 w-3" /> para reordenar. Edita la etiqueta y el destino de cada enlace.
        </p>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={navbar.links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {navbar.links.map((link) => (
                <SortableLinkRow
                  key={link.id}
                  link={link}
                  onChange={(updated) => updateLink(link.id, updated)}
                  onDelete={() => deleteLink(link.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {navbar.links.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-gray-200 py-8 text-center text-sm text-gray-400">
            No hay enlaces. Haz clic en "Añadir enlace" para comenzar.
          </div>
        )}
      </div>
    </div>
  )
}
