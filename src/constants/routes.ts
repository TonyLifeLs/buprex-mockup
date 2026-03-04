/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  APP ROUTES — fuente única de verdad para todas las rutas de la aplicación.
 *
 *  Estructura de páginas (Next.js App Router):
 *    /                  → src/app/page.tsx          (HomePage)
 *    /login             → src/app/login/page.tsx    (LoginPage)
 *    /dashboard         → src/app/dashboard/page.tsx(DashboardPage)
 *    /derma             → src/app/derma/page.tsx    (DermaPage)
 *    /labosuisse        → src/app/labosuisse/page.tsx(LaboSuissePage)
 *
 *  Usar siempre estas constantes; nunca strings sueltos en el código.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Rutas de la aplicación ───────────────────────────────────────────────────

export const APP_ROUTES = {
  /** Página principal / landing */
  home: "/",
  /** Autenticación */
  login: "/login",
  /** Panel de administración / CMS */
  dashboard: "/dashboard",
  /** Mockup Derma */
  derma: "/derma",
  /** Mockup Labo Suisse */
  labosuisse: "/labosuisse",
} as const

// ─── Anclas de sección — Home / Labo Suisse ──────────────────────────────────
/*
 * Se usan en navbars y en links internos de la misma página.
 * Formato: "#<id-del-elemento>" tal como está en el JSX.
 */

export const SECTION_ANCHORS = {
  // ── Home / Landing genérica ──
  home:       "#inicio",
  products:   "#productos",
  contact:    "#contacto",
  articles:   "#articulos",

  // ── Labo Suisse (/labosuisse) ──
  ls_inicio:     "#inicio",
  ls_capilar:    "#capilar",
  ls_piel:       "#piel",
  ls_descubre:   "#descubre",
  ls_tecnologia: "#tecnologia",
  ls_productos:  "#productos",
  ls_marcas:     "#marcas",
  ls_noticias:   "#noticias",
  ls_faq:        "#faq",
  ls_club:       "#club",
} as const

// ─── Tipos derivados ──────────────────────────────────────────────────────────

export type AppRoute      = (typeof APP_ROUTES)[keyof typeof APP_ROUTES]
export type SectionAnchor = (typeof SECTION_ANCHORS)[keyof typeof SECTION_ANCHORS]
