import { createFileRoute } from "@tanstack/react-router";
import { SignOutButton } from "@clerk/clerk-react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChooseWorkspaceCard } from "@/features/workspace/components/choose-workspace-card";

export const Route = createFileRoute("/_private/home-root")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="absolute top-6 left-6">
        <h1 className="text-3xl font-bold">Dhamma Stock</h1>
      </div>

      <div className="absolute top-6 right-6">
        <SignOutButton>
          <Button variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </Button>
        </SignOutButton>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <ChooseWorkspaceCard />

        {/* Espaço para futuros cards como profile */}
      </div>
    </div>
  );
}
