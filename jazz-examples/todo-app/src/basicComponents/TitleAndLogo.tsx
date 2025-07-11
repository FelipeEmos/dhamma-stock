import { Toaster } from ".";

export function TitleAndLogo({ name }: { name: string }) {
  return (
    <>
      <div className="mt-5 flex items-center justify-center gap-2">
        <img src="jazz-logo.png" className="h-5" /> {name}
      </div>
      <Toaster />
    </>
  );
}
