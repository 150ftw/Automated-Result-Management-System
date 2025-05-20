"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { FileUploader } from "@/components/file-uploader"
import { Loader2, Upload, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ResultsUploadPage() {
  const [uploadMethod, setUploadMethod] = useState("file")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      setUploadSuccess(true)
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
            <h1 className="text-lg font-semibold md:text-2xl">Upload Results</h1>
            <Button variant="outline" asChild>
              <Link href="/results">View All Results</Link>
            </Button>
          </div>

          {uploadSuccess ? (
            <Alert className="bg-green-50 border-green-200 text-green-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-green-600"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your results have been uploaded successfully. They are now pending approval before publication.
              </AlertDescription>
              <div className="mt-4">
                <Button variant="outline" className="mr-2" onClick={() => setUploadSuccess(false)}>
                  Upload More
                </Button>
                <Button asChild>
                  <Link href="/results">View Results</Link>
                </Button>
              </div>
            </Alert>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Upload Student Results</CardTitle>
                <CardDescription>
                  Upload results for a class or individual students. Supported formats: CSV, Excel, or manual entry.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={uploadMethod} onValueChange={setUploadMethod} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="file">File Upload</TabsTrigger>
                    <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                  </TabsList>
                  <TabsContent value="file" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="program">Program</Label>
                          <Select defaultValue="btech">
                            <SelectTrigger id="program">
                              <SelectValue placeholder="Select program" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="btech">BTech</SelectItem>
                              <SelectItem value="bca">BCA</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Select defaultValue="dsa">
                            <SelectTrigger id="subject">
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dsa">Data Structures & Algorithms</SelectItem>
                              <SelectItem value="cn">Computer Networks</SelectItem>
                              <SelectItem value="dbms">Database Management Systems</SelectItem>
                              <SelectItem value="os">Operating Systems</SelectItem>
                              <SelectItem value="se">Software Engineering</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="semester">Semester</Label>
                        <Select defaultValue="sem1">
                          <SelectTrigger id="semester">
                            <SelectValue placeholder="Select semester" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sem1">Semester 1</SelectItem>
                            <SelectItem value="sem2">Semester 2</SelectItem>
                            <SelectItem value="sem3">Semester 3</SelectItem>
                            <SelectItem value="sem4">Semester 4</SelectItem>
                            <SelectItem value="sem5">Semester 5</SelectItem>
                            <SelectItem value="sem6">Semester 6</SelectItem>
                            <SelectItem value="sem7">Semester 7</SelectItem>
                            <SelectItem value="sem8">Semester 8</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="term">Term</Label>
                        <Select defaultValue="midterm">
                          <SelectTrigger id="term">
                            <SelectValue placeholder="Select term" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="midterm">Mid Term</SelectItem>
                            <SelectItem value="endterm">End Term</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Upload File</Label>
                        <FileUploader />
                      </div>
                      <Alert variant="outline" className="bg-muted/50">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Important</AlertTitle>
                        <AlertDescription>
                          Please ensure your file follows the required template format.
                          <Link href="/templates" className="ml-1 text-primary underline-offset-4 hover:underline">
                            Download template
                          </Link>
                        </AlertDescription>
                      </Alert>
                    </div>
                  </TabsContent>
                  <TabsContent value="manual" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="program-manual">Program</Label>
                          <Select defaultValue="btech">
                            <SelectTrigger id="program-manual">
                              <SelectValue placeholder="Select program" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="btech">BTech</SelectItem>
                              <SelectItem value="bca">BCA</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="semester-manual">Semester</Label>
                          <Select defaultValue="sem3">
                            <SelectTrigger id="semester-manual">
                              <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sem1">Semester 1</SelectItem>
                              <SelectItem value="sem2">Semester 2</SelectItem>
                              <SelectItem value="sem3">Semester 3</SelectItem>
                              <SelectItem value="sem4">Semester 4</SelectItem>
                              <SelectItem value="sem5">Semester 5</SelectItem>
                              <SelectItem value="sem6">Semester 6</SelectItem>
                              <SelectItem value="sem7">Semester 7</SelectItem>
                              <SelectItem value="sem8">Semester 8</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject-manual">Subject</Label>
                        <Select defaultValue="dsa">
                          <SelectTrigger id="subject-manual">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dsa">Data Structures & Algorithms</SelectItem>
                            <SelectItem value="cn">Computer Networks</SelectItem>
                            <SelectItem value="dbms">Database Management Systems</SelectItem>
                            <SelectItem value="os">Operating Systems</SelectItem>
                            <SelectItem value="se">Software Engineering</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-id">Student ID</Label>
                        <Input id="student-id" placeholder="Enter student ID" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-name">Student Name</Label>
                        <Input id="student-name" placeholder="Enter student name" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="marks-obtained">Marks Obtained</Label>
                          <Input id="marks-obtained" type="number" placeholder="e.g. 85" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="total-marks">Total Marks</Label>
                          <Input id="total-marks" type="number" placeholder="e.g. 100" defaultValue="100" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="remarks">Remarks (Optional)</Label>
                        <Textarea id="remarks" placeholder="Add any additional comments or remarks" />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
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
          )}
        </main>
      </div>
    </div>
  )
}
