"use client"

/**
 * Labo Suisse — Design System Implementation (v2)
 * ─────────────────────────────────────────────────────────────────────────────
 * Tokens:    src/app/globals.css  →  :root { --ls-* }  +  @theme inline
 * Typography:  .ls-h1…h6, .ls-p, .ls-p-lg, .ls-p-sm
 * Grid:        .ls-container  ·  .ls-grid (4/6/12 cols)
 * Buttons:     .ls-btn  +  .ls-btn-{primary|secondary|tertiary|link}
 * Inputs:      .ls-field  ·  .ls-label  ·  .ls-input  ·  .ls-hint
 * Accordion:   .ls-accordion-item/trigger/content/inner
 *
 * Sections (above-the-fold first):
 *   1. LaboHeader      – sticky, shrink on scroll, expandable search, underline hover
 *   2. LaboHero        – right image, left infobox, carousel (superlabel / title / desc / CTA)
 *   3. BannerAlternate – "NO INJECTIONS · YES TRANSDERMIC TECHNOLOGY" editorial
 *   4. BrandIntro      – short innovation copy + link
 *   5. CrescinaFeatured– brand-crescina bg block + CTA
 *   6. CategoriesGrid  – 4 category cards (piel / capilar / labo / tecnología)
 *   7. NewsCarousel    – paginates 2-up articles
 *   8. LaboAccordion   – FAQ expand/collapse
 *   9. LaboClub        – Newsletter "SÉ PARTE DE UN CLUB EXCLUSIVO"
 *  10. LaboFooter      – 4-col dark footer
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Linkedin,
  Menu,
  X,
  ArrowRight,
  Mail,
  Search,
  Plus,
} from "lucide-react"

// ─── DATA ─────────────────────────────────────────────────────────────────────

/** Nav items per brief: Cuidado capilar · Cuidado de la piel · Descubre Labo · Tecnología · Productos · Marcas */
const NAV_LINKS = [
  { label: "Cuidado Capilar",          href: "#capilar"    },
  { label: "Cuidado de la Piel",       href: "#piel"       },
  { label: "Descubre Labo",            href: "#descubre"   },
  { label: "Tecnología Transdérmica",  href: "#tecnologia" },
  { label: "Productos",                href: "#productos"  },
  { label: "All Brands",               href: "#marcas"     },
]

/**
 * Hero carousel slides
 * superlabel: "Cuidado de la piel · Cuidado capilar · Tecnología transdérmica"
 * Title: max 2 lines · Description: max 3 lines · CTA: "Descubre Labo"
 */
const HERO_SLIDES = [
  {
    /* Save-area: top/bottom 100px on desktop; infobox side: left */
    tag: "Cuidado de la piel · Cuidado capilar · Tecnología transdérmica",
    title: "Ciencia dermocosmética sin agujas",
    subtitle: "Fillerina — Tratamiento de relleno",
    description:
      "Primer y único tratamiento de relleno-densificador alternativo a las inyecciones de ácido hialurónico para uso doméstico. Volumen visible en pómulos y labios desde las primeras semanas.",
    cta: "Descubre Labo",
    ctaHref: "#descubre",
    ctaSecondary: "Ver productos",
    ctaSecondaryHref: "#productos",
    bg: "#F5F5F5",
    textDark: true,
    image: "/images/fillerina-product.webp",
    badge: "Cuidado de la Piel",
    badgeBg: "var(--brand-fillerina-12sp)",
  },
  {
    tag: "Cuidado de la piel · Cuidado capilar · Tecnología transdérmica",
    title: "Recrecimiento capilar comprobado",
    subtitle: "Crescina — Tratamiento capilar",
    description:
      "Crescina previene y trata el adelgazamiento del cabello estimulando el recrecimiento capilar. Eficacia del 100% en las personas testeadas mediante protocolos clínicos rigurosos.",
    cta: "Descubre Labo",
    ctaHref: "#descubre",
    ctaSecondary: "Ver Crescina",
    ctaSecondaryHref: "#capilar",
    bg: "#212121",
    textDark: false,
    image: "/images/crescina-product.webp",
    badge: "Cuidado Capilar",
    badgeBg: "var(--brand-crescina)",
  },
]

/** Category cards grid – 4 items with inspirational bg as accent */
const CATEGORY_CARDS = [
  {
    id: "piel",
    href: "#piel",
    label: "Cuidado de la Piel",
    description: "Tratamientos de relleno, reafirmación y luminosidad para el rostro y el cuello.",
    bg: "var(--brand-fillerina-12sp)",
    image: "/images/mejillas.webp",
  },
  {
    id: "capilar",
    href: "#capilar",
    label: "Cuidado Capilar",
    description: "Soluciones para el recrecimiento y la salud del cabello, desde la raíz hasta las puntas.",
    bg: "var(--brand-crescina)",
    image: "/images/crescina-product.webp",
  },
  {
    id: "descubre",
    href: "#descubre",
    label: "Descubre Labo",
    description: "Conoce la historia de innovación y la filosofía de la investigación dermocosmética de Labo.",
    bg: "var(--brand-transdermic)",
    image: "/images/mejillas.webp",
  },
  {
    id: "tecnologia",
    href: "#tecnologia",
    label: "Tecnología Transdérmica",
    description: "Sistema de transporte patentado que lleva activos a capas profundas de la dermis.",
    bg: "var(--brand-oxytreat)",
    image: "/images/fillerina-product.webp",
  },
]

