"use client"

import Image from "next/image"
import { useState, useMemo } from "react"
import {
  ShoppingCart,
  Star,
  Heart,
  Search,
  Menu,
  X,
  ChevronRight,
  Shield,
  Truck,
  RotateCcw,
  ArrowRight,
  Check,
  Leaf,
  Droplets,
  Sparkles,
  Instagram,
  Facebook,
  Youtube,
  SlidersHorizontal,
  Grid2X2,
  LayoutList,
  Tag,
  Package,
  ChevronDown,
  Minus,
  Plus,
  Trash2,
  BadgeCheck,
  Clock,
  FlaskConical,
  Zap,
} from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// ██  CUSTOMIZABLE CONFIG  ██  Edit everything here  ██
// ─────────────────────────────────────────────────────────────────────────────

const BRAND = {
  name: "Labo Suisse",
  sub: "DERMA",
  tagline: "Ciencia suiza para tu piel",
  logo: "/images/buprex-logo.png",
  colors: {
    primary: "#0c3d6e",
    accent: "#e31e24",
    blue: "#0099d6",
    lightBlue: "#00b2ff",
    dark: "#0b2a4a",
  },
}

const NAV_LINKS = ["Inicio", "Tienda", "Tratamientos", "Laboratorio", "Blog", "Contacto"]

const HERO = {
  badge: "Nueva Línea Dermatológica 2026",
  title: "Tu piel merece",
  highlight: "ciencia suiza",
  description:
    "Formulaciones avanzadas por especialistas. Más de 15 años de I+D en dermatología clínica con ingredientes de origen suizo y tecnología de última generación.",
  cta1: "Ir a la tienda",
  cta2: "Conocer el laboratorio",
  heroImage: "/images/woman-capsule.png",
  stats: [
    { value: "98%", label: "Testado dermatológicamente" },
    { value: "15+", label: "Años de investigación" },
    { value: "50 K+", label: "Clientes satisfechos" },
    { value: "12", label: "Países con presencia" },
  ],
}

const TRUST_STRIP = [
  { icon: "shield",   text: "Hipoalergénico" },
  { icon: "leaf",     text: "Sin parabenos" },
  { icon: "droplets", text: "Ultra hidratante" },
  { icon: "sparkles", text: "Resultados en 7 días" },
  { icon: "flask",    text: "Fórmula clínica suiza" },
  { icon: "zap",      text: "Absorción instantánea" },
]

const CATEGORIES = [
  { id: "all",         label: "Todos" },
  { id: "hidratacion", label: "Hidratación" },
  { id: "proteccion",  label: "Protección" },
  { id: "tratamiento", label: "Tratamiento" },
  { id: "pediatrico",  label: "Pediátrico" },
]

const SORT_OPTIONS = [
  "Relevancia",
  "Precio: menor a mayor",
  "Precio: mayor a menor",
  "Mejor valorado",
  "Novedades",
]

