"use client"

import Image from "next/image"
import { ArrowRight, Layers, Waypoints, ShieldCheck, Atom, FlaskConical, Zap, Globe } from "lucide-react"
import { LaboHeader, LaboFooter } from "@/components/labosuisse"
import { lsColorsToCSSVars, useLaboSuisseStore } from "@/store/labosuisse"

// ── DATA ────────────────────────────────────────────────────────────────────

const SKIN_LAYERS = [
  {
    layer: "Capa córnea",
    depth: "0–15 µm",
    desc: "Primera barrera. Los vectores moleculares de pequeño peso superan esta barrera de forma no abrasiva.",
    bg: "#f0f4e8",
    bar: "#c5d89a",
    w: "100%",
  },
  {
    layer: "Epidermis",
    depth: "15–100 µm",
    desc: "Las moléculas de HA de peso bajo-medio hidratan los queratinocitos y mantienen la cohesión celular.",
    bg: "#e4eddb",
    bar: "#a5c97a",
    w: "75%",
  },
  {
    layer: "Dermis superficial",
    depth: "100 µm–1 mm",
    desc: "Los HA de peso alto reconstruyen la red de colágeno y elastina. Aquí nace el efecto relleno visible.",
    bg: "#d8e6ce",
    bar: "#87ba5a",
    w: "55%",
  },
  {
    layer: "Dermis profunda",
    depth: "1–2 mm",
    desc: "Los péptidos biomiméticos alcanzan los fibroblastos para estimular síntesis de matriz extracelular.",
    bg: "#ccdfc2",
    bar: "#68ab3a",
    w: "35%",
  },
]

const MECHANISMS = [
  {
    title: "Gradación molecular",
    body: "12 pesos moleculares distintos aseguran que cada capa de la piel reciba su activo específico, sin saturar ni desperdiciar concentración.",
    Icon: Layers,
    accent: "#c5d89a",
  },
  {
    title: "Vectores de transporte",
    body: "Sistemas de microencapsulación que protegen los activos en tránsito y los liberan de forma controlada en la capa objetivo.",
    Icon: Waypoints,
    accent: "#87ba5a",
  },
  {
    title: "Barrera cutánea intacta",
    body: "La tecnología no perfora ni daña la barrera cutánea. Sin agujas, sin abrasión, sin tiempo de recuperación.",
    Icon: ShieldCheck,
    accent: "#68ab3a",
  },
  {
    title: "Liberación lenta prolongada",
    body: "Los activos se liberan durante 6–8 horas, maximizando el tiempo de contacto en dermis y mejorando absorción acumulada.",
    Icon: Zap,
    accent: "#4e9920",
  },
]

const MILESTONES = [
  { year: "1986", title: "Fundación de Labo en Basilea", desc: "Nace en Suiza con un enfoque exclusivo en dermocosmética de alta eficacia técnica." },
  { year: "2002", title: "Primera patente de transporte transdérmico", desc: "Desarrollo del primer sistema vectorizado para transporte de ácido hialurónico de alto peso molecular." },
  { year: "2013", title: "Lanzamiento de Fillerina", desc: "El primer relleno sin agujas para uso doméstico llega al mercado con 6 pesos moleculares de HA." },
  { year: "2018", title: "Crescina HFSC Technology", desc: "Se lanza el primer tratamiento anticaída con tecnología de células madre foliculares patentada." },
  { year: "2020", title: "Fillerina 12HA actualizado", desc: "Nueva formulación con 12 tipos de HA y péptidos biomiméticos para máxima eficacia transdérmica." },
  { year: "Hoy", title: "+8 patentes activas", desc: "El laboratorio continúa desarrollando nuevas generaciones de activos transdérmicos para piel y cabello." },
]

const PRODUCTS = [
  {
    brand: "Fillerina",
    line: "Cuidado de la piel",
    desc: "12 tipos de HA que penetran gradualmente para relleno visible sin agujas.",
    href: "/labosuisse/cuidado-de-la-piel",
    bg: "#fdf0f6",
    pill: "#ad3f84",
  },
  {
    brand: "Crescina",
    line: "Cuidado capilar",
    desc: "HFSC Technology que activa células madre foliculares para recrecimiento activo.",
    href: "/labosuisse/cuidado-capilar",
    bg: "#fff8e1",
    pill: "#d4a017",
  },
  {
    brand: "Rinfoltil",
    line: "Densificador capilar",
    desc: "Fórmula complementaria a Crescina para mayor densidad y brillo desde el primer uso.",
    href: "/labosuisse",
    bg: "#f0f4e8",
    pill: "#68ab3a",
  },
]

