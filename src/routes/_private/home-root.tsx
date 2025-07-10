import { createFileRoute } from "@tanstack/react-router";
import { ChooseWorkspaceSection } from "@/features/workspace/components/choose-workspace-section";
import { ProfileSection } from "@/features/profile/components/profile-section";
import { DisconnectButton } from "@/features/auth/disconnect-button";

export const Route = createFileRoute("/_private/home-root")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-background min-h-screen">
      <main className="flex flex-col items-center justify-center space-y-14 p-6">
        <h1 className="text-3xl font-bold">Dhamma Stock</h1>
        <ChooseWorkspaceSection />
        <ProfileSection />
        <DisconnectButton />
      </main>
    </div>
  );
}
