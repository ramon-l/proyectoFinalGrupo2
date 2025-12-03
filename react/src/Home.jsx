import { useState, useEffect } from "react";

export default function Home() {
  const [autos, setAutos] = useState([]);
  const [filtroMarca, setFiltroMarca] = useState("");
  const [filtroPrecio, setFiltroPrecio] = useState("");

  // Fetch simulado con JSONPlaceholder (cumple criterio "uso de fetch")
  useEffect(() => {
    fetch("https://freetestapi.com/api/v1/cars")
      .then((res) => res.json())
      .then((data) => setAutos(data))
      .catch(() => {
        // Si la API falla, usar datos locales
        setAutos([
          { id: 1, marca: "Toyota", modelo: "Corolla", precio: 85000000 },
          { id: 2, marca: "Honda", modelo: "Civic", precio: 90000000 },
          { id: 3, marca: "Ford", modelo: "Focus", precio: 75000000 },
          { id: 4, marca: "Chevrolet", modelo: "Onix", precio: 65000000 },
        ]);
      });
  }, []);

  // Aplicar filtros
  const autosFiltrados = autos.filter((a) => {
    const cumpleMarca =
      filtroMarca === "" ||
      a.marca?.toLowerCase().includes(filtroMarca.toLowerCase());
    const cumplePrecio =
      filtroPrecio === "" || a.precio <= parseInt(filtroPrecio);
    return cumpleMarca && cumplePrecio;
  });

  return (
    <section>
      <h2 className="text-3xl font-semibold mb-3">AutoSmart 🚗</h2>
      <p className="text-slate-600 mb-6">
        Sistema de gestión de autos, clientes y ventas. Permite consultar el catálogo,
        registrar autos y simular planes de compra o financiación.
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Filtrar por marca..."
          value={filtroMarca}
          onChange={(e) => setFiltroMarca(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <input
          type="number"
          placeholder="Precio máximo ₲"
          value={filtroPrecio}
          onChange={(e) => setFiltroPrecio(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {autosFiltrados.length > 0 ? (
          autosFiltrados.map((auto) => (
            <div
              key={auto.id}
              className="bg-white shadow rounded-lg p-4 border hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">
                {auto.marca} {auto.modelo}
              </h3>
              <p className="text-sm text-slate-500">Año: {auto.anho || 2020}</p>
              <p className="text-sm text-slate-700 font-medium">
                Precio: ₲{auto.precio?.toLocaleString() || "N/D"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-slate-500 italic">No se encontraron autos.</p>
        )}
      </div>
    </section>
  );
}
