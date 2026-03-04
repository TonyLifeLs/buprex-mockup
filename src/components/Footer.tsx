"use client"

import { Youtube, Facebook, Instagram } from "lucide-react"
import { useCMSStore } from "@/store/cms"

export function Footer() {
  const footer = useCMSStore((s) => s.footer)

  return (
    <footer id="contacto" style={{ backgroundColor: footer.bgColor || "#0c3d6e" }} className="text-white">
      {/* Disclaimer bar */}
      <div className="border-b border-white/10 bg-black/20 px-6 py-4">
        <p className="mx-auto max-w-5xl text-center text-xs font-semibold uppercase tracking-wide text-white/90">
          {footer.disclaimer}
        </p>
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-center gap-6">
          {/* Website */}
          <a
            href={`https://${footer.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
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
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition-all hover:scale-110 hover:shadow-lg"
                aria-label="YouTube"
                style={{ color: footer.bgColor || "#0c3d6e" }}
              >
                <Youtube className="h-5 w-5" />
              </a>
            )}
            {footer.facebook && (
              <a
                href={footer.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
                style={{ color: footer.bgColor || "#0c3d6e" }}
              >
                <Facebook className="h-5 w-5" />
              </a>
            )}
            {footer.instagram && (
              <a
                href={footer.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition-all hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
                style={{ color: footer.bgColor || "#0c3d6e" }}
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
          </div>

          {/* BUPREX Logo text */}
          <div className="flex flex-col items-center gap-1">
            <span className="font-[var(--font-heading)] text-4xl font-extrabold tracking-tight text-[#f5d030]">
              BUPREX
              <sup className="text-sm">&#174;</sup>
            </span>
            <span className="text-xs font-medium tracking-widest text-white/60">
              Ibuprofeno
            </span>
          </div>

          {/* Registration info */}
          <p className="max-w-xl text-center text-[10px] leading-relaxed text-white/30">
            {footer.registrationInfo}
          </p>
        </div>
      </div>
    </footer>
  )
}
