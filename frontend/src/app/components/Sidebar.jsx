"use client";

import { useState, useEffect } from "react";
import { Nav } from "./ui/nav";
import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  Database,
  BarChart,
  Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Removed useWindowWidth dependency, now using Tailwind for responsiveness
export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure this runs only on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  // Don't render anything before the component mounts
  if (!isMounted) return null;

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
      {/* Show the button only on larger screens */}
      <div className="absolute right-[-20px] top-7 hidden md:block">
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className="rounded-full p-2"
        >
          <ChevronRight />
        </Button>
      </div>

      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Expenses",
            href: "/dashboard/expense",
            icon: Database,
            variant: "ghost",
          },
          {
            title: "Budget Management",
            href: "/budgetPlan",
            icon: Wallet,
            variant: "ghost",
          },
          {
            title: "Reports & Analysis",
            href: "/report",
            icon: BarChart,
            variant: "ghost",
          },
          {
            title: "Profile",
            href: "/login",
            icon: UsersRound,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
