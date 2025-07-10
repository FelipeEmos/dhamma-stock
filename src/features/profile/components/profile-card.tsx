import * as Jazz from "@/jazz";
import { cn } from "@/lib/utils";
import { Loaded } from "jazz-tools";
import { ProgressiveImg } from "jazz-tools/react";

interface ProfileCardImageProps {
  profile: Loaded<typeof Jazz.Profile>;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ProfileCardImage({
  profile,
  size = "md",
  className,
}: ProfileCardImageProps) {
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

  const displayName = profile.name || profile.email || "Usuário";
  const initials = getInitials(displayName);

  return (
    <div
      className={cn(
        "flex-shrink-0 overflow-hidden rounded-full bg-gray-200",
        sizeClasses[size],
        className
      )}
    >
      {profile.image ? (
        <ProgressiveImg image={profile.image as any}>
          {({ src }) => (
            <img
              src={src}
              alt={displayName}
              className="h-full w-full object-cover"
            />
          )}
        </ProgressiveImg>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-300">
          <span className="font-medium text-gray-600">{initials}</span>
        </div>
      )}
    </div>
  );
}

interface ProfileCardProps {
  profile: Loaded<typeof Jazz.Profile>;
  size?: "sm" | "md" | "lg";
  showEmail?: boolean;
  className?: string;
}

export function ProfileCard({
  profile,
  size = "md",
  showEmail = true,
  className,
}: ProfileCardProps) {
  const displayName = profile.name || profile.email || "Usuário";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <ProfileCardImage profile={profile} size={size} />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium text-gray-900">{displayName}</h3>
        {showEmail && profile.email && profile.name && (
          <p className="truncate text-sm text-gray-500">{profile.email}</p>
        )}
      </div>
    </div>
  );
}
