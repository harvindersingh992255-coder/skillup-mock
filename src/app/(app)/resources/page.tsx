import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResourcesPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Tips & Resources</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Our library of articles, videos, and best practices is being curated. Soon you'll find everything you need to know to ace your interviews!</p>
                </CardContent>
            </Card>
        </div>
    );
}
