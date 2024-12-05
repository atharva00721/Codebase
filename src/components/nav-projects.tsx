"use client";

import { PlusCircle, SquareTerminal } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import useProject from "~/hooks/useProject";

export function NavProjects() {
  const { isMobile } = useSidebar();
  const { projects, projectId, setprojectId } = useProject();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects?.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              className={cn({
                "bg-purple-400 !text-white hover:bg-purple-400":
                  item.id === projectId,
              })}
              asChild
            >
              <div
                onClick={() => {
                  setprojectId(item.id);
                }}
              >
                <SquareTerminal />
                <span>{item.name}</span>
              </div>
            </SidebarMenuButton>
            
          </SidebarMenuItem>
        ))}

        <Button className="mt-2 text-white" variant={"ghost"}>
          <PlusCircle className="" />
          <span>Add Project</span>
        </Button>
      </SidebarMenu>
    </SidebarGroup>
  );
}
