import { Navbar } from "@/components/vitacap/Navbar"
import { Hero } from "@/components/vitacap/Hero"
import { CategoryCard } from "@/components/vitacap/CategoryCard"
import { Newsletter } from "@/components/vitacap/Newsletter"
import { Button } from "@/components/vitacap/Button"
import { Carousel } from "@/components/vitacap/Carousel"
import { Footer } from "@/components/vitacap/Footer"
import { vitacapVars, vitacapFontFamily } from "@/components/vitacap/theme"

const categories = [
  {
    title: "Fortaleza diaria",
    description: "Cápsulas con matriz lipídica y vitaminas para cabello, piel y uñas.",
    href: "#compra",
    tone: "gold" as const,
  },
  {
    title: "Brillo y elasticidad",
    description: "Biotina, zinc y antioxidantes que mantienen la piel luminosa.",
    href: "#ingredientes",
    tone: "sand" as const,
  },
  {
    title: "Energía metabólica",
    description: "Complejo B y hierro quelado para combatir el cansancio visible.",
    href: "#beneficios",
    tone: "gold" as const,
  },
  {
    title: "Tecnología transdérmica",
    description: "Enfoque Vitacap G inspirado en difusión gradual de activos.",
    href: "#vitacap",
    tone: "sand" as const,
  },
]

const slides = [
  {
    title: "🌿 Fórmula completa",
    description:
      "Vitaminas A, C, D, E, complejo B completo, zinc, calcio, magnesio, hierro, potasio, cobre, manganeso, oligoelementos, ginseng y aloe vera en una cápsula diaria.",
    tag: "Blend activo",
    tone: "gold" as const,
  },
  {
    title: "⚡ Energía y enfoque",
    description:
      "Complejo B + ginseng para metabolismo energético y claridad mental. Ideal para jornadas intensas de trabajo o estudio.",
    tag: "Uso sugerido",
    tone: "sand" as const,
  },
  {
    title: "💊 Dosis fácil",
    description: "1 cápsula al día, vía oral. Lista para integrarla en tu rutina sin mezclar ni preparar.",
    tag: "Modo de uso",
    tone: "gold" as const,
  },
]

