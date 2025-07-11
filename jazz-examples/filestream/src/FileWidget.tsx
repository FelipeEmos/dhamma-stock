"use client";
import { co } from "jazz-tools";
import { useAccount } from "jazz-tools/react";
import { useRef, useState } from "react";
import { JazzAccount } from "./schema";

export function FileWidget() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dragAndDropElementRef = useRef<HTMLDivElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { me } = useAccount(JazzAccount, { resolve: { profile: true } });

  async function handleUpload(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (!me?.profile) {
      setError("User profile not found");
      return;
    }

    setProgress(0);

    const file = inputRef.current?.files?.[0];
    if (!file) {
      setError("Please select a file");
      return;
    }

    try {
      setIsUploading(true);
      me.profile.file = await co.fileStream().createFromBlob(file, {
        onProgress: p => setProgress(Math.round(p * 100)),
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to upload file"
      );
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  }

  function handleDelete() {
    if (!me?.profile) return;
    delete me.profile?.file;
  }

  async function handleDownload() {
    if (!me?.profile) return;

    const file = me.profile.file;
    if (!file) return;

    try {
      const blob = file.toBlob();
      const url = URL.createObjectURL(blob || new Blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = file.id || "download";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }

  function formatFileSize(bytes?: number): string {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragAndDropElementRef?.current?.classList.replace(
      "border-stone-400",
      "border-blue-700"
    );
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragAndDropElementRef?.current?.classList.replace(
      "border-stone-400",
      "border-blue-700"
    );
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragAndDropElementRef?.current?.classList.replace(
      "border-blue-700",
      "border-stone-400"
    );
  };

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragAndDropElementRef?.current?.classList.replace(
      "border-blue-700",
      "border-stone-400"
    );

    if (!me?.profile) {
      setError("User profile not found");
      return;
    }

    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles || droppedFiles.length === 0) {
      return;
    }

    const file = droppedFiles[0];
    setProgress(0);

    try {
      setIsUploading(true);
      me.profile.file = await co.fileStream().createFromBlob(file, {
        onProgress: p => setProgress(Math.round(p * 100)),
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to upload file"
      );
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (me?.profile?.file == null) {
    return (
      <div className="flex flex-col gap-4">
        <div
          className="m-5 flex h-48 flex-col items-center justify-center rounded-md border-2 border-dashed border-stone-400 bg-stone-100"
          ref={dragAndDropElementRef}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <p>Drag & drop your file here</p>
        </div>
        <form onSubmit={handleUpload} className="flex gap-2">
          <input
            className="w-4/5 rounded-md bg-stone-100 px-2 py-1.5 text-sm"
            ref={inputRef}
            type="file"
            accept="file"
            onChange={() => setError(null)}
            disabled={isUploading}
          />

          <button
            type="submit"
            className="rounded-md bg-stone-100 px-3 py-1.5 text-sm disabled:opacity-50"
            disabled={isUploading}
          >
            {isUploading ? `Uploading...` : "Upload file"}
          </button>
        </form>
        {error && (
          <div className="pl-4 text-sm text-red-800" role="alert">
            {error}
          </div>
        )}

        {isUploading && (
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 text-sm">Progress: {progress}%</div>
            <div className="h-2 flex-1 rounded-full bg-stone-200">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  const fileData = me?.profile?.file?.getMetadata();
  const mimeType = fileData?.mimeType || "unknown";

  return (
    <div className="gap-2">
      <div className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-bold">File name</span>
            <span>{fileData?.fileName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Type</span>
            <span>{mimeType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Size</span>
            <span>{formatFileSize(fileData?.totalSizeBytes)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">CoValue ID</span>
            <span>{me.profile.file.id}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          className="rounded-md bg-stone-100 px-3 py-1.5 text-sm"
          onClick={handleDelete}
        >
          Delete file
        </button>

        <button
          className="rounded-md bg-stone-100 px-3 py-1.5 text-sm"
          onClick={handleDownload}
        >
          Download file
        </button>
      </div>

      <div className="w-full justify-center pt-8">
        {fileData?.mimeType?.startsWith("image/") && (
          <div className="flex justify-center">
            <img
              src={URL.createObjectURL(
                me?.profile?.file?.toBlob() || new Blob()
              )}
              alt="File preview"
              className="mb-4 max-w-xs"
            />
          </div>
        )}

        {fileData?.mimeType?.startsWith("audio/") && (
          <div className="flex justify-center">
            <audio
              src={URL.createObjectURL(
                me?.profile?.file?.toBlob() || new Blob()
              )}
              controls
              className="mb-4 w-full"
            />
          </div>
        )}

        {fileData?.mimeType?.startsWith("video/") && (
          <div className="flex justify-center">
            <video
              src={URL.createObjectURL(
                me?.profile?.file?.toBlob() || new Blob()
              )}
              controls
              className="mb-4 w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
