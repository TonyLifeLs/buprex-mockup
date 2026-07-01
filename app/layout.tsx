import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { CookieBanner } from '@/components/CookieBanner'
import './globals.css'

export const metadata: Metadata = {
  title: 'BUPREX - Ibuprofeno | La capsula blanda mas pequena del pais',
  description: 'BUPREX ES Ibuprofeno. Alivio rapido del dolor, fiebre e inflamacion. 32 anos tratando el dolor en Ecuador. Capsulas blandas, suspension y gotas pediatricas.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0057B8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
