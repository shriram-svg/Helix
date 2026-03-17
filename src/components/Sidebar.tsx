"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconDashboard,
  IconFlask,
  IconPill,
  IconHeartRateMonitor,
  IconListCheck,
} from "@tabler/icons-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: IconDashboard },
  { href: "/research", label: "Research", icon: IconFlask },
  { href: "/stack", label: "Stack", icon: IconPill },
  { href: "/biomarkers", label: "Biomarkers", icon: IconHeartRateMonitor },
  { href: "/protocols", label: "Protocols", icon: IconListCheck },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-white border-r border-helix-border flex flex-col z-50">
      <div className="px-6 py-8">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          <span className="text-helix-green">H</span>elix
        </h1>
        <p className="text-xs text-helix-silver mt-1 tracking-wide uppercase">
          Longevity Hub
        </p>
      </div>

      <nav className="flex-1 px-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-helix-green/10 text-helix-green"
                  : "text-helix-silver hover:text-helix-black hover:bg-helix-bg"
              }`}
            >
              <Icon size={20} stroke={1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-6 border-t border-helix-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-helix-green/10 flex items-center justify-center text-helix-green font-semibold text-sm">
            H
          </div>
          <div>
            <p className="text-sm font-medium text-helix-black">Helix User</p>
            <p className="text-xs text-helix-silver">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
