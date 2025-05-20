import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { TeacherNav } from "@/components/teacher-nav"
import type { ReactNode } from "react"

interface TeacherLayoutProps {
  children: ReactNode
}

export function TeacherLayout({ children }: TeacherLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/teacher/dashboard" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">AcademiQ</span>
          </Link>
          <div className="flex items-center gap-4 px-4">
            <UserNav />
          </div>
        </div>
      </header>
      <div className="container flex-1 grid gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px] border-r min-h-screen py-8">
          <TeacherNav />
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">{children}</main>
      </div>
    </div>
  )
}