// ─── Products ────────────────────────────────────────────────────────────────
// Change image / name / price here to update the shop
const PRODUCTS = [
  {
    id: "p1",
    name: "BUPREX Flash",
    subtitle: "Serum Acción Rápida 400 mg",
    image: "/images/buprex-flash.png",
    hoverImage: "/images/todos-buprex.png",
    price: 24.9,
    oldPrice: 29.9,
    rating: 4.9,
    reviews: 342,
    badge: "Más Vendido",
    badgeColor: "#e31e24",
    description: "Serum de alta concentración con efecto inmediato para pieles sensibles y reactivas.",
    category: "tratamiento",
    isNew: false,
    stock: 18,
  },
  {
    id: "p2",
    name: "BUPREX Migra",
    subtitle: "Crema Calmante Intensiva",
    image: "/images/buprex-migra.png",
    hoverImage: "/images/buprex-ibuprofeno.png",
    price: 19.5,
    oldPrice: null,
    rating: 4.7,
    reviews: 218,
    badge: "Nuevo",
    badgeColor: "#e31e24",
    description: "Fórmula que calma y regenera la piel dañada en profundidad en 24 horas.",
    category: "tratamiento",
    isNew: true,
    stock: 24,
  },
  {
    id: "p3",
    name: "BUPREX Mini",
    subtitle: "Gel Hidratante Diario 50 ml",
    image: "/images/buprex-mini.png",
    hoverImage: "/images/capsula-buprex.png",
    price: 14.9,
    oldPrice: 17.9,
    rating: 4.8,
    reviews: 156,
    badge: "Oferta",
    badgeColor: "#f59e0b",
    description: "Textura ligera de absorción rápida. Hidratación profunda sin residuos grasos.",
    category: "hidratacion",
    isNew: false,
    stock: 31,
  },
  {
    id: "p4",
    name: "INFLAMON Derma",
    subtitle: "Anti-Inflamatorio Tópico",
    image: "/images/inflamon.png",
    hoverImage: "/images/inflamon-estrellas.png",
    price: 22.9,
    oldPrice: null,
    rating: 4.6,
    reviews: 289,
    badge: "Recomendado",
    badgeColor: "#0099d6",
    description: "Reduce la inflamación y el enrojecimiento cutáneo. Apto para uso continuado.",
    category: "proteccion",
    isNew: false,
    stock: 9,
  },
  {
    id: "p5",
    name: "BUPREX Pediátrico",
    subtitle: "Loción Suave para Niños",
    image: "/images/buprex-pediatrico.png",
    hoverImage: "/images/mascot-blue.png",
    price: 16.9,
    oldPrice: 19.9,
    rating: 4.9,
    reviews: 412,
    badge: "Pediátrico",
    badgeColor: "#22c55e",
    description: "Formulación ultra-suave diseñada especialmente para pieles de bebés y niños.",
    category: "pediatrico",
    isNew: false,
    stock: 22,
  },
  {
    id: "p6",
    name: "INFLAMON Suspensión",
    subtitle: "Spray Dérmico 200 ml",
    image: "/images/inflamon-suspension.png",
    hoverImage: "/images/dolores-suspension.png",
    price: 18.5,
    oldPrice: 21.0,
    rating: 4.5,
    reviews: 174,
    badge: "Premium",
    badgeColor: "#7c3aed",
    description: "Spray para zonas de difícil acceso. Tecnología micro-partícula suiza.",
    category: "proteccion",
    isNew: false,
    stock: 15,
  },
  {
    id: "p7",
    name: "BUPREX Ibuprofeno",
    subtitle: "Crema Tópica 5% — 60 g",
    image: "/images/buprex-ibuprofeno.png",
    hoverImage: "/images/buprex-flash.png",
    price: 12.9,
    oldPrice: null,
    rating: 4.7,
    reviews: 193,
    badge: "Clínico",
    badgeColor: "#0c3d6e",
    description: "Ibuprofeno tópico al 5% para el alivio localizado de dolor e inflamación.",
    category: "tratamiento",
    isNew: false,
    stock: 40,
  },
  {
    id: "p8",
    name: "BUPREX Suspensión",
    subtitle: "Hidratación Corporal 250 ml",
    image: "/images/buprex-suspension.png",
    hoverImage: "/images/dolores.png",
    price: 21.9,
    oldPrice: 25.9,
    rating: 4.8,
    reviews: 267,
    badge: "Nuevo",
    badgeColor: "#e31e24",
    description: "Emulsión corporal de larga duración con extracto de aloe suizo y ceramidas.",
    category: "hidratacion",
    isNew: true,
    stock: 12,
  },
  {
    id: "p9",
    name: "INFLAMON Plus",
    subtitle: "Serum Concentrado 30 ml",
    image: "/images/inflamon.png",
    hoverImage: "/images/inflamon-suspension.png",
    price: 31.9,
    oldPrice: 36.9,
    rating: 4.9,
    reviews: 88,
    badge: "Premium",
    badgeColor: "#7c3aed",
    description: "Serum antiinflamatorio de alta concentración. Apto para pieles atópicas.",
    category: "tratamiento",
    isNew: true,
    stock: 7,
  },
]

const FEATURED_BANNER = {
  title: "Línea Profesional",
  highlight: "Anti-Edad Avanzada",
  description:
    "Retinol encapsulado + Péptidos de señalización. El protocolo clínico de los dermatólogos suizos ahora en casa.",
  cta: "Descubrir ahora",
  tag: "Nuevo lanzamiento",
  image: "/images/woman-capsule.png",
  discount: "30% OFF",
  code: "ANTIEDAD30",
}

