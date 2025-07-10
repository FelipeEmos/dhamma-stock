import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignOutButton } from "@clerk/clerk-react";
import { Power } from "lucide-react";
import { useState } from "react";

export function DisconnectButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Power className="mr-2 h-4 w-4" />
          <span>Desconectar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar Desconexão</DialogTitle>
          <DialogDescription>
            Você precisará estar online para se conectar novamente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col-reverse gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <SignOutButton>
            <Button variant="destructive" className="w-full sm:w-auto">
              <Power />
              Desconectar
            </Button>
          </SignOutButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
