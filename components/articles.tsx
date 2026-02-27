import Image from "next/image"
import { ArrowRight } from "lucide-react"

const articles = [
  {
    title: "Fiebre en ninos: cuidados y prevencion",
    image: "/images/article-fiebre.jpg",
    category: "Pediatria",
  },
  {
    title: "Dolor menstrual: causas y soluciones",
    image: "/images/article-menstrual.jpg",
    category: "Salud Femenina",
  },
  {
    title: "Como mantener una postura correcta y evitar dolores de espalda",
    image: "/images/article-postura.jpg",
    category: "Bienestar",
  },
  {
    title: "Migrana u otro tipo de dolor de cabeza?",
    image: "/images/article-migrana.jpg",
    category: "Neurologia",
  },
]

export function Articles() {
  return (
    <section id="articulos" className="bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-[#0099d6] px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-card">
            Blog
          </span>
          <h2 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Articulos de Salud
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Informacion util para cuidar tu bienestar y el de tu familia.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:border-[#0099d6]/30"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/10" />
              </div>
              <div className="p-6">
                <span className="mb-2 inline-block rounded-full bg-[#0099d6]/10 px-3 py-1 text-xs font-semibold text-[#0099d6]">
                  {article.category}
                </span>
                <h3 className="font-[var(--font-heading)] text-base font-bold leading-snug text-foreground text-pretty">
                  {article.title}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#e31e24] transition-colors group-hover:text-[#0099d6]">
                  <span>Leer mas</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
