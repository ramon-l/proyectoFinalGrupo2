// src/Nav.jsx
import { Link, useLocation } from 'react-router-dom'


export default function Nav() {
 const { pathname } = useLocation()


 const base = 'px-3 py-2 rounded-md text-sm font-medium'
 const active = 'bg-slate-800 text-white'
 const inactive = 'bg-slate-200 text-slate-800 hover:bg-slate-300'


 return (
   <nav className="flex gap-2 mb-4">
     <Link
       to="/"
       className={`${base} ${pathname === '/' ? active : inactive}`}
     >
       Inicio
     </Link>
     <Link
       to="/manage"
       className={`${base} ${pathname === '/manage' ? active : inactive}`}
     >
       Gestionar autos
     </Link>
     <Link
       to="/simulador"
       className={`${base} ${pathname === '/simulador' ? active : inactive}`}
     >
       Simulador
     </Link>
   </nav>
 )
}






