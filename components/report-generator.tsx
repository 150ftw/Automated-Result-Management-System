"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { dbService } from "@/lib/db-service"

interface ReportGeneratorProps {
  type?: string
  className?: string
}

export function ReportGenerator({ type = "performance", className }: ReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateReport = async () => {
    setIsGenerating(true)

    try {
      console.log("Starting PDF generation...")

      // Dynamically import jsPDF to avoid SSR issues
      const jsPDFModule = await import("jspdf")
      const jsPDF = jsPDFModule.default

      console.log("jsPDF imported successfully")

      // Create a new PDF document
      const doc = new jsPDF()

      console.log("PDF document created")

      // Add basic content to verify it works
      doc.setFontSize(22)
      doc.text("AcademiQ Performance Report", 20, 20)

      doc.setFontSize(14)
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30)

      // Get some basic data
      const students = dbService.getUsersByRole("student")
      const results = dbService.getPublishedResults()

      doc.setFontSize(12)
      doc.text(`Total Students: ${students.length}`, 20, 50)
      doc.text(`Total Results: ${results.length}`, 20, 60)

      // Calculate average score
      const totalPercentage = results.reduce((sum, result) => sum + result.percentage, 0)
      const averageScore = (totalPercentage / (results.length || 1)).toFixed(2)
      doc.text(`Average Score: ${averageScore}%`, 20, 70)

      // Add a simple table without using autotable
      doc.setFontSize(16)
      doc.text("Top 5 Students", 20, 90)

      // Get top 5 students with highest average scores
      const studentAverages = students.map((student) => {
        const studentResults = results.filter((result) => result.studentId === student.id)
        if (studentResults.length === 0) return { student, average: 0 }

        const total = studentResults.reduce((sum, result) => sum + result.percentage, 0)
        const average = total / studentResults.length
        return { student, average }
      })

      const topPerformers = studentAverages.sort((a, b) => b.average - a.average).slice(0, 5)

      // Draw table headers
      doc.setFillColor(0, 0, 128)
      doc.setTextColor(255, 255, 255)
      doc.rect(20, 95, 170, 10, "F")
      doc.text("ID", 25, 102)
      doc.text("Name", 60, 102)
      doc.text("Average", 150, 102)

      // Draw table rows
      doc.setTextColor(0, 0, 0)
      topPerformers.forEach(({ student, average }, index) => {
        const y = 110 + index * 10
        doc.text(student.id, 25, y)
        doc.text(student.name, 60, y)
        doc.text(`${average.toFixed(2)}%`, 150, y)
      })

      console.log("Content added to PDF")

      // Save the PDF
      const filename = `AcademiQ_Report_${new Date().toISOString().split("T")[0]}.pdf`
      console.log(`Saving PDF as ${filename}`)
      doc.save(filename)

      console.log("PDF generated successfully")
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
          Download Report
        </>
      )}
    </Button>
  )
}
