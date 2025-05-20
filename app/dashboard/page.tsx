"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { Overview } from "@/components/overview"
import { RecentResults } from "@/components/recent-results"
import { ReportGenerator } from "@/components/report-generator"
import { SimpleReportGenerator } from "@/components/simple-report-generator"
import {
  BarChart,
  LineChart,
  PieChart,
  Download,
  FileText,
  FileBarChart,
  FilePieChart,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

export default function DashboardPage() {
  const [selectedReport, setSelectedReport] = useState("performance")
  const [selectedPeriod, setSelectedPeriod] = useState("current")

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
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            <div className="flex items-center gap-2">
              <SimpleReportGenerator />
              <Button>Upload Results</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
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
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,248</div>
                    <p className="text-xs text-muted-foreground">+12% from last semester</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Results Published</CardTitle>
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
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">+2 in the last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Score</CardTitle>
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
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">78.2%</div>
                    <p className="text-xs text-muted-foreground">+4.3% from last term</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
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
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M7 7h10" />
                      <path d="M7 12h10" />
                      <path d="M7 17h10" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">6</div>
                    <p className="text-xs text-muted-foreground">Requires your attention</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Results</CardTitle>
                    <CardDescription>Recently published or updated results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentResults />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">Performance Analytics</h2>
                  <p className="text-sm text-muted-foreground">Detailed insights into student performance and trends</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select defaultValue="current">
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Term</SelectItem>
                      <SelectItem value="previous">Previous Term</SelectItem>
                      <SelectItem value="year">Full Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="class10">Class 10</SelectItem>
                      <SelectItem value="class11">Class 11</SelectItem>
                      <SelectItem value="class12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">82.5%</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                      <span className="text-green-500 font-medium">+4.3%</span>
                      <span className="ml-1">from previous term</span>
                    </div>
                    <div className="mt-3">
                      <Progress value={82.5} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">94.2%</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                      <span className="text-green-500 font-medium">+2.1%</span>
                      <span className="ml-1">from previous term</span>
                    </div>
                    <div className="mt-3">
                      <Progress value={94.2} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
                    <Badge className="bg-green-100 text-green-800">O & A+</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">128</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                      <span className="text-green-500 font-medium">+15</span>
                      <span className="ml-1">students above 85%</span>
                    </div>
                    <div className="mt-3">
                      <Progress value={10.3} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">10.3% of total students</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">At Risk</CardTitle>
                    <Badge className="bg-red-100 text-red-800">F & P</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                      <span className="text-red-500 font-medium">-8</span>
                      <span className="ml-1">students below 45%</span>
                    </div>
                    <div className="mt-3">
                      <Progress value={3.4} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">3.4% of total students</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Grade Distribution</CardTitle>
                    <CardDescription>Breakdown of grades across all subjects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-green-500"></div>
                          <span>O (Outstanding)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">5%</span>
                          <Progress value={5} className="h-2 w-20" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-emerald-500"></div>
                          <span>A+</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">15%</span>
                          <Progress value={15} className="h-2 w-20" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                          <span>A</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">25%</span>
                          <Progress value={25} className="h-2 w-20" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-cyan-500"></div>
                          <span>B+</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">20%</span>
                          <Progress value={20} className="h-2 w-20" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                          <span>B</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">18%</span>
                          <Progress value={18} className="h-2 w-20" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-orange-500"></div>
                          <span>C</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">12%</span>
                          <Progress value={12} className="h-2 w-20" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-red-400"></div>
                          <span>P (Pass)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">3%</span>
                          <Progress value={3} className="h-2 w-20" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-red-600"></div>
                          <span>F (Fail)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">2%</span>
                          <Progress value={2} className="h-2 w-20" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Subject Performance</CardTitle>
                    <CardDescription>Average scores by subject</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Mathematics</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">78%</span>
                          <Progress value={78} className="h-2 w-40" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Science</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">82%</span>
                          <Progress value={82} className="h-2 w-40" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>English</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">76%</span>
                          <Progress value={76} className="h-2 w-40" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>History</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">74%</span>
                          <Progress value={74} className="h-2 w-40" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Geography</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">80%</span>
                          <Progress value={80} className="h-2 w-40" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Physics</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">72%</span>
                          <Progress value={72} className="h-2 w-40" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Chemistry</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">75%</span>
                          <Progress value={75} className="h-2 w-40" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Biology</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">79%</span>
                          <Progress value={79} className="h-2 w-40" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>Average scores over the last three terms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/40">
                    <div className="text-center space-y-2">
                      <LineChart className="h-16 w-16 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Performance trend visualization</p>
                      <p className="text-xs text-muted-foreground">Showing steady improvement across all subjects</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Term 1</div>
                      <div className="text-lg font-bold">76.2%</div>
                      <div className="text-xs text-muted-foreground">Average score</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Term 2</div>
                      <div className="text-lg font-bold">78.9%</div>
                      <div className="text-xs text-muted-foreground">Average score</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Term 3</div>
                      <div className="text-lg font-bold">82.5%</div>
                      <div className="text-xs text-muted-foreground">Average score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">Reports</h2>
                  <p className="text-sm text-muted-foreground">Generate and download detailed reports</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={selectedReport} onValueChange={setSelectedReport}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">Performance Report</SelectItem>
                      <SelectItem value="attendance">Attendance Report</SelectItem>
                      <SelectItem value="comparison">Comparison Report</SelectItem>
                      <SelectItem value="progress">Progress Report</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Term</SelectItem>
                      <SelectItem value="previous">Previous Term</SelectItem>
                      <SelectItem value="year">Full Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Performance Report</CardTitle>
                      <FileBarChart className="h-5 w-5 text-blue-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Detailed analysis of student performance across all subjects
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <Badge variant="outline">Most Popular</Badge>
                      <ReportGenerator type="performance" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Attendance Report</CardTitle>
                      <Calendar className="h-5 w-5 text-green-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Attendance statistics and correlation with academic performance
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <Badge variant="outline">Updated Weekly</Badge>
                      <Button size="sm" variant="ghost" className="gap-1">
                        <Download className="h-4 w-4" />
                        <span>Generate</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Comparison Report</CardTitle>
                      <FilePieChart className="h-5 w-5 text-purple-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Compare performance across classes, subjects, or time periods
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <Badge variant="outline">Customizable</Badge>
                      <Button size="sm" variant="ghost" className="gap-1">
                        <Download className="h-4 w-4" />
                        <span>Generate</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Reports generated in the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Generated On</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Generated By</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Term 1 Performance Report</TableCell>
                        <TableCell>Mar 10, 2024</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            Performance
                          </Badge>
                        </TableCell>
                        <TableCell>Rajesh Kumar</TableCell>
                        <TableCell className="text-right">
                          <ReportGenerator type="performance" className="h-8 w-8 p-0" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Class 10 Attendance Report</TableCell>
                        <TableCell>Mar 5, 2024</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Attendance
                          </Badge>
                        </TableCell>
                        <TableCell>Priya Sharma</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Subject Comparison Report</TableCell>
                        <TableCell>Feb 28, 2024</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700">
                            Comparison
                          </Badge>
                        </TableCell>
                        <TableCell>Amit Patel</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Annual Progress Report</TableCell>
                        <TableCell>Feb 15, 2024</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-orange-50 text-orange-700">
                            Progress
                          </Badge>
                        </TableCell>
                        <TableCell>Neha Gupta</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Report Preview</CardTitle>
                  <CardDescription>Preview of the selected report type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] border rounded-md bg-muted/40 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Select a report type to preview</p>
                      <ReportGenerator type={selectedReport as "performance"} className="mt-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
