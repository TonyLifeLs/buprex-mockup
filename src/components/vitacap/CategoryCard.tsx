"use client"

interface CategoryCardProps {
  title: string
  description: string
  href: string
  tone?: "gold" | "sand"
}

export function CategoryCard({ title, description, href, tone = "gold" }: CategoryCardProps) {
  const bg = tone === "gold" ? "var(--surface-gold)" : "var(--surface-sand)"
  return (
    <a
      href={href}
      className="block rounded-2xl p-6 transition-all duration-200 shadow-sm"
      style={{
        background: bg,
        color: "var(--neutral-900)",
        border: "1px solid rgba(3,1,0,0.08)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)"
        e.currentTarget.style.boxShadow = "0 14px 28px rgba(0,0,0,0.12)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.08)"
      }}
    >
      <h3 className="text-[20px] leading-[28px] font-semibold">{title}</h3>
      <p className="mt-2 text-[15px] leading-[22px] opacity-90">{description}</p>
    </a>
  )
}
