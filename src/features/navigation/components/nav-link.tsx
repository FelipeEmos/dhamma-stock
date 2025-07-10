import { Button, ButtonProps } from "@/components/ui/button";
import { Link, LinkOptions } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import * as React from "react";

interface Props extends LinkOptions {
  children: React.ReactNode;
  buttonProps?: ButtonProps;
}

export function NavLink({ children, buttonProps, ...linkOptions }: Props) {
  return (
    <Button variant="ghost" size="xl" asChild {...buttonProps}>
      <Link {...linkOptions} className="group">
        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        <span className="transition-transform duration-200 group-hover:translate-x-1">
          {children}
        </span>
      </Link>
    </Button>
  );
}
