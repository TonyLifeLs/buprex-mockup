import Image from "next/image"

const products = [
  {
    name: "BUPREX Flash Mini",
    variant: "Capsulas 200mg y 400mg",
    image: "/images/woman-capsule.png",
    description:
      "Capsula blanda mas pequena del pais. Accion ultrarrapida para alivio del dolor, fiebre e inflamacion. Adultos y ninos desde 12 anos.",
    color: "border-[#e31e24]",
    tagColor: "bg-[#e31e24]",
  },
  {
    name: "BUPREX Migra",
    variant: "Comprimidos Recubiertos",
    image: "/images/buprex-migra.png",
    description:
      "Ibuprofeno 400mg + Cafeina 100mg. 20 comprimidos recubiertos para el alivio del dolor de cabeza intenso y migrana.",
    color: "border-[#0c3d6e]",
    tagColor: "bg-[#0c3d6e]",
  },
  {
    name: "BUPREX Forte",
    variant: "Suspension 200mg/5ml",
    image: "/images/buprex-forte.png",
    description:
      "Ibuprofeno 200 mg por cada 5 ml. Triple Accion: Baja la fiebre, alivia el dolor y desinflama. Uso pediatrico, 120ml.",
    color: "border-[#0099d6]",
    tagColor: "bg-[#0099d6]",
  },
  {
    name: "BUPREX Gotas",
    variant: "Suspension 40mg/ml",
    image: "/images/buprex-gotas.png",
    description:
      "Ibuprofeno 40 mg por ml. Triple Accion para los mas pequenos. Suspension pediatrica con gotero, sabor naranja, 30ml.",
    color: "border-[#0099d6]",
    tagColor: "bg-[#0099d6]",
  },
  {
    name: "BUPREX Pediatrico",
    variant: "Suspension 100mg/5ml",
    image: "/images/buprex-pediatrico.png",
    description:
      "Ibuprofeno 100 mg por cada 5 ml. Triple Accion formulado especialmente para ninos. Sabor naranja, 120ml.",
    color: "border-[#0099d6]",
    tagColor: "bg-[#0099d6]",
  },
]

export function Products() {
  return (
    <section id="productos" className="bg-secondary/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-[#e31e24] px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-card">
            Nuestra linea
          </span>
          <h2 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Productos BUPREX
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Si los malestares hacen su aparicion, BUPREX los calma con su gran accion.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((product) => (
            <div
              key={product.name}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 ${product.color} bg-card transition-all hover:shadow-xl`}
            >
              <div className="relative flex h-56 items-center justify-center bg-card p-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={220}
                  height={220}
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span
                  className={`mb-2 inline-block w-fit rounded-full ${product.tagColor} px-3 py-1 text-xs font-bold text-card`}
                >
                  {product.variant}
                </span>
                <h3 className="font-[var(--font-heading)] text-lg font-bold text-foreground">
                  {product.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
