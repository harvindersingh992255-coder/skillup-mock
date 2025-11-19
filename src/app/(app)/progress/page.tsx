import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProgressPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Your Progress</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">The full progress tracking dashboard is under construction. Check back soon for detailed analytics of your interview performance!</p>
                </CardContent>
            </Card>
        </div>
    );
}
