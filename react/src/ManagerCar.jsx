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
    <section>
      <h2 className="text-2xl font-semibold mb-4">Gestión de Autos</h2>
      <p className="text-sm text-slate-600 mb-4">
        Formulario para agregar/editar autos. Incluye validaciones con
        operadores relacionales y estructuras condicionales, además de envío de
        datos mediante fetch.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-4 max-w-md space-y-3"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Marca</label>
          <input
            name="marca"
            value={form.marca}
            onChange={handleChange}
            className="border rounded w-full px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Modelo</label>
          <input
            name="modelo"
            value={form.modelo}
            onChange={handleChange}
            className="border rounded w-full px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Año</label>
          <input
            type="number"
            name="anho"
            value={form.anho}
            onChange={handleChange}
            className="border rounded w-full px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Precio (₲)
          </label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            className="border rounded w-full px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Estado</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="border rounded w-full px-2 py-1"
          >
            <option value="Nuevo">Nuevo</option>
            <option value="Usado">Usado</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-slate-800 text-white px-3 py-2 rounded mt-2 hover:bg-slate-900"
        >
          Guardar auto
        </button>
      </form>

      {mensaje && <p className="mt-3 text-sm">{mensaje}</p>}

      {autos.length > 0 && (
        <div className="mt-6 text-left max-w-md">
          <h3 className="font-semibold mb-2">Autos cargados en esta sesión:</h3>
          <ul className="list-disc list-inside text-sm text-slate-700">
            {autos.map((auto, idx) => (
              <li key={idx}>
                {auto.marca} {auto.modelo} — Año {auto.anho} — ₲
                {auto.precio.toLocaleString()} ({auto.estado})
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
