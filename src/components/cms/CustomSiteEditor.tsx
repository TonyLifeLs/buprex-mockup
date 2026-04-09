"use client"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CUSTOM SITE EDITOR
 *  Wrapper de SiteBuilderEditor apuntando al estado de un sitio específico.
 *  Toma un siteId y usa useCustomSiteSBApi() para construir el adapter
 *  SBState & SBActions que el editor necesita.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useCustomSitesStore, useCustomSiteSBApi } from "@/store/customSites"
import { SiteBuilderEditor } from "@/components/cms/SiteBuilderEditor"
import { Globe } from "lucide-react"

interface Props {
  siteId: string
}

export function CustomSiteEditor({ siteId }: Props) {
  const site = useCustomSitesStore((s) => s.sites.find((x) => x.id === siteId))
  const sbApi = useCustomSiteSBApi(siteId)

  if (!site || !sbApi) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <Globe className="h-10 w-10 opacity-30" />
        <p className="text-sm font-medium">Sitio no encontrado.</p>
      </div>
    )
  }

  return (
    <SiteBuilderEditor
      sb={sbApi}
      previewHref={`/mi-sitio?site=${site.id}`}
    />
  )
}
