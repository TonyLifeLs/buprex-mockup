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
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Globe,
  Trash2,
} from "lucide-react"
import { getSession, clearSession } from "@/lib/auth"
import type { Session } from "@/types/auth"
import { useMsal } from "@azure/msal-react"
import { useCMSStore } from "@/store/cms"
import { APP_ROUTES } from "@/constants/routes"
import {
  DASHBOARD_TABS,
  SITE_SECTIONS,
  type DashboardTab,
  type SiteSection,
} from "@/constants/dashboard-tabs"

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
import { LaboSuisseThemeEditor } from "@/components/cms/LaboSuisseThemeEditor"
import { DermaOverview } from "@/components/cms/DermaOverview"
import { VitacapCMSEditor } from "@/components/cms/VitacapCMSEditor"
// Vitacap G — individual section editors
import { VitacapColoresEditor } from "@/components/cms/VitacapColoresEditor"
import { VitacapNavbarEditor } from "@/components/cms/VitacapNavbarEditor"
import { VitacapHeroEditor } from "@/components/cms/VitacapHeroEditor"
import { VitacapBeneficiosEditor } from "@/components/cms/VitacapBeneficiosEditor"
import { VitacapCarruselesEditor } from "@/components/cms/VitacapCarruselesEditor"
import { VitacapSeccionesEditor } from "@/components/cms/VitacapSeccionesEditor"
// Labo Suisse — individual section editors
import { LSPageBuilder } from "@/components/cms/LSPageBuilder"
import { VitacapPageBuilder } from "@/components/cms/VitacapPageBuilder"
import { LSColoresEditor } from "@/components/cms/LSColoresEditor"
import { LSNavEditor } from "@/components/cms/LSNavEditor"
import { LSHeroEditor } from "@/components/cms/LSHeroEditor"
import { LSContenidoEditor } from "@/components/cms/LSContenidoEditor"
import { LSNoticiasFAQEditor } from "@/components/cms/LSNoticiasFAQEditor"
import { LSFooterEditor } from "@/components/cms/LSFooterEditor"
import { SiteBuilderEditor } from "@/components/cms/SiteBuilderEditor"
import { CustomSiteEditor } from "@/components/cms/CustomSiteEditor"
import { CreateSiteModal } from "@/components/cms/CreateSiteModal"
import { useCustomSitesStore } from "@/store/customSites"

// ─── Sidebar accordion section ────────────────────────────────────────────────

