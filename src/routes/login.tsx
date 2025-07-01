import { Button } from "@/components/ui/button";
import { AuthRedirectEffects } from "@/features/navigation/use-auth-redirects";
import { SignInButton } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  AuthRedirectEffects.useRedirectFromPublic();

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Entre na sua conta
          </h1>
          <p className="text-muted-foreground mt-2">Requer acesso à internet</p>
        </div>
        <div className="mt-8">
          <SignInButton mode="modal">
            <Button>Entrar</Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
}
