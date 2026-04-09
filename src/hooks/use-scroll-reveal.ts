"use client"

import { useEffect, useRef } from "react"

const REVEAL_SELECTOR =
  ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15, deps: any[] = []) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            io.unobserve(entry.target)
          }
        }
      },
      { threshold }
    )

    function observe(node: Element) {
      if (node.matches(REVEAL_SELECTOR) && !node.classList.contains("revealed")) {
        io.observe(node)
      }
      node.querySelectorAll(REVEAL_SELECTOR).forEach((child) => {
        if (!child.classList.contains("revealed")) io.observe(child)
      })
    }

    // Observe the section and all current children
    observe(el)

    // Watch for elements added dynamically (e.g. new articles from CMS)
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof Element) observe(node)
        }
      }
    })

    mo.observe(el, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, ...deps])

  return ref
}
