"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, GraduationCap, Save } from "lucide-react"

export default function StudentResultsPage() {
  const subjects: any[] = [] // Declared subjects variable

  const getBadgeColor = (grade: string): string => {
    if (grade === "O") return "bg-purple-100 text-purple-800 hover:bg-purple-100"
    if (grade === "A+") return "bg-green-100 text-green-800 hover:bg-green-100"
    if (grade === "A") return "bg-green-100 text-green-800 hover:bg-green-100"
    if (grade === "B+") return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    if (grade === "B") return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    if (grade === "C") return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    if (grade === "P") return "bg-orange-100 text-orange-800 hover:bg-orange-100"
    return "bg-red-100 text-red-800 hover:bg-red-100"
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/student/dashboard" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">AcademiQ</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <img src="/placeholder.svg?height=32&width=32" className="rounded-full border" alt="Avatar" />
              <span className="sr-only">User menu</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Results</h1>
            <div className="flex items-center gap-2">
              <Select defaultValue="midterm">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="midterm">Mid Term - 2023/24</SelectItem>
                  <SelectItem value="endterm">End Term - 2023/24</SelectItem>
                  <SelectItem value="midterm-prev">Mid Term - 2022/23</SelectItem>
                  <SelectItem value="endterm-prev">End Term - 2022/23</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mid Term - Academic Year 2023/24</CardTitle>
              <CardDescription>Results for BTech, Semester 3</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="results" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="results">Results</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>
                <TabsContent value="results" className="space-y-4">
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
                        <TableRow>
                          <TableCell className="font-medium">Data Structures & Algorithms</TableCell>
                          <TableCell>96/100</TableCell>
                          <TableCell>
                            <Badge className={getBadgeColor("O")}>O</Badge>
                          </TableCell>
                          <TableCell>78/100</TableCell>
                          <TableCell>Excellent work! Consistently performs well.</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Computer Networks</TableCell>
                          <TableCell>88/100</TableCell>
                          <TableCell>
                            <Badge className={getBadgeColor("A+")}>A+</Badge>
                          </TableCell>
                          <TableCell>75/100</TableCell>
                          <TableCell>Very good understanding of concepts.</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Database Management Systems</TableCell>
                          <TableCell>82/100</TableCell>
                          <TableCell>
                            <Badge className={getBadgeColor("A")}>A</Badge>
                          </TableCell>
                          <TableCell>72/100</TableCell>
                          <TableCell>Good SQL skills, needs work on normalization concepts.</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Operating Systems</TableCell>
                          <TableCell>68/100</TableCell>
                          <TableCell>
                            <Badge className={getBadgeColor("B+")}>B+</Badge>
                          </TableCell>
                          <TableCell>70/100</TableCell>
                          <TableCell>Good analysis, needs to improve on process scheduling concepts.</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Software Engineering</TableCell>
                          <TableCell>58/100</TableCell>
                          <TableCell>
                            <Badge className={getBadgeColor("B")}>B</Badge>
                          </TableCell>
                          <TableCell>74/100</TableCell>
                          <TableCell>Strong understanding of SDLC concepts.</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="rounded-md border p-4 bg-muted/40">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Overall Average:</span>
                        <span>78.4/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Overall Grade:</span>
                        <span>A</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Class Rank:</span>
                        <span>3 of 32</span>
                      </div>
                      <div className="pt-2">
                        <span className="font-medium">Faculty's Comment:</span>
                        <p className="mt-1 text-sm">
                          Aarav has shown excellent progress this term. He consistently participates in class and
                          submits high-quality work. He should continue to focus on improving his practical
                          implementation in Operating Systems and theoretical concepts in Database Management Systems.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="performance" className="space-y-4">
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <div className="text-center">
                      <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Performance analytics will appear here</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="justify-between">
              <div className="text-sm text-muted-foreground">
                <p>O: 10.0 (95-100), A+: 9.0 (85-94.99), A: 8.0 (75-84.99)</p>
                <p>B+: 7.0 (65-74.99), B: 6.0 (55-64.99), C: 5.0 (45-54.99)</p>
                <p>P: 4.0 (40-44.99), F: 0.0 (0-39.99)</p>
              </div>
              <Button className="gap-1" disabled={subjects.length === 0}>
                <Save className="h-4 w-4" />
                Save Calculation
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
