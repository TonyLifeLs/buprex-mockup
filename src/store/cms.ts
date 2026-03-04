/**
 * 
 *  CMS ZUSTAND STORE
 *  Solo contiene lógica de estado (acciones).
 *  Tipos   @/types/cms
 *  Datos   @/constants/cms-defaults
 * 
 */

import { create } from "zustand"
import { persist } from "zustand/middleware"

import type {
  CMSState,
  CMSActions,
  ID,
  NavLink,
  NavbarConfig,
  SectionConfig,
  HeroSlide,
  TrustBadge,
  SymptomItem,
  MalestarsConfig,
  MalestarItem,
  ProductItem,
  ArticleItem,
  FAQItem,
  FooterConfig,
  VisualBlock,
  VisualBlockType,
} from "@/types/cms"

import { DEFAULT_CMS_STATE, createDefaultVisualBlock } from "@/constants/cms-defaults"

// Re-export for convenience so existing imports still work
export type {
  CMSState,
  CMSActions,
  ID,
  NavLink,
  NavbarConfig,
  SectionConfig,
  HeroSlide,
  TrustBadge,
  SymptomItem,
  MalestarsConfig,
  MalestarItem,
  ProductItem,
  ArticleItem,
  FAQItem,
  FooterConfig,
  VisualBlock,
  VisualBlockType,
} from "@/types/cms"

export { createDefaultVisualBlock } from "@/constants/cms-defaults"
export { DEFAULT_CMS_STATE as DEFAULT_STATE } from "@/constants/cms-defaults"

//  Helper: generate ID 

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2)

//  Zustand Store 

export const useCMSStore = create<CMSState & CMSActions>()(
  persist(
    (set) => ({
      ...DEFAULT_CMS_STATE,

      //  Navbar 
      updateNavbar: (navbar) =>
        set((s) => ({ navbar: { ...s.navbar, ...navbar } })),
      setNavLinks: (links) =>
        set((s) => ({ navbar: { ...s.navbar, links } })),

      //  Sections 
      setSections: (sections) => set({ sections }),

      //  Hero 
      setHeroSlides: (heroSlides) => set({ heroSlides }),
      updateHeroSlide: (id, slide) =>
        set((s) => ({
          heroSlides: s.heroSlides.map((sl) => (sl.id === id ? { ...sl, ...slide } : sl)),
        })),
      addHeroSlide: () =>
        set((s) => ({
          heroSlides: [
            ...s.heroSlides,
            {
              id: uid(),
              tag: "NUEVO SLIDE",
              title: "TITULO DEL SLIDE",
              highlight: "TEXTO DESTACADO",
              description: "",
              badge1: "Badge 1",
              badge2: "Badge 2",
              image: "/images/buprex-flash.png",
              bgImage: "",
              bgColor: "#0c3d6e",
              bgOpacity: 0.15,
              bgMode: "right" as const,
            },
          ],
        })),
      deleteHeroSlide: (id) =>
        set((s) => ({ heroSlides: s.heroSlides.filter((sl) => sl.id !== id) })),

      setTrustBadges: (trustBadges) => set({ trustBadges }),
      updateTrustBadge: (id, badge) =>
        set((s) => ({
          trustBadges: s.trustBadges.map((b) => (b.id === id ? { ...b, ...badge } : b)),
        })),

      //  Symptoms 
      setSymptoms: (symptoms) => set({ symptoms }),
      updateSymptom: (id, item) =>
        set((s) => ({
          symptoms: s.symptoms.map((sy) => (sy.id === id ? { ...sy, ...item } : sy)),
        })),
      addSymptom: () =>
        set((s) => ({
          symptoms: [
            ...s.symptoms,
            {
              id: uid(),
              image: "/images/dolor-muscular.png",
              title: "Nuevo sintoma",
              description: "Descripcion del sintoma.",
              accentColor: "#0099d6",
            },
          ],
        })),
      deleteSymptom: (id) =>
        set((s) => ({ symptoms: s.symptoms.filter((sy) => sy.id !== id) })),

      //  Malestars 
      updateMalestars: (cfg) =>
        set((s) => ({ malestars: { ...s.malestars, ...cfg } })),
      setMalestarItems: (items) =>
        set((s) => ({ malestars: { ...s.malestars, items } })),
      updateMalestarItem: (id, item) =>
        set((s) => ({
          malestars: {
            ...s.malestars,
            items: s.malestars.items.map((ml) => (ml.id === id ? { ...ml, ...item } : ml)),
          },
        })),

      //  Products 
      setProducts: (products) => set({ products }),
      updateProduct: (id, item) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, ...item } : p)),
        })),
      addProduct: () =>
        set((s) => ({
          products: [
            ...s.products,
            {
              id: uid(),
              name: "Nuevo Producto",
              subtitle: "",
              image: "/images/buprex-flash.png",
              description: "Descripcion del producto.",
              accentColor: "#0099d6",
              isAdult: false,
              variant: "",
            },
          ],
        })),
      deleteProduct: (id) =>
        set((s) => ({ products: s.products.filter((p) => p.id !== id) })),

      //  Articles 
      setArticles: (articles) => set({ articles }),
      updateArticle: (id, item) =>
        set((s) => ({
          articles: s.articles.map((a) => (a.id === id ? { ...a, ...item } : a)),
        })),
      addArticle: () =>
        set((s) => ({
          articles: [
            ...s.articles,
            {
              id: uid(),
              title: "Nuevo Articulo",
              subtitle: "",
              image: "/images/article-menstrual.jpg",
              category: "Salud",
              intro: "Introduccion del articulo.",
              causes: "Causa 1\nCausa 2",
              solutions: "Solucion 1\nSolucion 2",
              tip: "Consejo de Buprex.",
            },
          ],
        })),
      deleteArticle: (id) =>
        set((s) => ({ articles: s.articles.filter((a) => a.id !== id) })),

      //  FAQ 
      setFAQs: (faqs) => set({ faqs }),
      updateFAQ: (id, item) =>
        set((s) => ({
          faqs: s.faqs.map((f) => (f.id === id ? { ...f, ...item } : f)),
        })),
      addFAQ: () =>
        set((s) => ({
          faqs: [...s.faqs, { id: uid(), question: "Nueva pregunta frecuente", answer: "Respuesta a la pregunta." }],
        })),
      deleteFAQ: (id) =>
        set((s) => ({ faqs: s.faqs.filter((f) => f.id !== id) })),

      //  Footer 
      updateFooter: (footer) =>
        set((s) => ({ footer: { ...s.footer, ...footer } })),

      //  Visual Page Builder 
      setVisualBlocks: (visualBlocks) => set({ visualBlocks }),
      addVisualBlock: (type, atIndex) =>
        set((s) => {
          const block = createDefaultVisualBlock(type)
          const blocks = [...s.visualBlocks]
          if (atIndex !== undefined) blocks.splice(atIndex, 0, block)
          else blocks.push(block)
          return { visualBlocks: blocks }
        }),
      updateVisualBlock: (id, props) =>
        set((s) => ({
          visualBlocks: s.visualBlocks.map((b) =>
            b.id === id ? { ...b, props: { ...b.props, ...props } } : b
          ),
        })),
      removeVisualBlock: (id) =>
        set((s) => ({ visualBlocks: s.visualBlocks.filter((b) => b.id !== id) })),

      //  Reset 
      resetAll: () => set(DEFAULT_CMS_STATE),
    }),
    { name: "buprex-cms-v2" }
  )
)
