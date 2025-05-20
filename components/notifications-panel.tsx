"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CheckCircle, FileText, Info, Megaphone } from "lucide-react"
import { Separator } from "@/components/ui/separator"

type Notification = {
  id: string
  title: string
  message: string
  type: "result" | "announcement" | "system"
  date: string
  read: boolean
}

export function NotificationsPanel() {
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
  ])

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return "Today"
    } else if (diffInDays === 1) {
      return "Yesterday"
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`
    } else {
      return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    }
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

  const resultNotifications = notifications.filter((n) => n.type === "result")
  const announcementNotifications = notifications.filter((n) => n.type === "announcement")
  const systemNotifications = notifications.filter((n) => n.type === "system")
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center">
        <div className="flex flex-col space-y-1.5">
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Stay updated with important announcements</CardDescription>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" className="ml-auto gap-1" onClick={markAllAsRead}>
            <CheckCircle className="h-3.5 w-3.5" />
            Mark all as read
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="relative">
              All
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="max-h-[350px] overflow-y-auto mt-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center p-4 text-muted-foreground">No notifications to display</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-lg border p-3 ${!notification.read ? "border-l-4 border-l-primary bg-muted/50" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`rounded-full p-1.5 ${getBadgeColor(notification.type).replace("hover:bg-", "bg-")}`}
                      >
                        {getIcon(notification.type)}
                      </div>
                      <span className="font-medium">{notification.title}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {formatDate(notification.date)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground ml-8">{notification.message}</p>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="results" className="max-h-[350px] overflow-y-auto mt-4 space-y-3">
            {resultNotifications.length === 0 ? (
              <div className="text-center p-4 text-muted-foreground">No result notifications to display</div>
            ) : (
              resultNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-lg border p-3 ${!notification.read ? "border-l-4 border-l-primary bg-muted/50" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-blue-100 p-1.5">
                        <FileText className="h-4 w-4 text-blue-800" />
                      </div>
                      <span className="font-medium">{notification.title}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {formatDate(notification.date)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground ml-8">{notification.message}</p>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="announcements" className="max-h-[350px] overflow-y-auto mt-4 space-y-3">
            {announcementNotifications.length === 0 ? (
              <div className="text-center p-4 text-muted-foreground">No announcement notifications to display</div>
            ) : (
              announcementNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-lg border p-3 ${!notification.read ? "border-l-4 border-l-primary bg-muted/50" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-purple-100 p-1.5">
                        <Megaphone className="h-4 w-4 text-purple-800" />
                      </div>
                      <span className="font-medium">{notification.title}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {formatDate(notification.date)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground ml-8">{notification.message}</p>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="system" className="max-h-[350px] overflow-y-auto mt-4 space-y-3">
            {systemNotifications.length === 0 ? (
              <div className="text-center p-4 text-muted-foreground">No system notifications to display</div>
            ) : (
              systemNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-lg border p-3 ${!notification.read ? "border-l-4 border-l-primary bg-muted/50" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-gray-100 p-1.5">
                        <Info className="h-4 w-4 text-gray-800" />
                      </div>
                      <span className="font-medium">{notification.title}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {formatDate(notification.date)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground ml-8">{notification.message}</p>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <Separator />
      <CardFooter className="p-4">
        <Button variant="outline" className="w-full" disabled={unreadCount === 0}>
          {unreadCount > 0 ? `Mark ${unreadCount} as read` : "No new notifications"}
        </Button>
      </CardFooter>
    </Card>
  )
}
