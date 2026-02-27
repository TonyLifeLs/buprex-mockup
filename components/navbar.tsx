"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, Youtube, Facebook, Instagram } from "lucide-react"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Contacto", href: "#contacto" },
  { label: "Articulos", href: "#articulos" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-[#0c3d6e]/95 backdrop-blur-md shadow-lg"
          : "bg-[#0c3d6e]"
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3">
          <span className="font-[var(--font-heading)] text-4xl font-extrabold tracking-tight text-[#f5d030]">
            BUPREX
            <sup className="text-sm">&#174;</sup>
          </span>
        </a>

        {/* Desktop Nav - Pill shaped links */}
        <div className="hidden items-center md:flex">
          <div className="flex items-center rounded-full bg-white/10 p-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[#0c3d6e]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Social icons */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-[#0c3d6e]"
            aria-label="YouTube"
          >
            <Youtube className="h-4 w-4" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-[#0c3d6e]"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-[#0c3d6e]"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-white md:hidden"
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
        <div className="border-t border-white/10 bg-[#0c3d6e] px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-2 pt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3 px-4">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
