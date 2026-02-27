"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Malestars", href: "#malestars" },
  { label: "Articulos", href: "#articulos" },
  { label: "Contacto", href: "#contacto" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#inicio" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e31e24]">
            <span className="font-[var(--font-heading)] text-lg font-extrabold text-card">
              B
            </span>
          </div>
          <span
            className={`font-[var(--font-heading)] text-xl font-bold tracking-tight transition-colors ${
              scrolled ? "text-foreground" : "text-card"
            }`}
          >
            BUPREX
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#e31e24] ${
                  scrolled ? "text-muted-foreground" : "text-card/80"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://www.life.com.ec"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-[#e31e24] px-5 py-2.5 text-sm font-bold text-card transition-all hover:bg-[#c41a20] md:inline-flex"
        >
          www.life.com.ec
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`inline-flex items-center justify-center rounded-lg p-2 md:hidden ${
            scrolled ? "text-foreground" : "text-card"
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-medium text-foreground transition-colors hover:text-[#e31e24]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://www.life.com.ec"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full rounded-full bg-[#e31e24] px-5 py-2.5 text-center text-sm font-bold text-card"
          >
            www.life.com.ec
          </a>
        </div>
      )}
    </header>
  )
}
