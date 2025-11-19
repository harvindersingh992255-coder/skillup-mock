
'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/nav-links";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Separator } from "./ui/separator";

export function DesktopSidebar({ className, isMobile = false }: { className?: string, isMobile?: boolean }) {
  const pathname = usePathname();

  const navClasses = isMobile ? "flex flex-col gap-2 p-4" : "fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-background md:flex";

  return (
    <nav className={cn(navClasses, className)}>
      <div className="flex h-14 items-center border-b px-6">
        <Logo />
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        <ul className="grid items-start px-4 text-sm font-medium">
          {NAV_LINKS.primary.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === link.href
                    ? "bg-accent text-accent-foreground hover:text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto p-4">
        <Separator className="my-2" />
         <ul className="grid items-start px-4 text-sm font-medium">
          {NAV_LINKS.secondary.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === link.href
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
