"use client"

import { Search, Bell, Settings, Menu } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme/theme-toggle"

interface HeaderProps {
  onToggleSidebar: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border px-6 py-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="hover:bg-accent">
              <Menu className="w-5 h-5" />
            </Button>
            <div className="text-xl font-bold text-foreground">Digital Campus</div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-primary font-medium">
              Dashboard
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </a>
          </nav>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search..." className="pl-10 w-64 bg-background" />
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </Button>

          <ThemeToggle />

          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>

          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
