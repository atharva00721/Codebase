import { UserButton } from "@clerk/nextjs";
import { AppSidebar } from "~/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";

type Props = {
  children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="h-22 flex shrink-0 items-center gap-2 p-2">
          <div className="border-sidebar-border bg-sidebar flex w-full items-center justify-between gap-2 rounded-lg border p-2 px-4 shadow">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
            <UserButton />
          </div>
        </header>
        <main className="w-full p-2">
          <div className="border-sidebar-border bg-sidebar no-scrollbar flex h-[calc(100vh-6rem)] gap-2 overflow-y-auto rounded-lg border p-4 shadow">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarLayout;
