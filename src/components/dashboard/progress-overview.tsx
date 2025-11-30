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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const chartData: { date: string, score: number }[] = [
]

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--accent))",
  },
}

export function ProgressOverview() {
  if (chartData.length === 0) {
    return (
      <div className="flex h-[250px] w-full items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No data yet.</p>
          <p className="text-sm text-muted-foreground">Complete an interview to see your progress.</p>
        </div>
      </div>
    );
  }
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
