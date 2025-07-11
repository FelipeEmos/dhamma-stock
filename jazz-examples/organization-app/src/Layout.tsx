import { useAccount } from "jazz-tools/react";
import { UserIcon } from "lucide-react";
import { JazzAccount } from "./schema";

export function Layout({ children }: { children: React.ReactNode }) {
  const { me, logOut } = useAccount(JazzAccount, {
    resolve: { profile: true },
  });

  return (
    <>
      <header className="dark:bg-stone-925 mb-12 bg-white shadow-sm dark:border-b">
        <div className="mx-auto flex w-full max-w-4xl items-center gap-4 px-4 py-3">
          <a href="/#">Home</a>

          <span className="ml-auto flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-stone-500 pt-1">
              <UserIcon size={20} className="stroke-white" />
            </span>
            <label htmlFor="profile-name" className="sr-only">
              Profile name
            </label>
            <input
              id="profile-name"
              type="text"
              value={me?.profile.name ?? ""}
              className="rounded-md px-3 py-1.5 text-sm shadow-sm dark:bg-transparent"
              onChange={e => {
                if (me) {
                  me.profile.name = e.target.value;
                }
              }}
            />
          </span>

          <button
            className="rounded-md bg-stone-100 px-3 py-1.5 text-sm dark:bg-stone-900 dark:text-white"
            onClick={() => {
              window.location.href = "/";
              logOut();
            }}
          >
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-3">
        {children}
      </main>
    </>
  );
}
