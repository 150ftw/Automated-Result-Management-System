"use client"

import { useState, useEffect } from "react"
import { TeacherLayout } from "@/components/teacher-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, FileText, GraduationCap, Users } from "lucide-react"
import Link from "next/link"
import { dbService } from "@/lib/db-service"

export default function TeacherClassesPage() {
  const [activeTab, setActiveTab] = useState("current")
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // In a real app, we would get the teacher ID from authentication
        const teacherId = "TCH-001"

        // Get results for this teacher
        const teacherResults = dbService.getResultsByTeacherId(teacherId)

        // Extract unique program+semester combinations to represent classes
        const classGroups = {}

        teacherResults.forEach((result) => {
          const key = `${result.program}-${result.semester}`
          if (!classGroups[key]) {
            classGroups[key] = {
              name: `${result.program} ${result.semester}`,
              code: result.subject.substring(0, 4).toUpperCase(),
              students: new Set(),
              results: [],
              lastUpdated: new Date(result.date),
            }
          }

          classGroups[key].students.add(result.studentId)
          classGroups[key].results.push(result)

          const resultDate = new Date(result.date)
          if (resultDate > classGroups[key].lastUpdated) {
            classGroups[key].lastUpdated = resultDate
          }
        })

        // Convert to array and add additional properties
        const currentClasses = Object.values(classGroups).map((cls) => {
          // Calculate average progress/score for this class
          const totalPercentage = cls.results.reduce((sum, r) => sum + r.percentage, 0)
          const avgPercentage = totalPercentage / cls.results.length

          // Generate schedule and room info (mock data)
          const days = ["Mon, Wed, Fri", "Tue, Thu", "Mon, Thu"]
          const times = ["9:00 AM", "11:30 AM", "2:00 PM"]
          const rooms = ["Room 201", "Room 202", "Room 301", "Room 302"]

          return {
            ...cls,
            students: cls.students.size,
            progress: avgPercentage,
            schedule: `${days[Math.floor(Math.random() * days.length)]} - ${times[Math.floor(Math.random() * times.length)]}`,
            lastClass: getRelativeTimeString(cls.lastUpdated),
            nextClass: getNextClassString(),
            room: rooms[Math.floor(Math.random() * rooms.length)],
          }
        })

        setClasses(currentClasses)
      } catch (error) {
        console.error("Error fetching classes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClasses()
  }, [])

  // Helper function to get relative time string
  const getRelativeTimeString = (date) => {
    const now = new Date()
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  // Helper function to get next class string
  const getNextClassString = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    const times = ["9:00 AM", "11:30 AM", "2:00 PM"]

    const today = new Date().getDay() // 0 = Sunday, 1 = Monday, etc.
    let nextDay

    if (today === 0) nextDay = "Tomorrow"
    else if (today === 6) nextDay = "Monday"
    else {
      const daysUntilNext = Math.floor(Math.random() * 3) // 0, 1, or 2 days
      if (daysUntilNext === 0) nextDay = "Today"
      else if (daysUntilNext === 1) nextDay = "Tomorrow"
      else nextDay = days[today + 1 > 5 ? 1 : today + 1]
    }

    return `${nextDay}, ${times[Math.floor(Math.random() * times.length)]}`
  }

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">My Classes</h1>
        <Button asChild>
          <Link href="/teacher/results/upload">
            <FileText className="mr-2 h-4 w-4" />
            Export Class List
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="current" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="current">Current Classes</TabsTrigger>
          <TabsTrigger value="past">Past Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="bg-primary/5 pb-4">
                    <div className="h-5 bg-muted rounded w-24 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-16"></div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-full"></div>
                      </div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="flex justify-between pt-2">
                        <div className="h-8 bg-muted rounded w-24"></div>
                        <div className="h-8 bg-muted rounded w-24"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : classes.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No classes found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {classes.map((cls, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="bg-primary/5 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{cls.name}</CardTitle>
                        <CardDescription>{cls.code}</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-primary/10">
                        {cls.students} Students
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Class Progress</span>
                          <span>{cls.progress.toFixed(1)}%</span>
                        </div>
                        <Progress value={cls.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Last: {cls.lastClass}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Next: {cls.nextClass}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-sm">
                        <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{cls.schedule}</span>
                      </div>

                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{cls.room}</span>
                      </div>

                      <div className="flex justify-between pt-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/teacher/classes/${cls.name.toLowerCase().replace(/\s+/g, "-")}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Attendance
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "BTech Semester 1",
                code: "MATH091",
                term: "2022-2023",
                students: 33,
                avgGrade: "B+",
              },
              {
                name: "BCA Semester 2",
                code: "MATH091",
                term: "2022-2023",
                students: 35,
                avgGrade: "B",
              },
              {
                name: "BTech Semester 3",
                code: "MATH101",
                term: "2021-2022",
                students: 30,
                avgGrade: "B+",
              },
              {
                name: "BCA Semester 4",
                code: "MATH101",
                term: "2021-2022",
                students: 32,
                avgGrade: "B",
              },
              {
                name: "BTech Semester 5",
                code: "MATH201",
                term: "2020-2021",
                students: 28,
                avgGrade: "A-",
              },
            ].map((cls, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{cls.name}</CardTitle>
                      <CardDescription>{cls.code}</CardDescription>
                    </div>
                    <Badge variant="outline">{cls.term}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{cls.students} Students</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground mr-2">Avg. Grade:</span>
                        <Badge>{cls.avgGrade}</Badge>
                      </div>
                    </div>

                    <div className="flex justify-between pt-2">
                      <Button variant="outline" size="sm">
                        View Results
                      </Button>
                      <Button variant="outline" size="sm">
                        Class Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </TeacherLayout>
  )
}
