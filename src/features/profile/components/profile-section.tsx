import { ProfileFormData } from "@/features/profile/forms/profile-form";
import * as Jazz from "@/jazz";
import { useAccount } from "jazz-tools/react";
import { EditProfileDialog } from "./edit-profile-dialog";

export function ProfileSection() {
  const { me } = useAccount(Jazz.Account, {
    resolve: {
      profile: true,
    },
  });

  const handleProfileSubmit = (data: ProfileFormData) => {
    if (!me?.profile) {
      return;
    }

    if (data.name) {
      me.profile.name = data.name;
    }
    if (data.email) {
      me.profile.email = data.email;
    }
    if (data.image) {
      me.profile.image = data.image;
    }

    console.log("Profile updated:", data);
  };

  if (!me?.profile) {
    return null;
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Meu Perfil</h2>
      </div>
      <EditProfileDialog profile={me.profile} onSubmit={handleProfileSubmit} />
    </div>
  );
}
