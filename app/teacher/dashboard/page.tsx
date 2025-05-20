"use client"

import { useState, useEffect } from "react"
import { TeacherLayout } from "@/components/teacher-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Overview } from "@/components/overview"
import { dbService } from "@/lib/db-service"
import { BarChart, Users, FileText, CheckCircle, Clock, ArrowUpRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function TeacherDashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [recentResults, setRecentResults] = useState([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, we would get the teacher ID from authentication
        const teacherId = "TCH-001"

        // Get teacher stats from the database service
        const teacherStats = dbService.getDashboardStats("teacher", teacherId)
        setStats(teacherStats)

        // Get recent results for this teacher
        const teacherResults = dbService.getResultsByTeacherId(teacherId)
        const sortedResults = [...teacherResults]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5)
        setRecentResults(sortedResults)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Teacher Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/teacher/results/upload">
              <FileText className="mr-2 h-4 w-4" />
              Upload Results
            </Link>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-24"></div>
              </CardHeader>
              <CardContent>
                <div className="h-7 bg-muted rounded w-16 mb-1"></div>
                <div className="h-4 bg-muted rounded w-32"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalStudents || 0}</div>
                <p className="text-xs text-muted-foreground">Across all your classes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Published Results</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.teacherPublishedResults || 0}</div>
                <p className="text-xs text-muted-foreground">Results published this term</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.teacherAverage || 0}%</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-medium">+2.5%</span>
                  <span className="ml-1">from last term</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Results</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.teacherPendingResults || 0}</div>
                <p className="text-xs text-muted-foreground">Awaiting approval</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Results</CardTitle>
                <CardDescription>Recently published or updated results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentResults.map((result) => (
                    <div className="flex items-center" key={result.id}>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{result.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {result.studentName} • {result.program} {result.semester}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {result.grade} ({result.percentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Average scores by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Get unique subjects from the teacher's results */}
                  {Array.from(new Set(recentResults.map((r) => r.subject))).map((subject, i) => {
                    // Calculate average percentage for this subject
                    const subjectResults = recentResults.filter((r) => r.subject === subject)
                    const avgPercentage =
                      subjectResults.reduce((sum, r) => sum + r.percentage, 0) / (subjectResults.length || 1)

                    return (
                      <div className="flex items-center justify-between" key={i}>
                        <span>{subject}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{avgPercentage.toFixed(1)}%</span>
                          <Progress value={avgPercentage} className="h-2 w-40" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Class Distribution</CardTitle>
                <CardDescription>Students by program and semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Get unique program+semester combinations */}
                  {Array.from(new Set(recentResults.map((r) => `${r.program} ${r.semester}`))).map((classGroup, i) => {
                    // Count students in this class group
                    const studentsInClass = new Set(
                      recentResults.filter((r) => `${r.program} ${r.semester}` === classGroup).map((r) => r.studentId),
                    ).size

                    // Calculate percentage of total students
                    const percentage = (studentsInClass / stats.totalStudents) * 100

                    return (
                      <div className="flex items-center justify-between" key={i}>
                        <span>{classGroup}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{studentsInClass} students</span>
                          <Progress value={percentage} className="h-2 w-40" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </TeacherLayout>
  )
}
