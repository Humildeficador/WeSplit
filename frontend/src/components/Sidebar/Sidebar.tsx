import { Activity, Users, Settings } from "lucide-react"
import { SidebarNavLink } from "./SidebarNavlink"

const NAV_LINK = [
  { to: '/activity', label: 'Atividade', icon: Activity },
  { to: '/group', label: 'Grupos', icon: Users },
  { to: '/settings', label: 'Configurações', icon: Settings }
] as const

export const Sidebar = () => {

  return (
    <nav className="w-64 h-full bg-surface border-r-2 border-hairline">
      <img src="/logos/logo.png" className="w-28 mx-4 my-5 pointer-events-none select-none" />
      <div className="flex flex-col px-4 gap-2 select-none">
        {NAV_LINK.map(item => {

          return (
            <SidebarNavLink
              key={item.label}
              to={item.to}
              label={item.label}
              icon={item.icon}
            />
          )
        })}
      </div>
    </nav>
  )
}
