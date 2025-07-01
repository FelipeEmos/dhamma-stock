import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useAccount } from "jazz-tools/react";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const account = useAccount();
  const isLoading = account.me === undefined;

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-svh items-center justify-center">
        <div className="border-primary/20 border-t-primary h-8 w-8 animate-spin rounded-full border-4"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-background min-h-svh">
        <Outlet />
      </div>
      {import.meta.env.DEV && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
    </>
  );
}
