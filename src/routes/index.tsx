import { AuthRedirectEffects } from "@/features/navigation/use-auth-redirects";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  AuthRedirectEffects.useIndexRedirect();
  // FIXME: loading spinner
  return null;
}
