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
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
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
