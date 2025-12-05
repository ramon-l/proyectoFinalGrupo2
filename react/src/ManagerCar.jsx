import { useState } from "react";

const INITIAL_FORM = {
  marca: "",
  modelo: "",
  anho: "",
  precio: "",
  estado: "Nuevo",
};

export default function ManageCar() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [mensaje, setMensaje] = useState("");
  const [autos, setAutos] = useState([]); // ← array de autos cargados

  // Manejo genérico de cambios de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convertimos strings a números
    const anhoNum = parseInt(form.anho);
    const precioNum = parseFloat(form.precio);

    // Condicional SIMPLE: validar precio > 0
    if (precioNum <= 0 || isNaN(precioNum)) {
      setMensaje("⚠️ El precio debe ser un número mayor que 0.");
      return;
    }

    // Condicional COMPUESTA: validar año razonable
    if (anhoNum < 1980) {
      setMensaje(
        "⚠️ El año es muy antiguo. Solo aceptamos autos desde 1980."
      );
      return;
    } else if (anhoNum > new Date().getFullYear() + 1) {
      setMensaje("⚠️ El año ingresado es demasiado grande.");
      return;
    }

    // Objeto listo para enviar/guardar
    const nuevoAuto = {
      marca: form.marca,
      modelo: form.modelo,
      anho: anhoNum,
      precio: precioNum,
      estado: form.estado,
      id: Date.now(), // ID único temporal
    };

    // 🔹 AQUÍ usamos fetch 
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoAuto),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Auto guardado en servidor simulado:", data);

        // Guardamos en el array local para mostrarlo en pantalla
        setAutos((prev) => [...prev, nuevoAuto]);

        setMensaje(
          `✅ Auto "${form.marca} ${form.modelo}" guardado correctamente.`
        );
        setForm(INITIAL_FORM); // limpiamos formulario
      })
      .catch(() => {
        setMensaje("❌ Error al guardar el auto. Intente de nuevo.");
      });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-black">
              Gestión de Autos
              </h1>

              <p className="text-gray-600 mt-2 max-w-3xl">
                Formulario para agregar/editar autos. Incluye validaciones con operadores relacionales y estructuras condicionales, además de envío de datos mediante fetch.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Autos cargados</p>
                  <p className="text-2xl font-bold text-gray-800">{autos.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Validaciones activas</p>
                  <p className="text-2xl font-bold text-gray-800">5</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Envío por fetch</p>
                  <p className="text-2xl font-bold text-gray-800">Activo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Agregar nuevo auto</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Marca */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804l-1.414-1.414L12 6.343l8.293 8.293-1.414 1.414L12 9.172l-6.879 6.879z"/>
                      </svg>
                      Marca del auto
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      name="marca"
                      value={form.marca}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all hover:border-gray-400"
                      placeholder="Ej: Toyota, Ford, Honda..."
                      required
                    />
                  </div>
                </div>

                {/* Modelo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Modelo
                    </span>
                  </label>
                  <input
                    name="modelo"
                    value={form.modelo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all hover:border-gray-400"
                    placeholder="Ej: Corolla, Civic, Focus..."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Año */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      Año de fabricación
                    </span>
                  </label>
                  <input
                    type="number"
                    name="anho"
                    value={form.anho}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all hover:border-gray-400"
                    placeholder="Ej: 2023"
                    required
                    min="1980"
                    max={new Date().getFullYear() + 1}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Rango permitido: 1980 - {new Date().getFullYear() + 1}
                  </p>
                </div>

                {/* Precio */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Precio (₲)
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-600 font-bold">₲</span>
                    </div>
                    <input
                      type="number"
                      name="precio"
                      value={form.precio}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all hover:border-gray-400"
                      placeholder="Ej: 85000000"
                      required
                      min="1"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Precio mínimo: ₲1
                  </p>
                </div>
              </div>

              {/* Estado */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Estado del vehículo
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${form.estado === 'Nuevo' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-gray-400'}`}>
                    <input
                      type="radio"
                      name="estado"
                      value="Nuevo"
                      checked={form.estado === "Nuevo"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className={`text-lg font-bold ${form.estado === 'Nuevo' ? 'text-emerald-700' : 'text-gray-700'}`}>Nuevo</div>
                      <div className={`text-sm ${form.estado === 'Nuevo' ? 'text-emerald-600' : 'text-gray-500'}`}>0 km</div>
                    </div>
                  </label>
                  <label className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${form.estado === 'Usado' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}>
                    <input
                      type="radio"
                      name="estado"
                      value="Usado"
                      checked={form.estado === "Usado"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className={`text-lg font-bold ${form.estado === 'Usado' ? 'text-blue-700' : 'text-gray-700'}`}>Usado</div>
                      <div className={`text-sm ${form.estado === 'Usado' ? 'text-blue-600' : 'text-gray-500'}`}>Kilometraje variable</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Botón de envío */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Guardar auto
                </button>
              </div>
            </form>

            {/* Mensaje de estado */}
            {mensaje && (
              <div className={`mt-6 p-4 rounded-xl border ${mensaje.includes('✅') ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                <div className="flex items-start gap-3">
                  {mensaje.includes('✅') ? (
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                  )}
                  <p className="font-medium">{mensaje}</p>
                </div>
              </div>
            )}
          </div>

          {/* Lista de autos */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Autos cargados</h2>
              </div>
              <div className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                {autos.length} {autos.length === 1 ? 'auto' : 'autos'}
              </div>
            </div>

            {autos.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Marca/Modelo</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Año</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Precio</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {autos.map((auto, idx) => (
                      <tr key={auto.id || idx} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-2">
                          <div className="font-medium text-gray-900">{auto.marca} {auto.modelo}</div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                            {auto.anho}
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="font-bold text-gray-900">₲{auto.precio.toLocaleString()}</div>
                        </td>
                        <td className="py-4 px-2">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${auto.estado === 'Nuevo' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                            {auto.estado}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay autos cargados</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Los autos que agregues aparecerán aquí. Completa el formulario para comenzar.
                </p>
              </div>
            )}

            {/* Información de validaciones */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">Observaciones</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <div className="p-1 bg-red-100 rounded">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Precio mayor que 0</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <div className="p-1 bg-yellow-100 rounded">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Año entre 1980 y {new Date().getFullYear() + 1}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pie de página */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            <span className="font-bold text-emerald-700">Gestión de Autos</span> • Validaciones con operadores relacionales • 
            <span className="text-gray-400 mx-2">|</span>
            Envío de datos mediante fetch a JSONPlaceholder
          </p>
        </div>
      </div>
    </section>
  );
}