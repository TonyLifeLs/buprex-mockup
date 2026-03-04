"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
  Menu,
  X,
  Monitor,
  ChevronRight,
  CheckCircle,
} from "lucide-react"
import { getSession, clearSession } from "@/lib/auth"
import { useCMSStore } from "@/store/cms"
import { APP_ROUTES } from "@/constants/routes"
import { DASHBOARD_TABS, type DashboardTab } from "@/constants/dashboard-tabs"
import type { Session } from "@/types/auth"
import { NavbarEditor } from "@/components/cms/NavbarEditor"
import { PageBuilder } from "@/components/cms/PageBuilder"
import { HeroEditor } from "@/components/cms/HeroEditor"
import { SymptomsEditor } from "@/components/cms/SymptomsEditor"
import { MalestarsEditor } from "@/components/cms/MalestarsEditor"
import { ProductsEditor } from "@/components/cms/ProductsEditor"
import { ArticlesEditor } from "@/components/cms/ArticlesEditor"
import { FAQEditor } from "@/components/cms/FAQEditor"
import { FooterEditor } from "@/components/cms/FooterEditor"
import { VisualBuilder } from "@/components/cms/VisualBuilder"

export default function DashboardPage() {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)
  const [activeTab, setActiveTab] = useState<DashboardTab>("builder")
  const [mobileSidebar, setMobileSidebar] = useState(false)

  useEffect(() => {
    const s = getSession()
    if (!s) router.replace(APP_ROUTES.login)
    else setSession(s)
  }, [router])

  function handleLogout() {
    clearSession()
    router.push(APP_ROUTES.login)
  }

  function handleReset() {
    if (confirm("¿Restablecer toda la configuración a los valores originales?")) {
      useCMSStore.getState().resetAll()
    }
  }

  if (!session) return null

  return (
    <div className="min-h-screen flex bg-[#f0f6fb]">
      {/* ── Sidebar ── */}
      <>
        {mobileSidebar && (
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setMobileSidebar(false)}
          />
        )}

        <aside
          className={`fixed md:static inset-y-0 left-0 z-40 flex flex-col w-72 bg-[#0c3d6e] transition-transform duration-300 md:translate-x-0 ${
            mobileSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <Image
              src="/images/buprex-logo.png"
              alt="Buprex"
              width={140}
              height={38}
              className="h-9 w-auto object-contain"
            />
            <button
              onClick={() => setMobileSidebar(false)}
              className="md:hidden text-white/60 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* CMS label */}
          <div className="px-6 py-4">
            <div className="flex items-center gap-2 rounded-xl bg-[#0099d6]/20 px-3 py-2.5">
              <Monitor className="h-4 w-4 text-[#0099d6]" />
              <span className="text-xs font-bold text-[#0099d6] uppercase tracking-wider">
                CMS Visual
              </span>
            </div>
          </div>

          {/* Tabs nav */}
          <nav className="flex-1 flex flex-col gap-1 px-4 overflow-y-auto">
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white/30">
              Secciones
            </p>
            {DASHBOARD_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileSidebar(false) }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                  activeTab === tab.id
                    ? "bg-[#0099d6] text-white shadow-md"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <tab.icon className="h-4 w-4 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{tab.label}</p>
                  <p className={`text-xs truncate ${activeTab === tab.id ? "text-white/70" : "text-white/40"}`}>
                    {tab.description}
                  </p>
                </div>
                {activeTab === tab.id && (
                  <ChevronRight className="h-3.5 w-3.5 ml-auto flex-shrink-0" />
                )}
              </button>
            ))}

            <div className="my-3 border-t border-white/10" />

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/60 hover:bg-white/10 hover:text-white transition"
            >
              <ExternalLink className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-semibold">Ver sitio web</span>
            </a>
          </nav>

          {/* User + Logout */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0099d6] text-white font-bold text-sm flex-shrink-0">
                {session.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{session.name}</p>
                <span className="flex items-center gap-1 text-xs text-[#0099d6] font-medium">
                  <ShieldCheck className="h-3 w-3" />
                  {session.role}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-300 hover:bg-red-500/20 hover:text-red-200 transition"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </aside>
      </>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-20 shadow-sm">
          <button
            onClick={() => setMobileSidebar(true)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <LayoutDashboard className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-400">CMS</span>
            <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
            <span className="text-sm font-bold text-[#0c3d6e] truncate">
              {DASHBOARD_TABS.find((t) => t.id === activeTab)?.label}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Auto-save indicator */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
              <CheckCircle className="h-3.5 w-3.5" />
              Guardado automático
            </div>
            {/* Mobile: icon only */}
            <div className="flex sm:hidden items-center justify-center h-8 w-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600">
              <CheckCircle className="h-3.5 w-3.5" />
            </div>

            <button
              onClick={handleReset}
              title="Restablecer valores originales"
              className="hidden sm:flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Restablecer
            </button>
            {/* Mobile: icon-only reset */}
            <button
              onClick={handleReset}
              title="Restablecer valores originales"
              className="flex sm:hidden h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </header>

        {/* Content area */}
        <main className={`flex-1 overflow-hidden ${activeTab === "visual" ? "p-0 flex flex-col" : "overflow-y-auto px-6 py-8"}`}>
          {activeTab === "builder" && <PageBuilder />}
          {activeTab === "navbar" && <NavbarEditor />}
          {activeTab === "hero" && <HeroEditor />}
          {activeTab === "symptoms" && <SymptomsEditor />}
          {activeTab === "malestars" && <MalestarsEditor />}
          {activeTab === "products" && <ProductsEditor />}
          {activeTab === "articles" && <ArticlesEditor />}
          {activeTab === "faq" && <FAQEditor />}
          {activeTab === "footer" && <FooterEditor />}
          {activeTab === "visual" && <VisualBuilder />}
        </main>
      </div>
    </div>
  )
}
