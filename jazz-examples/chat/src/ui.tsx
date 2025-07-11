import clsx from "clsx";
import { CoPlainText, ImageDefinition } from "jazz-tools";
import { ProgressiveImg } from "jazz-tools/react";
import { ImageIcon } from "lucide-react";
import { useId, useRef } from "react";

export function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="dark:bg-stone-925 flex h-screen w-screen flex-col justify-between bg-stone-50 dark:text-white">
      {props.children}
    </div>
  );
}

export function TopBar(props: { children: React.ReactNode }) {
  return (
    <div className="flex w-full justify-between gap-2 border-b bg-white p-3 dark:border-stone-900 dark:bg-transparent">
      {props.children}
    </div>
  );
}

export function ChatBody(props: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-1 flex-col-reverse overflow-y-auto"
      role="application"
    >
      {props.children}
    </div>
  );
}

export function EmptyChatMessage() {
  return (
    <div className="flex h-full items-center justify-center px-3 text-base text-stone-500 md:text-2xl">
      Start a conversation below.
    </div>
  );
}

export function BubbleContainer(props: {
  children: React.ReactNode;
  fromMe: boolean | undefined;
}) {
  const align = props.fromMe ? "items-end" : "items-start";
  return (
    <div className={`${align} m-3 flex flex-col`} role="row">
      {props.children}
    </div>
  );
}

export function BubbleBody(props: {
  children: React.ReactNode;
  fromMe: boolean | undefined;
}) {
  return (
    <div
      className={clsx(
        "line-clamp-10 text-ellipsis whitespace-pre-wrap",
        "max-w-[calc(100%-5rem)] overflow-hidden rounded-2xl p-1 shadow-sm",
        props.fromMe
          ? "bg-white dark:bg-stone-900 dark:text-white"
          : "bg-blue text-white"
      )}
    >
      {props.children}
    </div>
  );
}

export function BubbleText(props: {
  text: CoPlainText | string;
  className?: string;
}) {
  return (
    <p className={clsx("px-2 leading-relaxed", props.className)}>
      {props.text}
    </p>
  );
}

export function BubbleImage(props: { image: ImageDefinition }) {
  return (
    <ProgressiveImg image={props.image}>
      {({ src }) => (
        <img
          className="mb-1 h-auto max-h-80 max-w-full rounded-t-xl"
          src={src}
        />
      )}
    </ProgressiveImg>
  );
}

export function BubbleInfo(props: { by: string | undefined; madeAt: Date }) {
  return (
    <div className="mt-1.5 text-xs text-neutral-500">
      {props.by} · {props.madeAt.toLocaleTimeString()}
    </div>
  );
}

export function InputBar(props: { children: React.ReactNode }) {
  return (
    <div className="mt-auto flex gap-1 border-t bg-white p-3 shadow-2xl dark:border-stone-900 dark:bg-transparent">
      {props.children}
    </div>
  );
}

export function ImageInput({
  onImageChange,
}: {
  onImageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <button
        type="button"
        aria-label="Send image"
        title="Send image"
        onClick={onUploadClick}
        className="rounded-full p-1.5 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-800 dark:hover:bg-stone-800 dark:hover:text-stone-200"
      >
        <ImageIcon size={24} strokeWidth={1.5} />
      </button>

      <label className="sr-only">
        Image
        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg, image/gif"
          onChange={onImageChange}
        />
      </label>
    </>
  );
}

export function TextInput(props: { onSubmit: (text: string) => void }) {
  const inputId = useId();

  return (
    <div className="flex-1">
      <label className="sr-only" htmlFor={inputId}>
        Type a message and press Enter
      </label>
      <input
        id={inputId}
        className="dark:bg-stone-925 block w-full rounded-full border px-3 py-1 placeholder:text-stone-500 dark:border-stone-900 dark:text-white"
        placeholder="Type a message and press Enter"
        maxLength={2048}
        onKeyDown={({ key, currentTarget: input }) => {
          if (key !== "Enter" || !input.value) return;
          props.onSubmit(input.value);
          input.value = "";
        }}
      />
    </div>
  );
}
