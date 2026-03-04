/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CMS TYPES
 *  Definición de todos los tipos de datos del CMS.
 *  Importar desde aquí en el store, componentes y páginas.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Shared ───────────────────────────────────────────────────────────────────

export type ID = string

// ─── Navbar ───────────────────────────────────────────────────────────────────

export type NavLink = {
  id: ID
  label: string
  href: string
}

export type NavbarConfig = {
  bgColor: string
  logoUrl: string
  links: NavLink[]
}

// ─── Sections (order + visibility) ────────────────────────────────────────────

export type SectionId =
  | "hero"
  | "symptoms"
  | "malestars"
  | "products"
  | "pharma-info"
  | "articles"
  | "faq"
  | "footer"

export type SectionConfig = {
  id: SectionId
  label: string
  description: string
  enabled: boolean
  icon: string
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export type HeroSlide = {
  id: ID
  tag: string
  title: string
  highlight: string
  description: string
  badge1: string
  badge2: string
  image: string
  bgImage: string
  bgColor: string
  bgOpacity: number
  bgMode: "full" | "right"
}

export type TrustBadge = {
  id: ID
  title: string
  description: string
  color: string
}

// ─── Symptoms ─────────────────────────────────────────────────────────────────

export type SymptomItem = {
  id: ID
  image: string
  title: string
  description: string
  accentColor: string
}

// ─── Malestars ────────────────────────────────────────────────────────────────

export type MalestarItem = {
  id: ID
  name: string
  image: string
  description: string
}

export type MalestarsConfig = {
  tagline: string
  subtitle: string
  logoImage: string
  items: MalestarItem[]
}

// ─── Products ─────────────────────────────────────────────────────────────────

export type ProductItem = {
  id: ID
  name: string
  subtitle: string
  image: string
  description: string
  accentColor: string
  isAdult: boolean
  variant: string
}

// ─── Articles ─────────────────────────────────────────────────────────────────

export type ArticleItem = {
  id: ID
  title: string
  subtitle: string
  image: string
  category: string
  intro: string
  causes: string
  solutions: string
  tip: string
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export type FAQItem = {
  id: ID
  question: string
  answer: string
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export type FooterConfig = {
  bgColor: string
  website: string
  disclaimer: string
  registrationInfo: string
  youtube: string
  facebook: string
  instagram: string
}

// ─── Visual Page Builder ──────────────────────────────────────────────────────

export type VisualBlockType =
  | "navbar"
  | "hero-banner"
  | "heading"
  | "paragraph"
  | "image-block"
  | "button-block"
  | "two-column"
  | "card-grid"
  | "divider"
  | "spacer"
  | "cta-banner"
  | "accordion"
  | "footer-block"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VisualBlock = { id: ID; type: VisualBlockType; props: Record<string, any> }

// ─── Full CMS State ───────────────────────────────────────────────────────────

export type CMSState = {
  navbar: NavbarConfig
  sections: SectionConfig[]
  visualBlocks: VisualBlock[]
  heroSlides: HeroSlide[]
  trustBadges: TrustBadge[]
  symptoms: SymptomItem[]
  malestars: MalestarsConfig
  products: ProductItem[]
  articles: ArticleItem[]
  faqs: FAQItem[]
  footer: FooterConfig
}

// ─── Store Actions ────────────────────────────────────────────────────────────

export type CMSActions = {
  // Navbar
  updateNavbar: (navbar: Partial<NavbarConfig>) => void
  setNavLinks: (links: NavLink[]) => void
  // Sections
  setSections: (sections: SectionConfig[]) => void
  // Hero
  setHeroSlides: (slides: HeroSlide[]) => void
  updateHeroSlide: (id: ID, slide: Partial<HeroSlide>) => void
  addHeroSlide: () => void
  deleteHeroSlide: (id: ID) => void
  setTrustBadges: (badges: TrustBadge[]) => void
  updateTrustBadge: (id: ID, badge: Partial<TrustBadge>) => void
  // Symptoms
  setSymptoms: (items: SymptomItem[]) => void
  updateSymptom: (id: ID, item: Partial<SymptomItem>) => void
  addSymptom: () => void
  deleteSymptom: (id: ID) => void
  // Malestars
  updateMalestars: (cfg: Partial<MalestarsConfig>) => void
  setMalestarItems: (items: MalestarItem[]) => void
  updateMalestarItem: (id: ID, item: Partial<MalestarItem>) => void
  // Products
  setProducts: (items: ProductItem[]) => void
  updateProduct: (id: ID, item: Partial<ProductItem>) => void
  addProduct: () => void
  deleteProduct: (id: ID) => void
  // Articles
  setArticles: (items: ArticleItem[]) => void
  updateArticle: (id: ID, item: Partial<ArticleItem>) => void
  addArticle: () => void
  deleteArticle: (id: ID) => void
  // FAQ
  setFAQs: (items: FAQItem[]) => void
  updateFAQ: (id: ID, item: Partial<FAQItem>) => void
  addFAQ: () => void
  deleteFAQ: (id: ID) => void
  // Footer
  updateFooter: (footer: Partial<FooterConfig>) => void
  // Visual Page Builder
  setVisualBlocks: (blocks: VisualBlock[]) => void
  addVisualBlock: (type: VisualBlockType, atIndex?: number) => void
  updateVisualBlock: (id: ID, props: Record<string, unknown>) => void
  removeVisualBlock: (id: ID) => void
  // Reset
  resetAll: () => void
}