/** Brand cards – "Nuestras Marcas" sub-grid */
const BRAND_CARDS = [
  {
    brand: "Crescina",
    bg: "var(--brand-crescina)",
    description: "Tratamiento dermocosmético para el recrecimiento y la salud capilar.",
    href: "#capilar",
  },
  {
    brand: "Fillerina",
    bg: "var(--brand-fillerina-color)",
    description: "La alternativa sin inyecciones al tratamiento estético profesional.",
    href: "#piel",
  },
  {
    brand: "Transdermic",
    bg: "var(--brand-transdermic)",
    description: "Sistema transdérmico de absorción profunda para resultados visibles.",
    href: "#tecnologia",
  },
]

const NEWS = [
  {
    date: "12 Ene 2026",
    category: "Innovación",
    title: "Fillerina 12HA: Nueva fórmula con doce tipos de ácido hialurónico",
    excerpt: "La nueva generación de ácido hialurónico penetra en todas las capas de la dermis para un efecto de relleno sin precedentes.",
    image: "/images/fillerina-product.webp",
  },
  {
    date: "08 Dic 2025",
    category: "Capilar",
    title: "Crescina HFSC 100% actualiza su protocolo de aplicación",
    excerpt: "El tratamiento más avanzado contra la alopecia difusa incorpora nuevas instrucciones de uso para maximizar los resultados.",
    image: "/images/crescina-product.webp",
  },
  {
    date: "20 Nov 2025",
    category: "Tecnología",
    title: "Tecnología Transdérmica: cómo penetra donde otras cremas no llegan",
    excerpt: "Un recorrido por la ciencia detrás del sistema de transporte transdérmico patentado por Labo Suisse.",
    image: "/images/mejillas.webp",
  },
]

const FAQ_ITEMS = [
  {
    question: "¿En qué consiste la tecnología transdérmica de Labo Suisse?",
    answer:
      "La tecnología transdérmica de Labo Suisse permite que los principios activos penetren en las capas profundas de la dermis gracias a sistemas de transporte patentados. A diferencia de las cremas convencionales que actúan solo en la superficie, nuestros productos trabajan donde realmente se origina el envejecimiento o la caída del cabello.",
  },
  {
    question: "¿Son seguros los tratamientos Fillerina para uso doméstico?",
    answer:
      "Sí. Todos los productos Fillerina han sido dermatológicamente testados y son aptos para uso doméstico. No contienen componentes inyectables ni requieren asistencia de un profesional. Su fórmula patentada garantiza seguridad y eficacia comprobada clínicamente.",
  },
  {
    question: "¿Cuánto tiempo tarda en verse el resultado de Crescina?",
    answer:
      "Los primeros resultados visibles de Crescina suelen observarse a partir de las 4–6 semanas de uso regular. Los resultados óptimos se obtienen completando el ciclo de tratamiento recomendado de 3 meses, con posibilidad de realizar ciclos de mantenimiento.",
  },
  {
    question: "¿Puedo usar Labo Suisse si tengo piel sensible?",
    answer:
      "Nuestros productos están formulados sin parabenos, sin colorantes artificiales y han sido testados dermatológicamente. Sin embargo, siempre recomendamos revisar la lista de ingredientes completa y realizar una prueba de tolerancia en la cara interna del antebrazo antes del primer uso.",
  },
  {
    question: "¿Dónde puedo adquirir los productos en Chile?",
    answer:
      "Los productos Labo Suisse están disponibles en farmacias seleccionadas y en nuestra tienda online. Escribe a nuestro equipo a través del formulario de contacto para conocer el punto de venta más cercano a tu ubicación.",
  },
]

// ─── HEADER ── sticky, shrinks on scroll, expandable search ──────────────────
/*
 * Tokens used:
 *   --ls-white, --ls-black, --ls-gray-900, --ls-gray-700, --ls-gray-500
 *   --ls-gray-300, --ls-red-700
 * States:
 *   default 72px → scrolled 56px (padding-y transition)
 *   search: icon → expanded input (width transition, focus ring)
 *   hover underline: animated via CSS custom underline + transition
 */

