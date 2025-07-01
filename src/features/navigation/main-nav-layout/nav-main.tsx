import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

type NavItemProps = {
  title: string;
  url: string;
  icon?: LucideIcon;
};

function NavItem({ title, url, icon: Icon }: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton tooltip={title} asChild>
        <Link to={url}>
          {Icon && <Icon />}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function NavMain({
  title,
  items,
}: {
  title: string;
  items: NavItemProps[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <NavItem key={item.title} {...item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
