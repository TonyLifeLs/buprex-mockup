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
import { useLaboSuisseStore, type LSNewsItem, type LSFAQItem } from "@/store/labosuisse"
import { ImageUpload } from "@/components/cms/ImageUpload"

// ─── Primitives ───────────────────────────────────────────────────────────────

function Inp({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20 resize-y" />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20" />
      )}
    </div>
  )
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        {description && <p className="mt-0.5 text-xs text-gray-500">{description}</p>}
      </div>
      <div className="px-5 py-5 space-y-4">{children}</div>
    </div>
  )
}

// ─── Sortable News Row ───────────────────────────────────────────────────────

function SortableNewsRow({
  item,
  onUpdate,
  onDelete,
}: {
  item: LSNewsItem
  onUpdate: (patch: Partial<LSNewsItem>) => void
  onDelete: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id })

  return (
    <div ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-2">
      <div className="flex items-start gap-2">
        <button {...attributes} {...listeners} type="button"
          className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none mt-1">
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Inp label="Título" value={item.title} onChange={(v) => onUpdate({ title: v })} />
          <Inp label="Categoría" value={item.category} onChange={(v) => onUpdate({ category: v })} />
          <Inp label="Fecha" value={item.date} onChange={(v) => onUpdate({ date: v })} />
          <Inp label="Enlace (href)" value={item.href} onChange={(v) => onUpdate({ href: v })} />
          <div className="sm:col-span-2">
            <Inp label="Extracto" value={item.excerpt} onChange={(v) => onUpdate({ excerpt: v })} multiline />
          </div>
          <div className="sm:col-span-2">
            <ImageUpload label="Imagen" value={item.image} onChange={(v) => onUpdate({ image: v })}
              previewHeight={60} previewWidth={100} />
          </div>
        </div>
        <button type="button" onClick={onDelete}
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// ─── Sortable FAQ Row ────────────────────────────────────────────────────────

function SortableFAQRow({
  item,
  onUpdate,
  onDelete,
}: {
  item: LSFAQItem
  onUpdate: (patch: Partial<LSFAQItem>) => void
  onDelete: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id })

  return (
    <div ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-2">
      <div className="flex items-start gap-2">
        <button {...attributes} {...listeners} type="button"
          className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none mt-1">
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex-1 space-y-2">
          <Inp label="Pregunta" value={item.question} onChange={(v) => onUpdate({ question: v })} />
          <Inp label="Respuesta" value={item.answer} onChange={(v) => onUpdate({ answer: v })} multiline />
        </div>
        <button type="button" onClick={onDelete}
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// ─── Editor ───────────────────────────────────────────────────────────────────

export function LSNoticiasFAQEditor() {
  const { news, faq, newsletter, updateNews, updateFAQ, updateNewsletter } = useLaboSuisseStore()
  const newsSensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))
  const faqSensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function addNews() {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
    updateNews({ items: [...news.items, { id, date: "", category: "", title: "Nueva noticia", excerpt: "", image: "", href: "#" }] })
  }

  function addFAQ() {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
    updateFAQ({ items: [...faq.items, { id, question: "Nueva pregunta", answer: "" }] })
  }

  function handleNewsDrag(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oi = news.items.findIndex((n) => n.id === active.id)
      const ni = news.items.findIndex((n) => n.id === over.id)
      updateNews({ items: arrayMove(news.items, oi, ni) })
    }
  }

  function handleFAQDrag(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oi = faq.items.findIndex((f) => f.id === active.id)
      const ni = faq.items.findIndex((f) => f.id === over.id)
      updateFAQ({ items: arrayMove(faq.items, oi, ni) })
    }
  }

  const newsletterFields = [
    "superlabel", "title", "tagline", "description", "namePlaceholder",
    "emailPlaceholder", "ctaLabel", "consentText", "successTitle", "successDescription",
  ] as const
  const multilineFields = ["description", "consentText"]

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
            Noticias & FAQ
          </div>
        </div>
        <p className="text-[13px] text-white/75">Artículos, preguntas frecuentes y newsletter — arrastra para reordenar.</p>
      </div>

      {/* Noticias */}
      <Section title="Noticias" description="Carrusel de noticias y artículos — arrastra para reordenar.">
        <Inp label="Superlabel" value={news.superlabel} onChange={(v) => updateNews({ superlabel: v })} />
        <Inp label="Título de la sección" value={news.sectionTitle} onChange={(v) => updateNews({ sectionTitle: v })} />
        <div className="border-t border-gray-100 pt-4 space-y-3">
          <DndContext sensors={newsSensors} collisionDetection={closestCenter} onDragEnd={handleNewsDrag}>
            <SortableContext items={news.items.map((n) => n.id)} strategy={verticalListSortingStrategy}>
              {news.items.map((item) => (
                <SortableNewsRow
                  key={item.id}
                  item={item}
                  onUpdate={(patch) => updateNews({ items: news.items.map((n) => n.id === item.id ? { ...n, ...patch } : n) })}
                  onDelete={() => updateNews({ items: news.items.filter((n) => n.id !== item.id) })}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <button type="button" onClick={addNews}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-500 transition hover:border-[#B52A2D] hover:bg-red-50 hover:text-[#B52A2D]">
          <Plus className="h-4 w-4" /> Agregar noticia
        </button>
      </Section>

      {/* FAQ */}
      <Section title="FAQ" description="Preguntas frecuentes del acordeón — arrastra para reordenar.">
        <Inp label="Superlabel" value={faq.superlabel} onChange={(v) => updateFAQ({ superlabel: v })} />
        <Inp label="Título de la sección" value={faq.sectionTitle} onChange={(v) => updateFAQ({ sectionTitle: v })} />
        <div className="border-t border-gray-100 pt-4 space-y-3">
          <DndContext sensors={faqSensors} collisionDetection={closestCenter} onDragEnd={handleFAQDrag}>
            <SortableContext items={faq.items.map((f) => f.id)} strategy={verticalListSortingStrategy}>
              {faq.items.map((item) => (
                <SortableFAQRow
                  key={item.id}
                  item={item}
                  onUpdate={(patch) => updateFAQ({ items: faq.items.map((f) => f.id === item.id ? { ...f, ...patch } : f) })}
                  onDelete={() => updateFAQ({ items: faq.items.filter((f) => f.id !== item.id) })}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <button type="button" onClick={addFAQ}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-500 transition hover:border-[#B52A2D] hover:bg-red-50 hover:text-[#B52A2D]">
          <Plus className="h-4 w-4" /> Agregar pregunta
        </button>
      </Section>

      {/* Newsletter */}
      <Section title="Newsletter — Labo Club" description="Textos del formulario de suscripción.">
        {newsletterFields.map((field) => (
          <Inp key={field} label={field} value={String(newsletter[field])}
            onChange={(v) => updateNewsletter({ [field]: v })}
            multiline={multilineFields.includes(field)} />
        ))}
      </Section>

      <p className="text-center text-xs text-gray-400 pb-4">Los cambios se guardan automáticamente.</p>
    </div>
  )
}
