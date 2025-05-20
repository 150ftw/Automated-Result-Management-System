"use client"

import { useState, useEffect } from "react"
import { TeacherLayout } from "@/components/teacher-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search, Upload } from "lucide-react"
import Link from "next/link"
import { dbService } from "@/lib/db-service"

export default function TeacherResultsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("all")
  const [selectedTerm, setSelectedTerm] = useState("all")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [programs, setPrograms] = useState([])
  const [terms, setTerms] = useState([])

  useEffect(() => {
    // Fetch results data
    const fetchResults = async () => {
      try {
        // In a real app, we would get the teacher ID from authentication
        const teacherId = "TCH-001"

        // Get results for this teacher
        const teacherResults = dbService.getResultsByTeacherId(teacherId)
        setResults(teacherResults)

        // Extract unique programs and terms for filters
        setPrograms([...new Set(teacherResults.map((r) => r.program))])
        setTerms([...new Set(teacherResults.map((r) => r.term))])
      } catch (error) {
        console.error("Error fetching results:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [])

  // Group results by subject, program, semester, and term
  const groupedResults = results.reduce((groups, result) => {
    const key = `${result.subject}-${result.program}-${result.semester}-${result.term}-${result.academicYear}`
    if (!groups[key]) {
      groups[key] = {
        subject: result.subject,
        program: result.program,
        semester: result.semester,
        term: result.term,
        academicYear: result.academicYear,
        results: [],
        status: result.status,
      }
    }
    groups[key].results.push(result)
    return groups
  }, {})

  // Convert grouped results to array and calculate averages
  const resultSummaries = Object.values(groupedResults).map((group) => {
    const totalPercentage = group.results.reduce((sum, r) => sum + r.percentage, 0)
    const avgPercentage = totalPercentage / group.results.length
    return {
      ...group,
      avgPercentage,
      studentCount: group.results.length,
    }
  })

  // Filter results based on search term and selected filters
  const filteredResults = resultSummaries.filter((result) => {
    const matchesSearch =
      result.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.semester.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesProgram = selectedProgram === "all" || result.program === selectedProgram
    const matchesTerm = selectedTerm === "all" || result.term === selectedTerm

    return matchesSearch && matchesProgram && matchesTerm
  })

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Results Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild>
            <Link href="/teacher/results/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Results
            </Link>
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search results..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                {programs.map((program) => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTerm} onValueChange={setSelectedTerm}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Terms</SelectItem>
                {terms.map((term) => (
                  <SelectItem key={term} value={term}>
                    {term}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Results</CardTitle>
          <CardDescription>Manage and view all your class results</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Term</TableHead>
                <TableHead className="text-center">Students</TableHead>
                <TableHead className="text-center">Avg. Score</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    Loading results...
                  </TableCell>
                </TableRow>
              ) : filteredResults.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No results found
                  </TableCell>
                </TableRow>
              ) : (
                filteredResults.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{result.subject}</TableCell>
                    <TableCell>{result.program}</TableCell>
                    <TableCell>{result.semester}</TableCell>
                    <TableCell>
                      {result.term} ({result.academicYear})
                    </TableCell>
                    <TableCell className="text-center">{result.studentCount}</TableCell>
                    <TableCell className="text-center">{result.avgPercentage.toFixed(1)}%</TableCell>
                    <TableCell className="text-center">
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
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TeacherLayout>
  )
}
