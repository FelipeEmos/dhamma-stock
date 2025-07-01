import { useMatchRoutePrefix } from "@/features/navigation/hooks/use-match-route-prefix";
import { UserAvatar } from "@/features/user/user-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import React from "react";
import { AppSidebar } from "./app-sidebar";
import { SignOutButton } from "@clerk/clerk-react";

export function MainNavLayout({
  children,
  visibilityPrefix,
}: {
  children?: React.ReactNode;
  visibilityPrefix: RegExp;
}) {
  const isVisible = useMatchRoutePrefix(visibilityPrefix);

  const commonClassName = cn("flex flex-col w-full");
  if (!isVisible) {
    return <div className={commonClassName}>{children}</div>;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className={commonClassName}>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <HeaderUserSection />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

function HeaderUserSection() {
  return (
    <div className="px-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <UserAvatar />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="p-2">
            <UserAvatar horizontal />
          </div>
          <DropdownMenuSeparator />
          <SignOutButton>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </SignOutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
