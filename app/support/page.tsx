"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import {
  GraduationCap,
  Search,
  BookOpen,
  MessageSquare,
  FileText,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Play,
  Mail,
  Phone,
  Globe,
  Clock,
  ArrowRight,
  ExternalLink,
  Download,
  BarChart3,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Support ticket submitted",
        description: "We'll get back to you as soon as possible.",
      })
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
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
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold md:text-2xl">Help & Support</h1>
            <p className="text-sm text-muted-foreground">
              Find answers, learn how to use AcademiQ, and get help when you need it
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for help articles, tutorials, and more..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                <div className="flex flex-col space-y-1.5">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Knowledge Base
                  </CardTitle>
                  <CardDescription>Browse articles and guides</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Find comprehensive articles and step-by-step guides on how to use AcademiQ effectively.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full gap-1">
                  Browse Articles <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                <div className="flex flex-col space-y-1.5">
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    Video Tutorials
                  </CardTitle>
                  <CardDescription>Watch and learn</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Visual learner? Watch our video tutorials to see how to use AcademiQ features in action.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full gap-1">
                  View Tutorials <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                <div className="flex flex-col space-y-1.5">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Contact Support
                  </CardTitle>
                  <CardDescription>Get personalized help</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Need personalized assistance? Contact our support team for help with your specific issues.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full gap-1">
                  Contact Us <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Tabs defaultValue="faq" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
              <TabsTrigger value="status">System Status</TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find answers to common questions about AcademiQ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How do I upload student results?</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>
                            To upload student results, navigate to the Results section from the dashboard and click on
                            "Upload Results". You can upload results in two ways:
                          </p>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              <strong>File Upload:</strong> Upload a CSV or Excel file with student results. Make sure
                              to follow the template format.
                            </li>
                            <li>
                              <strong>Manual Entry:</strong> Enter results manually for individual students.
                            </li>
                          </ol>
                          <p>After uploading, you can review the results before publishing them to students.</p>
                          <div className="mt-2">
                            <Button variant="outline" size="sm" className="gap-1">
                              <FileText className="h-4 w-4" />
                              View Detailed Guide
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>If you've forgotten your password, you can reset it by following these steps:</p>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>Click on "Forgot password?" on the login page</li>
                            <li>Enter your email address</li>
                            <li>Check your email for a password reset link</li>
                            <li>Click the link and follow the instructions to create a new password</li>
                          </ol>
                          <p>
                            If you're already logged in and want to change your password, go to Settings → Account →
                            Change Password.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How do I add a new student to the system?</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>To add a new student to the system:</p>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>Navigate to the Students section from the dashboard</li>
                            <li>Click on "Add Student" button in the top right</li>
                            <li>Fill in the required information in the form</li>
                            <li>Click "Save" to add the student</li>
                          </ol>
                          <p>
                            You can also bulk import students using a CSV file by clicking on "Import Students" instead.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>How do I generate performance reports?</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>To generate performance reports:</p>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>Go to the Analytics section from the dashboard</li>
                            <li>Select the class, subject, and time period for the report</li>
                            <li>Click on "Generate Report"</li>
                            <li>Once generated, you can view, download, or share the report</li>
                          </ol>
                          <p>You can also schedule automated reports to be generated and sent periodically.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>Can I customize the grading system?</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>
                            Yes, AcademiQ allows you to customize the grading system according to your institution's
                            requirements:
                          </p>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>Go to Settings → System → Grading System</li>
                            <li>Choose from predefined grading scales or create your own</li>
                            <li>Define grade boundaries, letter grades, and GPA values</li>
                            <li>Save your customized grading system</li>
                          </ol>
                          <p>You can create multiple grading systems for different classes or subjects if needed.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All FAQs
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="guides" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started Guides</CardTitle>
                  <CardDescription>Step-by-step guides to help you get started with AcademiQ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div className="font-medium">Getting Started with AcademiQ</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Learn the basics of AcademiQ and how to navigate the platform.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge>Beginner</Badge>
                        <Button variant="ghost" size="sm" className="gap-1">
                          Read Guide <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div className="font-medium">Managing Student Results</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Learn how to upload, edit, and publish student results efficiently.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge>Intermediate</Badge>
                        <Button variant="ghost" size="sm" className="gap-1">
                          Read Guide <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <BarChart3 className="h-4 w-4 text-primary" />
                        </div>
                        <div className="font-medium">Analytics & Reporting</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Discover how to use analytics tools to gain insights into student performance.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge>Advanced</Badge>
                        <Button variant="ghost" size="sm" className="gap-1">
                          Read Guide <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div className="font-medium">User Management</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Learn how to manage users, roles, and permissions in AcademiQ.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge>Intermediate</Badge>
                        <Button variant="ghost" size="sm" className="gap-1">
                          Read Guide <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Showing 4 of 12 guides</div>
                  <Button variant="outline">View All Guides</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>Watch step-by-step video tutorials to learn how to use AcademiQ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border overflow-hidden">
                      <div className="aspect-video bg-muted relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-12 w-12 text-muted-foreground opacity-50" />
                        </div>
                        <img
                          src="/placeholder.svg?height=200&width=350"
                          alt="Tutorial thumbnail"
                          className="w-full h-full object-cover opacity-80"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium mb-1">Getting Started with AcademiQ</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          A complete overview of the AcademiQ platform and its features.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">5:32</div>
                          <Button variant="ghost" size="sm">
                            Watch Now
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border overflow-hidden">
                      <div className="aspect-video bg-muted relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-12 w-12 text-muted-foreground opacity-50" />
                        </div>
                        <img
                          src="/placeholder.svg?height=200&width=350"
                          alt="Tutorial thumbnail"
                          className="w-full h-full object-cover opacity-80"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium mb-1">Uploading and Managing Results</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Learn how to upload, edit, and publish student results.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">7:15</div>
                          <Button variant="ghost" size="sm">
                            Watch Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Tutorials
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Downloadable Resources</CardTitle>
                  <CardDescription>Download guides, templates, and other resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">User Manual</div>
                          <div className="text-sm text-muted-foreground">
                            Complete user manual for AcademiQ (PDF, 5.2 MB)
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Results Upload Template</div>
                          <div className="text-sm text-muted-foreground">
                            Excel template for bulk uploading student results (XLSX, 1.8 MB)
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Student Import Template</div>
                          <div className="text-sm text-muted-foreground">
                            CSV template for importing student data (CSV, 0.5 MB)
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get in touch with our support team for personalized assistance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg border p-4 text-center">
                      <div className="mx-auto rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-3">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">Email Support</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Send us an email and we'll get back to you within 24 hours.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        support@academiq.edu
                      </Button>
                    </div>
                    <div className="rounded-lg border p-4 text-center">
                      <div className="mx-auto rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-3">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">Phone Support</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Call us directly for immediate assistance during business hours.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        +1 (555) 123-4567
                      </Button>
                    </div>
                    <div className="rounded-lg border p-4 text-center">
                      <div className="mx-auto rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-3">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">Live Chat</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Chat with our support team in real-time for quick answers.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Start Live Chat
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Submit a Support Ticket</h3>
                    <form onSubmit={handleSubmitTicket} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Your name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Your email address" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="Brief description of your issue" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select defaultValue="technical">
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="account">Account Management</SelectItem>
                            <SelectItem value="billing">Billing & Subscription</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Please describe your issue in detail"
                          className="min-h-[150px]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="attachments">Attachments (Optional)</Label>
                        <Input id="attachments" type="file" multiple />
                        <p className="text-xs text-muted-foreground">
                          You can attach screenshots or relevant files to help us understand your issue better.
                        </p>
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Ticket"}
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support Hours & SLAs</CardTitle>
                  <CardDescription>Our support availability and response time commitments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <h3 className="font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          Support Hours
                        </h3>
                        <div className="rounded-md border p-4">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="font-medium">Monday - Friday:</div>
                            <div>8:00 AM - 8:00 PM EST</div>
                            <div className="font-medium">Saturday:</div>
                            <div>10:00 AM - 4:00 PM EST</div>
                            <div className="font-medium">Sunday:</div>
                            <div>Closed</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          Response Time SLAs
                        </h3>
                        <div className="rounded-md border p-4">
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">Critical Issues:</div>
                              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">2 Hours</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="font-medium">High Priority:</div>
                              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">4 Hours</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="font-medium">Medium Priority:</div>
                              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">8 Hours</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="font-medium">Low Priority:</div>
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">24 Hours</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border p-4 bg-muted/40">
                      <h3 className="font-medium mb-2">Premium Support</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Need faster response times and dedicated support? Upgrade to our Premium Support plan for
                        priority assistance and extended hours.
                      </p>
                      <Button variant="outline" size="sm" className="gap-1">
                        <ExternalLink className="h-4 w-4" />
                        Learn About Premium Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="status" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Current status of AcademiQ services and components</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-2 p-3 rounded-md bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div className="font-medium">All Systems Operational</div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Core Application</div>
                        <div className="text-sm text-muted-foreground">Main application and dashboard</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Operational</Badge>
                    </div>
                    <Progress value={100} className="h-2 bg-muted" />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Database Services</div>
                        <div className="text-sm text-muted-foreground">Data storage and retrieval</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Operational</Badge>
                    </div>
                    <Progress value={100} className="h-2 bg-muted" />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">API Services</div>
                        <div className="text-sm text-muted-foreground">External API endpoints</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Operational</Badge>
                    </div>
                    <Progress value={100} className="h-2 bg-muted" />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Authentication</div>
                        <div className="text-sm text-muted-foreground">Login and user authentication</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Operational</Badge>
                    </div>
                    <Progress value={100} className="h-2 bg-muted" />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">File Storage</div>
                        <div className="text-sm text-muted-foreground">Document and file storage</div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Degraded</Badge>
                    </div>
                    <Progress value={85} className="h-2 bg-muted" />
                    <div className="text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4 inline-block mr-1" />
                      We're experiencing slower than normal upload speeds. Our team is working on it.
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Recent Incidents</h3>
                    <div className="rounded-md border">
                      <div className="p-4 border-b">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium">Scheduled Maintenance</div>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">March 5, 2025 - 2:00 AM to 4:00 AM EST</div>
                        <p className="text-sm">
                          Scheduled database maintenance and system updates. All services have been restored.
                        </p>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium">API Service Disruption</div>
                          <Badge variant="outline">Resolved</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          February 28, 2025 - 10:15 AM to 11:30 AM EST
                        </div>
                        <p className="text-sm">
                          API services experienced intermittent connectivity issues. The issue has been resolved.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border p-4 bg-muted/40">
                    <h3 className="font-medium mb-2">Upcoming Maintenance</h3>
                    <div className="text-sm text-muted-foreground mb-3">
                      <strong>March 15, 2025 - 1:00 AM to 3:00 AM EST</strong>: Scheduled system upgrade to improve
                      performance and add new features. The system may be unavailable during this time.
                    </div>
                    <Button variant="outline" size="sm">
                      View Maintenance Schedule
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Last updated: March 8, 2025 - 6:30 PM EST</div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                    Status Page
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Troubleshooting</CardTitle>
                  <CardDescription>Common issues and how to resolve them</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>I can't log in to my account</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>If you're having trouble logging in, try these steps:</p>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>Make sure you're using the correct email address and password</li>
                            <li>Clear your browser cache and cookies</li>
                            <li>Try using a different browser</li>
                            <li>Reset your password using the "Forgot password?" link</li>
                            <li>Check if your account has been locked due to multiple failed login attempts</li>
                          </ol>
                          <p>If you still can't log in, please contact our support team for assistance.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>The system is running slowly</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>If you're experiencing slow performance, try these steps:</p>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>Check your internet connection speed</li>
                            <li>Clear your browser cache and cookies</li>
                            <li>Close unnecessary browser tabs and applications</li>
                            <li>Try using a different browser</li>
                            <li>Disable browser extensions that might be interfering</li>
                          </ol>
                          <p>
                            If the issue persists, it might be related to our servers. Check the System Status page for
                            any ongoing issues.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>I can't upload files</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>If you're having trouble uploading files, check the following:</p>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>Make sure your file is in a supported format (CSV, Excel, PDF)</li>
                            <li>Check that your file size is under the 10MB limit</li>
                            <li>Ensure you have a stable internet connection</li>
                            <li>Try using a different browser</li>
                            <li>Check if the file storage service is operational on the System Status page</li>
                          </ol>
                          <p>
                            Note: We're currently experiencing degraded performance with our file storage service, which
                            might affect uploads.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Troubleshooting Guides
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