const FEATURES = [
  {
    icon: "shield",
    title: "100% Testado Clínicamente",
    description:
      "Todos los productos superan controles en pieles sensibles, atópicas y normales en laboratorios certificados.",
  },
  {
    icon: "leaf",
    title: "Ingredientes Suizos",
    description:
      "Extractos botánicos de los Alpes suizos combinados con biotecnología de última generación.",
  },
  {
    icon: "truck",
    title: "Envío en 24 / 48 h",
    description:
      "Embalaje isotérmico que preserva la integridad de los activos en cualquier temperatura.",
  },
  {
    icon: "rotate",
    title: "Garantía 30 días",
    description:
      "Si no quedas satisfecho, devolvemos el importe íntegro. Sin preguntas, sin formularios.",
  },
]

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Dra. María González",
    role: "Dermatóloga — Madrid",
    avatar: "/images/mascot-blue.png",
    rating: 5,
    text: "Recomiendo la línea DERMA a todos mis pacientes. Los resultados son notables desde la primera semana y la tolerancia incluso en pieles sensibles es excelente.",
  },
  {
    id: "t2",
    name: "Carlos Rodríguez",
    role: "Cliente Premium",
    avatar: "/images/mascot-orange.png",
    rating: 5,
    text: "Llevaba años buscando algo que realmente funcionase para mi piel sensible. BUPREX Derma ha sido un antes y un después. ¡Resultados sorprendentes!",
  },
  {
    id: "t3",
    name: "Ana Martínez",
    role: "Farmacéutica — Barcelona",
    avatar: "/images/mascot-red.png",
    rating: 5,
    text: "La calidad de los ingredientes y la concentración de activos es superior a cualquier otra marca. Mis clientes vuelven a por más cada semana.",
  },
]

const ARTICLES = [
  {
    id: "a1",
    category: "Dermatología",
    title: "5 hábitos para mantener una piel sana todo el año",
    excerpt:
      "Descubre los secretos de los dermatólogos suizos para una piel radiante en cualquier estación.",
    image: "/images/article-postura.jpg",
    date: "28 Feb 2026",
    readTime: "4 min",
  },
  {
    id: "a2",
    category: "Nutrición",
    title: "La dieta antiinflamatoria y su impacto en la piel",
    excerpt:
      "Lo que comes se refleja en tu piel. Aprende qué alimentos potencian tu rutina dermatológica.",
    image: "/images/article-fiebre.jpg",
    date: "14 Feb 2026",
    readTime: "6 min",
  },
  {
    id: "a3",
    category: "Investigación",
    title: "Nuevos avances en tratamientos tópicos anti-edad",
    excerpt:
      "Labo Suisse presenta los últimos resultados de sus ensayos clínicos con retinol encapsulado.",
    image: "/images/article-migrana.jpg",
    date: "2 Feb 2026",
    readTime: "5 min",
  },
]

const FOOTER_COLS = [
  {
    title: "Productos",
    links: ["Hidratación", "Protección Solar", "Anti-Edad", "Pediátrico", "Novedades"],
  },
  {
    title: "Empresa",
    links: ["Sobre Nosotros", "Investigación", "Sostenibilidad", "Prensa", "Trabaja con Nosotros"],
  },
  {
    title: "Ayuda",
    links: ["FAQ", "Contacto", "Envíos", "Devoluciones", "Farmacéuticos"],
  },
]

// ─── Types ────────────────────────────────────────────────────────────────────
type Product = (typeof PRODUCTS)[0]
type CartItem = { product: Product; qty: number }

// ─── Helpers ─────────────────────────────────────────────────────────────────

function TrustIcon({ name, cls = "h-4 w-4" }: { name: string; cls?: string }) {
  switch (name) {
    case "shield":    return <Shield    className={cls} />
    case "leaf":      return <Leaf      className={cls} />
    case "droplets":  return <Droplets  className={cls} />
    case "sparkles":  return <Sparkles  className={cls} />
    case "truck":     return <Truck     className={cls} />
    case "rotate":    return <RotateCcw className={cls} />
    case "flask":     return <FlaskConical className={cls} />
    case "zap":       return <Zap       className={cls} />
    case "badge":     return <BadgeCheck className={cls} />
    case "clock":     return <Clock     className={cls} />
    default:          return <Check     className={cls} />
  }
}

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const px = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${px} ${n <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
  )
}

// ─── Product Card ────────────────────────────────────────────────────────────

