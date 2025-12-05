import { useState } from 'react'

export default function Simulador() {
  const [monto, setMonto] = useState('')
  const [cuotas, setCuotas] = useState(12)
  const [interes, setInteres] = useState(10)

  // Convertimos a números (operadores + parseo)
  const montoNum = Number(monto) || 0
  const cuotasNum = Number(cuotas) || 1
  const interesNum = Number(interes) || 0

  // Operadores aritméticos: suma, multiplicación, división
  const totalConInteres = montoNum * (1 + interesNum / 100)
  const cuotaMensual = cuotasNum > 0 ? totalConInteres / cuotasNum : 0

  // Condicional COMPUESTA (if / else) para riesgo de cuota
  let mensajeRiesgo = ''
  let riesgoColor = ''
  let riesgoIcon = ''
  if (cuotaMensual > 3_000_000) {
    mensajeRiesgo = 'La cuota es alta, podría ser un riesgo para el cliente.'
    riesgoColor = 'bg-gradient-to-r from-red-50 to-red-100 border-red-200 text-red-800'
    riesgoIcon = (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
      </svg>
    )
  } else {
    mensajeRiesgo = 'La cuota es razonable para el cliente.'
    riesgoColor = 'bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-800'
    riesgoIcon = (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    )
  }

  // Condicional ANIDADA (if / else if / else) según interés
  let tipoPlan = ''
  let planColor = ''
  let planIcon = ''
  if (interesNum <= 10) {
    tipoPlan = 'Plan de bajo interés'
    planColor = 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-blue-800'
    planIcon = (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    )
  } else if (interesNum <= 20) {
    tipoPlan = 'Plan estándar'
    planColor = 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-800'
    planIcon = (
      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    )
  } else {
    tipoPlan = 'Plan de alto interés (revisar condiciones)'
    planColor = 'bg-gradient-to-r from-red-50 to-red-100 border-red-200 text-red-800'
    planIcon = (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
      </svg>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
          </div>
           <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">
        Simulador de Financiación
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Calcula tu plan de pago personalizado y descubre la mejor opción para adquirir tu vehículo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Panel de configuración */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Configura tu préstamo</h2>
            </div>

            <div className="space-y-6">
              {/* Monto */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Monto del vehículo (₲)
                  </label>
                  <span className="text-sm font-medium text-indigo-600">
                    ₲{montoNum.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-bold">₲</span>
                  </div>
                  <input
                    type="number"
                    value={monto}
                    onChange={e => setMonto(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg font-medium hover:border-indigo-300"
                    min="0"
                    placeholder="Ej: 50.000.000"
                  />
                </div>
              </div>

              {/* Cuotas */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Cantidad de cuotas
                  </label>
                  <span className="text-sm font-medium text-indigo-600">
                    {cuotas} meses
                  </span>
                </div>
                <div className="space-y-4">
                  <input
                    type="range"
                    value={cuotas}
                    onChange={e => setCuotas(e.target.value)}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                    min="1"
                    max="60"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 mes</span>
                    <span className="font-medium text-indigo-600">{cuotas} meses</span>
                    <span>60 meses</span>
                  </div>
                  <input
                    type="number"
                    value={cuotas}
                    onChange={e => setCuotas(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-center font-bold text-lg"
                    min="1"
                    max="60"
                  />
                </div>
              </div>

              {/* Interés */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Tasa de interés anual
                  </label>
                  <span className="text-sm font-medium text-indigo-600">
                    {interes}%
                  </span>
                </div>
                <div className="space-y-4">
                  <input
                    type="range"
                    value={interes}
                    onChange={e => setInteres(e.target.value)}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                    min="0"
                    max="30"
                    step="0.5"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span className="font-medium text-indigo-600">{interes}%</span>
                    <span>30%</span>
                  </div>
                  <input
                    type="number"
                    value={interes}
                    onChange={e => setInteres(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-center font-bold text-lg"
                    min="0"
                    max="30"
                    step="0.5"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Panel de resultados */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Resumen de financiación</h2>
            </div>

            {/* Tarjetas de resumen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700">Total a pagar</h3>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  ₲{totalConInteres.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Interés total:</span>{' '}
                  ₲{(totalConInteres - montoNum).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700">Cuota mensual</h3>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  ₲{cuotaMensual.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Plazo:</span> {cuotasNum} meses
                </div>
              </div>
            </div>

            {/* Alertas */}
            <div className="space-y-4">
              {/* Tipo de plan */}
              <div className={`${planColor} border rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]`}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {planIcon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{tipoPlan}</h4>
                    <p className="text-sm opacity-90">
                      Tasa de interés aplicada: <span className="font-bold">{interesNum}%</span> anual
                    </p>
                  </div>
                </div>
              </div>

              {/* Análisis de riesgo */}
              <div className={`${riesgoColor} border rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]`}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {riesgoIcon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Análisis de riesgo</h4>
                    <p className="text-sm opacity-90">{mensajeRiesgo}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 bg-white/50 rounded-full">Umbral: ₲3.000.000</span>
                      <span className="px-2 py-1 bg-white/50 rounded-full">Tu cuota: ₲{cuotaMensual.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalles del cálculo */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-bold text-gray-800 text-lg mb-4">Detalles del cálculo</h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600">Monto financiado</span>
                    <span className="font-bold">₲{montoNum.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600">Tasa mensual</span>
                    <span className="font-bold">{(interesNum / 12).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600">Total intereses</span>
                    <span className="font-bold">₲{(totalConInteres - montoNum).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600">Cuotas totales</span>
                    <span className="font-bold">{cuotasNum}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de acción */}
            <div className="mt-8">
             
            </div>
          </div>
        </div>

        {/* Pie de página */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            <span className="font-bold text-indigo-700">Simulador de Financiación</span> • Los cálculos son estimativos • 
            <span className="text-gray-400 mx-2">|</span>
            Monto máximo por cuota sugerido: ₲3.000.000
          </p>
        </div>
      </div>
    </section>
  )
}