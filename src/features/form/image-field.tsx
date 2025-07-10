import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FieldErrorInfos } from "@/features/form/field-error-infos";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Group } from "jazz-tools";
import { createImage, ProgressiveImg } from "jazz-tools/react";
import { Upload, X } from "lucide-react";
import * as React from "react";

interface ImageFieldProps {
  field: AnyFieldApi;
  label?: string;
  // TODO: enhance typesafety
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentImage?: any; // For editing forms
}

export function ImageField({ field, label, currentImage }: ImageFieldProps) {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  // TODO: enhance typesafety
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tempImage, setTempImage] = React.useState<any>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Cleanup do preview quando component desmonta
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Atualiza o field value quando tempImage muda
  React.useEffect(() => {
    field.handleChange(tempImage);
  }, [tempImage, field]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.currentTarget.files?.[0];

    if (!file) return;

    // Cleanup preview anterior
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    // Criar preview temporário
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setIsUploading(true);

    try {
      // Criar imagem Jazz temporária
      const newImage = await createImage(file, {
        owner: Group.create(),
      });

      setTempImage(newImage);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
      URL.revokeObjectURL(objectUrl);
      setPreviewUrl(null);
    }
  };

  const handleRemoveImage = () => {
    setTempImage(null);

    // Limpar input
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    // Cleanup preview se existir
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleSelectFile = () => {
    inputRef.current?.click();
  };

  // Determinar qual imagem mostrar
  const displayImage = tempImage || currentImage;

  return (
    <div className="grid gap-2">
      {label && (
        <div className="flex items-center">
          <Label htmlFor={field.name}>{label}</Label>
        </div>
      )}

      <div className="space-y-4">
        {/* Preview da imagem atual ou nova */}
        {displayImage && (
          <div className="group relative">
            <ProgressiveImg image={displayImage}>
              {({ src }) => (
                <img
                  src={src}
                  alt="Preview"
                  className="h-48 w-full rounded-lg border object-cover"
                />
              )}
            </ProgressiveImg>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Preview temporário durante upload */}
        {previewUrl && (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Uploading..."
              className="h-48 w-full rounded-lg border object-cover opacity-50"
            />
            <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center rounded-lg bg-black">
              <p className="font-semibold text-white">Fazendo upload...</p>
            </div>
          </div>
        )}

        {/* Botão para selecionar arquivo */}
        {!displayImage && !previewUrl && (
          <Button
            type="button"
            variant="outline"
            className="h-48 w-full border-dashed"
            onClick={handleSelectFile}
            disabled={isUploading}
          >
            <div className="flex flex-col items-center gap-2">
              <Upload className="text-muted-foreground h-8 w-8" />
              <span className="text-muted-foreground text-sm">
                Clique para selecionar uma imagem
              </span>
            </div>
          </Button>
        )}

        {/* Input file oculto */}
        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg, image/gif, image/bmp, image/webp"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Botão para trocar imagem quando já tem uma */}
        {displayImage && !previewUrl && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSelectFile}
            disabled={isUploading}
          >
            <Upload className="mr-2 h-4 w-4" />
            Trocar imagem
          </Button>
        )}
      </div>

      <FieldErrorInfos field={field} />
    </div>
  );
}
