"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Search, Instagram, Facebook, Linkedin } from "lucide-react"
import { useLaboSuisseStore } from "@/store/labosuisse"

export function LaboHeader() {
  const { navbar, navLinks } = useLaboSuisseStore()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
  }, [searchOpen])

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: "rgba(255,255,255,0.97)",
        borderBottom: scrolled ? "1px solid var(--ls-gray-300)" : "1px solid transparent",
        backdropFilter: "blur(12px)",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="ls-container">
        <nav
          className="flex items-center justify-between transition-all duration-300"
          role="navigation"
          aria-label="Navegación principal"
          style={{ height: scrolled ? "56px" : "72px" }}
        >
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-1 shrink-0" aria-label="Labo Suisse inicio">
            <span
              className="font-bold tracking-[0.15em] uppercase transition-all"
              style={{ fontSize: scrolled ? "15px" : "18px", color: navbar.logoWord1Color }}
            >
              {navbar.logoWord1}
            </span>
            <span
              className="font-light tracking-[0.1em] uppercase transition-all"
              style={{ fontSize: scrolled ? "13px" : "16px", color: navbar.logoWord2Color }}
            >
              {navbar.logoWord2}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0 md:flex" role="list">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  className="ls-p-sm block px-3 py-2 font-medium tracking-wide relative group"
                  style={{ color: "var(--ls-gray-900)", textDecoration: "none" }}
                >
                  {l.label}
                  <span
                    className="absolute bottom-0 left-3 right-3 block h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                    style={{ backgroundColor: "var(--ls-black, #000)" }}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Expandable Search */}
            <div
              className="flex items-center transition-all duration-300 overflow-hidden"
              style={{
                width: searchOpen ? "220px" : "36px",
                border: searchOpen ? "1px solid var(--ls-gray-300)" : "none",
                backgroundColor: searchOpen ? "var(--ls-white, #fff)" : "transparent",
              }}
              role="search"
              aria-label="Buscar en el sitio"
            >
              <button
                onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setSearchQuery("") }}
                aria-label={searchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
                aria-expanded={searchOpen}
                className="flex h-9 w-9 shrink-0 items-center justify-center transition-colors"
                style={{ color: "var(--ls-gray-700)" }}
              >
                {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-[18px] w-[18px]" />}
              </button>
              {searchOpen && (
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar…"
                  aria-label="Campo de búsqueda"
                  className="flex-1 outline-none bg-transparent pr-3"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--ls-gray-900)" }}
                />
              )}
            </div>

            {/* Social — desktop only */}
            <div className="hidden items-center gap-1 md:flex">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center border border-transparent transition-all"
                  style={{ color: "var(--ls-gray-500)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.color = "var(--ls-red-700)"
                    el.style.borderColor = "var(--ls-gray-300)"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.color = "var(--ls-gray-500)"
                    el.style.borderColor = "transparent"
                  }}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <a
              href={navbar.ctaHref}
              className="ls-btn ls-btn-primary hidden md:inline-flex"
              style={{ padding: "8px 20px", fontSize: "12px" }}
            >
              {navbar.ctaLabel}
            </a>

            {/* Burger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center md:hidden"
              style={{ color: "var(--ls-gray-900)" }}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile panel */}
      <div
        className="overflow-hidden transition-all duration-300 md:hidden"
        style={{
          maxHeight: open ? "520px" : "0",
          borderTop: open ? "1px solid var(--ls-gray-300)" : "none",
        }}
        aria-hidden={!open}
      >
        <div className="ls-container py-4 flex flex-col gap-1">
          <div
            className="flex items-center border mb-2"
            style={{ borderColor: "var(--ls-gray-300)" }}
          >
            <Search className="mx-3 h-4 w-4 shrink-0" style={{ color: "var(--ls-gray-500)" }} />
            <input
              type="search"
              placeholder="Buscar en el sitio…"
              aria-label="Buscar en el sitio"
              className="flex-1 py-2 pr-3 outline-none bg-transparent"
              style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "var(--ls-gray-900)" }}
            />
          </div>

          {navLinks.map((l) => (
            <a
              key={l.id}
              href={l.href}
              onClick={() => setOpen(false)}
              className="ls-p block py-3 font-medium border-b"
              style={{ color: "var(--ls-gray-900)", borderColor: "var(--ls-gray-100)" }}
            >
              {l.label}
            </a>
          ))}

          <div className="flex items-center gap-2 pt-2">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Facebook, label: "Facebook" },
              { Icon: Linkedin, label: "LinkedIn" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center"
                style={{ color: "var(--ls-gray-500)" }}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <a
            href={navbar.ctaHref}
            onClick={() => setOpen(false)}
            className="ls-btn ls-btn-primary mt-3 w-full justify-center"
          >
            {navbar.ctaLabel}
          </a>
        </div>
      </div>
    </header>
  )
}
