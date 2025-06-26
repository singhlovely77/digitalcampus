"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  FileText,
  Smartphone,
  FileCheck,
  CreditCard,
  Users,
  UserCheck,
  FolderOpen,
  Puzzle,
  Settings,
  Shield,
  HelpCircle,
  Download,
  ChevronDown,
  ChevronRight,
  BarChart3,
  LineChart,
  PieChart,
  Gauge,
  Layers,
  Inbox,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  CalendarDays,
  CalendarCheck,
  CalendarClock,
  ClipboardList,
  LayoutGrid,
} from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Link } from 'react-router-dom';

// Define the menu item type with support for submenus
interface MenuItem {
  icon: React.ElementType
  label: string
  active?: boolean
  href?: string
  submenu?: MenuItem[]
}

// Enhanced menu items with submenus
const menuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboards",
    active: true,
    href: "/",
    submenu: [
      { icon: BarChart3, label: "Analytics", href: "/analytics" },
      { icon: LineChart, label: "Performance", href: "/performance" },
      { icon: PieChart, label: "Statistics", href: "/statistics" },
      { icon: Gauge, label: "Monitoring", href: "/monitoring" },
    ],
  },
  {
    icon: Calendar,
    label: "Calendar",
    href: "/calendar",
    submenu: [
      { icon: CalendarDays, label: "Month View", href: "/calendar" },
      { icon: CalendarCheck, label: "Events", href: "/calendar/events" },
        { icon: CalendarClock, label: "Schedule", href: "/scheduler" },
    ],
  },
    {
        icon: ClipboardList,
        label: "UserAttendence",
        href: "/attendance",
    },
  //  {
  //  icon: ClipboardList,
  //  label: "Scheduler",
  //      href: ,
  //},
  //{
  //  icon: LayoutGrid,
  //  label: "Tabs",
  //  href: "/tabs",
  //},
  //{
  //  icon: FileText,
  //  label: "Reports",
  //  submenu: [
  //    { icon: FileText, label: "Monthly", href: "/reports/monthly" },
  //    { icon: FileText, label: "Quarterly", href: "/reports/quarterly" },
  //    { icon: FileText, label: "Annual", href: "/reports/annual" },
  //  ],
  //},
  //{ icon: Smartphone, label: "Applications", href: "/applications" },
  //{ icon: FileCheck, label: "Proposal", href: "/proposals" },
  //{ icon: CreditCard, label: "Payment", href: "/payments" },
  {
    icon: Users,
    label: "Users",
    submenu: [
        { icon: Users, label: "Student", href: "/users" },/* + /student*/
        { icon: Users, label: "Faculty", href: "/users" }, /*/faculty*/
        { icon: Users, label: "Admin", href: "/users" },/*/admin*/
    ],
  },
  //{ icon: UserCheck, label: "Leads", href: "/leads" },
  //{ icon: FolderOpen, label: "Projects", href: "/projects" },
  //{
  //  icon: Puzzle,
  //  label: "Widgets",
  //  submenu: [
  //    { icon: Puzzle, label: "Components", href: "/widgets/components" },
  //    { icon: Puzzle, label: "Templates", href: "/widgets/templates" },
  //  ],
  //},
  //{
  //  icon: Settings,
  //  label: "Settings",
  //  submenu: [
  //    { icon: Settings, label: "General", href: "/settings" },
  //    { icon: Shield, label: "Security", href: "/settings/security" },
  //    { icon: Users, label: "Users", href: "/settings/users" },
  //  ],
  //},
  //{ icon: Shield, label: "Authentication", href: "/auth" },
  //{
  //  icon: HelpCircle,
  //  label: "Help Center",
  //  submenu: [
  //    { icon: MessageSquare, label: "Support", href: "/help/support" },
  //    { icon: FileText, label: "Documentation", href: "/help/docs" },
  //    { icon: Mail, label: "Contact", href: "/help/contact" },
  //  ],
  //},
  //{
  //  icon: Inbox,
  //  label: "Communication",
  //  submenu: [
  //    { icon: Mail, label: "Email", href: "/communication/email" },
  //    { icon: MessageSquare, label: "Chat", href: "/communication/chat" },
  //    { icon: Calendar, label: "Calendar", href: "/calendar" },
  //    { icon: Clock, label: "Schedule", href: "/communication/schedule" },
  //  ],
  //},
]

