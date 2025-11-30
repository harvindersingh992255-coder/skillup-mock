
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResumePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Resume Tools</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">The AI-powered resume analyzer and builder are under construction. Soon you'll be able to upload your resume for analysis or create a new one from scratch here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
