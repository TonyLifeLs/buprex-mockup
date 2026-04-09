"use client"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  MI SITIO – Preview page
 *  Renderiza en vivo el sitio construido desde el SiteBuilderEditor.
 *  Lee todo desde el store de Zustand (sitebuilder-store → localStorage).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Settings } from "lucide-react"
import { useSiteBuilderStore } from "@/store/sitebuilder"
import type { SBCard, SBSlide } from "@/store/sitebuilder"

// ─── Tiny helper: safe img with fallback placeholder ─────────────────────────
function SiteImage({
  src,
  alt,
  className,
  style,
}: {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
}) {
  if (!src) return null
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} style={style} />
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function PreviewNavbar() {
  const { navbar } = useSiteBuilderStore()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={{ backgroundColor: navbar.bgColor }} className="sticky top-0 z-50 shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        {/* Logo */}
        {navbar.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={navbar.logoUrl} alt="Logo" className="h-9 w-auto object-contain" />
        ) : (
          <span className="text-xl font-black" style={{ color: navbar.textColor }}>
            {navbar.logoText}
          </span>
        )}

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {navbar.links.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="text-sm font-semibold transition hover:opacity-70"
                style={{ color: navbar.textColor }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href={navbar.ctaHref}
            className="rounded-xl px-5 py-2.5 text-sm font-bold transition hover:opacity-90"
            style={{ backgroundColor: navbar.ctaBg, color: navbar.ctaText }}
          >
            {navbar.ctaLabel}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex md:hidden flex-col gap-1.5 p-1"
          aria-label="Menú"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-0.5 w-5 rounded"
              style={{ backgroundColor: navbar.textColor }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-4 space-y-2 border-t"
          style={{ backgroundColor: navbar.bgColor, borderColor: `${navbar.textColor}20` }}
        >
          {navbar.links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="block py-2 text-sm font-semibold"
              style={{ color: navbar.textColor }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={navbar.ctaHref}
            className="inline-block mt-2 rounded-xl px-5 py-2.5 text-sm font-bold"
            style={{ backgroundColor: navbar.ctaBg, color: navbar.ctaText }}
          >
            {navbar.ctaLabel}
          </a>
        </div>
      )}
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function PreviewHero() {
  const { hero } = useSiteBuilderStore()

  const bgStyle: React.CSSProperties =
    hero.bgType === "gradient"
      ? { background: `linear-gradient(135deg, ${hero.bgColor} 0%, ${hero.bgColor2} 100%)` }
      : hero.bgType === "image" && hero.bgImageUrl
      ? { backgroundImage: `url(${hero.bgImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
      : { backgroundColor: hero.bgColor }

  const hasImage = hero.imagePos !== "none" && hero.imageUrl
  const imageLeft = hero.imagePos === "left"

  return (
    <section style={bgStyle} className="py-20 px-6">
      <div
        className={`mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-10 ${
          imageLeft ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Text */}
        <div className={`flex-1 text-center ${hasImage ? "md:text-left" : "md:text-center"}`}>
          {hero.eyebrow && (
            <span className="inline-block mb-4 rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold text-white/90 backdrop-blur-sm">
              {hero.eyebrow}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            {hero.title}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/75 max-w-xl mx-auto md:mx-0">
            {hero.subtitle}
          </p>
          <div className="mt-8">
            <a
              href={hero.ctaHref}
              className="inline-block rounded-2xl px-8 py-4 text-base font-bold shadow-lg transition hover:opacity-90 hover:-translate-y-0.5"
              style={{
                backgroundColor: hero.ctaBg,
                color: hero.ctaText,
                transform: "translateY(0)",
              }}
            >
              {hero.ctaLabel}
            </a>
          </div>
        </div>

        {/* Image */}
        {hasImage && (
          <div className="flex-1 flex justify-center">
            <SiteImage
              src={hero.imageUrl}
              alt="Hero"
              className="w-full max-w-md rounded-3xl object-cover shadow-2xl"
            />
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Cards / Features ─────────────────────────────────────────────────────────
function PreviewCards() {
  const { cards } = useSiteBuilderStore()

  const colsClass =
    cards.layout === "grid-4"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : cards.layout === "grid-2"
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

  return (
    <section id="servicios" className="py-20 px-6 bg-gray-50">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">{cards.sectionTitle}</h2>
          {cards.sectionSubtitle && (
            <p className="mt-3 text-lg text-gray-500">{cards.sectionSubtitle}</p>
          )}
        </div>
        <div className={`grid gap-6 ${colsClass}`}>
          {cards.items.map((card: SBCard) => (
            <div
              key={card.id}
              className="rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              style={{ backgroundColor: card.bgColor }}
            >
              {card.imageUrl ? (
                <SiteImage
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-36 object-cover rounded-xl mb-4"
                />
              ) : (
                <div
                  className="text-4xl mb-4"
                  style={{ color: card.textColor }}
                >
                  {card.icon}
                </div>
              )}
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: card.textColor }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-80" style={{ color: card.textColor }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Carousel ─────────────────────────────────────────────────────────────────
function PreviewCarousel() {
  const { carousel } = useSiteBuilderStore()
  const [current, setCurrent] = useState(0)
  const total = carousel.slides.length

  // Auto-play
  useEffect(() => {
    if (!carousel.autoPlay || total <= 1) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % total), 4000)
    return () => clearInterval(id)
  }, [carousel.autoPlay, total])

  if (total === 0) return null

  const slide: SBSlide = carousel.slides[current]

  return (
    <section className="py-20 px-6 bg-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-10">
          {carousel.sectionTitle}
        </h2>

        <div
          className="relative rounded-3xl overflow-hidden shadow-xl"
          style={{ backgroundColor: slide.bgColor, minHeight: "320px" }}
        >
          {/* Background image */}
          {slide.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
          )}

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 py-16">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">{slide.title}</h3>
            <p className="text-lg text-white/75 max-w-xl mb-8">{slide.subtitle}</p>
            {slide.ctaLabel && (
              <a
                href={slide.ctaHref}
                className="rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-sm px-7 py-3 text-base font-bold text-white transition"
              >
                {slide.ctaLabel}
              </a>
            )}
          </div>

          {/* Arrows */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => setCurrent((c) => (c - 1 + total) % total)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white font-bold text-lg transition"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => setCurrent((c) => (c + 1) % total)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white font-bold text-lg transition"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {total > 1 && (
          <div className="flex justify-center gap-2 mt-5">
            {carousel.slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className="rounded-full transition"
                style={{
                  backgroundColor: i === current ? "#2563eb" : "#d1d5db",
                  width: i === current ? "24px" : "8px",
                  height: "8px",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function PreviewCTA() {
  const { cta } = useSiteBuilderStore()
  return (
    <section
      id="contacto"
      className="py-20 px-6"
      style={{ backgroundColor: cta.bgColor }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className="text-3xl md:text-4xl font-black mb-4"
          style={{ color: cta.textColor }}
        >
          {cta.title}
        </h2>
        <p className="text-lg mb-8 opacity-80" style={{ color: cta.textColor }}>
          {cta.subtitle}
        </p>
        <a
          href={cta.btnHref}
          className="inline-block rounded-2xl px-8 py-4 text-base font-bold shadow-lg transition hover:opacity-90"
          style={{ backgroundColor: cta.btnBg, color: cta.btnText }}
        >
          {cta.btnLabel}
        </a>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function PreviewFooter() {
  const { footer } = useSiteBuilderStore()
  return (
    <footer style={{ backgroundColor: footer.bgColor }} className="pt-16 pb-8 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand col */}
          <div>
            {footer.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={footer.logoUrl}
                alt="Logo"
                className="h-10 w-auto object-contain mb-3"
              />
            ) : (
              <p
                className="text-xl font-black mb-2"
                style={{ color: footer.textColor, filter: "brightness(2)" }}
              >
                {footer.logoText}
              </p>
            )}
            <p className="text-sm leading-relaxed" style={{ color: footer.textColor }}>
              {footer.tagline}
            </p>

            {/* Social */}
            {footer.social.length > 0 && (
              <div className="flex gap-3 mt-5">
                {footer.social.map((soc) => (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg px-3 py-1.5 text-xs font-bold border transition hover:opacity-75"
                    style={{
                      color: footer.textColor,
                      borderColor: `${footer.textColor}40`,
                    }}
                  >
                    {soc.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {footer.columns.map((col) => (
            <div key={col.id}>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: footer.textColor, filter: "brightness(2)" }}
              >
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-sm transition hover:opacity-75"
                      style={{ color: footer.textColor }}
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
          className="border-t pt-6 text-center text-xs"
          style={{
            borderColor: `${footer.textColor}25`,
            color: footer.textColor,
          }}
        >
          {footer.copyright}
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MiSitioPage() {
  const { visibility, palette } = useSiteBuilderStore()

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", backgroundColor: palette.bg }}>

      {/* Floating bar — back to dashboard */}
      <div className="fixed bottom-5 right-5 z-[100] flex gap-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-2xl bg-gray-900/90 backdrop-blur-sm px-4 py-2.5 text-sm font-bold text-white shadow-xl transition hover:bg-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold text-white shadow-xl transition hover:opacity-90"
          style={{ backgroundColor: palette.primary }}
        >
          <Settings className="h-4 w-4" />
          Editar
        </Link>
      </div>

      {visibility.navbar   && <PreviewNavbar />}
      {visibility.hero     && <PreviewHero />}
      {visibility.cards    && <PreviewCards />}
      {visibility.carousel && <PreviewCarousel />}
      {visibility.cta      && <PreviewCTA />}
      {visibility.footer   && <PreviewFooter />}
    </div>
  )
}
