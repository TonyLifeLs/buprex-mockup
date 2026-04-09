/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CMS DEFAULTS
 *  Estado inicial del CMS y función para crear bloques visuales por defecto.
 *  Separado del store para mantener la lógica de estado limpia.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { CMSState, VisualBlock, VisualBlockType } from "@/types/cms"

// ─── Visual block defaults ────────────────────────────────────────────────────

export function createDefaultVisualBlock(type: VisualBlockType): VisualBlock {
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defs: Record<VisualBlockType, Record<string, any>> = {
    navbar: {
      bgColor: "#0c3d6e",
      logoText: "Mi Logo",
      logoUrl: "",
      links: [
        { id: "l1", label: "Inicio", href: "#" },
        { id: "l2", label: "Servicios", href: "#" },
        { id: "l3", label: "Contacto", href: "#" },
      ],
    },
    "hero-banner": {
      title: "Título Principal",
      subtitle: "Subtítulo descriptivo que explica tu propuesta de valor.",
      ctaLabel: "Empezar ahora",
      ctaHref: "#",
      ctaColor: "#ffffff",
      bgColor: "#0c3d6e",
      textColor: "#ffffff",
      align: "center",
      bgImage: "",
    },
    heading: { text: "Título de sección", level: "h2", align: "center", color: "#0c3d6e" },
    paragraph: {
      text: "Escribe aquí tu contenido. Puedes editar este texto desde el panel de propiedades.",
      align: "left",
      color: "#374151",
      fontSize: "base",
    },
    "image-block": { src: "", alt: "Imagen", width: "full", align: "center", caption: "", rounded: false },
    "button-block": {
      label: "Haz clic aquí",
      href: "#",
      bgColor: "#0099d6",
      textColor: "#ffffff",
      variant: "solid",
      align: "center",
      size: "md",
    },
    "two-column": {
      leftType: "text",
      leftText: "Texto de la columna izquierda.",
      leftImage: "",
      rightType: "text",
      rightText: "Texto de la columna derecha.",
      rightImage: "",
      gap: "normal",
    },
    "card-grid": {
      cols: 3,
      cards: [
        { id: "c1", title: "Tarjeta 1", description: "Descripción de la tarjeta.", image: "", bgColor: "#f0f6fb" },
        { id: "c2", title: "Tarjeta 2", description: "Descripción de la tarjeta.", image: "", bgColor: "#f0f6fb" },
        { id: "c3", title: "Tarjeta 3", description: "Descripción de la tarjeta.", image: "", bgColor: "#f0f6fb" },
      ],
    },
    divider: { color: "#e5e7eb", style: "solid", thickness: 1, marginY: 16 },
    spacer: { height: 48 },
    "cta-banner": {
      title: "¿Listo para empezar?",
      subtitle: "Únete hoy y descubre todo lo que tenemos para ti.",
      ctaLabel: "Empezar gratis",
      ctaHref: "#",
      bgColor: "#0099d6",
      textColor: "#ffffff",
    },
    accordion: {
      title: "Preguntas Frecuentes",
      items: [
        { id: "a1", title: "¿Cómo funciona?", content: "Respuesta explicando el funcionamiento." },
        { id: "a2", title: "¿Cuánto cuesta?", content: "Respuesta sobre el precio." },
        { id: "a3", title: "¿Puedo cancelar?", content: "Respuesta sobre cancelación." },
      ],
    },
    "footer-block": {
      bgColor: "#1e293b",
      text: "© 2026 Mi Empresa. Todos los derechos reservados.",
      textColor: "#94a3b8",
    },
  }

  return { id, type, props: defs[type] }
}

// ─── Default CMS State ────────────────────────────────────────────────────────

