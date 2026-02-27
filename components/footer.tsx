import Image from "next/image"

export function Footer() {
  return (
    <footer id="contacto" className="bg-[#0c3d6e] text-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e31e24]">
                <span className="font-[var(--font-heading)] text-lg font-extrabold text-card">
                  B
                </span>
              </div>
              <span className="font-[var(--font-heading)] text-xl font-bold tracking-tight">
                BUPREX
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-card/60">
              32 anos tratando el dolor, fiebre e inflamacion. Un producto de
              Laboratorios Life, Ecuador.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <Image
                src="/images/mascot-red.png"
                alt="Mascota roja"
                width={50}
                height={50}
              />
              <Image
                src="/images/mascot-blue.png"
                alt="Mascota azul"
                width={50}
                height={50}
              />
              <Image
                src="/images/mascot-orange.png"
                alt="Mascota naranja"
                width={50}
                height={50}
              />
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-[var(--font-heading)] text-sm font-bold uppercase tracking-widest text-card/50">
              Productos
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a href="#productos" className="text-sm text-card/60 transition-colors hover:text-card">
                  BUPREX Migra
                </a>
              </li>
              <li>
                <a href="#productos" className="text-sm text-card/60 transition-colors hover:text-card">
                  BUPREX Forte
                </a>
              </li>
              <li>
                <a href="#productos" className="text-sm text-card/60 transition-colors hover:text-card">
                  BUPREX Gotas
                </a>
              </li>
              <li>
                <a href="#productos" className="text-sm text-card/60 transition-colors hover:text-card">
                  BUPREX Pediatrico
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-[var(--font-heading)] text-sm font-bold uppercase tracking-widest text-card/50">
              Informacion
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a href="#para-que-sirve" className="text-sm text-card/60 transition-colors hover:text-card">
                  Para que sirve
                </a>
              </li>
              <li>
                <a href="#malestars" className="text-sm text-card/60 transition-colors hover:text-card">
                  Malestars
                </a>
              </li>
              <li>
                <a href="#articulos" className="text-sm text-card/60 transition-colors hover:text-card">
                  Articulos
                </a>
              </li>
              <li>
                <a
                  href="https://www.life.com.ec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-card/60 transition-colors hover:text-card"
                >
                  Laboratorios Life
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[var(--font-heading)] text-sm font-bold uppercase tracking-widest text-card/50">
              Contacto
            </h4>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="https://www.life.com.ec"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-card/60 transition-colors hover:text-card"
              >
                www.life.com.ec
              </a>
              <p className="text-sm text-card/60">Quito, Ecuador</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-card/10 pt-8 text-center">
          <p className="text-xs text-card/50">
            Lea atentamente el prospecto y ante la menor duda consulte a su
            medico y/o farmaceutico.
          </p>
          <p className="mt-2 text-xs text-card/30">
            BUPREX FLASH mini 200 mg capsulas blandas, Reg. San: 9707-MEE-0125
            / BUPREX FLASH mini 400 mg capsulas blandas, Reg. San:
            9703-MEE-0125
          </p>
        </div>
      </div>
    </footer>
  )
}