const ACTIVES = [
  { name: "Ácido Hialurónico ×12", icon: Atom, desc: "12 pesos moleculares distintos para cobertura completa de todas las capas de la piel." },
  { name: "Péptidos biomiméticos", icon: FlaskConical, desc: "Señalizan a los fibroblastos para producir colágeno y elastina de forma natural." },
  { name: "Aminoácidos queratínicos", icon: Globe, desc: "Fortalecen la fibra capilar y nutren el folículo desde el interior." },
  { name: "Extractos botánicos suizos", icon: ShieldCheck, desc: "Antioxidantes y antiinflamatorios que protegen la piel durante el tratamiento." },
]

// ── COMPONENTS ──────────────────────────────────────────────────────────────

function MechanismCard({ title, body, Icon, accent }: typeof MECHANISMS[number]) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-3"
      style={{ background: "#fff", border: "1px solid var(--ls-gray-200, #e5e5e5)" }}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ background: accent + "33" }}
        >
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </span>
        <h3 className="ls-h4" style={{ color: "var(--ls-gray-900)" }}>
          {title}
        </h3>
      </div>
      <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
        {body}
      </p>
    </div>
  )
}

function MilestoneItem({ year, title, desc, isLast }: typeof MILESTONES[number] & { isLast?: boolean }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className="flex h-10 w-16 shrink-0 items-center justify-center rounded-full text-sm font-bold"
          style={{ background: "#c5d89a", color: "#2a4a10" }}
        >
          {year}
        </div>
        {!isLast && <div className="mt-1 w-0.5 flex-1 min-h-[24px]" style={{ background: "#e0ecd0" }} />}
      </div>
      <div className="pb-6">
        <h4 className="ls-h4" style={{ color: "var(--ls-gray-900)" }}>
          {title}
        </h4>
        <p className="ls-p mt-1" style={{ color: "var(--ls-gray-600)" }}>
          {desc}
        </p>
      </div>
    </div>
  )
}

function ProductCard({ brand, line, desc, href, bg, pill }: typeof PRODUCTS[number]) {
  return (
    <a
      href={href}
      className="group rounded-2xl p-6 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
      style={{ background: bg, border: `1px solid ${pill}33`, textDecoration: "none" }}
    >
      <span className="ls-p-sm rounded-full px-3 py-0.5 w-fit font-semibold" style={{ background: pill, color: "#fff" }}>
        {brand}
      </span>
      <h3 className="ls-h4" style={{ color: "var(--ls-gray-900)" }}>
        {line}
      </h3>
      <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
        {desc}
      </p>
      <span className="ls-p-sm flex items-center gap-1 mt-auto" style={{ color: pill }}>
        Ver productos <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </a>
  )
}

// ── PAGE ────────────────────────────────────────────────────────────────────

