"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Upload, AlertCircle, FileSpreadsheet, X, FileText, Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { uploadResultsFile, addResult } from "@/app/actions/results"
import { Progress } from "@/components/ui/progress"

export function ResultsUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadMethod, setUploadMethod] = useState("file")
  const [formState, setFormState] = useState({
    class: "",
    subject: "",
    term: "",
    studentId: "",
    studentName: "",
    score: "",
    totalMarks: "100",
    remarks: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setUploadError(null)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]

      // Check if the file is .csv, .xlsx or .xls
      if (!droppedFile.name.match(/\.(csv|xlsx|xls)$/)) {
        setUploadError("Unsupported file format. Please upload a CSV or Excel file.")
        return
      }

      setFile(droppedFile)
      setUploadError(null)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setUploadError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUploadFile = async () => {
    if (!file) {
      setUploadError("Please select a file to upload")
      return
    }

    if (!formState.class || !formState.subject || !formState.term) {
      setUploadError("Please fill in all required fields")
      return
    }

    setIsUploading(true)
    setUploadProgress(10)
    setUploadError(null)

    try {
      // Create form data
      const formData = new FormData()
      formData.append("file", file)
      formData.append("class", formState.class)
      formData.append("subject", formState.subject)
      formData.append("term", formState.term)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      // Upload the file
      const result = await uploadResultsFile(formData)

      clearInterval(progressInterval)

      if (result.error) {
        setUploadError(result.error)
        setUploadProgress(0)
      } else {
        setUploadProgress(100)
        setUploadSuccess(true)
      }
    } catch (error) {
      console.error("Upload error:", error)
      setUploadError("An error occurred while uploading the file")
      setUploadProgress(0)
    } finally {
      setIsUploading(false)
    }
  }

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formState.class ||
      !formState.subject ||
      !formState.term ||
      !formState.studentId ||
      !formState.studentName ||
      !formState.score
    ) {
      setUploadError("Please fill in all required fields")
      return
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      // Create form data
      const formData = new FormData()
      formData.append("studentId", formState.studentId)
      formData.append("studentName", formState.studentName)
      formData.append("class", formState.class)
      formData.append("subject", formState.subject)
      formData.append("score", formState.score)
      formData.append("totalMarks", formState.totalMarks)
      formData.append("term", formState.term)
      formData.append("remarks", formState.remarks)

      // Add the result
      const result = await addResult(formData)

      if (result.error) {
        setUploadError(result.error)
      } else {
        setUploadSuccess(true)
        // Reset form fields except class, subject and term
        setFormState({
          ...formState,
          studentId: "",
          studentName: "",
          score: "",
          totalMarks: "100",
          remarks: "",
        })
      }
    } catch (error) {
      console.error("Upload error:", error)
      setUploadError("An error occurred while adding the result")
    } finally {
      setIsUploading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }))
    setUploadError(null)
  }

  const handleReset = () => {
    setUploadSuccess(false)
    setUploadError(null)
    setFile(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-6">
      {uploadSuccess ? (
        <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400">
          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            {uploadMethod === "file"
              ? "Your results have been uploaded successfully. They are now pending approval before publication."
              : "Result has been added successfully. It is now pending approval before publication."}
          </AlertDescription>
          <div className="mt-4">
            <Button variant="outline" className="mr-2" onClick={handleReset}>
              Upload More
            </Button>
            <Button asChild>
              <a href="/results">View Results</a>
            </Button>
          </div>
        </Alert>
      ) : (
        <Tabs value={uploadMethod} onValueChange={setUploadMethod} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">File Upload</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class" className="required">
                    Class/Grade
                  </Label>
                  <Select value={formState.class} onValueChange={(value) => handleInputChange("class", value)}>
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade 9">Grade 9</SelectItem>
                      <SelectItem value="Grade 10">Grade 10</SelectItem>
                      <SelectItem value="Grade 11">Grade 11</SelectItem>
                      <SelectItem value="Grade 12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="required">
                    Subject
                  </Label>
                  <Select value={formState.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Geography">Geography</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="term" className="required">
                  Term/Semester
                </Label>
                <Select value={formState.term} onValueChange={(value) => handleInputChange("term", value)}>
                  <SelectTrigger id="term">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Term 1">Term 1</SelectItem>
                    <SelectItem value="Term 2">Term 2</SelectItem>
                    <SelectItem value="Term 3">Term 3</SelectItem>
                    <SelectItem value="Semester 1">Semester 1</SelectItem>
                    <SelectItem value="Semester 2">Semester 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="required">Upload File</Label>
                <div>
                  {!file ? (
                    <div
                      className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary/50 transition-colors"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="rounded-full bg-primary/10 p-3">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">Drag and drop your file here or click to browse</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Supported formats: CSV, Excel (.xlsx, .xls)
                        </p>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".csv,.xlsx,.xls"
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          {file.name.endsWith(".csv") ? (
                            <FileText className="h-5 w-5 text-primary" />
                          ) : (
                            <FileSpreadsheet className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveFile()
                        }}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove file</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {uploadError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{uploadError}</AlertDescription>
                </Alert>
              )}

              <Alert variant="outline" className="bg-muted/50">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Please ensure your file follows the required template format.
                  <a
                    href="/templates/result-template.xlsx"
                    className="ml-1 text-primary underline-offset-4 hover:underline"
                  >
                    Download template
                  </a>
                </AlertDescription>
              </Alert>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" disabled={isUploading}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleUploadFile} disabled={isUploading || !file}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Results
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4 pt-4">
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class-manual" className="required">
                    Class/Grade
                  </Label>
                  <Select value={formState.class} onValueChange={(value) => handleInputChange("class", value)}>
                    <SelectTrigger id="class-manual">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade 9">Grade 9</SelectItem>
                      <SelectItem value="Grade 10">Grade 10</SelectItem>
                      <SelectItem value="Grade 11">Grade 11</SelectItem>
                      <SelectItem value="Grade 12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject-manual" className="required">
                    Subject
                  </Label>
                  <Select value={formState.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger id="subject-manual">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Geography">Geography</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="term-manual" className="required">
                  Term/Semester
                </Label>
                <Select value={formState.term} onValueChange={(value) => handleInputChange("term", value)}>
                  <SelectTrigger id="term-manual">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Term 1">Term 1</SelectItem>
                    <SelectItem value="Term 2">Term 2</SelectItem>
                    <SelectItem value="Term 3">Term 3</SelectItem>
                    <SelectItem value="Semester 1">Semester 1</SelectItem>
                    <SelectItem value="Semester 2">Semester 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-id" className="required">
                  Student ID
                </Label>
                <Input
                  id="student-id"
                  placeholder="Enter student ID"
                  value={formState.studentId}
                  onChange={(e) => handleInputChange("studentId", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-name" className="required">
                  Student Name
                </Label>
                <Input
                  id="student-name"
                  placeholder="Enter student name"
                  value={formState.studentName}
                  onChange={(e) => handleInputChange("studentName", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marks-obtained" className="required">
                    Marks Obtained
                  </Label>
                  <Input
                    id="marks-obtained"
                    type="number"
                    placeholder="e.g. 85"
                    value={formState.score}
                    onChange={(e) => handleInputChange("score", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total-marks">Total Marks</Label>
                  <Input
                    id="total-marks"
                    type="number"
                    placeholder="e.g. 100"
                    value={formState.totalMarks}
                    onChange={(e) => handleInputChange("totalMarks", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks (Optional)</Label>
                <textarea
                  id="remarks"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Add any additional comments or remarks"
                  value={formState.remarks}
                  onChange={(e) => handleInputChange("remarks", e.target.value)}
                />
              </div>

              {uploadError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{uploadError}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" disabled={isUploading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Result"
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
