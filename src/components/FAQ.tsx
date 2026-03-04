"use client"

import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCMSStore } from "@/store/cms"

export function FAQ() {
  const sectionRef = useScrollReveal()
  const faqs = useCMSStore((s) => s.faqs)

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-card py-20 md:py-28">
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#0099d6]/5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          {/* Left mascot - floating */}
          <div className="hidden md:flex md:w-1/4 md:flex-col md:items-center">
            <div className="scroll-reveal-left animate-float-medium flex items-center justify-center rounded-full border-[6px] border-[#0099d6] bg-white p-3 shadow-[0_0_0_4px_rgba(0,153,214,0.18),0_8px_32px_rgba(0,153,214,0.18)]" style={{ width: 220, height: 220 }}>
              <Image
                src="/images/todos-buprex.png"
                alt="Mascota BUPREX"
                width={190}
                height={190}
                className="drop-shadow-lg object-contain"
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
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={`faq-${faq.id}`}
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
