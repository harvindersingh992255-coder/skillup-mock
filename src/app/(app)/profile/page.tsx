import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Your profile and settings page is under construction. You'll soon be able to manage your personal information, career goals, and notification preferences here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
