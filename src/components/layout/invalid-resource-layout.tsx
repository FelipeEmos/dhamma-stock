import { BackButtonLayout } from "@/components/layout/back-button-layout";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

import { LinkOptions } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

type InvalidResourceLayoutProps = LinkOptions;

export function InvalidResourceLayout({
  ...linkProps
}: InvalidResourceLayoutProps) {
  return (
    <BackButtonLayout {...linkProps}>
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-foreground text-4xl font-bold">Erro 404</h1>
        <p className="text-muted-foreground text-center">
          Este link é inválido ou você não tem acesso a este recurso.
        </p>
        <Button asChild>
          <Link {...linkProps}>
            <ArrowLeft />
            Voltar
          </Link>
        </Button>
      </div>
    </BackButtonLayout>
  );
}
