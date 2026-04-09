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
import { useVitacapStore } from "@/store/vitacap"
import type { VitacapProfile, VitacapStep } from "@/store/vitacap"

// ─── Primitives ───────────────────────────────────────────────────────────────

function Inp({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#C3311D] focus:ring-2 focus:ring-[#C3311D]/20 resize-none" />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#C3311D] focus:ring-2 focus:ring-[#C3311D]/20" />
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

// ─── Sortable Profile Row ────────────────────────────────────────────────────

function SortableProfileRow({ item, onUpdate, onDelete }: { item: VitacapProfile; onUpdate: (p: Partial<VitacapProfile>) => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })
  return (
    <div ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
      className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <button {...attributes} {...listeners} type="button"
        className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none mt-1">
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex-1 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <input value={item.icon} onChange={(e) => onUpdate({ icon: e.target.value })} placeholder="🏆"
          className="w-16 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-lg outline-none focus:border-[#C3311D]" />
        <input value={item.label} onChange={(e) => onUpdate({ label: e.target.value })} placeholder="Perfil"
          className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold outline-none focus:border-[#C3311D] focus:ring-2 focus:ring-[#C3311D]/20" />
        <input value={item.desc} onChange={(e) => onUpdate({ desc: e.target.value })} placeholder="Descripción"
          className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#C3311D] focus:ring-2 focus:ring-[#C3311D]/20 sm:col-span-3" />
      </div>
      <button type="button" onClick={onDelete}
        className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

// ─── Sortable Step Row ───────────────────────────────────────────────────────

function SortableStepRow({ item, onUpdate, onDelete }: { item: VitacapStep; onUpdate: (p: Partial<VitacapStep>) => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })
  return (
    <div ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <button {...attributes} {...listeners} type="button"
          className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing touch-none mt-1">
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <input value={item.step} onChange={(e) => onUpdate({ step: e.target.value })} placeholder="01"
              className="w-14 rounded-lg border border-gray-200 bg-gray-50 px-2 py-2 text-sm font-mono text-center outline-none focus:border-[#C3311D]" />
            <input type="color" value={item.accent} onChange={(e) => onUpdate({ accent: e.target.value })}
              className="h-9 w-9 flex-shrink-0 cursor-pointer rounded-lg border border-gray-200 p-0.5" />
          </div>
          <input value={item.title} onChange={(e) => onUpdate({ title: e.target.value })} placeholder="Título del paso"
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold outline-none focus:border-[#C3311D] focus:ring-2 focus:ring-[#C3311D]/20" />
          <textarea value={item.body} onChange={(e) => onUpdate({ body: e.target.value })} rows={2} placeholder="Descripción"
            className="sm:col-span-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#C3311D] focus:ring-2 focus:ring-[#C3311D]/20 resize-none" />
        </div>
        <button type="button" onClick={onDelete}
          className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// ─── Main Editor ─────────────────────────────────────────────────────────────

export function VitacapSeccionesEditor() {
  const {
    content, setContent, tokens,
    updateProfile, addProfile, deleteProfile, setProfiles,
    updateStep, addStep, deleteStep, setSteps,
  } = useVitacapStore()

  const profileSensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))
  const stepSensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function handleProfileDrag(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oi = content.profiles.findIndex((p) => p.id === active.id)
      const ni = content.profiles.findIndex((p) => p.id === over.id)
      setProfiles(arrayMove(content.profiles, oi, ni))
    }
  }

  function handleStepDrag(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oi = content.steps.findIndex((s) => s.id === active.id)
      const ni = content.steps.findIndex((s) => s.id === over.id)
      setSteps(arrayMove(content.steps, oi, ni))
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Brand header */}
      <div className="rounded-2xl p-6"
        style={{ background: `linear-gradient(135deg, ${tokens.brand900} 0%, ${tokens.brand800} 100%)` }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex flex-col leading-none select-none">
            <span className="text-[20px] font-black tracking-tight text-white">Vitacap</span>
            <span className="text-[26px] font-black leading-none" style={{ color: tokens.brandAccent }}>G</span>
          </div>
          <div className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
            style={{ backgroundColor: tokens.brandAccent, color: tokens.neutral900 }}>
            Secciones
          </div>
        </div>
        <p className="text-[13px] text-white/75">¿Qué es?, ¿Para quién?, Cómo usarlo y Destacado final.</p>
      </div>

      {/* ¿Qué es? */}
      <Section title="¿Qué es Vitacap G?">
        <Inp label="Etiqueta" value={content.queEsLabel} onChange={(v) => setContent("queEsLabel", v)} />
        <Inp label="Título" value={content.queEsTitle} onChange={(v) => setContent("queEsTitle", v)} />
        <Inp label="Descripción" value={content.queEsDesc} onChange={(v) => setContent("queEsDesc", v)} multiline />
      </Section>

      {/* ¿Para quién? */}
      <Section title="¿Para quién es?" description="Arrastra para reordenar perfiles.">
        <Inp label="Etiqueta" value={content.paraQuienLabel} onChange={(v) => setContent("paraQuienLabel", v)} />
        <Inp label="Título" value={content.paraQuienTitle} onChange={(v) => setContent("paraQuienTitle", v)} />
        <Inp label="Descripción" value={content.paraQuienDesc} onChange={(v) => setContent("paraQuienDesc", v)} multiline />

        <div className="border-t border-gray-100 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Perfiles</p>
            <button type="button" onClick={addProfile}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold text-white transition"
              style={{ backgroundColor: tokens.brand800 }}>
              <Plus className="h-3 w-3" /> Añadir
            </button>
          </div>
          <DndContext sensors={profileSensors} collisionDetection={closestCenter} onDragEnd={handleProfileDrag}>
            <SortableContext items={content.profiles.map((p) => p.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {content.profiles.map((p) => (
                  <SortableProfileRow key={p.id} item={p}
                    onUpdate={(patch) => updateProfile(p.id, patch)}
                    onDelete={() => deleteProfile(p.id)} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </Section>

      {/* Cómo usarlo */}
      <Section title="Cómo usarlo" description="Arrastra los pasos para reordenar.">
        <Inp label="Etiqueta" value={content.comoUsarloLabel} onChange={(v) => setContent("comoUsarloLabel", v)} />
        <Inp label="Título" value={content.comoUsarloTitle} onChange={(v) => setContent("comoUsarloTitle", v)} />
        <Inp label="Subtítulo" value={content.comoUsarloDesc} onChange={(v) => setContent("comoUsarloDesc", v)} />

        <div className="border-t border-gray-100 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pasos</p>
            <button type="button" onClick={addStep}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold text-white transition"
              style={{ backgroundColor: tokens.brand800 }}>
              <Plus className="h-3 w-3" /> Añadir
            </button>
          </div>
          <DndContext sensors={stepSensors} collisionDetection={closestCenter} onDragEnd={handleStepDrag}>
            <SortableContext items={content.steps.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {content.steps.map((s) => (
                  <SortableStepRow key={s.id} item={s}
                    onUpdate={(patch) => updateStep(s.id, patch)}
                    onDelete={() => deleteStep(s.id)} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </Section>

      {/* Destacado final */}
      <Section title="Destacado final">
        <Inp label="Etiqueta" value={content.highlightLabel} onChange={(v) => setContent("highlightLabel", v)} />
        <Inp label="Título" value={content.highlightTitle} onChange={(v) => setContent("highlightTitle", v)} />
        <Inp label="Descripción" value={content.highlightDesc} onChange={(v) => setContent("highlightDesc", v)} multiline />
        <Inp label="Tags (separados por coma)" value={content.highlightTags.join(", ")}
          onChange={(v) => setContent("highlightTags", v.split(",").map((t) => t.trim()).filter(Boolean))} />
        <Inp label="Nota de precaución" value={content.highlightNote} onChange={(v) => setContent("highlightNote", v)} multiline />
      </Section>
    </div>
  )
}
