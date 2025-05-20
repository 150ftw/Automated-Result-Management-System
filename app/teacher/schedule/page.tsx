"use client"

import { useState } from "react"
import { TeacherLayout } from "@/components/teacher-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TeacherSchedulePage() {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState("week")

  // Mock data for today's events
  const todayEvents = [
    {
      id: 1,
      title: "Class 10-A Mathematics",
      startTime: "9:00 AM",
      endTime: "10:00 AM",
      location: "Room 201",
      type: "Class",
    },
    {
      id: 2,
      title: "Class 10-B Mathematics",
      startTime: "11:30 AM",
      endTime: "12:30 PM",
      location: "Room 202",
      type: "Class",
    },
    {
      id: 3,
      title: "Department Meeting",
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      location: "Conference Room",
      type: "Meeting",
    },
  ]

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 4,
      title: "Class 11-A Mathematics",
      day: "Tuesday",
      startTime: "9:00 AM",
      endTime: "10:00 AM",
      location: "Room 301",
      type: "Class",
    },
    {
      id: 5,
      title: "Class 11-B Mathematics",
      day: "Tuesday",
      startTime: "11:30 AM",
      endTime: "12:30 PM",
      location: "Room 302",
      type: "Class",
    },
    {
      id: 6,
      title: "Class 11-C Mathematics",
      day: "Tuesday",
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      location: "Room 303",
      type: "Class",
    },
    {
      id: 7,
      title: "Class 10-A Test",
      day: "Wednesday",
      startTime: "9:00 AM",
      endTime: "10:30 AM",
      location: "Room 201",
      type: "Test",
    },
    {
      id: 8,
      title: "Parent-Teacher Meeting",
      day: "Friday",
      startTime: "3:00 PM",
      endTime: "5:00 PM",
      location: "Main Hall",
      type: "Meeting",
    },
  ]

  // Get event badge color
  const getEventBadgeColor = (type) => {
    switch (type) {
      case "Class":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Test":
        return "bg-red-50 text-red-700 border-red-200"
      case "Meeting":
        return "bg-purple-50 text-purple-700 border-purple-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Teaching Schedule</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Sync Calendar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="week" className="space-y-4" onValueChange={setView}>
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium">
                  {date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </div>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="day" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>
                    {date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </CardTitle>
                  <CardDescription>Your schedule for today</CardDescription>
                </CardHeader>
                <CardContent>
                  {todayEvents.length > 0 ? (
                    <div className="space-y-4">
                      {todayEvents.map((event) => (
                        <div key={event.id} className="flex items-start p-3 rounded-lg border">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{event.title}</h3>
                              <Badge variant="outline" className={getEventBadgeColor(event.type)}>
                                {event.type}
                              </Badge>
                            </div>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>
                                  {event.startTime} - {event.endTime}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      No classes or events scheduled for today
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="week" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Weekly Schedule</CardTitle>
                  <CardDescription>Your teaching schedule for the week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Time</TableHead>
                          <TableHead>Monday</TableHead>
                          <TableHead>Tuesday</TableHead>
                          <TableHead>Wednesday</TableHead>
                          <TableHead>Thursday</TableHead>
                          <TableHead>Friday</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">9:00 - 10:00</TableCell>
                          <TableCell>
                            <div className="p-2 bg-blue-50 rounded-md">
                              <p className="font-medium">Class 10-A</p>
                              <p className="text-xs text-muted-foreground">Mathematics</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="p-2 bg-blue-50 rounded-md">
                              <p className="font-medium">Class 11-A</p>
                              <p className="text-xs text-muted-foreground">Mathematics</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="p-2 bg-blue-50 rounded-md">
                              <p className="font-medium">Class 10-A</p>
                              <p className="text-xs text-muted-foreground">Mathematics</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="p-2 bg-blue-50 rounded-md">
                              <p className="font-medium">Class 11-A</p>
                              <p className="text-xs text-muted-foreground">Mathematics</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="p-2 bg-blue-50 rounded-md">
                              <p className="font-medium">Class 10-A</p>
                              <p className="text-xs text-muted-foreground">Mathematics</p>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">11:30 - 12:30</TableCell>
                          <TableCell>
                            <div className="p-2 bg-blue-50 rounded-md">
                              <p className="font-medium">Class 10-B</p>
                              <p className="text-xs text-muted-foreground">Mathematics</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="p-2 bg-blue-50 rounded-md">
                              <p className="font-medium">Class 11-B</p>
                              <p className="text-xs text-muted-foreground">Mathematics</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="p-2 bg-blue-50 rounded-md">
                              <p className="font-medium">Class 10-B</p>
                              <p className="text-xs text-muted-foreground">Mathematics</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="p-2 bg-blue-50 rounded-md">
                              <p className="font-medium">Class 11-B</p>
                              <p className="text-xs text-muted-foreground">Mathematics</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="p-2 bg-blue-50 rounded-md">
                              <p className="font-medium">Class 10-B</p>
                              <p className="text-xs text-muted-foreground">Mathematics</p>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">2:00 - 3:00</TableCell>
                          <TableCell>
                            <div className="p-2 bg-gray-50 rounded-md">
                              <p className="text-xs text-muted-foreground">Free Period</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="p-2 bg-blue-50 rounded-md">
                              <p className="font-medium">Class 11-C</p>
                              <p className="text-xs text-muted-foreground">Mathematics</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="p-2 bg-gray-50 rounded-md">
                              <p className="text-xs text-muted-foreground">Free Period</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="p-2 bg-blue-50 rounded-md">
                              <p className="font-medium">Class 11-C</p>
                              <p className="text-xs text-muted-foreground">Mathematics</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="p-2 bg-purple-50 rounded-md">
                              <p className="font-medium">Meeting</p>
                              <p className="text-xs text-muted-foreground">Department</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="month">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly View</CardTitle>
                  <CardDescription>Your teaching schedule for the month</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todayEvents.length > 0 ? (
                <div className="space-y-4">
                  {todayEvents.map((event) => (
                    <div key={event.id} className="flex items-start">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="text-sm font-medium">{event.startTime}</div>
                        <div className="h-full w-px bg-border mt-2 mb-2"></div>
                        <div className="text-sm font-medium">{event.endTime}</div>
                      </div>
                      <div className="flex-1 rounded-md border p-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{event.title}</h3>
                          <Badge variant="outline" className={getEventBadgeColor(event.type)}>
                            {event.type}
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">No classes or events scheduled for today</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your next scheduled classes and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="text-sm font-medium">{event.day}</div>
                      <div className="text-xs text-muted-foreground">{event.startTime}</div>
                    </div>
                    <div className="flex-1 rounded-md border p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{event.title}</h3>
                        <Badge variant="outline" className={getEventBadgeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
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
