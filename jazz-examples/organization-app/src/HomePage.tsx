import { useAccount } from "jazz-tools/react";
import { Layout } from "./Layout.tsx";
import { CreateOrganization } from "./components/CreateOrganization.tsx";
import { Heading } from "./components/Heading.tsx";
import { JazzAccount } from "./schema";

export function HomePage() {
  const { me } = useAccount(JazzAccount, {
    resolve: {
      root: {
        organizations: {
          $each: { $onError: null },
        },
      },
    },
  });

  if (!me?.root.organizations) return;

  return (
    <Layout>
      <Heading text="Organizations example app" />

      <div className="dark:bg-stone-925 rounded-lg border bg-white shadow-sm">
        <div className="border-b px-4 py-5 sm:px-6">
          <h2>Organizations</h2>
        </div>
        <div className="divide-y">
          {me.root.organizations.length > 0 ? (
            me.root.organizations.map(project =>
              project ? (
                <a
                  key={project.id}
                  className="block px-4 py-5 font-medium sm:px-6"
                  href={`/#/organizations/${project.id}`}
                >
                  <strong>{project.name}</strong>
                </a>
              ) : null
            )
          ) : (
            <p className="col-span-full px-4 py-8 text-center sm:px-6">
              You have no organizations yet.
            </p>
          )}
          <div className="p-4 sm:p-6">
            <CreateOrganization />
          </div>
        </div>
      </div>
    </Layout>
  );
}
