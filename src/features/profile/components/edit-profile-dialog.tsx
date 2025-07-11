import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ProfileForm,
  ProfileFormData,
} from "@/features/profile/forms/profile-form";
import * as Jazz from "@/jazz";
import { useState } from "react";
import { ProfileCard } from "./profile-card";

interface EditProfileDialogProps {
  profile: Jazz.ProfileType;
  onSubmit: (data: ProfileFormData) => void | Promise<void>;
}

export function EditProfileDialog({
  profile,
  onSubmit,
}: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: ProfileFormData) => {
    await onSubmit(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full cursor-pointer rounded-lg border p-4 text-left transition-colors hover:bg-gray-50">
          <ProfileCard profile={profile} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>
        <ProfileForm
          defaultValues={{
            name: profile.name || "",
            email: profile.email || "",
            image: profile.image,
          }}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
