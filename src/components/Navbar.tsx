"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, Youtube, Facebook, Instagram } from "lucide-react"
import { useCMSStore } from "@/store/cms"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navbar = useCMSStore((s) => s.navbar)
  const footer = useCMSStore((s) => s.footer)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled ? "border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md" : "border-transparent bg-white/88 backdrop-blur-sm"
      }`}
      style={{
        boxShadow: scrolled ? "0 12px 40px rgba(15, 23, 42, 0.08)" : undefined,
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <a href="#inicio" className="flex items-center">
          <Image
            src={navbar.logoUrl || "/images/buprex-logo.png"}
            alt="Logo"
            width={450}
            height={80}
            className="h-8 w-auto object-contain sm:h-10 md:h-11"
            priority
            unoptimized
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center md:flex">
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 shadow-sm">
            {navbar.links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-900 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Social icons */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={footer.youtube || "https://youtube.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            aria-label="YouTube"
          >
            <Youtube className="h-4 w-4" />
          </a>
          <a
            href={footer.facebook || "https://facebook.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href={footer.instagram || "https://instagram.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu – animated collapse/expand */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          mobileOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid rgba(226, 232, 240, 1)",
        }}
        aria-hidden={!mobileOpen}
      >
        <div className="px-6 pb-6">
          <ul className="flex flex-col gap-2 pt-4">
            {navbar.links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3 px-4">
            <a
              href={footer.youtube || "https://youtube.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href={footer.facebook || "https://facebook.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href={footer.instagram || "https://instagram.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
