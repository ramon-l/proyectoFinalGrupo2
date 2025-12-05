import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname } = useLocation()

  const navItems = [
    { to: "/", label: "Inicio" },
    { to: "/manage", label: "Gestión" },
    { to: "/simulador", label: "Simulador" },
  ]

  return (
    <nav className="mb-8">
      {/* Barra superior */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">AutoSmart Dashboard</h1>
          </div>
          <div className="text-white/80 text-sm">
            Sistema de gestión vehicular
          </div>
        </div>
      </div>

      {/* Pestañas */}
      <div className="flex bg-white rounded-b-2xl shadow-xl border-x border-b border-gray-200 overflow-hidden">
        {navItems.map((item, index) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex-1 group relative`}
          >
            <div className={`
              flex items-center justify-center gap-2 py-4 text-sm font-medium
              transition-all duration-300
              ${pathname === item.to 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
              }
              ${index === 0 ? 'rounded-bl-2xl' : ''}
              ${index === navItems.length - 1 ? 'rounded-br-2xl' : ''}
            `}>
              {/* Icono dinámico */}
              {item.to === '/' && (
                <svg className={`w-5 h-5 ${pathname === item.to ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              )}
              {item.to === '/manage' && (
                <svg className={`w-5 h-5 ${pathname === item.to ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              )}
              {item.to === '/simulador' && (
                <svg className={`w-5 h-5 ${pathname === item.to ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              )}
              {item.label}
            </div>
            
            {/* Indicador activo */}
            {pathname === item.to && (
              <>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-blue-50"></div>
              </>
            )}
          </Link>
        ))}
      </div>
    </nav>
  )
}