function LaboHeader() {
  const [open, setOpen]                 = useState(false)
  const [scrolled, setScrolled]         = useState(false)
  const [searchOpen, setSearchOpen]     = useState(false)
  const [searchQuery, setSearchQuery]   = useState("")
  const searchInputRef                  = useRef<HTMLInputElement>(null)

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
          {/* ── Logo ── */}
          <a href="#inicio" className="flex items-center gap-1 shrink-0" aria-label="Labo Suisse inicio">
            <span
              className="font-bold tracking-[0.15em] uppercase transition-all"
              style={{ fontSize: scrolled ? "15px" : "18px", color: "var(--ls-black)" }}
            >
              LABO
            </span>
            <span
              className="font-light tracking-[0.1em] uppercase transition-all"
              style={{ fontSize: scrolled ? "13px" : "16px", color: "var(--ls-gray-700)" }}
            >
              SUISSE
            </span>
          </a>

          {/* ── Desktop links – hover underline via inline pseudo-element simulation ── */}
          <ul className="hidden items-center gap-0 md:flex" role="list">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                {/*
                 * Hover underline: uses a bottom-border approach with transition.
                 * Color token: --ls-gray-900 text, hover border --ls-black.
                 */}
                <a
                  href={l.href}
                  className="ls-p-sm block px-3 py-2 font-medium tracking-wide relative group"
                  style={{ color: "var(--ls-gray-900)", textDecoration: "none" }}
                >
                  {l.label}
                  {/* animated underline bar — scale-x-0 → scale-x-100 on group hover */}
                  <span
                    className="absolute bottom-0 left-3 right-3 block h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                    style={{ backgroundColor: "var(--ls-black)" }}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* ── Right side ── */}
          <div className="flex items-center gap-2">

            {/* Expandable Search */}
            <div
              className="flex items-center transition-all duration-300 overflow-hidden"
              style={{
                width: searchOpen ? "220px" : "36px",
                border: searchOpen ? "1px solid var(--ls-gray-300)" : "none",
                backgroundColor: searchOpen ? "var(--ls-white)" : "transparent",
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
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    color: "var(--ls-gray-900)",
                  }}
                />
              )}
            </div>

            {/* Social — desktop only */}
            <div className="hidden items-center gap-1 md:flex">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook,  label: "Facebook"  },
                { Icon: Linkedin,  label: "LinkedIn"  },
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

            {/* CTA "Descubre Labo" — discrete, desktop only */}
            <a
              href="#descubre"
              className="ls-btn ls-btn-primary hidden md:inline-flex"
              style={{ padding: "8px 20px", fontSize: "12px" }}
            >
              Descubre Labo
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

      {/* Mobile slide panel (max-height transition for smooth open/close) */}
      <div
        className="overflow-hidden transition-all duration-300 md:hidden"
        style={{
          maxHeight: open ? "520px" : "0",
          borderTop: open ? "1px solid var(--ls-gray-300)" : "none",
        }}
        aria-hidden={!open}
      >
        <div className="ls-container py-4 flex flex-col gap-1">
          {/* Mobile search */}
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

          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="ls-p block py-3 font-medium border-b"
              style={{ color: "var(--ls-gray-900)", borderColor: "var(--ls-gray-100)" }}
            >
              {l.label}
            </a>
          ))}

          {/* Mobile social */}
          <div className="flex items-center gap-2 pt-2">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Facebook,  label: "Facebook"  },
              { Icon: Linkedin,  label: "LinkedIn"  },
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
            href="#descubre"
            onClick={() => setOpen(false)}
            className="ls-btn ls-btn-primary mt-3 w-full justify-center"
          >
            Descubre Labo
          </a>
        </div>
      </div>
    </header>
  )
}

// ─── HERO — right image, left infobox, carousel ───────────────────────────────
/*
 * Layout spec:
 *   Desktop: 2500px canvas → left infobox ~1250px / right image ~1250px
 *   Save area: top/bottom 100px (→ .ls-hero-save: 60px mobile, 100px desktop)
 * Text rules:
 *   superlabel: 1 line (truncate)
 *   title:      max 2 lines
 *   description:max 3 lines
 * Tokens:
 *   slide.bg for section bg, --ls-black/--ls-white for text per isDark
 */

