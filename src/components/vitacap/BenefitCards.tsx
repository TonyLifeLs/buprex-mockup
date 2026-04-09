"use client"

interface BenefitCard {
  title: string
  icon: string
  body: string
  color: string
  image?: string
}

export function BenefitCards({ cards }: { cards: BenefitCard[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl p-6 transition-all duration-200"
          style={{
            border: "1.5px solid #ede8e7",
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.borderColor = card.color
            ;(e.currentTarget as HTMLElement).style.boxShadow = `0 10px 28px rgba(195,49,29,0.13)`
            ;(e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.borderColor = "#ede8e7"
            ;(e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"
            ;(e.currentTarget as HTMLElement).style.transform = "translateY(0)"
          }}
        >
          {/* Icon area: image if uploaded, else emoji */}
          {card.image ? (
            <div
              className="mb-4 overflow-hidden rounded-xl"
              style={{ height: 80, width: "100%" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={card.title}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div
              className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full text-[22px]"
              style={{ backgroundColor: card.color + "14" }}
            >
              {card.icon}
            </div>
          )}
          <h4
            className="text-[19px] leading-[25px] font-bold"
            style={{ color: card.color }}
          >
            {card.title}
          </h4>
          <p className="mt-2 text-[15px] leading-[22px]" style={{ color: "var(--neutral-900)", opacity: 0.75 }}>
            {card.body}
          </p>
        </div>
      ))}
    </div>
  )
}
