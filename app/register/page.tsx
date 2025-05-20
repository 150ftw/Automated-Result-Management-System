"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Loader2, CheckCircle, ChevronLeft } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [registrationType, setRegistrationType] = useState("student")
  const [step, setStep] = useState(1)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)

      // Redirect after successful registration
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    }, 1500)
  }

  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setStep(step + 1)
  }

  const handlePreviousStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setStep(step - 1)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 md:left-10 md:top-10">
        <GraduationCap className="h-6 w-6" />
        <span className="text-xl font-bold">AcademiQ</span>
      </Link>

      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Register to access AcademiQ's result management system</CardDescription>
        </CardHeader>

        {success ? (
          <CardContent className="space-y-4 text-center py-10">
            <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Registration Successful!</h3>
            <p className="text-muted-foreground">
              Your account has been created successfully. You will be redirected to the login page shortly.
            </p>
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <Tabs value={registrationType} onValueChange={setRegistrationType} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="teacher">Teacher</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>
              </Tabs>

              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Smith" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.smith@school.edu" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" required />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  {registrationType === "student" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="student-id">Student ID (Optional)</Label>
                        <Input id="student-id" placeholder="e.g., ST-2023-001" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="grade">Grade/Class</Label>
                        <Select defaultValue="grade10">
                          <SelectTrigger id="grade">
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grade9">Grade 9</SelectItem>
                            <SelectItem value="grade10">Grade 10</SelectItem>
                            <SelectItem value="grade11">Grade 11</SelectItem>
                            <SelectItem value="grade12">Grade 12</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="section">Section</Label>
                        <Select defaultValue="a">
                          <SelectTrigger id="section">
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="a">A</SelectItem>
                            <SelectItem value="b">B</SelectItem>
                            <SelectItem value="c">C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <RadioGroup defaultValue="male" className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </>
                  )}

                  {registrationType === "teacher" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="teacher-id">Teacher ID (Optional)</Label>
                        <Input id="teacher-id" placeholder="e.g., TCH-2023-001" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select defaultValue="mathematics">
                          <SelectTrigger id="department">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                            <SelectItem value="geography">Geography</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="designation">Designation</Label>
                        <Select defaultValue="teacher">
                          <SelectTrigger id="designation">
                            <SelectValue placeholder="Select designation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="teacher">Teacher</SelectItem>
                            <SelectItem value="seniorTeacher">Senior Teacher</SelectItem>
                            <SelectItem value="hod">Head of Department</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {registrationType === "admin" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="admin-id">Admin ID (Optional)</Label>
                        <Input id="admin-id" placeholder="e.g., ADM-2023-001" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Administrative Role</Label>
                        <Select defaultValue="resultManager">
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="resultManager">Result Manager</SelectItem>
                            <SelectItem value="systemAdmin">System Administrator</SelectItem>
                            <SelectItem value="dataAnalyst">Data Analyst</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="access-code">Administrative Access Code</Label>
                        <Input id="access-code" type="password" required />
                        <p className="text-xs text-muted-foreground">
                          Please enter the access code provided by your institution
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              {step === 1 && (
                <Button type="button" className="w-full" onClick={handleNextStep}>
                  Next
                </Button>
              )}

              {step === 2 && (
                <div className="flex w-full gap-2">
                  <Button type="button" variant="outline" className="flex-1" onClick={handlePreviousStep}>
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      "Register"
                    )}
                  </Button>
                </div>
              )}

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}
