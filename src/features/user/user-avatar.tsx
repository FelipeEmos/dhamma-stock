import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  horizontal?: boolean;
  className?: string;
}

export function UserAvatar({ horizontal = false, className }: UserAvatarProps) {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const initials =
    user.firstName && user.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`
      : user.emailAddresses[0]?.emailAddress[0]?.toUpperCase() || "U";

  if (horizontal) {
    return (
      <div className={`flex items-center gap-3 ${className || ""}`}>
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {user.fullName || user.emailAddresses[0]?.emailAddress}
          </span>
          <span className="text-muted-foreground text-xs">
            {user.emailAddresses[0]?.emailAddress}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Avatar className={className}>
      <AvatarImage src={user.imageUrl} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
