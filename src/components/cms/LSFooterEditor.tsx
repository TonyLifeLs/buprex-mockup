"use client"

import { Plus, Trash2 } from "lucide-react"
import { useLaboSuisseStore, type LSFooterLink } from "@/store/labosuisse"

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
      <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2}
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

// ─── Editor ───────────────────────────────────────────────────────────────────

export function LSFooterEditor() {
  const { footer, colors, updateFooter } = useLaboSuisseStore()

  function addLinkToColumn(ci: number) {
    const id = Date.now().toString(36)
    updateFooter({
      columns: footer.columns.map((c, j) =>
        j === ci ? { ...c, links: [...c.links, { id, label: "Enlace", href: "#" }] } : c
      ),
    })
  }

  function removeLinkFromColumn(ci: number, li: number) {
    updateFooter({
      columns: footer.columns.map((c, j) =>
        j === ci ? { ...c, links: c.links.filter((_, k) => k !== li) } : c
      ),
    })
  }

  function updateLinkInColumn(ci: number, li: number, patch: Partial<LSFooterLink>) {
    updateFooter({
      columns: footer.columns.map((c, j) =>
        j === ci ? { ...c, links: c.links.map((l, k) => (k === li ? { ...l, ...patch } : l)) } : c
      ),
    })
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
            Footer
          </div>
        </div>
        <p className="text-[13px] text-white/75">Logo, tagline, redes sociales, columnas de enlaces y copyright.</p>
      </div>

      {/* Logo + tagline */}
      <Section title="Logo y tagline">
        <div className="grid grid-cols-2 gap-3">
          <Inp label="Palabra 1" value={footer.logoWord1} onChange={(v) => updateFooter({ logoWord1: v })} />
          <Inp label="Palabra 2" value={footer.logoWord2} onChange={(v) => updateFooter({ logoWord2: v })} />
        </div>
        <Inp label="Tagline" value={footer.tagline} onChange={(v) => updateFooter({ tagline: v })} multiline />
        <Inp label="Copyright" value={footer.copyright} onChange={(v) => updateFooter({ copyright: v })} />

        {/* Live preview */}
        <div className="rounded-xl overflow-hidden border border-gray-100 px-5 py-4 flex items-center justify-between" style={{ backgroundColor: colors.footerBg }}>
          <div>
            <span className="font-bold tracking-[0.15em] uppercase text-white">{footer.logoWord1}</span>
            <span className="font-light tracking-[0.1em] uppercase text-white/70 ml-1">{footer.logoWord2}</span>
          </div>
          <span className="text-[10px] text-white/30">vista previa</span>
        </div>
      </Section>

      {/* Social */}
      <Section title="Redes sociales">
        <div className="grid grid-cols-3 gap-3">
          <Inp label="Instagram" value={footer.instagram} onChange={(v) => updateFooter({ instagram: v })} />
          <Inp label="Facebook" value={footer.facebook} onChange={(v) => updateFooter({ facebook: v })} />
          <Inp label="LinkedIn" value={footer.linkedin} onChange={(v) => updateFooter({ linkedin: v })} />
        </div>
      </Section>

      {/* Footer columns */}
      {footer.columns.map((col, ci) => (
        <Section key={col.id} title={`Columna: ${col.title || `Columna ${ci + 1}`}`}>
          <Inp label="Título de la columna" value={col.title}
            onChange={(v) => updateFooter({ columns: footer.columns.map((c, j) => j === ci ? { ...c, title: v } : c) })} />
          <div className="space-y-2">
            {col.links.map((link, li) => (
              <div key={link.id} className="flex gap-2 items-center">
                <input value={link.label} placeholder="Etiqueta"
                  onChange={(e) => updateLinkInColumn(ci, li, { label: e.target.value })}
                  className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white" />
                <input value={link.href} placeholder="#href"
                  onChange={(e) => updateLinkInColumn(ci, li, { href: e.target.value })}
                  className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#B52A2D] focus:bg-white" />
                <button type="button" onClick={() => removeLinkFromColumn(ci, li)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addLinkToColumn(ci)}
            className="flex items-center gap-2 text-sm text-[#B52A2D] font-semibold hover:underline">
            <Plus className="h-3.5 w-3.5" /> Agregar enlace
          </button>
        </Section>
      ))}

      <p className="text-center text-xs text-gray-400 pb-4">Los cambios se guardan automáticamente.</p>
    </div>
  )
}
