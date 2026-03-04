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
import type { ProductItem } from "@/store/cms"
import { ImageUpload } from "@/components/cms/ImageUpload"

function SortableProductCard({
  item,
  onUpdate,
  onDelete,
}: {
  item: ProductItem
  onUpdate: (d: Partial<ProductItem>) => void
  onDelete: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id })

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

        <div
          className="h-8 w-8 rounded-lg flex-shrink-0 bg-gray-100 overflow-hidden"
        >
          {item.image && (
            <Image src={item.image} alt="" width={32} height={32} className="h-full w-full object-contain" unoptimized />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">{item.name || "Sin nombre"}</p>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.accentColor }}
            />
            <p className="text-xs text-gray-400 truncate">
              {item.isAdult ? "Adultos" : "Pediátrico"} {item.subtitle && `· ${item.subtitle}`}
            </p>
          </div>
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

      {expanded && (
        <div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Nombre</label>
            <input
              value={item.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:ring-2 focus:ring-[#0099d6]/20"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Subtítulo / Variante</label>
            <input
              value={item.subtitle || item.variant}
              onChange={(e) => onUpdate({ subtitle: e.target.value, variant: e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:ring-2 focus:ring-[#0099d6]/20"
            />
          </div>
          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Descripción</label>
            <textarea
              value={item.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:ring-2 focus:ring-[#0099d6]/20 resize-none"
            />
          </div>
          <ImageUpload label="Imagen del producto" value={item.image} onChange={(v) => onUpdate({ image: v })} previewHeight={80} previewWidth={80} />
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Color de acento</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={item.accentColor}
                onChange={(e) => onUpdate({ accentColor: e.target.value })}
                className="h-9 w-9 cursor-pointer rounded-lg border-0 p-0"
              />
              <input
                value={item.accentColor}
                onChange={(e) => onUpdate({ accentColor: e.target.value })}
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono outline-none focus:border-[#0099d6] focus:ring-2 focus:ring-[#0099d6]/20"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Categoría</label>
            <select
              value={item.isAdult ? "adult" : "pediatric"}
              onChange={(e) => onUpdate({ isAdult: e.target.value === "adult" })}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6]"
            >
              <option value="pediatric">Pediátrico</option>
              <option value="adult">Adultos</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export function ProductsEditor() {
  const { products, setProducts, updateProduct, addProduct, deleteProduct } = useCMSStore()
  const sensors = useSensors(useSensor(PointerSensor))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oi = products.findIndex((p) => p.id === active.id)
      const ni = products.findIndex((p) => p.id === over.id)
      setProducts(arrayMove(products, oi, ni))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#0c3d6e]">Catálogo de productos</h3>
          <p className="text-xs text-gray-400 mt-0.5">Arrastra para reordenar • Expande para editar</p>
        </div>
        <button
          type="button"
          onClick={addProduct}
          className="flex items-center gap-1.5 rounded-xl bg-[#0099d6] px-4 py-2 text-xs font-bold text-white hover:bg-[#0080b8] transition"
        >
          <Plus className="h-3.5 w-3.5" />
          Añadir producto
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={products.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {products.map((item) => (
              <SortableProductCard
                key={item.id}
                item={item}
                onUpdate={(d) => updateProduct(item.id, d)}
                onDelete={() => deleteProduct(item.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
