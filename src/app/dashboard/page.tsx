import { redirect } from "next/navigation"
import { APP_ROUTES } from "@/constants/routes"

export default function DashboardRoute() {
  redirect(APP_ROUTES.maintenance)
}

