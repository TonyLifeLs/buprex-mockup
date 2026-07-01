"use client"

import { Youtube, Facebook, Instagram } from "lucide-react"
import { useCMSStore } from "@/store/cms"

export function Footer() {
  const footer = useCMSStore((s) => s.footer)

  return (
    <footer id="contacto" style={{ backgroundColor: footer.bgColor || "#0f172a" }} className="text-white">
      {/* Disclaimer bar */}
      <div className="border-b border-white/10 bg-black/25 px-6 py-4">
        <p className="mx-auto max-w-5xl text-center text-xs font-medium uppercase tracking-[0.12em] text-white/90">
          {footer.disclaimer}
        </p>
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Website */}
          <a
            href={`https://${footer.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white/75 transition-colors hover:text-white"
          >
            {footer.website}
          </a>

          {/* Social icons in circles */}
          <div className="flex items-center gap-4">
            {footer.youtube && (
              <a
                href={footer.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 transition-all hover:bg-white hover:text-slate-900"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            )}
            {footer.facebook && (
              <a
                href={footer.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 transition-all hover:bg-white hover:text-slate-900"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            )}
            {footer.instagram && (
              <a
                href={footer.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 transition-all hover:bg-white hover:text-slate-900"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
          </div>

          {/* BUPREX Logo text */}
          <div className="flex flex-col items-center gap-1">
            <span className="font-[var(--font-heading)] text-4xl font-semibold tracking-tight text-white">
              BUPREX
              <sup className="text-sm">&#174;</sup>
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-white/60">
              Ibuprofeno
            </span>
          </div>

          {/* Registration info */}
          <p className="max-w-xl text-center text-[10px] leading-relaxed text-white/40">
            {footer.registrationInfo}
          </p>
        </div>
      </div>
    </footer>
  )
}
