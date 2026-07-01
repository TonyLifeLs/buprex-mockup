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
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="buprex-container pt-4 md:pt-5">
        <div
          className={`overflow-hidden rounded-[2rem] border transition-all duration-300 ${
            scrolled
              ? "border-white/40 bg-[#06255e]/96 shadow-[0_24px_60px_rgba(6,37,94,0.32)]"
              : "border-white/25 bg-[#082f73]/90 shadow-[0_18px_40px_rgba(6,37,94,0.24)]"
          }`}
        >
          <nav className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
            <a href="#inicio" className="flex shrink-0 items-center rounded-[1.5rem] bg-white/6 px-2 py-2">
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

            <div className="hidden min-w-0 flex-1 items-center justify-center md:flex">
              <div className="flex items-center gap-1 rounded-full border border-white/12 bg-white/6 p-1.5 backdrop-blur-md">
                {navbar.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-white/82 transition-all hover:bg-white hover:text-[#082f73]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <a
                href={footer.youtube || "https://youtube.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/8 text-white transition-colors hover:bg-white hover:text-[#082f73]"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href={footer.facebook || "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/8 text-white transition-colors hover:bg-white hover:text-[#082f73]"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={footer.instagram || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/8 text-white transition-colors hover:bg-white hover:text-[#082f73]"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 p-2.5 text-white md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
              mobileOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
            }`}
            aria-hidden={!mobileOpen}
          >
            <div className="border-t border-white/12 px-4 pb-5">
              <ul className="flex flex-col gap-2 pt-4">
                {navbar.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-base font-medium text-white/88 transition-colors hover:bg-white hover:text-[#082f73]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-3 px-2">
                <a
                  href={footer.youtube || "https://youtube.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/8 text-white"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href={footer.facebook || "https://facebook.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/8 text-white"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={footer.instagram || "https://instagram.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/8 text-white"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
