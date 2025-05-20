"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import {
  GraduationCap,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  PieChart,
  Users,
  BookOpen,
  Award,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Share2,
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Scatter,
  ScatterChart,
  ZAxis,
  AreaChart,
  Area,
} from "recharts"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

// Sample data for analytics
const performanceTrendData = [
  { year: "2021-22 T1", average: 72, passRate: 88 },
  { year: "2021-22 T2", average: 74, passRate: 89 },
  { year: "2021-22 T3", average: 76, passRate: 90 },
  { year: "2022-23 T1", average: 75, passRate: 91 },
  { year: "2022-23 T2", average: 78, passRate: 92 },
  { year: "2022-23 T3", average: 80, passRate: 93 },
  { year: "2023-24 T1", average: 79, passRate: 92 },
  { year: "2023-24 T2", average: 82, passRate: 94 },
  { year: "2023-24 T3", average: 85, passRate: 96 },
]

const subjectPerformanceData = [
  { subject: "Mathematics", average: 78, highest: 98, lowest: 45, classAvg: 72 },
  { subject: "Science", average: 82, highest: 99, lowest: 52, classAvg: 75 },
  { subject: "English", average: 76, highest: 95, lowest: 48, classAvg: 70 },
  { subject: "History", average: 74, highest: 92, lowest: 50, classAvg: 68 },
  { subject: "Geography", average: 80, highest: 96, lowest: 55, classAvg: 73 },
  { subject: "Physics", average: 72, highest: 94, lowest: 42, classAvg: 67 },
]

const gradeDistributionData = [
  { name: "A+", value: 15, color: "#22c55e" },
  { name: "A", value: 20, color: "#4ade80" },
  { name: "B+", value: 25, color: "#60a5fa" },
  { name: "B", value: 18, color: "#93c5fd" },
  { name: "C+", value: 12, color: "#fcd34d" },
  { name: "C", value: 7, color: "#fbbf24" },
  { name: "D", value: 3, color: "#f87171" },
  { name: "F", value: 2, color: "#ef4444" },
]

const attendanceCorrelationData = [
  { attendance: 95, performance: 92, students: 15, subject: "Mathematics" },
  { attendance: 90, performance: 88, students: 22, subject: "Science" },
  { attendance: 85, performance: 82, students: 18, subject: "English" },
  { attendance: 80, performance: 78, students: 25, subject: "History" },
  { attendance: 75, performance: 72, students: 20, subject: "Geography" },
  { attendance: 70, performance: 68, students: 12, subject: "Physics" },
  { attendance: 65, performance: 62, students: 8, subject: "Chemistry" },
  { attendance: 60, performance: 58, students: 5, subject: "Biology" },
]

const skillRadarData = [
  { subject: "Problem Solving", A: 85, B: 70, fullMark: 100 },
  { subject: "Critical Thinking", A: 80, B: 65, fullMark: 100 },
  { subject: "Communication", A: 75, B: 80, fullMark: 100 },
  { subject: "Teamwork", A: 90, B: 85, fullMark: 100 },
  { subject: "Creativity", A: 70, B: 75, fullMark: 100 },
  { subject: "Technical Skills", A: 95, B: 60, fullMark: 100 },
]

const predictiveData = [
  { month: "Jan", actual: 78, predicted: 76 },
  { month: "Feb", actual: 80, predicted: 79 },
  { month: "Mar", actual: 82, predicted: 81 },
  { month: "Apr", actual: 79, predicted: 80 },
  { month: "May", actual: 84, predicted: 83 },
  { month: "Jun", actual: 86, predicted: 85 },
  { month: "Jul", actual: null, predicted: 87 },
  { month: "Aug", actual: null, predicted: 88 },
  { month: "Sep", actual: null, predicted: 86 },
]

const improvementOpportunityData = [
  { name: "Mathematics", value: 15, fill: "#8884d8" },
  { name: "Science", value: 8, fill: "#83a6ed" },
  { name: "English", value: 25, fill: "#8dd1e1" },
  { name: "History", value: 18, fill: "#82ca9d" },
  { name: "Geography", value: 12, fill: "#a4de6c" },
]

const classComparisonData = [
  { name: "Grade 9", average: 76, passRate: 92 },
  { name: "Grade 10", average: 78, passRate: 94 },
  { name: "Grade 11", average: 82, passRate: 95 },
  { name: "Grade 12", average: 85, passRate: 97 },
]

const timeOfDayData = [
  { time: "8-10 AM", performance: 85 },
  { time: "10-12 PM", performance: 82 },
  { time: "12-2 PM", performance: 75 },
  { time: "2-4 PM", performance: 78 },
  { time: "4-6 PM", performance: 80 },
]

