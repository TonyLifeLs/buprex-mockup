"use client"

import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Symptoms } from "@/components/Symptoms"
import { Products } from "@/components/Products"
import { PharmaInfo } from "@/components/PharmaInfo"
import { Articles } from "@/components/Articles"
import { FAQ } from "@/components/FAQ"
import { Footer } from "@/components/Footer"
import { Malestars } from "@/components/Malestars"
import { useCMSStore } from "@/store/cms"

const SECTION_MAP: Record<string, React.ComponentType> = {
  hero: Hero,
  symptoms: Symptoms,
  malestars: Malestars,
  products: Products,
  "pharma-info": PharmaInfo,
  articles: Articles,
  faq: FAQ,
  footer: Footer,
}

export default function HomePage() {
  const sections = useCMSStore((s) => s.sections)

  return (
    <main className="min-h-screen">
      <Navbar />
      {sections
        .filter((s) => s.enabled)
        .map((s) => {
          const Component = SECTION_MAP[s.id]
          return Component ? <Component key={s.id} /> : null
        })}
    </main>
  )
}

