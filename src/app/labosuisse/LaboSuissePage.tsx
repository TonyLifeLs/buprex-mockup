"use client"

/**
 * Labo Suisse — Page (v3)
 * All sections are now independent components under src/components/labosuisse/.
 * All content is driven by useLaboSuisseStore (src/store/labosuisse.ts).
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

export default function LaboSuissePage() {
  const { colors } = useLaboSuisseStore()

  return (
    <div style={lsColorsToCSSVars(colors)}>
      <main style={{ fontFamily: "var(--font-sans)" }}>
        <LaboHeader />
        <LaboHero />
        <BannerAlternate />
        <BrandIntro />
        <CrescinaFeatured />
        <CategoriesGrid />
        <NewsCarousel />
        <LaboAccordion />
        <LaboClub />
        <LaboFooter />
      </main>
    </div>
  )
}

