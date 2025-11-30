import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Info, Play, Share2, TrendingUp, XCircle } from "lucide-react";
import Link from "next/link";

function ScoreIndicator({ score }: { score: number }) {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                    className="text-secondary"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                />
                <circle
                    className="text-accent"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-foreground">{score}</span>
                <span className="text-sm text-muted-foreground">/ 100</span>
            </div>
        </div>
    );
}

export default function ResultsPage() {
    return (
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
            <div className="flex flex-col items-center text-center gap-4">
                <ScoreIndicator score={0} />
                <div>
                    <h1 className="text-3xl font-bold">Interview Complete!</h1>
                    <p className="text-muted-foreground">Here is the breakdown of your interview performance.</p>
                </div>
                <div className="flex gap-2">
                    <Button asChild>
                      <Link href="/practice">Practice Again</Link>
                    </Button>
                    <Button variant="outline">
                        <Share2 className="w-4 h-4 mr-2"/>
                        Share Results
                    </Button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><CheckCircle className="text-accent"/>Strengths</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p className="text-sm text-muted-foreground">Complete an interview to see your strengths.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TrendingUp className="text-primary"/>Areas for Improvement</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Complete an interview to see areas for improvement.</p>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Detailed Feedback</CardTitle>
                    <CardDescription>AI-generated feedback for each of your responses.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="text-center py-8">
                        <p className="text-muted-foreground">Your detailed feedback will appear here after your first session.</p>
                   </div>
                </CardContent>
            </Card>
        </div>
    );
}
