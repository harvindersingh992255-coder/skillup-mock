import { AppHeader } from "@/components/app-header";
import { DesktopSidebar } from "@/components/desktop-sidebar";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background">
      <DesktopSidebar />
      <div className="flex flex-col md:pl-64">
        <AppHeader />
        <main className="flex-1 p-4 pb-20 sm:p-6 lg:p-8 md:pb-8">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
