import { env } from "@/lib/env";
import { ClerkProvider, SignOutButton, useClerk } from "@clerk/clerk-react";
import { JazzInspector } from "jazz-tools/inspector";
import { JazzReactProviderWithClerk } from "jazz-tools/react";
import type * as React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import * as Jazz from "@/jazz";

function JazzProvider({ children }: { children: React.ReactNode }) {
  const clerk = useClerk();

  return (
    <JazzReactProviderWithClerk
      clerk={clerk}
      AccountSchema={Jazz.Account}
      sync={{
        peer: `wss://cloud.jazz.tools/?key=${env.VITE_JAZZ_API_KEY}`,
      }}
    >
      {children}
    </JazzReactProviderWithClerk>
  );
}

const root = document.getElementById("root");
if (!root) {
  throw new Error(
    "Root element not found and can't mount app. Did you change the `index.html` file?"
  );
}

const isExpirationTest = location.search.includes("expirationTest");

createRoot(root).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={env.VITE_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      {isExpirationTest ? (
        <SignOutButton>Simulate expiration</SignOutButton>
      ) : (
        <JazzProvider>
          <App />
          <JazzInspector />
        </JazzProvider>
      )}
    </ClerkProvider>
  </StrictMode>
);
