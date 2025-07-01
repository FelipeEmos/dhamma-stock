import * as React from "react";
import { Home, User, Settings } from "lucide-react";

import { NavMain } from "./nav-main";
import { WorkspaceSwitcher } from "./workspace-switcher";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useOrganization } from "@clerk/clerk-react";

function useNavItems() {
  const { organization } = useOrganization();

  const mainNavItems = [
    {
      title: "Home",
      url: `/w/${organization?.slug}/home`,
      icon: Home,
    },
    {
      title: "Profile",
      url: `/w/${organization?.slug}/profile`,
      icon: User,
    },
  ];

  const workspaceNavItems = [
    {
      title: "Configurações",
      url: `/w/${organization?.slug}/settings`,
      icon: Settings,
    },
  ];

  return { mainNavItems, workspaceNavItems };
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { mainNavItems, workspaceNavItems } = useNavItems();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <WorkspaceSwitcher />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain title="Principal" items={mainNavItems} />
        <NavMain title="Workspace" items={workspaceNavItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
