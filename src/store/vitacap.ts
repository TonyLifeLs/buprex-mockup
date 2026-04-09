/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  VITACAP CMS STORE
 *  Every editable section of the Vitacap G landing page reads its content and
 *  color tokens from this store, making the entire site editable via the CMS.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { vitacapTokens } from "@/components/vitacap/theme"
import type { VitacapTokens } from "@/components/vitacap/theme"

// ─── Section config (order & visibility) ────────────────────────────────────

export type VitacapSectionConfig = {
  id: string
  label: string
  icon: string
  description: string
  enabled: boolean
}

export const DEFAULT_VITACAP_SECTIONS: VitacapSectionConfig[] = [
  { id: "navbar",     label: "Navbar",              icon: "🧭", description: "Navegación principal",                       enabled: true },
  { id: "hero",       label: "Hero",                icon: "🚀", description: "Título y llamado a la acción",               enabled: true },
  { id: "que-es",     label: "¿Qué es Vitacap G?",  icon: "💊", description: "Descripción y pilares de marca",              enabled: true },
  { id: "beneficios", label: "Beneficios",           icon: "⭐", description: "4 cards con beneficios clave",               enabled: true },
  { id: "carousel1",  label: "Activa tu día",        icon: "🎠", description: "Carrusel de estilo de vida activo",           enabled: true },
  { id: "para-quien", label: "¿Para quién es?",      icon: "👥", description: "Perfiles de usuario ideal",                  enabled: true },
  { id: "carousel2",  label: "¿Por qué Vitacap G?",  icon: "🏆", description: "Carrusel de diferenciadores",                enabled: true },
  { id: "como-usarlo",label: "Cómo usarlo",           icon: "📋", description: "Pasos de uso del producto",                 enabled: true },
  { id: "destacado",  label: "Destacado final",      icon: "✨", description: "Cierre con ingredientes destacados",         enabled: true },
  { id: "newsletter", label: "Newsletter",           icon: "📧", description: "Formulario de suscripción",                 enabled: true },
  { id: "footer",     label: "Footer",              icon: "🦶", description: "Pie de página con enlaces",                  enabled: true },
]

// ─── Content types ────────────────────────────────────────────────────────────

export type VitacapBenefitCard = {
  id: string
  title: string
  icon: string
  body: string
  color: string
  image?: string
}

export type VitacapSlide = {
  id: string
  title: string
  description: string
  tag: string
  tone: "gold" | "sand"
  image?: string
}

export type VitacapProfile = {
  id: string
  label: string
  icon: string
  desc: string
}

export type VitacapStep = {
  id: string
  step: string
  title: string
  body: string
  accent: string
}

export type VitacapNavLink = {
  id: string
  label: string
  href: string
}

