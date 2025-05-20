"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { dbService, type User, type Result } from "@/lib/db-service"
import { GraduationCap, Mail, Calendar, ArrowLeft, School, BarChart3, FileText, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function StudentProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [student, setStudent] = useState<User | null>(null)
  const [results, setResults] = useState<Result[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!params.id) return

    // Fetch student data
    const studentId = Array.isArray(params.id) ? params.id[0] : params.id
    const studentData = dbService.getUserById(studentId)

    if (studentData) {
      setStudent(studentData)

      // Fetch student's results
      const studentResults = dbService.getResultsByStudentId(studentId)
      setResults(studentResults)
    }

    setIsLoading(false)
  }, [params.id])

  // Prepare data for performance chart
  const prepareChartData = () => {
    if (!results.length) return []

    const termData: Record<string, Record<string, number>> = {}

    results.forEach((result) => {
      const key = `${result.academicYear}-${result.term}`
      if (!termData[key]) {
        termData[key] = { average: 0, count: 0 }
      }
      termData[key].average += result.percentage
      termData[key].count += 1
    })

    return Object.entries(termData)
      .map(([key, data]) => {
        const [year, term] = key.split("-")
        return {
          name: `${term}, ${year}`,
          average: Math.round(data.average / data.count),
        }
      })
      .sort((a, b) => {
        // Sort by academic year and term
        const yearA = a.name.split(", ")[1]
        const yearB = b.name.split(", ")[1]
        const termA = a.name.split(", ")[0]
        const termB = b.name.split(", ")[0]

        if (yearA !== yearB) {
          return yearA.localeCompare(yearB)
        }

        return termA.localeCompare(termB)
      })
  }

  if (isLoading) {
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
        <div className="container flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="animate-pulse h-8 w-64 bg-muted rounded mx-auto mb-4"></div>
            <div className="animate-pulse h-4 w-40 bg-muted rounded mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!student) {
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
        <div className="container flex items-center justify-center flex-1">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Student Not Found</CardTitle>
              <CardDescription>
                The student profile you're looking for doesn't exist or you don't have permission to view it.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/students">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Students
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  const chartData = prepareChartData()

  // Get the student's latest results
  const latestResults = [...results].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/students">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">{student.name}</h1>
          </div>

          <div className="grid gap-6 md:grid-cols-7">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Student Profile</CardTitle>
                <CardDescription>Personal and academic information</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt={student.name} />
                  <AvatarFallback className="text-xl">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1 text-center">
                  <h3 className="font-medium text-lg">{student.name}</h3>
                  <p className="text-muted-foreground">{student.id}</p>
                </div>

                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  {student.class || "No Class Assigned"}
                </Badge>

                <Separator />

                <div className="w-full space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{student.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Joined: {new Date(student.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <School className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Academic Year 2023-2024</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
                <Button size="sm">View Results</Button>
              </CardFooter>
            </Card>

            <div className="space-y-6 md:col-span-5">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2" />
                        Performance Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip formatter={(value) => [`${value}%`, "Average Score"]} />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="average"
                              stroke="#8884d8"
                              strokeWidth={2}
                              activeDot={{ r: 8 }}
                              name="Term Average"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Academic Standing</h4>
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <span className="text-green-800 font-medium">A-</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Good Standing</p>
                              <p className="text-xs text-muted-foreground">Overall GPA: 3.7</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Class Ranking</h4>
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-800 font-medium">5</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Top 15%</p>
                              <p className="text-xs text-muted-foreground">Rank 5 out of 32 students</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Recent Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Subject</TableHead>
                              <TableHead>Term</TableHead>
                              <TableHead>Score</TableHead>
                              <TableHead>Grade</TableHead>
                              <TableHead>Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {latestResults.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                  No results available.
                                </TableCell>
                              </TableRow>
                            ) : (
                              latestResults.map((result) => (
                                <TableRow
                                  key={result.id}
                                  className="cursor-pointer hover:bg-muted/50"
                                  onClick={() => router.push(`/results/${result.id}`)}
                                >
                                  <TableCell className="font-medium">{result.subject}</TableCell>
                                  <TableCell>
                                    {result.term}, {result.academicYear}
                                  </TableCell>
                                  <TableCell>
                                    {result.score}/{result.totalMarks}
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      className={
                                        result.grade.startsWith("A")
                                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                                          : result.grade.startsWith("B")
                                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                            : result.grade.startsWith("C")
                                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                              : "bg-red-100 text-red-800 hover:bg-red-100"
                                      }
                                    >
                                      {result.grade}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{new Date(result.date).toLocaleDateString()}</TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/student/results/history?id=${student.id}`}>View Complete History</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="results" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Academic Results</CardTitle>
                      <CardDescription>Complete result history for {student.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between mb-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Current Term
                          </Button>
                          <Button variant="outline" size="sm">
                            All Years
                          </Button>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Export
                        </Button>
                      </div>

                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Subject</TableHead>
                              <TableHead>Term</TableHead>
                              <TableHead>Academic Year</TableHead>
                              <TableHead>Score</TableHead>
                              <TableHead>Grade</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {results.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                  No results available.
                                </TableCell>
                              </TableRow>
                            ) : (
                              results
                                .sort((a, b) => {
                                  // Sort by academic year, term, and subject
                                  if (a.academicYear !== b.academicYear) {
                                    return b.academicYear.localeCompare(a.academicYear)
                                  }
                                  if (a.term !== b.term) {
                                    return a.term.localeCompare(b.term)
                                  }
                                  return a.subject.localeCompare(b.subject)
                                })
                                .slice(0, 10)
                                .map((result) => (
                                  <TableRow
                                    key={result.id}
                                    className="cursor-pointer hover:bg-muted/50"
                                    onClick={() => router.push(`/results/${result.id}`)}
                                  >
                                    <TableCell className="font-medium">{result.subject}</TableCell>
                                    <TableCell>{result.term}</TableCell>
                                    <TableCell>{result.academicYear}</TableCell>
                                    <TableCell>
                                      {result.score}/{result.totalMarks}
                                    </TableCell>
                                    <TableCell>
                                      <Badge
                                        className={
                                          result.grade.startsWith("A")
                                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                                            : result.grade.startsWith("B")
                                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                              : result.grade.startsWith("C")
                                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                                : "bg-red-100 text-red-800 hover:bg-red-100"
                                        }
                                      >
                                        {result.grade}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge
                                        variant="outline"
                                        className={
                                          result.status === "published"
                                            ? "bg-green-50 text-green-700 border-green-200"
                                            : result.status === "pending"
                                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                              : "bg-blue-50 text-blue-700 border-blue-200"
                                        }
                                      >
                                        {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))
                            )}
                          </TableBody>
                        </Table>
                      </div>

                      {results.length > 10 && (
                        <div className="flex justify-center mt-4">
                          <Button variant="outline">Load More</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Analytics</CardTitle>
                      <CardDescription>Detailed analysis of {student.name}'s academic performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Subject Comparison</h4>
                          <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={[
                                  { subject: "Mathematics", score: 85, classAvg: 76 },
                                  { subject: "Science", score: 92, classAvg: 79 },
                                  { subject: "English", score: 78, classAvg: 74 },
                                  { subject: "History", score: 82, classAvg: 71 },
                                  { subject: "Geography", score: 88, classAvg: 75 },
                                ]}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="subject" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
                                <Legend />
                                <Line
                                  type="monotone"
                                  dataKey="score"
                                  stroke="#8884d8"
                                  strokeWidth={2}
                                  activeDot={{ r: 8 }}
                                  name="Student Score"
                                />
                                <Line
                                  type="monotone"
                                  dataKey="classAvg"
                                  stroke="#82ca9d"
                                  strokeWidth={2}
                                  name="Class Average"
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <Separator />

                        <div className="grid md:grid-cols-3 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">Strongest Subject</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">Science</div>
                              <p className="text-sm text-muted-foreground">
                                92% average score, 13% above class average
                              </p>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">Area for Improvement</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">English</div>
                              <p className="text-sm text-muted-foreground">
                                78% average score, lowest performance subject
                              </p>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">Overall Trend</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold text-green-600">+5.2%</div>
                              <p className="text-sm text-muted-foreground">
                                Improvement compared to previous academic year
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
