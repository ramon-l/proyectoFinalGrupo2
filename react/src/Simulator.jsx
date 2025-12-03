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


 //  Condicional COMPUESTA (if / else) para riesgo de cuota
 let mensajeRiesgo = ''
 if (cuotaMensual > 3_000_000) {
   mensajeRiesgo = '⚠️ La cuota es alta, podría ser un riesgo para el cliente.'
 } else {
   mensajeRiesgo = '✅ La cuota es razonable para el cliente.'
 }


 // Condicional ANIDADA (if / else if / else) según interés
 let tipoPlan = ''
 if (interesNum <= 10) {
   tipoPlan = 'Plan de bajo interés'
 } else if (interesNum <= 20) {
   tipoPlan = 'Plan estándar'
 } else {
   tipoPlan = 'Plan de alto interés (revisar condiciones)'
 }


 return (
   <section>
     <h2 className="text-2xl font-semibold mb-4">Simulador de compra</h2>


     <div className="bg-white rounded-lg shadow p-4 max-w-md space-y-3">
       <div>
         <label className="block text-sm font-medium mb-1">
           Monto del auto (₲)
         </label>
         <input
           type="number"
           value={monto}
           onChange={e => setMonto(e.target.value)}
           className="border rounded w-full px-2 py-1"
           min="0"
         />
       </div>


       <div>
         <label className="block text-sm font-medium mb-1">
           Cantidad de cuotas
         </label>
         <input
           type="number"
           value={cuotas}
           onChange={e => setCuotas(e.target.value)}
           className="border rounded w-full px-2 py-1"
           min="1"
         />
       </div>


       <div>
         <label className="block text-sm font-medium mb-1">
           Interés (%)
         </label>
         <input
           type="number"
           value={interes}
           onChange={e => setInteres(e.target.value)}
           className="border rounded w-full px-2 py-1"
           min="0"
         />
       </div>


       <hr />


       <p>Total con interés: ₲{totalConInteres.toFixed(0)}</p>
       <p>Cuota mensual: ₲{cuotaMensual.toFixed(0)}</p>
       <p>{mensajeRiesgo}</p>
       <p>{tipoPlan}</p>
     </div>


     {}
   </section>
 )
}



