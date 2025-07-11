import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, LinkOptions } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import * as React from "react";

interface BackButtonLayoutProps extends LinkOptions {
  title?: React.ReactNode;
  children?: React.ReactNode;
  headerFooter?: React.ReactNode;
  className?: string;
}

export function BackButtonLayout({
  title,
  children,
  className,
  headerFooter,
  ...linkOptions
}: BackButtonLayoutProps) {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center">
      <header className="bg-muted/30 w-full border-b">
        <div className="flex min-h-12 justify-center px-2 py-2">
          <div className="flex w-full max-w-6xl items-center justify-between">
            <Button variant="ghost" size="icon" asChild className="p-6">
              <Link {...linkOptions}>
                <ArrowLeft className="size-6" />
              </Link>
            </Button>
            <div className="flex flex-1 justify-center text-lg">{title}</div>
            <div className="w-10"></div>
          </div>
        </div>
        {headerFooter}
      </header>

      <main
        className={cn(
          "flex flex-1 flex-col items-center justify-center p-6",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
}
