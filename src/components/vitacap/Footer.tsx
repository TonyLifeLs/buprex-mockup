import Link from "next/link"

const nav = [
  { label: "Vitacap G", href: "#vitacap" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Ingredientes", href: "#ingredientes" },
  { label: "Compra", href: "#compra" },
]

const support = [
  { label: "Soporte", href: "mailto:contacto@laboratorioslife.com" },
  { label: "Términos", href: "#terminos" },
  { label: "Privacidad", href: "#privacidad" },
]

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--line-soft)", backgroundColor: "var(--neutral-100)" }}>
      <div className="ls-container grid gap-8 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full" style={{ backgroundColor: "var(--brand-900)" }} />
            <div>
              <p className="text-[13px] uppercase tracking-[0.16em]" style={{ color: "var(--brand-900)" }}>
                Laboratorios LIFE
              </p>
              <p className="text-[16px] font-semibold" style={{ color: "var(--neutral-900)" }}>
                Vitacap G
              </p>
            </div>
          </div>
          <p className="text-[15px] leading-[22px]" style={{ color: "var(--neutral-900)", opacity: 0.8 }}>
            Fórmulas premium inspiradas en tecnología transdérmica para cabello, piel y uñas.
          </p>
          <p className="text-[14px]" style={{ color: "var(--neutral-900)", opacity: 0.7 }}>
            contacto@laboratorioslife.com · +51 1 555 0101
          </p>
        </div>

        <div>
          <p className="text-[14px] font-semibold" style={{ color: "var(--neutral-900)" }}>
            Navegación
          </p>
          <div className="mt-3 grid gap-2 text-[15px]" style={{ color: "var(--neutral-900)" }}>
            {nav.map((item) => (
              <Link key={item.label} href={item.href} className="transition hover:opacity-70">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[14px] font-semibold" style={{ color: "var(--neutral-900)" }}>
            Centro de ayuda
          </p>
          <div className="mt-3 grid gap-2 text-[15px]" style={{ color: "var(--neutral-900)" }}>
            {support.map((item) => (
              <Link key={item.label} href={item.href} className="transition hover:opacity-70">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t py-4" style={{ borderColor: "var(--line-soft)", backgroundColor: "var(--neutral-100)" }}>
        <div className="ls-container flex flex-col gap-2 text-[13px] md:flex-row md:items-center md:justify-between" style={{ color: "var(--neutral-900)", opacity: 0.75 }}>
          <span>© {new Date().getFullYear()} Laboratorios LIFE. Todos los derechos reservados.</span>
          <span>Hecho con tonos vino y oro Vitacap.</span>
        </div>
      </div>
    </footer>
  )
}
