import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "../ui/button";
import Link from "next/link";

const activities: any[] = [
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
                {activities.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-8">
                        <p className="text-muted-foreground">No recent sessions.</p>
                        <Button variant="link" asChild>
                            <Link href="/practice">Start your first interview</Link>
                        </Button>
                    </div>
                ) : activities.map((activity, index) => {
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