export default function TecnologiaTransdermicaPage() {
  const { colors } = useLaboSuisseStore()

  return (
    <div style={lsColorsToCSSVars(colors)}>
      <main style={{ fontFamily: "var(--font-sans)", background: "#fff" }}>
        <LaboHeader />

        {/* ── HERO ── */}
        <section
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #f4f7e8 0%, #f9fbf2 50%, #ffffff 80%)",
            paddingTop: "140px",
            paddingBottom: "96px",
          }}
        >
          <div
            className="pointer-events-none absolute -top-20 -right-24 h-96 w-96 rounded-full opacity-40"
            style={{ background: "radial-gradient(circle, #d8edb8, transparent 70%)" }}
          />

          <div className="ls-container grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <span
                  className="ls-p-sm inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold uppercase tracking-[0.18em]"
                  style={{ background: "var(--ls-gray-900)", color: "var(--ls-white)" }}
                >
                  Tecnología transdérmica · Labo Suisse
                </span>
                <p className="ls-p-sm uppercase tracking-[0.18em]" style={{ color: "var(--ls-gray-500)" }}>
                  Ciencia · Penetración · Eficacia sin agujas
                </p>
              </div>

              <div className="space-y-4">
                <h1 className="ls-h1" style={{ color: "var(--ls-gray-900)", lineHeight: 1.1 }}>
                  Activos que viajan hasta las capas profundas{" "}
                  <em style={{ color: "#4e9920", fontStyle: "normal" }}>sin una sola aguja</em>
                </h1>
                <p className="ls-p-lg" style={{ color: "var(--ls-gray-700)" }}>
                  Desde Basilea desarrollamos sistemas de transporte molecular que llevan los activos exactos a cada
                  capa de la piel. Sin dolor, sin downtime, con eficacia respaldada por más de 8 patentes suizas.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#mecanismos" className="ls-btn ls-btn-primary gap-2">
                  Ver cómo funciona
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/labosuisse"
                  className="ls-btn ls-btn-tertiary"
                  style={{ color: "var(--ls-gray-900)" }}
                >
                  Volver a Labo
                </a>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {["Sin agujas", "Sin trauma cutáneo", "+8 patentes activas", "Uso doméstico seguro"].map((c) => (
                  <span
                    key={c}
                    className="ls-p-sm inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                    style={{ background: "#fff", color: "var(--ls-gray-700)", border: "1px solid #c5d89a" }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#4e9920" }} />
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute inset-0 -z-10 rounded-[40px] blur-3xl"
                style={{ background: "radial-gradient(circle at 30% 30%, #d8edb8, transparent 60%)" }}
              />
              <div
                className="relative flex justify-center rounded-[40px] p-10"
                style={{ background: "rgba(255,255,255,0.85)", border: "1px solid #d0e8a8", boxShadow: "0 16px 48px rgba(78,153,32,0.12)" }}
              >
                <Image
                  src="/images/derma/crescina2-foto.png"
                  alt="Tecnología transdérmica Labo"
                  width={1000}
                  height={1000}
                  className="h-auto w-full max-w-[340px] object-contain"
                  priority
                />
              </div>
              <div
                className="absolute -bottom-4 right-6 rounded-xl px-4 py-3 shadow-lg"
                style={{ background: "#4e9920", color: "#fff" }}
              >
                <p className="ls-p-sm font-semibold">Penetración secuencial</p>
                <p className="ls-p-sm opacity-80">4 capas de la piel tratadas</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── STRIPE ── */}
        <div
          className="py-4 text-center ls-p-sm font-semibold tracking-[0.2em] uppercase"
          style={{ background: "var(--ls-gray-900)", color: "#fff" }}
        >
          SWISS SCIENCE · TRANSDERMIC TECHNOLOGY · LABO SUISSE SINCE 1986
        </div>

        {/* ── SKIN LAYERS DIAGRAM ── */}
        <section className="py-20" style={{ background: "#fff" }}>
          <div className="ls-container grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Cómo penetra
              </p>
              <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)" }}>
                Cada activo alcanza exactamente la capa donde más se necesita.
              </h2>
              <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
                La gradación molecular es la clave: 12 pesos moleculares distintos de ácido hialurónico actúan como
                llaves que abren distintas profundidades de la piel. Los más pequeños llegan a dermis profunda; los
                más grandes permanecen en epidermis para hidratación inmediata.
              </p>
              <a href="#mecanismos" className="ls-btn ls-btn-primary gap-2 w-fit">
                Ver los 4 mecanismos
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* layer visualization */}
            <div className="space-y-3">
              {SKIN_LAYERS.map(({ layer, depth, desc, bg, bar, w }) => (
                <div key={layer} className="rounded-2xl p-4" style={{ background: bg }}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="ls-p font-semibold" style={{ color: "var(--ls-gray-900)" }}>
                        {layer}
                      </span>
                      <span className="ls-p-sm ml-2" style={{ color: "var(--ls-gray-500)" }}>
                        {depth}
                      </span>
                    </div>
                  </div>
                  {/* penetration bar */}
                  <div className="mb-2 h-2 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: w, background: bar }}
                    />
                  </div>
                  <p className="ls-p-sm" style={{ color: "var(--ls-gray-700)" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MECHANISMS ── */}
        <section id="mecanismos" className="py-20" style={{ background: "var(--ls-gray-100)" }}>
          <div className="ls-container space-y-10">
            <div className="space-y-3">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Pilares científicos
              </p>
              <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)" }}>
                Cuatro mecanismos que permiten resultados sin inyecciones.
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {MECHANISMS.map((m) => (
                <MechanismCard key={m.title} {...m} />
              ))}
            </div>
          </div>
        </section>

        {/* ── ACTIVES ── */}
        <section className="py-20" style={{ background: "#fff" }}>
          <div className="ls-container grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-start">
            <div className="space-y-5">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Activos estrella
              </p>
              <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)" }}>
                Ingredientes diseñados en Basilea para máxima eficacia transdérmica.
              </h2>
              <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
                Cada fórmula Labo combina activos de origen farmacéutico y biotecnológico, formulados para penetrar
                de forma selectiva y liberar su acción en el tejido diana exacto.
              </p>
              <a href="#timeline" className="ls-btn ls-btn-primary gap-2 w-fit">
                Ver historia de la ciencia Labo
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {ACTIVES.map(({ name, icon: Icon, desc }) => (
                <div
                  key={name}
                  className="rounded-2xl p-5 flex flex-col gap-3"
                  style={{ background: "#f4f7e8", border: "1px solid #d0e8a8" }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full"
                      style={{ background: "#c5d89a" }}
                    >
                      <Icon className="h-4 w-4" style={{ color: "#2a4a10" }} />
                    </span>
                    <h4 className="ls-h4" style={{ color: "var(--ls-gray-900)" }}>
                      {name}
                    </h4>
                  </div>
                  <p className="ls-p-sm" style={{ color: "var(--ls-gray-700)" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section id="timeline" className="py-20" style={{ background: "var(--ls-gray-100)" }}>
          <div className="ls-container grid gap-12 md:grid-cols-2 md:items-start">
            <div className="space-y-4">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Historia de la ciencia
              </p>
              <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)" }}>
                Más de 35 años de investigación transdérmica continua.
              </h2>
              <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
                Desde los laboratorios de Basilea, Labo Suisse ha construido un legado de innovación dermocosmética
                que combina rigor farmacéutico con el diseño de productos seguros para el hogar.
              </p>
            </div>
            <div>
              {MILESTONES.map((m, i) => (
                <MilestoneItem key={m.year} {...m} isLast={i === MILESTONES.length - 1} />
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS USING TECH ── */}
        <section className="py-20" style={{ background: "#fff" }}>
          <div className="ls-container space-y-10">
            <div className="space-y-3">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Productos con tecnología transdérmica
              </p>
              <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)" }}>
                Conoce las líneas que aplican esta ciencia.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {PRODUCTS.map((p) => (
                <ProductCard key={p.brand} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── DARK CTA ── */}
        <section className="py-20" style={{ background: "#0f0f0f" }}>
          <div className="ls-container grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="space-y-5">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                Garantía científica
              </p>
              <h2 className="ls-h2" style={{ color: "#fff" }}>
                Cada activo respaldado por estudios in vitro, in vivo y test dermatológicos internacionales.
              </h2>
              <p className="ls-p" style={{ color: "rgba(255,255,255,0.7)" }}>
                La tecnología transdérmica Labo no compromete la barrera cutánea. Tratamientos eficaces y seguros
                para rostro y cabello, sin procedimientos médicos.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/labosuisse/descubre-labo" className="ls-btn ls-btn-primary gap-2">
                  Conocer el laboratorio
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/labosuisse"
                  className="ls-btn ls-btn-tertiary"
                  style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  Ver todos los productos
                </a>
              </div>
            </div>
            <div
              className="rounded-[28px] p-7 space-y-4"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-center justify-between">
                <span className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Activos estrella
                </span>
                <Atom className="h-5 w-5" style={{ color: "#c5d89a" }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "12 HA de distinto peso",
                  "Péptidos biomiméticos",
                  "Aminoácidos queratínicos",
                  "Extractos botánicos suizos",
                  "Microvectores patentados",
                  "Liberación lenta 6–8h",
                ].map((item) => (
                  <div key={item} className="rounded-2xl px-4 py-3" style={{ background: "rgba(197,216,154,0.1)" }}>
                    <p className="ls-p" style={{ color: "#c5d89a" }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <p className="ls-p-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                Formulaciones diseñadas en Basilea. Testadas dermatológicamente para uso doméstico y profesional.
              </p>
            </div>
          </div>
        </section>

        <LaboFooter />
      </main>
    </div>
  )
}
