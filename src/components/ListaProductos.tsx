import type { Producto } from "../types/producto";
import { CardProducto } from "./CardProducto";
import { AlertaBanner } from "./ui/AlertaBanner";
import { EstadoVacio } from "./ui/EstadoVacio";
import { SkeletonCardProducto } from "./ui/SkeletonCardProducto";

// C le pasa los datos y D se encarga de como se ve cada estado,
// si cambian las props avisen al equipo

interface Props {
  productos: Producto[];
  cargando: boolean;
  error: string | null;
  porPagina: number;
  onReintentar: () => void;
  onLimpiarFiltros: () => void;
}

export function ListaProductos({
  productos,
  cargando,
  error,
  porPagina,
  onReintentar,
  onLimpiarFiltros,
}: Props) {
  if (cargando) {
    return (
      <div
        role="status"
        aria-label="Cargando productos"
        aria-busy="true"
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: porPagina }, (_, index) => (
          <SkeletonCardProducto key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <AlertaBanner
        tipo="error"
        titulo="No pudimos cargar los productos"
        mensaje={error}
        onReintentar={onReintentar}
      />
    );
  }

  if (productos.length === 0) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white">
        <EstadoVacio
          titulo="No encontramos productos"
          descripcion="Prueba con otros filtros o vuelve a mostrar todos los productos."
          accion={{ label: "Limpiar filtros", onClick: onLimpiarFiltros }}
        />
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {productos.map((producto) => (
        <CardProducto key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
