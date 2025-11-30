'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const scoreHistoryData: any[] = [
];

const parameterFeedbackData: any[] = [
];

const feedbackDetails: any[] = [
];

export default function ProgressPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Your Progress</h1>
        <p className="text-muted-foreground">
          Track your interview performance and improvements over time.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall Score History</CardTitle>
          <CardDescription>
            Your scores from your practice sessions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {scoreHistoryData.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center">
              <p className="text-muted-foreground">No sessions completed yet.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={scoreHistoryData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="session" stroke="hsl(var(--foreground))" tickFormatter={(value) => `Session ${value}`} />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Parameters</CardTitle>
            <CardDescription>
              A breakdown of your skills across key areas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {parameterFeedbackData.length === 0 ? (
                 <div className="flex h-[300px] items-center justify-center">
                    <p className="text-muted-foreground">No feedback available.</p>
                 </div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={parameterFeedbackData}
                >
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="parameter" stroke="hsl(var(--foreground))" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--foreground))" />
                    <Radar
                    name="Score"
                    dataKey="score"
                    stroke="hsl(var(--accent))"
                    fill="hsl(var(--accent))"
                    fillOpacity={0.6}
                    />
                    <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                    }}
                    />
                </RadarChart>
                </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Feedback</CardTitle>
            <CardDescription>
              AI-generated analysis for each parameter.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {feedbackDetails.length === 0 ? (
                 <div className="flex h-[300px] items-center justify-center">
                    <p className="text-muted-foreground">No feedback available.</p>
                 </div>
             ): (
                feedbackDetails.map((item) => (
                <div key={item.title}>
                    <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold">{item.title}</h4>
                    <span className="text-sm font-bold text-primary">{item.score}/100</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.feedback}</p>
                </div>
                ))
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
