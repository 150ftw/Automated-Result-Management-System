"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calculator, PlusCircle, RefreshCw, Save, Trash2 } from "lucide-react"

type Subject = {
  id: string
  name: string
  creditHours: number
  score: number
  grade: string
  gradePoint: number
}

const calculateGrade = (score: number): { grade: string; gradePoint: number } => {
  if (score >= 95) return { grade: "O", gradePoint: 10.0 }
  if (score >= 85) return { grade: "A+", gradePoint: 9.0 }
  if (score >= 75) return { grade: "A", gradePoint: 8.0 }
  if (score >= 65) return { grade: "B+", gradePoint: 7.0 }
  if (score >= 55) return { grade: "B", gradePoint: 6.0 }
  if (score >= 45) return { grade: "C", gradePoint: 5.0 }
  if (score >= 40) return { grade: "P", gradePoint: 4.0 }
  return { grade: "F", gradePoint: 0.0 }
}

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

export function GradeCalculator() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", name: "Data Structures & Algorithms", creditHours: 4, score: 96, grade: "O", gradePoint: 10.0 },
    { id: "2", name: "Computer Networks", creditHours: 4, score: 88, grade: "A+", gradePoint: 9.0 },
    { id: "3", name: "Database Management Systems", creditHours: 3, score: 78, grade: "A", gradePoint: 8.0 },
  ])

  const [newSubject, setNewSubject] = useState({ name: "", creditHours: 3, score: 0 })

  const addSubject = () => {
    if (!newSubject.name) return

    const { grade, gradePoint } = calculateGrade(newSubject.score)

    setSubjects([
      ...subjects,
      {
        id: (subjects.length + 1).toString(),
        name: newSubject.name,
        creditHours: newSubject.creditHours,
        score: newSubject.score,
        grade,
        gradePoint,
      },
    ])

    // Reset new subject form
    setNewSubject({ name: "", creditHours: 3, score: 0 })
  }

  const updateSubjectScore = (id: string, score: number) => {
    const updatedSubjects = subjects.map((subject) => {
      if (subject.id === id) {
        const { grade, gradePoint } = calculateGrade(score)
        return { ...subject, score, grade, gradePoint }
      }
      return subject
    })

    setSubjects(updatedSubjects)
  }

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter((subject) => subject.id !== id))
  }

  const resetCalculator = () => {
    setSubjects([])
    setNewSubject({ name: "", creditHours: 3, score: 0 })
  }

  // Calculate GPA
  const totalCreditHours = subjects.reduce((sum, subject) => sum + subject.creditHours, 0)
  const totalGradePoints = subjects.reduce((sum, subject) => sum + subject.gradePoint * subject.creditHours, 0)
  const gpa = totalCreditHours > 0 ? (totalGradePoints / totalCreditHours).toFixed(2) : "0.00"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          GPA Calculator
        </CardTitle>
        <CardDescription>Calculate your GPA based on course grades and credit hours</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Your Courses</h3>
            <Button variant="outline" size="sm" onClick={resetCalculator} className="h-8 gap-1">
              <RefreshCw className="h-3.5 w-3.5" />
              Reset
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Credit Hours</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Grade Points</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                      No courses added yet. Add a course to calculate your GPA.
                    </TableCell>
                  </TableRow>
                ) : (
                  subjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell className="font-medium">{subject.name}</TableCell>
                      <TableCell>{subject.creditHours}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          value={subject.score}
                          onChange={(e) => updateSubjectScore(subject.id, Number.parseInt(e.target.value) || 0)}
                          className="h-8 w-16"
                        />
                      </TableCell>
                      <TableCell>
                        <Badge className={getBadgeColor(subject.grade)}>{subject.grade}</Badge>
                      </TableCell>
                      <TableCell>{subject.gradePoint.toFixed(1)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeSubject(subject.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
                <TableRow>
                  <TableCell>
                    <Select
                      value={newSubject.name}
                      onValueChange={(value) => setNewSubject({ ...newSubject, name: value })}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Data Structures & Algorithms">Data Structures & Algorithms</SelectItem>
                        <SelectItem value="Computer Networks">Computer Networks</SelectItem>
                        <SelectItem value="Database Management Systems">Database Management Systems</SelectItem>
                        <SelectItem value="Operating Systems">Operating Systems</SelectItem>
                        <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                        <SelectItem value="Computer Architecture">Computer Architecture</SelectItem>
                        <SelectItem value="Theory of Computation">Theory of Computation</SelectItem>
                        <SelectItem value="Compiler Design">Compiler Design</SelectItem>
                        <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                        <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={newSubject.creditHours.toString()}
                      onValueChange={(value) => setNewSubject({ ...newSubject, creditHours: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="h-8 w-16">
                        <SelectValue placeholder="CH" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={newSubject.score}
                      onChange={(e) =>
                        setNewSubject({
                          ...newSubject,
                          score: Number.parseInt(e.target.value) || 0,
                        })
                      }
                      className="h-8 w-16"
                    />
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={addSubject}
                      disabled={!newSubject.name}
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span className="sr-only">Add</span>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="rounded-md border p-4 bg-muted/40">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Total Credit Hours:</span>
              <span>{totalCreditHours}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total Grade Points:</span>
              <span>{totalGradePoints.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>GPA:</span>
              <span>{gpa}</span>
            </div>
          </div>
        </div>
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
  )
}
