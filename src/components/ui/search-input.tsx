import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { forwardRef } from "react";
import { Input } from "./input";
import * as React from "react";

interface SearchInputProps
  extends React.ComponentPropsWithoutRef<typeof Input> {
  className?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input ref={ref} className={cn("pl-10", className)} {...props} />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
