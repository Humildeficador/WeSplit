import { Link } from "react-router-dom"

const NAV_LINK = [
  { to: '/', label: 'Atividade' },
  { to: '/group', label: 'Grupos' },
  { to: '/settings', label: 'Configurações' }
] as const

export const Sidebar = () => {
  return (
    <nav className="w-64 h-full bg-[#0d1017]">
      <ul className="flex flex-col">
        {NAV_LINK.map(item => (
          <li key={item.label}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}