function SidebarSection({
  section,
  activeTab,
  isOpen,
  onToggle,
  onSelectTab,
}: {
  section: (typeof SITE_SECTIONS)[number]
  activeTab: string
  isOpen: boolean
  onToggle: () => void
  onSelectTab: (tab: string) => void
}) {
  const tabs = DASHBOARD_TABS.filter((t) => t.section === section.id)
  const hasActive = tabs.some((t) => t.id === activeTab)

  return (
    <div className="mb-1">
      {/* Section header */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-left transition-all ${
          hasActive ? "bg-white/10" : "hover:bg-white/8"
        }`}
      >
        {/* Accent dot */}
        <span
          className="h-2 w-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: section.accent }}
        />
        <span className="flex-1 text-xs font-bold uppercase tracking-widest text-white/70 truncate">
          {section.label}
        </span>
        <ChevronDown
          className="h-3.5 w-3.5 text-white/40 flex-shrink-0 transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Tabs list — smooth height transition */}
      <div
        className="overflow-hidden transition-all duration-250"
        style={{ maxHeight: isOpen ? `${tabs.length * 56}px` : "0px" }}
      >
        <div className="mt-0.5 space-y-0.5 pl-2">
          {tabs.map((tab) => {
            const active = activeTab === tab.id
            return (
              <button
                key={`${section.id}-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                  active
                    ? "text-white shadow-sm"
                    : "text-white/55 hover:bg-white/10 hover:text-white"
                }`}
                style={active ? { backgroundColor: section.accent } : undefined}
              >
                <tab.icon className="h-4 w-4 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-tight">{tab.label}</p>
                  <p className={`text-[11px] truncate leading-tight mt-0.5 ${active ? "text-white/70" : "text-white/35"}`}>
                    {tab.description}
                  </p>
                </div>
                {active && <ChevronRight className="h-3 w-3 flex-shrink-0 opacity-70" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter()
  const { instance } = useMsal()
  const [session, setSession] = useState<Session | null>(null)
  const [activeTab, setActiveTab] = useState<string>("builder")

  // Mobile: slide-in overlay
  const [mobileSidebar, setMobileSidebar] = useState(false)
  // Desktop: fully collapsed
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Which accordion sections are expanded — Buprex open by default
  const [openSections, setOpenSections] = useState<Record<SiteSection, boolean>>({
    buprex:     true,
    derma:      false,
    labosuisse: false,
    vitacap:    false,
    misitio:    false,
  })

  // Custom sites state
  const customSites = useCustomSitesStore((s) => s.sites)
  const removeSite  = useCustomSitesStore((s) => s.removeSite)
  const addSite     = useCustomSitesStore((s) => s.addSite)
  const [openCustomSections, setOpenCustomSections] = useState<Record<string, boolean>>({})
  const [createSiteModalOpen, setCreateSiteModalOpen] = useState(false)

  useEffect(() => {
    const s = getSession()
    if (!s) router.replace(APP_ROUTES.login)
    else setSession(s)
  }, [router])

  function handleLogout() {
    clearSession()
    instance.logoutRedirect({ postLogoutRedirectUri: APP_ROUTES.login }).catch(() => {
      // Fallback: if MSAL logout fails, still redirect
      router.push(APP_ROUTES.login)
    })
  }

  function handleReset() {
    if (confirm("¿Restablecer toda la configuración a los valores originales?")) {
      useCMSStore.getState().resetAll()
    }
  }

  function selectTab(tab: string) {
    setActiveTab(tab)
    setMobileSidebar(false)
    // Auto-expand the section that owns this static tab
    const ownerSection = DASHBOARD_TABS.find((t) => t.id === tab)?.section
    if (ownerSection) {
      setOpenSections((prev) => ({ ...prev, [ownerSection]: true }))
    }
  }

  function selectCustomSite(siteId: string) {
    setActiveTab(`custom:${siteId}`)
    setMobileSidebar(false)
    setOpenCustomSections((prev) => ({ ...prev, [siteId]: true }))
  }

  function toggleSection(id: SiteSection) {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function toggleCustomSection(id: string) {
    setOpenCustomSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function handleCreateSite(title: string, accent: string) {
    const newId = addSite(title, accent)
    selectCustomSite(newId)
  }

  function handleDeleteSite(id: string) {
    if (!confirm("¿Eliminar este sitio? Esta acción no se puede deshacer.")) return
    // If currently viewing this site, go back to builder
    if (activeTab === `custom:${id}`) setActiveTab("builder")
    removeSite(id)
  }

  // Custom site being viewed (null if showing a static tab)
  const activeCustomSiteId = activeTab.startsWith("custom:")
    ? activeTab.slice(7)
    : null

  // Active tab label for breadcrumb
  const activeLabel = activeCustomSiteId
    ? (customSites.find((s) => s.id === activeCustomSiteId)?.title ?? "Mi Sitio")
    : (DASHBOARD_TABS.find((t) => t.id === activeTab)?.label ?? activeTab)

  // Active section accent colour for top bar
  const activeSectionAccent = activeCustomSiteId
    ? (customSites.find((s) => s.id === activeCustomSiteId)?.accent ?? "#2563eb")
    : (SITE_SECTIONS.find(
        (s) => s.id === DASHBOARD_TABS.find((t) => t.id === activeTab)?.section
      )?.accent ?? "#C0392B")

  if (!session) return null

  // ── Shared sidebar content ──────────────────────────────────────────────────
  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo + close (mobile X / desktop toggle) */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="bg-white rounded-xl px-3 py-2 shadow-md inline-block">
          <Image
            src="/images/laboratorios-life.png"
            alt="Laboratorios Life"
            width={140}
            height={40}
            className="h-8 w-auto object-contain"
          />
        </div>
        {/* Mobile: X to close overlay */}
        <button
          onClick={() => setMobileSidebar(false)}
          className="flex md:hidden h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition"
          aria-label="Cerrar menú"
        >
          <X className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* CMS badge */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center gap-2 rounded-xl bg-white/15 px-3 py-2">
          <Monitor className="h-3.5 w-3.5 text-white/80" />
          <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider">CMS Visual</span>
        </div>
      </div>

      {/* ── Accordion nav ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {SITE_SECTIONS.map((section) => (
          <SidebarSection
            key={section.id}
            section={section}
            activeTab={activeTab}
            isOpen={openSections[section.id]}
            onToggle={() => toggleSection(section.id)}
            onSelectTab={selectTab}
          />
        ))}

        {/* ── Custom published sites ── */}
        {customSites.length > 0 && (
          <>
            <div className="my-2 border-t border-white/10" />
            <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-white/35">
              Mis sitios publicados
            </p>
            {customSites.map((site) => {
              const isOpen    = !!openCustomSections[site.id]
              const isActive  = activeTab === `custom:${site.id}`
              return (
                <div key={site.id} className="mb-1">
                  {/* Section header */}
                  <button
                    onClick={() => toggleCustomSection(site.id)}
                    className={`w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-left transition-all ${
                      isActive ? "bg-white/10" : "hover:bg-white/8"
                    }`}
                  >
                    <span
                      className="h-2 w-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: site.accent }}
                    />
                    <Globe className="h-3.5 w-3.5 text-white/50 flex-shrink-0" />
                    <span className="flex-1 text-xs font-bold uppercase tracking-widest text-white/70 truncate">
                      {site.title}
                    </span>
                    <ChevronDown
                      className="h-3.5 w-3.5 text-white/40 flex-shrink-0 transition-transform duration-200"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  {/* Tab list */}
                  <div
                    className="overflow-hidden transition-all duration-250"
                    style={{ maxHeight: isOpen ? "120px" : "0px" }}
                  >
                    <div className="mt-0.5 space-y-0.5 pl-2">
                      {/* Constructor tab */}
                      <button
                        onClick={() => selectCustomSite(site.id)}
                        className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                          isActive
                            ? "text-white shadow-sm"
                            : "text-white/55 hover:bg-white/10 hover:text-white"
                        }`}
                        style={isActive ? { backgroundColor: site.accent } : undefined}
                      >
                        <Globe className="h-4 w-4 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold leading-tight">Constructor</p>
                          <p className={`text-[11px] truncate leading-tight mt-0.5 ${isActive ? "text-white/70" : "text-white/35"}`}>
                            Diseña tu landing page
                          </p>
                        </div>
                        {isActive && <ChevronRight className="h-3 w-3 flex-shrink-0 opacity-70" />}
                      </button>
                      {/* Delete site */}
                      <button
                        onClick={() => handleDeleteSite(site.id)}
                        className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-left text-red-300/60 hover:bg-red-500/15 hover:text-red-300 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="text-xs font-medium">Eliminar sitio</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        )}

        <div className="my-2 border-t border-white/10" />

        {/* ── Publish new site button ── */}
        <button
          onClick={() => setCreateSiteModalOpen(true)}
          className="w-full flex items-center gap-2.5 rounded-xl px-3 py-3 text-left transition-all border border-white/20 hover:border-white/40 hover:bg-white/10 group"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 group-hover:bg-white/25 transition flex-shrink-0">
            <Plus className="h-4 w-4 text-white" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-white leading-tight">Publica tu sitio web</p>
            <p className="text-[11px] text-white/45 leading-tight mt-0.5">Nueva landing page</p>
          </div>
        </button>

        <div className="my-2 border-t border-white/10" />

        {/* Preview links */}
        {SITE_SECTIONS.map((s) => (
          <a
            key={s.id}
            href={s.previewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-white/45 hover:bg-white/10 hover:text-white transition"
          >
            <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="text-xs font-semibold truncate">Ver {s.label}</span>
          </a>
        ))}
      </nav>

      {/* User + logout */}
      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5 mb-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: activeSectionAccent }}
          >
            {session.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{session.name}</p>
            <span className="flex items-center gap-1 text-xs font-medium" style={{ color: activeSectionAccent }}>
              <ShieldCheck className="h-3 w-3" />
              {session.role}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-500/20 hover:text-red-200 transition"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex bg-[#faf5f5]">

      {/* ── Mobile overlay ─────────────────────────────────────────────────── */}
      {mobileSidebar && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        style={{ background: "linear-gradient(180deg, #7B0D0D 0%, #922B21 60%, #C0392B 100%)" }}
        className={`fixed inset-y-0 left-0 z-40 w-72 shadow-2xl md:hidden transition-transform duration-300 ${
          mobileSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* ── Desktop sidebar ────────────────────────────────────────────────── */}
      <aside
        style={{ background: "linear-gradient(180deg, #7B0D0D 0%, #922B21 60%, #C0392B 100%)", minWidth: sidebarOpen ? "288px" : "0px", width: sidebarOpen ? "288px" : "0px" }}
        className={`hidden md:flex flex-col w-72 shadow-xl flex-shrink-0 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full w-0 overflow-hidden"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-20 shadow-sm">

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileSidebar(true)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop sidebar toggle */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="hidden md:flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition"
            aria-label={sidebarOpen ? "Ocultar sidebar" : "Mostrar sidebar"}
          >
            {sidebarOpen
              ? <PanelLeftClose className="h-5 w-5" />
              : <PanelLeftOpen  className="h-5 w-5" />
            }
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 min-w-0">
            <LayoutDashboard className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-400">CMS</span>
            <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
            <span
              className="text-sm font-bold truncate"
              style={{ color: activeSectionAccent }}
            >
              {activeLabel}
            </span>
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2">
            {/* Auto-save */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
              <CheckCircle className="h-3.5 w-3.5" />
              Guardado automático
            </div>
            <div className="flex sm:hidden items-center justify-center h-8 w-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600">
              <CheckCircle className="h-3.5 w-3.5" />
            </div>

            {/* Reset */}
            <button
              onClick={handleReset}
              title="Restablecer valores originales"
              className="hidden sm:flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Restablecer
            </button>
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
          {activeTab === "builder"        && <PageBuilder />}
          {activeTab === "navbar"         && <NavbarEditor />}
          {activeTab === "hero"           && <HeroEditor />}
          {activeTab === "symptoms"       && <SymptomsEditor />}
          {activeTab === "malestars"      && <MalestarsEditor />}
          {activeTab === "products"       && <ProductsEditor />}
          {activeTab === "articles"       && <ArticlesEditor />}
          {activeTab === "faq"            && <FAQEditor />}
          {activeTab === "footer"         && <FooterEditor />}
          {activeTab === "visual"         && <VisualBuilder />}
          {activeTab === "derma-overview" && <DermaOverview />}
          {/* Labo Suisse — individual editors */}
          {activeTab === "ls-constructor"  && <LSPageBuilder />}
          {activeTab === "ls-colores"     && <LSColoresEditor />}
          {activeTab === "ls-navbar"      && <LSNavEditor />}
          {activeTab === "ls-hero"        && <LSHeroEditor />}
          {activeTab === "ls-contenido"   && <LSContenidoEditor />}
          {activeTab === "ls-noticias"    && <LSNoticiasFAQEditor />}
          {activeTab === "ls-footer"      && <LSFooterEditor />}
          {/* Vitacap G — individual editors */}
          {activeTab === "vitacap-constructor"  && <VitacapPageBuilder />}
          {activeTab === "vitacap-navbar"       && <VitacapNavbarEditor />}
          {activeTab === "vitacap-colores"    && <VitacapColoresEditor />}
          {activeTab === "vitacap-hero"       && <VitacapHeroEditor />}
          {activeTab === "vitacap-beneficios" && <VitacapBeneficiosEditor />}
          {activeTab === "vitacap-carruseles" && <VitacapCarruselesEditor />}
          {activeTab === "vitacap-secciones"  && <VitacapSeccionesEditor />}
          {/* Mi Sitio — constructor sin código */}
          {activeTab === "sb-builder" && <SiteBuilderEditor />}
          {/* Sitios personalizados publicados */}
          {activeCustomSiteId && (
            <CustomSiteEditor siteId={activeCustomSiteId} />
          )}
        </main>
      </div>

      {/* ── Create Site Modal ─────────────────────────────────────────────── */}
      <CreateSiteModal
        open={createSiteModalOpen}
        onClose={() => setCreateSiteModalOpen(false)}
        onConfirm={handleCreateSite}
      />
    </div>
  )
}

