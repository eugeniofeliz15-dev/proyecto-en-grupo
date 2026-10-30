import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ListaProductos } from "../components/ListaProductos";
import { Paginacion } from "../components/Paginacion";
import { useApi } from "../hooks/useApi";
import { productosService } from "../services/productos";
import { tema } from "../tema";

const POR_PAGINA = 6;

// TODO [C]: catalogo de la tienda
// - ahora se ven los productos de TODOS los grupos. Mostrar solo los de
//   su tienda usando tema.categorias (el select tambien)
// - guardar pagina y categoria en la URL con useSearchParams
//   ej: /productos?categoria=Ropa-Polos&pagina=2
// - si la URL trae algo raro (?pagina=abc, una categoria que no es suya)
//   usar los valores por defecto
// - al cambiar de categoria volver a la pagina 1
// - implementar getPagina y <Paginacion />
export function ProductosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paginaParam = searchParams.get("pagina");
  const parsedPagina = Number(paginaParam);
  const pagina = Number.isInteger(parsedPagina) && parsedPagina > 0 ? parsedPagina : 1;
  const categoriaParam = searchParams.get("categoria");
  const categoria =
    categoriaParam && tema.categorias.some((item) => item.valor === categoriaParam)
      ? categoriaParam
      : "Todas";

  useEffect(() => {
    const parametrosValidos =
      (paginaParam === null || String(pagina) === paginaParam) &&
      (categoriaParam === null || categoriaParam === categoria);
    if (!parametrosValidos) {
      const corregidos = new URLSearchParams(searchParams);
      if (paginaParam !== null && String(pagina) !== paginaParam) {
        if (pagina === 1) corregidos.delete("pagina");
        else corregidos.set("pagina", String(pagina));
      }
      if (categoriaParam !== null && categoriaParam !== categoria) {
        if (categoria === "Todas") corregidos.delete("categoria");
        else corregidos.set("categoria", categoria);
      }
      setSearchParams(corregidos, { replace: true });
    }
  }, [categoria, categoriaParam, pagina, paginaParam, searchParams, setSearchParams]);

  const { data, cargando, error, recargar } = useApi(
    () => productosService.getPagina(pagina, POR_PAGINA, categoria),
    [pagina, categoria],
  );

  const cambiarCategoria = (nueva: string) => {
    const parametros = new URLSearchParams(searchParams);
    if (nueva === "Todas") parametros.delete("categoria");
    else parametros.set("categoria", nueva);
    parametros.delete("pagina");
    setSearchParams(parametros);
  };

  const irAPagina = (nueva: number) => {
    const parametros = new URLSearchParams(searchParams);
    if (nueva <= 1) parametros.delete("pagina");
    else parametros.set("pagina", String(nueva));
    setSearchParams(parametros);
  };

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-marca-700">
            Catálogo
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
        </div>

        <label className="text-sm font-semibold text-slate-700">
          Categoría
          <select
            value={categoria}
            onChange={(e) => cambiarCategoria(e.target.value)}
            className="mt-1 block h-10 rounded-xl border border-stone-300 bg-white px-3 font-normal"
          >
            <option value="Todas">Todas</option>
            {tema.categorias.map(({ valor, etiqueta }) => (
              <option key={valor} value={valor}>
                {etiqueta}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ListaProductos
        productos={data?.productos ?? []}
        cargando={cargando}
        error={error}
        porPagina={POR_PAGINA}
        onReintentar={recargar}
        onLimpiarFiltros={() => cambiarCategoria("Todas")}
      />

      <Paginacion
        pagina={pagina}
        hayMas={data?.hayMas ?? false}
        deshabilitado={cargando}
        onCambiarPagina={irAPagina}
      />
    </section>
  );
}
