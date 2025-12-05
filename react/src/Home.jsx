import { useState, useEffect } from "react";

export default function Home() {
  const [autos, setAutos] = useState([]);
  const [filtroMarca, setFiltroMarca] = useState("");
  const [filtroPrecio, setFiltroPrecio] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch simulado con JSONPlaceholder
  useEffect(() => {
    setLoading(true);
    fetch("https://freetestapi.com/api/v1/cars")
      .then((res) => res.json())
      .then((data) => {
        setAutos(data.slice(0, 8)); // Limitar a 8 autos para mejor visualización
        setLoading(false);
      })
      .catch(() => {
        // Si la API falla, usar datos locales
        setAutos([
          { id: 1, marca: "Toyota", modelo: "Corolla", precio: 85000000, anho: 2023, color: "Azul", combustible: "Híbrido" },
          { id: 2, marca: "Honda", modelo: "Civic", precio: 90000000, anho: 2024, color: "Rojo", combustible: "Gasolina" },
          { id: 3, marca: "Ford", modelo: "Focus", precio: 75000000, anho: 2023, color: "Blanco", combustible: "Gasolina" },
          { id: 4, marca: "Chevrolet", modelo: "Onix", precio: 65000000, anho: 2024, color: "Gris", combustible: "Gasolina" },
          { id: 5, marca: "BMW", modelo: "Serie 3", precio: 120000000, anho: 2024, color: "Negro", combustible: "Híbrido" },
          { id: 6, marca: "Mercedes-Benz", modelo: "Clase A", precio: 110000000, anho: 2023, color: "Plata", combustible: "Gasolina" },
          { id: 7, marca: "Audi", modelo: "A4", precio: 115000000, anho: 2024, color: "Azul Oscuro", combustible: "Diésel" },
          { id: 8, marca: "Volkswagen", modelo: "Golf", precio: 70000000, anho: 2023, color: "Rojo", combustible: "Gasolina" },
        ]);
        setLoading(false);
      });
  }, []);

  // Aplicar filtros
  const autosFiltrados = autos.filter((a) => {
    const cumpleMarca =
      filtroMarca === "" ||
      a.marca?.toLowerCase().includes(filtroMarca.toLowerCase()) ||
      a.modelo?.toLowerCase().includes(filtroMarca.toLowerCase());
    const cumplePrecio =
      filtroPrecio === "" || a.precio <= parseInt(filtroPrecio || "999999999");
    return cumpleMarca && cumplePrecio;
  });

  // Colores para las tarjetas (basado en la marca)
  const getCardColor = (marca) => {
    const colors = {
      "Toyota": "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
      "Honda": "bg-gradient-to-br from-red-50 to-red-100 border-red-200",
      "Ford": "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200",
      "Chevrolet": "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200",
      "BMW": "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300",
      "Mercedes-Benz": "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300",
      "Audi": "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200",
      "Volkswagen": "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200"
    };
    return colors[marca] || "bg-gradient-to-br from-white to-gray-50 border-gray-200";
  };

  // Color del badge según el tipo de combustible
  const getFuelBadgeColor = (combustible) => {
    const colors = {
      "Gasolina": "bg-red-100 text-red-800",
      "Diésel": "bg-gray-100 text-gray-800",
      "Híbrido": "bg-green-100 text-green-800",
      "Eléctrico": "bg-blue-100 text-blue-800"
    };
    return colors[combustible] || "bg-gray-100 text-gray-800";
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      {/* Encabezado */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black">
               AutoSmart
              </h1>

            </div>
            <p className="text-gray-600 text-lg max-w-2xl">
              Sistema de gestión de autos, clientes y ventas. Consulta nuestro catálogo exclusivo,
              filtra por marca o precio y descubre el auto perfecto para ti.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Autos disponibles</p>
                <p className="text-2xl font-bold text-gray-800">{autos.length}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Actualizado en tiempo real</p>
          </div>
        </div>

        {/* Panel de filtros */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <h2 className="text-xl font-bold text-gray-800">Filtrar catálogo</h2>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-500">Autos filtrados</p>
              <p className="text-2xl font-bold text-gray-800">{autosFiltrados.length}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar por marca o modelo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Ej: Toyota, Ford, Civic..."
                  value={filtroMarca}
                  onChange={(e) => setFiltroMarca(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio máximo (₲)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input
                  type="number"
                  placeholder="Ej: 100000000"
                  value={filtroPrecio}
                  onChange={(e) => setFiltroPrecio(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                {filtroPrecio && (
                  <button
                    onClick={() => setFiltroPrecio("")}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Etiquetas de filtros activos */}
          <div className="flex flex-wrap gap-2 mt-4">
            {filtroMarca && (
              <div className="flex items-center gap-1 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full">
                <span>Marca/Modelo: {filtroMarca}</span>
                <button onClick={() => setFiltroMarca("")} className="ml-1 hover:text-blue-900">
                  ✕
                </button>
              </div>
            )}
            {filtroPrecio && (
              <div className="flex items-center gap-1 bg-green-100 text-green-800 text-sm font-medium px-3 py-1.5 rounded-full">
                <span>Precio máximo: ₲{parseInt(filtroPrecio).toLocaleString()}</span>
                <button onClick={() => setFiltroPrecio("")} className="ml-1 hover:text-green-900">
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Catálogo de autos */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Catálogo de Autos</h3>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Cargando catálogo de autos...</p>
              </div>
            </div>
          ) : (
            <>
              {autosFiltrados.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow border border-gray-200">
                  <div className="mx-auto w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron autos</h4>
                  <p className="text-gray-500 max-w-md mx-auto">
                    No hay autos que coincidan con tu búsqueda. Intenta con otros filtros o ajusta el precio máximo.
                  </p>
                  <button 
                    onClick={() => {setFiltroMarca(""); setFiltroPrecio("");}}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {autosFiltrados.map((auto) => (
                    <div
                      key={auto.id}
                      className={`${getCardColor(auto.marca)} rounded-2xl shadow-lg p-5 border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {auto.marca} {auto.modelo}
                          </h3>
                          <p className="text-gray-600">{auto.color || "Color no especificado"}</p>
                        </div>
                        <div className={`text-xs font-bold px-3 py-1 rounded-full ${getFuelBadgeColor(auto.combustible)}`}>
                          {auto.combustible || "Gasolina"}
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-5">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Precio</p>
                            <p className="text-lg font-bold text-gray-900">
                              ₲{auto.precio?.toLocaleString() || "N/D"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Año</p>
                            <p className="text-lg font-bold text-gray-900">
                              {auto.anho || "2020"}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                     
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Pie de página */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            <span className="font-bold text-blue-700">AutoSmart</span> • Sistema de gestión de autos • 
            <span className="text-gray-400 mx-2">|</span>
            Mostrando {autosFiltrados.length} de {autos.length} autos disponibles
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Los precios están expresados en Guaraníes (₲) y pueden variar sin previo aviso.
          </p>
        </div>
      </div>
    </section>
  );
}