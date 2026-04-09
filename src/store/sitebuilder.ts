/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE BUILDER STORE
 *  Estado completo para el constructor de sitios sin código.
 *  Persiste en localStorage bajo la clave "sitebuilder-store".
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { create } from "zustand"
import { persist } from "zustand/middleware"

function uid(): string {
  return Math.random().toString(36).slice(2, 9)
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SBNavLink {
  id: string
  label: string
  href: string
}

export interface SBCard {
  id: string
  icon: string
  title: string
  body: string
  bgColor: string
  textColor: string
  imageUrl: string
}

export interface SBSlide {
  id: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
  bgColor: string
  imageUrl: string
}

export interface SBFooterCol {
  id: string
  title: string
  links: { label: string; href: string }[]
}

export interface SBSocial {
  id: string
  platform: string
  url: string
}

export interface SBState {
  palette: {
    primary: string
    secondary: string
    accent: string
    bg: string
    text: string
    textLight: string
  }
  navbar: {
    logoUrl: string
    logoText: string
    bgColor: string
    textColor: string
    links: SBNavLink[]
    ctaLabel: string
    ctaHref: string
    ctaBg: string
    ctaText: string
  }
  hero: {
    bgType: "color" | "gradient" | "image"
    bgColor: string
    bgColor2: string
    bgImageUrl: string
    eyebrow: string
    title: string
    subtitle: string
    ctaLabel: string
    ctaHref: string
    ctaBg: string
    ctaText: string
    imageUrl: string
    imagePos: "right" | "left" | "none"
  }
  cards: {
    sectionTitle: string
    sectionSubtitle: string
    layout: "grid-2" | "grid-3" | "grid-4"
    items: SBCard[]
  }
  carousel: {
    sectionTitle: string
    autoPlay: boolean
    slides: SBSlide[]
  }
  cta: {
    title: string
    subtitle: string
    btnLabel: string
    btnHref: string
    bgColor: string
    textColor: string
    btnBg: string
    btnText: string
  }
  footer: {
    logoUrl: string
    logoText: string
    tagline: string
    bgColor: string
    textColor: string
    columns: SBFooterCol[]
    social: SBSocial[]
    copyright: string
  }
  visibility: {
    navbar: boolean
    hero: boolean
    cards: boolean
    carousel: boolean
    cta: boolean
    footer: boolean
  }
}

// ─── Actions ──────────────────────────────────────────────────────────────────

export interface SBActions {
  // Palette
  setPalette: (key: keyof SBState["palette"], value: string) => void
  // Navbar
  setNavbar: (patch: Partial<SBState["navbar"]>) => void
  addNavLink: () => void
  updateNavLink: (id: string, patch: Partial<SBNavLink>) => void
  removeNavLink: (id: string) => void
  // Hero
  setHero: (patch: Partial<SBState["hero"]>) => void
  // Cards
  setCards: (patch: Partial<SBState["cards"]>) => void
  addCard: () => void
  updateCard: (id: string, patch: Partial<SBCard>) => void
  removeCard: (id: string) => void
  // Carousel
  setCarousel: (patch: Partial<SBState["carousel"]>) => void
  addSlide: () => void
  updateSlide: (id: string, patch: Partial<SBSlide>) => void
  removeSlide: (id: string) => void
  // CTA
  setCTA: (patch: Partial<SBState["cta"]>) => void
  // Footer
  setFooter: (patch: Partial<SBState["footer"]>) => void
  addFooterCol: () => void
  updateFooterCol: (id: string, title: string) => void
  removeFooterCol: (id: string) => void
  addColLink: (colId: string) => void
  updateColLink: (colId: string, idx: number, patch: { label?: string; href?: string }) => void
  removeColLink: (colId: string, idx: number) => void
  addSocial: () => void
  updateSocial: (id: string, patch: Partial<SBSocial>) => void
  removeSocial: (id: string) => void
  // Visibility
  toggleVisibility: (key: keyof SBState["visibility"]) => void
  // Reset
  resetAll: () => void
}

// ─── Default state ────────────────────────────────────────────────────────────

const DEFAULTS: SBState = {
  palette: {
    primary:   "#2563eb",
    secondary: "#7c3aed",
    accent:    "#f59e0b",
    bg:        "#ffffff",
    text:      "#111827",
    textLight: "#6b7280",
  },
  navbar: {
    logoUrl:   "",
    logoText:  "Mi Empresa",
    bgColor:   "#ffffff",
    textColor: "#111827",
    links: [
      { id: uid(), label: "Inicio",     href: "#inicio"    },
      { id: uid(), label: "Servicios",  href: "#servicios" },
      { id: uid(), label: "Contacto",   href: "#contacto"  },
    ],
    ctaLabel: "Comenzar",
    ctaHref:  "#contacto",
    ctaBg:    "#2563eb",
    ctaText:  "#ffffff",
  },
  hero: {
    bgType:     "gradient",
    bgColor:    "#2563eb",
    bgColor2:   "#7c3aed",
    bgImageUrl: "",
    eyebrow:    "✨ Bienvenido",
    title:      "Tu solución empieza aquí",
    subtitle:   "Diseña, personaliza y publica tu landing sin escribir una sola línea de código.",
    ctaLabel:   "Ver más",
    ctaHref:    "#servicios",
    ctaBg:      "#f59e0b",
    ctaText:    "#111827",
    imageUrl:   "",
    imagePos:   "right",
  },
  cards: {
    sectionTitle:    "¿Qué ofrecemos?",
    sectionSubtitle: "Todo lo que necesitas en un solo lugar.",
    layout:          "grid-3",
    items: [
      { id: uid(), icon: "⚡", title: "Rápido y eficiente",  body: "Resultados en tiempo récord.",          bgColor: "#eff6ff", textColor: "#1e40af", imageUrl: "" },
      { id: uid(), icon: "🎯", title: "Enfocado en ti",      body: "Soluciones totalmente a tu medida.",    bgColor: "#f5f3ff", textColor: "#5b21b6", imageUrl: "" },
      { id: uid(), icon: "🌟", title: "Calidad garantizada", body: "Compromiso con la excelencia siempre.", bgColor: "#fffbeb", textColor: "#92400e", imageUrl: "" },
    ],
  },
  carousel: {
    sectionTitle: "Nuestros proyectos",
    autoPlay:     true,
    slides: [
      { id: uid(), title: "Proyecto Uno",  subtitle: "Una descripción breve del primer proyecto.",   ctaLabel: "Ver más",   ctaHref: "#", bgColor: "#1e3a8a", imageUrl: "" },
      { id: uid(), title: "Proyecto Dos",  subtitle: "Una descripción breve del segundo proyecto.",  ctaLabel: "Conocer",   ctaHref: "#", bgColor: "#4c1d95", imageUrl: "" },
    ],
  },
  cta: {
    title:     "¿Listo para empezar?",
    subtitle:  "Únete a miles de personas que ya confían en nosotros.",
    btnLabel:  "Contáctanos ahora",
    btnHref:   "#contacto",
    bgColor:   "#2563eb",
    textColor: "#ffffff",
    btnBg:     "#f59e0b",
    btnText:   "#111827",
  },
  footer: {
    logoUrl:   "",
    logoText:  "Mi Empresa",
    tagline:   "Construyendo el futuro contigo.",
    bgColor:   "#111827",
    textColor: "#9ca3af",
    columns: [
      { id: uid(), title: "Empresa",   links: [{ label: "Nosotros", href: "#" }, { label: "Equipo",  href: "#" }] },
      { id: uid(), title: "Servicios", links: [{ label: "Producto A", href: "#" }, { label: "Producto B", href: "#" }] },
    ],
    social: [
      { id: uid(), platform: "Instagram", url: "#" },
      { id: uid(), platform: "Facebook",  url: "#" },
    ],
    copyright: "© 2026 Mi Empresa. Todos los derechos reservados.",
  },
  visibility: {
    navbar:   true,
    hero:     true,
    cards:    true,
    carousel: true,
    cta:      true,
    footer:   true,
  },
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useSiteBuilderStore = create<SBState & SBActions>()(
  persist(
    (set) => ({
      ...DEFAULTS,

      // Palette
      setPalette: (key, value) =>
        set((s) => ({ palette: { ...s.palette, [key]: value } })),

      // Navbar
      setNavbar: (patch) =>
        set((s) => ({ navbar: { ...s.navbar, ...patch } })),
      addNavLink: () =>
        set((s) => ({
          navbar: {
            ...s.navbar,
            links: [...s.navbar.links, { id: uid(), label: "Enlace", href: "#" }],
          },
        })),
      updateNavLink: (id, patch) =>
        set((s) => ({
          navbar: {
            ...s.navbar,
            links: s.navbar.links.map((l) => (l.id === id ? { ...l, ...patch } : l)),
          },
        })),
      removeNavLink: (id) =>
        set((s) => ({
          navbar: { ...s.navbar, links: s.navbar.links.filter((l) => l.id !== id) },
        })),

      // Hero
      setHero: (patch) =>
        set((s) => ({ hero: { ...s.hero, ...patch } })),

      // Cards
      setCards: (patch) =>
        set((s) => ({ cards: { ...s.cards, ...patch } })),
      addCard: () =>
        set((s) => ({
          cards: {
            ...s.cards,
            items: [
              ...s.cards.items,
              { id: uid(), icon: "✨", title: "Nueva tarjeta", body: "Descripción de la tarjeta.", bgColor: "#f0fdf4", textColor: "#166534", imageUrl: "" },
            ],
          },
        })),
      updateCard: (id, patch) =>
        set((s) => ({
          cards: {
            ...s.cards,
            items: s.cards.items.map((c) => (c.id === id ? { ...c, ...patch } : c)),
          },
        })),
      removeCard: (id) =>
        set((s) => ({
          cards: { ...s.cards, items: s.cards.items.filter((c) => c.id !== id) },
        })),

      // Carousel
      setCarousel: (patch) =>
        set((s) => ({ carousel: { ...s.carousel, ...patch } })),
      addSlide: () =>
        set((s) => ({
          carousel: {
            ...s.carousel,
            slides: [
              ...s.carousel.slides,
              { id: uid(), title: "Nuevo slide", subtitle: "Descripción del slide.", ctaLabel: "Ver más", ctaHref: "#", bgColor: "#1e3a8a", imageUrl: "" },
            ],
          },
        })),
      updateSlide: (id, patch) =>
        set((s) => ({
          carousel: {
            ...s.carousel,
            slides: s.carousel.slides.map((sl) => (sl.id === id ? { ...sl, ...patch } : sl)),
          },
        })),
      removeSlide: (id) =>
        set((s) => ({
          carousel: { ...s.carousel, slides: s.carousel.slides.filter((sl) => sl.id !== id) },
        })),

      // CTA
      setCTA: (patch) =>
        set((s) => ({ cta: { ...s.cta, ...patch } })),

      // Footer
      setFooter: (patch) =>
        set((s) => ({ footer: { ...s.footer, ...patch } })),
      addFooterCol: () =>
        set((s) => ({
          footer: {
            ...s.footer,
            columns: [...s.footer.columns, { id: uid(), title: "Nueva columna", links: [] }],
          },
        })),
      updateFooterCol: (id, title) =>
        set((s) => ({
          footer: {
            ...s.footer,
            columns: s.footer.columns.map((c) => (c.id === id ? { ...c, title } : c)),
          },
        })),
      removeFooterCol: (id) =>
        set((s) => ({
          footer: { ...s.footer, columns: s.footer.columns.filter((c) => c.id !== id) },
        })),
      addColLink: (colId) =>
        set((s) => ({
          footer: {
            ...s.footer,
            columns: s.footer.columns.map((c) =>
              c.id === colId
                ? { ...c, links: [...c.links, { label: "Enlace", href: "#" }] }
                : c
            ),
          },
        })),
      updateColLink: (colId, idx, patch) =>
        set((s) => ({
          footer: {
            ...s.footer,
            columns: s.footer.columns.map((c) =>
              c.id === colId
                ? { ...c, links: c.links.map((l, i) => (i === idx ? { ...l, ...patch } : l)) }
                : c
            ),
          },
        })),
      removeColLink: (colId, idx) =>
        set((s) => ({
          footer: {
            ...s.footer,
            columns: s.footer.columns.map((c) =>
              c.id === colId ? { ...c, links: c.links.filter((_, i) => i !== idx) } : c
            ),
          },
        })),
      addSocial: () =>
        set((s) => ({
          footer: {
            ...s.footer,
            social: [...s.footer.social, { id: uid(), platform: "Red social", url: "#" }],
          },
        })),
      updateSocial: (id, patch) =>
        set((s) => ({
          footer: {
            ...s.footer,
            social: s.footer.social.map((soc) => (soc.id === id ? { ...soc, ...patch } : soc)),
          },
        })),
      removeSocial: (id) =>
        set((s) => ({
          footer: { ...s.footer, social: s.footer.social.filter((soc) => soc.id !== id) },
        })),

      // Visibility
      toggleVisibility: (key) =>
        set((s) => ({ visibility: { ...s.visibility, [key]: !s.visibility[key] } })),

      // Reset
      resetAll: () => set(DEFAULTS),
    }),
    { name: "sitebuilder-store" }
  )
)
