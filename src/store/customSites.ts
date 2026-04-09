/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CUSTOM SITES STORE
 *  Almacena la lista de sitios publicados por el usuario.
 *  Cada sitio tiene su propia instancia del estado SBState del site builder,
 *  gestionada a través de la acción genérica `patchSite`.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { SBState, SBActions, SBNavLink, SBCard, SBSlide, SBFooterCol, SBSocial } from "@/store/sitebuilder"

function uid(): string {
  return Math.random().toString(36).slice(2, 9)
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CustomSite {
  id: string
  title: string
  accent: string
  slug: string
  createdAt: number
  data: SBState
}

// Default SBState factory for a new site
function makeDefaultData(title: string, accent: string): SBState {
  return {
    palette: {
      primary:   accent,
      secondary: "#7c3aed",
      accent:    "#f59e0b",
      bg:        "#ffffff",
      text:      "#111827",
      textLight: "#6b7280",
    },
    navbar: {
      logoUrl:   "",
      logoText:  title,
      bgColor:   "#ffffff",
      textColor: "#111827",
      links: [
        { id: uid(), label: "Inicio",    href: "#inicio"    },
        { id: uid(), label: "Servicios", href: "#servicios" },
        { id: uid(), label: "Contacto",  href: "#contacto"  },
      ],
      ctaLabel: "Comenzar",
      ctaHref:  "#contacto",
      ctaBg:    accent,
      ctaText:  "#ffffff",
    },
    hero: {
      bgType:     "gradient",
      bgColor:    accent,
      bgColor2:   "#7c3aed",
      bgImageUrl: "",
      eyebrow:    `✨ Bienvenido a ${title}`,
      title:      "Tu solución empieza aquí",
      subtitle:   "Diseña, personaliza y publica tu landing sin escribir código.",
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
        { id: uid(), icon: "⚡", title: "Rápido",    body: "Resultados en tiempo récord.",       bgColor: "#eff6ff", textColor: "#1e40af", imageUrl: "" },
        { id: uid(), icon: "🎯", title: "A medida",  body: "Soluciones personalizadas para ti.", bgColor: "#f5f3ff", textColor: "#5b21b6", imageUrl: "" },
        { id: uid(), icon: "🌟", title: "Calidad",   body: "Compromiso con la excelencia.",     bgColor: "#fffbeb", textColor: "#92400e", imageUrl: "" },
      ],
    },
    carousel: {
      sectionTitle: "Nuestros proyectos",
      autoPlay:     true,
      slides: [
        { id: uid(), title: "Proyecto Uno",  subtitle: "Descripción breve del primer proyecto.",  ctaLabel: "Ver más", ctaHref: "#", bgColor: "#1e3a8a", imageUrl: "" },
        { id: uid(), title: "Proyecto Dos",  subtitle: "Descripción breve del segundo proyecto.", ctaLabel: "Conocer", ctaHref: "#", bgColor: "#4c1d95", imageUrl: "" },
      ],
    },
    cta: {
      title:     "¿Listo para empezar?",
      subtitle:  "Únete a quienes ya confían en nosotros.",
      btnLabel:  "Contáctanos ahora",
      btnHref:   "#contacto",
      bgColor:   accent,
      textColor: "#ffffff",
      btnBg:     "#f59e0b",
      btnText:   "#111827",
    },
    footer: {
      logoUrl:   "",
      logoText:  title,
      tagline:   "Construyendo el futuro contigo.",
      bgColor:   "#111827",
      textColor: "#9ca3af",
      columns: [
        { id: uid(), title: "Empresa",   links: [{ label: "Nosotros", href: "#" }, { label: "Equipo", href: "#" }] },
        { id: uid(), title: "Servicios", links: [{ label: "Producto A", href: "#" }, { label: "Producto B", href: "#" }] },
      ],
      social: [
        { id: uid(), platform: "Instagram", url: "#" },
        { id: uid(), platform: "Facebook",  url: "#" },
      ],
      copyright: `© ${new Date().getFullYear()} ${title}. Todos los derechos reservados.`,
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
}

// ─── Store types ──────────────────────────────────────────────────────────────

interface CustomSitesState {
  sites: CustomSite[]
}

interface CustomSitesActions {
  addSite:    (title: string, accent: string) => string
  removeSite: (id: string) => void
  renameSite: (id: string, title: string) => void
  /** Generic patch — all per-site data mutations go through here */
  patchSite:  (id: string, updater: (data: SBState) => SBState) => void
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useCustomSitesStore = create<CustomSitesState & CustomSitesActions>()(
  persist(
    (set) => ({
      sites: [],

      addSite: (title, accent) => {
        const id = uid()
        const slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") || id
        const site: CustomSite = {
          id,
          title,
          accent,
          slug,
          createdAt: Date.now(),
          data: makeDefaultData(title, accent),
        }
        set((s) => ({ sites: [...s.sites, site] }))
        return id
      },

      removeSite: (id) =>
        set((s) => ({ sites: s.sites.filter((si) => si.id !== id) })),

      renameSite: (id, title) =>
        set((s) => ({
          sites: s.sites.map((si) =>
            si.id === id ? { ...si, title } : si
          ),
        })),

      patchSite: (id, updater) =>
        set((s) => ({
          sites: s.sites.map((si) =>
            si.id === id ? { ...si, data: updater(si.data) } : si
          ),
        })),
    }),
    { name: "custom-sites-store" }
  )
)

// ─── Per-site SBState & SBActions adapter hook ────────────────────────────────
// Returns an object that matches the SBState & SBActions interface for a given
// custom site, so it can be passed directly to <SiteBuilderEditor sb={api} />.

export function useCustomSiteSBApi(siteId: string): (SBState & SBActions) | null {
  const store = useCustomSitesStore()
  const site = store.sites.find((s) => s.id === siteId)
  if (!site) return null

  const patch = (updater: (d: SBState) => SBState) =>
    store.patchSite(siteId, updater)

  return {
    // ── State ──
    ...site.data,

    // ── Palette ──
    setPalette: (key, value) =>
      patch((d) => ({ ...d, palette: { ...d.palette, [key]: value } })),

    // ── Navbar ──
    setNavbar: (p) =>
      patch((d) => ({ ...d, navbar: { ...d.navbar, ...p } })),
    addNavLink: () =>
      patch((d) => ({
        ...d,
        navbar: {
          ...d.navbar,
          links: [...d.navbar.links, { id: uid(), label: "Enlace", href: "#" }],
        },
      })),
    updateNavLink: (id, p) =>
      patch((d) => ({
        ...d,
        navbar: {
          ...d.navbar,
          links: d.navbar.links.map((l: SBNavLink) => (l.id === id ? { ...l, ...p } : l)),
        },
      })),
    removeNavLink: (id) =>
      patch((d) => ({
        ...d,
        navbar: { ...d.navbar, links: d.navbar.links.filter((l: SBNavLink) => l.id !== id) },
      })),

    // ── Hero ──
    setHero: (p) =>
      patch((d) => ({ ...d, hero: { ...d.hero, ...p } })),

    // ── Cards ──
    setCards: (p) =>
      patch((d) => ({ ...d, cards: { ...d.cards, ...p } })),
    addCard: () =>
      patch((d) => ({
        ...d,
        cards: {
          ...d.cards,
          items: [
            ...d.cards.items,
            { id: uid(), icon: "✨", title: "Nueva tarjeta", body: "Descripción.", bgColor: "#f0fdf4", textColor: "#166534", imageUrl: "" },
          ],
        },
      })),
    updateCard: (id, p) =>
      patch((d) => ({
        ...d,
        cards: {
          ...d.cards,
          items: d.cards.items.map((c: SBCard) => (c.id === id ? { ...c, ...p } : c)),
        },
      })),
    removeCard: (id) =>
      patch((d) => ({
        ...d,
        cards: { ...d.cards, items: d.cards.items.filter((c: SBCard) => c.id !== id) },
      })),

    // ── Carousel ──
    setCarousel: (p) =>
      patch((d) => ({ ...d, carousel: { ...d.carousel, ...p } })),
    addSlide: () =>
      patch((d) => ({
        ...d,
        carousel: {
          ...d.carousel,
          slides: [
            ...d.carousel.slides,
            { id: uid(), title: "Nuevo slide", subtitle: "Descripción.", ctaLabel: "Ver más", ctaHref: "#", bgColor: "#1e3a8a", imageUrl: "" },
          ],
        },
      })),
    updateSlide: (id, p) =>
      patch((d) => ({
        ...d,
        carousel: {
          ...d.carousel,
          slides: d.carousel.slides.map((sl: SBSlide) => (sl.id === id ? { ...sl, ...p } : sl)),
        },
      })),
    removeSlide: (id) =>
      patch((d) => ({
        ...d,
        carousel: { ...d.carousel, slides: d.carousel.slides.filter((sl: SBSlide) => sl.id !== id) },
      })),

    // ── CTA ──
    setCTA: (p) =>
      patch((d) => ({ ...d, cta: { ...d.cta, ...p } })),

    // ── Footer ──
    setFooter: (p) =>
      patch((d) => ({ ...d, footer: { ...d.footer, ...p } })),
    addFooterCol: () =>
      patch((d) => ({
        ...d,
        footer: {
          ...d.footer,
          columns: [...d.footer.columns, { id: uid(), title: "Nueva columna", links: [] }],
        },
      })),
    updateFooterCol: (id, title) =>
      patch((d) => ({
        ...d,
        footer: {
          ...d.footer,
          columns: d.footer.columns.map((c: SBFooterCol) => (c.id === id ? { ...c, title } : c)),
        },
      })),
    removeFooterCol: (id) =>
      patch((d) => ({
        ...d,
        footer: { ...d.footer, columns: d.footer.columns.filter((c: SBFooterCol) => c.id !== id) },
      })),
    addColLink: (colId) =>
      patch((d) => ({
        ...d,
        footer: {
          ...d.footer,
          columns: d.footer.columns.map((c: SBFooterCol) =>
            c.id === colId
              ? { ...c, links: [...c.links, { label: "Enlace", href: "#" }] }
              : c
          ),
        },
      })),
    updateColLink: (colId, idx, p) =>
      patch((d) => ({
        ...d,
        footer: {
          ...d.footer,
          columns: d.footer.columns.map((c: SBFooterCol) =>
            c.id === colId
              ? { ...c, links: c.links.map((l, i) => (i === idx ? { ...l, ...p } : l)) }
              : c
          ),
        },
      })),
    removeColLink: (colId, idx) =>
      patch((d) => ({
        ...d,
        footer: {
          ...d.footer,
          columns: d.footer.columns.map((c: SBFooterCol) =>
            c.id === colId
              ? { ...c, links: c.links.filter((_, i) => i !== idx) }
              : c
          ),
        },
      })),
    addSocial: () =>
      patch((d) => ({
        ...d,
        footer: {
          ...d.footer,
          social: [...d.footer.social, { id: uid(), platform: "Redes sociales", url: "#" }],
        },
      })),
    updateSocial: (id, p) =>
      patch((d) => ({
        ...d,
        footer: {
          ...d.footer,
          social: d.footer.social.map((s: SBSocial) => (s.id === id ? { ...s, ...p } : s)),
        },
      })),
    removeSocial: (id) =>
      patch((d) => ({
        ...d,
        footer: { ...d.footer, social: d.footer.social.filter((s: SBSocial) => s.id !== id) },
      })),

    // ── Visibility ──
    toggleVisibility: (key) =>
      patch((d) => ({
        ...d,
        visibility: { ...d.visibility, [key]: !d.visibility[key] },
      })),

    // ── Reset ──
    resetAll: () =>
      patch(() => makeDefaultData(site.title, site.accent)),
  }
}
