"use client"

import { Youtube, Facebook, Instagram } from "lucide-react"
import { useCMSStore } from "@/store/cms"

export function Footer() {
  const footer = useCMSStore((s) => s.footer)
  const navbar = useCMSStore((s) => s.navbar)

  return (
    <footer id="contacto" style={{ backgroundColor: footer.bgColor || "#041538" }} className="relative overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(77,166,255,0.22),transparent_58%)]" />

      <div className="border-b border-white/10 bg-black/18 px-6 py-4">
        <p className="mx-auto max-w-5xl text-center text-xs font-medium uppercase tracking-[0.12em] text-white/90">
          {footer.disclaimer}
        </p>
      </div>

      <div className="buprex-container relative py-14">
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-[0_26px_70px_rgba(0,0,0,0.18)] backdrop-blur-md lg:grid-cols-[minmax(0,1.2fr)_auto] lg:items-center">
          <div>
            <div className="flex flex-col gap-2">
              <span className="font-[var(--font-heading)] text-4xl font-semibold tracking-tight text-white">
                BUPREX
                <sup className="text-sm">&#174;</sup>
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/62">
                Ibuprofeno
              </span>
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/72">
              Plataforma informativa con navegación clara, módulos funcionales intactos y una identidad visual más sobria para un entorno de salud confiable.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {navbar.links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="rounded-full border border-white/14 bg-white/8 px-4 py-2 text-sm font-medium text-white/82 transition-colors hover:bg-white hover:text-[#082f73]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end">
            <a
              href={`https://${footer.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              {footer.website}
            </a>

            <div className="flex items-center gap-4">
              {footer.youtube && (
                <a
                  href={footer.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/24 bg-white/8 transition-all hover:bg-white hover:text-slate-900"
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/24 bg-white/8 transition-all hover:bg-white hover:text-slate-900"
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/24 bg-white/8 transition-all hover:bg-white hover:text-slate-900"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>

            <p className="max-w-md text-left text-[10px] leading-6 text-white/42 lg:text-right">
              {footer.registrationInfo}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
