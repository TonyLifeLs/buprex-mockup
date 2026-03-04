"use client"

import { useCMSStore } from "@/store/cms"
import type { MalestarItem } from "@/store/cms"
import { ImageUpload } from "@/components/cms/ImageUpload"

function MalestarRow({
  item,
  onUpdate,
}: {
  item: MalestarItem
  onUpdate: (d: Partial<MalestarItem>) => void
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Nombre del personaje</label>
            <input
              value={item.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="Fiebrin"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-bold outline-none focus:border-[#0099d6] focus:bg-white focus:ring-2 focus:ring-[#0099d6]/20"
            />
          </div>
          <ImageUpload label="Imagen del personaje" value={item.image} onChange={(v) => onUpdate({ image: v })} previewHeight={80} previewWidth={80} />
          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Descripción</label>
            <textarea
              value={item.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Representa la fiebre..."
              rows={2}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:bg-white focus:ring-2 focus:ring-[#0099d6]/20 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function MalestarsEditor() {
  const { malestars, updateMalestars, updateMalestarItem } = useCMSStore()

  return (
    <div className="space-y-8">
      {/* Section text */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
        <h3 className="text-base font-bold text-[#0c3d6e]">Texto de la sección</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Tagline principal
            </label>
            <textarea
              value={malestars.tagline}
              onChange={(e) => updateMalestars({ tagline: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:bg-white focus:ring-2 focus:ring-[#0099d6]/20 resize-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Subtítulo
            </label>
            <textarea
              value={malestars.subtitle}
              onChange={(e) => updateMalestars({ subtitle: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:bg-white focus:ring-2 focus:ring-[#0099d6]/20 resize-none"
            />
          </div>
          <ImageUpload label="Logo Malestars" value={malestars.logoImage} onChange={(v) => updateMalestars({ logoImage: v })} previewHeight={64} previewWidth={160} />
        </div>
      </div>

      {/* Characters */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#0c3d6e]">Personajes (Malestars)</h3>
        <div className="space-y-3">
          {malestars.items.map((item) => (
            <MalestarRow
              key={item.id}
              item={item}
              onUpdate={(d) => updateMalestarItem(item.id, d)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
