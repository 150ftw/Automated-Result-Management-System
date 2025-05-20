"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data
const yearData = [
  { name: "Mathematics", "2021-2022": 75, "2022-2023": 78, "2023-2024": 82 },
  { name: "Science", "2021-2022": 72, "2022-2023": 76, "2023-2024": 80 },
  { name: "English", "2021-2022": 68, "2022-2023": 71, "2023-2024": 74 },
  { name: "History", "2021-2022": 70, "2022-2023": 73, "2023-2024": 76 },
  { name: "Geography", "2021-2022": 73, "2022-2023": 77, "2023-2024": 81 },
]

const termData = [
  { name: "Term 1", "2021-2022": 71, "2022-2023": 74, "2023-2024": 79 },
  { name: "Term 2", "2021-2022": 73, "2022-2023": 76, "2023-2024": 81 },
  { name: "Term 3", "2021-2022": 75, "2022-2023": 78, "2023-2024": 83 },
]

const studentProgressData = [
  { name: "Term 1, 2021-22", Average: 68 },
  { name: "Term 2, 2021-22", Average: 72 },
  { name: "Term 3, 2021-22", Average: 75 },
  { name: "Term 1, 2022-23", Average: 73 },
  { name: "Term 2, 2022-23", Average: 78 },
  { name: "Term 3, 2022-23", Average: 81 },
  { name: "Term 1, 2023-24", Average: 79 },
  { name: "Term 2, 2023-24", Average: 84 },
  { name: "Term 3, 2023-24", Average: 89 },
]

const classComparisonData = [
  { name: "Mathematics", Student: 89, ClassAverage: 76 },
  { name: "Science", Student: 92, ClassAverage: 78 },
  { name: "English", Student: 84, ClassAverage: 72 },
  { name: "History", Student: 78, ClassAverage: 70 },
  { name: "Geography", Student: 86, ClassAverage: 74 },
]

export function DashboardStats({ userRole = "admin" }: { userRole?: "admin" | "teacher" | "student" }) {
  const [selectedYear, setSelectedYear] = useState("2023-2024")

  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>
              {userRole === "student"
                ? "Your performance trends over time"
                : userRole === "teacher"
                  ? "Class performance across subjects and terms"
                  : "Institution performance analytics"}
            </CardDescription>
          </div>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2021-2022">2021-2022</SelectItem>
              <SelectItem value="2022-2023">2022-2023</SelectItem>
              <SelectItem value="2023-2024">2023-2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={userRole === "student" ? "progress" : "subjects"} className="space-y-4">
          <TabsList>
            {userRole === "student" && <TabsTrigger value="progress">Progress Trend</TabsTrigger>}
            <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
            <TabsTrigger value="terms">Term Analysis</TabsTrigger>
            {userRole === "student" && <TabsTrigger value="comparison">Class Comparison</TabsTrigger>}
          </TabsList>

          {userRole === "student" && (
            <TabsContent value="progress" className="space-y-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={studentProgressData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
                    <Line type="monotone" dataKey="Average" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Key Insights</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Your performance has increased by 21% since 2021</li>
                    <li>• Largest improvement in Term 3, 2023-24</li>
                    <li>• Consistent upward trend across all terms</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Areas of Improvement</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Continue focus on maintaining grades in Mathematics</li>
                    <li>• Work on improving English scores which are below your average</li>
                    <li>• Maintain the current momentum for upcoming terms</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          )}

          <TabsContent value="subjects" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, "Average Score"]} />
                  <Legend />
                  <Bar dataKey="2021-2022" fill="#8884d8" />
                  <Bar dataKey="2022-2023" fill="#82ca9d" />
                  <Bar dataKey="2023-2024" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Insights</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Consistent improvement across all subjects</li>
                  <li>• Mathematics shows the highest growth at 7% over 3 years</li>
                  <li>• English has the lowest overall average across all years</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Recommendations</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Focus on improving English curriculum and teaching strategies</li>
                  <li>• Continue successful approaches in Mathematics</li>
                  <li>• Analyze Geography teaching methods for best practices</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="terms" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={termData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, "Average Score"]} />
                  <Legend />
                  <Bar dataKey="2021-2022" fill="#8884d8" />
                  <Bar dataKey="2022-2023" fill="#82ca9d" />
                  <Bar dataKey="2023-2024" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Term Patterns</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Consistent improvement in results from Term 1 to Term 3</li>
                  <li>• Term 3 shows the highest performance across all years</li>
                  <li>• Average increase of 4% from Term 1 to Term 3 each year</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Recommendations</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Implement Term 3 strategies earlier in the academic year</li>
                  <li>• Focus on stronger start in Term 1 to improve overall averages</li>
                  <li>• Analyze factors contributing to Term 3 success</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          {userRole === "student" && (
            <TabsContent value="comparison" className="space-y-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
                    <Legend />
                    <Bar dataKey="Student" fill="#8884d8" name="Your Score" />
                    <Bar dataKey="ClassAverage" fill="#82ca9d" name="Class Average" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Your Performance</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Performing above class average in all subjects</li>
                    <li>• Strongest in Science (14% above average)</li>
                    <li>• Smallest gap in History (8% above average)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Room for Growth</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Potential to improve History scores further</li>
                    <li>• Consider peer tutoring to help classmates</li>
                    <li>• Set personal goals to maintain your performance</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
