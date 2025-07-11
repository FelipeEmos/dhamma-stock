import { CoPlainText, Group } from "jazz-tools";
import { useAccount, useCoState } from "jazz-tools/react";
import { useState } from "react";
import { IssueComponent } from "./Issue.tsx";
import { IssueVersionHistory } from "./IssueVersionHistory.tsx";
import { Issue } from "./schema";
function App() {
  const { me, logOut } = useAccount();
  const [issueID, setIssueID] = useState<string | undefined>(
    (window.location.search?.replace("?issue=", "") || undefined) as
      | string
      | undefined
  );

  const issue = useCoState(Issue, issueID);

  const createIssue = () => {
    const group = Group.create();
    group.addMember("everyone", "writer");

    const newIssue = Issue.create(
      {
        title: "Buy terrarium",
        description: CoPlainText.create(
          "Make sure it's big enough for 10 snails.",
          group
        ),
        estimate: 5,
        status: "backlog",
      },
      group
    );
    setIssueID(newIssue.id);
    window.history.pushState({}, "", `?issue=${newIssue.id}`);
  };

  return (
    <>
      <header>
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-3 py-3">
          <span>
            You're logged in as <strong>{me?.profile?.name}</strong>
          </span>
          <button
            className="rounded-md bg-stone-100 px-3 py-1.5 text-sm"
            onClick={() => logOut()}
          >
            Log out
          </button>
        </nav>
      </header>
      <main className="mx-auto my-8 flex max-w-3xl flex-col gap-8 px-3">
        {issue ? (
          <>
            <h1 className="sr-only">Issue: {issue.title}</h1>
            <IssueComponent issue={issue} />
            <hr />
            <IssueVersionHistory id={issue.id} />
          </>
        ) : (
          <button onClick={createIssue}>Create Issue</button>
        )}
      </main>
    </>
  );
}

export default App;
