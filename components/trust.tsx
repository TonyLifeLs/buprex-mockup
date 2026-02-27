import Image from "next/image"
import { Clock, Shield, Zap } from "lucide-react"

const trustItems = [
  {
    icon: Clock,
    stat: "32",
    label: "Anos",
    description: "Tratando el dolor, fiebre e inflamacion en Ecuador.",
  },
  {
    icon: Shield,
    stat: "Confianza",
    label: "Medica",
    description: "Recomendados por medicos y profesionales de la salud en Ecuador.",
  },
  {
    icon: Zap,
    stat: "Alivio",
    label: "Rapido",
    description: "Capsula blanda de accion rapida para un alivio efectivo.",
  },
]

export function Trust() {
  return (
    <section className="relative overflow-hidden bg-[#0c3d6e] py-20 md:py-28">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#0099d6]/20" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-[#e31e24]/10" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
          {/* Left: Content */}
          <div className="flex-1 text-center md:text-left">
            <span className="mb-4 inline-block rounded-full bg-[#e31e24] px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-card">
              32 anos de confianza
            </span>
            <h2 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight text-card md:text-4xl text-balance">
              Alivio Rapido y Confiable para toda la Familia
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-card/70">
              Pioneros en el tratamiento del dolor con la confianza de miles de familias ecuatorianas. Desde 1993 ofreciendo soluciones de alivio.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {trustItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-card/10 bg-card/5 p-6 text-center backdrop-blur-sm"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#e31e24]">
                    <item.icon className="h-6 w-6 text-card" />
                  </div>
                  <div className="font-[var(--font-heading)] text-2xl font-extrabold text-card">
                    {item.stat}
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#0099d6]">
                    {item.label}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-card/60">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mascots */}
          <div className="relative flex items-end gap-0 md:w-2/5">
            <Image
              src="/images/mascot-blue.png"
              alt="Mascota BUPREX azul - Dolorex"
              width={190}
              height={190}
              className="relative z-10 drop-shadow-2xl"
            />
            <Image
              src="/images/malestar-1.png"
              alt="Mascota BUPREX naranja - Inflamex"
              width={200}
              height={200}
              className="relative z-20 -ml-6 drop-shadow-2xl"
            />
            <Image
              src="/images/mascot-red.png"
              alt="Mascota BUPREX roja - Fiebrex"
              width={170}
              height={170}
              className="relative z-0 -ml-6 drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
