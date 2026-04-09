"use client"

import { useEffect, useState, useRef } from "react"
import { Search, Menu, X } from "lucide-react"
import { Button } from "./Button"
import { useVitacapStore } from "@/store/vitacap"

export function Navbar() {
  const { content } = useVitacapStore()
  const links = content.navbarLinks
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
        backgroundColor: "var(--brand-900)",
        borderColor: scrolled ? "var(--brand-800)" : "transparent",
        boxShadow: scrolled ? "0 8px 24px rgba(0,0,0,0.18)" : "none",
      }}
    >
      <div className="ls-container">
        <nav
          className="flex items-center justify-between gap-4 transition-all duration-300"
          style={{ height: scrolled ? "64px" : "82px" }}
          aria-label="Vitacap G navegación"
        >
          {/* Logo tipográfico: "VITACAP" arriba, "G" en amarillo */}
          <a href="#vitacap" className="flex flex-col items-start leading-none font-bold uppercase tracking-[0.12em]" style={{ color: "#fff" }}>
            <span className="text-[16px]">VITACAP</span>
            <span className="text-[22px] leading-none" style={{ color: "var(--brand-accent)" }}>G</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex" role="list">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-3 py-2 text-[15px] font-medium relative group"
                  style={{ color: "rgba(255,255,255,0.88)" }}
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-3 right-3 block h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    style={{ backgroundColor: "var(--brand-accent)" }}
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
                width: searchOpen ? "220px" : "38px",
                borderColor: searchOpen ? "rgba(255,255,255,0.5)" : "transparent",
                backgroundColor: searchOpen ? "rgba(0,0,0,0.25)" : "transparent",
              }}
            >
              <button
                type="button"
                onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setQuery("") }}
                aria-label={searchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
                className="flex h-10 w-10 items-center justify-center"
                style={{ color: "#fff" }}
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
                  className="flex-1 bg-transparent pr-4 text-[14px] outline-none"
                  style={{ color: "#fff" }}
                />
              )}
            </div>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center md:hidden"
              style={{ color: "#fff" }}
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
          borderColor: open ? "var(--brand-800)" : "transparent",
          backgroundColor: "var(--brand-900)",
        }}
        aria-hidden={!open}
      >
        <div className="ls-container flex flex-col gap-3 py-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 text-[15px] font-medium border-b"
              style={{ color: "rgba(255,255,255,0.88)", borderColor: "rgba(255,255,255,0.12)" }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
