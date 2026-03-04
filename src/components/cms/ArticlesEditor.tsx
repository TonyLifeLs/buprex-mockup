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
import type { ArticleItem } from "@/store/cms"
import { ImageUpload } from "@/components/cms/ImageUpload"

function SortableArticleCard({
  item,
  onUpdate,
  onDelete,
}: {
  item: ArticleItem
  onUpdate: (d: Partial<ArticleItem>) => void
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
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <button
          {...attributes}
          {...listeners}
          type="button"
          className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <div className="h-8 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
          {item.image && (
            <Image src={item.image} alt="" width={48} height={32} className="h-full w-full object-cover" unoptimized />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">{item.title}</p>
          <p className="text-xs text-gray-400">{item.category}</p>
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
          {[
            { label: "Título", key: "title" as const },
            { label: "Subtítulo", key: "subtitle" as const },
            { label: "Categoría", key: "category" as const },
          ].map(({ label, key }) => (
            <div key={key} className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</label>
              <input
                value={item[key]}
                onChange={(e) => onUpdate({ [key]: e.target.value })}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:ring-2 focus:ring-[#0099d6]/20"
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <ImageUpload label="Imagen del artículo" value={item.image} onChange={(v) => onUpdate({ image: v })} previewHeight={80} previewWidth={120} />
          </div>

          {[
            { label: "Introducción", key: "intro" as const },
            { label: "Causas (una por línea)", key: "causes" as const },
            { label: "Soluciones (una por línea)", key: "solutions" as const },
            { label: "Consejo Buprex (tip)", key: "tip" as const },
          ].map(({ label, key }) => (
            <div key={key} className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</label>
              <textarea
                value={item[key]}
                onChange={(e) => onUpdate({ [key]: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:ring-2 focus:ring-[#0099d6]/20 resize-none"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function ArticlesEditor() {
  const { articles, setArticles, updateArticle, addArticle, deleteArticle } = useCMSStore()
  const sensors = useSensors(useSensor(PointerSensor))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oi = articles.findIndex((a) => a.id === active.id)
      const ni = articles.findIndex((a) => a.id === over.id)
      setArticles(arrayMove(articles, oi, ni))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#0c3d6e]">Artículos del blog</h3>
          <p className="text-xs text-gray-400 mt-0.5">Arrastra para reordenar • Las causas y soluciones van una por línea</p>
        </div>
        <button
          type="button"
          onClick={addArticle}
          className="flex items-center gap-1.5 rounded-xl bg-[#0099d6] px-4 py-2 text-xs font-bold text-white hover:bg-[#0080b8] transition"
        >
          <Plus className="h-3.5 w-3.5" />
          Añadir artículo
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={articles.map((a) => a.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {articles.map((item) => (
              <SortableArticleCard
                key={item.id}
                item={item}
                onUpdate={(d) => updateArticle(item.id, d)}
                onDelete={() => deleteArticle(item.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
