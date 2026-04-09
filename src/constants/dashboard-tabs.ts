/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DASHBOARD TABS
 *  Configuración de las pestañas del panel de administración,
 *  agrupadas por sitio (sección de acordeón en el sidebar).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { ComponentType } from "react"
import {
  Layers,
  Navigation,
  Sparkles,
  Heart,
  Users,
  ShoppingBag,
  FileText,
  HelpCircle,
  Footprints,
  Wand2,
  Palette,
  Stethoscope,
  Zap,
  Globe,
  ImagePlay,
  LayoutList,
  BookOpen,
  Star,
  Tv2,
  Newspaper,
  PenTool,
} from "lucide-react"

// ─── Site sections ────────────────────────────────────────────────────────────

export type SiteSection = "buprex" | "derma" | "labosuisse" | "vitacap" | "misitio"

export type SectionConfig = {
  id: SiteSection
  label: string
  /** Tailwind / hex accent used for the section header pill */
  accent: string
  previewHref: string
}

export const SITE_SECTIONS: SectionConfig[] = [
  { id: "buprex",     label: "Sitio Buprex",        accent: "#0099d6", previewHref: "/"            },
  { id: "derma",      label: "Sitio Derma",          accent: "#7c3aed", previewHref: "/derma"       },
  { id: "labosuisse", label: "Sitio Labo Suisse",    accent: "#B52A2D", previewHref: "/labosuisse"  },
  { id: "vitacap",    label: "Sitio Vitacap G",      accent: "#C3311D", previewHref: "/vitacap"     },
  { id: "misitio",    label: "✦ Crear tu sitio",     accent: "#7c3aed", previewHref: "/mi-sitio"    },
]

// ─── Tab type ─────────────────────────────────────────────────────────────────

export type DashboardTab =
  // Mi Sitio
  | "sb-builder"
  // Buprex
  | "builder"
  | "navbar"
  | "hero"
  | "symptoms"
  | "malestars"
  | "products"
  | "articles"
  | "faq"
  | "footer"
  | "visual"
  // Derma
  | "derma-overview"
  // Labo Suisse
  | "ls-constructor"
  | "ls-colores"
  | "ls-navbar"
  | "ls-hero"
  | "ls-contenido"
  | "ls-noticias"
  | "ls-footer"
  // Vitacap G
  | "vitacap-constructor"
  | "vitacap-navbar"
  | "vitacap-colores"
  | "vitacap-hero"
  | "vitacap-beneficios"
  | "vitacap-carruseles"
  | "vitacap-secciones"

// ─── Tab definition ───────────────────────────────────────────────────────────

export type TabConfig = {
  id: DashboardTab
  label: string
  icon: ComponentType<{ className?: string }>
  description: string
  section: SiteSection
}

// ─── Tabs list ────────────────────────────────────────────────────────────────

export const DASHBOARD_TABS: TabConfig[] = [
  // ── Buprex ──
  { id: "builder",       section: "buprex",     label: "Constructor",    icon: Layers,       description: "Orden y visibilidad"       },
  { id: "navbar",        section: "buprex",     label: "Navbar",         icon: Navigation,   description: "Color, logo, enlaces"      },
  { id: "hero",          section: "buprex",     label: "Hero",           icon: Sparkles,     description: "Carrusel y badges"         },
  { id: "symptoms",      section: "buprex",     label: "Síntomas",       icon: Heart,        description: "Tarjetas de síntomas"      },
  { id: "malestars",     section: "buprex",     label: "Malestars",      icon: Users,        description: "Personajes y textos"       },
  { id: "products",      section: "buprex",     label: "Productos",      icon: ShoppingBag,  description: "Catálogo de productos"     },
  { id: "articles",      section: "buprex",     label: "Artículos",      icon: FileText,     description: "Blog de salud"             },
  { id: "faq",           section: "buprex",     label: "FAQ",            icon: HelpCircle,   description: "Preguntas frecuentes"      },
  { id: "footer",        section: "buprex",     label: "Footer",         icon: Footprints,   description: "Pie de página"             },
  { id: "visual",        section: "buprex",     label: "Editor Visual",  icon: Wand2,        description: "Construye tu página"       },
  // ── Derma ──
  { id: "derma-overview", section: "derma",     label: "Vista general",  icon: Stethoscope,  description: "Resumen del sitio Derma"   },
  // ── Labo Suisse ──
  { id: "ls-constructor",  section: "labosuisse", label: "Constructor",     icon: Layers,       description: "Orden y visibilidad de secciones" },
  { id: "ls-colores",     section: "labosuisse", label: "Colores",       icon: Palette,      description: "Paleta, líneas, grises"     },
  { id: "ls-navbar",      section: "labosuisse", label: "Navbar",        icon: Navigation,   description: "Logo, CTAs, enlaces"        },
  { id: "ls-hero",        section: "labosuisse", label: "Hero",          icon: Tv2,          description: "Diapositivas del carrusel" },
  { id: "ls-contenido",   section: "labosuisse", label: "Contenido",     icon: LayoutList,   description: "Banner, intro, Crescina"    },
  { id: "ls-noticias",    section: "labosuisse", label: "Noticias & FAQ", icon: Newspaper,    description: "Artículos y preguntas"     },
  { id: "ls-footer",      section: "labosuisse", label: "Footer",        icon: Footprints,   description: "Logo, social, columnas"    },
  // ── Vitacap G ──
  { id: "vitacap-constructor", section: "vitacap",  label: "Constructor",  icon: Layers,       description: "Orden y visibilidad de secciones" },
  { id: "vitacap-navbar",      section: "vitacap",  label: "Navbar",       icon: Navigation,   description: "CTA, logo y enlaces"              },
  { id: "vitacap-colores",    section: "vitacap",  label: "Colores",      icon: Palette,      description: "Paleta oficial de marca"    },
  { id: "vitacap-hero",       section: "vitacap",  label: "Hero",         icon: Sparkles,     description: "Título, subtítulo, CTA"    },
  { id: "vitacap-beneficios", section: "vitacap",  label: "Beneficios",   icon: Star,         description: "4 cards con color propio"  },
  { id: "vitacap-carruseles", section: "vitacap",  label: "Carruseles",   icon: ImagePlay,    description: "Activa tu día y Por qué"   },
  { id: "vitacap-secciones",  section: "vitacap",  label: "Secciones",    icon: BookOpen,     description: "¿Qué es?, Para quién, Uso" },
  // ── Mi Sitio ──
  { id: "sb-builder",         section: "misitio",  label: "Constructor",  icon: PenTool,      description: "Navbar, Hero, Cards, Footer" },
]
