"use client"

import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const faqs = [
  {
    question: "Para que tipo de dolores sirve el Ibuprofeno?",
    answer:
      "El ibuprofeno es eficaz para el alivio de dolor de cabeza, dolor muscular, dolor de espalda, dolor de garganta, dolor dental, dismenorrea (dolor menstrual), dolor postquirurgico en intervenciones menores y fiebre de cualquier origen excepto la causada por dengue.",
  },
  {
    question: "Me di la vacuna de la gripe, puedo tomar ibuprofeno?",
    answer:
      "Si, puede tomar ibuprofeno despues de la vacuna de la gripe para aliviar posibles efectos secundarios como dolor en el brazo o fiebre leve. Sin embargo, se recomienda consultar con su medico antes de tomar cualquier medicamento.",
  },
  {
    question: "Cada cuantas horas puedo tomar ibuprofeno 400mg?",
    answer:
      "La dosis recomendada para adultos y ninos desde 15 anos es de 200-400 mg cada 6 horas segun necesidad. No se debe exceder la dosis maxima diaria recomendada. No administrar por mas de 2-3 dias sin indicacion medica.",
  },
  {
    question: "Si tengo COVID-19 puedo tomar ibuprofeno? Y si me di la vacuna?",
    answer:
      "Puede usar ibuprofeno para manejar los sintomas como fiebre y dolor asociados al COVID-19 o tras la vacunacion. Consulte con su medico para determinar la dosis adecuada y asegurar que no existan contraindicaciones en su caso particular.",
  },
  {
    question: "Cada cuanto puedo darle ibuprofeno pediatrico a un nino?",
    answer:
      "En ninos, la dosis es de 10 mg/kg/dosis y se puede repetir hasta 3 o 4 veces al dia. Si la temperatura basal es inferior a 39.2 C la dosis recomendada es de 5 mg/kg; si es superior a 39.2 C la dosis recomendada es de 10 mg/kg de peso. Siempre consulte al pediatra.",
  },
  {
    question: "La capsula blanda tiene el mismo efecto que el comprimido?",
    answer:
      "Si, la capsula blanda contiene el mismo principio activo (ibuprofeno) y tiene el mismo efecto terapeutico. La diferencia principal es que la capsula blanda puede tener una absorcion mas rapida, lo que significa que puede sentir el alivio mas pronto.",
  },
  {
    question: "Despues de vacunar a un nino puedo darle Ibuprofeno?",
    answer:
      "Si, el ibuprofeno puede utilizarse para aliviar la fiebre y el malestar despues de la vacunacion en ninos. La dosificacion debe ser acorde al peso del nino y se recomienda consultar siempre con el pediatra.",
  },
]

export function FAQ() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-card py-20 md:py-28">
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#0099d6]/5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          {/* Left mascot - floating */}
          <div className="hidden md:flex md:w-1/4 md:flex-col md:items-center">
            <div className="scroll-reveal-left animate-float-medium">
              <Image
                src="/images/mascot-orange.png"
                alt="Mascota BUPREX"
                width={180}
                height={180}
                className="drop-shadow-lg"
              />
            </div>
          </div>

          {/* Right content */}
          <div className="scroll-reveal flex-1">
            <div className="mb-10 text-center md:text-left">
              <span className="mb-3 inline-block rounded-full bg-[#e31e24] px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-card">
                Dudas frecuentes
              </span>
              <h2 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Preguntas Frecuentes
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Resolvemos tus dudas mas comunes sobre BUPREX e Ibuprofeno.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="rounded-xl border border-border bg-card px-6 transition-all hover:border-[#0099d6]/30 data-[state=open]:border-[#0099d6]/50 data-[state=open]:shadow-md data-[state=open]:shadow-[#0099d6]/5"
                >
                  <AccordionTrigger className="py-5 text-left font-[var(--font-heading)] text-sm font-semibold text-foreground hover:no-underline md:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
