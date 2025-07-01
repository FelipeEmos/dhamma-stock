import { useOrganization, useOrganizationList } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";

export function WorkspaceSwitcher() {
  const { organization } = useOrganization();
  const { setActive, userMemberships, createOrganization } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  const navigate = useNavigate();

  const handleSwitchOrganization = async (orgId: string) => {
    if (setActive) {
      await setActive({ organization: orgId });
      // Navigation will happen automatically via AuthRedirectEffects
    }
  };

  const handleCreateOrganization = () => {
    // This will open Clerk's create organization flow
    createOrganization?.({ name: "" });
  };

  if (!organization) {
    return (
      <Button
        variant="outline"
        className="w-full justify-start gap-2"
        onClick={handleCreateOrganization}
      >
        <Plus className="h-4 w-4" />
        Criar Workspace
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between gap-2 px-3"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Avatar className="h-6 w-6">
              <AvatarImage src={organization.imageUrl} />
              <AvatarFallback className="text-xs">
                {organization.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="truncate font-medium">
              {organization.name}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <div className="p-2">
          <p className="text-sm text-muted-foreground">Workspaces</p>
        </div>
        <DropdownMenuSeparator />
        {userMemberships?.data?.map((membership) => (
          <DropdownMenuItem
            key={membership.organization.id}
            className="flex items-center gap-2 p-2"
            onClick={() => handleSwitchOrganization(membership.organization.id)}
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={membership.organization.imageUrl} />
              <AvatarFallback className="text-xs">
                {membership.organization.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">
                {membership.organization.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {membership.role}
              </span>
            </div>
            {organization.id === membership.organization.id && (
              <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 p-2"
          onClick={handleCreateOrganization}
        >
          <Plus className="h-4 w-4" />
          Criar Workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
