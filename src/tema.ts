// datos de la tienda: nombre, textos y categorias
// los colores y la fuente estan en index.css

export interface Categoria {
  valor: string; // como se guarda en la API
  etiqueta: string; // como se muestra
}

export const tema = {
  nombre: "Ropa",
  inicial: "R",
  emoji: "👕",
  login: {
    kicker: "Tu tienda, más simple",
    titulo: "Viste a tu estilo.",
    texto:
      "Encuentra ropa seleccionada para tu día a día y disfruta una experiencia de compra sencilla.",
  },
  // La API compara categoría por texto exacto. Mantener aquí los valores
  // usados al crear productos de Ropa.
  categorias: [
    { valor: "Ropa-Polos", etiqueta: "Polos" },
    { valor: "Ropa-Pantalones", etiqueta: "Pantalones" },
    { valor: "Ropa-Camisas", etiqueta: "Camisas" },
    { valor: "Ropa-Chamarras", etiqueta: "Chamarras" },
    { valor: "Ropa-Accesorios", etiqueta: "Accesorios" },
  ] as Categoria[],
};

export function etiquetaCategoria(valor: string) {
  return tema.categorias.find((c) => c.valor === valor)?.etiqueta ?? valor;
}
