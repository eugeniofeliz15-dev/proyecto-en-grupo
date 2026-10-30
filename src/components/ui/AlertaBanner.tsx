export type TipoAlerta = "info" | "exito" | "advertencia" | "error";

interface Props {
  tipo: TipoAlerta;
  titulo: string;
  mensaje: string;
  onCerrar?: () => void;
  onReintentar?: () => void;
}

const estilosPorTipo: Record<TipoAlerta, string> = {
  info: "border-sky-200 bg-sky-50 text-sky-950",
  exito: "border-emerald-200 bg-emerald-50 text-emerald-950",
  advertencia: "border-amber-200 bg-amber-50 text-amber-950",
  error: "border-rose-200 bg-rose-50 text-rose-950",
};

export function AlertaBanner({
  tipo,
  titulo,
  mensaje,
  onCerrar,
  onReintentar,
}: Props) {
  return (
    <div
      role="alert"
      className={`flex flex-wrap items-start justify-between gap-4 rounded-2xl border p-4 ${estilosPorTipo[tipo]}`}
    >
      <div className="min-w-0 flex-1">
        <h2 className="font-bold">{titulo}</h2>
        <p className="mt-1 text-sm">{mensaje}</p>
      </div>
      {(onCerrar || onReintentar) && (
        <div className="flex shrink-0 flex-wrap gap-2">
          {onReintentar && (
            <button
              type="button"
              onClick={onReintentar}
              className="rounded-lg border border-current/20 px-3 py-1.5 text-sm font-semibold hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              Reintentar
            </button>
          )}
          {onCerrar && (
            <button
              type="button"
              onClick={onCerrar}
              className="rounded-lg border border-current/20 px-3 py-1.5 text-sm font-semibold hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              Cerrar
            </button>
          )}
        </div>
      )}
    </div>
  );
}
