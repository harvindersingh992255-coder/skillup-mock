import type { LucideIcon } from "lucide-react";
import { BarChart, BookOpen, Clock, CreditCard, HelpCircle, Home, LogOut, PlayCircle, Settings, User, FileText } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const NAV_LINKS: { primary: NavLink[]; secondary: NavLink[] } = {
  primary: [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/practice", label: "Practice", icon: PlayCircle },
    { href: "/progress", label: "Progress", icon: BarChart },
    { href: "/resources", label: "Resources", icon: BookOpen },
    { href: "/pricing", label: "Pricing", icon: CreditCard },
  ],
  secondary: [
    { href: "/profile", label: "Profile", icon: User },
    { href: "/history", label: "Interview History", icon: Clock },
    { href: "/resume", label: "Resume", icon: FileText },
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/help", label: "Help & Support", icon: HelpCircle },
    { href: "/login", label: "Logout", icon: LogOut },
  ]
};
