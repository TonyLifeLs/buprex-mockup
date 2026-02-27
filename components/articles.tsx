import Image from "next/image"

const articles = [
  {
    title: "DOLOR MENSTRUAL:",
    subtitle: "CAUSAS Y SOLUCIONES",
    image: "/images/article-menstrual.jpg",
    category: "Salud Femenina",
  },
  {
    title: "FIEBRE EN NINOS:",
    subtitle: "CUIDADOS Y PREVENCION",
    image: "/images/article-fiebre.jpg",
    category: "Pediatria",
  },
  {
    title: "COMO MANTENER UNA POSTURA CORRECTA Y EVITAR DOLORES DE ESPALDA?",
    subtitle: "",
    image: "/images/article-postura.jpg",
    category: "Bienestar",
  },
  {
    title: "MIGRANA U OTRO TIPO DE DOLOR DE CABEZA?",
    subtitle: "",
    image: "/images/article-migrana.jpg",
    category: "Neurologia",
  },
]

export function Articles() {
  return (
    <section id="articulos" className="bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-[#0099d6] px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            Blog
          </span>
          <h2 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Articulos de Salud
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Informacion util para cuidar tu bienestar y el de tu familia.
          </p>
        </div>

        {/* 2x2 Grid matching reference */}
        <div className="mt-14 grid grid-cols-1 gap-1 sm:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group relative cursor-pointer overflow-hidden"
            >
              {/* Full bleed image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Content overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col p-6 md:p-8">
                  <h3 className="font-[var(--font-heading)] text-lg font-bold uppercase leading-tight text-white md:text-xl text-pretty">
                    {article.title}
                    {article.subtitle && (
                      <>
                        <br />
                        <span className="text-base font-semibold text-white/90 md:text-lg">
                          {article.subtitle}
                        </span>
                      </>
                    )}
                  </h3>
                  <button
                    type="button"
                    className="mt-4 w-fit rounded-full bg-[#e31e24] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#c4191e]"
                  >
                    Leer mas
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
