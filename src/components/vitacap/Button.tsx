"use client"

import { forwardRef } from "react"
import type { ButtonHTMLAttributes, CSSProperties } from "react"

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "link"
export type ButtonSize = "md" | "lg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, disabled, className = "", children, ...rest }, ref) => {
    const isDisabled = disabled || loading

    const base =
      "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neutral-900)]"
    const sizes: Record<ButtonSize, string> = {
      md: "px-4 py-2 text-[15px] leading-[22px]",
      lg: "px-5 py-3 text-[16px] leading-[24px]",
    }

    const variantStyles: Record<ButtonVariant, { className: string; style: CSSProperties }> = {
      primary: {
        className: "text-[var(--neutral-100)] shadow-sm",
        style: {
          backgroundColor: isDisabled ? "#e5e5e5" : "var(--brand-900)",
          color: isDisabled ? "#9ca3af" : "var(--neutral-100)",
        },
      },
      secondary: {
        className: "text-[var(--neutral-900)]",
        style: {
          backgroundColor: isDisabled ? "#f5f5f5" : "transparent",
          border: "1px solid var(--line-soft)",
        },
      },
      tertiary: {
        className: "text-[var(--neutral-900)]",
        style: {
          backgroundColor: "transparent",
        },
      },
      link: {
        className: "text-[var(--brand-900)]",
        style: {
          backgroundColor: "transparent",
        },
      },
    }

    const hoverStyles: Partial<Record<ButtonVariant, React.CSSProperties>> = {
      primary: { backgroundColor: "var(--brand-800)" },
      secondary: { backgroundColor: "rgba(218,191,143,0.15)" },
      tertiary: { textDecoration: "underline" },
      link: { textDecoration: "underline" },
    }

    return (
      <button
        ref={ref}
        type={rest.type ?? "button"}
        disabled={isDisabled}
        className={`${base} ${sizes[size]} ${variantStyles[variant].className} ${
          variant === "secondary" ? "border" : ""
        } ${isDisabled ? "cursor-not-allowed opacity-80" : "hover:no-underline"} ${className}`}
        style={variantStyles[variant].style}
        onMouseEnter={(e) => {
          if (isDisabled) return
          const style = hoverStyles[variant]
          if (style) Object.assign((e.currentTarget as HTMLButtonElement).style, style)
        }}
        onMouseLeave={(e) => {
          if (isDisabled) return
          Object.assign((e.currentTarget as HTMLButtonElement).style, variantStyles[variant].style)
        }}
        {...rest}
      >
        {loading && (
          <span
            aria-hidden
            className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--neutral-100)] border-b-transparent"
          />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