export default function AnalyticsPage() {
  const [selectedYear, setSelectedYear] = useState("2023-2024")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Simulate loading data
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [selectedYear, selectedClass, selectedSubject])

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold md:text-2xl">Analytics Dashboard</h1>
              <p className="text-sm text-muted-foreground">Comprehensive insights and performance metrics</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-1">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Date Range</span>
              </Button>
              <Button variant="outline" className="gap-1">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button className="gap-1">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
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
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-medium">+15</span>
                  <span className="ml-1">students above 90%</span>
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
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                  <span className="text-red-500 font-medium">-8</span>
                  <span className="ml-1">students below 50%</span>
                </div>
                <div className="mt-3">
                  <Progress value={3.4} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">3.4% of total students</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Performance Trends</CardTitle>
                      <CardDescription>Average scores and pass rates over time</CardDescription>
                    </div>
                    <Select defaultValue={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2021-2022">2021-2022</SelectItem>
                        <SelectItem value="2022-2023">2022-2023</SelectItem>
                        <SelectItem value="2023-2024">2023-2024</SelectItem>
                        <SelectItem value="all">All Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis yAxisId="left" domain={[0, 100]} />
                        <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                        <Tooltip formatter={(value) => [`${value}%`, ""]} />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="average"
                          stroke="#8884d8"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                          name="Average Score (%)"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="passRate"
                          stroke="#82ca9d"
                          strokeWidth={2}
                          name="Pass Rate (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Current Term Average</span>
                        <span className="text-sm font-bold">85%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Previous Term</span>
                        <span>82%</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Current Pass Rate</span>
                        <span className="text-sm font-bold">96%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Previous Term</span>
                        <span>94%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="h-full">
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Overall grade breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={gradeDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {gradeDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} students`, ""]} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Students with A or higher</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">35%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Students below C</span>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">5%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="subjects" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 md:w-auto">
              <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
              <TabsTrigger value="attendance">Attendance Impact</TabsTrigger>
              <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
              <TabsTrigger value="insights">Key Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="subjects" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">Subject Performance Analysis</h2>
                  <p className="text-sm text-muted-foreground">
                    Detailed breakdown of performance across different subjects
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select defaultValue={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="grade9">Grade 9</SelectItem>
                      <SelectItem value="grade10">Grade 10</SelectItem>
                      <SelectItem value="grade11">Grade 11</SelectItem>
                      <SelectItem value="grade12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="geography">Geography</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Subject Comparison</CardTitle>
                    <CardDescription>Average scores across subjects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={subjectPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="subject" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip formatter={(value) => [`${value}%`, ""]} />
                          <Legend />
                          <Bar dataKey="average" name="Student Average" fill="#8884d8" />
                          <Bar dataKey="classAvg" name="Class Average" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Range</CardTitle>
                    <CardDescription>Highest, average, and lowest scores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={subjectPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="subject" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip formatter={(value) => [`${value}%`, ""]} />
                          <Legend />
                          <Bar dataKey="highest" name="Highest Score" fill="#4ade80" />
                          <Bar dataKey="average" name="Average Score" fill="#60a5fa" />
                          <Bar dataKey="lowest" name="Lowest Score" fill="#f87171" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Subject Skill Analysis</CardTitle>
                  <CardDescription>Comparison of skills across different subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRadarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="This Year" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Radar name="Previous Year" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                        <Legend />
                        <Tooltip formatter={(value) => [`${value}%`, ""]} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Most Improved Skill</div>
                      <div className="text-lg font-bold">Technical Skills</div>
                      <div className="text-xs text-muted-foreground">+35% improvement</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Highest Rated Skill</div>
                      <div className="text-lg font-bold">Teamwork</div>
                      <div className="text-xs text-muted-foreground">90% proficiency</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Area for Development</div>
                      <div className="text-lg font-bold">Creativity</div>
                      <div className="text-xs text-muted-foreground">70% proficiency</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">Attendance & Performance Correlation</h2>
                <p className="text-sm text-muted-foreground">Analysis of how attendance impacts academic performance</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Attendance vs. Performance</CardTitle>
                    <CardDescription>Correlation between attendance and academic scores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                          <CartesianGrid />
                          <XAxis type="number" dataKey="attendance" name="Attendance" unit="%" domain={[50, 100]} />
                          <YAxis type="number" dataKey="performance" name="Performance" unit="%" domain={[50, 100]} />
                          <ZAxis type="number" dataKey="students" range={[50, 400]} name="Students" />
                          <Tooltip
                            cursor={{ strokeDasharray: "3 3" }}
                            formatter={(value, name) => {
                              if (name === "Students") return [`${value} students`, name]
                              return [`${value}%`, name]
                            }}
                          />
                          <Legend />
                          <Scatter name="Subjects" data={attendanceCorrelationData} fill="#8884d8" shape="circle" />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Correlation Coefficient</span>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">0.87</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Strong positive correlation between attendance and academic performance
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Time of Day Impact</CardTitle>
                    <CardDescription>Performance variation by time of day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timeOfDayData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis domain={[50, 100]} />
                          <Tooltip formatter={(value) => [`${value}%`, "Performance"]} />
                          <Area
                            type="monotone"
                            dataKey="performance"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                            name="Performance Score"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Peak Performance Time</span>
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">8-10 AM</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Morning classes show 7% higher performance than afternoon sessions
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Attendance Patterns</CardTitle>
                  <CardDescription>Monthly attendance trends and impact on performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: "Jan", attendance: 92, performance: 85 },
                          { month: "Feb", attendance: 90, performance: 83 },
                          { month: "Mar", attendance: 88, performance: 82 },
                          { month: "Apr", attendance: 85, performance: 80 },
                          { month: "May", attendance: 82, performance: 78 },
                          { month: "Jun", attendance: 80, performance: 75 },
                          { month: "Jul", attendance: 78, performance: 74 },
                          { month: "Aug", attendance: 85, performance: 79 },
                          { month: "Sep", attendance: 88, performance: 81 },
                          { month: "Oct", attendance: 90, performance: 84 },
                          { month: "Nov", attendance: 92, performance: 86 },
                          { month: "Dec", attendance: 88, performance: 82 },
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[50, 100]} />
                        <Tooltip formatter={(value) => [`${value}%`, ""]} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="attendance"
                          stroke="#8884d8"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                          name="Attendance Rate"
                        />
                        <Line
                          type="monotone"
                          dataKey="performance"
                          stroke="#82ca9d"
                          strokeWidth={2}
                          name="Performance Score"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Highest Attendance</div>
                      <div className="text-lg font-bold">January & November</div>
                      <div className="text-xs text-muted-foreground">92% attendance rate</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Lowest Attendance</div>
                      <div className="text-lg font-bold">July</div>
                      <div className="text-xs text-muted-foreground">78% attendance rate</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Performance Gap</div>
                      <div className="text-lg font-bold">12%</div>
                      <div className="text-xs text-muted-foreground">Between highest and lowest attendance months</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="predictive" className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">Predictive Analytics</h2>
                <p className="text-sm text-muted-foreground">AI-powered predictions and future performance forecasts</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Forecast</CardTitle>
                    <CardDescription>Predicted vs. actual performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={predictiveData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[70, 90]} />
                          <Tooltip formatter={(value) => (value ? [`${value}%`, ""] : ["N/A", ""])} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="actual"
                            stroke="#8884d8"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                            name="Actual Score"
                          />
                          <Line
                            type="monotone"
                            dataKey="predicted"
                            stroke="#82ca9d"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="Predicted Score"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Prediction Accuracy</span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">98.7%</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Based on historical data and machine learning algorithms
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>At-Risk Students</CardTitle>
                    <CardDescription>Predicted performance challenges</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={improvementOpportunityData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {improvementOpportunityData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} students`, ""]} />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Highest Risk Subject</span>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">English</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        25 students predicted to need additional support in English
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Class Comparison & Projections</CardTitle>
                  <CardDescription>Performance analysis across different classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={classComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[50, 100]} />
                        <Tooltip formatter={(value) => [`${value}%`, ""]} />
                        <Legend />
                        <Bar dataKey="average" name="Average Score" fill="#8884d8" />
                        <Bar dataKey="passRate" name="Pass Rate" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Highest Performing Class</div>
                      <div className="text-lg font-bold">Grade 12</div>
                      <div className="text-xs text-muted-foreground">85% average, 97% pass rate</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Most Improved</div>
                      <div className="text-lg font-bold">Grade 11</div>
                      <div className="text-xs text-muted-foreground">+4.5% from previous year</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Projected Top Class</div>
                      <div className="text-lg font-bold">Grade 10</div>
                      <div className="text-xs text-muted-foreground">Expected to improve by 6.2% next term</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">Key Insights & Recommendations</h2>
                <p className="text-sm text-muted-foreground">AI-generated insights and actionable recommendations</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="md:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      Key Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-3 bg-muted/40">
                        <div className="font-medium">Performance Trends</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Overall performance has increased by 4.3% compared to the previous term, with the highest
                          improvement in Mathematics (6.2%).
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 bg-muted/40">
                        <div className="font-medium">Attendance Impact</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Students with 90%+ attendance show 15% higher performance than those with attendance below
                          80%.
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 bg-muted/40">
                        <div className="font-medium">Subject Analysis</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Science has the highest average score (82%), while English shows the most room for improvement
                          (76%).
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 bg-muted/40">
                        <div className="font-medium">At-Risk Students</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          42 students (3.4%) are at risk of failing, with English being the most challenging subject.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-lg border p-4 bg-muted/40">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-blue-100 p-1.5">
                              <BookOpen className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="font-medium">English Support Program</div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Implement targeted support for the 25 students struggling with English. Consider peer
                            tutoring and additional resources.
                          </p>
                          <div className="mt-3">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Button variant="outline" size="sm" className="text-xs">
                                  View Details
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80">
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">English Support Program</h4>
                                  <p className="text-xs text-muted-foreground">
                                    Our AI analysis suggests implementing a 6-week intensive program focusing on reading
                                    comprehension and writing skills. This could improve performance by an estimated
                                    12-15%.
                                  </p>
                                  <div className="flex items-center pt-2">
                                    <span className="text-xs font-medium">Estimated Impact:</span>
                                    <Badge className="ml-2 bg-green-100 text-green-800">High</Badge>
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4 bg-muted/40">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-green-100 p-1.5">
                              <Users className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="font-medium">Attendance Improvement</div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Focus on improving attendance in July and August, which show the lowest rates. Consider
                            incentive programs and parent engagement.
                          </p>
                          <div className="mt-3">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Button variant="outline" size="sm" className="text-xs">
                                  View Details
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80">
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">Attendance Strategy</h4>
                                  <p className="text-xs text-muted-foreground">
                                    Implementing an attendance reward system could increase attendance by 5-8% in low
                                    months. Each 5% increase in attendance correlates to a 3-4% improvement in academic
                                    performance.
                                  </p>
                                  <div className="flex items-center pt-2">
                                    <span className="text-xs font-medium">Estimated Impact:</span>
                                    <Badge className="ml-2 bg-green-100 text-green-800">High</Badge>
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4 bg-muted/40">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-purple-100 p-1.5">
                              <Award className="h-4 w-4 text-purple-600" />
                            </div>
                            <div className="font-medium">Morning Class Optimization</div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Schedule challenging subjects in the 8-10 AM slot when performance is highest. Reserve
                            afternoon slots for interactive activities.
                          </p>
                          <div className="mt-3">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Button variant="outline" size="sm" className="text-xs">
                                  View Details
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80">
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">Schedule Optimization</h4>
                                  <p className="text-xs text-muted-foreground">
                                    Data shows a 7% performance difference between morning and afternoon classes.
                                    Prioritizing Mathematics and English in morning slots could yield a 3-5% improvement
                                    in these subjects.
                                  </p>
                                  <div className="flex items-center pt-2">
                                    <span className="text-xs font-medium">Estimated Impact:</span>
                                    <Badge className="ml-2 bg-blue-100 text-blue-800">Medium</Badge>
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4 bg-muted/40">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-orange-100 p-1.5">
                              <Share2 className="h-4 w-4 text-orange-600" />
                            </div>
                            <div className="font-medium">Cross-Grade Mentoring</div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Establish a mentoring program pairing Grade 12 students with those in Grade 9 to improve
                            performance in lower grades.
                          </p>
                          <div className="mt-3">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Button variant="outline" size="sm" className="text-xs">
                                  View Details
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80">
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">Peer Mentoring Program</h4>
                                  <p className="text-xs text-muted-foreground">
                                    Similar programs have shown a 10-15% improvement in academic performance for
                                    mentored students, while also reinforcing knowledge for mentors.
                                  </p>
                                  <div className="flex items-center pt-2">
                                    <span className="text-xs font-medium">Estimated Impact:</span>
                                    <Badge className="ml-2 bg-blue-100 text-blue-800">Medium</Badge>
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4 bg-blue-50 dark:bg-blue-950/30">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-1.5">
                            <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="font-medium text-lg">AI-Powered Recommendation</div>
                        </div>
                        <p className="text-sm mt-2">
                          Based on our predictive models, implementing a combined approach of attendance incentives and
                          targeted English support could result in a{" "}
                          <span className="font-bold">7.5% overall performance improvement</span> by the end of the next
                          term.
                        </p>
                        <div className="mt-4 flex justify-end">
                          <Button className="gap-1">
                            <Share2 className="h-4 w-4" />
                            Generate Action Plan
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
