import { Loaded } from "jazz-tools";
import { DraftOrganization, Organization } from "../schema.ts";

export function OrganizationForm({
  organization,
  onSave,
}: {
  organization: Loaded<typeof Organization> | Loaded<typeof DraftOrganization>;
  onSave?: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSave} className="flex items-center gap-3">
      <label className="flex-1">
        <span className="sr-only">Organization name</span>
        <input
          type="text"
          name="name"
          id="name"
          value={organization.name}
          placeholder="Enter organization name..."
          className="w-full rounded-md shadow-sm dark:bg-transparent"
          onChange={e => (organization.name = e.target.value)}
          required
        />
      </label>
      {onSave && (
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Create
        </button>
      )}
    </form>
  );
}
