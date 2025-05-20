"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserNav } from "@/components/user-nav"
import { ArrowLeft, Download, GraduationCap, LineChart } from "lucide-react"

export default function StudentResultsHistoryPage() {
  const years = ["2023-2024", "2022-2023", "2021-2022"]
  const terms = ["Term 1", "Term 2", "Term 3"]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/student/dashboard" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">AcademiQ</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/student/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link href="/student/results" className="text-sm font-medium text-primary">
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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/student/results">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Results History</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Academic Performance History</CardTitle>
              <CardDescription>View your academic performance across all terms and years</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="2023-2024" className="space-y-4">
                <div className="flex items-center justify-between">
                  <TabsList>
                    {years.map((year) => (
                      <TabsTrigger key={year} value={year}>
                        {year}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3.5 w-3.5" />
                    Download Report
                  </Button>
                </div>

                {years.map((year) => (
                  <TabsContent key={year} value={year} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-md border h-64 w-full p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">Performance Trend</h3>
                          <div className="flex items-center gap-2">
                            <span className="flex items-center text-xs text-muted-foreground">
                              <div className="h-2 w-2 rounded-full bg-blue-500 mr-1" /> Your Score
                            </span>
                            <span className="flex items-center text-xs text-muted-foreground">
                              <div className="h-2 w-2 rounded-full bg-gray-300 mr-1" /> Class Average
                            </span>
                          </div>
                        </div>
                        <div className="h-52 flex items-center justify-center">
                          <LineChart className="h-10 w-10 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    <Tabs defaultValue="term1" className="space-y-4">
                      <TabsList>
                        <TabsTrigger value="term1">Term 1</TabsTrigger>
                        <TabsTrigger value="term2">Term 2</TabsTrigger>
                        <TabsTrigger value="term3">Term 3</TabsTrigger>
                      </TabsList>

                      {terms.map((term, idx) => (
                        <TabsContent key={`${term}-${idx}`} value={`term${idx + 1}`} className="space-y-4">
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Subject</TableHead>
                                  <TableHead>Score</TableHead>
                                  <TableHead>Grade</TableHead>
                                  <TableHead>Class Average</TableHead>
                                  <TableHead>Remarks</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {/* Generate different scores based on the academic year to show improvement */}
                                <TableRow>
                                  <TableCell className="font-medium">Mathematics</TableCell>
                                  <TableCell>{Math.min(92 - 3 * years.indexOf(year), 100)}/100</TableCell>
                                  <TableCell>
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                      {years.indexOf(year) === 0 ? "A" : years.indexOf(year) === 1 ? "A-" : "B+"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{Math.min(76 - 2 * years.indexOf(year), 100)}/100</TableCell>
                                  <TableCell className="text-sm">
                                    {years.indexOf(year) === 0
                                      ? "Excellent work! Consistently performs well."
                                      : years.indexOf(year) === 1
                                        ? "Good understanding of concepts."
                                        : "Showing improvement in problem solving."}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">Science</TableCell>
                                  <TableCell>{Math.min(88 - 4 * years.indexOf(year), 100)}/100</TableCell>
                                  <TableCell>
                                    <Badge
                                      className={
                                        years.indexOf(year) === 0
                                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                                          : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                      }
                                    >
                                      {years.indexOf(year) === 0 ? "A-" : years.indexOf(year) === 1 ? "B+" : "B"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{Math.min(75 - 3 * years.indexOf(year), 100)}/100</TableCell>
                                  <TableCell className="text-sm">
                                    {years.indexOf(year) === 0
                                      ? "Very good understanding of scientific concepts."
                                      : years.indexOf(year) === 1
                                        ? "Good lab work and theoretical knowledge."
                                        : "Showing interest and improvement in concepts."}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">English</TableCell>
                                  <TableCell>{Math.min(85 - 5 * years.indexOf(year), 100)}/100</TableCell>
                                  <TableCell>
                                    <Badge
                                      className={
                                        years.indexOf(year) === 0
                                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                                          : years.indexOf(year) === 1
                                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                      }
                                    >
                                      {years.indexOf(year) === 0 ? "B+" : years.indexOf(year) === 1 ? "B" : "C+"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{Math.min(72 - 3 * years.indexOf(year), 100)}/100</TableCell>
                                  <TableCell className="text-sm">
                                    {years.indexOf(year) === 0
                                      ? "Good communication skills, needs work on grammar."
                                      : years.indexOf(year) === 1
                                        ? "Improving in writing skills. Needs more reading practice."
                                        : "Needs more attention to grammar and vocabulary."}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Term Average</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-bold">{Math.min(85 - 4 * years.indexOf(year), 100)}%</div>
                                <p className="text-xs text-muted-foreground">
                                  {years.indexOf(year) === 0
                                    ? "Excellent performance"
                                    : years.indexOf(year) === 1
                                      ? "Good performance"
                                      : "Satisfactory performance"}
                                </p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-bold">
                                  {years.indexOf(year) === 0 ? "3" : years.indexOf(year) === 1 ? "5" : "8"}
                                  <span className="text-sm font-normal">/32</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {years.indexOf(year) === 0
                                    ? "Top 10% of the class"
                                    : years.indexOf(year) === 1
                                      ? "Top 20% of the class"
                                      : "Top 25% of the class"}
                                </p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">GPA</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-bold">
                                  {(3.85 - 0.2 * years.indexOf(year)).toFixed(2)}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {years.indexOf(year) === 0
                                    ? "Dean's List Qualification"
                                    : years.indexOf(year) === 1
                                      ? "Honor Roll"
                                      : "Good Standing"}
                                </p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Improvement</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-bold">
                                  {years.indexOf(year) === 0
                                    ? "+7.2%"
                                    : years.indexOf(year) === 1
                                      ? "+5.8%"
                                      : "Baseline"}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {years.indexOf(year) === 0
                                    ? "From previous year"
                                    : years.indexOf(year) === 1
                                      ? "From base year"
                                      : "First year of records"}
                                </p>
                              </CardContent>
                            </Card>
                          </div>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Teacher's Feedback</CardTitle>
                              <CardDescription>
                                Consolidated feedback for {term}, {year}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">
                                {years.indexOf(year) === 0
                                  ? "John has shown excellent progress this term. He consistently participates in class and submits high-quality work. He should continue to focus on improving his writing skills in English and factual recall in History."
                                  : years.indexOf(year) === 1
                                    ? "John is a dedicated student who shows good understanding of most subjects. He has improved significantly in Mathematics and Science. More attention to detail in English and History assignments would help him achieve even better results."
                                    : "John shows potential in most subjects. He needs to develop better study habits and time management. His strengths are in Mathematics and Science, but needs considerable improvement in English and History."}
                              </p>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
