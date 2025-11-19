import { AppHeader } from "@/components/app-header";
import { DesktopSidebar } from "@/components/desktop-sidebar";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <DesktopSidebar />
      <div className="md:pl-64 flex flex-col flex-1">
        <AppHeader />
        <main className="flex-1 bg-secondary/50 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
