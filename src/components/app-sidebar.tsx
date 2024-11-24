"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  CreditCardIcon,
  LayoutDashboardIcon,
  PresentationIcon,
  SquareTerminal,
} from "lucide-react";
import { NavMain } from "~/components/nav-main";
import { NavProjects } from "~/components/nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { ModeToggle } from "./theme-toggle";
import useProject from "~/hooks/useProject";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const iteams = {
    userdata: {
      name: user?.firstName || "",
      email: user?.emailAddresses[0]?.emailAddress || "",
      avatar: user?.imageUrl || "",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboardIcon,
        isActive: true,
      },
      {
        title: "Q&A",
        url: "/qna",
        icon: Bot,
      },
      {
        title: "Meetings",
        url: "/meetings",
        icon: PresentationIcon,
      },
      {
        title: "Billing",
        url: "/billing",
        icon: CreditCardIcon,
      },
    ],
  };
  return (
    <Sidebar variant="inset" {...props} collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <SquareTerminal className="size-6" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CodeBase</span>
                  <span className="truncate text-xs">by Aether</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={iteams.navMain} />
        <NavProjects />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
