"use client"

import { Instagram, Facebook, Linkedin } from "lucide-react"
import { useLaboSuisseStore } from "@/store/labosuisse"

export function LaboFooter() {
  const { footer } = useLaboSuisseStore()

  const copyright = footer.copyright.replace("{year}", String(new Date().getFullYear()))

  return (
    <footer style={{ backgroundColor: "var(--ls-footer-bg, #212121)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="ls-container pt-16 pb-10">
        {/* Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand col — spans 2 */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-1">
              <span className="text-lg font-bold tracking-[0.15em] uppercase" style={{ color: "var(--ls-white, #fff)" }}>
                {footer.logoWord1}
              </span>
              <span className="text-base font-light tracking-[0.1em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
                {footer.logoWord2}
              </span>
            </div>
            <p className="ls-p-sm mb-6 max-w-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              {footer.tagline}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {[
                { Icon: Instagram, label: "Instagram", href: footer.instagram },
                { Icon: Facebook, label: "Facebook", href: footer.facebook },
                { Icon: Linkedin, label: "LinkedIn", href: footer.linkedin },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center border transition-all"
                  style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = "var(--ls-red-600)"
                    el.style.color = "var(--ls-red-600)"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = "rgba(255,255,255,0.12)"
                    el.style.color = "rgba(255,255,255,0.4)"
                  }}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic columns */}
          {footer.columns.map((col) => (
            <div key={col.id}>
              <h4
                className="mb-5 text-[11px] font-bold tracking-[0.25em] uppercase"
                style={{ color: "var(--ls-red-600)" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="ls-p-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)" }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="ls-p-sm" style={{ color: "rgba(255,255,255,0.2)" }}>
            {copyright}
          </p>
          <div className="flex items-center gap-6">
            {footer.bottomLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="ls-p-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.2)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.2)" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