function ProductCard({
  product,
  layout,
  wished,
  onWish,
  onAdd,
}: {
  product: Product
  layout: "grid" | "list"
  wished: boolean
  onWish: () => void
  onAdd: () => void
}) {
  const [added, setAdded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null

  const handleAdd = () => {
    setAdded(true)
    onAdd()
    setTimeout(() => setAdded(false), 1600)
  }

  if (layout === "list") {
    return (
      <div className="flex gap-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-slate-50 to-gray-100">
          <Image src={product.image} alt={product.name} width={96} height={96} className="h-20 w-auto object-contain" />
          {discount && (
            <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#e31e24] text-[10px] font-black text-white">
              -{discount}%
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#e31e24]">{product.badge}</p>
                <h3 className="text-base font-extrabold text-[#0c3d6e]">{product.name}</h3>
                <p className="text-sm text-gray-400">{product.subtitle}</p>
              </div>
              <button onClick={onWish} className="shrink-0 p-1">
                <Heart className={`h-4 w-4 ${wished ? "fill-rose-500 text-rose-500" : "text-gray-300"}`} />
              </button>
            </div>
            <p className="mt-1 line-clamp-1 text-xs text-gray-500">{product.description}</p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Stars rating={product.rating} />
              <span className="text-xs text-gray-400">({product.reviews})</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-extrabold text-[#0c3d6e]">{product.price.toFixed(2)}€</span>
                {product.oldPrice && <span className="text-xs text-gray-400 line-through">{product.oldPrice.toFixed(2)}€</span>}
              </div>
              <button
                onClick={handleAdd}
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white transition-all"
                style={{ background: added ? "#22c55e" : "linear-gradient(135deg,#0c3d6e,#0099d6)" }}
              >
                {added ? <><Check className="h-3 w-3" /> Añadido</> : <><ShoppingCart className="h-3 w-3" /> Añadir</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badges */}
      <div
        className="absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow"
        style={{ backgroundColor: product.badgeColor }}
      >
        {product.badge}
      </div>
      {discount && (
        <div className="absolute left-3 top-9 z-10 mt-1 rounded-full bg-[#0c3d6e] px-2.5 py-0.5 text-[10px] font-bold text-white">
          -{discount}%
        </div>
      )}
      {product.isNew && (
        <div className="absolute right-10 top-3 z-10 rounded-full bg-[#e31e24] px-2.5 py-0.5 text-[10px] font-bold text-white">
          NEW
        </div>
      )}

      {/* Wishlist */}
      <button
        onClick={onWish}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow transition-transform hover:scale-110"
      >
        <Heart className={`h-4 w-4 transition-colors ${wished ? "fill-rose-500 text-rose-500" : "text-gray-400"}`} />
      </button>

      {/* Image with hover swap */}
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-gray-100 p-6">
        <Image
          src={hovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          width={160}
          height={160}
          className="h-36 w-auto object-contain drop-shadow-md transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#0c3d6e]/90 py-2.5 text-center text-xs font-bold text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
          Vista rápida
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#e31e24]">{product.category}</span>
          <h3 className="mt-0.5 text-base font-extrabold text-[#0c3d6e]">{product.name}</h3>
          <p className="text-xs text-gray-400">{product.subtitle}</p>
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">{product.description}</p>

        <div className="flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {product.stock <= 10 && (
          <p className="text-[10px] font-bold text-amber-500">¡Solo quedan {product.stock} unidades!</p>
        )}

        {/* Price + Cart */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-[#0c3d6e]">{product.price.toFixed(2)}€</span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">{product.oldPrice.toFixed(2)}€</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold text-white shadow transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{ background: added ? "#22c55e" : "linear-gradient(135deg,#0c3d6e 0%,#0099d6 100%)" }}
          >
            {added ? (
              <><Check className="h-4 w-4" /><span>Añadido</span></>
            ) : (
              <><ShoppingCart className="h-4 w-4" /><span>Añadir</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Cart Sidebar ─────────────────────────────────────────────────────────────

function CartSidebar({
  open,
  onClose,
  items,
  onQty,
  onRemove,
}: {
  open: boolean
  onClose: () => void
  items: CartItem[]
  onQty: (id: string, delta: number) => void
  onRemove: (id: string) => void
}) {
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-[#0c3d6e]" />
            <h2 className="text-base font-extrabold text-[#0c3d6e]">Carrito ({count})</h2>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center text-gray-400">
              <Package className="h-16 w-16 opacity-20" />
              <p className="text-sm font-semibold">Tu carrito está vacío</p>
              <button onClick={onClose} className="rounded-full bg-[#0c3d6e] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90">
                Ir a la tienda
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-4 rounded-xl border border-gray-100 p-3">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                    <Image src={product.image} alt={product.name} width={52} height={52} className="h-12 w-auto object-contain" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <p className="text-sm font-bold text-[#0c3d6e]">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.subtitle}</p>
                      </div>
                      <button onClick={() => onRemove(product.id)} className="text-gray-300 hover:text-rose-500">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-gray-200 px-2 py-1">
                        <button onClick={() => onQty(product.id, -1)} className="text-gray-500 hover:text-[#0c3d6e]">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-xs font-bold">{qty}</span>
                        <button onClick={() => onQty(product.id, 1)} className="text-gray-500 hover:text-[#0c3d6e]">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-extrabold text-[#0c3d6e]">{(product.price * qty).toFixed(2)}€</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-3 border-t border-gray-100 px-6 py-5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-bold text-[#0c3d6e]">{total.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Envío</span>
              <span className="font-bold text-green-600">{total >= 40 ? "GRATIS" : "4.90€"}</span>
            </div>
            {total < 40 && (
              <p className="rounded-xl bg-blue-50 px-3 py-2 text-xs text-blue-600">
                Añade {(40 - total).toFixed(2)}€ más para envío gratuito
              </p>
            )}
            <button className="w-full rounded-full bg-gradient-to-r from-[#0c3d6e] to-[#0099d6] py-3.5 text-sm font-extrabold text-white shadow-lg transition-all hover:-translate-y-0.5">
              Finalizar compra →
            </button>
            <button onClick={onClose} className="w-full rounded-full border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50">
              Seguir comprando
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DermaPage() {
  // — UI state —
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [layout, setLayout] = useState<"grid" | "list">("grid")
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  // — Cart state —
  const [cart, setCart] = useState<CartItem[]>([])
  const [wished, setWished] = useState<Set<string>>(new Set())

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { product, qty: 1 }]
    })
  }

  function updateQty(id: string, delta: number) {
    setCart((prev) =>
      prev
        .map((i) => i.product.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
        .filter((i) => i.qty > 0)
    )
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((i) => i.product.id !== id))
  }

  function toggleWish(id: string) {
    setWished((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // — Filtered & sorted products —
  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory
      const matchQ =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchQ
    })
    if (sortBy === "Precio: menor a mayor") list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === "Precio: mayor a menor") list = [...list].sort((a, b) => b.price - a.price)
    if (sortBy === "Mejor valorado")        list = [...list].sort((a, b) => b.rating - a.rating)
    if (sortBy === "Novedades")             list = [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    return list
  }, [activeCategory, sortBy, searchQuery])

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* ══════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════ */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <Image src={BRAND.logo} alt={BRAND.name} width={160} height={40} className="h-8 w-auto object-contain" />
            <span className="hidden rounded-full bg-[#e31e24]/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#e31e24] md:block">
              {BRAND.sub}
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-gray-600 transition-all hover:bg-[#0c3d6e] hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar producto…"
                className="h-9 rounded-full border border-gray-200 bg-gray-50 pl-8 pr-4 text-xs text-gray-600 outline-none focus:border-[#0c3d6e] focus:bg-white"
              />
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#e31e24] text-[9px] font-black text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 md:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">
            <div className="mb-3 flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
              <Search className="h-3.5 w-3.5 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar…"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section
        id="inicio"
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0b2a4a 0%,#0c3d6e 45%,#0099d6 80%,#00b2ff 100%)" }}
      >
        <div className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute right-1/3 top-1/3 h-48 w-48 rounded-full bg-[#e31e24]/10" />

        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-16 md:flex-row md:py-24">
          <div className="flex-1 text-center md:text-left">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              <Sparkles className="h-3 w-3 text-[#f5d030]" />
              {HERO.badge}
            </span>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {HERO.title}{" "}
              <span className="block" style={{ background: "linear-gradient(90deg,#f5d030,#f5a623)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {HERO.highlight}
              </span>
            </h1>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">{HERO.description}</p>
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <a href="#tienda" className="flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-extrabold text-white shadow-lg transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#e31e24 0%,#b01010 100%)" }}>
                {HERO.cta1} <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#laboratorio" className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                {HERO.cta2}
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {HERO.stats.map((st) => (
                <div key={st.label} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur-sm">
                  <div className="text-2xl font-extrabold text-white">{st.value}</div>
                  <div className="mt-0.5 text-[10px] leading-tight text-white/60">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex flex-1 items-center justify-center">
            <div className="absolute h-80 w-80 rounded-full bg-[#0099d6]/20 blur-3xl" />
            <Image src={HERO.heroImage} alt="Derma Hero" width={520} height={520} priority
              className="relative z-10 h-72 w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,178,255,0.35)] md:h-[28rem]"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 56L1440 56L1440 28C1200 56 900 0 720 18C540 36 240 0 0 28L0 56Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TRUST STRIP
      ══════════════════════════════════════════════ */}
      <section className="bg-white pb-2 pt-5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {TRUST_STRIP.map((t) => (
              <div key={t.text} className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-slate-50 px-4 py-3 shadow-sm">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0c3d6e]/10 text-[#0c3d6e]">
                  <TrustIcon name={t.icon} cls="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold text-gray-700">{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED BANNER
      ══════════════════════════════════════════════ */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl shadow-xl" style={{ background: "linear-gradient(135deg,#0b2a4a 0%,#e31e24 100%)" }}>
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-white/5" />
            <div className="flex flex-col items-center justify-between gap-8 px-8 py-10 md:flex-row">
              <div className="z-10 text-center md:text-left">
                <span className="mb-3 inline-block rounded-full border border-white/30 bg-white/15 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  {FEATURED_BANNER.tag}
                </span>
                <h2 className="text-3xl font-extrabold text-white md:text-4xl">{FEATURED_BANNER.title}</h2>
                <p className="text-2xl font-extrabold md:text-3xl" style={{ background: "linear-gradient(90deg,#f5d030,#f5a623)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {FEATURED_BANNER.highlight}
                </p>
                <p className="mt-3 max-w-sm text-sm text-white/75">{FEATURED_BANNER.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a href="#tienda" className="flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-extrabold text-[#0c3d6e] shadow transition-all hover:-translate-y-0.5">
                    {FEATURED_BANNER.cta} <ArrowRight className="h-4 w-4" />
                  </a>
                  <div className="rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-center">
                    <div className="text-2xl font-black text-white">{FEATURED_BANNER.discount}</div>
                    <div className="text-xs text-white/70">código: <strong className="text-white">{FEATURED_BANNER.code}</strong></div>
                  </div>
                </div>
              </div>
              <div className="relative z-10 shrink-0">
                <Image src={FEATURED_BANNER.image} alt="Featured" width={320} height={320} className="h-48 w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] md:h-64" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SHOP / PRODUCT CATALOG
      ══════════════════════════════════════════════ */}
      <section id="tienda" className="py-10" style={{ background: "linear-gradient(180deg,#f8fafc 0%,#eef2f7 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6">
            <span className="mb-2 inline-block rounded-full bg-[#0c3d6e]/10 px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0c3d6e]">Tienda Online</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0c3d6e] md:text-4xl">Línea Dermatológica Labo Suisse</h2>
            <p className="mt-2 max-w-xl text-sm text-gray-500">Selección de productos clínicamente testados para el cuidado avanzado de la piel.</p>
          </div>

          {/* Toolbar */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    activeCategory === cat.id ? "bg-[#0c3d6e] text-white shadow" : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}>{cat.label}</button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-7 text-xs font-semibold text-gray-600 outline-none focus:border-[#0c3d6e]">
                  {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex overflow-hidden rounded-full border border-gray-200 bg-white">
                <button onClick={() => setLayout("grid")} className={`px-3 py-1.5 transition-colors ${layout === "grid" ? "bg-[#0c3d6e] text-white" : "text-gray-500"}`}>
                  <Grid2X2 className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => setLayout("list")} className={`px-3 py-1.5 transition-colors ${layout === "list" ? "bg-[#0c3d6e] text-white" : "text-gray-500"}`}>
                  <LayoutList className="h-3.5 w-3.5" />
                </button>
              </div>
              <button onClick={() => setShowFilters((v) => !v)}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filtros
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mb-6 grid grid-cols-2 gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:grid-cols-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">Precio</p>
                <div className="flex flex-col gap-1 text-sm">
                  {["Menos de 15€","15€ – 25€","Más de 25€"].map((r) => (
                    <label key={r} className="flex cursor-pointer items-center gap-2 text-gray-600">
                      <input type="radio" name="price" className="accent-[#0c3d6e]" /> {r}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">Valoración</p>
                <div className="flex flex-col gap-1 text-sm">
                  {["5 estrellas","4+ estrellas","3+ estrellas"].map((r) => (
                    <label key={r} className="flex cursor-pointer items-center gap-2 text-gray-600">
                      <input type="checkbox" className="accent-[#0c3d6e]" /> {r}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">Tipo de piel</p>
                <div className="flex flex-col gap-1 text-sm">
                  {["Seca","Grasa","Mixta","Sensible","Atópica"].map((r) => (
                    <label key={r} className="flex cursor-pointer items-center gap-2 text-gray-600">
                      <input type="checkbox" className="accent-[#0c3d6e]" /> {r}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">Etiquetas</p>
                <div className="flex flex-wrap gap-1.5">
                  {["Nuevo","Oferta","Más Vendido","Premium"].map((tag) => (
                    <button key={tag} className="flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1 text-[10px] font-bold text-gray-500 hover:border-[#0c3d6e] hover:text-[#0c3d6e]">
                      <Tag className="h-2.5 w-2.5" /> {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <p className="mb-4 text-xs text-gray-400">
            Mostrando <strong className="text-[#0c3d6e]">{filtered.length}</strong> productos
            {searchQuery && <> para &ldquo;<span className="font-semibold text-[#e31e24]">{searchQuery}</span>&rdquo;</>}
          </p>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center text-gray-400">
              <Package className="h-16 w-16 opacity-20" />
              <p className="font-semibold">No se encontraron productos</p>
              <button onClick={() => { setSearchQuery(""); setActiveCategory("all") }}
                className="rounded-full bg-[#0c3d6e] px-6 py-2.5 text-sm font-bold text-white">
                Limpiar filtros
              </button>
            </div>
          ) : layout === "grid" ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} layout="grid"
                  wished={wished.has(p.id)} onWish={() => toggleWish(p.id)} onAdd={() => addToCart(p)} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} layout="list"
                  wished={wished.has(p.id)} onWish={() => toggleWish(p.id)} onAdd={() => addToCart(p)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PROMO STRIP
      ══════════════════════════════════════════════ */}
      <section className="py-12" style={{ background: "linear-gradient(135deg,#0c3d6e 0%,#e31e24 55%,#b01010 100%)" }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm font-bold uppercase tracking-widest text-white/80">Oferta por tiempo limitado</p>
            <h2 className="mt-1 text-3xl font-extrabold text-white md:text-4xl">20% OFF en tu primera compra</h2>
            <p className="mt-1 text-white/80">Usa el código <strong className="rounded-lg bg-white/20 px-2 py-0.5 text-white">DERMABIENVENIDA</strong> al finalizar tu pedido</p>
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <div className="rounded-2xl border-2 border-white/40 bg-white/10 px-10 py-4 text-center backdrop-blur-sm">
              <div className="text-4xl font-black text-white">20%</div>
              <div className="text-xs text-white/80">DESCUENTO</div>
            </div>
            <a href="#tienda" className="flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-extrabold text-[#0c3d6e] shadow-lg transition-all hover:-translate-y-0.5">
              Comprar ahora <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHY US / FEATURES
      ══════════════════════════════════════════════ */}
      <section id="laboratorio" className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-[#e31e24]/10 px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#e31e24]">Por qué elegirnos</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0c3d6e] md:text-4xl">El estándar suizo en dermatología</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0c3d6e] to-[#0099d6] text-white shadow-md transition-transform group-hover:scale-110">
                  <TrustIcon name={f.icon} cls="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-sm font-extrabold text-[#0c3d6e]">{f.title}</h3>
                <p className="text-xs leading-relaxed text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(180deg, #f0f4f8 0%, #e8ecf0 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-amber-100 px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-600">
              Opiniones
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0c3d6e] md:text-4xl">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <Stars rating={t.rating} size="md" />
                <p className="flex-1 text-sm italic leading-relaxed text-gray-600">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                    <Image src={t.avatar} alt={t.name} width={40} height={40} className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0c3d6e]">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BLOG / ARTICLES
      ══════════════════════════════════════════ */}
      <section id="blog" className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="mb-3 inline-block rounded-full bg-[#0c3d6e]/10 px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0c3d6e]">
                Blog &amp; Ciencia
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#0c3d6e] md:text-4xl">
                Últimas publicaciones
              </h2>
            </div>
            <a href="#" className="flex items-center gap-2 text-sm font-bold text-[#e31e24] hover:underline">
              Ver todos los artículos <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {ARTICLES.map((a) => (
              <article key={a.id} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <Image src={a.image} alt={a.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-[#e31e24] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{a.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="h-3 w-3" /><span>{a.date}</span><span>·</span><span>{a.readTime} lectura</span>
                  </div>
                  <h3 className="mb-2 text-base font-extrabold leading-snug text-[#0c3d6e] transition-colors group-hover:text-[#0099d6]">{a.title}</h3>
                  <p className="mb-4 line-clamp-2 text-sm text-gray-500">{a.excerpt}</p>
                  <a href="#" className="flex items-center gap-1 text-xs font-bold text-[#e31e24] transition-all hover:gap-2">Leer artículo <ChevronRight className="h-3 w-3" /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          NEWSLETTER / CTA
      ══════════════════════════════════════════ */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(135deg, #0b2a4a 0%, #0c3d6e 60%, #0099d6 100%)",
        }}
      >
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mb-2 flex justify-center">
            <span className="rounded-full border border-white/20 bg-white/10 px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              Newsletter
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">
            Suscríbete y recibe un{" "}
            <span className="text-[#f5d030]">10% de descuento</span>
          </h2>
          <p className="mt-3 text-white/70">
            Recibe consejos de dermatólogos, novedades de producto y ofertas exclusivas directamente en tu bandeja de entrada.
          </p>

          {subscribed ? (
            <div className="mx-auto mt-8 flex max-w-sm items-center justify-center gap-3 rounded-2xl bg-white/10 px-6 py-4">
              <BadgeCheck className="h-5 w-5 text-green-400" />
              <p className="text-sm font-bold text-white">¡Suscrito! Revisa tu email.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) { setSubscribed(true); setEmail("") } }}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com" required
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/50" />
              <button type="submit" className="rounded-full px-7 py-3 text-sm font-extrabold text-white shadow transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#e31e24,#b01010)" }}>Suscribirme</button>
            </form>
          )}
          <p className="mt-4 text-xs text-white/40">Sin spam. Baja en cualquier momento.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="bg-[#0b2a4a] py-14 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-5">
            <div className="md:col-span-2">
              <Image src={BRAND.logo} alt={BRAND.name} width={160} height={40} className="mb-1 h-8 w-auto object-contain brightness-0 invert" />
              <span className="mb-4 block text-xs font-black uppercase tracking-[0.2em] text-[#e31e24]">{BRAND.sub}</span>
              <p className="max-w-xs text-sm leading-relaxed text-white/50">{BRAND.tagline}. Labo Suisse — el laboratorio farmacéutico de referencia en tecnología dermatológica desde 2009.</p>
              <div className="mt-5 flex gap-3">
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-[#e31e24] hover:text-white"><Instagram className="h-4 w-4" /></a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-[#0c3d6e] hover:text-white"><Facebook className="h-4 w-4" /></a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-red-600 hover:text-white"><Youtube className="h-4 w-4" /></a>
              </div>
            </div>
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/60">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="text-sm text-white/45 transition-colors hover:text-white">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-xs text-white/30">© 2026 Labo Suisse · Derma. Todos los derechos reservados.</p>
            <div className="flex gap-4 text-xs text-white/30">
              {["Privacidad","Cookies","Legal"].map((l) => <a key={l} href="#" className="hover:text-white/60">{l}</a>)}
            </div>
          </div>
        </div>
      </footer>

      {/* ── CART SIDEBAR ── */}
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} items={cart} onQty={updateQty} onRemove={removeFromCart} />

      {/* ── FLOATING CART BUTTON (mobile) ── */}
      {cartCount > 0 && (
        <button onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-20 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0c3d6e] to-[#0099d6] px-5 py-3 text-sm font-extrabold text-white shadow-2xl transition-all hover:-translate-y-0.5 md:hidden">
          <ShoppingCart className="h-4 w-4" />
          {cartCount} artículo{cartCount > 1 ? "s" : ""}
          <span className="text-white/70">·</span>
          <span>{cart.reduce((s, i) => s + i.product.price * i.qty, 0).toFixed(2)}€</span>
        </button>
      )}
    </div>
  )
}
