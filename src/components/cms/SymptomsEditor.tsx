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
import { GripVertical, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useCMSStore } from "@/store/cms"
import type { SymptomItem } from "@/store/cms"
import { ImageUpload } from "@/components/cms/ImageUpload"

function SortableSymptomRow({
  item,
  onUpdate,
  onDelete,
}: {
  item: SymptomItem
  onUpdate: (d: Partial<SymptomItem>) => void
  onDelete: () => void
}) {
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
      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <button
          {...attributes}
          {...listeners}
          type="button"
          className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none mt-1"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        {/* Color swatch */}
        <input
          type="color"
          value={item.accentColor}
          onChange={(e) => onUpdate({ accentColor: e.target.value })}
          className="mt-1 h-8 w-8 flex-shrink-0 cursor-pointer rounded-lg border-0 p-0"
          title="Color de acento"
        />

        <div className="flex-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <input
            value={item.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Título"
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold outline-none focus:border-[#0099d6] focus:bg-white focus:ring-2 focus:ring-[#0099d6]/20"
          />
          <ImageUpload value={item.image} onChange={(v) => onUpdate({ image: v })} previewHeight={48} previewWidth={48} />
          <textarea
            value={item.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Descripción del síntoma"
            rows={2}
            className="sm:col-span-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:bg-white focus:ring-2 focus:ring-[#0099d6]/20 resize-none"
          />
        </div>

        {/* Preview */}
        <div
          className="hidden sm:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 overflow-hidden"
          style={{ borderColor: item.accentColor, backgroundColor: `${item.accentColor}20` }}
        >
          <Image src={item.image} alt="" width={32} height={32} className="object-contain" unoptimized />
        </div>

        <button
          type="button"
          onClick={onDelete}
          className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function SymptomsEditor() {
  const { symptoms, setSymptoms, updateSymptom, addSymptom, deleteSymptom } = useCMSStore()
  const sensors = useSensors(useSensor(PointerSensor))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oi = symptoms.findIndex((s) => s.id === active.id)
      const ni = symptoms.findIndex((s) => s.id === over.id)
      setSymptoms(arrayMove(symptoms, oi, ni))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#0c3d6e]">Síntomas / Condiciones</h3>
          <p className="text-xs text-gray-400 mt-0.5">Arrastra para reordenar • Edita texto, imagen y color</p>
        </div>
        <button
          type="button"
          onClick={addSymptom}
          className="flex items-center gap-1.5 rounded-xl bg-[#0099d6] px-4 py-2 text-xs font-bold text-white hover:bg-[#0080b8] transition"
        >
          <Plus className="h-3.5 w-3.5" />
          Añadir
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={symptoms.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {symptoms.map((item) => (
              <SortableSymptomRow
                key={item.id}
                item={item}
                onUpdate={(d) => updateSymptom(item.id, d)}
                onDelete={() => deleteSymptom(item.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
