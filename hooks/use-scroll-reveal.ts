"use client"

import { useEffect, useRef } from "react"

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold }
    )

    // Observe the parent and all children with scroll-reveal classes
    const revealElements = el.querySelectorAll(
      ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale"
    )
    revealElements.forEach((child) => observer.observe(child))

    // Also observe the element itself if it has a scroll-reveal class
    if (
      el.classList.contains("scroll-reveal") ||
      el.classList.contains("scroll-reveal-left") ||
      el.classList.contains("scroll-reveal-right") ||
      el.classList.contains("scroll-reveal-scale")
    ) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [threshold])

  return ref
}
