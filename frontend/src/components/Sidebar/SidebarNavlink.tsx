import type { LucideIcon } from "lucide-react"
import { NavLink } from "react-router-dom"

type Props = {
  to: string,
  label: string,
  icon: LucideIcon
}

export const SidebarNavlink = ({ to, label, icon: Icon }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => isActive ?
        'bg-surface-active rounded-md cursor-pointer px-4 py-2 flex gap-2' :
        'text-white/50 hover:text-white transition duration-300 px-4 py-2 flex gap-2'
      }>

      {({ isActive }) => (
        <>
          <Icon size={20} className={isActive ? 'text-green-300' : ''} />
          <span className="flex-1">{label}</span>
        </>
      )}
    </NavLink >
  )
}