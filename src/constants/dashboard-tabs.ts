/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DASHBOARD TABS
 *  Configuración de las pestañas del panel de administración.
 *  Separado del componente para facilitar mantenimiento.
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
} from "lucide-react"

// ─── Tab type ─────────────────────────────────────────────────────────────────

export type DashboardTab =
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

// ─── Tab definition ───────────────────────────────────────────────────────────

export type TabConfig = {
  id: DashboardTab
  label: string
  icon: ComponentType<{ className?: string }>
  description: string
}

// ─── Tabs list ────────────────────────────────────────────────────────────────

export const DASHBOARD_TABS: TabConfig[] = [
  { id: "builder",   label: "Constructor",   icon: Layers,      description: "Orden y visibilidad" },
  { id: "navbar",    label: "Navbar",        icon: Navigation,  description: "Color, logo, enlaces" },
  { id: "hero",      label: "Hero",          icon: Sparkles,    description: "Carrusel y badges" },
  { id: "symptoms",  label: "Síntomas",      icon: Heart,       description: "Tarjetas de síntomas" },
  { id: "malestars", label: "Malestars",     icon: Users,       description: "Personajes y textos" },
  { id: "products",  label: "Productos",     icon: ShoppingBag, description: "Catálogo de productos" },
  { id: "articles",  label: "Artículos",     icon: FileText,    description: "Blog de salud" },
  { id: "faq",       label: "FAQ",           icon: HelpCircle,  description: "Preguntas frecuentes" },
  { id: "footer",    label: "Footer",        icon: Footprints,  description: "Pie de página" },
  { id: "visual",    label: "Editor Visual", icon: Wand2,       description: "Construye tu página" },
]
