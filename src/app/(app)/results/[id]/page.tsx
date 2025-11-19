import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Info, Play, Share2, TrendingUp, XCircle } from "lucide-react";

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
                <ScoreIndicator score={82} />
                <div>
                    <h1 className="text-3xl font-bold">Great Job, Alex!</h1>
                    <p className="text-muted-foreground">Here is the breakdown of your interview performance.</p>
                </div>
                <div className="flex gap-2">
                    <Button>Retake Interview</Button>
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
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                            <li>Clearly articulated your experience using the STAR method.</li>
                            <li>Demonstrated strong technical knowledge in key areas.</li>
                            <li>Maintained good eye contact and confident posture.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TrendingUp className="text-primary"/>Areas for Improvement</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                            <li>Could provide more concise answers to behavioral questions.</li>
                            <li>Expand on the impact of your projects with specific metrics.</li>
                            <li>Pace of speech was slightly fast at times.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Detailed Feedback</CardTitle>
                    <CardDescription>AI-generated feedback for each of your responses.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="font-semibold">Q: Tell me about a time you had to handle a difficult stakeholder.</h4>
                        <div className="mt-2 p-4 bg-secondary rounded-lg">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Your Answer (Score: 78)</p>
                                <Button variant="ghost" size="sm"><Play className="w-4 h-4 mr-2"/> Play</Button>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 border-l-2 border-primary pl-3">"Well, there was this one time where my manager's, uh, boss was really unhappy with our project timeline..."</p>
                            <div className="mt-3 text-sm flex items-start gap-2 text-primary p-3 bg-primary/10 rounded-md">
                                <Info className="w-4 h-4 mt-1 shrink-0" />
                                <p><span className="font-semibold">Feedback:</span> Your response structure could be improved. Try to state the situation and task more clearly before jumping into the action and result.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
