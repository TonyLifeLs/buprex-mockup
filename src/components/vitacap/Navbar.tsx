"use client"

import { useEffect, useState, useRef } from "react"
import { Search, Menu, X } from "lucide-react"
import { Button } from "./Button"

const links = [
  { label: "Vitacap G", href: "#vitacap" },
  { label: "Ingredientes", href: "#ingredientes" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Compra", href: "#compra" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  return (
    <header
      className="sticky top-0 z-50 border-b transition-all"
      style={{
        backgroundColor: "var(--neutral-100)",
        borderColor: scrolled ? "var(--line-soft)" : "transparent",
        boxShadow: scrolled ? "0 8px 24px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="ls-container">
        <nav
          className="flex items-center justify-between gap-4 transition-all duration-300"
          style={{ height: scrolled ? "64px" : "82px" }}
          aria-label="Vitacap G navegación"
        >
          <a href="#vitacap" className="flex items-center gap-2 text-[var(--neutral-900)] font-semibold uppercase tracking-[0.12em]">
            <span>VITACAP</span>
            <span style={{ color: "var(--brand-accent)" }}>G</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex" role="list">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-3 py-2 text-[15px] font-medium text-[var(--neutral-900)] relative group"
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-3 right-3 block h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    style={{ backgroundColor: "var(--brand-900)" }}
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div
              className="flex items-center overflow-hidden rounded-full border transition-all duration-300"
              style={{
                width: searchOpen ? "240px" : "42px",
                borderColor: searchOpen ? "var(--line-soft)" : "transparent",
                backgroundColor: searchOpen ? "#fff" : "transparent",
              }}
            >
              <button
                type="button"
                onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setQuery("") }}
                aria-label={searchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
                className="flex h-10 w-10 items-center justify-center text-[var(--neutral-900)]"
              >
                {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
              </button>
              {searchOpen && (
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="search"
                  placeholder="Buscar producto"
                  className="flex-1 bg-transparent pr-4 text-[14px] text-[var(--neutral-900)] outline-none"
                />
              )}
            </div>

            <div className="hidden md:flex">
              <Button variant="primary" size="md">Comprar</Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center text-[var(--neutral-900)] md:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <div
        className="overflow-hidden border-t transition-all duration-300 md:hidden"
        style={{
          maxHeight: open ? "320px" : "0px",
          borderColor: open ? "var(--line-soft)" : "transparent",
          backgroundColor: "var(--neutral-100)",
        }}
        aria-hidden={!open}
      >
        <div className="ls-container flex flex-col gap-3 py-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 text-[15px] font-medium text-[var(--neutral-900)] border-b"
              style={{ borderColor: "rgba(3,1,0,0.08)" }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button variant="primary" size="md">Comprar</Button>
        </div>
      </div>
    </header>
  )
}
