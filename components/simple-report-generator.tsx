"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { dbService } from "@/lib/db-service"

interface SimpleReportGeneratorProps {
  className?: string
}

export function SimpleReportGenerator({ className }: SimpleReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateReport = async () => {
    setIsGenerating(true)

    try {
      // Get data from our mock database
      const students = dbService.getUsersByRole("student")
      const results = dbService.getPublishedResults()

      // Calculate statistics
      const totalStudents = students.length
      const totalResults = results.length
      const totalPercentage = results.reduce((sum, result) => sum + result.percentage, 0)
      const averageScore = (totalPercentage / (results.length || 1)).toFixed(2)

      // Create a simple text report
      let reportText = "AcademiQ Performance Report\n"
      reportText += `Generated on: ${new Date().toLocaleDateString()}\n\n`
      reportText += "Summary Statistics:\n"
      reportText += `Total Students: ${totalStudents}\n`
      reportText += `Total Results: ${totalResults}\n`
      reportText += `Average Score: ${averageScore}%\n\n`

      // Add grade distribution
      const gradeCount = {
        O: 0,
        "A+": 0,
        A: 0,
        "B+": 0,
        B: 0,
        C: 0,
        P: 0,
        F: 0,
      }

      results.forEach((result) => {
        if (gradeCount.hasOwnProperty(result.grade)) {
          gradeCount[result.grade as keyof typeof gradeCount]++
        }
      })

      reportText += "Grade Distribution:\n"
      Object.entries(gradeCount).forEach(([grade, count]) => {
        const percentage = ((count / totalResults) * 100).toFixed(2)
        reportText += `${grade}: ${count} (${percentage}%)\n`
      })

      // Create a blob and download it
      const blob = new Blob([reportText], { type: "text/plain" })
      const url = URL.createObjectURL(blob)

      // Create a link and trigger download
      const a = document.createElement("a")
      a.href = url
      a.download = `AcademiQ_Report_${new Date().toISOString().split("T")[0]}.txt`
      document.body.appendChild(a)
      a.click()

      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating report:", error)
      alert(`Failed to generate report: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button onClick={generateReport} disabled={isGenerating} className={className} variant="outline">
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download Text Report
        </>
      )}
    </Button>
  )
}
