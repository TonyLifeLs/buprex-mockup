"use client"

import { useLaboSuisseStore, DEFAULT_LS_COLORS } from "@/store/labosuisse"

// ─── Primitives ───────────────────────────────────────────────────────────────

function ColorRow({
  label,
  hint,
  value,
  onChange,
}: {
  label: string
  hint?: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-shrink-0">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-10 cursor-pointer rounded-lg border border-gray-200 p-0.5 shadow-sm"
          title={label}
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const v = e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value
          if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v)
        }}
        maxLength={7}
        className="w-28 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono uppercase outline-none focus:border-[#B52A2D] focus:bg-white focus:ring-2 focus:ring-[#B52A2D]/20"
      />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        {hint && <p className="text-xs text-gray-400 truncate">{hint}</p>}
      </div>
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

export function LSColoresEditor() {
  const { colors, updateColors } = useLaboSuisseStore()

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
            Colores
          </div>
        </div>
        <p className="text-[13px] text-white/75">Paleta de colores del sitio — acento primario, líneas de producto y neutros.</p>
      </div>

      {/* Acento primario */}
      <Section title="Color de acento primario" description="Botones, hover de enlaces, encabezados del footer.">
        <ColorRow
          label="Acento principal"
          hint="--ls-red-700 · botones principales, hover"
          value={colors.lsRed700}
          onChange={(v) => updateColors({ lsRed700: v })}
        />
        <ColorRow
          label="Acento medio"
          hint="--ls-red-600 · sub-encabezados footer, íconos sociales"
          value={colors.lsRed600}
          onChange={(v) => updateColors({ lsRed600: v })}
        />
        <ColorRow
          label="Acento oscuro"
          hint="--ls-red-800 · hover en botones link"
          value={colors.lsRed800}
          onChange={(v) => updateColors({ lsRed800: v })}
        />
        <div className="mt-2 flex flex-wrap gap-3 rounded-xl bg-gray-50 p-4 border border-gray-100">
          <span className="text-xs text-gray-400 w-full mb-1 font-semibold uppercase tracking-wider">Vista previa</span>
          <span className="inline-flex items-center rounded px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: colors.lsRed700 }}>Botón primario</span>
          <span className="inline-flex items-center rounded border px-3 py-1 text-xs font-bold" style={{ borderColor: colors.lsRed700, color: colors.lsRed700 }}>Hover enlace</span>
          <span className="inline-flex items-center rounded px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: colors.lsRed600 }}>Footer heading</span>
        </div>
      </Section>

      {/* Colores de línea */}
      <Section title="Colores de línea (categorías)" description="Fondos de badges, tarjetas de categoría y bloques destacados.">
        <ColorRow label="Crescina" hint="--brand-crescina · Cuidado Capilar" value={colors.brandCrescina} onChange={(v) => updateColors({ brandCrescina: v })} />
        <ColorRow label="Fillerina 12SP" hint="--brand-fillerina-12sp · Cuidado de la Piel" value={colors.brandFillerina12sp} onChange={(v) => updateColors({ brandFillerina12sp: v })} />
        <ColorRow label="Fillerina Color" hint="--brand-fillerina-color · Sección Marcas" value={colors.brandFillerinaColor} onChange={(v) => updateColors({ brandFillerinaColor: v })} />
        <ColorRow label="Transdermic" hint="--brand-transdermic · Descubre Labo" value={colors.brandTransdermic} onChange={(v) => updateColors({ brandTransdermic: v })} />
        <ColorRow label="Oxytreat" hint="--brand-oxytreat · Tecnología Transdérmica" value={colors.brandOxytreat} onChange={(v) => updateColors({ brandOxytreat: v })} />
        <ColorRow label="Caducreex" hint="--brand-caducreex" value={colors.brandCaduCrex} onChange={(v) => updateColors({ brandCaduCrex: v })} />
        <ColorRow label="Rinfoltina" hint="--brand-rinfoltina" value={colors.brandRinfoltina} onChange={(v) => updateColors({ brandRinfoltina: v })} />
        <div className="flex gap-2 flex-wrap">
          {[
            { label: "Crescina", color: colors.brandCrescina },
            { label: "Fillerina", color: colors.brandFillerina12sp },
            { label: "Fil.Color", color: colors.brandFillerinaColor },
            { label: "Transdermic", color: colors.brandTransdermic },
            { label: "Oxytreat", color: colors.brandOxytreat },
          ].map(({ label, color }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="h-10 w-10 rounded-lg border border-gray-200 shadow-sm" style={{ backgroundColor: color }} />
              <span className="text-[10px] text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Paleta de grises */}
      <Section title="Paleta de grises" description="Texto, bordes e iconos del sitio.">
        <ColorRow label="Gris 900 — texto principal" hint="--ls-gray-900" value={colors.lsGray900} onChange={(v) => updateColors({ lsGray900: v })} />
        <ColorRow label="Gris 700 — texto secundario" hint="--ls-gray-700" value={colors.lsGray700} onChange={(v) => updateColors({ lsGray700: v })} />
        <ColorRow label="Gris 500 — placeholder / iconos" hint="--ls-gray-500" value={colors.lsGray500} onChange={(v) => updateColors({ lsGray500: v })} />
        <ColorRow label="Gris 300 — bordes" hint="--ls-gray-300" value={colors.lsGray300} onChange={(v) => updateColors({ lsGray300: v })} />
        <ColorRow label="Gris 100 — fondos suaves" hint="--ls-gray-100" value={colors.lsGray100} onChange={(v) => updateColors({ lsGray100: v })} />
      </Section>

      {/* Footer bg */}
      <Section title="Fondo del footer" description="Color de fondo del pie de página oscuro.">
        <ColorRow label="Fondo del footer" hint="--ls-footer-bg" value={colors.footerBg} onChange={(v) => updateColors({ footerBg: v })} />
        <div className="mt-2 rounded-xl overflow-hidden border border-gray-100" style={{ backgroundColor: colors.footerBg }}>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">LABO SUISSE</span>
            <span className="text-[10px] text-white/40">vista previa</span>
          </div>
        </div>
      </Section>

      <p className="text-center text-xs text-gray-400 pb-4">Los cambios se guardan automáticamente.</p>
    </div>
  )
}
