import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  ArrowUpRight,
  ClipboardCheck,
  Flame,
  Star,
} from "lucide-react";
import Link from "next/link";
import { ProgressOverview } from "@/components/dashboard/progress-overview";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Recommendations } from "@/components/dashboard/recommendations";
import { StatsCards } from "@/components/dashboard/stats-cards";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <p className="text-muted-foreground">
            Here&apos;s your interview performance at a glance.
          </p>
        </div>
        <Button asChild size="lg">
            <Link href="/practice">Start New Interview</Link>
        </Button>
      </div>

      <StatsCards />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
            <CardDescription>
              Your average score over your sessions.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ProgressOverview />
          </CardContent>
        </Card>
        
        <RecentActivity />
      </div>

      <Recommendations />

    </div>
  );
}