function LaboHero() {
  const [current, setCurrent]     = useState(0)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback(
    (idx: number) => {
      if (animating) return
      setAnimating(true)
      setTimeout(() => {
        setCurrent((idx + HERO_SLIDES.length) % HERO_SLIDES.length)
        setAnimating(false)
      }, 280)
    },
    [animating]
  )

  useEffect(() => {
    timerRef.current = setInterval(() => goTo(current + 1), 7000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [current, goTo])

  const slide = HERO_SLIDES[current]
  const isDark = !slide.textDark

  return (
    <section
      id="inicio"
      aria-label="Presentación principal"
      className="relative overflow-hidden"
      style={{
        backgroundColor: slide.bg,
        minHeight: "100svh",
        transition: "background-color 0.4s",
      }}
    >
      <div
        className="ls-container ls-hero-save flex flex-col items-center gap-12 pt-24 md:flex-row md:gap-16"
        style={{ opacity: animating ? 0 : 1, transition: "opacity 0.28s ease" }}
      >
        {/* ── Left: Infobox (1250px reserve on 2500px canvas) ── */}
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">

          {/* Badge — inspirational bg as accent, never as text */}
          <span
            className="mb-5 inline-block px-3 py-1 text-[11px] font-bold tracking-[0.2em] uppercase"
            style={{ backgroundColor: slide.badgeBg, color: "var(--ls-gray-900)" }}
          >
            {slide.badge}
          </span>

          {/*
           * Superlabel — "Cuidado de la piel · Cuidado capilar · Tecnología transdérmica"
           * Max 1 line (truncate), tracking + uppercase
           * Token: --ls-gray-500 (light bg) or rgba(255,255,255,0.5) (dark bg) — AA contrast
           */}
          <p
            className="ls-p-sm mb-5 font-semibold tracking-[0.18em] uppercase truncate max-w-sm"
            style={{ color: isDark ? "rgba(255,255,255,0.55)" : "var(--ls-gray-500)" }}
          >
            {slide.tag}
          </p>

          {/*
           * Title — max 2 lines (-webkit-line-clamp:2)
           * Font: .ls-h1 = 56/64  Token: --ls-white (dark) / --ls-black (light)
           */}
          <h1
            className="ls-h1 mb-4"
            style={{
              color: isDark ? "var(--ls-white)" : "var(--ls-black)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p
            className="ls-h5 mb-5 font-light"
            style={{ color: isDark ? "rgba(255,255,255,0.65)" : "var(--ls-gray-700)" }}
          >
            {slide.subtitle}
          </p>

          {/*
           * Description — max 3 lines (-webkit-line-clamp:3)
           * Token: --ls-gray-700 (light) / rgba(255,255,255,0.6) (dark)
           */}
          <p
            className="ls-p mb-10 max-w-md"
            style={{
              color: isDark ? "rgba(255,255,255,0.6)" : "var(--ls-gray-700)",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {slide.description}
          </p>

          {/* CTAs: Primary "Descubre Labo" + Secondary */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Primary — fondo negro, texto blanco; hover oscurece ~10% */}
            <a href={slide.ctaHref} className="ls-btn ls-btn-primary group gap-2">
              {slide.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={slide.ctaSecondaryHref}
              className="ls-btn ls-btn-tertiary"
              style={{ color: isDark ? "rgba(255,255,255,0.6)" : "var(--ls-gray-700)" }}
            >
              {slide.ctaSecondary}
            </a>
          </div>

          {/* Pagination dots */}
          <div className="mt-12 flex items-center gap-2" role="tablist" aria-label="Diapositivas">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                role="tab"
                onClick={() => goTo(i)}
                aria-label={`Diapositiva ${i + 1}`}
                aria-selected={i === current}
                style={{
                  height: "2px",
                  width: i === current ? "36px" : "14px",
                  backgroundColor:
                    i === current
                      ? isDark ? "var(--ls-white)" : "var(--ls-black)"
                      : isDark ? "rgba(255,255,255,0.25)" : "var(--ls-gray-300)",
                  transition: "width 0.3s",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Right: product image (reserves ~50% = 1250px equivalent in 2500px spec) ── */}
        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative h-72 w-72 sm:h-96 sm:w-96 md:h-[500px] md:w-[500px]">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-contain drop-shadow-xl"
              sizes="(max-width:640px) 18rem, (max-width:768px) 24rem, 31rem"
              priority={current === 0}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0" }}
            />
          </div>

          {/* Prev / Next carousel controls */}
          <button
            onClick={() => goTo(current - 1)}
            aria-label="Diapositiva anterior"
            className="absolute left-0 flex h-10 w-10 items-center justify-center border transition-all"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.2)" : "var(--ls-gray-300)",
              color: isDark ? "var(--ls-white)" : "var(--ls-gray-900)",
              backgroundColor: isDark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.7)",
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            aria-label="Diapositiva siguiente"
            className="absolute right-0 flex h-10 w-10 items-center justify-center border transition-all"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.2)" : "var(--ls-gray-300)",
              color: isDark ? "var(--ls-white)" : "var(--ls-gray-900)",
              backgroundColor: isDark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.7)",
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── BANNER ALTERNATE — "NO INJECTIONS · YES TRANSDERMIC TECHNOLOGY" ─────────
/*
 * Grid layout:  12 col → image col-span-5 / text col-span-7 (570px image spec)
 * Mobile:       stack (image top, text bottom)
 * Hover:        card elevation 2–4px + scale-[1.01] on image
 * Tokens:       --ls-gray-100 bg, --ls-white infobox, --ls-red-700 accent
 */

function BannerAlternate() {
  return (
    <section id="descubre" className="overflow-hidden" style={{ backgroundColor: "var(--ls-gray-100)" }}>
      <div className="ls-container">
        <div className="flex flex-col md:flex-row min-h-[400px]">

          {/* Image panel — 570px spec, object-cover, subtle gradient overlay */}
          <div
            className="group relative w-full md:w-[570px] md:shrink-0 min-h-[300px] md:min-h-[400px] overflow-hidden"
          >
            <Image
              src="/images/mejillas.webp"
              alt="Tecnología Transdérmica Labo Suisse"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width:768px) 100vw, 570px"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(120deg, rgba(0,0,0,0.18) 0%, transparent 55%)" }}
            />
          </div>

          {/* Infobox right — white bg, 7 of 12 col on desktop */}
          <div
            className="flex flex-1 flex-col justify-center px-8 py-14 md:px-16"
            style={{ backgroundColor: "var(--ls-white)" }}
          >
            {/*
             * Banner title: "NO INJECTIONS · YES TRANSDERMIC TECHNOLOGY"
             * Token: --ls-red-700 superlabel (AA on white), --ls-black heading
             */}
            <span
              className="ls-p-sm mb-3 font-bold tracking-[0.25em] uppercase"
              style={{ color: "var(--ls-red-700)" }}
            >
              NO INJECTIONS · YES TRANSDERMIC TECHNOLOGY
            </span>
            <h2 className="ls-h2 mb-5" style={{ color: "var(--ls-black)" }}>
              Belleza sin agujas,<br />
              <em className="not-italic" style={{ color: "var(--ls-red-700)" }}>
                resultados sin arrugas
              </em>
            </h2>
            <p className="ls-p mb-8 max-w-md" style={{ color: "var(--ls-gray-700)" }}>
              Labo lidera la vanguardia de la medicina estética, desarrollando productos
              innovadores y patentados capaces de alcanzar los mejores resultados naturales —
              sin inyecciones y sin procedimientos invasivos.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#tecnologia" className="ls-btn ls-btn-primary group gap-2">
                Ver más
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#productos" className="ls-btn ls-btn-secondary">
                Ver productos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── BRAND INTRO — short innovation copy ──────────────────────────────────────
/*
 * Max 4–5 lines of paragraph + "Descubre Labo" link
 * Centered layout, white bg
 * Tokens: --ls-black, --ls-gray-700, --ls-red-700 (link)
 */

function BrandIntro() {
  return (
    <section
      id="tecnologia"
      style={{ backgroundColor: "var(--ls-white)", borderBottom: "1px solid var(--ls-gray-100)" }}
    >
      <div className="ls-container py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="ls-p-sm mb-4 inline-block font-bold tracking-[0.3em] uppercase"
            style={{ color: "var(--ls-red-700)" }}
          >
            DESDE 1986
          </span>
          <h2 className="ls-h2 mb-6" style={{ color: "var(--ls-black)" }}>
            Innovación dermocosmética<br />
            <em className="not-italic" style={{ color: "var(--ls-red-700)" }}>
              para la piel y el cabello
            </em>
          </h2>
          {/*
           * Intro copy — máx. 5 líneas
           * Tokens: --ls-gray-700 body text (AA on white, ratio ≥4.5:1)
           */}
          <p className="ls-p-lg mx-auto mb-8 max-w-2xl" style={{ color: "var(--ls-gray-700)" }}>
            Labo Suisse es un laboratorio dermocosméutico de referencia mundial, especializado en
            el desarrollo de tratamientos sin inyecciones para el cuidado avanzado de la piel y el
            cabello. Nuestros productos combinan investigación científica rigurosa con tecnología
            transdérmica patentada, llevando activos de alta eficacia a las capas profundas donde
            realmente se origina el envejecimiento.
          </p>
          <a href="#descubre" className="ls-btn-link text-base">
            Descubre Labo <ArrowRight className="inline h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── CRESCINA FEATURED — brand block with inspirational bg ────────────────────
/*
 * Card/Banner presentando Crescina (Block Launch Two Cards spec)
 * brand-crescina (#D6AB41) used ONLY as background/accent — never as text on light bg
 * Text always on --ls-black or --ls-white for AA/AAA contrast
 * Hover: elevation shadow + scale
 */

function CrescinaFeatured() {
  return (
    <section id="capilar" style={{ backgroundColor: "var(--ls-gray-100)" }}>
      <div className="ls-container py-20">
        {/* Section header */}
        <div className="mb-12 text-center">
          <span
            className="ls-p-sm mb-2 inline-block font-bold tracking-[0.3em] uppercase"
            style={{ color: "var(--ls-red-700)" }}
          >
            CUIDADO CAPILAR
          </span>
          <h2 className="ls-h2" style={{ color: "var(--ls-black)" }}>
            Destacado: Crescina
          </h2>
        </div>

        {/* Two-card layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Card 1 — large feature (inspirational brand-crescina bg + dark overlay for text) */}
          <article
            className="group relative overflow-hidden flex flex-col justify-end min-h-[380px] transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "var(--brand-crescina)" }}
            aria-label="Crescina HFSC 100%"
          >
            {/* Product image fills card */}
            <div className="absolute inset-0">
              <Image
                src="/images/crescina-product.webp"
                alt="Crescina tratamiento capilar"
                fill
                className="object-cover opacity-40 transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width:768px) 100vw, 50vw"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0" }}
              />
            </div>
            {/* Dark gradient so text is readable — AA compliance over image */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)" }}
            />
            {/* Content — text on dark overlay */}
            <div className="relative z-10 p-8">
              <span
                className="mb-2 inline-block px-2 py-0.5 text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{ backgroundColor: "var(--brand-crescina)", color: "var(--ls-gray-900)" }}
              >
                Cuidado Capilar
              </span>
              <h3 className="ls-h3 mb-3" style={{ color: "var(--ls-white)" }}>
                Crescina HFSC 100%
              </h3>
              <p className="ls-p-sm mb-6 max-w-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                El tratamiento dermocosmético más avanzado para el recrecimiento capilar.
                Eficacia clínicamente comprobada en el 100% de los pacientes testados.
              </p>
              <a href="#capilar" className="ls-btn ls-btn-primary gap-2">
                Productos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </article>

          {/* Card 2 — supporting cards (2 stacked on right col) */}
          <div className="flex flex-col gap-6">
            {[
              {
                title: "Crescina Re-Growth",
                subtitle: "Tratamiento de Recrecimiento",
                desc: "Protocolo de 3 meses para reactivar el folículo capilar y frenar la caída.",
                bg: "var(--brand-cadu-crex)",
              },
              {
                title: "Crescina HFSC Shampoo",
                subtitle: "Limpieza activa",
                desc: "Shampoo con factores de crecimiento para complementar el tratamiento diario.",
                bg: "var(--brand-rinfoltina)",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="group flex overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]"
                style={{ backgroundColor: "var(--ls-white)" }}
              >
                {/* Inspirational color strip — only bg accent */}
                <div
                  className="w-2 shrink-0 transition-all duration-300 group-hover:w-3"
                  style={{ backgroundColor: item.bg }}
                />
                <div className="flex flex-1 flex-col justify-center p-6">
                  <span
                    className="ls-p-sm mb-1 font-bold tracking-[0.15em] uppercase"
                    style={{ color: "var(--ls-gray-500)" }}
                  >
                    {item.subtitle}
                  </span>
                  <h4 className="ls-h5 mb-2" style={{ color: "var(--ls-black)" }}>{item.title}</h4>
                  <p className="ls-p-sm mb-4" style={{ color: "var(--ls-gray-700)" }}>{item.desc}</p>
                  <a href="#capilar" className="ls-btn-link self-start text-[13px]">
                    Ver producto <ArrowRight className="inline h-3.5 w-3.5 ml-0.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CATEGORIES GRID — 4 cards ─────────────────────────────────────────────────
/*
 * Categories: Cuidado de la Piel / Cuidado Capilar / Descubre Labo / Tecnología
 * Each card: image (fill, object-cover), title, link
 * Hover: elevation shadow + scale image 1.05
 * Grid 1→2→4 col
 * Tokens: inspirational bg as card accent only; text --ls-white on dark overlay
 */

function CategoriesGrid() {
  return (
    <section id="productos" style={{ backgroundColor: "var(--ls-white)" }}>
      {/* Hidden anchor for Cuidado de la Piel nav link */}
      <span id="piel" aria-hidden="true" style={{ position: "absolute", visibility: "hidden" }} />
      <div className="ls-container py-20">
        {/* Section header */}
        <div className="mb-12 text-center">
          <span
            className="ls-p-sm mb-2 inline-block font-bold tracking-[0.3em] uppercase"
            style={{ color: "var(--ls-red-700)" }}
          >
            EXPLORAR
          </span>
          <h2 className="ls-h2 mb-4" style={{ color: "var(--ls-black)" }}>
            Categorías principales
          </h2>
          <div
            className="mx-auto"
            style={{ width: "48px", height: "2px", backgroundColor: "var(--ls-red-700)" }}
          />
        </div>

        {/* Grid 1→2→4 */}
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
          role="list"
          aria-label="Categorías de productos"
        >
          {CATEGORY_CARDS.map((card) => (
            <article
              key={card.id}
              role="listitem"
              className="group relative overflow-hidden flex flex-col justify-end min-h-[320px] cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-[3px]"
              /* Inspirational bg shown when image fails */
              style={{ backgroundColor: card.bg }}
            >
              {/* Category image — object-cover */}
              <div className="absolute inset-0">
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0" }}
                />
              </div>
              {/* Gradient overlay — dark bottom so text achieves AA contrast */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.05) 60%)" }}
              />

              {/* Card content — text on dark overlay (white text AA) */}
              <div className="relative z-10 p-6">
                <h3 className="ls-h5 mb-2" style={{ color: "var(--ls-white)" }}>{card.label}</h3>
                <p
                  className="ls-p-sm mb-4"
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {card.description}
                </p>
                <a
                  href={card.href}
                  className="inline-flex items-center gap-1 text-[13px] font-bold tracking-wide uppercase transition-all duration-200"
                  style={{ color: "var(--ls-white)", textDecoration: "none" }}
                  aria-label={`Ir a ${card.label}`}
                >
                  Ver más
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Our Brands sub-section */}
        <div
          className="mt-16 pt-12"
          style={{ borderTop: "1px solid var(--ls-gray-100)" }}
        >
          <div className="mb-10 text-center">
            <span
              className="ls-p-sm mb-2 inline-block font-bold tracking-[0.3em] uppercase"
              style={{ color: "var(--ls-red-700)" }}
            >
              NUESTRAS MARCAS
            </span>
            <h3 id="marcas" className="ls-h3" style={{ color: "var(--ls-black)" }}>
              Líneas especializadas
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {BRAND_CARDS.map((c) => (
              <article
                key={c.brand}
                className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]"
              >
                {/* Inspirational bg — only decorative accent */}
                <div
                  className="h-44 w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ backgroundColor: c.bg }}
                >
                  <span
                    className="ls-h3 font-black uppercase tracking-widest opacity-25 select-none"
                    style={{ color: "var(--ls-black)" }}
                  >
                    {c.brand}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6" style={{ backgroundColor: "var(--ls-gray-100)" }}>
                  <h4 className="ls-h5 mb-2" style={{ color: "var(--ls-black)" }}>{c.brand}</h4>
                  <p className="ls-p-sm mb-4 flex-1" style={{ color: "var(--ls-gray-700)" }}>{c.description}</p>
                  <a href={c.href} className="ls-btn ls-btn-primary self-start" style={{ padding: "10px 20px" }}>
                    Explorar
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── NEWS CAROUSEL ────────────────────────────────────────────────────────────

function NewsCarousel() {
  const [page, setPage] = useState(0)
  const perPage    = 2
  const totalPages = Math.ceil(NEWS.length / perPage)
  const visible    = NEWS.slice(page * perPage, page * perPage + perPage)

  return (
    <section id="noticias" style={{ backgroundColor: "var(--ls-gray-100)" }}>
      <div className="ls-container py-20">
        {/* Header + controls */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span
              className="ls-p-sm mb-2 block font-bold tracking-[0.3em] uppercase"
              style={{ color: "var(--ls-red-700)" }}
            >
              NOTICIAS
            </span>
            <h2 className="ls-h2" style={{ color: "var(--ls-black)" }}>Magazine Labo</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
              className="flex h-10 w-10 items-center justify-center border transition-all"
              style={{ borderColor: "var(--ls-gray-300)", color: "var(--ls-gray-700)" }}
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setPage((p) => (p + 1) % totalPages)}
              className="flex h-10 w-10 items-center justify-center border transition-all"
              style={{ borderColor: "var(--ls-gray-300)", color: "var(--ls-gray-700)" }}
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 2 cards per slide */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {visible.map((n) => (
            <article
              key={n.title}
              className="group flex flex-col overflow-hidden"
              style={{ backgroundColor: "var(--ls-white)", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={n.image}
                  alt={n.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw, 50vw"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
                />
                {/* Category chip on image — uses --ls-red-700, AA contrast on #FFFFFF text */}
                <span
                  className="absolute top-4 left-4 px-3 py-1 text-[11px] font-bold tracking-[0.12em] uppercase"
                  style={{ backgroundColor: "var(--ls-red-700)", color: "var(--ls-white)" }}
                >
                  {n.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="ls-p-sm mb-2" style={{ color: "var(--ls-gray-500)" }}>{n.date}</span>
                <h3 className="ls-h5 mb-3 line-clamp-2" style={{ color: "var(--ls-black)" }}>{n.title}</h3>
                <p className="ls-p-sm mb-5 flex-1 line-clamp-3" style={{ color: "var(--ls-gray-700)" }}>{n.excerpt}</p>
                <a href="#" className="ls-btn ls-btn-primary self-start group/link gap-2" style={{ padding: "10px 20px" }}>
                  Leer artículo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Page indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Página ${i + 1}`}
              style={{
                height: "2px",
                width: i === page ? "32px" : "12px",
                backgroundColor: i === page ? "var(--ls-black)" : "var(--ls-gray-300)",
                transition: "width 0.3s",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ACCORDION — FAQ ──────────────────────────────────────────────────────────
//  Uses .ls-accordion-* classes. Icon + rotates 45° on open.

function LaboAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" style={{ backgroundColor: "var(--ls-white)" }}>
      <div className="ls-container py-20">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <span
            className="ls-p-sm mb-3 inline-block font-bold tracking-[0.3em] uppercase"
            style={{ color: "var(--ls-red-700)" }}
          >
            PREGUNTAS FRECUENTES
          </span>
          <h2 className="ls-h2" style={{ color: "var(--ls-black)" }}>FAQ</h2>
        </div>

        <div className="mx-auto max-w-2xl">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="ls-accordion-item"
              data-open={openIndex === i ? "true" : "false"}
            >
              <button
                className="ls-accordion-trigger"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.question}</span>
                <span className="ls-accordion-icon">
                  <Plus className="h-5 w-5" />
                </span>
              </button>
              <div className="ls-accordion-content">
                <div className="ls-accordion-inner">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── NEWSLETTER — "SÉ PARTE DE UN CLUB EXCLUSIVO" ────────────────────────────
/*
 * Layout: max-w-xl centered
 * bg: --brand-transdermic (#F7F7DB) — inspirational, bg use only
 * Input system: .ls-field · .ls-label · .ls-input  +  error/success states
 * Error token:   --ls-danger  (#DB0045)  — shown on invalid email
 * Success token: --ls-success (#2DCB48)  — shown on successful submit
 * Button: "Suscríbete" (primary, disabled until consent)
 */

function LaboClub() {
  const [email, setEmail]         = useState("")
  const [name, setName]           = useState("")
  const [consent, setConsent]     = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [emailError, setEmailError] = useState("")

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setEmailError("Por favor ingresa un correo electrónico válido.")
      return
    }
    if (!consent) return
    setEmailError("")
    setSubmitted(true)
  }

  return (
    <section
      id="club"
      /* Inspirational brand-transdermic bg — only background use, never text */
      style={{ backgroundColor: "var(--brand-transdermic)" }}
      aria-label="Newsletter Labo Club"
    >
      <div className="ls-container py-20">
        <div className="mx-auto max-w-xl">
          <div className="text-center mb-10">
            {/* superlabel */}
            <span
              className="ls-p-sm mb-3 inline-block font-bold tracking-[0.3em] uppercase"
              style={{ color: "var(--ls-red-700)" }}
            >
              LABO CLUB
            </span>
            {/* Newsletter headline — per brief */}
            <h2 className="ls-h2 mb-4" style={{ color: "var(--ls-black)" }}>
              Sé parte de un<br />club exclusivo
            </h2>
            {/* SÉ PARTE DE UN CLUB EXCLUSIVO tagline */}
            <p
              className="ls-p-sm mb-1 font-bold tracking-[0.25em] uppercase"
              style={{ color: "var(--ls-gray-700)" }}
            >
              SÉ PARTE DE UN CLUB EXCLUSIVO
            </p>
            <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
              Recibe información, novedades, concursos y eventos exclusivos junto a las últimas
              innovaciones dermocosméticas de Labo Suisse.
            </p>
          </div>

          {submitted ? (
            /* Success state — --ls-success token for border + text */
            <div
              className="border px-8 py-8 text-center"
              style={{ borderColor: "var(--ls-success)", backgroundColor: "rgba(45,203,72,0.07)" }}
              role="alert"
              aria-live="polite"
            >
              <p className="ls-h5" style={{ color: "var(--ls-success)" }}>
                ¡Bienvenido/a al Labo Club!
              </p>
              <p className="ls-p-sm mt-2" style={{ color: "var(--ls-gray-700)" }}>
                Pronto recibirás nuestras novedades en tu correo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate aria-label="Formulario de suscripción">
              {/* Name field */}
              <div className="ls-field">
                <label htmlFor="ls-name" className="ls-label">Nombre</label>
                <input
                  id="ls-name"
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="ls-input"
                  autoComplete="given-name"
                />
              </div>

              {/* Email field — error state uses --ls-danger */}
              <div className="ls-field">
                <label htmlFor="ls-email" className="ls-label">
                  Correo electrónico{" "}
                  <span style={{ color: "var(--ls-danger)" }} aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
                    style={{ color: "var(--ls-gray-500)" }}
                    aria-hidden="true"
                  />
                  <input
                    id="ls-email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError("") }}
                    className={`ls-input pl-11${emailError ? " error" : ""}`}
                    required
                    aria-required="true"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "ls-email-error" : undefined}
                    autoComplete="email"
                  />
                </div>
                {/* Error message — --ls-danger color */}
                {emailError && (
                  <span id="ls-email-error" className="ls-hint error" role="alert">
                    {emailError}
                  </span>
                )}
              </div>

              {/* Consent checkbox */}
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    aria-label="Acepto recibir comunicaciones de Labo Suisse Chile"
                  />
                  <div
                    className="flex h-4 w-4 items-center justify-center border transition-all"
                    style={{
                      borderColor: consent ? "var(--ls-black)" : "var(--ls-gray-300)",
                      backgroundColor: consent ? "var(--ls-black)" : "transparent",
                    }}
                    aria-hidden="true"
                  >
                    {consent && (
                      <span style={{ color: "var(--ls-white)", fontSize: "10px", lineHeight: 1 }}>✓</span>
                    )}
                  </div>
                </div>
                <span className="ls-p-sm" style={{ color: "var(--ls-gray-700)" }}>
                  He leído la información sobre el tratamiento de datos personales y acepto recibir
                  comunicaciones de Labo Suisse Chile.
                </span>
              </label>

              {/* CTA — "Suscríbete" (per brief), disabled until consent */}
              <button
                type="submit"
                className="ls-btn ls-btn-primary w-full justify-center"
                disabled={!consent}
                aria-disabled={!consent}
              >
                Suscríbete
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function LaboFooter() {
  return (
    <footer style={{ backgroundColor: "var(--ls-black)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="ls-container pt-16 pb-10">
        {/* 4-column grid (ls-grid 12 col → md:col-span-2) */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand — spans 2 */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-1">
              <span className="text-lg font-bold tracking-[0.15em] uppercase" style={{ color: "var(--ls-white)" }}>
                LABO
              </span>
              <span className="text-base font-light tracking-[0.1em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
                SUISSE
              </span>
            </div>
            <p className="ls-p-sm mb-6 max-w-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Innovación dermocosmética para el cuidado de la piel y el cabello desde 1986.
              Tecnología transdérmica sin inyecciones.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook,  label: "Facebook"  },
                { Icon: Linkedin,  label: "LinkedIn"  },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
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

          {/* Products */}
          <div>
            <h4
              className="mb-5 text-[11px] font-bold tracking-[0.25em] uppercase"
              style={{ color: "var(--ls-red-600)" }}
            >
              PRODUCTOS
            </h4>
            <ul className="space-y-3">
              {["Cuidado de la Piel", "Cuidado Capilar", "Fillerina", "Crescina", "Transdermic"].map((item) => (
                <li key={item}>
                  <a
                    href="#productos"
                    className="ls-p-sm transition-colors"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)" }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="mb-5 text-[11px] font-bold tracking-[0.25em] uppercase"
              style={{ color: "var(--ls-red-600)" }}
            >
              DESCUBRE LABO
            </h4>
            <ul className="space-y-3">
              {["Tecnología Transdérmica", "Sobre Labo", "Labo Club", "Contacto", "Privacidad"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="ls-p-sm transition-colors"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)" }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="ls-p-sm" style={{ color: "rgba(255,255,255,0.2)" }}>
            © {new Date().getFullYear()} Labo Suisse Chile. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            {["Privacidad", "Términos", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="ls-p-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.2)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.2)" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
/*
 * Section order (above-the-fold first):
 *  1. LaboHeader      — sticky navbar, expandable search, shrink on scroll
 *  2. LaboHero        — carousel, infobox left + image right, save-area 100px
 *  3. BannerAlternate — "NO INJECTIONS · YES TRANSDERMIC TECHNOLOGY"
 *  4. BrandIntro      — innovation copy + "Descubre Labo" link
 *  5. CrescinaFeatured— brand-crescina featured block + "Productos" CTA
 *  6. CategoriesGrid  — 4 category cards + 3 brand cards
 *  7. NewsCarousel    — 2-up article carousel
 *  8. LaboAccordion   — FAQ expand/collapse
 *  9. LaboClub        — Newsletter "SÉ PARTE DE UN CLUB EXCLUSIVO"
 * 10. LaboFooter      — 4-col dark footer
 */

export default function LaboSuissePage() {
  return (
    <main style={{ fontFamily: "var(--font-sans)" }}>
      <LaboHeader />
      <LaboHero />
      <BannerAlternate />
      <BrandIntro />
      <CrescinaFeatured />
      <CategoriesGrid />
      <NewsCarousel />
      <LaboAccordion />
      <LaboClub />
      <LaboFooter />
    </main>
  )
}
