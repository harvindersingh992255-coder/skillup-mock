import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";

const recommendations: any[] = [
];

export function Recommendations() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>
                    Focus on these areas to improve your scores.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {recommendations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-8">
                        <p className="text-muted-foreground">No recommendations yet.</p>
                        <p className="text-sm text-muted-foreground">Complete an interview to get personalized feedback.</p>
                    </div>
                ) : recommendations.map((rec) => (
                    <div key={rec.title} className="flex items-start gap-4 p-3 bg-secondary rounded-lg">
                        <div className="bg-primary/10 text-primary p-2 rounded-full">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-semibold">{rec.title}</p>
                            <p className="text-sm text-muted-foreground">{rec.description}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="ml-auto shrink-0" asChild>
                           <Link href="/practice">
                             <ArrowRight className="w-4 h-4" />
                           </Link>
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
