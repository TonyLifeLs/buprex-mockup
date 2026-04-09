"use client"

/**
 * Labo Suisse — Page (v3)
 * All sections are now independent components under src/components/labosuisse/.
 * All content is driven by useLaboSuisseStore (src/store/labosuisse.ts).
 * Section order and visibility are controlled by lsSections in the store
 * (editable from the Dashboard → Labo Suisse → Constructor).
 */

import { useLaboSuisseStore, lsColorsToCSSVars } from "@/store/labosuisse"
import {
  LaboHeader,
  LaboHero,
  BannerAlternate,
  BrandIntro,
  CrescinaFeatured,
  CategoriesGrid,
  NewsCarousel,
  LaboAccordion,
  LaboClub,
  LaboFooter,
} from "@/components/labosuisse"
import type { ReactNode } from "react"

// Map section id → component
const SECTION_MAP: Record<string, ReactNode> = {
  header:      <LaboHeader />,
  hero:        <LaboHero />,
  banner:      <BannerAlternate />,
  brandintro:  <BrandIntro />,
  crescina:    <CrescinaFeatured />,
  categories:  <CategoriesGrid />,
  news:        <NewsCarousel />,
  faq:         <LaboAccordion />,
  newsletter:  <LaboClub />,
  footer:      <LaboFooter />,
}

export default function LaboSuissePage() {
  const { colors, lsSections } = useLaboSuisseStore()

  return (
    <div style={lsColorsToCSSVars(colors)}>
      <main style={{ fontFamily: "var(--font-sans)" }}>
        {lsSections
          .filter((s) => s.enabled)
          .map((s) => {
            const node = SECTION_MAP[s.id]
            if (!node) return null
            return <div key={s.id}>{node}</div>
          })}
      </main>
    </div>
  )
}

