"use client"

import type { ReactNode } from "react"
import { useState, useEffect } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // Return a simplified version during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-16 border-b border-border"></div>
        <div className="flex">
          <div className="w-64 h-[calc(100vh-4rem)]"></div>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar collapsed={sidebarCollapsed} />
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
          {children}
        </main>
      </div>
    </div>
  )
}
