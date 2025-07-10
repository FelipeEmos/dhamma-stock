import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateWorkspaceButton } from "./create-workspace-button";
import { UserWorkspaceSelector } from "./user-workspace-selector";

export function ChooseWorkspaceCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Workspaces</CardTitle>
        <CardDescription>Selecione um workspace para começar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <UserWorkspaceSelector />
        <CreateWorkspaceButton />
      </CardContent>
    </Card>
  );
}
