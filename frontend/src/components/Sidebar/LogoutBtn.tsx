import { LogOut } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"

export const LogoutBtn = () => {
  const { logout } = useAuth()

  return (
    <button
      onClick={logout}
      className="
      text-danger border border-danger hover:translate-x-1 transition-all
      duration-200 rounded-md py-1 px-2 mb-10 flex items-center gap-2 cursor-pointer"
    >
      <LogOut size={16} /> <span>Logout</span>
    </button>
  )
}