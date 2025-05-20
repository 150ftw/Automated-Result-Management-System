"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Users,
} from "lucide-react"
import { DashboardStats } from "@/components/dashboard-stats"
import { GradeCalculator } from "@/components/grade-calculator"
import { UserNav } from "@/components/user-nav"

export default function StudentDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/student/dashboard" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">AcademiQ</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/student/dashboard" className="text-sm font-medium text-primary">
              Dashboard
            </Link>
            <Link
              href="/student/results"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Results
            </Link>
            <Link
              href="/student/courses"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/student/calendar"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Calendar
            </Link>
          </nav>
          <UserNav />
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/student/calendar">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Schedule
                </Link>
              </Button>
              <Button asChild>
                <Link href="/student/results">
                  <FileText className="mr-2 h-4 w-4" />
                  View Results
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.85</div>
                <div className="text-xs text-muted-foreground">Based on current term</div>
                <div className="mt-3">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excellent</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Average</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.4%</div>
                <div className="text-xs text-muted-foreground">Across all subjects</div>
                <div className="mt-3">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">A Grade</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  3<span className="text-sm font-normal">/32</span>
                </div>
                <div className="text-xs text-muted-foreground">In Grade 10</div>
                <div className="mt-3">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Top 10%</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Tests</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs text-muted-foreground">In the next 7 days</div>
                <div className="mt-3">
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Science, Math</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="grades">Grades</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <DashboardStats userRole="student" className="col-span-4" />

                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Results</CardTitle>
                    <CardDescription>Your recently published results</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Mathematics</p>
                        <p className="text-sm text-muted-foreground">Term 3, 2023-2024</p>
                      </div>
                      <div className="ml-auto font-medium">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">92/100</Badge>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Science</p>
                        <p className="text-sm text-muted-foreground">Term 3, 2023-2024</p>
                      </div>
                      <div className="ml-auto font-medium">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">88/100</Badge>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">English</p>
                        <p className="text-sm text-muted-foreground">Term 3, 2023-2024</p>
                      </div>
                      <div className="ml-auto font-medium">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">85/100</Badge>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">History</p>
                        <p className="text-sm text-muted-foreground">Term 3, 2023-2024</p>
                      </div>
                      <div className="ml-auto font-medium">
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">78/100</Badge>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Geography</p>
                        <p className="text-sm text-muted-foreground">Term 3, 2023-2024</p>
                      </div>
                      <div className="ml-auto font-medium">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">82/100</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/student/results">View All Results</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Tests</CardTitle>
                    <CardDescription>Tests scheduled in the next 14 days</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Science Unit Test</p>
                        <p className="text-sm text-muted-foreground">Monday, March 15, 2025</p>
                      </div>
                      <div className="ml-auto">
                        <Badge variant="outline">3 days</Badge>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Mathematics Quiz</p>
                        <p className="text-sm text-muted-foreground">Thursday, March 18, 2025</p>
                      </div>
                      <div className="ml-auto">
                        <Badge variant="outline">6 days</Badge>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">English Essay Submission</p>
                        <p className="text-sm text-muted-foreground">Friday, March 26, 2025</p>
                      </div>
                      <div className="ml-auto">
                        <Badge variant="outline">14 days</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/student/calendar">View Full Calendar</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Assignments</CardTitle>
                    <CardDescription>Track your assignment submission status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-green-100 p-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Mathematics Problem Set</p>
                        <p className="text-sm text-muted-foreground">Submitted on March 5, 2025</p>
                      </div>
                      <div className="ml-auto">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-yellow-100 p-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Science Lab Report</p>
                        <p className="text-sm text-muted-foreground">Due on March 12, 2025</p>
                      </div>
                      <div className="ml-auto">
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Progress</Badge>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-yellow-100 p-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">History Essay</p>
                        <p className="text-sm text-muted-foreground">Due on March 20, 2025</p>
                      </div>
                      <div className="ml-auto">
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Not Started</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/student/assignments">View All Assignments</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="grades" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Current Term Grades</CardTitle>
                    <CardDescription>Your grades for Term 3, 2023-2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="text-left p-3 font-medium">Subject</th>
                            <th className="text-center p-3 font-medium">Score</th>
                            <th className="text-center p-3 font-medium">Grade</th>
                            <th className="text-center p-3 font-medium">Class Avg.</th>
                            <th className="text-right p-3 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-3 font-medium">Mathematics</td>
                            <td className="p-3 text-center">92/100</td>
                            <td className="p-3 text-center">
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">A</Badge>
                            </td>
                            <td className="p-3 text-center">76/100</td>
                            <td className="p-3 text-right">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Published
                              </Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium">Science</td>
                            <td className="p-3 text-center">88/100</td>
                            <td className="p-3 text-center">
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">A-</Badge>
                            </td>
                            <td className="p-3 text-center">75/100</td>
                            <td className="p-3 text-right">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Published
                              </Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium">English</td>
                            <td className="p-3 text-center">85/100</td>
                            <td className="p-3 text-center">
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">B+</Badge>
                            </td>
                            <td className="p-3 text-center">72/100</td>
                            <td className="p-3 text-right">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Published
                              </Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium">History</td>
                            <td className="p-3 text-center">78/100</td>
                            <td className="p-3 text-center">
                              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">B</Badge>
                            </td>
                            <td className="p-3 text-center">70/100</td>
                            <td className="p-3 text-right">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Published
                              </Badge>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3 font-medium">Geography</td>
                            <td className="p-3 text-center">82/100</td>
                            <td className="p-3 text-center">
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">B+</Badge>
                            </td>
                            <td className="p-3 text-center">74/100</td>
                            <td className="p-3 text-right">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Published
                              </Badge>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr className="border-t bg-muted/50">
                            <td className="p-3 font-bold">Overall</td>
                            <td className="p-3 text-center font-bold">85.0/100</td>
                            <td className="p-3 text-center font-bold">B+</td>
                            <td className="p-3 text-center font-bold">73.4/100</td>
                            <td className="p-3 text-right"></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/student/results">View Full Report Card</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <GradeCalculator />
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Calendar</CardTitle>
                  <CardDescription>Important dates and upcoming events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <div className="text-center">
                      <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Calendar view will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Resources</CardTitle>
                  <CardDescription>Access learning materials and resources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Course Materials</h3>
                          <p className="text-sm text-muted-foreground">Access textbooks and course notes</p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button variant="ghost" size="sm" className="gap-1" asChild>
                          <Link href="#">
                            View <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Library Resources</h3>
                          <p className="text-sm text-muted-foreground">Online books and research materials</p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button variant="ghost" size="sm" className="gap-1" asChild>
                          <Link href="#">
                            View <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                          >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <path d="m7.6 12 3.4 4 6-8" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Practice Tests</h3>
                          <p className="text-sm text-muted-foreground">Prepare with sample questions</p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button variant="ghost" size="sm" className="gap-1" asChild>
                          <Link href="#">
                            View <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-3">Recent Downloads</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm">Mathematics_Formulas.pdf</span>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm">Science_Lab_Instructions.pdf</span>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm">English_Essay_Guidelines.docx</span>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
