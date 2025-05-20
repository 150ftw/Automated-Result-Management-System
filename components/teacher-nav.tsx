"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Users, Bell, HelpCircle, BookOpen, Calendar, Upload } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function TeacherNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/teacher/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "My Classes",
      href: "/teacher/classes",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Results",
      href: "/teacher/results",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Students",
      href: "/teacher/students",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Upload Results",
      href: "/teacher/results/upload",
      icon: <Upload className="h-5 w-5" />,
    },
    {
      title: "Schedule",
      href: "/teacher/schedule",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Notifications",
      href: "/teacher/notifications",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      title: "Help & Support",
      href: "/teacher/support",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <nav className="grid gap-2 px-2">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
              pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground",
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="mt-auto px-2">
        <ThemeToggle />
      </div>
    </div>
  )
}
