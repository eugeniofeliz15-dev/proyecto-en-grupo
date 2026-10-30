interface Props {
  pagina: number;
  hayMas: boolean;
  deshabilitado: boolean;
  onCambiarPagina: (nueva: number) => void;
}

// TODO [C]: botones Anterior y Siguiente
// - Anterior deshabilitado en la pagina 1 o mientras carga
// - Siguiente deshabilitado si no hayMas o mientras carga
export function Paginacion({
  pagina,
  hayMas,
  deshabilitado,
  onCambiarPagina,
}: Props) {
  return (
    <nav aria-label="Paginación de productos" className="mt-8 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => onCambiarPagina(pagina - 1)}
        disabled={pagina <= 1 || deshabilitado}
        className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="text-sm">Página {pagina}</span>
      <button
        type="button"
        onClick={() => onCambiarPagina(pagina + 1)}
        disabled={!hayMas || deshabilitado}
        className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
      >
        Siguiente
      </button>
    </nav>
  );
}
