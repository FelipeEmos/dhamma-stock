import { co, Group, Loaded } from "jazz-tools";
import { AccountInternal } from "../account-internal-schema";
import { AccountRoot } from "../account-root-schema";
import { Workspace } from "../workspace-schema";
import { MigrationError } from "./_errors";

export async function migrateRoot(account: Loaded<typeof AccountInternal>) {
  await ensureRoot(account);
  await ensureRootWorkspaces(account);
  await healthCheck(account);
}

async function ensureRoot(account: Loaded<typeof AccountInternal>) {
  const { root } = await account.ensureLoaded({
    resolve: {
      root: true,
    },
  });
  if (root !== undefined) {
    return;
  }

  console.log("🔨 Creating new root (was undefined)");
  account.root = AccountRoot.create({
    workspaces: createNewWorkspacesCoValue(),
  });
}

async function ensureRootWorkspaces(account: Loaded<typeof AccountInternal>) {
  const { root } = await account.ensureLoaded({
    resolve: {
      root: {
        workspaces: true,
      },
    },
  });
  if (root?.workspaces !== undefined) {
    return;
  }

  console.log("🔨 Adding workspaces to existing root");
  root.workspaces = createNewWorkspacesCoValue();
}

function createNewWorkspacesCoValue() {
  const userPrivateGroup = Group.create();
  return co.list(Workspace).create([], userPrivateGroup);
}

async function healthCheck(account: Loaded<typeof AccountInternal>) {
  const { root } = await account.ensureLoaded({
    resolve: {
      root: {
        workspaces: true,
      },
    },
  });

  if (!root || !root.workspaces) {
    throw new MigrationError("Failed to create or load root and workspaces");
  }
}
