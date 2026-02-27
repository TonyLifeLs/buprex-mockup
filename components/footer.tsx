import { Youtube, Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer id="contacto" className="bg-[#0c3d6e] text-white">
      {/* Disclaimer bar */}
      <div className="border-b border-white/10 bg-[#0b2a4a] px-6 py-4">
        <p className="mx-auto max-w-5xl text-center text-xs font-semibold uppercase tracking-wide text-white/90">
          LEA ATENTAMENTE EL PROSPECTO Y ANTE LA MENOR DUDA CONSULTE A SU MEDICO Y/O FARMACEUTICO.
        </p>
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-center gap-6">
          {/* Website */}
          <a
            href="https://www.life.com.ec"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            www.life.com.ec
          </a>

          {/* Social icons in circles */}
          <div className="flex items-center gap-4">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0c3d6e] transition-all hover:scale-110 hover:shadow-lg"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0c3d6e] transition-all hover:scale-110 hover:shadow-lg"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0c3d6e] transition-all hover:scale-110 hover:shadow-lg"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>

          {/* BUPREX Logo text */}
          <div className="flex flex-col items-center gap-1">
            <span className="font-[var(--font-heading)] text-4xl font-extrabold tracking-tight text-[#f5d030]">
              BUPREX
              <sup className="text-sm">&#174;</sup>
            </span>
            <span className="text-xs font-medium tracking-widest text-white/60">
              Ibuprofeno
            </span>
          </div>

          {/* Registration info */}
          <p className="max-w-xl text-center text-[10px] leading-relaxed text-white/30">
            BUPREX FLASH mini 200 mg capsulas blandas, Reg. San: 9707-MEE-0125 / BUPREX FLASH mini 400 mg capsulas blandas, Reg. San: 9703-MEE-0125
          </p>
        </div>
      </div>
    </footer>
  )
}
