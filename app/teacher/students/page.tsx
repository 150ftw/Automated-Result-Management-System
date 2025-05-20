"use client"

import { useState, useEffect } from "react"
import { TeacherLayout } from "@/components/teacher-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Download, Mail, Search } from "lucide-react"
import { dbService } from "@/lib/db-service"

export default function TeacherStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("all")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [programs, setPrograms] = useState([])
  const [semesters, setSemesters] = useState([])
  const [studentPerformance, setStudentPerformance] = useState({})

  useEffect(() => {
    // Fetch students data
    const fetchStudentsData = async () => {
      try {
        // In a real app, we would get the teacher ID from authentication
        const teacherId = "TCH-001"

        // Get results for this teacher
        const teacherResults = dbService.getResultsByTeacherId(teacherId)

        // Get unique student IDs from the results
        const studentIds = [...new Set(teacherResults.map((r) => r.studentId))]

        // Get student details for these IDs
        const allStudents = dbService.getUsers()
        const teacherStudents = allStudents.filter((s) => s.role === "student" && studentIds.includes(s.id))

        setStudents(teacherStudents)

        // Extract unique programs and semesters for filters
        setPrograms([...new Set(teacherStudents.map((s) => s.program).filter(Boolean))])
        setSemesters([...new Set(teacherStudents.map((s) => s.semester).filter(Boolean))])

        // Calculate performance for each student
        const performance = {}
        for (const studentId of studentIds) {
          const studentResults = teacherResults.filter((r) => r.studentId === studentId)
          if (studentResults.length > 0) {
            const totalPercentage = studentResults.reduce((sum, r) => sum + r.percentage, 0)
            const avgPercentage = totalPercentage / studentResults.length

            let performanceLevel
            if (avgPercentage >= 85) performanceLevel = "Excellent"
            else if (avgPercentage >= 70) performanceLevel = "Good"
            else if (avgPercentage >= 50) performanceLevel = "Average"
            else performanceLevel = "Needs Improvement"

            performance[studentId] = {
              avgPercentage,
              performanceLevel,
              attendance: Math.floor(80 + Math.random() * 20), // Mock attendance data
            }
          }
        }
        setStudentPerformance(performance)
      } catch (error) {
        console.error("Error fetching students:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudentsData()
  }, [])

  // Filter students based on search term and selected filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesProgram = selectedProgram === "all" || student.program === selectedProgram
    const matchesSemester = selectedSemester === "all" || student.semester === selectedSemester

    return matchesSearch && matchesProgram && matchesSemester
  })

  // Get performance badge variant
  const getPerformanceBadge = (performance) => {
    switch (performance) {
      case "Excellent":
        return "bg-green-50 text-green-700 border-green-200"
      case "Good":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Average":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Needs Improvement":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">My Students</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export List
          </Button>
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Contact Students
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
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
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {semesters.map((semester) => (
                  <SelectItem key={semester} value={semester}>
                    {semester}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Student List</CardTitle>
          <CardDescription>View and manage students in your classes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Student</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead className="text-center">Attendance</TableHead>
                <TableHead className="text-center">Performance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Loading students...
                  </TableCell>
                </TableRow>
              ) : filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.program || "N/A"}</TableCell>
                    <TableCell>{student.semester || "N/A"}</TableCell>
                    <TableCell className="text-center">
                      {studentPerformance[student.id]?.attendance || "N/A"}%
                    </TableCell>
                    <TableCell className="text-center">
                      {studentPerformance[student.id] ? (
                        <Badge
                          variant="outline"
                          className={getPerformanceBadge(studentPerformance[student.id].performanceLevel)}
                        >
                          {studentPerformance[student.id].performanceLevel}
                        </Badge>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Results
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
