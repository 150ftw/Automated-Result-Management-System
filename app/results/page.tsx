"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, FileSpreadsheet, Search, Upload, Filter, Eye, Pencil, Trash2 } from "lucide-react"

// Helper function to calculate grade based on score
const calculateGrade = (score: number): string => {
  if (score >= 95) return "O"
  if (score >= 85) return "A+"
  if (score >= 75) return "A"
  if (score >= 65) return "B+"
  if (score >= 55) return "B"
  if (score >= 45) return "C"
  if (score >= 40) return "P"
  return "F"
}

// Helper function to get badge color based on grade
const getGradeBadgeColor = (grade: string): string => {
  switch (grade) {
    case "O":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "A+":
      return "bg-green-100 text-green-800 border-green-200"
    case "A":
      return "bg-green-100 text-green-800 border-green-200"
    case "B+":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "B":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "C":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "P":
      return "bg-orange-100 text-orange-800 border-orange-200"
    default:
      return "bg-red-100 text-red-800 border-red-200"
  }
}

// Helper function to get badge color based on status
const getStatusBadgeColor = (status: string): string => {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-800 border-green-200"
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Draft":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function ResultsPage() {
  const [currentPage, setCurrentPage] = useState(1)

  // Sample data with correct grade calculations
  const results = [
    {
      id: "ST-2023-001",
      name: "Aarav Sharma",
      program: "BTech",
      subject: "Data Structures & Algorithms",
      score: 92,
      status: "Published",
    },
    {
      id: "ST-2023-002",
      name: "Aditi Patel",
      program: "BTech",
      subject: "Computer Networks",
      score: 88,
      status: "Published",
    },
    {
      id: "ST-2023-003",
      name: "Aryan Singh",
      program: "BCA",
      subject: "Database Systems",
      score: 76,
      status: "Published",
    },
    {
      id: "ST-2023-004",
      name: "Anaya Gupta",
      program: "BTech",
      subject: "Operating Systems",
      score: 95,
      status: "Pending",
    },
    {
      id: "ST-2023-005",
      name: "Vihaan Verma",
      program: "BCA",
      subject: "Web Development",
      score: 82,
      status: "Draft",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 1 3 3 3h6c2 0 3-1 3-3v-5" />
            </svg>
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
            <h1 className="text-lg font-semibold md:text-2xl">Results Management</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/results/templates">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Templates
                </Link>
              </Button>
              <Button asChild>
                <Link href="/results/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Results
                </Link>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Results</CardTitle>
              <CardDescription>View, filter, and manage all student results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {/* Search and Filter Controls */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search results..." className="w-full pl-8" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Filter</span>
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full sm:w-[120px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full sm:w-[120px]">
                        <SelectValue placeholder="Program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Programs</SelectItem>
                        <SelectItem value="btech">BTech</SelectItem>
                        <SelectItem value="bca">BCA</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full sm:w-[120px]">
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        <SelectItem value="dsa">Data Structures</SelectItem>
                        <SelectItem value="cn">Computer Networks</SelectItem>
                        <SelectItem value="dbms">Database Systems</SelectItem>
                        <SelectItem value="os">Operating Systems</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Results Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.map((result) => {
                        const grade = calculateGrade(result.score)
                        return (
                          <TableRow key={result.id}>
                            <TableCell>{result.id}</TableCell>
                            <TableCell>{result.name}</TableCell>
                            <TableCell>{result.program}</TableCell>
                            <TableCell>{result.subject}</TableCell>
                            <TableCell>{result.score}/100</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getGradeBadgeColor(grade)}>
                                {grade}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusBadgeColor(result.status)}>
                                {result.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Pencil className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing <strong>1</strong> to <strong>5</strong> of <strong>25</strong> results
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous page</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={currentPage === 1 ? "bg-primary text-primary-foreground" : ""}
                    >
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      4
                    </Button>
                    <Button variant="outline" size="sm">
                      5
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === 5}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next page</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
