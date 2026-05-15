"use client"

import { LaboHeader, CategoriesGrid, LaboFooter } from "@/components/labosuisse"
import { lsColorsToCSSVars, useLaboSuisseStore } from "@/store/labosuisse"

export default function LaboSuisseLandingPage() {
  const { colors } = useLaboSuisseStore()

  return (
    <div style={lsColorsToCSSVars(colors)}>
      <LaboHeader />
      <main style={{ fontFamily: "var(--font-sans)" }}>
        <CategoriesGrid />
      </main>
      <LaboFooter />
    </div>
  )
}
