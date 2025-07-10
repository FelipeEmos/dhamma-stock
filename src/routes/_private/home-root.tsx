import { createFileRoute } from "@tanstack/react-router";
import { ChooseWorkspaceSection } from "@/features/workspace/components/choose-workspace-section";
import { RootLayout } from "@/components/layout/root-layout";

export const Route = createFileRoute("/_private/home-root")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RootLayout>
      <ChooseWorkspaceSection />
    </RootLayout>
  );
}
