interface Props {
  titulo: string;
  descripcion?: string;
  accion?: { label: string; onClick: () => void };
}

export function EstadoVacio({ titulo, descripcion, accion }: Props) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <div
        aria-hidden="true"
        className="mb-4 grid size-14 place-items-center rounded-full bg-marca-50 text-marca-700"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 7.8 7.5 4.3 7.5-4.3M12 12.2V21"
          />
        </svg>
      </div>
      <h2 className="text-lg font-bold text-slate-900">{titulo}</h2>
      {descripcion && (
        <p className="mt-2 max-w-md text-sm text-slate-500">{descripcion}</p>
      )}
      {accion && (
        <button
          type="button"
          onClick={accion.onClick}
          className="mt-5 rounded-xl bg-marca-700 px-4 py-2 text-sm font-bold text-white hover:bg-marca-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca-700"
        >
          {accion.label}
        </button>
      )}
    </div>
  );
}
