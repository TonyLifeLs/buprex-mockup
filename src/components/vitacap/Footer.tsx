import Link from "next/link"

const nav = [
  { label: "¿Qué es Vitacap G?", href: "#que-es" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "¿Para quién es?", href: "#para-quien" },
  { label: "Cómo usarlo", href: "#como-usarlo" },
  { label: "Compra", href: "#compra" },
]

const support = [
  { label: "Soporte", href: "mailto:contacto@laboratorioslife.com" },
  { label: "Términos y condiciones", href: "#terminos" },
  { label: "Política de privacidad", href: "#privacidad" },
]

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "TikTok", href: "#" },
]

export function Footer() {
  return (
    <footer style={{ borderColor: "var(--brand-800)", backgroundColor: "var(--brand-900)" }}>
      {/* CTA band — amarillo brillante */}
      <div
        className="py-8"
        style={{ backgroundColor: "var(--brand-accent)" }}
      >
        <div className="ls-container flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-[22px] font-black leading-tight md:text-[26px]" style={{ color: "var(--neutral-900)", fontFamily: "'Montserrat', system-ui, sans-serif" }}>
              ¿Listo para activar tu día?
            </p>
            <p className="text-[15px] mt-0.5" style={{ color: "rgba(3,1,0,0.7)" }}>
              Vitacap G — Vitalidad, dinamismo y bienestar.
            </p>
          </div>
          <a
            href="#compra"
            className="shrink-0 rounded-full px-7 py-3 text-[15px] font-bold transition hover:opacity-90"
            style={{ backgroundColor: "var(--brand-900)", color: "#fff" }}
          >
            Quiero Vitacap G
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="ls-container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">

        {/* Brand column */}
        <div className="space-y-4">
          {/* Logo tipográfico: VITACAP arriba, G destacado */}
          <div className="flex flex-col items-start leading-none font-black uppercase tracking-[0.1em]" style={{ color: "#fff" }}>
            <span className="text-[15px]">VITACAP</span>
            <span className="text-[26px] leading-none" style={{ color: "var(--brand-accent)" }}>G</span>
          </div>
          <p className="text-[14px] uppercase tracking-[0.14em] font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
            Laboratorios LIFE
          </p>
          <p className="text-[15px] leading-[23px]" style={{ color: "rgba(255,255,255,0.72)" }}>
            Complemento multivitamínico para personas activas. Apoya la energía diaria y el bienestar general.
          </p>
          <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.45)" }}>
            contacto@laboratorioslife.com
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.45)" }}>
            Navegación
          </p>
          <div className="grid gap-3">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[15px] transition hover:opacity-60"
                style={{ color: "rgba(255,255,255,0.82)" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Support */}
        <div>
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.45)" }}>
            Centro de ayuda
          </p>
          <div className="grid gap-3">
            {support.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[15px] transition hover:opacity-60"
                style={{ color: "rgba(255,255,255,0.82)" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Social */}
        <div>
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.45)" }}>
            Síguenos
          </p>
          <div className="grid gap-3">
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[15px] transition hover:opacity-60"
                style={{ color: "rgba(255,255,255,0.82)" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar — vino */}
      <div
        className="border-t py-5"
        style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "var(--line-soft)" }}
      >
        <div
          className="ls-container flex flex-col gap-2 text-[12px] md:flex-row md:items-center md:justify-between"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          <span>© {new Date().getFullYear()} Laboratorios LIFE. Todos los derechos reservados.</span>
          <span>Vitacap G — Vitalidad, dinamismo, cercanía.</span>
        </div>
      </div>
    </footer>
  )
}
