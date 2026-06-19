import { Link, useLocation } from "react-router-dom"
import { Activity, Users, Settings } from "lucide-react"

const NAV_LINK = [
  { to: '/', label: 'Atividade', icon: Activity },
  { to: '/group', label: 'Grupos', icon: Users },
  { to: '/settings', label: 'Configurações', icon: Settings }
] as const

export const Sidebar = () => {
  const { pathname } = useLocation()

  return (
    <nav className="w-64 h-full bg-[#0d1017] border-r-2 border-[#1e2026]">
      <img src="/logos/logo.png" className="w-35" />
      <ul className="flex flex-col px-4 gap-2">
        {NAV_LINK.map(item => {
          const Icon = item.icon
          const isActive = pathname === item.to

          return (
            <li
              key={item.label}
              className={` px-4 py-2 flex gap-2 ${isActive ? 'bg-[#191e25] rounded-md cursor-pointer' : 'text-white/50'}`}
            >
              <Icon size={20} className={`${isActive ? 'text-green-300' : ''}`} />
              <Link to={item.to}>{item.label}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}