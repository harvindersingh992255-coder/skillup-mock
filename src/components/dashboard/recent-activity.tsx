import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const activities = [
    {
        role: "Software Engineer",
        score: 82,
        date: "2 days ago",
        avatarId: "user-avatar-1"
    },
    {
        role: "Product Manager",
        score: 75,
        date: "4 days ago",
        avatarId: "user-avatar-2"
    },
    {
        role: "UX Designer",
        score: 90,
        date: "1 week ago",
        avatarId: "user-avatar-3"
    },
];

export function RecentActivity() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>
                    Review your past interview sessions.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                {activities.map((activity, index) => {
                     const avatar = PlaceHolderImages.find((img) => img.id === activity.avatarId);
                     return (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-9 w-9">
                                    {avatar && <AvatarImage src={avatar.imageUrl} alt="Avatar" data-ai-hint={avatar.imageHint} />}
                                    <AvatarFallback>{activity.role.substring(0,2)}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">{activity.role}</p>
                                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium">{activity.score}%</p>
                                <p className="text-xs text-muted-foreground">Score</p>
                            </div>
                        </div>
                     )
                })}
            </CardContent>
        </Card>
    );
}
