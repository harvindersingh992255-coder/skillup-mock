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

const scoreHistoryData = [
  { session: 1, score: 65 },
  { session: 2, score: 72 },
  { session: 3, score: 70 },
  { session: 4, score: 78 },
  { session: 5, score: 80 },
  { session: 6, score: 85 },
  { session: 7, score: 82 },
  { session: 8, score: 88 },
];

const parameterFeedbackData = [
  {
    parameter: 'Clarity',
    score: 80,
    fullMark: 100,
  },
  {
    parameter: 'Confidence',
    score: 90,
    fullMark: 100,
  },
  {
    parameter: 'STAR Method',
    score: 75,
    fullMark: 100,
  },
  {
    parameter: 'Technical Depth',
    score: 65,
    fullMark: 100,
  },
  {
    parameter: 'Conciseness',
    score: 85,
    fullMark: 100,
  },
];

const feedbackDetails = [
  {
    title: 'Clarity & Conciseness',
    feedback:
      "You're explaining concepts well, but sometimes answers could be more direct. Try to eliminate filler words.",
    score: 85,
  },
  {
    title: 'Confidence',
    feedback:
      'Great job maintaining a confident tone and good posture throughout the interview.',
    score: 90,
  },
  {
    title: 'STAR Method Usage',
    feedback:
      'You are using the STAR method, but focus on clearly defining the "Result" in your stories with specific metrics.',
    score: 75,
  },
  {
    title: 'Technical Depth',
    feedback:
      "Your answers show good understanding, but you could elaborate more on the 'why' behind your technical decisions.",
    score: 65,
  },
  {
    title: 'Pacing',
    feedback: 'Your speaking pace is generally good. At times it can be slightly fast when explaining complex topics.',
    score: 80,
  },
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
            Your scores from the last 8 practice sessions.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
            {feedbackDetails.map((item) => (
              <div key={item.title}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-semibold">{item.title}</h4>
                  <span className="text-sm font-bold text-primary">{item.score}/100</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.feedback}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
