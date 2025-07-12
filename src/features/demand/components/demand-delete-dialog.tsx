import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import * as Jazz from "@/jazz";

interface DemandDeleteDialogProps {
  demand: Jazz.DemandType;
  eventTemplate: Jazz.EventTemplateType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DemandDeleteDialog({
  demand,
  eventTemplate,
  open,
  onOpenChange,
}: DemandDeleteDialogProps) {
  const handleDelete = () => {
    // Find the index of the demand to remove
    const demandIndex = eventTemplate.demands.findIndex(
      d => d?.id === demand.id
    );

    if (demandIndex !== -1) {
      eventTemplate.demands.splice(demandIndex, 1);
    }

    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Demanda</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir a demanda &ldquo;{demand.name}
            &rdquo;? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
