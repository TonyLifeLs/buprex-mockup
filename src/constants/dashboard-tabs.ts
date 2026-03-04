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
} from "lucide-react"

// ─── Site sections ────────────────────────────────────────────────────────────

export type SiteSection = "buprex" | "derma" | "labosuisse"

export type SectionConfig = {
  id: SiteSection
  label: string
  /** Tailwind / hex accent used for the section header pill */
  accent: string
  previewHref: string
}

export const SITE_SECTIONS: SectionConfig[] = [
  { id: "buprex",     label: "Sitio Buprex",      accent: "#0099d6", previewHref: "/"            },
  { id: "derma",      label: "Sitio Derma",        accent: "#7c3aed", previewHref: "/derma"       },
  { id: "labosuisse", label: "Sitio Labo Suisse",  accent: "#B52A2D", previewHref: "/labosuisse"  },
]

// ─── Tab type ─────────────────────────────────────────────────────────────────

export type DashboardTab =
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
  | "labosuisse"

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
  { id: "labosuisse",    section: "labosuisse", label: "Tema & Colores", icon: Palette,      description: "Colores, logo, navegación" },
]
