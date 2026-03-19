import Link from "next/link"
import { forwardRef } from "react"
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, Ref } from "react"
import { cn } from "@/lib/utils"
import styles from "./Button.module.css"

type ButtonVariant = "primary" | "secondary" | "tertiary" | "link"
type ButtonSize = "sm" | "md" | "lg"

interface CommonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  iconLeft?: ReactNode
  disabled?: boolean
  className?: string
  children?: ReactNode
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> & {
    type?: "button" | "submit" | "reset"
    href?: undefined
  }

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
    href: string
  }

type Props = ButtonProps | AnchorProps

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    iconLeft,
    href,
    children,
    className,
    ...rest
  },
  ref
) {
  const isLink = Boolean(href)
  const ariaDisabled = disabled || loading

  const classes = cn(
    styles.btn,
    styles[`size-${size}`],
    styles[variant],
    ariaDisabled && styles.disabled,
    loading && styles.loading,
    className
  )

  const content = (
    <span className={styles.label}>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && iconLeft ? <span className={styles.icon}>{iconLeft}</span> : null}
      <span>{children}</span>
    </span>
  )

  if (isLink) {
    const anchorProps = rest as AnchorProps
    const { href: anchorHref, ...anchorRest } = anchorProps
    return (
      <Link
        ref={ref as Ref<HTMLAnchorElement>}
        href={anchorHref}
        className={classes}
        aria-disabled={ariaDisabled}
        {...anchorRest}
        onClick={(e) => {
          if (ariaDisabled) {
            e.preventDefault()
            return
          }
          anchorRest.onClick?.(e)
        }}
      >
        {content}
      </Link>
    )
  }

  const buttonProps = rest as ButtonProps
  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type={buttonProps.type ?? "button"}
      className={classes}
      disabled={ariaDisabled}
      aria-busy={loading || undefined}
      {...buttonProps}
    >
      {content}
    </button>
  )
})

export default Button
