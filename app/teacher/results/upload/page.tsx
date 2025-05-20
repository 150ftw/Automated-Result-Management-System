"use client"

import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TeacherLayout } from "@/components/teacher-layout"
import { Upload, FileSpreadsheet, FileText, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ResultsUploadPage() {
  const [uploadMethod, setUploadMethod] = useState("file")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedTest, setSelectedTest] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [previewData, setPreviewData] = useState<any[]>([])

  const handleUpload = () => {
    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      setUploadStatus("success")

      // Sample preview data
      setPreviewData([
        { id: "ST001", name: "Aarav Sharma", score: 92, grade: "A+" },
        { id: "ST002", name: "Diya Patel", score: 88, grade: "A" },
        { id: "ST003", name: "Arjun Singh", score: 76, grade: "B+" },
        { id: "ST004", name: "Ananya Gupta", score: 95, grade: "A+" },
        { id: "ST005", name: "Rohan Mehta", score: 82, grade: "A" },
      ])
    }, 2000)
  }

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Upload Results</h1>
        <p className="text-sm text-muted-foreground">Upload and publish student results</p>
      </div>

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload Results</TabsTrigger>
          <TabsTrigger value="history">Upload History</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Method</CardTitle>
              <CardDescription>Choose how you want to upload student results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div
                  className={`flex-1 border rounded-lg p-4 cursor-pointer transition-colors ${uploadMethod === "file" ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                  onClick={() => setUploadMethod("file")}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <FileSpreadsheet className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Upload Spreadsheet</h3>
                      <p className="text-sm text-muted-foreground">Upload Excel or CSV file with student results</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`flex-1 border rounded-lg p-4 cursor-pointer transition-colors ${uploadMethod === "manual" ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                  onClick={() => setUploadMethod("manual")}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Manual Entry</h3>
                      <p className="text-sm text-muted-foreground">Manually enter student results</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Result Details</CardTitle>
              <CardDescription>Provide details about the results you're uploading</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10a">Class 10-A</SelectItem>
                      <SelectItem value="10b">Class 10-B</SelectItem>
                      <SelectItem value="11a">Class 11-A</SelectItem>
                      <SelectItem value="11b">Class 11-B</SelectItem>
                      <SelectItem value="11c">Class 11-C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="test-type">Test Type</Label>
                  <Select value={selectedTest} onValueChange={setSelectedTest}>
                    <SelectTrigger id="test-type">
                      <SelectValue placeholder="Select test type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unit-test">Unit Test</SelectItem>
                      <SelectItem value="mid-term">Mid-Term Exam</SelectItem>
                      <SelectItem value="final">Final Exam</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="test-date">Test Date</Label>
                  <Input type="date" id="test-date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-marks">Maximum Marks</Label>
                  <Input type="number" id="max-marks" placeholder="e.g., 100" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea id="description" placeholder="Add any additional information about this test" />
              </div>

              {uploadMethod === "file" && (
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Upload File</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your file here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">Supported formats: .xlsx, .xls, .csv</p>
                    <Input id="file-upload" type="file" className="hidden" accept=".xlsx,.xls,.csv" />
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Select File
                    </Button>
                  </div>
                </div>
              )}

              {uploadMethod === "manual" && (
                <div className="space-y-2">
                  <Label>Manual Entry</Label>
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-4">Enter student results manually</p>
                    <Button variant="outline">Add Student Results</Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleUpload} disabled={isUploading}>
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
            </CardFooter>
          </Card>

          {uploadStatus === "success" && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Preview</CardTitle>
                <CardDescription>Review the uploaded results before publishing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Upload Successful</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your results have been uploaded successfully. Please review the data before publishing.
                  </AlertDescription>
                </Alert>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.score}</TableCell>
                          <TableCell>{student.grade}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Publish Results</Button>
              </CardFooter>
            </Card>
          )}

          {uploadStatus === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>There was an error uploading your results. Please try again.</AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload History</CardTitle>
              <CardDescription>View your previous result uploads</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Test Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>March 5, 2025</TableCell>
                    <TableCell>Class 10-A</TableCell>
                    <TableCell>Unit Test 3</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Published</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>February 28, 2025</TableCell>
                    <TableCell>Class 11-A</TableCell>
                    <TableCell>Mid-Term Exam</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Published</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>February 25, 2025</TableCell>
                    <TableCell>Class 11-B</TableCell>
                    <TableCell>Quiz 2</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Published</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>February 22, 2025</TableCell>
                    <TableCell>Class 10-B</TableCell>
                    <TableCell>Unit Test 3</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Published</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>February 20, 2025</TableCell>
                    <TableCell>Class 11-C</TableCell>
                    <TableCell>Mid-Term Exam</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Published</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </TeacherLayout>
  )
}
