"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserNav } from "@/components/user-nav"
import { DashboardNav } from "@/components/dashboard-nav"
import { Bell, CheckCircle, FileText, Filter, GraduationCap, Info, Megaphone, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Notification = {
  id: string
  title: string
  message: string
  type: "result" | "announcement" | "system"
  date: string
  read: boolean
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Results Published: Term 3, 2023-2024",
      message:
        "Your results for Term 3, Academic Year 2023-2024 have been published. You can view them in the Results section.",
      type: "result",
      date: "2025-03-05T09:30:00Z",
      read: false,
    },
    {
      id: "2",
      title: "Parent-Teacher Meeting",
      message: "Parent-Teacher meetings will be held on March 15th. Schedule your appointment through the portal.",
      type: "announcement",
      date: "2025-03-02T14:15:00Z",
      read: false,
    },
    {
      id: "3",
      title: "System Maintenance",
      message:
        "AcademiQ will undergo scheduled maintenance on Saturday, March 12th from 10 PM to 2 AM. Some features may be unavailable during this time.",
      type: "system",
      date: "2025-02-28T11:45:00Z",
      read: true,
    },
    {
      id: "4",
      title: "Science Fair Registration",
      message: "The Science Fair is scheduled for April 5th. Registration is now open for all interested students.",
      type: "announcement",
      date: "2025-02-25T10:00:00Z",
      read: true,
    },
    {
      id: "5",
      title: "Results Published: Term 2, 2023-2024",
      message:
        "Your results for Term 2, Academic Year 2023-2024 have been published. You can view them in the Results section.",
      type: "result",
      date: "2025-02-20T08:30:00Z",
      read: true,
    },
    {
      id: "6",
      title: "Holiday Announcement",
      message: "The school will remain closed from April 2nd to April 10th for the spring break.",
      type: "announcement",
      date: "2025-02-15T10:00:00Z",
      read: true,
    },
    {
      id: "7",
      title: "Exam Schedule Released",
      message: "Final examination schedule has been released. Please check the calendar for dates and timings.",
      type: "announcement",
      date: "2025-02-10T15:30:00Z",
      read: true,
    },
    {
      id: "8",
      title: "Password Updated",
      message: "Your account password was updated successfully on February 8th, 2025.",
      type: "system",
      date: "2025-02-08T16:45:00Z",
      read: true,
    },
    {
      id: "9",
      title: "Results Published: Term 1, 2023-2024",
      message:
        "Your results for Term 1, Academic Year 2023-2024 have been published. You can view them in the Results section.",
      type: "result",
      date: "2024-11-20T08:30:00Z",
      read: true,
    },
    {
      id: "10",
      title: "School Trip Registration Open",
      message: "Registration for the annual school trip to the Science Museum is now open. Limited spots available.",
      type: "announcement",
      date: "2024-10-15T13:15:00Z",
      read: true,
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "result":
        return <FileText className="h-4 w-4" />
      case "announcement":
        return <Megaphone className="h-4 w-4" />
      case "system":
        return <Info className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "result":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "announcement":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "system":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "result":
        return "Result"
      case "announcement":
        return "Announcement"
      case "system":
        return "System"
      default:
        return type
    }
  }

  // Filter notifications
  let filteredNotifications = [...notifications]

  // Apply search filter
  if (searchQuery) {
    filteredNotifications = filteredNotifications.filter(
      (n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  // Apply type filter
  if (filter !== "all") {
    if (filter === "unread") {
      filteredNotifications = filteredNotifications.filter((n) => !n.read)
    } else {
      filteredNotifications = filteredNotifications.filter((n) => n.type === filter)
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">AcademiQ</span>
          </Link>
          <UserNav />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px] border-r min-h-screen py-8">
          <DashboardNav />
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold md:text-2xl">Notifications</h1>
              {unreadCount > 0 && <Badge className="bg-primary text-primary-foreground">{unreadCount} new</Badge>}
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" className="gap-1" onClick={markAllAsRead}>
                <CheckCircle className="h-4 w-4" />
                Mark all as read
              </Button>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notifications..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filter by" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Notifications</SelectItem>
                  <SelectItem value="unread">Unread Only</SelectItem>
                  <SelectItem value="result">Results</SelectItem>
                  <SelectItem value="announcement">Announcements</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>Stay updated with important announcements and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                  <p>No notifications match your filters</p>
                  {(searchQuery || filter !== "all") && (
                    <Button
                      variant="link"
                      className="mt-2"
                      onClick={() => {
                        setSearchQuery("")
                        setFilter("all")
                      }}
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`rounded-lg border p-4 ${!notification.read ? "border-l-4 border-l-primary bg-muted/50" : ""}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`rounded-full p-1.5 ${getBadgeColor(notification.type).replace("hover:bg-", "bg-")}`}
                        >
                          {getIcon(notification.type)}
                        </div>
                        <span className="font-medium">{notification.title}</span>
                        <Badge className={getBadgeColor(notification.type)}>{getTypeLabel(notification.type)}</Badge>
                      </div>
                      <div className="flex items-center ml-8 md:ml-0">
                        <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                        {!notification.read && <Badge className="ml-2 bg-primary text-primary-foreground">New</Badge>}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground ml-8">{notification.message}</p>
                    {!notification.read && (
                      <div className="mt-3 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            markAsRead(notification.id)
                          }}
                        >
                          Mark as read
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
