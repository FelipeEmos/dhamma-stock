import { ProgressiveImg, createImage, useAccount } from "jazz-tools/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { JazzAccount } from "./schema";

export default function ImageUpload() {
  const { me } = useAccount(JazzAccount, { resolve: { profile: true } });
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (imagePreviewUrl) {
        e.preventDefault();
        return "Upload in progress. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const onImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!me) return;

    const file = event.currentTarget.files?.[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreviewUrl(objectUrl);

      try {
        me.profile.image = await createImage(file, {
          owner: me.profile._owner,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        URL.revokeObjectURL(objectUrl);
        setImagePreviewUrl(null);
      }
    }
  };

  const deleteImage = () => {
    if (!me?.profile) return;
    me.profile.image = undefined;
  };

  if (me?.profile?.image) {
    return (
      <>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <ProgressiveImg image={me.profile.image as any}>
          {({ src }) => <img alt="" src={src} className="h-auto w-full" />}
        </ProgressiveImg>
        <button
          type="button"
          onClick={deleteImage}
          className="mt-5 rounded bg-blue-600 px-3 py-2 text-white"
        >
          Delete image
        </button>
      </>
    );
  }

  if (imagePreviewUrl) {
    return (
      <div className="relative">
        <p className="absolute inset-0 z-10 flex items-center justify-center font-semibold text-gray-900">
          Uploading image...
        </p>
        <img
          src={imagePreviewUrl}
          alt="Preview"
          className="h-auto w-full opacity-50"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="image">Image</label>
      <input
        id="image"
        name="image"
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/gif, image/bmp"
        onChange={onImageChange}
      />
    </div>
  );
}