export type VitacapContent = {
  // ─ Navbar
  navbarCtaLabel: string
  navbarLinks: VitacapNavLink[]
  // ─ Hero
  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
  heroCtaLabel: string
  heroSupport: string
  // ─ ¿Qué es?
  queEsLabel: string
  queEsTitle: string
  queEsDesc: string
  // ─ Beneficios
  beneficiosLabel: string
  beneficiosTitle: string
  benefits: VitacapBenefitCard[]
  // ─ Carrusel 1 — Activa tu día
  carousel1Label: string
  carousel1Title: string
  slidesActivaTuDia: VitacapSlide[]
  // ─ ¿Para quién?
  paraQuienLabel: string
  paraQuienTitle: string
  paraQuienDesc: string
  profiles: VitacapProfile[]
  // ─ Carrusel 2 — ¿Por qué Vitacap G?
  carousel2Label: string
  carousel2Title: string
  slidesPorQueElegir: VitacapSlide[]
  // ─ Cómo usarlo
  comoUsarloLabel: string
  comoUsarloTitle: string
  comoUsarloDesc: string
  steps: VitacapStep[]
  // ─ Destacado final
  highlightLabel: string
  highlightTitle: string
  highlightDesc: string
  highlightTags: string[]
  highlightNote: string
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

export const DEFAULT_VITACAP_NAV_LINKS: VitacapNavLink[] = [
  { id: "n1", label: "Vitacap G",    href: "#vitacap"     },
  { id: "n2", label: "Ingredientes", href: "#ingredientes" },
  { id: "n3", label: "Beneficios",   href: "#beneficios"  },
  { id: "n4", label: "Compra",       href: "#compra"      },
]

export const DEFAULT_VITACAP_BENEFITS: VitacapBenefitCard[] = [
  {
    id: "b1",
    title: "Más energía",
    icon: "⚡",
    body: "Complejo B y ginseng ayudan a sostener la vitalidad durante jornadas exigentes de trabajo, estudio o deporte.",
    color: "#C3311D",
  },
  {
    id: "b2",
    title: "Vitalidad activa",
    icon: "🏃",
    body: "Acompaña estilos de vida activos. Ideal para personas que entrenan, trabajan bajo presión o simplemente no se detienen.",
    color: "#922216",
  },
  {
    id: "b3",
    title: "Bienestar general",
    icon: "🌿",
    body: "Vitaminas A, C, D, E y minerales esenciales para el bienestar cotidiano. Una cápsula, múltiples beneficios.",
    color: "#D35844",
  },
  {
    id: "b4",
    title: "Recuperación rápida",
    icon: "🛡️",
    body: "Contribuye a reponer micronutrientes tras periodos de alto desgaste físico o mental para volver con más fuerza.",
    color: "#671225",
  },
]

export const DEFAULT_SLIDES_ACTIVA: VitacapSlide[] = [
  {
    id: "a1",
    title: "☀️ Empieza con energía",
    description:
      "Una sola cápsula al despertar es todo lo que necesitas. Vitacap G activa tu metabolismo y te prepara para rendir al máximo.",
    tag: "Activa tu día",
    tone: "gold",
  },
  {
    id: "a2",
    title: "🏋️ Para los que no paran",
    description:
      "Diseñado para personas con alta demanda física: deportistas, profesionales y todos los que llevan un ritmo intenso de vida.",
    tag: "Activa tu día",
    tone: "sand",
  },
  {
    id: "a3",
    title: "🧠 Claridad y enfoque",
    description:
      "Complejo B + ginseng para acompañar la concentración y la agilidad mental durante largas jornadas de trabajo o estudio.",
    tag: "Activa tu día",
    tone: "gold",
  },
  {
    id: "a4",
    title: "🌙 Cierra el día fuerte",
    description:
      "Tu cuerpo sigue trabajando mientras descansas. Los nutrientes de Vitacap G apoyan la recuperación para que mañana vuelvas con más.",
    tag: "Activa tu día",
    tone: "sand",
  },
]

export const DEFAULT_SLIDES_PORQUE: VitacapSlide[] = [
  {
    id: "p1",
    title: "✅ Formulado para ti",
    description:
      "Vitaminas, minerales, ginseng y aloe vera en una sola cápsula. Todo lo que tu cuerpo necesita sin complicaciones.",
    tag: "¿Por qué Vitacap G?",
    tone: "gold",
  },
  {
    id: "p2",
    title: "💛 Sello de calidad",
    description:
      "Respaldado por Laboratorios LIFE, con décadas de trayectoria en nutrición y bienestar para toda la familia.",
    tag: "¿Por qué Vitacap G?",
    tone: "sand",
  },
  {
    id: "p3",
    title: "📦 Dosis simple y práctica",
    description:
      "1 cápsula al día, vía oral. Sin sabores ni preparaciones. Solo intégrala en tu rutina y listo.",
    tag: "¿Por qué Vitacap G?",
    tone: "gold",
  },
]

export const DEFAULT_PROFILES: VitacapProfile[] = [
  { id: "pr1", label: "Profesionales exigentes", icon: "💼", desc: "Jornadas largas y alta presión mental." },
  { id: "pr2", label: "Deportistas y activos", icon: "🏆", desc: "Entrenamiento frecuente y desgaste físico." },
  { id: "pr3", label: "Estudiantes intensivos", icon: "📚", desc: "Estudio bajo presión con necesidad de foco." },
  { id: "pr4", label: "Personas en recuperación", icon: "💪", desc: "Reposición de micronutrientes tras periodos de desgaste." },
]

export const DEFAULT_STEPS: VitacapStep[] = [
  {
    id: "s1",
    step: "01",
    title: "Toma 1 cápsula al día",
    body: "Vía oral, de preferencia con el desayuno o la primera comida del día.",
    accent: "#C3311D",
  },
  {
    id: "s2",
    step: "02",
    title: "Sin preparación extra",
    body: "No necesitas mezclas ni preparaciones. Solo agua y tu cápsula de Vitacap G.",
    accent: "#922216",
  },
  {
    id: "s3",
    step: "03",
    title: "Úsalo de forma constante",
    body: "Los beneficios se potencian con el uso continuo. Conviértelo en tu hábito diario de bienestar.",
    accent: "#D35844",
  },
]

export const DEFAULT_VITACAP_CONTENT: VitacapContent = {
  navbarCtaLabel: "Comprar ahora",
  navbarLinks: DEFAULT_VITACAP_NAV_LINKS,
  heroEyebrow: "Vitacap G — Energía y Vitalidad",
  heroTitle: "Activa tu día con la fórmula que te acompaña.",
  heroSubtitle:
    "Vitaminas, minerales, ginseng y aloe vera en una sola cápsula diaria. Para personas activas que buscan sentirse bien todos los días.",
  heroCtaLabel: "Descubre Vitacap G",
  heroSupport: "Sin claims médicos. Complemento nutricional de apoyo al bienestar general.",

  queEsLabel: "¿Qué es Vitacap G?",
  queEsTitle: "Vitalidad, dinamismo y bienestar en una sola cápsula.",
  queEsDesc:
    "Vitacap G es un suplemento multivitamínico diseñado para acompañar tu ritmo de vida. Apoya la energía diaria, reduce la sensación de cansancio y contribuye al bienestar general — perfecto para personas activas con alta demanda física o mental.",

  beneficiosLabel: "Beneficios",
  beneficiosTitle: "Cuatro razones para elegir Vitacap G.",
  benefits: DEFAULT_VITACAP_BENEFITS,

  carousel1Label: "Carrusel — Activa tu día",
  carousel1Title: "Vitacap G está hecho para los que no se detienen.",
  slidesActivaTuDia: DEFAULT_SLIDES_ACTIVA,

  paraQuienLabel: "¿Para quién es Vitacap G?",
  paraQuienTitle: "Hecho para personas activas que exigen más de sí mismas.",
  paraQuienDesc:
    "Si trabajas duro, entrenas fuerte o simplemente llevas un ritmo de vida intenso — Vitacap G es para ti. Diseñado para acompañar a quienes tienen alta demanda física o mental y quieren sentirse bien cada día.",
  profiles: DEFAULT_PROFILES,

  carousel2Label: "Carrusel — ¿Por qué elegir Vitacap G?",
  carousel2Title: "Más que un multivitamínico — es tu ventaja diaria.",
  slidesPorQueElegir: DEFAULT_SLIDES_PORQUE,

  comoUsarloLabel: "Cómo usarlo",
  comoUsarloTitle: "Simple, directo y efectivo.",
  comoUsarloDesc: "Integrar Vitacap G a tu rutina es tan fácil como recordar una sola cápsula al día.",
  steps: DEFAULT_STEPS,

  highlightLabel: "Energía y bienestar",
  highlightTitle: "Reduce el cansancio y activa tu potencial desde adentro.",
  highlightDesc:
    "La fórmula completa de Vitacap G combina vitaminas esenciales, minerales y extractos naturales para apoyar tu energía diaria y bienestar general.",
  highlightTags: ["Ginseng", "Aloe Vera", "Vitamina C", "Complejo B", "Zinc", "Magnesio"],
  highlightNote:
    "Consulta a tu médico si estás tomando medicación psiquiátrica, estrogénicos, esteroides o hipoglicemiantes. Vitacap G es un complemento nutricional, no reemplaza una dieta equilibrada.",
}

export const DEFAULT_VITACAP_STATE = {
  tokens: vitacapTokens,
  content: DEFAULT_VITACAP_CONTENT,
  vitacapSections: DEFAULT_VITACAP_SECTIONS,
}

// ─── Store ────────────────────────────────────────────────────────────────────

export type VitacapState = {
  tokens: VitacapTokens
  content: VitacapContent
  setToken: <K extends keyof VitacapTokens>(key: K, value: string) => void
  setContent: <K extends keyof VitacapContent>(key: K, value: VitacapContent[K]) => void
  // Benefits
  updateBenefit: (id: string, patch: Partial<VitacapBenefitCard>) => void
  addBenefit: () => void
  deleteBenefit: (id: string) => void
  setBenefits: (items: VitacapBenefitCard[]) => void
  // Slides Activa
  updateSlideActiva: (id: string, patch: Partial<VitacapSlide>) => void
  addSlideActiva: () => void
  deleteSlideActiva: (id: string) => void
  setSlidesActiva: (items: VitacapSlide[]) => void
  // Slides PorQue
  updateSlidePorQue: (id: string, patch: Partial<VitacapSlide>) => void
  addSlidePorQue: () => void
  deleteSlidePorQue: (id: string) => void
  setSlidesPorQue: (items: VitacapSlide[]) => void
  // Profiles
  updateProfile: (id: string, patch: Partial<VitacapProfile>) => void
  addProfile: () => void
  deleteProfile: (id: string) => void
  setProfiles: (items: VitacapProfile[]) => void
  // Steps
  updateStep: (id: string, patch: Partial<VitacapStep>) => void
  addStep: () => void
  deleteStep: (id: string) => void
  setSteps: (items: VitacapStep[]) => void
  // Nav links
  updateNavLink: (id: string, patch: Partial<VitacapNavLink>) => void
  addNavLink: () => void
  deleteNavLink: (id: string) => void
  setNavLinks: (items: VitacapNavLink[]) => void
  // Sections
  vitacapSections: VitacapSectionConfig[]
  setVitacapSections: (sections: VitacapSectionConfig[]) => void
  resetAll: () => void
}

export const useVitacapStore = create<VitacapState>()(
  persist(
    (set) => ({
      ...DEFAULT_VITACAP_STATE,

      setToken: (key, value) =>
        set((s) => ({ tokens: { ...s.tokens, [key]: value } })),

      setContent: (key, value) =>
        set((s) => ({ content: { ...s.content, [key]: value } })),

      // ─ Benefits ──────────────────────────────────────────────────────────
      updateBenefit: (id, patch) =>
        set((s) => ({
          content: { ...s.content, benefits: s.content.benefits.map((b) => (b.id === id ? { ...b, ...patch } : b)) },
        })),
      addBenefit: () =>
        set((s) => {
          const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
          return {
            content: {
              ...s.content,
              benefits: [...s.content.benefits, { id, title: "Nuevo beneficio", icon: "✨", body: "Descripción del beneficio.", color: "#C3311D" }],
            },
          }
        }),
      deleteBenefit: (id) =>
        set((s) => ({ content: { ...s.content, benefits: s.content.benefits.filter((b) => b.id !== id) } })),
      setBenefits: (items) =>
        set((s) => ({ content: { ...s.content, benefits: items } })),

      // ─ Slides Activa ─────────────────────────────────────────────────────
      updateSlideActiva: (id, patch) =>
        set((s) => ({
          content: { ...s.content, slidesActivaTuDia: s.content.slidesActivaTuDia.map((sl) => sl.id === id ? { ...sl, ...patch } : sl) },
        })),
      addSlideActiva: () =>
        set((s) => {
          const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
          return {
            content: {
              ...s.content,
              slidesActivaTuDia: [...s.content.slidesActivaTuDia, { id, title: "Nuevo slide", description: "Descripción.", tag: "Activa tu día", tone: "gold" as const }],
            },
          }
        }),
      deleteSlideActiva: (id) =>
        set((s) => ({ content: { ...s.content, slidesActivaTuDia: s.content.slidesActivaTuDia.filter((s) => s.id !== id) } })),
      setSlidesActiva: (items) =>
        set((s) => ({ content: { ...s.content, slidesActivaTuDia: items } })),

      // ─ Slides PorQue ─────────────────────────────────────────────────────
      updateSlidePorQue: (id, patch) =>
        set((s) => ({
          content: { ...s.content, slidesPorQueElegir: s.content.slidesPorQueElegir.map((sl) => sl.id === id ? { ...sl, ...patch } : sl) },
        })),
      addSlidePorQue: () =>
        set((s) => {
          const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
          return {
            content: {
              ...s.content,
              slidesPorQueElegir: [...s.content.slidesPorQueElegir, { id, title: "Nuevo slide", description: "Descripción.", tag: "¿Por qué Vitacap G?", tone: "gold" as const }],
            },
          }
        }),
      deleteSlidePorQue: (id) =>
        set((s) => ({ content: { ...s.content, slidesPorQueElegir: s.content.slidesPorQueElegir.filter((s) => s.id !== id) } })),
      setSlidesPorQue: (items) =>
        set((s) => ({ content: { ...s.content, slidesPorQueElegir: items } })),

      // ─ Profiles ──────────────────────────────────────────────────────────
      updateProfile: (id, patch) =>
        set((s) => ({
          content: { ...s.content, profiles: s.content.profiles.map((p) => p.id === id ? { ...p, ...patch } : p) },
        })),
      addProfile: () =>
        set((s) => {
          const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
          return {
            content: {
              ...s.content,
              profiles: [...s.content.profiles, { id, label: "Nuevo perfil", icon: "👤", desc: "Descripción del perfil." }],
            },
          }
        }),
      deleteProfile: (id) =>
        set((s) => ({ content: { ...s.content, profiles: s.content.profiles.filter((p) => p.id !== id) } })),
      setProfiles: (items) =>
        set((s) => ({ content: { ...s.content, profiles: items } })),

      // ─ Nav links ─────────────────────────────────────────────────────────
      updateNavLink: (id, patch) =>
        set((s) => ({
          content: { ...s.content, navbarLinks: s.content.navbarLinks.map((l) => l.id === id ? { ...l, ...patch } : l) },
        })),
      addNavLink: () =>
        set((s) => {
          const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
          return { content: { ...s.content, navbarLinks: [...s.content.navbarLinks, { id, label: "Nuevo enlace", href: "#" }] } }
        }),
      deleteNavLink: (id) =>
        set((s) => ({ content: { ...s.content, navbarLinks: s.content.navbarLinks.filter((l) => l.id !== id) } })),
      setNavLinks: (items) =>
        set((s) => ({ content: { ...s.content, navbarLinks: items } })),

      // ─ Steps ─────────────────────────────────────────────────────────────
      updateStep: (id, patch) =>
        set((s) => ({
          content: { ...s.content, steps: s.content.steps.map((st) => st.id === id ? { ...st, ...patch } : st) },
        })),
      addStep: () =>
        set((s) => {
          const num = String(s.content.steps.length + 1).padStart(2, "0")
          const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
          return {
            content: {
              ...s.content,
              steps: [...s.content.steps, { id, step: num, title: "Nuevo paso", body: "Descripción del paso.", accent: "#C3311D" }],
            },
          }
        }),
      deleteStep: (id) =>
        set((s) => ({ content: { ...s.content, steps: s.content.steps.filter((st) => st.id !== id) } })),
      setSteps: (items) =>
        set((s) => ({ content: { ...s.content, steps: items } })),

      // ─ Sections ──────────────────────────────────────────────────────────
      setVitacapSections: (sections) => set({ vitacapSections: sections }),

      resetAll: () => set(DEFAULT_VITACAP_STATE),
    }),
    { name: "vitacap-cms-store" }
  )
)
