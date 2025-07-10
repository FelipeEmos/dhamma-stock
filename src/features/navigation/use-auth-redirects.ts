import { type FileRouteTypes } from "@/routeTree.gen";
import { useMatches, useNavigate } from "@tanstack/react-router";
import { useIsAuthenticated } from "jazz-tools/react";
import * as React from "react";

function useIsInPrivateRoute() {
  const matches = useMatches();

  return React.useMemo(() => {
    return matches.some(
      match => (match.id as FileRouteTypes["id"]) === "/_private"
    );
  }, [matches]);
}

export namespace AuthRedirectEffects {
  export function useRedirectFromPrivate() {
    const isInPrivateRoute = useIsInPrivateRoute();
    const navigate = useNavigate();

    const isAuth = useIsAuthenticated();
    const shouldRedirect = !isAuth && isInPrivateRoute;

    React.useEffect(() => {
      if (!shouldRedirect) {
        return;
      }
      navigate({ to: "/login" });
    }, [isAuth, navigate, shouldRedirect]);

    return shouldRedirect;
  }

  export function useRedirectFromPublic() {
    const isAuth = useIsAuthenticated();

    const isInPrivateRoute = useIsInPrivateRoute();
    const navigate = useNavigate();

    const shouldRedirect = isAuth && !isInPrivateRoute;

    React.useEffect(() => {
      if (!shouldRedirect) {
        return;
      }

      navigate({ to: "/home-root" });
    }, [shouldRedirect, navigate]);

    return shouldRedirect;
  }

  export function useIndexRedirect() {
    const fromPrivate = useRedirectFromPrivate();
    const fromPublic = useRedirectFromPublic();
    const navigate = useNavigate();

    const shouldRedirect = !fromPrivate && !fromPublic;

    React.useEffect(() => {
      if (shouldRedirect) {
        navigate({
          to: "/login",
        });
      }
    }, [shouldRedirect, navigate]);

    return shouldRedirect;
  }
}
