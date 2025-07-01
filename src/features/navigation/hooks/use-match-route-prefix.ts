import { useMatches } from "@tanstack/react-router";
import React from "react";

export function useMatchRoutePrefix(prefix: RegExp) {
  const matches = useMatches();
  const lastMatch = matches?.at(-1);
  const lastLayoutPrefix = lastMatch?.routeId?.split("/")?.at(-2);

  return React.useMemo(() => {
    if (!prefix) {
      return true;
    }
    if (!lastLayoutPrefix) {
      return false;
    }
    return prefix.test(lastLayoutPrefix);
  }, [prefix, lastLayoutPrefix]);
}
