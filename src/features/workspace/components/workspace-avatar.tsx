import * as Jazz from "@/jazz";
import { cn } from "@/lib/utils";
import { ProgressiveImg } from "jazz-tools/react";

interface WorkspaceAvatarImageProps {
  workspace: Jazz.WorkspaceShallowType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function WorkspaceAvatarImage({
  workspace,
  size = "md",
  className,
}: WorkspaceAvatarImageProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-12 w-12 text-lg",
    lg: "h-16 w-16 text-xl",
  };

  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return words
      .slice(0, 2)
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className={cn(
        "flex-shrink-0 overflow-hidden rounded-full bg-gray-200",
        sizeClasses[size],
        className
      )}
    >
      {workspace.image ? (
        // TODO: Enhance typesafety
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <ProgressiveImg image={workspace.image as any}>
          {({ src }) => (
            <img
              src={src}
              alt={workspace.name}
              className="h-full w-full object-cover"
            />
          )}
        </ProgressiveImg>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-300">
          <span className="font-medium text-gray-600">
            {getInitials(workspace.name)}
          </span>
        </div>
      )}
    </div>
  );
}

interface WorkspaceAvatarProps {
  workspace: Jazz.WorkspaceShallowType;
  size?: "sm" | "md" | "lg";
  showLocation?: boolean;
  className?: string;
}

export function WorkspaceAvatar({
  workspace,
  size = "md",
  showLocation = true,
  className,
}: WorkspaceAvatarProps) {
  const locationText = workspace.location
    ? `${workspace.location.state} - ${workspace.location.country}`
    : null;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <WorkspaceAvatarImage workspace={workspace} size={size} />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium text-gray-900">{workspace.name}</h3>
        {showLocation && locationText && (
          <p className="truncate text-sm text-gray-500">{locationText}</p>
        )}
      </div>
    </div>
  );
}