interface SidebarProps {
  collapsed: boolean
}

export function Sidebar({ collapsed }: SidebarProps) {
  // Track open submenu states
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({})
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleSubmenu = (label: string) => {
    if (collapsed) return

    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const isSubmenuOpen = (label: string) => !!openSubmenus[label]

  // Render a menu item with potential submenu
  const renderMenuItem = (item: MenuItem, index: number) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0
    const isOpen = isSubmenuOpen(item.label)

    // For collapsed sidebar with submenu items
    if (collapsed) {
      return (
        <div key={`${item.label}-${index}`} className="mb-1">
          <Tooltip>
            <TooltipTrigger asChild>
              {item.href ? (
                <Link to={item.href}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "w-8 h-8 transition-colors",
                      item.active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "w-8 h-8 transition-colors",
                    item.active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <div>
                <div className="font-medium">{item.label}</div>
                {hasSubmenu && (
                  <div className="mt-1 space-y-1">
                    {item.submenu?.map((subItem, subIndex) => (
                      <div key={subIndex} className="text-xs text-muted-foreground">
                        {subItem.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      )
    }

    // For expanded sidebar
    if (hasSubmenu) {
      return (
        <div key={`${item.label}-${index}`} className="mb-1">
          <button
            onClick={() => toggleSubmenu(item.label)}
            className={cn(
              "flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              item.active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </div>
            <div className="transition-transform duration-200">
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          </button>

          {/* Submenu items */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-200 ease-in-out",
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div className="pl-9 mt-1 space-y-1">
              {item.submenu?.map((subItem, subIndex) => (
                <Link
                  key={`${subItem.label}-${subIndex}`}
                  to={subItem.href || "#"}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    subItem.active
                      ? "text-primary font-medium bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                  )}
                >
                  <subItem.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{subItem.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )
    } else {
      // Regular menu item without submenu
      return (
        <Link
          key={`${item.label}-${index}`}
          to={item.href || "#"}
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1",
            item.active
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          )}
        >
          <item.icon className="w-5 h-5 flex-shrink-0" />
          <span className="truncate">{item.label}</span>
        </Link>
      )
    }
  }

  // Return a simplified version during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border overflow-hidden transition-all duration-300 z-40",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <div className="overflow-y-auto h-full">
          <nav className="p-4 space-y-1">
            {/* Simplified menu structure for SSR */}
            {menuItems.map((item, index) => (
              <div key={index} className="h-10"></div>
            ))}
          </nav>
        </div>
      </aside>
    )
  }

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border overflow-hidden transition-all duration-300 z-40",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <div className="overflow-y-auto h-full">
          <nav className="p-4 space-y-1">{menuItems.map((item, index) => renderMenuItem(item, index))}</nav>

          {/* Downloading Center - Only show when expanded */}
          {!collapsed && (
            <div className="p-4 mt-4">
              <div className="bg-accent/50 rounded-lg p-4 text-center border border-border">
                <Download className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-medium text-foreground mb-1">Downloading Center</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Create & download a production ready code to get started with your project
                </p>
                <button className="w-full bg-primary text-primary-foreground text-sm py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
                  DOWNLOAD NOW
                </button>
              </div>
            </div>
          )}

          {/* Collapsed Download Icon */}
          {collapsed && (
            <div className="p-4 mt-8 flex justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-primary">
                    <Download className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="ml-2">
                  Downloading Center
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}
