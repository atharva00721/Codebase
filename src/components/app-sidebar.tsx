"use client";

import * as React from "react";
import {
  Bot,
  CreditCardIcon,
  LayoutDashboardIcon,
  PresentationIcon,
} from "lucide-react";
import { NavMain } from "~/components/nav-main";

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
import { ProjectSwitcher } from "./project-switcher";


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
    <Sidebar variant="floating" {...props} collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <ProjectSwitcher />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={iteams.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
