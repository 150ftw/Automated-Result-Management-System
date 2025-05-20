"use client"

import { useState } from "react"
import { TeacherLayout } from "@/components/teacher-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Check, Clock, Search, Trash2 } from "lucide-react"

export default function TeacherNotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      title: "New result upload guidelines",
      message:
        "Please review the updated guidelines for uploading student results. All teachers must follow the new format starting next week.",
      date: "2025-03-15T09:30:00",
      type: "Announcement",
      read: false,
    },
    {
      id: 2,
      title: "Student query on Class 10-A results",
      message: "Aarav Sharma (ST10001) has submitted a query regarding their unit test results.",
      date: "2025-03-14T14:15:00",
      type: "Student",
      read: true,
    },
    {
      id: 3,
      title: "Department meeting reminder",
      message: "Reminder: Department meeting scheduled for Friday, March 17, 2025 at 2:00 PM in the Conference Room.",
      date: "2025-03-14T10:00:00",
      type: "Meeting",
      read: false,
    },
    {
      id: 4,
      title: "Result upload successful",
      message: "Your result upload for 'Unit Test 3 - Class 10-A' has been successfully processed and published.",
      date: "2025-03-13T16:45:00",
      type: "System",
      read: true,
    },
    {
      id: 5,
      title: "Curriculum update for Mathematics",
      message: "The curriculum for Mathematics has been updated. Please review the changes before your next class.",
      date: "2025-03-12T11:20:00",
      type: "Announcement",
      read: true,
    },
  ]

  // Filter notifications based on search term and selected type
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || notification.type === selectedType
    return matchesSearch && matchesType
  })

  // Get notification badge color
  const getNotificationBadgeColor = (type) => {
    switch (type) {
      case "Announcement":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Student":
        return "bg-green-50 text-green-700 border-green-200"
      case "Meeting":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "System":
        return "bg-gray-50 text-gray-700 border-gray-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else {
      return (
        date.toLocaleDateString([], { month: "short", day: "numeric" }) +
        ` at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      )
    }
  }

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Notifications</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Check className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
          <Button variant="outline">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Announcement">Announcements</SelectItem>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Meeting">Meetings</SelectItem>
                    <SelectItem value="System">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>Your recent notifications and updates</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredNotifications.length > 0 ? (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg ${notification.read ? "bg-background" : "bg-primary/5"}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-medium ${notification.read ? "" : "text-primary"}`}>
                              {notification.title}
                            </h3>
                            {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                          <div className="mt-2 flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {formatDate(notification.date)}
                          </div>
                        </div>
                        <Badge variant="outline" className={getNotificationBadgeColor(notification.type)}>
                          {notification.type}
                        </Badge>
                      </div>
                      <div className="mt-3 flex justify-end gap-2">
                        {!notification.read && (
                          <Button variant="ghost" size="sm">
                            <Check className="mr-1 h-3 w-3" />
                            Mark as Read
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">No notifications found</div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="student-queries">Student Queries</Label>
                  <p className="text-sm text-muted-foreground">Notifications for student questions and queries</p>
                </div>
                <Switch id="student-queries" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="result-updates">Result Updates</Label>
                  <p className="text-sm text-muted-foreground">Notifications for result processing and updates</p>
                </div>
                <Switch id="result-updates" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-updates">System Updates</Label>
                  <p className="text-sm text-muted-foreground">Notifications for system changes and updates</p>
                </div>
                <Switch id="system-updates" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="meeting-reminders">Meeting Reminders</Label>
                  <p className="text-sm text-muted-foreground">Reminders for upcoming meetings and events</p>
                </div>
                <Switch id="meeting-reminders" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>
                You have {notifications.filter((n) => !n.read).length} unread notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications
                  .filter((notification) => !notification.read)
                  .map((notification) => (
                    <div key={notification.id} className="flex items-start gap-3 p-3 border rounded-md">
                      <div className={`p-2 rounded-full ${getNotificationBadgeColor(notification.type)}`}>
                        <Bell className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{formatDate(notification.date)}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TeacherLayout>
  )
}
