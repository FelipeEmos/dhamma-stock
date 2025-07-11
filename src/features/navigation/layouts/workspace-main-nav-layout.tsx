import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMatchRoutePrefix } from "@/features/navigation/hooks/use-match-route-prefix";
import { cn } from "@/lib/utils";
import { FileRouteTypes } from "@/routeTree.gen";
import { Link, LinkOptions, useMatches } from "@tanstack/react-router";
import { Bell, Home, Package, Truck } from "lucide-react";
import React from "react";

export function WorkspaceMainNavLayout({
  children,
  visibilityPrefix,
  workspaceId,
}: {
  children?: React.ReactNode;
  visibilityPrefix: RegExp;
  workspaceId: string;
}) {
  const isHidden = !useMatchRoutePrefix(visibilityPrefix);

  return (
    <div className="flex min-h-svh w-full flex-col lg:flex-row">
      {/* Fixed Navigation for mobile, fixed for desktop */}
      <NavBarItems
        workspaceId={workspaceId}
        className={cn(
          "border-border bg-sidebar fixed right-0 bottom-0 left-0 z-10 flex items-center justify-center border-t lg:fixed lg:top-0 lg:right-auto lg:bottom-0 lg:left-0 lg:h-svh lg:w-28 lg:border-t-0 lg:border-r",
          {
            hidden: isHidden,
          }
        )}
      />

      {/* Invisible spacer for desktop padding */}
      <NavBarItems
        workspaceId={workspaceId}
        className={cn(
          "border-border bg-sidebar invisible hidden lg:flex lg:w-28 lg:items-center lg:justify-center lg:border-t-0 lg:border-r",
          {
            hidden: isHidden,
          }
        )}
      />

      {/* Content with scroll */}
      <ScrollArea className="order-1 flex flex-1 lg:order-2">
        {children}

        {/* Invisible spacer for mobile padding */}
        <NavBarItems
          workspaceId={workspaceId}
          className={cn(
            "border-border bg-sidebar invisible flex items-center justify-center border-t lg:hidden",
            {
              hidden: isHidden,
            }
          )}
        />
      </ScrollArea>
    </div>
  );
}

interface NavItemProps extends LinkOptions {
  title: string;
  icon?: React.ReactNode;
  matchId?: FileRouteTypes["id"];
}

function NavBarItems({
  workspaceId,
  className,
}: {
  workspaceId: string;
  className?: string;
}) {
  const params = React.useMemo(
    () => ({
      workspaceId,
    }),
    [workspaceId]
  );

  return (
    <nav className={cn(className)}>
      <div className="flex h-full max-h-[20em] w-full max-w-md items-center justify-between lg:flex-col">
        <NavItem
          to="/w/$workspaceId"
          params={params}
          title="home"
          matchId="/_private/w/$workspaceId/_nav/home"
          icon={<Home className="h-6 w-6" />}
        />
        <NavItem
          to="/w/$workspaceId/stock"
          params={params}
          title="estoque"
          matchId="/_private/w/$workspaceId/stock/_nav/"
          icon={<Package className="h-6 w-6" />}
        />
        <NavItem
          to="/w/$workspaceId/orders"
          params={params}
          matchId="/_private/w/$workspaceId/orders/_nav/"
          title="pedidos"
          icon={<Truck className="h-6 w-6" />}
        />
        <NavItem
          to="/w/$workspaceId/notifications"
          params={params}
          matchId="/_private/w/$workspaceId/notifications/_nav/"
          title="notificações"
          icon={<Bell className="h-6 w-6" />}
        />
      </div>
    </nav>
  );
}

function NavItem({ icon, title, matchId, ...linkProps }: NavItemProps) {
  const matches = useMatches();

  const isSelected = React.useMemo(() => {
    if (matchId === undefined) {
      return false;
    }
    return matches.some(
      match => (match.routeId as FileRouteTypes["id"]) === matchId
    );
  }, [matchId, matches]);

  return (
    <Button
      variant="ghost"
      asChild
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center py-8 transition-all duration-200 lg:h-auto lg:w-full lg:flex-col lg:p-3",
        isSelected && "bg-primary/10 text-primary shadow-sm"
      )}
    >
      <Link
        {...linkProps}
        className="flex flex-col items-center justify-center space-y-1"
      >
        {icon}
        <span className="text-center text-xs leading-none font-medium">
          {title}
        </span>
      </Link>
    </Button>
  );
}
