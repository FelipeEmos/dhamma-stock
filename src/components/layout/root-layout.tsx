import { DisconnectButton } from "@/features/auth/disconnect-button";
import * as React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      <header className="bg-muted/30 border-b">
        <div className="flex justify-center px-6 py-4">
          <div className="flex w-full max-w-6xl items-center justify-between">
            <h1 className="text-3xl font-bold">Dhamma Stock</h1>
            <DisconnectButton />
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
}
