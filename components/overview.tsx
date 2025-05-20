"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Mathematics",
    average: 78,
    highest: 95,
    lowest: 45,
  },
  {
    name: "Science",
    average: 82,
    highest: 98,
    lowest: 52,
  },
  {
    name: "English",
    average: 76,
    highest: 92,
    lowest: 48,
  },
  {
    name: "History",
    average: 74,
    highest: 88,
    lowest: 50,
  },
  {
    name: "Geography",
    average: 80,
    highest: 94,
    lowest: 55,
  },
  {
    name: "Physics",
    average: 72,
    highest: 90,
    lowest: 42,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Legend />
        <Bar dataKey="average" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="highest" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
        <Bar dataKey="lowest" fill="#f43f5e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
