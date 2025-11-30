import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, Flame, Star } from "lucide-react";

const stats = [
    {
      icon: <ClipboardCheck className="h-6 w-6 text-muted-foreground" />,
      label: "Sessions Completed",
      value: "0",
    },
    {
      icon: <Star className="h-6 w-6 text-muted-foreground" />,
      label: "Average Score",
      value: "0%",
    },
    {
      icon: <Flame className="h-6 w-6 text-muted-foreground" />,
      label: "Practice Streak",
      value: "0 days",
    },
];

export function StatsCards() {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
                <Card key={stat.label}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                        {stat.icon}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