export default function VitacapPage() {
  return (
    <div style={vitacapVars()}>
      <main style={{ fontFamily: vitacapFontFamily, backgroundColor: "var(--neutral-100)" }}>
        <Navbar />

        <Hero
          eyebrow="Nuevo Vitacap G"
          title="Fórmula multivitamínica premium con el sello dorado de Vitacap G."
          subtitle="Inspirada en la tecnología transdérmica: libera activos de manera sostenida para cabello, piel y uñas con un blend cálido de tonos vino y oro."
          ctaLabel="Comprar ahora"
          ctaHref="#compra"
        />

        <section id="ingredientes" className="py-14" style={{ backgroundColor: "var(--neutral-100)" }}>
          <div className="ls-container space-y-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[14px] leading-[19px] uppercase tracking-[0.18em]" style={{ color: "var(--line-soft)" }}>
                  Ingredientes clave
                </p>
                <h2 className="text-[30px] leading-[38px] font-semibold md:text-[38px] md:leading-[44px]" style={{ color: "var(--neutral-900)" }}>
                  Potenciados por hierro quelado, biotina, zinc y complejo B.
                </h2>
              </div>
              <Button variant="secondary" size="md">Ver ficha técnica</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {categories.map((cat) => (
                <CategoryCard key={cat.title} {...cat} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-14" style={{ backgroundColor: "var(--neutral-100)" }}>
          <div className="ls-container space-y-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[14px] leading-[19px] uppercase tracking-[0.18em]" style={{ color: "var(--line-soft)" }}>
                  Carrusel de beneficios
                </p>
                <h3 className="text-[26px] leading-[34px] font-semibold md:text-[30px] md:leading-[38px]" style={{ color: "var(--neutral-900)" }}>
                  Información clave de Vitacap‑G en un vistazo.
                </h3>
              </div>
              <p className="text-[14px] leading-[19px]" style={{ color: "var(--neutral-900)" }}>
                Cambia de tarjeta para ver fórmula, usos, beneficios y dosis habitual.
              </p>
            </div>

            <Carousel items={slides} />
          </div>
        </section>

        <section className="py-14" style={{ backgroundColor: "var(--neutral-100)" }}>
          <div className="ls-container grid gap-4 md:grid-cols-3">
            {[{
              title: "⭐ Aumenta energía",
              body: "Complejo B + ginseng ayudan a disminuir fatiga y sostener el rendimiento.",
            }, {
              title: "🧠 Mejora foco",
              body: "Lecitina y vitaminas B apoyan memoria, concentración y agilidad mental.",
            }, {
              title: "🛡️ Refuerza defensas",
              body: "Vitaminas A/C/D y minerales clave contribuyen a la respuesta inmune.",
            }, {
              title: "🏃 Recuperación",
              body: "Ideal en convalecencias o post-operatorios para reponer micronutrientes.",
            }, {
              title: "🧘 Menos estrés",
              body: "Balance de vitaminas, minerales y ginseng para tolerar demandas emocionales y laborales.",
            }, {
              title: "🥇 Alto desgaste",
              body: "Para estudio intenso, jornadas exigentes o práctica deportiva.",
            }].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border bg-white p-5 shadow-sm transition"
                style={{ borderColor: "var(--line-soft)" }}
              >
                <h4 className="text-[18px] leading-[24px] font-semibold text-[var(--neutral-900)]">{card.title}</h4>
                <p className="mt-2 text-[15px] leading-[22px] text-[var(--neutral-900)] opacity-85">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="beneficios" className="py-14" style={{ backgroundColor: "var(--surface-gold)" }}>
          <div className="ls-container grid gap-8">
            <div className="space-y-3">
              <p className="text-[14px] leading-[19px] uppercase tracking-[0.18em]" style={{ color: "var(--neutral-900)" }}>
                Beneficios visibles
              </p>
              <h3 className="text-[26px] leading-[34px] font-semibold md:text-[30px] md:leading-[38px]" style={{ color: "var(--neutral-900)" }}>
                Menos quiebre capilar, uñas más firmes y piel con tono uniforme en 8 semanas.
              </h3>
              <p className="text-[16px] leading-[24px]" style={{ color: "var(--neutral-900)" }}>
                La paleta dorada refleja la calidez de la fórmula: soporte visible para cabello, piel y uñas sin comprometer el estilo Vitacap.
              </p>
              <div className="flex flex-wrap gap-2">
                {["+Keratina", "+Biotina", "Hierro quelado", "Vitamina C"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-1 text-[13px] font-semibold"
                    style={{ backgroundColor: "rgba(3,1,0,0.08)", color: "var(--neutral-900)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>      
        <section className="py-14" style={{ backgroundColor: "var(--neutral-100)" }}>
          <div className="ls-container grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border bg-white p-5 shadow-sm" style={{ borderColor: "var(--line-soft)" }}>
              <h4 className="text-[20px] leading-[28px] font-semibold text-[var(--neutral-900)]">⚠️ Precauciones</h4>
              <p className="mt-2 text-[15px] leading-[22px] text-[var(--neutral-900)] opacity-85">
                Usa con cautela si tomas medicación psiquiátrica, estrogénicos, esteroides o hipoglicemiantes (por el ginseng). Consulta a tu médico.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-5 shadow-sm" style={{ borderColor: "var(--line-soft)" }}>
              <h4 className="text-[20px] leading-[28px] font-semibold text-[var(--neutral-900)]">💊 Dosis</h4>
              <p className="mt-2 text-[15px] leading-[22px] text-[var(--neutral-900)] opacity-85">
                1 cápsula al día, vía oral. Integra la toma en tu rutina para mantener niveles constantes de micronutrientes.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-5 shadow-sm" style={{ borderColor: "var(--line-soft)" }}>
              <h4 className="text-[20px] leading-[28px] font-semibold text-[var(--neutral-900)]">🌿 Extractos naturales</h4>
              <p className="mt-2 text-[15px] leading-[22px] text-[var(--neutral-900)] opacity-85">
                Ginseng como energizante natural y aloe vera para soporte digestivo y antioxidante.
              </p>
            </div>
          </div>
        </section>

        <Newsletter />

        <Footer />
      </main>
    </div>
  )
}
