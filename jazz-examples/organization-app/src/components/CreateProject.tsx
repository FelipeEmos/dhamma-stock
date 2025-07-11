import { Loaded } from "jazz-tools";
import { useState } from "react";
import { Organization, Project } from "../schema.ts";

export function CreateProject({
  organization,
}: {
  organization: Loaded<typeof Organization>;
}) {
  const [name, setName] = useState<string>("");

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!organization?.projects) return;

    if (name.length > 0) {
      const project = Project.create({ name }, { owner: organization._owner });
      organization.projects.push(project);
      setName("");
    }
  };

  return (
    <form onSubmit={onSave} className="flex items-center gap-3">
      <label className="flex-1">
        <span className="sr-only">Project name</span>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter project name..."
          value={name}
          className="w-full rounded-md shadow-sm dark:bg-transparent"
          onChange={e => setName(e.target.value)}
          required
        />
      </label>
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Add project
      </button>
    </form>
  );
}
