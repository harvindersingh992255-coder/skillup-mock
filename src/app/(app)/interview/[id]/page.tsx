import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Mic, SkipForward, Video } from "lucide-react";
import Link from "next/link";

export default function InterviewPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">Question 3 of 10</p>
            <Progress value={30} className="w-full max-w-sm mx-auto mt-2" />
        </div>

        <Card className="flex-1 flex flex-col">
            <CardHeader className="text-center">
                <h2 className="text-2xl font-semibold">
                    Tell me about a time you had to handle a difficult stakeholder. How did you manage the situation?
                </h2>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center gap-8">
                <div className="w-full max-w-md aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Video className="w-16 h-16 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button size="lg" className="rounded-full w-20 h-20 bg-accent hover:bg-accent/90">
                        <Mic className="w-8 h-8 text-accent-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <ChevronRight className="w-6 h-6" />
                    </Button>
                </div>
            </CardContent>
        </Card>
        <div className="flex justify-between items-center mt-4">
            <Button variant="outline">
                <SkipForward className="w-4 h-4 mr-2"/>
                Skip Question
            </Button>
            <Button variant="destructive" asChild>
                <Link href={`/results/${params.id}`}>End Interview</Link>
            </Button>
        </div>
    </div>
  );
}