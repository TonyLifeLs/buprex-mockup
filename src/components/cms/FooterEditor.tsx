"use client"

import { useCMSStore } from "@/store/cms"
import { Youtube, Facebook, Instagram, Globe, Palette } from "lucide-react"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}

export function FooterEditor() {
  const { footer, updateFooter } = useCMSStore()

  return (
    <div className="space-y-8">
      {/* Preview */}
      <div
        className="rounded-2xl overflow-hidden shadow-md"
        style={{ backgroundColor: footer.bgColor }}
      >
        <div className="px-6 py-3 border-b border-white/10" style={{ backgroundColor: `${footer.bgColor}CC` }}>
          <p className="text-center text-xs font-semibold uppercase text-white/90 tracking-wide truncate">
            {footer.disclaimer}
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 py-4">
          {[footer.youtube, footer.facebook, footer.instagram].map((url, i) => (
            <div key={i} className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
              {i === 0 && <Youtube className="h-4 w-4 text-white" />}
              {i === 1 && <Facebook className="h-4 w-4 text-white" />}
              {i === 2 && <Instagram className="h-4 w-4 text-white" />}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-white/40 pb-3 px-6 truncate">{footer.website}</p>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Color */}
        <div className="sm:col-span-2 rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Palette className="h-4 w-4 text-[#0099d6]" />
            Color de fondo del footer
          </div>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={footer.bgColor}
              onChange={(e) => updateFooter({ bgColor: e.target.value })}
              className="h-12 w-12 cursor-pointer rounded-xl border-0 bg-transparent p-0"
            />
            <input
              type="text"
              value={footer.bgColor}
              onChange={(e) => updateFooter({ bgColor: e.target.value })}
              className="w-36 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono outline-none focus:border-[#0099d6] focus:ring-2 focus:ring-[#0099d6]/20"
            />

            <div className="flex gap-2 flex-wrap">
              {["#0c3d6e", "#0099d6", "#1e293b", "#be123c", "#047857", "#7c3aed"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => updateFooter({ bgColor: c })}
                  className={`h-7 w-7 rounded-lg border-2 transition hover:scale-110 ${footer.bgColor === c ? "border-[#0099d6] scale-110" : "border-transparent"}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Website */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Globe className="h-4 w-4 text-[#0099d6]" />
            Sitio web
          </div>
          <Field label="URL">
            <input
              value={footer.website}
              onChange={(e) => updateFooter({ website: e.target.value })}
              placeholder="https://www.life.com.ec"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:ring-2 focus:ring-[#0099d6]/20"
            />
          </Field>
        </div>

        {/* Social links */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3">
          <p className="text-sm font-semibold text-gray-700">Redes sociales</p>
          <Field label="YouTube">
            <input
              value={footer.youtube}
              onChange={(e) => updateFooter({ youtube: e.target.value })}
              placeholder="https://youtube.com/@buprex"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:ring-2 focus:ring-[#0099d6]/20"
            />
          </Field>
          <Field label="Facebook">
            <input
              value={footer.facebook}
              onChange={(e) => updateFooter({ facebook: e.target.value })}
              placeholder="https://facebook.com/buprex"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:ring-2 focus:ring-[#0099d6]/20"
            />
          </Field>
          <Field label="Instagram">
            <input
              value={footer.instagram}
              onChange={(e) => updateFooter({ instagram: e.target.value })}
              placeholder="https://instagram.com/buprex"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:ring-2 focus:ring-[#0099d6]/20"
            />
          </Field>
        </div>

        {/* Disclaimer */}
        <div className="sm:col-span-2 rounded-2xl border border-gray-200 bg-white p-5 space-y-3">
          <p className="text-sm font-semibold text-gray-700">Textos legales</p>
          <Field label="Disclaimer (barra superior)">
            <textarea
              value={footer.disclaimer}
              onChange={(e) => updateFooter({ disclaimer: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:ring-2 focus:ring-[#0099d6]/20 resize-none"
            />
          </Field>
          <Field label="Información de registro sanitario">
            <textarea
              value={footer.registrationInfo}
              onChange={(e) => updateFooter({ registrationInfo: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0099d6] focus:ring-2 focus:ring-[#0099d6]/20 resize-none"
            />
          </Field>
        </div>
      </div>
    </div>
  )
}
