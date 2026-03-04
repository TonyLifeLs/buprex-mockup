/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  LABO SUISSE THEME STORE  (v3 — full-page customizable)
 *  Every section of the LaboSuisse page reads its content from this store,
 *  making the entire site editable via the CMS dashboard.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { create } from "zustand"
import { persist } from "zustand/middleware"

// ─── COLOR TOKENS ─────────────────────────────────────────────────────────────

export type LSColorTokens = {
  lsRed700: string
  lsRed600: string
  lsRed800: string
  brandCrescina: string
  brandFillerina12sp: string
  brandFillerinaColor: string
  brandTransdermic: string
  brandOxytreat: string
  lsGray900: string
  lsGray700: string
  lsGray500: string
  lsGray300: string
  lsGray100: string
  footerBg: string
  brandCaduCrex: string
  brandRinfoltina: string
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

export type LSNavbarConfig = {
  logoWord1: string
  logoWord2: string
  logoWord1Color: string
  logoWord2Color: string
  ctaLabel: string
  ctaHref: string
}

export type LSNavLink = {
  id: string
  label: string
  href: string
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

export type LSHeroSlide = {
  id: string
  tag: string
  title: string
  subtitle: string
  description: string
  cta: string
  ctaHref: string
  ctaSecondary: string
  ctaSecondaryHref: string
  bg: string
  textDark: boolean
  image: string
  badge: string
  badgeBg: string
}

// ─── BANNER ALTERNATE ─────────────────────────────────────────────────────────

export type LSBannerConfig = {
  image: string
  imageAlt: string
  superlabel: string
  title: string
  titleAccent: string
  description: string
  cta1Label: string
  cta1Href: string
  cta2Label: string
  cta2Href: string
}

// ─── BRAND INTRO ──────────────────────────────────────────────────────────────

export type LSBrandIntroConfig = {
  superlabel: string
  title: string
  titleAccent: string
  description: string
  ctaLabel: string
  ctaHref: string
}

// ─── CRESCINA FEATURED ────────────────────────────────────────────────────────

export type LSCrescinaCard = {
  id: string
  title: string
  subtitle: string
  description: string
  accentBg: string
}

export type LSCrescinaFeaturedConfig = {
  superlabel: string
  sectionTitle: string
  mainImage: string
  mainImageAlt: string
  mainTitle: string
  mainSubtitle: string
  mainDescription: string
  mainCta: string
  mainCtaHref: string
  supportingCards: LSCrescinaCard[]
}

// ─── CATEGORIES GRID ──────────────────────────────────────────────────────────

export type LSCategoryCard = {
  id: string
  href: string
  label: string
  description: string
  bg: string
  image: string
}

export type LSBrandCard = {
  id: string
  brand: string
  bg: string
  description: string
  href: string
}

export type LSCategoriesConfig = {
  superlabel: string
  sectionTitle: string
  brandsSuperlabel: string
  brandsSectionTitle: string
  categories: LSCategoryCard[]
  brands: LSBrandCard[]
}

// ─── NEWS CAROUSEL ────────────────────────────────────────────────────────────

export type LSNewsItem = {
  id: string
  date: string
  category: string
  title: string
  excerpt: string
  image: string
  href: string
}

export type LSNewsConfig = {
  superlabel: string
  sectionTitle: string
  items: LSNewsItem[]
}

// ─── FAQ ACCORDION ────────────────────────────────────────────────────────────

export type LSFAQItem = {
  id: string
  question: string
  answer: string
}

export type LSFAQConfig = {
  superlabel: string
  sectionTitle: string
  items: LSFAQItem[]
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────

export type LSNewsletterConfig = {
  superlabel: string
  title: string
  tagline: string
  description: string
  namePlaceholder: string
  emailPlaceholder: string
  consentText: string
  ctaLabel: string
  successTitle: string
  successDescription: string
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

export type LSFooterLink = {
  id: string
  label: string
  href: string
}

export type LSFooterColumn = {
  id: string
  title: string
  links: LSFooterLink[]
}

export type LSFooterConfig = {
  logoWord1: string
  logoWord2: string
  tagline: string
  instagram: string
  facebook: string
  linkedin: string
  columns: LSFooterColumn[]
  copyright: string
  bottomLinks: LSFooterLink[]
}

// ─── FULL STATE ───────────────────────────────────────────────────────────────

export type LSState = {
  colors: LSColorTokens
  navbar: LSNavbarConfig
  navLinks: LSNavLink[]
  heroSlides: LSHeroSlide[]
  banner: LSBannerConfig
  brandIntro: LSBrandIntroConfig
  crescinaFeatured: LSCrescinaFeaturedConfig
  categories: LSCategoriesConfig
  news: LSNewsConfig
  faq: LSFAQConfig
  newsletter: LSNewsletterConfig
  footer: LSFooterConfig
}

export type LSActions = {
  updateColors: (patch: Partial<LSColorTokens>) => void
  updateNavbar: (patch: Partial<LSNavbarConfig>) => void
  setNavLinks: (links: LSNavLink[]) => void
  setHeroSlides: (slides: LSHeroSlide[]) => void
  updateBanner: (patch: Partial<LSBannerConfig>) => void
  updateBrandIntro: (patch: Partial<LSBrandIntroConfig>) => void
  updateCrescinaFeatured: (patch: Partial<LSCrescinaFeaturedConfig>) => void
  updateCategories: (patch: Partial<LSCategoriesConfig>) => void
  updateNews: (patch: Partial<LSNewsConfig>) => void
  updateFAQ: (patch: Partial<LSFAQConfig>) => void
  updateNewsletter: (patch: Partial<LSNewsletterConfig>) => void
  updateFooter: (patch: Partial<LSFooterConfig>) => void
  resetAll: () => void
}

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

export const DEFAULT_LS_COLORS: LSColorTokens = {
  lsRed700: "#B52A2D",
  lsRed600: "#A43534",
  lsRed800: "#7A2525",
  brandCrescina: "#D6AB41",
  brandFillerina12sp: "#DFB1BE",
  brandFillerinaColor: "#DDCCDC",
  brandTransdermic: "#F7F7DB",
  brandOxytreat: "#B2C3C4",
  lsGray900: "#212121",
  lsGray700: "#616161",
  lsGray500: "#9E9E9E",
  lsGray300: "#E0E0E0",
  lsGray100: "#F5F5F5",
  footerBg: "#212121",
  brandCaduCrex: "#B2C3C4",
  brandRinfoltina: "#DFB1BE",
}

export const DEFAULT_LS_NAVBAR: LSNavbarConfig = {
  logoWord1: "LABO",
  logoWord2: "SUISSE",
  logoWord1Color: "#000000",
  logoWord2Color: "#616161",
  ctaLabel: "Descubre Labo",
  ctaHref: "#descubre",
}

export const DEFAULT_LS_NAV_LINKS: LSNavLink[] = [
  { id: "ls1", label: "Cuidado Capilar", href: "#capilar" },
  { id: "ls2", label: "Cuidado de la Piel", href: "#piel" },
  { id: "ls3", label: "Descubre Labo", href: "#descubre" },
  { id: "ls4", label: "Tecnología Transdérmica", href: "#tecnologia" },
  { id: "ls5", label: "Productos", href: "#productos" },
  { id: "ls6", label: "All Brands", href: "#marcas" },
]

export const DEFAULT_LS_HERO_SLIDES: LSHeroSlide[] = [
  {
    id: "slide-1",
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
    id: "slide-2",
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

export const DEFAULT_LS_BANNER: LSBannerConfig = {
  image: "/images/mejillas.webp",
  imageAlt: "Tecnología Transdérmica Labo Suisse",
  superlabel: "NO INJECTIONS · YES TRANSDERMIC TECHNOLOGY",
  title: "Belleza sin agujas,",
  titleAccent: "resultados sin arrugas",
  description:
    "Labo lidera la vanguardia de la medicina estética, desarrollando productos innovadores y patentados capaces de alcanzar los mejores resultados naturales — sin inyecciones y sin procedimientos invasivos.",
  cta1Label: "Ver más",
  cta1Href: "#tecnologia",
  cta2Label: "Ver productos",
  cta2Href: "#productos",
}

export const DEFAULT_LS_BRAND_INTRO: LSBrandIntroConfig = {
  superlabel: "DESDE 1986",
  title: "Innovación dermocosmética",
  titleAccent: "para la piel y el cabello",
  description:
    "Labo Suisse es un laboratorio dermocosméutico de referencia mundial, especializado en el desarrollo de tratamientos sin inyecciones para el cuidado avanzado de la piel y el cabello. Nuestros productos combinan investigación científica rigurosa con tecnología transdérmica patentada, llevando activos de alta eficacia a las capas profundas donde realmente se origina el envejecimiento.",
  ctaLabel: "Descubre Labo",
  ctaHref: "#descubre",
}

export const DEFAULT_LS_CRESCINA_FEATURED: LSCrescinaFeaturedConfig = {
  superlabel: "CUIDADO CAPILAR",
  sectionTitle: "Destacado: Crescina",
  mainImage: "/images/crescina-product.webp",
  mainImageAlt: "Crescina tratamiento capilar",
  mainTitle: "Crescina HFSC 100%",
  mainSubtitle: "Cuidado Capilar",
  mainDescription:
    "El tratamiento dermocosmético más avanzado para el recrecimiento capilar. Eficacia clínicamente comprobada en el 100% de los pacientes testados.",
  mainCta: "Productos",
  mainCtaHref: "#capilar",
  supportingCards: [
    {
      id: "card-1",
      title: "Crescina Re-Growth",
      subtitle: "Tratamiento de Recrecimiento",
      description: "Protocolo de 3 meses para reactivar el folículo capilar y frenar la caída.",
      accentBg: "var(--brand-cadu-crex)",
    },
    {
      id: "card-2",
      title: "Crescina HFSC Shampoo",
      subtitle: "Limpieza activa",
      description: "Shampoo con factores de crecimiento para complementar el tratamiento diario.",
      accentBg: "var(--brand-rinfoltina)",
    },
  ],
}

export const DEFAULT_LS_CATEGORIES: LSCategoriesConfig = {
  superlabel: "EXPLORAR",
  sectionTitle: "Categorías principales",
  brandsSuperlabel: "NUESTRAS MARCAS",
  brandsSectionTitle: "Líneas especializadas",
  categories: [
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
  ],
  brands: [
    {
      id: "brand-crescina",
      brand: "Crescina",
      bg: "var(--brand-crescina)",
      description: "Tratamiento dermocosmético para el recrecimiento y la salud capilar.",
      href: "#capilar",
    },
    {
      id: "brand-fillerina",
      brand: "Fillerina",
      bg: "var(--brand-fillerina-color)",
      description: "La alternativa sin inyecciones al tratamiento estético profesional.",
      href: "#piel",
    },
    {
      id: "brand-transdermic",
      brand: "Transdermic",
      bg: "var(--brand-transdermic)",
      description: "Sistema transdérmico de absorción profunda para resultados visibles.",
      href: "#tecnologia",
    },
  ],
}

export const DEFAULT_LS_NEWS: LSNewsConfig = {
  superlabel: "NOTICIAS",
  sectionTitle: "Magazine Labo",
  items: [
    {
      id: "news-1",
      date: "12 Ene 2026",
      category: "Innovación",
      title: "Fillerina 12HA: Nueva fórmula con doce tipos de ácido hialurónico",
      excerpt:
        "La nueva generación de ácido hialurónico penetra en todas las capas de la dermis para un efecto de relleno sin precedentes.",
      image: "/images/fillerina-product.webp",
      href: "#",
    },
    {
      id: "news-2",
      date: "08 Dic 2025",
      category: "Capilar",
      title: "Crescina HFSC 100% actualiza su protocolo de aplicación",
      excerpt:
        "El tratamiento más avanzado contra la alopecia difusa incorpora nuevas instrucciones de uso para maximizar los resultados.",
      image: "/images/crescina-product.webp",
      href: "#",
    },
    {
      id: "news-3",
      date: "20 Nov 2025",
      category: "Tecnología",
      title: "Tecnología Transdérmica: cómo penetra donde otras cremas no llegan",
      excerpt:
        "Un recorrido por la ciencia detrás del sistema de transporte transdérmico patentado por Labo Suisse.",
      image: "/images/mejillas.webp",
      href: "#",
    },
  ],
}

export const DEFAULT_LS_FAQ: LSFAQConfig = {
  superlabel: "PREGUNTAS FRECUENTES",
  sectionTitle: "FAQ",
  items: [
    {
      id: "faq-1",
      question: "¿En qué consiste la tecnología transdérmica de Labo Suisse?",
      answer:
        "La tecnología transdérmica de Labo Suisse permite que los principios activos penetren en las capas profundas de la dermis gracias a sistemas de transporte patentados. A diferencia de las cremas convencionales que actúan solo en la superficie, nuestros productos trabajan donde realmente se origina el envejecimiento o la caída del cabello.",
    },
    {
      id: "faq-2",
      question: "¿Son seguros los tratamientos Fillerina para uso doméstico?",
      answer:
        "Sí. Todos los productos Fillerina han sido dermatológicamente testados y son aptos para uso doméstico. No contienen componentes inyectables ni requieren asistencia de un profesional. Su fórmula patentada garantiza seguridad y eficacia comprobada clínicamente.",
    },
    {
      id: "faq-3",
      question: "¿Cuánto tiempo tarda en verse el resultado de Crescina?",
      answer:
        "Los primeros resultados visibles de Crescina suelen observarse a partir de las 4–6 semanas de uso regular. Los resultados óptimos se obtienen completando el ciclo de tratamiento recomendado de 3 meses, con posibilidad de realizar ciclos de mantenimiento.",
    },
    {
      id: "faq-4",
      question: "¿Puedo usar Labo Suisse si tengo piel sensible?",
      answer:
        "Nuestros productos están formulados sin parabenos, sin colorantes artificiales y han sido testados dermatológicamente. Sin embargo, siempre recomendamos revisar la lista de ingredientes completa y realizar una prueba de tolerancia en la cara interna del antebrazo antes del primer uso.",
    },
    {
      id: "faq-5",
      question: "¿Dónde puedo adquirir los productos en Chile?",
      answer:
        "Los productos Labo Suisse están disponibles en farmacias seleccionadas y en nuestra tienda online. Escribe a nuestro equipo a través del formulario de contacto para conocer el punto de venta más cercano a tu ubicación.",
    },
  ],
}

export const DEFAULT_LS_NEWSLETTER: LSNewsletterConfig = {
  superlabel: "LABO CLUB",
  title: "Sé parte de un club exclusivo",
  tagline: "SÉ PARTE DE UN CLUB EXCLUSIVO",
  description:
    "Recibe información, novedades, concursos y eventos exclusivos junto a las últimas innovaciones dermocosméticas de Labo Suisse.",
  namePlaceholder: "Tu nombre",
  emailPlaceholder: "tu@correo.com",
  consentText:
    "He leído la información sobre el tratamiento de datos personales y acepto recibir comunicaciones de Labo Suisse Chile.",
  ctaLabel: "Suscríbete",
  successTitle: "¡Bienvenido/a al Labo Club!",
  successDescription: "Pronto recibirás nuestras novedades en tu correo.",
}

export const DEFAULT_LS_FOOTER: LSFooterConfig = {
  logoWord1: "LABO",
  logoWord2: "SUISSE",
  tagline:
    "Innovación dermocosmética para el cuidado de la piel y el cabello desde 1986. Tecnología transdérmica sin inyecciones.",
  instagram: "#",
  facebook: "#",
  linkedin: "#",
  columns: [
    {
      id: "col-products",
      title: "PRODUCTOS",
      links: [
        { id: "fp-1", label: "Cuidado de la Piel", href: "#piel" },
        { id: "fp-2", label: "Cuidado Capilar", href: "#capilar" },
        { id: "fp-3", label: "Fillerina", href: "#piel" },
        { id: "fp-4", label: "Crescina", href: "#capilar" },
        { id: "fp-5", label: "Transdermic", href: "#tecnologia" },
      ],
    },
    {
      id: "col-company",
      title: "DESCUBRE LABO",
      links: [
        { id: "fc-1", label: "Tecnología Transdérmica", href: "#tecnologia" },
        { id: "fc-2", label: "Sobre Labo", href: "#descubre" },
        { id: "fc-3", label: "Labo Club", href: "#club" },
        { id: "fc-4", label: "Contacto", href: "#" },
        { id: "fc-5", label: "Privacidad", href: "#" },
      ],
    },
  ],
  copyright: "© {year} Labo Suisse Chile. Todos los derechos reservados.",
  bottomLinks: [
    { id: "bl-1", label: "Privacidad", href: "#" },
    { id: "bl-2", label: "Términos", href: "#" },
    { id: "bl-3", label: "Cookies", href: "#" },
  ],
}

// ─── DEFAULT STATE ────────────────────────────────────────────────────────────

export const DEFAULT_LS_STATE: LSState = {
  colors: DEFAULT_LS_COLORS,
  navbar: DEFAULT_LS_NAVBAR,
  navLinks: DEFAULT_LS_NAV_LINKS,
  heroSlides: DEFAULT_LS_HERO_SLIDES,
  banner: DEFAULT_LS_BANNER,
  brandIntro: DEFAULT_LS_BRAND_INTRO,
  crescinaFeatured: DEFAULT_LS_CRESCINA_FEATURED,
  categories: DEFAULT_LS_CATEGORIES,
  news: DEFAULT_LS_NEWS,
  faq: DEFAULT_LS_FAQ,
  newsletter: DEFAULT_LS_NEWSLETTER,
  footer: DEFAULT_LS_FOOTER,
}

// ─── STORE ────────────────────────────────────────────────────────────────────

export const useLaboSuisseStore = create<LSState & LSActions>()(
  persist(
    (set) => ({
      ...DEFAULT_LS_STATE,

      updateColors: (patch) =>
        set((s) => ({ colors: { ...s.colors, ...patch } })),

      updateNavbar: (patch) =>
        set((s) => ({ navbar: { ...s.navbar, ...patch } })),

      setNavLinks: (links) => set({ navLinks: links }),

      setHeroSlides: (slides) => set({ heroSlides: slides }),

      updateBanner: (patch) =>
        set((s) => ({ banner: { ...s.banner, ...patch } })),

      updateBrandIntro: (patch) =>
        set((s) => ({ brandIntro: { ...s.brandIntro, ...patch } })),

      updateCrescinaFeatured: (patch) =>
        set((s) => ({ crescinaFeatured: { ...s.crescinaFeatured, ...patch } })),

      updateCategories: (patch) =>
        set((s) => ({ categories: { ...s.categories, ...patch } })),

      updateNews: (patch) =>
        set((s) => ({ news: { ...s.news, ...patch } })),

      updateFAQ: (patch) =>
        set((s) => ({ faq: { ...s.faq, ...patch } })),

      updateNewsletter: (patch) =>
        set((s) => ({ newsletter: { ...s.newsletter, ...patch } })),

      updateFooter: (patch) =>
        set((s) => ({ footer: { ...s.footer, ...patch } })),

      resetAll: () => set(DEFAULT_LS_STATE),
    }),
    { name: "ls-cms-store" }
  )
)

// ─── Helper: tokens → inline CSS vars ────────────────────────────────────────

export function lsColorsToCSSVars(c: LSColorTokens): React.CSSProperties {
  return {
    "--ls-red-700": c.lsRed700,
    "--ls-red-600": c.lsRed600,
    "--ls-red-800": c.lsRed800,
    "--brand-crescina": c.brandCrescina,
    "--brand-fillerina-12sp": c.brandFillerina12sp,
    "--brand-fillerina-color": c.brandFillerinaColor,
    "--brand-transdermic": c.brandTransdermic,
    "--brand-oxytreat": c.brandOxytreat,
    "--brand-cadu-crex": c.brandCaduCrex,
    "--brand-rinfoltina": c.brandRinfoltina,
    "--ls-gray-900": c.lsGray900,
    "--ls-gray-700": c.lsGray700,
    "--ls-gray-500": c.lsGray500,
    "--ls-gray-300": c.lsGray300,
    "--ls-gray-100": c.lsGray100,
    "--ls-footer-bg": c.footerBg,
  } as React.CSSProperties
}
