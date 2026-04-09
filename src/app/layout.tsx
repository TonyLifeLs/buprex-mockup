import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { CookieBanner } from '@/components/CookieBanner'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: 'BUPREX - Ibuprofeno | La capsula blanda mas pequena del pais',
  description: 'BUPREX ES Ibuprofeno. Alivio rapido del dolor, fiebre e inflamacion. 32 anos tratando el dolor en Ecuador. Capsulas blandas, suspension y gotas pediatricas.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0099d6',
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
      <body className={`${_inter.variable} ${_poppins.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
