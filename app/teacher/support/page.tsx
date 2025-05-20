"use client"

import { useState } from "react"
import { TeacherLayout } from "@/components/teacher-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileText, MessageSquare, Phone, Search, Video } from "lucide-react"

export default function TeacherSupportPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for FAQs
  const faqs = [
    {
      id: 1,
      question: "How do I upload student results?",
      answer:
        "To upload student results, navigate to the Results section from your dashboard, then click on 'Upload Results'. You can upload results via CSV file or enter them manually. Make sure to select the correct class and assessment type before uploading.",
    },
    {
      id: 2,
      question: "How can I edit a student's result after publishing?",
      answer:
        "To edit a published result, go to the Results section, find the specific result set, and click on 'View Details'. From there, you can select the student whose result you want to edit and make the necessary changes. Don't forget to save your changes and republish if needed.",
    },
    {
      id: 3,
      question: "How do I add a new student to my class?",
      answer:
        "New students are typically added by the administration. However, if you need to add a student to your class, please contact the admin through the support ticket system. Provide the student's full name, ID, and the class they need to be added to.",
    },
    {
      id: 4,
      question: "How can I schedule a new class or change my existing schedule?",
      answer:
        "Schedule changes need to be processed by the administration. Please submit a support ticket with your requested changes, including the class name, current schedule (if applicable), and your preferred new schedule.",
    },
    {
      id: 5,
      question: "How do I generate reports for my classes?",
      answer:
        "To generate a class report, go to the Classes section, select the class you want to report on, and click on 'Class Report'. You can customize the report parameters and export it in various formats including PDF and Excel.",
    },
    {
      id: 6,
      question: "What should I do if a student reports an issue with viewing their results?",
      answer:
        "If a student reports issues viewing their results, first verify that the results have been published correctly. If the problem persists, check if the student has the correct access permissions. If you can't resolve the issue, submit a support ticket with the student's details and a description of the problem.",
    },
  ]

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Help & Support</h1>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact Support
        </Button>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="guides">User Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQs..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about using AcademiQ</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq) => (
                    <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-10 text-muted-foreground">No FAQs found matching your search</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Guides</CardTitle>
              <CardDescription>Comprehensive guides to help you use AcademiQ effectively</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-muted"></div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Getting Started Guide</CardTitle>
                    <CardDescription>Learn the basics of using AcademiQ as a teacher</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      View Guide
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden">
                  <div className="aspect-video bg-muted"></div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Results Management</CardTitle>
                    <CardDescription>Learn how to upload, manage, and publish student results</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      View Guide
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden">
                  <div className="aspect-video bg-muted"></div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Class Management</CardTitle>
                    <CardDescription>Learn how to manage your classes and students</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      View Guide
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden">
                  <div className="aspect-video bg-muted"></div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Generating Reports</CardTitle>
                    <CardDescription>Learn how to create and export various reports</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      View Guide
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden">
                  <div className="aspect-video bg-muted"></div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Schedule Management</CardTitle>
                    <CardDescription>Learn how to view and manage your teaching schedule</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      View Guide
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden">
                  <div className="aspect-video bg-muted"></div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Advanced Features</CardTitle>
                    <CardDescription>Explore advanced features and customizations</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      View Guide
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>Watch step-by-step video guides for common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Video className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Uploading Results Tutorial</CardTitle>
                    <CardDescription>5:32 mins • Learn how to upload and manage student results</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full">
                      Watch Video
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Video className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Generating Reports Tutorial</CardTitle>
                    <CardDescription>4:15 mins • Learn how to create and customize reports</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full">
                      Watch Video
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Submit a Ticket
                    </CardTitle>
                    <CardDescription>Create a support ticket for technical issues</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our support team typically responds within 24 hours on business days.
                    </p>
                    <Button className="w-full">Create Ticket</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Phone className="mr-2 h-5 w-5" />
                      Phone Support
                    </CardTitle>
                    <CardDescription>Speak directly with our support team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Available Monday to Friday, 9:00 AM - 5:00 PM IST
                    </p>
                    <Button variant="outline" className="w-full">
                      +91 1800 123 4567
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Submit Support Request</h3>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Brief description of your issue" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="account">Account Management</SelectItem>
                      <SelectItem value="results">Results Management</SelectItem>
                      <SelectItem value="students">Student Management</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Please provide details about your issue" rows={5} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachment">Attachment (Optional)</Label>
                  <Input id="attachment" type="file" />
                  <p className="text-xs text-muted-foreground">Max file size: 10MB. Supported formats: JPG, PNG, PDF</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Submit Request</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </TeacherLayout>
  )
}
