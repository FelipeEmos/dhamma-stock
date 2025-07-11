import { useAccount } from "jazz-tools/react";
import { DraftBubbleTeaOrder, JazzAccount } from "./schema";
export function DraftIndicator() {
  const { me } = useAccount(JazzAccount, {
    resolve: { root: { draft: true } },
  });

  if (DraftBubbleTeaOrder.hasChanges(me?.root.draft)) {
    return (
      <div className="dark:border-stone-925 absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-blue-500">
        <span className="sr-only">You have a draft</span>
      </div>
    );
  }
}
