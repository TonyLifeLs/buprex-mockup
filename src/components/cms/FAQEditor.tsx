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
import { useCMSStore } from "@/store/cms"
import type { FAQItem } from "@/store/cms"

function SortableFAQRow({
  item,
  onUpdate,
  onDelete,
}: {
  item: FAQItem
  onUpdate: (d: Partial<FAQItem>) => void
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
          className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none mt-2"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <div className="flex-1 space-y-2">
          <input
            value={item.question}
            onChange={(e) => onUpdate({ question: e.target.value })}
            placeholder="¿Pregunta frecuente?"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-800 outline-none focus:border-[#0099d6] focus:bg-white focus:ring-2 focus:ring-[#0099d6]/20"
          />
          <textarea
            value={item.answer}
            onChange={(e) => onUpdate({ answer: e.target.value })}
            placeholder="Respuesta detallada..."
            rows={3}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#0099d6] focus:bg-white focus:ring-2 focus:ring-[#0099d6]/20 resize-none"
          />
        </div>

        <button
          type="button"
          onClick={onDelete}
          className="mt-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function FAQEditor() {
  const { faqs, setFAQs, updateFAQ, addFAQ, deleteFAQ } = useCMSStore()
  const sensors = useSensors(useSensor(PointerSensor))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oi = faqs.findIndex((f) => f.id === active.id)
      const ni = faqs.findIndex((f) => f.id === over.id)
      setFAQs(arrayMove(faqs, oi, ni))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#0c3d6e]">Preguntas frecuentes</h3>
          <p className="text-xs text-gray-400 mt-0.5">Arrastra para reordenar • Edita la pregunta y respuesta</p>
        </div>
        <button
          type="button"
          onClick={addFAQ}
          className="flex items-center gap-1.5 rounded-xl bg-[#0099d6] px-4 py-2 text-xs font-bold text-white hover:bg-[#0080b8] transition"
        >
          <Plus className="h-3.5 w-3.5" />
          Añadir pregunta
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={faqs.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {faqs.map((item) => (
              <SortableFAQRow
                key={item.id}
                item={item}
                onUpdate={(d) => updateFAQ(item.id, d)}
                onDelete={() => deleteFAQ(item.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
