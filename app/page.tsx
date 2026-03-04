import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Symptoms } from "@/components/symptoms"
import { Trust } from "@/components/trust"
import { Products } from "@/components/products"
import { Malestars } from "@/components/malestars"
import { Articles } from "@/components/articles"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Symptoms />
      <Products />
      <Malestars />
      <Trust />
      <Articles />
      <FAQ />
      <Footer />
    </main>
  )
}
