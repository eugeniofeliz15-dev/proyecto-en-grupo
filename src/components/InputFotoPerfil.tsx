
import { useEffect, useState } from "react";

interface Props {
  fotoActual: string | null;
  iniciales: string;
  onChange: (file: File | undefined) => void;
}

export function InputFotoPerfil({
  fotoActual,
  iniciales,
  onChange,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [archivo, setArchivo] = useState<File | undefined>();

  useEffect(() => {
    if (!archivo) return;

    const url = URL.createObjectURL(archivo);
    setPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [archivo]);

  const manejarCambio = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Solo se permiten archivos de imagen.");
      event.target.value = "";
      return;
    }

    if (file.size >= 2 * 1024 * 1024) {
      setError("La imagen debe pesar menos de 2 MB.");
      event.target.value = "";
      return;
    }

    setError("");
    setArchivo(file);
    onChange(file);
  };

  const quitarFoto = () => {
    setArchivo(undefined);
    setPreview(null);
    setError("");
    onChange(undefined);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="grid size-28 place-items-center overflow-hidden rounded-full border-4 border-marca-600 bg-marca-100 text-2xl font-bold text-marca-800">
        {preview || fotoActual ? (
          <img
            src={preview ?? fotoActual ?? ""}
            alt="Foto de perfil"
            className="size-full object-cover"
          />
        ) : (
          iniciales
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={manejarCambio}
        className="max-w-64 text-xs"
      />

      {preview && (
        <button
          type="button"
          onClick={quitarFoto}
          className="text-sm font-semibold text-red-600 hover:text-red-700"
        >
          Quitar foto
        </button>
      )}

      {error && (
        <p role="alert" className="text-center text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
