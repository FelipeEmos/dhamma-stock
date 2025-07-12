import * as Jazz from "@/jazz";
import { useAccount } from "jazz-tools/react";

export function useLoadAccountRoot() {
  const { me } = useAccount(Jazz.Account, {
    resolve: {
      root: {
        workspaces: {
          $each: { $onError: null },
        },
      },
    },
  });
  const workspaces = me?.root?.workspaces?.filter(w => !!w) ?? [];

  return {
    me,
    workspaces,
  };
}
