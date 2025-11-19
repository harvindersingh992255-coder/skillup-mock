import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";

const recommendations = [
    {
        title: "Practice STAR Method",
        description: "Your behavioral answers could be more structured. Try focusing on the STAR method."
    },
    {
        title: "Deepen Technical Explanations",
        description: "For technical questions, try to explain the 'why' behind your choices."
    },
    {
        title: "Work on Conciseness",
        description: "Some of your answers were a bit long. Practice being more concise."
    },
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
                {recommendations.map((rec) => (
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
