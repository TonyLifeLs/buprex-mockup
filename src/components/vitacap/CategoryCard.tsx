"use client"

interface CategoryCardProps {
  title: string
  description: string
  href: string
  tone?: "gold" | "sand"
}

export function CategoryCard({ title, description, href, tone = "gold" }: CategoryCardProps) {
  // gold → Sunrise (#ECC057, warm yellow); sand → Rojo vivo red with white text
  const isRed = tone === "sand"
  return (
    <a
      href={href}
      className="block rounded-2xl p-6 transition-all duration-200"
      style={{
        background: isRed ? "var(--brand-900)" : "var(--surface-gold)",
        color: isRed ? "#fff" : "var(--neutral-900)",
        border: "1.5px solid transparent",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)"
        e.currentTarget.style.boxShadow = "0 14px 28px rgba(195,49,29,0.18)"
        e.currentTarget.style.borderColor = isRed ? "var(--brand-accent)" : "var(--brand-900)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"
        e.currentTarget.style.borderColor = "transparent"
      }}
    >
      <h3 className="text-[20px] leading-[28px] font-bold">{title}</h3>
      <p className="mt-2 text-[15px] leading-[22px] opacity-85">{description}</p>
    </a>
  )
}
