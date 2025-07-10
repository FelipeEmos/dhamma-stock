import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/w/$workspaceId/")({
  beforeLoad: async ({ params }) => {
    throw redirect({
      to: "/w/$workspaceId/home",
      params,
    });
  },
});
