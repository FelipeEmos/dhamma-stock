import { useCoState } from "jazz-tools/react";
import { useParams } from "react-router";
import { Layout } from "./Layout.tsx";
import { CreateProject } from "./components/CreateProject.tsx";
import { Heading } from "./components/Heading.tsx";
import { InviteLink } from "./components/InviteLink.tsx";
import { OrganizationMembers } from "./components/OrganizationMembers.tsx";
import { Organization } from "./schema.ts";

export function OrganizationPage() {
  const paramOrganizationId = useParams<{ organizationId: string }>()
    .organizationId;

  const organization = useCoState(Organization, paramOrganizationId, {
    resolve: { projects: true },
  });

  if (organization === undefined) return <p>Loading organization...</p>;
  if (organization === null) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            You don't have access to this organization
          </h1>
          <a href="/#" className="text-blue-500">
            Go back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="grid gap-8">
        <Heading text={`Welcome to ${organization.name} organization!`} />

        <div className="dark:bg-stone-925 rounded-lg border bg-white shadow-sm">
          <div className="border-b px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <h2>Members</h2>

              {organization._owner?.myRole() === "admin" && (
                <InviteLink organization={organization} />
              )}
            </div>
          </div>
          <div className="divide-y">
            <OrganizationMembers organization={organization} />
          </div>
        </div>

        <div className="dark:bg-stone-925 rounded-lg border bg-white shadow-sm">
          <div className="border-b px-4 py-5 sm:px-6">
            <h2>Projects</h2>
          </div>
          <div className="divide-y">
            {organization.projects.length > 0 ? (
              organization.projects.map(project =>
                project ? (
                  <strong
                    key={project.id}
                    className="block px-4 py-5 font-medium sm:px-6"
                  >
                    {project.name}
                  </strong>
                ) : null
              )
            ) : (
              <p className="col-span-full px-4 py-8 text-center sm:px-6">
                You have no projects yet.
              </p>
            )}
            <div className="p-4 sm:p-6">
              <CreateProject organization={organization} />
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </Layout>
  );
}