export const DEFAULT_CMS_STATE: CMSState = {
  navbar: {
    bgColor: "#0c3d6e",
    logoUrl: "/images/buprex-logo.png",
    links: [
      { id: "n1", label: "Inicio", href: "#inicio" },
      { id: "n2", label: "Productos", href: "#productos" },
      { id: "n3", label: "Contacto", href: "#contacto" },
      { id: "n4", label: "Artículos", href: "#articulos" },
    ],
  },

  sections: [
    { id: "hero", label: "Hero / Banner", description: "Carrusel principal con slides", enabled: true, icon: "🎯" },
    { id: "symptoms", label: "Síntomas", description: "Sección de síntomas tratados", enabled: true, icon: "💊" },
    { id: "malestars", label: "Malestars", description: "Personajes villanos de Buprex", enabled: true, icon: "🤕" },
    { id: "products", label: "Productos", description: "Catálogo de productos Buprex", enabled: true, icon: "📦" },
    { id: "pharma-info", label: "Info Farmacéutica", description: "Información técnica", enabled: true, icon: "🔬" },
    { id: "articles", label: "Artículos", description: "Blog informativo", enabled: true, icon: "📰" },
    { id: "faq", label: "Preguntas Frecuentes", description: "FAQ de usuarios", enabled: true, icon: "❓" },
    { id: "footer", label: "Footer", description: "Pie de página", enabled: true, icon: "📋" },
  ],

  heroSlides: [
    {
      id: "hs1",
      tag: "BUPREX ES IBUPROFENO",
      title: "TENEMOS LA CÁPSULA BLANDA MÁS PEQUEÑA",
      highlight: "DEL PAÍS",
      description: "",
      badge1: "Acción Rápida",
      badge2: "La más pequeña",
      image: "/images/buprex-flash.png",
      bgImage: "/images/capsula-buprex.png",
      bgColor: "#0099d6",
      bgOpacity: 0.15,
      bgMode: "right",
    },
    {
      id: "hs2",
      tag: "LINEA PEDIATRICA",
      title: "BUPREX PARA TODA LA FAMILIA",
      highlight: "Adultos y Niños",
      description:
        "Suspensión pediátrica 100 mg / 5 ml. Gotas 40 mg / ml. Forte 200 mg / 5 ml. Para cada etapa de la vida.",
      badge1: "Desde 6 meses",
      badge2: "Para toda la familia",
      image: "/images/buprex-mini.png",
      bgImage: "/images/malestars.all.png",
      bgColor: "#0c3d6e",
      bgOpacity: 0.1,
      bgMode: "right",
    },
    {
      id: "hs3",
      tag: "BUPREX MIGRA",
      title: "ALIVIO EFECTIVO CONTRA LA",
      highlight: "MIGRAÑA",
      description: "",
      badge1: "Doble acción",
      badge2: "Alivio prolongado",
      image: "/images/buprex-migra.png",
      bgImage: "/images/dolor-cabeza-buprex.jpg",
      bgColor: "#0099d6",
      bgOpacity: 0.18,
      bgMode: "right",
    },
  ],

  trustBadges: [
    { id: "tb1", title: "ALIVIO RÁPIDO", description: "Cápsula blanda de acción rápida", color: "#e31e24" },
    { id: "tb2", title: "PIONEROS", description: "32 Años tratando el dolor, fiebre e inflamación", color: "#0099d6" },
    {
      id: "tb3",
      title: "CONFIANZA MÉDICA",
      description: "Recomendados por médicos y profesionales de la salud en Ecuador",
      color: "#0c3d6e",
    },
  ],

  symptoms: [
    {
      id: "sy1",
      image: "/images/dolor-muscular.png",
      title: "Dolor Muscular",
      description: "Alivio efectivo para dolores musculares y articulares.",
      accentColor: "#0099d6",
    },
    {
      id: "sy2",
      image: "/images/dolor-cabeza.png",
      title: "Dolor de Cabeza",
      description: "Acción rápida contra cefaleas y migrañas.",
      accentColor: "#e31e24",
    },
    {
      id: "sy3",
      image: "/images/dolor-espalda.png",
      title: "Dolor de Espalda",
      description: "Reduce la inflamación y alivia el dolor lumbar.",
      accentColor: "#f5a623",
    },
    {
      id: "sy4",
      image: "/images/dolor-garganta.png",
      title: "Dolor de Garganta",
      description: "Eficaz contra la inflamación y el dolor faríngeo.",
      accentColor: "#0099d6",
    },
    {
      id: "sy5",
      image: "/images/fiebre.png",
      title: "Fiebre",
      description: "Propiedades antipiréticas para reducir la temperatura.",
      accentColor: "#e31e24",
    },
    {
      id: "sy6",
      image: "/images/gripe.png",
      title: "Estados Gripales",
      description: "Alivia los síntomas asociados a resfriados y gripe.",
      accentColor: "#0c3d6e",
    },
  ],

  malestars: {
    tagline:
      "Si los MALESTARS hacen su aparición, BUPREX los calma con su gran acción.",
    subtitle:
      "Conoce a los villanos que BUPREX combate con su triple acción: analgésica, antipirética y antiinflamatoria.",
    logoImage: "/images/malestars-logo.png",
    items: [
      {
        id: "ml1",
        name: "Fiebrin",
        image: "/images/malestars-estrellas.png",
        description: "Representa la fiebre. BUPREX lo combate con su acción antipirética.",
      },
      {
        id: "ml2",
        name: "Inflamón",
        image: "/images/inflamon-estrellas.png",
        description: "Representa el dolor. BUPREX lo vence con su acción analgésica rápida.",
      },
      {
        id: "ml3",
        name: "Dolores",
        image: "/images/dolores.png",
        description: "Representa la inflamación. BUPREX la reduce con su acción antiinflamatoria.",
      },
    ],
  },

  products: [
    {
      id: "pr1",
      name: "BUPREX",
      subtitle: "(SUSPENSIÓN PEDIÁTRICA)",
      image: "/images/buprex-suspension.png",
      description: "Contiene 100 mg de ibuprofeno por cada 5 ml de suspensión.",
      accentColor: "#00b2ff",
      isAdult: false,
      variant: "",
    },
    {
      id: "pr2",
      name: "BUPREX FORTE",
      subtitle: "(SUSPENSIÓN)",
      image: "/images/dolores-suspension.png",
      description: "Contiene 200 mg de ibuprofeno por cada 5 ml de suspensión.",
      accentColor: "#f5a623",
      isAdult: false,
      variant: "",
    },
    {
      id: "pr3",
      name: "BUPREX",
      subtitle: "(GOTAS SUSPENSIÓN)",
      image: "/images/buprex-mini.png",
      description: "Contiene 40 mg de ibuprofeno por 1 ml.",
      accentColor: "#e31e24",
      isAdult: false,
      variant: "",
    },
    {
      id: "pr4",
      name: "BUPREX Flash Mini",
      subtitle: "",
      image: "/images/woman-capsule.png",
      description:
        "Cápsula blanda más pequeña del país. Acción ultrarrápida para alivio del dolor, fiebre e inflamación.",
      accentColor: "#e31e24",
      isAdult: true,
      variant: "Cápsulas 200mg y 400mg",
    },
    {
      id: "pr5",
      name: "BUPREX Migra",
      subtitle: "",
      image: "/images/buprex-migra.png",
      description:
        "Ibuprofeno 400mg + Cafeína 100mg. 20 comprimidos recubiertos para el alivio del dolor de cabeza intenso y migraña.",
      accentColor: "#0c3d6e",
      isAdult: true,
      variant: "Comprimidos Recubiertos",
    },
  ],

  articles: [
    {
      id: "ar1",
      title: "DOLOR MENSTRUAL:",
      subtitle: "CAUSAS Y SOLUCIONES",
      image: "/images/article-menstrual.jpg",
      category: "Salud Femenina",
      intro:
        "El dolor menstrual o dismenorrea es una de las causas mas frecuentes de dolor en las mujeres en edad reproductiva.",
      causes:
        "Contracciones uterinas intensas causadas por prostaglandinas\nEndometriosis o fibromas uterinos\nEstrés y factores emocionales\nFalta de ejercicio fisico regular",
      solutions:
        "Ibuprofeno (BUPREX) para aliviar el dolor y reducir la inflamacion\nAplicar calor local en la zona abdominal\nEjercicio moderado como caminar o yoga\nMantener una dieta balanceada rica en omega-3",
      tip: "BUPREX con ibuprofeno es especialmente eficaz para el dolor menstrual gracias a su accion antiinflamatoria que actua directamente sobre las prostaglandinas causantes del dolor.",
    },
    {
      id: "ar2",
      title: "FIEBRE EN NIÑOS:",
      subtitle: "CUIDADOS Y PREVENCIÓN",
      image: "/images/article-fiebre.jpg",
      category: "Pediatría",
      intro:
        "La fiebre en niños es una respuesta natural del cuerpo ante infecciones. Es importante saber como manejarla correctamente.",
      causes:
        "Infecciones virales como resfriados o gripe\nInfecciones bacterianas (oído, garganta)\nReacción post-vacunación\nDeshidratación o golpe de calor",
      solutions:
        "BUPREX Pediátrico (ibuprofeno) en dosis adecuada al peso del niño\nMantener al niño hidratado con líquidos frescos\nRopa ligera y ambiente fresco\nConsultar al pediatra si la fiebre persiste más de 48 horas",
      tip: "BUPREX Suspensión Pediátrica contiene 100 mg de ibuprofeno por cada 5 ml, con dosificación según el peso del niño. Siempre consulte al pediatra.",
    },
    {
      id: "ar3",
      title: "¿CÓMO MANTENER UNA POSTURA CORRECTA Y EVITAR DOLORES DE ESPALDA?",
      subtitle: "",
      image: "/images/article-postura.jpg",
      category: "Bienestar",
      intro:
        "El dolor de espalda es una de las dolencias más comunes en adultos, frecuentemente causada por malas posturas mantenidas durante largo tiempo.",
      causes:
        "Pasar muchas horas sentado frente al computador\nLevantar objetos pesados de forma incorrecta\nColchón inadecuado o mala posición al dormir\nSedentarismo y debilidad muscular",
      solutions:
        "Mantener la espalda recta y los hombros relajados al sentarse\nRealizar pausas activas cada 45 minutos\nFortalecer la musculatura core con ejercicios regulares\nBUPREX para aliviar el dolor cuando se presenta",
      tip: "BUPREX Flash Mini actúa rápidamente para aliviar el dolor de espalda gracias a su formulación en cápsula blanda de rápida absorción.",
    },
    {
      id: "ar4",
      title: "DOLOR DE CABEZA:",
      subtitle: "TIPOS Y TRATAMIENTO",
      image: "/images/article-migrana.jpg",
      category: "Neurología",
      intro:
        "El dolor de cabeza o cefalea es una de las molestias más frecuentes que afecta a personas de todas las edades. Conocer su origen es clave para tratarlo correctamente.",
      causes:
        "Tensión muscular en cuello y hombros\nEstrés y ansiedad acumulados\nDeshidratación o saltarse comidas\nExposición prolongada a pantallas",
      solutions:
        "BUPREX (ibuprofeno) 400 mg para aliviar el dolor de forma rápida y eficaz\nDescansar en un ambiente oscuro y tranquilo\nAplicar frío o calor en cuello y sienes\nMantener una buena hidratación diaria",
      tip: "BUPREX Flash es ideal para el dolor de cabeza por tensión gracias a su fórmula de liberación rápida. Comienza a actuar en aproximadamente 15 minutos.",
    },
  ],

  faqs: [
    {
      id: "fq1",
      question: "¿Para qué tipo de dolores sirve el Ibuprofeno?",
      answer:
        "El ibuprofeno es eficaz para el alivio de dolor de cabeza, dolor muscular, dolor de espalda, dolor de garganta, dolor dental, dismenorrea (dolor menstrual), dolor postquirúrgico en intervenciones menores y fiebre de cualquier origen excepto la causada por dengue.",
    },
    {
      id: "fq2",
      question: "Me di la vacuna de la gripe, ¿puedo tomar ibuprofeno?",
      answer:
        "Sí, puede tomar ibuprofeno después de la vacuna de la gripe para aliviar posibles efectos secundarios como dolor en el brazo o fiebre leve. Sin embargo, se recomienda consultar con su médico antes de tomar cualquier medicamento.",
    },
    {
      id: "fq3",
      question: "¿Cada cuántas horas puedo tomar ibuprofeno 400mg?",
      answer:
        "La dosis recomendada para adultos es de 200-400 mg cada 6 horas según necesidad. No se debe exceder la dosis máxima diaria recomendada. No administrar por más de 2-3 días sin indicación médica.",
    },
    {
      id: "fq4",
      question: "Si tengo COVID-19, ¿puedo tomar ibuprofeno?",
      answer:
        "Puede usar ibuprofeno para manejar los síntomas como fiebre y dolor asociados al COVID-19 o tras la vacunación. Consulte con su médico para determinar la dosis adecuada y asegurar que no existan contraindicaciones en su caso particular.",
    },
    {
      id: "fq5",
      question: "¿Cada cuánto puedo darle ibuprofeno pediátrico a un niño?",
      answer:
        "En niños, la dosis es de 10 mg/kg/dosis y se puede repetir hasta 3 o 4 veces al día. Si la temperatura basal es inferior a 39.2°C la dosis recomendada es de 5 mg/kg; si es superior a 39.2°C la dosis recomendada es de 10 mg/kg de peso. Siempre consulte al pediatra.",
    },
    {
      id: "fq6",
      question: "¿La cápsula blanda tiene el mismo efecto que el comprimido?",
      answer:
        "Sí, la cápsula blanda contiene el mismo principio activo (ibuprofeno) y tiene el mismo efecto terapéutico. La diferencia principal es que la cápsula blanda puede tener una absorción más rápida, lo que significa que puede sentir el alivio más pronto.",
    },
  ],

  visualBlocks: [],

  footer: {
    bgColor: "#0c3d6e",
    website: "https://www.life.com.ec",
    disclaimer:
      "LEA ATENTAMENTE EL PROSPECTO Y ANTE LA MENOR DUDA CONSULTE A SU MÉDICO Y/O FARMACÉUTICO.",
    registrationInfo:
      "BUPREX FLASH mini 200 mg cápsulas blandas, Reg. San: 9707-MEE-0125 / BUPREX FLASH mini 400 mg cápsulas blandas, Reg. San: 9703-MEE-0125",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
}
