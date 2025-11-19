"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-07-15", score: 65 },
  { date: "2024-07-16", score: 72 },
  { date: "2024-07-17", score: 70 },
  { date: "2024-07-18", score: 78 },
  { date: "2024-07-19", score: 80 },
  { date: "2024-07-20", score: 85 },
  { date: "2024-07-21", score: 82 },
]

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--accent))",
  },
}

export function ProgressOverview() {
  return (
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="score" fill="var(--color-score)" radius={8} />
        </BarChart>
      </ChartContainer>
  )
}
