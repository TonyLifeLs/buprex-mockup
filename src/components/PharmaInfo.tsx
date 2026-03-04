"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import {
  ShieldCheck,
  FlaskConical,
  TriangleAlert,
  Stethoscope,
  Pill,
  Thermometer,
  Baby,
  Heart,
} from "lucide-react"

const sections = [
  {
    icon: FlaskConical,
    color: "#00b2ff",
    bg: "bg-[#00b2ff]/10",
    border: "border-[#00b2ff]/30",
    title: "Propiedades",
    content:
      "Posee propiedades analgésicas y antipiréticas, efectivo en caso de dolor de tipo periférico, injurias traumáticas de tejidos blandos, dismenorrea primaria y dolor postquirúrgico en intervenciones menores.",
  },
  {
    icon: Pill,
    color: "#f5a623",
    bg: "bg-[#f5a623]/10",
    border: "border-[#f5a623]/30",
    title: "Dosis y Administración",
    content: null,
    dosis: [
      {
        icon: Baby,
        label: "Niños (general)",
        text: "10 mg/kg/dosis, repetir hasta 3–4 veces al día.",
      },
      {
        icon: Thermometer,
        label: "Fiebre < 39.2 °C",
        text: "Dosis recomendada: 5 mg/kg de peso.",
      },
      {
        icon: Thermometer,
        label: "Fiebre ≥ 39.2 °C",
        text: "Dosis recomendada: 10 mg/kg de peso.",
      },
    ],
    note: "Vía oral. Para niños de 6 meses a 12 años, ajustar según temperatura basal.",
  },
  {
    icon: ShieldCheck,
    color: "#e31e24",
    bg: "bg-[#e31e24]/10",
    border: "border-[#e31e24]/30",
    title: "Contraindicaciones",
    content:
      "No utilizar con antecedentes de hipersensibilidad a la sustancia, pólipos nasales, angioedema o reacción broncoespástica al ácido acetilsalicílico u otros AINEs. Contraindicado en Lupus Eritematoso Sistémico.",
  },
  {
    icon: TriangleAlert,
    color: "#0c3d6e",
    bg: "bg-[#0c3d6e]/10",
    border: "border-[#0c3d6e]/30",
    title: "Advertencias y Precauciones",
    content: null,
    warnings: [
      "Puede provocar trastornos gastrointestinales en pacientes sensibles a los AINEs.",
      "Ante trastornos visuales, descontinuar el tratamiento.",
      "Precaución en descompensación cardiaca, hipertensión, función renal alterada y pacientes con anticoagulantes.",
      "Embarazo: contraindicado en el tercer trimestre.",
      "Lactancia: no se recomienda su uso.",
      "Pediatría: utilizar con precaución.",
      "Geriatría: iniciar con dosis bajas y reajustar si es necesario.",
      "Puede causar somnolencia o mareo; precaución al conducir o usar maquinaria.",
    ],
  },
]

export function PharmaInfo() {
  const sectionRef = useScrollReveal()

  return (
    <section
      ref={sectionRef}
      id="informacion"
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#00b2ff]/6 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#e31e24]/6 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6">

        {/* Header */}
        <div className="scroll-reveal mb-14 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#0c3d6e] px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            <Stethoscope size={13} />
            Información Técnica
          </span>
          <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Ficha Técnica del Producto
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            Información clínica sobre propiedades, dosificación, contraindicaciones y precauciones de uso.
          </p>
          <div className="mx-auto mt-5 h-px w-20 rounded-full bg-gradient-to-r from-transparent via-[#0c3d6e]/30 to-transparent" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sections.map((sec, i) => {
            const Icon = sec.icon
            return (
              <div
                key={sec.title}
                className={`scroll-reveal rounded-2xl border ${sec.border} ${sec.bg} p-6 shadow-sm transition-shadow hover:shadow-md`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Card header */}
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm"
                    style={{ backgroundColor: sec.color }}
                  >
                    <Icon size={20} color="#fff" strokeWidth={2.2} />
                  </div>
                  <h3
                    className="font-[var(--font-heading)] text-base font-bold"
                    style={{ color: sec.color }}
                  >
                    {sec.title}
                  </h3>
                </div>

                {/* Simple text */}
                {sec.content && (
                  <p className="text-sm leading-relaxed text-foreground/80">{sec.content}</p>
                )}

                {/* Dosis table */}
                {"dosis" in sec && sec.dosis && (
                  <div className="flex flex-col gap-3">
                    {sec.dosis.map((d) => {
                      const DIcon = d.icon
                      return (
                        <div key={d.label} className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5a623]/20">
                            <DIcon size={14} color="#f5a623" strokeWidth={2.5} />
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-[#f5a623]">{d.label}</span>
                            <span className="text-sm text-foreground/80">{d.text}</span>
                          </div>
                        </div>
                      )
                    })}
                    {sec.note && (
                      <p className="mt-1 rounded-lg bg-[#f5a623]/10 px-3 py-2 text-xs leading-relaxed text-foreground/70 border border-[#f5a623]/20">
                        {sec.note}
                      </p>
                    )}
                  </div>
                )}

                {/* Warnings list */}
                {"warnings" in sec && sec.warnings && (
                  <ul className="flex flex-col gap-2">
                    {sec.warnings.map((w, wi) => (
                      <li key={wi} className="flex items-start gap-2 text-sm text-foreground/80">
                        <Heart
                          size={13}
                          className="mt-0.5 shrink-0 fill-[#0c3d6e]/30 text-[#0c3d6e]"
                        />
                        {w}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom disclaimer */}
        <div className="scroll-reveal mt-10 rounded-2xl border border-[#0c3d6e]/15 bg-[#0c3d6e]/5 px-6 py-4 text-center text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Nota:</strong> Esta información es de carácter referencial.
          Consulte siempre a su médico o farmacéutico antes de iniciar cualquier tratamiento.
          Mantenga fuera del alcance de los niños.
        </div>
      </div>
    </section>
  )
}
