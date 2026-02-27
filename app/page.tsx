import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Symptoms } from "@/components/symptoms"
import { Products } from "@/components/products"
import { PharmaInfo } from "@/components/pharma-info"
import { Articles } from "@/components/articles"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { Malestars } from "@/components/malestars"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Symptoms />
      <Malestars />
      <Products />
      <PharmaInfo />
      <Articles />
      <FAQ />
      <Footer />
    </main>
  )
}
