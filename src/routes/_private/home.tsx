import { createFileRoute } from "@tanstack/react-router";
import { SignOutButton } from "@clerk/clerk-react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_private/home")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Teste,
      <div>
        <SignOutButton>
          <Button>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </Button>
        </SignOutButton>
      </div>
    </div>
  );
}
